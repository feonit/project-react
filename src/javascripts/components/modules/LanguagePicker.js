import { Component, PropTypes } from 'react'
import * as UserActions from '../../redux/actions/UserActions'
import { connect } from 'react-redux'
import translate from '../../i18n/Translate'
import { LanguageEnum } from '../../models/Patient'

class LanguagePicker extends Component{
    constructor(props){
        super(props)
        this.handlerChangeLang = this.handlerChangeLang.bind(this)
    }

    handlerChangeLang(){
        if (this.props.onChangeLanguage){
            let index = LanguageEnum.indexOf(this.props.selectedLanguage);
            if (index === -1){
                throw Error(`Not supported language: ${this.props.selectedLanguage}`)
            }

            // take next or first
            let nextLanguage = LanguageEnum[ LanguageEnum[index + 1] ? index + 1 : 0 ];

            this.props.onChangeLanguage(nextLanguage);
        }
    }

    render(){
        var trans = this.props.trans;

        return (
            <button onClick={this.handlerChangeLang} type="button" className="link_button">{trans.to_lang}</button>
        );
    }
}

LanguagePicker.propTypes = {
    selectedLanguage: PropTypes.oneOf(LanguageEnum),
    onChangeLanguage: PropTypes.func
}

LanguagePicker.defaultProps = {}

export default translate('LanguagePicker')(connect(
    state => ({
        selectedLanguage: state.user.lang
    }),
    dispatch => ({
        onChangeLanguage: value => dispatch(UserActions.setLanguage(value))
    })
)(LanguagePicker));