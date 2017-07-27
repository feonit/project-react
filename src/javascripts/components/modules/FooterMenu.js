import { Component } from 'react'
import { Link } from 'react-router'

export default class FooterMenu extends Component{
    constructor(props){
        super(props)
    }
    render(){
            return (
                <div className="main_foot_info">
                    <div className="copy_right">2015 RuMed.Dev</div>
                    <Link className="link_foot_style" to="/feedback">Помощь</Link>
                    <Link className="link_foot_style" to="/agreement">Правовая информация</Link>
                    <Link className="link_foot_style" to="/about">О сайте</Link>
                </div>
            );
    }
}