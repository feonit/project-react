import { Component, PropTypes } from 'react'
import MaskedInput from 'react-maskedinput'
import { reverseDate } from '../../helpers/time'

class DateInput extends Component{
    constructor(props){
        super(props)
        this.focus = this.focus.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    
    focus(){
        this.refs["self"].focus();
    }
    
    onChange(event){
        this.props.onChange({target:{value: reverseDate(event.target.value)}})
    }

    render(){
        return (
            <MaskedInput 
                ref="self"
                {...this.props}
                mask="1111-11-11"
                type="text"
                value={this.props.value}
                onChange={this.props.onChange}
                mask="11-11-1111"
                type="text"
                value={reverseDate(this.props.value)}
                onChange={this.onChange}
            />
        );
    }
}

DateInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

DateInput.defaultProps = { value: '' }


export default DateInput

function timestampToString(timestamp){
    var date = new Date(timestamp*1000);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    day < 10 && (day="0"+day);
    month < 10 && (month="0"+month);

    return [day,
        month,
        year].join(".");
}

function stringToTimestamp(string){
    var parties = string.split('.');
    var date = new Date();

    date.setDate(+parties[0]);
    date.setMonth(+parties[1] - 1);
    date.setYear(+parties[2]);

    return Math.round(+date/1000);
}

// TODO "1111-11-11"
export function dateIsValid(strDate){
    var isValid = false;
    var numbers = strDate.match(/[0-9]/g);

    var day = +numbers.slice(0,2).join("");
    var month = +numbers.slice(2,4).join("");
    var year = +numbers.slice(4,8).join("");

    // length of numbers
    if (numbers && numbers.length == 8){

        // count of days must be less then available (count of days for current month)
        if (day <= new Date((new Date(stringToTimestamp(strDate)).setDate(-1))).getDate()){

            // count of month must be less then available (12 month)
            if (month > 0 && month <= 12){

                // count of month must be less then available (current year)
                if (year <= (new Date().getFullYear()) ){

                    isValid = true;
                }
            }
        }
    }

    return isValid;
}