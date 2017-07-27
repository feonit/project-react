/**
 * Модуль компонент-обертка над MaskedInput, для получения сырых значений
 * */

import { Component } from 'react'
import MaskedInput from 'react-maskedinput'
import addons from '../../addons/InputMask.prototype.getRipeValue'

class RawMaskedInput extends Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(syntheticInputEvent){
        // warn:hack used addon
        var value = this.refs.self.mask.getRipeValue();

        // подменим на то что нам нужно
        if (this.props.onChange){
            this.props.onChange({ target: { value: value } });
        }
    }

    render(){
        return (
            <MaskedInput ref="self"
                {...this.props}
                 onChange={this.handleChange}
            />
        );
    }
}

RawMaskedInput.propTypes = {}

RawMaskedInput.defaultProps = {}

export default RawMaskedInput