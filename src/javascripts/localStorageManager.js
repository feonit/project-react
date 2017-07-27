export function setApiPath(path){
    return localStorage.setItem("server_api_path", path);
}

export function getApiPath(){
    return localStorage.getItem("server_api_path");
}

export function getAuthData(){
    let authorizationData = void 0;
    let buf = localStorage.getItem('authorizationData')
    try {
        let parsed = JSON.parse(buf)
        if (parsed){
            authorizationData = parsed;
        }
    } catch (e) {
        throw e;
    }
    return authorizationData;
}

export function setAuthData(data){
    localStorage.setItem('authorizationData', JSON.stringify(data))
}

export function removeAuthData(){
    localStorage.removeItem('authorizationData')
}