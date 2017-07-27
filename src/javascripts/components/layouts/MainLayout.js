import { Component } from 'react'
import { connect } from 'react-redux'
import DevPanel from '../modules/DevPanel'
import BoxMessages from '../modules/BoxMessages/index'
import LoadingSpinner from '../modules/LoadingSpinner/index'    //stuped bug if remove index
import config from '../../config'

class MainLayout extends Component{
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps){
        let savedPathneme = this.props.location.pathname;
        let newPathname = nextProps.location.pathname;

        if (newPathname !== savedPathneme){
            this.props.onPreviousPathnameChange(savedPathneme);
        }
    }
    
    render(){
        return (
            <div>
                { config.NODE_ENV === "development" && (
                    <div>
                        <DevPanel />
                        <BoxMessages />
                    </div>
                )}
                <LoadingSpinner isVisible={false}/>
                <div className="main_wrapper">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        previousPathname: state.user.previousPathname
    }),
    dispatch => ({
        onPreviousPathnameChange: value => { dispatch({ type: "UPDATE_PREVIOUSPATHNAME", previousPathname: value }) }
    })
)(MainLayout);
