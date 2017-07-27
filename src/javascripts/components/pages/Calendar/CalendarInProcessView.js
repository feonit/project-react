import translate from '../../../i18n/Translate'
import { Component } from 'react'
import { Link } from 'react-router'

export default class CalendarInProcessView extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var trans = this.props.trans;

        return (
            <div>
                <div className="month_block">
                    В процессе <br /> прикрепления
                </div>
                <div className="doctor_year_block">
                    <p>Завляние обрабатывается. <br />
                        По завершению процесса система <br />
                        оповестит вас.</p>
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