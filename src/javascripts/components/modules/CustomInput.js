/**
 * Декоратор. Добавляет специальные возможности существующему инпуту такие как динамичные label и маску, передаваемый
 * в this.props.children
 * */
import { Component, cloneElement, PropTypes } from 'react'
import classNames from 'classnames'

class CustomInput extends Component{
    constructor(props){
        super(props)
        this.state = {
            hasError: this.props.hasError,
            focused: false,
            filled: !!this.props.children.props.value,
            subMask: ""
        }
        this.onLabelFocus = this.onLabelFocus.bind(this)
        this.onLabelBlur = this.onLabelBlur.bind(this)
    }

    componentWillReceiveProps(newProps){

        // update mask
        // if (this.props.subMask){
        //     state.subMask = this._generateSubMaskWithValue(originalValue, this.props.placeholderMask);
        // }

        this.setState({
            hasError: newProps.hasError,
            filled: !!newProps.children.props.value
        })
    }

    _generateSubMaskWithValue(value, mask){
        var index = 0;
        var arr = mask.split("");
        arr = arr.map(function(letter) {
            if (letter == "0") {
                //todo
                letter = value.slice(index, index+1)
                index++;
            }
            return letter;
        });
        return arr.join("");
    }

    onLabelFocus(){
        this.setState({
            "focused": true
        })
    }

    onLabelBlur(){
        this.setState({
            "focused": false
        })
    }

    componentDidMount(){
        this.refs.label.addEventListener("focus", this.onLabelFocus, true);
        this.refs.label.addEventListener("blur", this.onLabelBlur, true);
    }

    componentWillUnmount(){
        this.refs.label.removeEventListener("focus", this.onLabelFocus);
        this.refs.label.removeEventListener("blur", this.onLabelBlur);
    }

    shouldComponentUpdate(nextProps, nextState){
        // когда поле не пустое, динамика не нужна, поэтому перерисовывать тоже
        if (nextState.focused === true && this.state.focused === false && nextState.filled){
            return false;
        } else {
            return true;
        }
    }

    render(){
        var maskElem = !this.state.subMask ? "" : <span className="second_layer_span">{this.state.subMask}</span>;

        return (
            <label ref="label" data-name={this.props.errorText || this.props.labelText} className={classNames({
                "input_label_name": true,
                "error": this.props.hasError || !!this.props.errorText,
                "filled": this.state.filled || this.state.focused
            })}>
                {maskElem}
                {this.props.children}
            </label>
        );
    }
}

CustomInput.propTypes = {
    hasError: PropTypes.bool,
    labelText: PropTypes.string,
    errorText: PropTypes.string,
    placeholderMask: PropTypes.string,
    value: PropTypes.string
}

CustomInput.defaultPtops = {
    hasError: false
}

export default CustomInput