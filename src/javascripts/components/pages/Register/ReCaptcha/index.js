import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import './style.css'
import config from '../../../../config'

class ReCaptcha extends Component{
    constructor(props){
        super(props)
        this.state = {
            widgetId: 0
        }
        this.verifyCallback = this.verifyCallback.bind(this)
        this.expiredCallback = this.expiredCallback.bind(this)
    }

    componentWillMount(){
        this.registerOnloadCallbackGlobaly();

        // delete window.___grecaptcha_cfg;
        // delete window.__google_recaptcha_client;
        // delete window.recaptcha;

        var script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl="+this.props.lang;
        script.async = true;
        document.head.appendChild(script);
    }

    registerOnloadCallbackGlobaly(){
        var that = this;
        var onloadCallback = function() {
            that.renderCaptcha();
        };

        window.onloadCallback = onloadCallback;
    }

    renderCaptcha(){
        var RecaptchaOptions = {
            'sitekey' : config.RECAPTCHA_PUBLIC_KEY,
            'theme' : 'light',
            'callback' : this.verifyCallback,
            'expired-callback': this.expiredCallback
        };
        // var el = document.getElementById('html_element');
        // el.innerHTML='';
        var widgetId = grecaptcha.render('html_element', RecaptchaOptions);
        this.setState({widgetId: widgetId})
    }

    verifyCallback(){
        var data = grecaptcha.getResponse(this.state.widgetId);
        if (this.props.onVerify && data){
            this.props.onVerify(data)
        }
    }

    expiredCallback(){
        this.renderCaptcha();
        // reset value
        this.props.onVerify('');
    }

    componentWillUnmount(){
        try{
            grecaptcha.reset(this.state.widgetId)
        }
        catch(e){

        }
    }

    render(){
        return (
            <div id="html_element"></div>
        );
    }
}

ReCaptcha.propTypes = {
    lang: PropTypes.string,
    onVerify: PropTypes.func,
    widgetId: PropTypes.number
}

ReCaptcha.defaultProps = {
    lang: "en"
}

export default connect( state => { lang: state.user.lang }, null)(ReCaptcha);