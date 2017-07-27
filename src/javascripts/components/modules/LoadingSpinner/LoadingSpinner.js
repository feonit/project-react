import { Component } from 'react'
import './style.scss'

//todo можно доделать кратность, чтобы анимашка не обрывалась при длинных запросах
var TIME = 750*2;
var startTime = null;
var idTimeout = null;

var reset = function(){
    if (idTimeout) {
        clearTimeout(idTimeout);
    }

    startTime = null;
};

class LoadingSpinner extends Component{
    constructor(props){
        super(props)
        this.state = { isVisible: this.props.isVisible }
    }

    shouldComponentUpdate(nextProps){
        var that = this;

        if (!nextProps.isVisible){
            var diff = Date.now() - startTime;

            // заканчиваем немедленно или пока не истечет интервал
            var leftToGo = TIME - diff;

            if (leftToGo > 0){

                // update after time
                idTimeout = setTimeout(function (){
                    that.setState({
                        isVisible: false
                    });
                }, leftToGo);

                // prevent disable
                return false;
            } else {
                // disable
                reset();
                return true;
            }
        } else {
            // enable
            reset();
            startTime = Date.now();
            return true;
        }
    }
    
    render(){
        var visible = {
            width: '100%',
            position: 'fixed'
        };
        var hidden = {
            display: 'none'
        };

        // var that =this;
        // setTimeout(function(){
        //     that.setState({
        //         isVisible: true
        //     });
        // }, 3000)

        return <div className="preloader" style={this.props.isVisible? visible : hidden}></div>;
    }
}

LoadingSpinner.propTypes = {}

LoadingSpinner.defaultProps = { isVisible: false }

export default LoadingSpinner