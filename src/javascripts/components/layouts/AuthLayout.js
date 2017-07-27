import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AuthorizationData from '../../models/AuthorizationData'

class AuthLayout extends Component{

    componentWillMount(){
        this._redirectIfAuthorized(this.props.authorizationData)
    }

    componentWillUpdate(nextProps){
        this._redirectIfAuthorized(nextProps.authorizationData)
    }

    _redirectIfAuthorized(authorizationData){
        if ( authorizationData.isAuthorized ){
            this.context.router.replace('/calendar')
        }
    }

    // todo все равно пошел рисовать компонент, это плохо
    render(){
        return this.props.children
    }
}

AuthLayout.contextTypes = {
    router: PropTypes.object
}

AuthLayout.propTypes = {
    authorizationData: PropTypes.instanceOf(AuthorizationData).isRequired
}

let AuthLayoutConnected = connect( state => ({
    authorizationData: state.auth.authorizationData
}), dispatch => ({}))(AuthLayout)

export default AuthLayoutConnected