import React, { Component } from 'react';
import classNames from 'classnames'

export class CellClass extends Component{
    constructor(props) {
        super(props)
        this._onClick = this._onClick.bind(this)
    }

    _onClick (){
        if (!this.props.isPassed && this.props.isAvailable){
            this.props.onClick(this.props.dateNum);
        }
    }

    render (){
        return (
            <td className={classNames({"selected_day": this.props.isActive, "available_day": this.props.isAvailable && !this.props.isActive })}>
                <label>
                    <input
                        onChange={function(){}}
                        type="radio"
                        className="select_date_radio"
                        name="date_select"
                        required
                        checked={this.props.isActive}
                        disabled={this.props.isPassed}
                    />
                    <span onClick={this._onClick} className={classNames({
                        "special_day": this.props.isHoliday,
                        "past": this.props.isPassed
                    })}>
                    {this.props.dateNum}
                    { /*!!this.props.counter && <i className="cell-counter">{this.props.counter}</i> */}
                    </span>
                </label>
            </td>
        );
    }
}

CellClass.displayName = 'CellClass';

CellClass.propTypes = {
    dateNum: React.PropTypes.number,
    isHoliday: React.PropTypes.bool,
    isPassed: React.PropTypes.bool,
    isActive: React.PropTypes.bool,
    isAvailable: React.PropTypes.bool,
    counter: React.PropTypes.number,
    onClick: React.PropTypes.func.isRequired
}

var trans = {
    "en": ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    "ru": ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
}

function daysInMonth(month,year) {
    return new Date(year, month + 1, 0).getDate();
};

function lastDayInMonth(month,year){
    return new Date(year, month + 1, 0).getDay() || 7;
}

function weekCount(month, year) {
    var firstOfMonth = new Date(year, month, 1);
    var lastOfMonth = new Date(year, month + 1, 0);
    var used = (firstOfMonth.getDay() || 7) + lastOfMonth.getDate();
    return Math.ceil( used / 7);
}

export default class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this._onChangeDate = this._onChangeDate.bind(this);
    }
    _onChangeDate (value){
        var date = new Date(this.props.currentTimestamp);
        date.setDate(value);
        var timestamp = +date;

        if (this.props.changeDateCallback){
            this.props.changeDateCallback(value);
        }
    }
    _getCounterForDate (date){
        var filter = Array.prototype.filter;

        var res = filter.call(this.props.counterScheme, function(item){
            return item.date === date;
        });
        return res && res[0] && res[0].counter;
    }
    render() {
        var daysOfWeekNames = trans[this.props.language];
        var currentDateTimestamp = this.props.currentTimestamp;
        var disablePassedDays = this.props.disablePassedDays;
        var nowTimeTamp = this.props.nowTimeTamp;
        var currentDate = this.props.date;
        var date = new Date(currentDateTimestamp);
        var _getCounterForDate = this._getCounterForDate.bind(this);
        var _onChangeDate = this._onChangeDate.bind(this);

        date.setDate(1);

        var firstDayOfWeek = date.getDay() || 7;
        var countOfDays = daysInMonth(date.getMonth(), date.getFullYear());
        var lastDayOfWeek = lastDayInMonth(date.getMonth(), date.getFullYear());
        var weekCountNum = weekCount(date.getMonth(), date.getFullYear());

        function makeDataRows(){
            var arr = [];
            var dateNum = 1;
            for (var  weekNum = 1; weekNum <= weekCountNum; weekNum++) {
                var days = [];
                var isFirstWeek;
                var isLastWeek;

                if (weekNum === weekCountNum && countOfDays === 7*4){
                    break;
                }

                if (weekNum === 1) {
                    isFirstWeek = true;
                    isLastWeek = false;
                } else if (weekNum === weekCountNum){
                    isFirstWeek = false;
                    isLastWeek = true;
                } else {
                    isFirstWeek = false;
                    isLastWeek = false;
                }

                var currentMonth = (new Date(currentDateTimestamp)).getMonth() + 1

                var weekHaveAvailableDates = false;

                for (var n = 1; n <= 7; n++) {
                    var isEmptyCell = (isFirstWeek && n < firstDayOfWeek) || (isLastWeek && n > lastDayOfWeek);

                    //day belongs to the current month
                    var isBelongs = (dateNum <= countOfDays);

                    // если убрать undefined, то почему то не пустое
                    var cell = undefined;

                    var uniqKey = '' + n + weekNum;
                    
                    if (isEmptyCell){
                        cell = <td key={uniqKey} className="span_wraper empty_cell"></td>;
                    } else if (isBelongs) {
                        var isEmptyCusPassedDay;
                        var curIterationDate = new Date(date);
                        curIterationDate.setDate(dateNum);

                        if (disablePassedDays){
                            var checkDate = new Date(nowTimeTamp).getDate();
                            var srcDate = curIterationDate.getDate()
                            isEmptyCusPassedDay = (checkDate > srcDate);
                        }

                        var isActive = currentDate === dateNum && currentMonth === date.getMonth() + 1;

                        var isAvailable = !!_getCounterForDate(dateNum)

                        var counter = _getCounterForDate(dateNum) || 0;

                        weekHaveAvailableDates || (weekHaveAvailableDates = !!counter)

                        cell = <CellClass
                            key={uniqKey}
                            counter={counter}
                            isActive={isActive}
                            isAvailable={isAvailable}
                            dateNum={dateNum}
                            isHoliday={n === 7 || n === 6}
                            isPassed={isEmptyCusPassedDay}
                            onClick={_onChangeDate} />;

                        dateNum++;
                    }

                    if (cell){
                        days.push(cell);
                    }
                }

                if (weekHaveAvailableDates){
                    arr.push(<tr key={weekNum}>{days}</tr>);
                }
            }
            return arr;
        }

        function makeDaysOfWeeks(){
            var rez = daysOfWeekNames.map(function(dayName, index){ return (
                <td key={dayName}>
                            <span className={classNames({
                             "span_header": true,
                             "special_day": index === 5 || index === 6 // выходные дни
                             })}>
                                {dayName}
                            </span>
                </td>
            )})
            return rez;
        }

        var dOfW = makeDaysOfWeeks();
        var dRows = makeDataRows();

        return (
            <table className="table_style">
                <thead>
                <tr>
                    {dOfW}
                </tr>
                </thead>
                <tbody>
                    {dRows}
                </tbody>
            </table>
        );
    }
}
CalendarComponent.displayName = 'CalendarComponent'
CalendarComponent.propTypes = {
    "language": React.PropTypes.oneOf(['ru', 'en']).isRequired,
        "currentTimestamp": React.PropTypes.number.isRequired,
        "changeDateCallback": React.PropTypes.func,
        "disablePassedDays": React.PropTypes.bool,
        "counterScheme": React.PropTypes.arrayOf(
        React.PropTypes.shape({
            date: React.PropTypes.number.isRequired,
            counter: React.PropTypes.number.isRequired
        })
    )
}
CalendarComponent.defaultProps = {
    "language": "ru",
    "nowTimeTamp":  Date.now(),
    "disablePassedDays": true,
    "date": (new Date()).getMonth() + 1,
    "currentTimestamp": Date.now(),
    "counterScheme": []
}



