import CLI from './CLI/index'
import addons from './addons/InputMask.prototype.getRipeValue'
import React from 'react'
import ReactRedux, { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import browsersSupport from './browsersSupport'
import router from './router'
import TranslationProvider from './i18n/TranslationProvider'
import '../stylesheets/style.scss'
import '../stylesheets/style_modifications.scss'
import './configs/raven-config'
import './configs/local-server-support'
import initLocalStorage from './initLocalStorage'
import initStore from './store'
import AjaxTransport from './AjaxTransport'

export const localStorage = initLocalStorage();
export const store = initStore();
export const http = new AjaxTransport(store.dispatch)

var root = document.getElementById('root');

console.log("Running App version " + VERSION + ' at \"' + NODE_ENV + '\" mode');

ReactDOM.render(
    <Provider store={store}>
        <TranslationProvider>
            {router}
        </TranslationProvider>
    </Provider>
    ,
    root
);
