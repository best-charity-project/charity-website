import React, {Component} from 'react';
import './SubscribtionForm.css';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import { server } from '../../api';


class SubscribtionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:'',                      
            valid:false,
            sendToValidation :false
        }
    }

    onFocusInput = () => {
        this.setState({sendToValidation:false})
    }
 
    getValidation = (obj) => {
       this.setState({value:obj.value, valid:obj.error});
     }
     clickHandler = () => {
        this.setState({sendToValidation:true});
        if(this.state.valid){
            this.onSubscribe();
            this.setState({value:''})
        }
    }
    
    onSubscribe = () => {
        const newValue = this.state.value;
        fetch(` ${server}/subscription/newsubscription`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'cors',
            body: JSON.stringify({email: newValue})
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className='subscribtion-form'>
                <div className='wrapper-input'>
                    <TextField 
                        value = {this.state.value }
                        sendToValidation = {this.state.sendToValidation}
                        type='email'
                        nameClass='input-email'
                        placeholder="Введите адрес электронной почты"
                        name='email'
                        onChangeValue={this.getValidation}
                        onFocusInput={this.onFocusInput}
                        onSubscribe={this.onSubscribe}
                    />
                    
                </div>
                <Button name='button-subscribe'
                        label="подписаться"
                        clickHandler={this.clickHandler}/>
            </div>
        );
    }
}

    export default SubscribtionForm ;