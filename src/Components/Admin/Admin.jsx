import React from 'react';
import './Admin.css';

class Admin extends React.Component {
    
    render() {
          return (
            <div className = 'admin main'>
                <p className = 'heading-admin'>Добавление новости</p>
                <p className = 'date'>Текущая дата: </p>
                <Time />
                <textarea className = "textarea" rows="10" cols="100">
                Type news here 
                </textarea>
                <br />
                <a href = '' className = 'btn'>Добавить новость</a>
            </div>
        );
    }
}
class Time extends React.Component {
    constructor() {
        super();
        let today = new Date(),
            date =  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        this.state = {
            date: date
        };
    }
    render() {
        return (
            <div>{this.state.date}</div>
        );
    }
}

export default Admin