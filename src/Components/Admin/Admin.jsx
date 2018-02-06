import React from 'react';
import Time from '../Time/Time'
import './Admin.css';

class Admin extends React.Component {
    // TODO: check warning index.js:2178 Warning: Use the `defaultValue` or `value` props instead of setting children on <textarea>.
    render() {
        return (
            <div className='admin main'>
                <p className='admin--heading'>Добавление новости</p>
                <p className='admin--current-date'>Текущая дата:  <Time /> </p>

                <textarea className="admin--textarea" rows="10" cols="100">
                    Type news here
                </textarea>
                <br />
                <a href='' className='admin--button'>Добавить новость</a>
            </div>
        );
    }
}

export default Admin