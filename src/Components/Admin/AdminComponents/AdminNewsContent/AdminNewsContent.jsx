import React, {Component} from 'react';
import AdminNewsList from '../AdminNewsList/AdminNewsList';
import AdminNewsSearch from '../AdminNewsSearch/AdminNewsSearch';
import Button from '../../../Button/Button';
import './AdminNewsContent.css';
const URL = 'http://localhost:3001';
import { server } from '../../../src/api';

class AdminNewsContent extends Component {
    state = {
        news: [],
        filteredNews: [],
        isLoading: true,
        error: null
    }
    componentDidMount() {
        fetch(`${server}/news?isAdmin=true`, { 
            method: 'GET',
            mode: 'cors'
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ...')
                }
            })
        .then(data => this.setState({news: data.news, filteredNews: data.news, isLoading: false}))
        .catch(error => this.setState({error, isLoading: false}))
    }
    render() {
        const {isLoading, error} = this.state
        if (isLoading) {
            return <p>Loading ...</p>
        }
        if (error) {
            return <p>{error.message}</p>;
        }

        return(
            <div>
                <div className="new-news">
                    <AdminNewsSearch findNews = {this.findNews} /> 
                    <div className="button-new-news">
                        <Button 
                            name = "button-admin" 
                            label = {'Создать'} 
                            clickHandler = {this.addNews} 
                        />
                    </div>
                </div>  
                <AdminNewsList news = {this.state.filteredNews} loading={this.state.isLoading} />  
            </div>
        )
    }
    addNews = () => {
        window.location = '/admin-panel/news/create';
    }
    findNews = (title) => {
        if(!title) {
            fetch(URL + '/api/news', {
                method: 'GET', 
                mode: 'cors'
                })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Something went wrong ...')
                    }
                })
                .then(data => this.setState({filteredNews: data.news}))
                .catch(error => this.setState({error}))
        } else {
            const {news} = this.state
            this.setState({
                filteredNews: news.filter((item) => {
                    return item.title.includes(title)
                })
            })
        }
    }
}

export default AdminNewsContent;