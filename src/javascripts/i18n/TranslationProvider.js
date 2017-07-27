import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class TranslationProvider extends Component{
    constructor(props, context){
        super(props, context)
    }

    getChildContext(){
        return {
            store: this.context.store,
            currentLanguage: this.props.currentLanguage
        };
    }

    render(){
        return this.props.children;
    }
}

TranslationProvider.propTypes = {
    children: PropTypes.object,
    currentLanguage: PropTypes.string
}

TranslationProvider.defaultProps = {}

TranslationProvider.childContextTypes = {
    currentLanguage: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
}

TranslationProvider.contextTypes = {
    store: PropTypes.object
};

export default connect(
    state => ({ currentLanguage: state.user.lang }), null)
(TranslationProvider)
