import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Datetime from 'react-datetime'
import '../AdminDatePicker/AdminDatePicker.css'
class AdminDatePicker extends Component {
    onChange = (date) => {
        this.props.onSelectDate(date)
    }
    valid = (current) => {
        var yesterday = Datetime.moment().subtract(1, 'day');
        return current.isAfter( yesterday );
    }
    render() {
        return (
            <div >
                <label>{this.props.label}</label>
                <Datetime value = {moment(this.props.date).format('D MMMM YYYY, H : mm')} dateFormat = 'D MMMM YYYY,' timeFormat = 'H : mm' onChange = {this.onChange} isValidDate = {this.valid}/>
            </div>
        ) 
    }

}

export default AdminDatePicker;
