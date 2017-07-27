import { Component, PropTypes } from 'react'
import RawMaskedInput from './RawMaskedInput'

class PhoneInput extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <RawMaskedInput
                ref="self"
                {...this.props}
                value={this.props.value}
                mask="8 111 111 11 11"
                placeholderChar=" "
                placeholder="8 123 456 78 90"
                onChange={this.props.onChange}
                // onChange={this._onChange}
            />
        )
    }
}

PhoneInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
}

PhoneInput.defaultProps = {}

export default PhoneInput