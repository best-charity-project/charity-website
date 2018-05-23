import React, {Component} from 'react';
import {DatePicker, DatePickerInput} from 'rc-datepicker';
import moment from 'moment';
import 'moment/locale/ru.js';
import 'rc-datepicker/lib/style.css';
import './AdminDateEvent.css'; 

class AdminDateEvent extends Component {
    state = {selectedDate: ''}
    componentDidMount() {
        this.setState({
            selectedDate: moment().format()
        })
    }
    render() {
        return (
            <div className="datepicker">
                <div>Дата события</div>
                <div>
                    <DatePickerInput
                        locale = 'ru'
                        onChange={this.onChange}
                        value={this.state.selectedDate}
                    />
                </div>
            </div>
        )
    }
    onChange = (date) => {
        this.setState({
            selectedDate: date
        })
    }
}

export default AdminDateEvent;


