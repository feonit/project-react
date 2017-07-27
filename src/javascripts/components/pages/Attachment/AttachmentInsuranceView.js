import translate from '../../../i18n/Translate'
import { Component, PropTypes } from 'react'
import InsuranceForm from '../../modules/InsuranceForm'
import * as actions from '../../../redux/actions/UserActions'
import {connect} from 'react-redux'
import ValidationInsuranceForm from '../../../models/ValidationInsuranceForm'

class AttachmentInsuranceView extends Component{
    constructor(){
        super()
        this.onBtnClick = this.onBtnClick.bind(this)
    }

    onBtnClick(event) {
        this.props.addData();
    
        this.props.fetchUpdatePatient(this.props.patient.id, this.props.insuranceForm)
            .then( data => {
                this.context.router.push('/attachment/contacts')
            }, errors => {
                
            })
    }

    render() {
        var trans = this.props.trans;
    
        return (
            <div>
                <section className="mid_center_block">
                    <InsuranceForm />
                </section>
                <div className="btn_placeholder right_align_pos">
                    <button onClick={this.onBtnClick} disabled={!this.props.isValid} type="button" className="btn_style">Дальше</button>
                </div>
            </div>
        );
    }
}

AttachmentInsuranceView.contextTypes = {
    router: PropTypes.object
}

export default connect(
    state => {
        let { isValid } = (new ValidationInsuranceForm).validate(state.user.insuranceForm)

        return {
            insuranceForm: state.user.insuranceForm,
            patient: state.user.patient,
            isValid: isValid
        }
    },
    dispatch=>({
        fetchUpdatePatient: (patientId, data) => dispatch(actions.fetchUpdatePatient(patientId, data)),
        addData: () => dispatch(actions.addInsuranceData())
    })
)(AttachmentInsuranceView);