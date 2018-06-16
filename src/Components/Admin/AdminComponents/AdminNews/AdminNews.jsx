import React, {Component} from 'react';
import Button from '../../../Button/Button';
import moment from 'moment';
import './AdminNews.css';
import axios from 'axios';
import {server} from '../../../../api';

class AdminNews extends Component {
    state = {
        id: ''
    }
    componentDidMount (){
        this.setState({
            id:this.props.news._id,
            isPublic:this.props.news.isPublic,
            title:this.props.news.title,
            shortText:this.props.news.shortText,
            fullText:this.props.news.fullText,
            image:this.props.news.image,
            createAt: this.props.news.createAt,
            sourse: this.props.news.sourse
        })
    }
   render() {
       return (
           <div className="news-admin" id = {this.state.id}>
               <div onClick = {this.props.showNews} className = 'news-admin-title'>{this.state.title}</div>
               <div readOnly>{moment(this.state.createAt).format('DD-MM-YYYY')}</div>
               <div>{this.state.isPublic ? 'Да' : 'Нет'}</div>
               <div>
                   <Button
                       name = "button-admin admin-cancel"
                       label = {<span aria-hidden="true">&times;</span>}
                       clickHandler = {this.props.deleteHandler }
                   />
                   </div>
                <div>                
                    <Button
                        name = {this.state.isPublic? 'button-publish-news':'button-not-publish-news'}
                        label = {this.state.isPublic? 'Опубликовано':'Опубликовать'}
                        clickHandler = {this.publishNews}
                    />
                </div>
               
           </div>
       )
    }
    publishNews = (e) => {
       if(this.props.news.isPublic){
           e.preventDefault();
       }else{
        this.setState({isPublic:true}, () => {
            let formData  = new FormData();
            Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));
            axios({
                method: 'put',
                url: `${server}/news/`+this.state.id,
                data: formData,
                config: {headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}},
            })
              .catch(function (error) {
                console.log(error);
              });
        })
           
       }
    }

}

export default AdminNews;
