import { Component } from 'react'
import style from './style.css'

class ImgPreview extends Component{
    constructor(props){
        super(props)
        this.state = { loaded: false }
        this.onLoad = this.onLoad.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.src !== this.props.src){
            this.setState({ loaded: false })
        }
    }

    onLoad(){
        this.setState({ loaded: true })
    }
    
    render(){
        var style={
            opacity: 0
        }
        var afterLoadStyle={
            opacity: 1
        }
        return (
            <img className="img-preview" style={this.state.loaded ? afterLoadStyle : style} onLoad={this.onLoad} {...this.props} />
        )
    }
}

ImgPreview.propTypes = {}

ImgPreview.defaultProps = {}

export default ImgPreview