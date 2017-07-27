import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DevActions from '../../../redux/actions/DevActions'
import config from '../../../config'
import classNames from 'classnames'
import { Link } from 'react-router'
import LanguagePicker from '../LanguagePicker'
import './style.scss'
import { setApiPath } from '../../../localStorageManager'

class DevPanel extends Component{
    constructor(props){
        super(props)
        this.state = { fixed: false }
        this.onClick = this.onClick.bind(this)
        this.selectedValue = this.selectedValue.bind(this)
        this.handleFixedChange = this.handleFixedChange.bind(this)
    }

    onClick(event){
        setApiPath(event.target.value)
        window.location.reload();
    }

    selectedValue(){
        return this.props.system.apiPath;
    }

    handleFixedChange(event){
        this.setState({
            fixed: event.target.checked
        })
    }
    
    render(){
        var servers = [
            config.HTTP_API_PATH,
            "http://localhost:3001/"
        ];

        var routes = [
            "index",
            "login",
            "register",
            "agreement",
            "feedback",
            "about",
            "password",
            "confirm/register/1234",
            "confirm/password/1234",

            "profile",
            "attachment",
            "attachment/why",
            "attachment/clinic",
            "attachment/passport",
            "attachment/insurance",
            "attachment/contacts",

            "settings/system",
            "settings/insurance",
            "settings/passport",
            "settings/contacts",

            "calendar",
            "calendar/empty",
            "calendar/list",
            "calendar/in-process",

            "meeting",
            "meeting/finish",
            "meetings/1",
            "medics/3",
            "clinics/1"
        ];

        var HTTP_BASE_PATH = config.HTTP_BASE_PATH;

        return (
            <div className="dev-panel" >
                <div className={classNames({"dev-panel_moved": true, "js-fixed": this.state.fixed})}>
                    <div className="dev-panel_splinter">Dev panel</div>
                    <div className="inside_panel_scroll">
                        <label>
                            <input onChange={this.handleFixedChange} type="checkbox"/>Прикрепить панельку
                        </label>
                        <ul>
                            {
                                routes.map(function(route){
                                    return (
                                        <li key={route} className="dev-panel-links-item">
                                            <Link activeClassName="actived" to={HTTP_BASE_PATH + route}>{route}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <LanguagePicker />
                        { servers.map((item, index) =>
                            <label className="checkbox-box" key={"input"+index}>
                                <input
                                    onClick={this.onClick}
                                    onChange={function loop(){/* You provided a `checked` prop to a form field without an `onChange` handler. */}}
                                    name="server"
                                    type="radio"
                                    value={item}
                                    checked={item == this.selectedValue()}
                                />
                                {item}
                            </label>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

DevPanel.propTypes = {
    fixed: PropTypes.bool
}

let DevPanelConnected = connect(
    state => ({
        system: state.system
    }),
    dispatch => ({
        changeAppSettings: data => { dispatch(DevActions.changeAppSettings(data)) }
    })
)(DevPanel)

export default DevPanelConnected