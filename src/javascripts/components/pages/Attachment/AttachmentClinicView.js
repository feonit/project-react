import translate from '../../../i18n/Translate'
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import * as actions from '../../../redux/actions/UserActions'
import { connect } from 'react-redux'
import PreloaderView from '../../modules/PreloaderView'
import { objPropsToArr } from '../../../helpers'


class AttachmentClinicView extends Component {
    constructor(){
        super()
        this.onClinicChooseClick = this.onClinicChooseClick.bind(this)
        this.onPrevClick = this.onPrevClick.bind(this)
        this.onNextClick = this.onNextClick.bind(this)
    }

    componentWillMount(){
        this.props.fetchAllClinics();
    }

    onClinicChooseClick() {
        this.props.clinicChosen(this.props.attachmentFormChosenValues.clinicId);

        this.props.fetchUpdatePatient(this.props.patient.id, {clinicId: this.props.attachmentFormChosenValues.clinicId})
            .then( data => {
                this.context.router.push('/attachment/passport');
            }, errors => {
                
            })
    }

    onPrevClick() {
        var current = this.props.clinics.find((i)=>{return i.id === this.props.attachmentFormChosenValues.clinicId});
        var index = this.props.clinics.indexOf(current);

        var prevIndex = index === 0
            ? this.props.clinics.length -1
            : index - 1;

        this.props.clinicChosen(this.props.clinics[prevIndex].id);
    }

    onNextClick() {
        var current = this.props.clinics.find((i)=>{return i.id === this.props.attachmentFormChosenValues.clinicId});
        var index = this.props.clinics.indexOf(current);
        var nextClinic = this.props.clinics[index + 1];

        var nextIndex = index + 1 === this.props.clinics.length
            ? 0
            : index + 1;

        var prevClinic = this.props.clinics[nextIndex];

        this.props.clinicChosen(prevClinic.id);
    }

    render() {
        var trans = this.props.trans;
        var ready;
        var currentClinic;
        var clinics = this.props.clinics;

        if (clinics){
            currentClinic = clinics.find((i)=>{return i.id === this.props.attachmentFormChosenValues.clinicId});
        }

        ready = clinics && currentClinic;

        return !ready? <PreloaderView/> : (
            <section className="mid_center_block">
                <div className="doctor_image_place">
                    {!(clinics && clinics.length >= 2) ? '' : <div className="navigation_arrows white_arrow">
                        <div onClick={this.onPrevClick} className="navi_arrow left_trig"></div>
                        <div onClick={this.onNextClick} className="navi_arrow right_trig"></div>
                    </div>}
                    {((() => {
                        return (
                            <div>
                                <div className="clinic_full_name_block">
                                    {currentClinic.name}
                                </div>
                                <div className="doctor_year_block">
                                    <p>
                                        {currentClinic.location}
                                    </p>
                                    <p>
                                        {currentClinic.city}
                                    </p>
                                    <p><Link to={`/clinics/${currentClinic.id}`}>информация о поликлинике</Link></p>
                                </div>
                                <div className="btn_placeholder">
                                    <button onClick={this.onClinicChooseClick} type="button" className="btn_style">Выбрать</button>
                                </div>
                            </div>
                        )
                    })())}
                </div>
            </section>
        );
    }
}

AttachmentClinicView.contextTypes = {
    router: PropTypes.object
}

export default connect(
    state => ({
        patient: state.user.patient,
        clinics: objPropsToArr(state.user.clinics),
        attachmentFormChosenValues: state.user.attachmentFormChosenValues
    }),
    dispatch => ({
        fetchUpdatePatient: (patientId, data) => dispatch(actions.fetchUpdatePatient(patientId, data)),
        clinicChosen: clinicId => dispatch(actions.attachmentChosenClinicId(clinicId)),
        fetchAllClinics: () => dispatch(actions.fetchAllClinics())
    })
)(AttachmentClinicView);