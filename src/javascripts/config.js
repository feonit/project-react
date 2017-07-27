/**
 * Полученная конфигурация
 * */

import localServerSupport from './configs/local-server-support'

let defaultOptions = {
    NODE_ENV: "development",
    HTTP_BASE_PATH: "/",
    HTTP_API_PATH: "/"
};

// from definePlugin, see config build
let envOptions = {
    NODE_ENV: NODE_ENV,
    DEVICE_CLASS: DEVICE_CLASS,
    HTTP_BASE_PATH: HTTP_BASE_PATH,
    HTTP_API_PATH: HTTP_API_PATH,
    VERSION: VERSION,
    SENTRY_DSN: SENTRY_DSN,
    RECAPTCHA_PUBLIC_KEY: RECAPTCHA_PUBLIC_KEY,
    ORIGIN_EVENT_SOURCE: ORIGIN_EVENT_SOURCE
};

const config = {...defaultOptions, ...envOptions, ...localServerSupport}

export const DEVICE_CLASS_INSIDE = 'INSIDE'
export const DEVICE_CLASS_OUTSIDE = 'OUTSIDE'

export default config;
