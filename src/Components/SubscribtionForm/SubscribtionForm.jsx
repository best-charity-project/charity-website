import React, { Component } from 'react';
import './SubscribtionForm.css';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import { server } from '../../api';
import axios from 'axios';
import ToastrContainer, { Toast, ToastDanger } from 'react-toastr-basic'


class SubscribtionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    getEmail = (str) => {
        this.setState({ value: str });
    }
    clickHandler = () => {
        if (this.isEmailValid(this.state.value)) {
            Toast('Вы подписались на наши уведомления!');
            this.onSubscribe();
            this.setState({ value: '' })
        } else {
            ToastDanger("Введите реальный адрес электронной почты");
        }
    }

    isEmailValid(email) {
        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
        return emailPattern.test(email);
    }

    onSubscribe = () => {
        const newValue = this.state.value;
        axios({
            url: ` ${server}/api/subscription/newsubscription`,
            method: 'post',
            config: {
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            mode: 'cors',
            data: { email: newValue }
        })
    }
    render() {
        return (
            <div className='subscribtion-form'>
                <ToastrContainer />
                <div className='wrapper-input'>
                    <TextField
                        value={this.state.value}
                        type='email'
                        nameClass='input-email'
                        placeholder="Введите адрес электронной почты"
                        name='email'
                        onChangeValue={this.getEmail}
                        onFocusInput={this.onFocusInput}
                        onSubscribe={this.onSubscribe}
                    />

                </div>
                <Button name='button-subscribe'
                    label="подписаться"
                    clickHandler={this.clickHandler} />
            </div>
        );
    }
}

export default SubscribtionForm;
