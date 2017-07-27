import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as AuthActions from '../redux/actions/AuthActions'

class LogoutContainer extends Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.fetchLogout()
            .then(() => {
                this.context.router.push('/login');
            }, err => {
                throw err;
            })
    }
    
    render(){
        return (
            <p>You are now logged out</p>
        );
    }
}

LogoutContainer.contextTypes = {
    router: PropTypes.object
}

LogoutContainer.propTypes = {}

LogoutContainer.defaultProps = {}

export default connect(
    state => ({}),
    dispatch => ({
        fetchLogout: () => dispatch(AuthActions.fetchLogout())
    })
)(LogoutContainer);
