import config from './config'
import mapErrors from './i18n/mapErrors'
import {unauthorizedStatus} from './redux/actions/AuthActions'
import { getApiPath, getAuthData } from './localStorageManager'
import Response from './models/Response'
import { addTypicalMessage } from './redux/actions/BoxMessagesActions'

/**
 * /some/path/ => some/path
 * */
function normalize(string){
    return string.replace(/^\/|\/$/g, '')
}

function jsonToQueryString(json) {
    return '?' +
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

function AjaxTransport(dispatch){

    this.fetch = function(url, type, data, query){
        var apiPath = getApiPath();

        if (!apiPath){
            throw new Error('Path for server API not configured!');
        }

        if (typeof url !== "string"){
            throw new TypeError('URL parameter lost')
        }

        url = normalize(url);

        var that = this;
        var path = apiPath + url;
        var options = {};

        //todo проверка допустимых типов

        if (typeof type === "string"){
            options.method = type.toUpperCase();
        }

        var init = {};

        // init['Content-Type'] = 'application/json';
        // init['Accept'] = 'application/json';
        //init["x-auth-token"] = 'ProcessThisImmediately';

        if (data){
            options.body = JSON.stringify(data, null, '\t')
        }
        // debugger;


        // add auth token

        // отключаю функционал так как возникает ошибка
        // Fetch API cannot load /api/v1/login.
        // Request header field x-auth-token is not allowed by Access-Control-Allow-Headers in preflight response.

        // if (auth.loggedIn()){
        //     init['X-AUTH-TOKEN'] = auth.getToken();
        // }

        options.headers = new Headers(init);
        // options.headers = init;

        if (!query){
            query = {};
        }

        var authorizationData = getAuthData()

        if (authorizationData){
            query.accessToken = authorizationData.accessToken
        }

        var queryStr = jsonToQueryString(query);

        return fetch(path + `${queryStr}`, options)

            // Checking that the fetch was successful
            .then(checkStatusHTTP)

            // if successful
            // Checking whether the content type is correct
            .then(parseJSON)

            .then(function(response){
                return response;
            })

            .then(adaptResponse)

            .then( response => handlerGlobalExeptionStatus(response, dispatch, url) )

            .catch(function(error) {
                dispatch(addTypicalMessage('ERROR', `${error.toString()}`))
                throw error;
            });
    };

    this.fetchThrowInvalidErrors = function(){
        return this.fetch.apply(this, arguments)
            .then((json) => {
                return json;
            })
            .catch( err => {
                throw err;
            })

            .then(createResponse)

            .then( function handlerInvalidStatus({ data, errors, status } = response){
                switch (status){
                    case 0: return data; break;
                    case 1: throw errors; break;
                }
            })
    }

    function createResponse(json){
        return new Response(json)
    }

    function adaptResponse(response){

        function _adaptEmptyData(data){
            if (Array.isArray(data) && data.length === 0){
                return null;
            }
            return data;
        }

        function _adaptEmptyErrors(errors){
            if (errors === ""){
                return null;
            } else if( typeof errors === "string"){

            } else {
                return errors;
            }
        }

        function _errorsAdapt(errors){
            if (!errors){
                return null;
            }

            // убрать массивы
            Object.keys(errors).forEach((key)=>{
                errors[key] = (errors[key] && errors[key][0]) ? errors[key][0] : errors[key];
            })

            // заменить не теря данных структуру
            Object.keys(errors).forEach((key)=>{

                var code = errors[key].code || "default_client_message";

                // var message = mapErrors[code];
                // message = message.replace(":attribute", key)
                //
                // errors[key] = {
                //     code: errors[key].code,
                //     message: message,
                //     devMessage: errors[key].message,
                // };

                errors[key] = code;
            });

            // подогнать под существующий интерфейс
            // Object.keys(errors).forEach((key)=>{
            //     errors[key] = errors[key].message;
            // });

            return errors;
        }

        if (response.status === 2){
            response.APIErrorMessage = response.errors;
        }

        response.data = _adaptEmptyData(response.data)
        response.errors =  _errorsAdapt(
            _adaptEmptyErrors(response.errors)
        );
        return response;
    }

    function checkStatusHTTP(response) {
        //range 200-299
        if (response.ok) {
            return response;
        } else {
            throw new Error("Bad status of response from server: " + response.status + " \"" + response.statusText + "\"")
        }
    }

    function parseJSON(response) {
        let json;
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
            json = response.json();
            console.log(json)
            return json;
        } else {
            throw new TypeError("Content-Type of response from server is not the JSON!");
        }
    }

    function handlerGlobalExeptionStatus(response, dispatch, url){
        switch (response.status){
            case 2:
                dispatch(addTypicalMessage('ERROR', `${url} ${response.APIErrorMessage}`))
                throw response.APIErrorMessage;
                break;
            case 3: dispatch(unauthorizedStatus()); break;
        }
        return response;
    }

    function RESTWrapper(){

    }
}

export default AjaxTransport;
