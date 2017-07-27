import translate from '../../../i18n/Translate'
import { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import FooterMenu from '../../modules/FooterMenu'
import GoBackButton from '../../modules/GoBackButton'
import { connect } from 'react-redux'
import * as actions from '../../../redux/actions/UserActions'
import PreloaderImg from '../../modules/PreloaderView/index'

class AttachmentLayout extends Component{

    constructor(){
        super()

        this.state = { loaded: false }
    }

    componentWillMount() {
        this.props.fetchAllClinics()
            .then(()=>{
                this.setState({loaded: true})
            })
    }

    render() {
        var trans = this.props.trans;
        var pathname = window.location.pathname;

        var dinamicSide;

        if (this.props.location.pathname == "/attachment/clinic"){

            var imgClinicLink;

            if (this.props.currentClinicId){
                imgClinicLink = this.props.clinics[this.props.currentClinicId].promoLink
            }

            dinamicSide = <img src={imgClinicLink} />
        }

        var clinicPLaceholder = this.props.clinics && this.props.clinics[this.props.attachmentFormChosenValues.clinicId] && this.props.clinics[this.props.attachmentFormChosenValues.clinicId].shortName || 'Клиника';
        var passportPlaceholder = (((this.props.passportForm.documentSerial && (this.props.passportForm.documentSerial + '  '))  || '') + (this.props.passportForm.documentNumber || '')) || "Паспорт";
        var insurancePlaceholder = this.props.insuranceForm.insurancePolicyNumber || "Полис";

        return this.state.loaded && (
                <div>
                    <div className="main_content">
                        <div className="left_static_column">
                            <div className="side_space">
                                <GoBackButton/>
                            </div>
                            <div className="mid_side_space">
                                <Link to="/attachment/clinic"
                                      activeClassName="curent_chose"
                                      className={ classNames("selector_step_block", {"chosen": (pathname !== "/attachment/clinic" && !!this.props.attachmentFormChosenValues.clinicId)})}>
                                    <span className="header_step_txt">{pathname === "/attachment/clinic" ? "Поликлиника" : clinicPLaceholder }</span>
                                    <span className="header_step_note">{pathname === "/attachment/clinic" ? "Выберите одну" : "Поликлиника" }</span>
                                </Link>
                                <Link to="/attachment/passport"
                                      activeClassName="curent_chose"
                                      className={ classNames("selector_step_block", {"chosen": (pathname !== "/attachment/passport" && !!this.props.passportForm.documentNumber)})}>
                                    <span className="header_step_txt">{pathname === "/attachment/passport" ? "Паспорт" : passportPlaceholder }</span>
                                    <span className="header_step_note">{pathname === "/attachment/passport" ? "Укажите паспортные данные" : "Паспорт" }</span>
                                </Link>
                                <Link to="/attachment/insurance"
                                      activeClassName="curent_chose"
                                      className={ classNames("selector_step_block", {"chosen": (pathname !== "/attachment/insurance" && !!this.props.insuranceForm.insurancePolicyNumber)})}>
                                    <span className="header_step_txt">{pathname === "/attachment/insurance" ? "Полис ОМС" : insurancePlaceholder }</span>
                                    <span className="header_step_note">{pathname === "/attachment/insurance" ? "Введите данные полиса" : "Полис ОМС" }</span>
                                </Link>
                                <Link to="/attachment/contacts"
                                      activeClassName="curent_chose"
                                      className={ classNames("selector_step_block") }>
                                    <span className="header_step_txt">{pathname === "/attachment/contacts" ? "Контакты" : "Контакты" }</span>
                                    <span className="header_step_note">{pathname === "/attachment/contacts" ? "Укажите контактные данные" : "Контактные данные" }</span>
                                </Link>
                                <div className="info_bot_desc">
                                    Изменить поликлинику можно через год после прикрепления.
                                </div>
                            </div>
                        </div>
                        <div className="mid_static_column">
                            <section className="profile_header_links">
                                <Link title="Профиль" to="/profile" className="profile_item_block"></Link>
                                <Link className="top_line_left" to="/calendar">telemed.</Link>
                                <span className="head_line_border"></span>
                                <span className="top_line_left">Прикрепление</span>
                            </section>

                            {
                                /** тут вставляется контент выбранной вкладки */
                                this.props.children
                            }
                        </div>


                        <FooterMenu />

                        <div className="bot_icon_container">
                            <Link to="/index">
                                <div className="small_icon_bot"></div>
                            </Link>
                        </div>
                    </div>

                    <div className="clinic_photo">
                        {/**todo костыль*/dinamicSide}
                    </div>
                </div>
            );
    }
}
export default translate("AttachmentLayout")(
connect(
    state => ({
        clinics: state.user.clinics,
        attachmentFormChosenValues: state.user.attachmentFormChosenValues,
        passportForm: state.user.passportForm,
        insuranceForm: state.user.insuranceForm,
        currentClinicId: state.user.attachmentFormChosenValues.clinicId
    }),
    dispatch => ({
        fetchAllClinics: () => dispatch(actions.fetchAllClinics())
    })
)(AttachmentLayout));