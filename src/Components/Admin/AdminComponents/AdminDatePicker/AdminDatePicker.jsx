import React, {Component} from 'react';
import moment from 'moment';
import Datetime from 'react-datetime'
import '../AdminDatePicker/AdminDatePicker.css'
class AdminDatePicker extends Component {
    onChange = (date) => {
        this.props.onSelectData(date); 
    }
    render() {
        return (
            <div >
                <label>Дата события</label>
                <Datetime value = {moment(this.props.date).format('DD MMMM YYYY ')} onChange = {this.onChange} timeFormat = {false}/>
            </div>
        ) 
    }

}

export default AdminDatePicker;
