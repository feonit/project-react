import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import config, { DEVICE_CLASS_INSIDE, DEVICE_CLASS_OUTSIDE } from '../../../config'
import * as authActions from '../../../redux/actions/AuthActions'
import './style.scss'
import classNames from 'classnames'

class AutoLogoutWrapper extends Component{
    constructor(props){
        super(props)

        this.timeOnline = 0
        this.intervalId = null
        this.intervalCountDownId = null

        switch (config.DEVICE_CLASS){
            case DEVICE_CLASS_INSIDE:
                this.maxTime = 180; break;
            case DEVICE_CLASS_OUTSIDE:
                this.maxTime = 60*60; break;
            default:
                throw Error('Not found "DEVICE_CLASS" param of configuration!')
        }
        
        this.ALLOTTED_TIME = 30;

        this.state = { isDialogOpen: false, countdown: this.ALLOTTED_TIME }

        this.onCancel = this.onCancel.bind(this)
        this.onActivateClick = this.onActivateClick.bind(this)
    }

    componentDidMount(){
        this.startOnlineTimer()
    }

    componentWillUnmount(){
        this._reset()
    }

    startOnlineTimer(){
        this._reset();
        this.intervalId = setInterval(() => {
            this.timeOnline = this.timeOnline + 1;
            if ( this.timeOnline > this.maxTime ){
                clearInterval(this.intervalId)

                if ( config.DEVICE_CLASS === DEVICE_CLASS_OUTSIDE){
                    this.props.logoutAction()
                } else {
                    this._showDialog()
                }
            }
        }, 1000)
    }

    onCancel(){
        this.setState({
            isDialogOpen: false,
            countdown: this.ALLOTTED_TIME
        }, () => {
            this.startOnlineTimer()
        })
    }

    _showDialog(){
        this.setState({
            isDialogOpen: true
        }, () => {
            this.intervalCountDownId = setInterval(() => {
                if ( this.state.countdown <= 0 ){
                    this.props.logoutAction()
                } else {
                    this.setState({ countdown: this.state.countdown - 1 })
                }
            }, 1000)
        })
    }

    _reset(){
        if ( this.intervalId ){
            clearInterval( this.intervalId )
        }

        if ( this.intervalCountDownId ){
            clearInterval( this.intervalCountDownId )
        }
        

        this.timeOnline = 0;
        this.intervalId = null;
        this.intervalCountDownId = null;
        this.countdown = this.ALLOTTED_TIME;
    }

    onActivateClick(){
        this.startOnlineTimer()
    }

    render(){
        return (
            <div onClickCapture={this.onActivateClick}>
                { this.state.isDialogOpen && (
                    <div className="logout-dialog">
                        <div className="logout-dialog_bg"></div>
                        <div className="logout-dialog_box">
                            <p className="logout-dialog_message">
                                {`Автоматический выход из сессии личного кабинета через ${this.state.countdown} секунд`}
                            </p>
                            <div className="logout-dialog_bar">
                                <button className="btn_style logout-dialog_buttons" onClick={this.onCancel}>Продолжить работу</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={classNames({"blur": this.state.isDialogOpen})}>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

AutoLogoutWrapper.propTypes = {}

AutoLogoutWrapper.defaultProps = {}

let AutoLogoutWrapperConnected = connect( null, dispatch => ({
    logoutAction: () => dispatch( authActions.fetchLogout() )
}))(AutoLogoutWrapper)

export default AutoLogoutWrapperConnected