import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class AttachmentRedirect extends Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        if (this.props.patient && this.props.patient.attachmentState === null){
            this.context.router.replace('/attachment')
        }
    }
    
    render(){
        var view;

        if (this.props.patient && this.props.patient.attachmentState === "undefined"){
            view = <span>"...загрузка пациента"</span>;
        } else {
            view = this.props.children;
        }

        return view;
    }
}

AttachmentRedirect.contextTypes = {
    router: PropTypes.object
}

AttachmentRedirect.propTypes = {}

AttachmentRedirect.defaultProps = {}

export default connect( state => ({
    patient: state.user.patient
}))(AttachmentRedirect)