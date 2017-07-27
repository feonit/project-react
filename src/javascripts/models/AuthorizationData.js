import PropTypes from 'prop-types'
import ServerData from './ServerData'

class AuthorizationData extends ServerData{
    constructor( data = {} ){
        super()

        let { accessToken = "", patientId = 0, eventSourceChannel = "" } = data;

        Object.defineProperties(this, {
            accessToken: {
                value: accessToken,
                enumerable: true
            },
            patientId: {
                value: patientId,
                enumerable: true
            },
            eventSourceChannel: {
                value: eventSourceChannel,
                enumerable: true
            }
        })

        PropTypes.validateWithErrors({
            accessToken: PropTypes.string.isRequired,
            patientId: PropTypes.number.isRequired,
            eventSourceChannel: PropTypes.string.isRequired
        }, this, this.constructor.name);
    }

    // данные есть
    get isFetched(){
        return !!this.accessToken && !!this.patientId;
    }

    // судя по этим данным юзер авторизован или нет
    get isAuthorized(){
        return this.isFetched && !!this.dateCreate; //todo время когда токен тухнет
    }
}

export default AuthorizationData