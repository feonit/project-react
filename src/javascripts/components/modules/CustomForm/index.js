import './style.css'

/**
 * Класс Форма
 * Инкапсулирует в себе поведение формы при котором блокируется все элементы отправляемой формы
 * @interface {function} onSubmit — обработчик отправдки формы, срабатывает перед отправкой
 * */
import { Component, PropTypes } from 'react'

class CustomForm extends Component{
    constructor(props){
        super(props)
        this.state = { disabled: false }
        this.handleSubmitWrapper = this.handleSubmitWrapper.bind(this)
    }

    handleSubmitWrapper(){
        var fnRes;

        this.setState({disabled: true});

        fnRes = this.props.onSubmit.apply(this, arguments);

        if (fnRes instanceof Promise){
            return fnRes
                .then(() => {
                    this.setState({disabled: false})
                })
                .catch( error => {
                    throw error
                })
        } else {
            return fnRes;
        }
    }

    render(){
        return (
            <form ref="thatFrom" {...this.props} onSubmit={this.handleSubmitWrapper}>
                <fieldset disabled={this.state.disabled}>
                    {this.props.children}
                </fieldset>
            </form>
        )
    }
}

CustomForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default CustomForm