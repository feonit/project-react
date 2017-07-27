import { Component, PropTypes } from 'react'
import makeCancelable from '../../../2015/promise/makeCancelable'
import style from './style.css'

class ButtonSubmitForm extends Component{
    constructor(props){
        super(props)
        this.cancelablePromise = null
        this.state = { isLoading: this.props.isLoading }
        this.onClick = this.onClick.bind(this)
    }

    componentWillReceiveProps(newProps){
        this.setState({ isLoading: newProps.isLoading })
    }

    componentWillUnmount(){
        if (this.cancelablePromise){
            this.cancelablePromise.cancel();
        }
    }

    onClick(event){
        if (this.props.onClick){
            var promise = this.props.onClick.apply(this, arguments);
            if (promise instanceof Promise){
                this.cancelablePromise = makeCancelable(promise);
                this.setState({ isLoading: true }, () => {
                    this.cancelablePromise
                        .promise
                        .then(() => {
                            this.setState({isLoading: false})
                        })
                        .catch(err => {
                            throw err;
                        })
                });
            }
        }
    }

    render(){
        var insideLoader = this.state.isLoading ? <div className='uil-ring-css'><div></div></div> : "";
        var hiddenStyle = this.state.isLoading ? { color: "rgba(255, 255, 255, 0)" } : {};

        return (
            <button disabled={this.props.disabled || this.state.isLoading} onClick={this.onClick} className="btn_style" type="submit" style={hiddenStyle}>
                {this.props.children}
                {insideLoader}
            </button>
        )
    }
}

ButtonSubmitForm.propTypes = {
    isLoading: PropTypes.bool,
    onClick: PropTypes.func
}

ButtonSubmitForm.defaultProps = {
    isLoading: false
}

export default ButtonSubmitForm