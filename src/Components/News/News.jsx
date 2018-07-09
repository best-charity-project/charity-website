import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import FullNews from '../FullNews/FullNews';
import EventModal from '../EventModal/EventModal'
class News extends Component {
    state = {
        isOpen: false
    }
    getEventWindow = () => {
        this.setState({isOpen:true})
    }
    closeModalWindow = () =>{
        this.setState({isOpen:false})
    }
    render() {
        moment.lang('ru');
        console.log(this.state)
        return (
            <div id = {this.props.id} className = 'news' onClick = {this.Click}>
                {(!this.props.event)?(
                        <NavLink to={`/news/${this.props.id}`} >
                            <p className = 'news-date'>{moment(this.props.date).format('DD MMMM YYYY')} </p>
                            {this.props.img?<img src = {`http://localhost:3001/images/${this.props.img}`} alt = 'image for news' />: null}
                            <p className = 'news-title'>{this.props.name} </p>
                            <span className = 'news-text' dangerouslySetInnerHTML={{__html: this.props.text}}/>                
                        </NavLink>):(
                        <div onClick = {this.getEventWindow}>
                             <p className = 'news-date'>{moment(this.props.event.dateStart).format('DD MMMM YYYY')} </p>
                            <p className = 'news-title'>{this.props.event.title} </p>
                            <span className = 'news-text' dangerouslySetInnerHTML={{__html: this.props.event.text}}/>
                            <div className={this.state.isOpen ? 'overlay' : 'overlay hidden'}>
                                <div className="modal-event-field">
                                   <EventModal event = {this.props.event} closeModalWindow = {this.closeModalWindow}/>
                        </div>
                </div>   
                        </div>
                 )}
            </div>
        ) 
    }
}

export default News;