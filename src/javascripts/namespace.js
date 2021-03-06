var APP = {};


APP.namespace = function (nsString) {
    var parts = nsString.split('.'),
        parent = APP,
        i;
    // отбросить начальный префикс – имя глобального объекта
    if (parts[0] === 'APP') {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        // создать свойство, если оно отсутствует
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

/**
 * Глобальная область приложения
 * @namespace APP
 * */
APP.namespace('APP');

/**
 * Все события
 * @namespace APP.actions
 * */
APP.namespace('APP.actions')

APP.namespace('APP.store')

import store from './store'
APP.store = store;


import * as UserActions from './redux/actions/UserActions';

APP.actions.UserActions = UserActions;

window.app = APP;

export default APP;