import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import { server } from '../../../src/api';
import Menu from '../Menu/Menu';
import '../FullNews/FullNews.css';
import Footer from '../Footer/Footer';

class FullNews extends Component {
    state = {
        new:{}
    }
    componentDidMount(){
        this.getInfoAboutNew()
    }
    render() {
        return (
            <div className = 'full-new-container'>
                <div className = 'full-new-menu-container'> 
                    <Menu name = 'full-new-menu'/>
                </div>
                <div className = 'aside-and-text-full-new'>
                    <div className = 'aside-full-new'>
                        <p><NavLink to = '/news'> Новости </NavLink></p>    
                    </div>
                    <div className = 'full-new-list-container'>
                    {(this.state.new)? (<div class = 'full-new'>
                        <img src = {this.state.new.image} alt = 'image for news' /> 
                        <p className = 'full-new-date'>{moment(this.state.new.createdAt).format('DD MMMM YYYY')} </p>
                        <p className = 'full-new-title'> {this.state.new.title}</p>               
                        <span> {this.state.new.fullText}</span>
                    </div>): null }
                    </div>
                </div>
                <Footer name = 'full-new-footer'/>
            </div>
        ) 
    }
    getInfoAboutNew = () =>{
        const id = this.props.match.params.id;
        fetch(`${server}/news/`+id)
        .then(response => response.json())
        .then(data => {
            this.setState({new:data.news });
        })
    }
}

export default FullNews;
