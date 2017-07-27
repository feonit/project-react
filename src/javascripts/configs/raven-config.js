import Raven from 'raven-js'
import config from '../config'

if (config.NODE_ENV == 'production'){
    Raven.config(config.SENTRY_DSN).install();
    
    window.onerror = function logException(ex, context) {
        Raven.captureException(ex, {
            extra: context
        });
        /*eslint no-console:0*/
        window.console && console.error && console.error(ex);
    }
}



