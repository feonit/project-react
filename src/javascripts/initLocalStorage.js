import config from './config'
import * as localStorageManager from './localStorageManager'

export default function initLocalStorage(){
    if (!localStorageManager.getApiPath()){
        localStorageManager.setApiPath(config.HTTP_API_PATH)
    }
    return localStorage;
}
