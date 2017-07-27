import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import translate from '../../../i18n/Translate'
import { connect } from 'react-redux'
import * as actions from '../../../redux/actions/UserActions'

class CalendarPage extends Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.fetchProfile(this.props.patientId)
            .then(() => {
                if (this.props.attachmentState === null){
                    this.context.router.replace('/attachment')
                } else {
                    this.context.router.replace('/calendar')
                }
            })
    }
    
    render(){
        var trans = this.props.trans;

        return (
            <div className="static_overflow">
                <div className="bg_overflow left_position calendar_doc_image"></div>
                <div className="main_content mobile-none">
                    <div className="white_mask calendar_angle">
                        <section className="calendar_step_block">
                            <section className="profile_header_links">
                                <Link className="profile_item_block" to="/profile"></Link>
                                <Link className="top_line_left" to="/calendar">telemed.</Link>
                            </section>
                            <section className="mid_center_block">
                                <section className="step_block_cell width_step270">
                                    <div className="calendar_nav_menu">
                                        <Link className="left_link_style active_link" to="/calendar">Календарь</Link>
                                        {(function(){
                                            var links = [];
                                            if (this.props.attachmentState === "QUEUE"){
                                                links.push(<span key="1" className="left_link_style">Запись на прием</span>)
                                                links.push(<span key="2" className="left_link_style">Вызов на дом</span>)
                                            } else {
                                                links.push(<Link key="1" className="left_link_style" to={{ pathname: '/meeting', query: { type: 'clinic' } }}>Запись на прием</Link>)
                                                links.push(<Link key="2" className="left_link_style" to={{ pathname: '/meeting', query: { type: 'home' } }} >Вызов на дом</Link>)
                                            }
                                            return links;
                                        }.call(this))}
                                        <Link className="left_link_style" to="/profile">Профиль</Link>
                                    </div>
                                    <div className="med_font_description">
                                        <p>
                                            <Link className="link_button" to="/feedback">Помощь</Link>
                                        </p>
                                        <p>
                                            <Link className="link_button" to="/agreement">Правовая информация</Link>
                                        </p>
                                        <p>
                                            <Link className="link_button" to="/about">О сайте</Link>
                                        </p>
                                    </div>
                                    <div className="bot_icon_container">
                                        <Link to="/index">
                                            <div className="small_icon_bot"></div>
                                        </Link>
                                    </div>
                                </section>
                            </section>
                        </section>
                    </div>
                </div>

                <div className="scroll_mask"></div>
                <div className="top_white_mask"></div>
                <div className="bot_white_mask"></div>
                <div className="calendar_container">

                    {
                        /** тут вставляется контент выбранной вкладки */
                        this.props.children
                    }

                </div>

                <div className="main_foot_info">
                    <div className="copy_right">Nephrology Expert Council</div>
                </div>

            </div>
        );
    }
}

CalendarPage.contextTypes = {
    router: PropTypes.object
}

export default translate("CalendarPage")(connect(
    state => ({
        patientId: state.auth.authorizationData.patientId,
        attachmentState: state.user.patient.attachmentState
    }),
    dispatch => ({
        fetchProfile: patientId => dispatch(actions.fetchProfile(patientId))
    })
)(CalendarPage));