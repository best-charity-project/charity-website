import React from 'react';
import Time from './Time'
import './Admin.css';

class Admin extends React.Component {    
    render() {
        return (
            <div className = 'admin main'>
                <p className = 'admin--heading'>Добавление новости</p>
                <p className = 'admin--current-date'>Текущая дата: </p>
                <Time />
                <textarea className = "admin--textarea" rows="10" cols="100">
                Type news here 
                </textarea>
                <br />
                <a href = '' className = 'admin--button'>Добавить новость</a>
            </div>
        );
    }
}

export default Admin