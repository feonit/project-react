
export const CHANGE_APP_SETTINGS = 'CHANGE_APP_SETTINGS'

export function changeAppSettings(data){
    return {
        type: CHANGE_APP_SETTINGS,
        data: data
    }
}