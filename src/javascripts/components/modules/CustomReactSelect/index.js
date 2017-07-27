import { Component, PropTypes } from 'react'
import Select from 'react-select'
import './react-select.css'
import './react-select-modification.css'

class CustomReactSelect extends Component{
    constructor(props){
        super(props)
        this.state = {
            disabled: false,
            value: this.props.value
        }
        this._onChange = this._onChange.bind(this)
    }

    _onChange(option){
        this.setState({ value: option.value }, function(){
            if (this.props.onChange){
                this.props.onChange(option.value);
            }
        });
    }
    
    render(){
        return (
            <Select
                name={this.props.name}
                options={this.props.options}
                value={this.state.value}
                disabled={this.props.disabled}
                placeholder={"Select"}
                onChange={this._onChange}
                clearable={false}
            />
        )
    }
}

CustomReactSelect.propTypes = {
    onChange: PropTypes.func
}

export default CustomReactSelect