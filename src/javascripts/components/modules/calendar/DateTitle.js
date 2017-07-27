import React, { Component } from 'react';

export default class DateTitle extends Component {
    constructor(props) {
        super(props);
    }
    render (){
        var date = new Date(this.props.timestamp);
        var currentMonth = date.getMonth() + 1;
        var currentYear = date.getFullYear();

        var translates = {
            "en": {
                "1": "January",
                "2": "February",
                "3": "March",
                "4": "April",
                "5": "May",
                "6": "June",
                "7": "July",
                "8": "August",
                "9": "September",
                "10": "October",
                "11": "November",
                "12": "December"
            },
            "ru": {
                "1": "Январь",
                "2": "Февраль",
                "3": "Март",
                "4": "Апрель",
                "5": "Май",
                "6": "Июнь",
                "7": "Июль",
                "8": "Август",
                "9": "Сентябрь",
                "10": "Октябрь",
                "11": "Ноябрь",
                "12": "Декабрь"
            }
        };

        var translate = translates[this.props.language];

        return (
            <div className="month_selector_block">
                {translate[currentMonth] + ' ' + currentYear}
            </div>
        );
    }
};

DateTitle.propTypes = {
    "language": React.PropTypes.oneOf(['ru', 'en']),
        "timestamp": React.PropTypes.number.isRequired
},

DateTitle.defaultProps = {
    "language": 'ru'
}