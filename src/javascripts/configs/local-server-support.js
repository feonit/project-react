/**
 * 
 * Support for local servers like webstorm 
 * */

var findBasePath = function(){
    // /page => /
    // /client/page => /client/
    // /client/build/ => /client/build/
    // /client/build/index.html => /client/build/
    var search = window.location.pathname.match(/\/((.)*\/)?/g);
    if (!search){
        throw Error("base path not defined")
    }
    return search[0];
};

var exportVal = {};

// для запуска через вебшторм
if (location.pathname.match("doc-front/build")){
    exportVal.HTTP_BASE_PATH = "/doc-front/build/"
}

export default exportVal;