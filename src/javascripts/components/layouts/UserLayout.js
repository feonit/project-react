import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../redux/actions/UserActions'
import PreloaderView from '../../components/modules/PreloaderView'
import AuthorizationData from '../../models/AuthorizationData'
import AutoLogoutWrapper from '../modules/AutoLogoutWrapper'

class UserLayout extends Component{
    constructor(){
        super()
        this.state = { loaded: false }
    }

    componentWillMount(){
        let authorizationData = this.props.authorizationData
        this._redirectIfNotAuthorized( authorizationData, () => {
            this._fetchProfile(authorizationData.patientId)
        })
    }

    componentWillUpdate(nextProps){
        this._redirectIfNotAuthorized( nextProps.authorizationData, () => {

            // если id профиля изменился
            if (nextProps.authorizationData.patientId !== this.props.authorizationData.patientId){
                this._fetchProfile(nextProps.authorizationData.patientId)
            }
        })
    }

    _redirectIfNotAuthorized(authorizationData, callback){
        if ( !authorizationData.isAuthorized ){
            this.context.router.replace('/login')
        } else {
            callback && callback()
        }
    }

    _fetchProfile(patientId){
        this.setState({ loaded: false }, () => {
            this.props.fetchProfile( patientId )
                .then(() => {
                    this.setState({ loaded: true })
                })
        })
    }

    render(){
        return <AutoLogoutWrapper>
            { this.state.loaded ? this.props.children  : <PreloaderView /> }
        </AutoLogoutWrapper>
    }
}

UserLayout.propTypes = {
    authorizationData: PropTypes.instanceOf(AuthorizationData).isRequired,
    fetchProfile: PropTypes.func.isRequired
}

UserLayout.contextTypes = {
    router: PropTypes.object
}


let UserLayoutConnected = connect( state => ({
    authorizationData: state.auth.authorizationData
}), dispatch => ({
    fetchProfile: id => dispatch( userActions.fetchProfile(id) )
}))(UserLayout)

export default UserLayoutConnected
