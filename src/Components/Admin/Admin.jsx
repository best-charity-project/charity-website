import React from 'react';
import Time from '../Time/Time'
import './Admin.css';

class Admin extends React.Component {
     constructor(props) {
        super(props);
        this.state = {title: '',
                      shortDescription: '',
                      newsText: '' };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeNewsText = this.handleChangeNewsText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeTitle(event) {
        this.setState({
            title: event.target.value               
        });
      }
      handleChangeDescription(event) {
        this.setState({
            shortDescription: event.target.value               
        });
      }
      handleChangeNewsText(event) {
        this.setState({
            newsText: event.target.value               
        });
      }
    
      handleSubmit(event) {
           event.preventDefault();
      }
    render() {
        return (
            <div className='admin' >
                <h1 className='admin--heading'>Добавление новости</h1>
                <p className='admin--current-date'>Текущая дата:  <Time /> </p>
                <form onSubmit={this.handleSubmit} className = 'admin--form'>
                    <label>
                        <p className = 'admin--label'>Заглавие:</p>
                        <input value={this.state.title} onChange={this.handleChangeTitle} type = 'text' className = 'admin--title' placeholder = 'Type heading here'></input>
                    </label>
                    <label>
                        <p className = 'admin--label'>Краткое описание:</p>
                        <input value={this.state.description} onChange={this.handleChangeDescription} type = 'text' className = 'admin--description' placeholder = 'Short description'></input>
                    </label>
                    <label>
                        <p className = 'admin--label'>Текст новости:</p>
                        <textarea value={this.state.value} onChange={this.handleChangeNewsText} className="admin--textarea" placeholder = 'Type your news here' rows="10" cols="100" >
                        </textarea>
                    </label>
                    <br />
                    <button href='' className='admin--button'>Добавить новость</button> 
                </form>
               
                
            </div>
        );
    }
}

export default Admin;

