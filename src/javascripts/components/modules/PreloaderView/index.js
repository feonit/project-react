import { Component } from 'react'

class PreloaderView extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div className="preloader_block center_pos"></div>
        )
    }
}

PreloaderView.propTypes = {}

PreloaderView.defaultProps = {}

export default PreloaderView