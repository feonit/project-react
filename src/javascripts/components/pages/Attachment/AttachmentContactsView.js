import translate from '../../../i18n/Translate'
import { Component, PropTypes } from 'react'
import * as actions from '../../../redux/actions/UserActions'
import { connect } from 'react-redux'
import ContactsForm from '../../modules/ContactsForm'
import ButtonSubmitForm from '../../modules/ButtonSubmitForm'
import { InsuranceSchema, PassportSchema, ContactsSchema } from '../../../models/Patient'

class AttachmentContactsView extends Component {
    constructor(){
        super()
        this.onSubmitClick = this.onSubmitClick.bind(this)
    }

    onSubmitClick(e) {
        e.preventDefault();
        let clinicId = this.props.attachmentFormChosenValues.clinicId;
        let patientId = this.props.patient.id;
        let patientData = this.props.contactsForm;
        
        this.props.addData();
        this.props.putDataToStore();

        return this.props.updatePatient(patientId, patientData)
            .then( data => {
                this.props.createAttachment(clinicId, patientId)
                    .then( data => {
                        this.props.fetchProfile(patientId)
                            .then( data => {
                                this.context.router.push('/calendar')
                            })
                    }, errors => {
                        throw errors;
                    })
            }, errors => {
                if (errors.clinicId){
                    this.context.router.push('attachment/clinic')
                    alert(errors.clinicId)
                }

                if (Object.keys(PassportSchema).some( key => { return (key in errors) && errors[key] })){
                    this.context.router.push('attachment/passport')
                } else

                if (Object.keys(InsuranceSchema).some( key => { return (key in errors) && errors[key] })){
                    this.context.router.push('attachment/insurance')
                } else

                if (Object.keys(ContactsSchema).some( key => { return (key in errors) && errors[key] })){
                    this.context.router.push('attachment/contacts')
                }
            })
    }

    render() {
        const trans = this.props.trans;
    
        return (
            <div>
                <section className="mid_center_block">
                    <ContactsForm />
                </section>
                <div className="btn_placeholder right_align_pos">
                    <ButtonSubmitForm onClick={this.onSubmitClick}  type="button" className="btn_style">Прикрепиться</ButtonSubmitForm>
                </div>
            </div>
        );
    }
}

AttachmentContactsView.contextTypes = {
    router: PropTypes.object
}

export default connect(
    state => ({
        patient: state.user.patient,
        // passportForm: state.user.passportForm,
        contactsForm: state.user.contactsForm,
        // insuranceForm: state.user.insuranceForm,
        attachmentFormChosenValues: state.user.attachmentFormChosenValues
    }),
    dispatch => ({
        putDataToStore: () => dispatch(actions.putContactsData()),
        addData: () => dispatch(actions.addContactsData()),
        updatePatient: (patientId, data)=>{
            return dispatch(actions.fetchUpdatePatient(patientId, data))
                .then( data => {
                    return data;
                }, errors => {
                    throw errors;
                })
        },
        createAttachment: (clinicId, patientId) => dispatch(actions.fetchAttachment(clinicId, patientId)),
        fetchProfile: patientId => dispatch(actions.fetchProfile(patientId))
    })
)(AttachmentContactsView);