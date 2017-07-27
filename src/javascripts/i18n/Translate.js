import { Component, PropTypes } from 'react'
import languagesMapTranslates from './languagesMapTranslates'
import languagesMapTranslatesCodes from './languagesMapTranslatesCodes'

let Translate = function (keyLang){
    return function (Component){
        
        class TranslationComponent extends Component{
            constructor(props, context){
                super(props, context)
            }

            // getChildContext(){
            //     return {
            //         currentLanguage: this.props.currentLanguage
            //     };
            // }
            
            render(){
                var trans = languagesMapTranslates[this.context.currentLanguage][keyLang];
                var transCodes = languagesMapTranslatesCodes[this.context.currentLanguage];
                var merged = {};
                var key;
                for (key in this.props.trans){
                    merged[key]=this.props.trans[key]
                }
                for (key in trans){
                    merged[key]=trans[key]
                }

                // Component.displayName = Component.constructor.name;

                return (
                    <Component {...this.props}
                        trans={merged}
                        transCodes={transCodes}
                        currentLanguage={this.context.currentLanguage}
                    />
                );
            }
        }
        
        TranslationComponent.propTypes = {}
        
        TranslationComponent.defaultProps = {}

        TranslationComponent.contextTypes = {
            currentLanguage: PropTypes.string.isRequired,
            store: PropTypes.object.isRequired
        };

        return TranslationComponent;
    }
};

export default Translate;
