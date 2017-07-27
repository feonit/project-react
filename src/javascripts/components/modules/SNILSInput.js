import { Component, PropTypes } from 'react'
import RawMaskedInput from './RawMaskedInput'

class SNILSInput extends Component{
    constructor(props){
        super(props)
        this.focus = this.focus.bind(this)
    }

    focus(){
        this.refs["self"].focus();
    }

    render(){
        return (
            <RawMaskedInput 
                ref="self"
                {...this.props}
                mask="111-111-111-11"
                placeholder="000-000-000-00"
                placeholderChar=" "
                onChange={this.props.onChange}
            />
        );
    }
}

SNILSInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

SNILSInput.defaultProps = {}

export default SNILSInput