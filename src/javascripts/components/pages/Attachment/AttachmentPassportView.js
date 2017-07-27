import translate from '../../../i18n/Translate'
import { Component, PropTypes } from 'react'
import PassportForm from '../../modules/PassportForm'
import * as actions from '../../../redux/actions/UserActions'
import {connect} from 'react-redux'
import ValidationPassportForm from '../../../models/ValidationPassportForm'

class AttachmentPassportView extends Component{
    constructor(){
        super()
        this.onBtnClick = this.onBtnClick.bind(this)
    }

    onBtnClick(event) {
        this.props.addData();
        this.props.fetchUpdatePatient(this.props.patient.id, this.props.passportForm)
            .then( data => {
                this.context.router.push('/attachment/insurance')
            }, errors => {
                
            })
    }

    render() {
        var trans = this.props.trans;

        return (
            <div>
                <section className="mid_center_block">
                    <PassportForm />
                </section>
                <div className="btn_placeholder right_align_pos">
                    <button onClick={this.onBtnClick} disabled={!this.props.isValid} className="btn_style">Дальше</button>
                </div>
            </div>
        );
    }
}

AttachmentPassportView.contextTypes = {
    router: PropTypes.object
}

export default connect(
    state => {
        let { isValid } = (new ValidationPassportForm).validate(state.user.passportForm)

        return {
            passportForm: state.user.passportForm,
            patient: state.user.patient,
            isValid: isValid
        }
    },
    dispatch => ({
        fetchUpdatePatient: (patientId, data) => dispatch(actions.fetchUpdatePatient(patientId, data)),
        addData: () => dispatch(actions.addPassportData()
    )}
))(AttachmentPassportView);