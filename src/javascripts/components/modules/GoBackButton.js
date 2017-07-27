import { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class GoBackButton extends Component{
    constructor(props){
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    onClick(event){
        event.preventDefault();
        event.stopPropagation();
        if (window.history.length){
            browserHistory.goBack();
        }
    }

    render(){
        return (
            <Link disabled={!window.history.length} title="Назад" onClick={this.onClick}>
                <i className="back_arrow_btn"></i>
            </Link>
        );
    }
}

GoBackButton.propTypes = {}

GoBackButton.defaultProps = {}

export default connect(store => ({
    path: store.user.previousPathname
}))(GoBackButton)