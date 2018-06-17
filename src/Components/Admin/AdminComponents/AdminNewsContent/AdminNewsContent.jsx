import React, {Component} from 'react';
import AdminNewsList from '../AdminNewsList/AdminNewsList';
import AdminNewsSearch from '../AdminNewsSearch/AdminNewsSearch';
import Button from '../../../Button/Button';
import './AdminNewsContent.css';
import { server } from '../../../../../src/api';
import { Route } from 'react-router-dom'

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
            <div className="admin-position-content">
                <div className="new-news">
                    <AdminNewsSearch findNews = {this.findNews} /> 
                    <div className="button-new-news">                     
                        <Route render={({ history}) => (
                            <Button 
                                name = "button-admin" 
                                label = {'Создать'} 
                                clickHandler = {() => { history.push('/admin-panel/news/create') }}
                            />
                         )} />
                    </div>
                </div>  
                <AdminNewsList 
                    news = {this.state.filteredNews} 
                    loading={this.state.isLoading}  
                    deleteNews = {this.deleteNews}
                /> 
            </div>
        )
    }
    deleteNews = (news) =>{
            let id = news._id
            fetch(`${ server }/news/`+id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(news),
            })
                this.setState({            
                    filteredNews: this.state.filteredNews.filter(news => news._id !== id)
                }) 
    } 

    findNews = (title) => {
        if(!title) {
            fetch(`${server}/news`, {
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