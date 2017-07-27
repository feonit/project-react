import { Component, PropTypes } from 'react'
import style from './ButtonSubmitForm/style.css'

class SubmitButton extends Component{
    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick(event){
        if (this.props.onClick){
            this.props.onClick.apply(this, arguments);
        }
    }

    render(){
        let insideLoader = !this.props.isLoading ? "" :
            <div className='uil-ring-css'>
                <div></div>
            </div>;
        
        let hiddenStyle = this.props.isLoading ? { color: "rgba(255, 255, 255, 0)" } : {};

        return (
            <button
                disabled={this.props.disabled || this.props.isLoading} 
                onClick={this.onClick}
                className="btn_style"
                type="submit"
                style={hiddenStyle}
            >
                {this.props.children}
                {insideLoader}
            </button>
        )
    }
}

SubmitButton.propTypes = {
    isLoading: PropTypes.bool,
    onClick: PropTypes.func
}

SubmitButton.defaultProps = {
    isLoading: false
}

export default SubmitButton