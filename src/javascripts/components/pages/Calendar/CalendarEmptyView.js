import translate from '../../../i18n/Translate'
import { Component } from 'react'
import { Link } from 'react-router'

export default class CalendarEmptyView extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        var trans = this.props.trans;

        return (
            <div>
                <div className="month_block">
                    Нет активных записей
                </div>
                <div className="doctor_year_block">
                    <p>У вас нет активных записей</p>
                </div>
                <div className="btn_placeholder">
                    <Link to="/meeting" className="btn_style">Записаться на прием</Link>
                </div>
                <div className="pad_top_regular">
                    <div className="icon_graph left_pos warning_icon"></div>
                    <div className="med_font_description pad_top_regular no_bot_pad">
                        Здесь будет фраза-помощник, <br /> но её ещё не придумали.
                    </div>
                </div>
            </div>
        );
    }
}