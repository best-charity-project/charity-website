import React, {Component} from 'react';
import {DatePicker, DatePickerInput} from 'rc-datepicker';
import moment from 'moment';
import 'moment/locale/ru.js';
import 'rc-datepicker/lib/style.css';
import './AdminDateEvent.css'; 

class AdminDateEvent extends Component {

    render() {
        return (
            <div className="datepicker">
                <label>Дата события</label>
                <div>
                    <DatePickerInput
                        locale = 'ru'
                        onChange={this.onChange}
                        value={this.props.date}
                    />
                </div>
            </div>
        )
    }
    onChange = (date) => {
        this.setState({
            selectedDate: date
        })
        this.props.onSelectData(date); 
    }
    
}

export default AdminDateEvent;

