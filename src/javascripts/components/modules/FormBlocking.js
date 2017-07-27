import './CustomForm/style.css'

/**
 * Класс Форма
 * Инкапсулирует в себе поведение формы при котором блокируется все элементы отправляемой формы
 * @interface {function} onSubmit — обработчик отправдки формы, срабатывает перед отправкой
 * */
import { Component, PropTypes } from 'react'

class FormBlocking extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <form ref="thatFrom" {...this.props}>
                <fieldset disabled={this.props.disabled}>
                    {this.props.children}
                </fieldset>
            </form>
        )
    }
}

FormBlocking.propTypes = {
    disabled: PropTypes.bool
}

export default FormBlocking