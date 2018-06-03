import React, {Component} from 'react';
import NewsList from '../../Components/News/NewsList/NewsList';
import NewsAside from '../../Components/News/NewsAside/NewsAside';
import './PageNews.css';

class PageNews extends Component {
    state = {
        news: [],
        filteredNews: [],
        isLoading: true,
        error: null
    }
    componentDidMount() {
       /*  fetch(URL + '/api/news', { 
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

        return (
            <div className="page-news">
                  <NewsAside filterNews = {this.filterNews}/>
                  <NewsList news = {this.state.filteredNews} loading={this.state.isLoading} />
            </div>
        )  */
    }
    filterNews = (source) => {
       /*  if(creator) {
            fetch(URL + '/api/subscription', {
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
                .then(data => this.setState({filteredUsers: data.subscribers}))
                .catch(error => this.setState({error}))
        } else {
            const {users} = this.state
            this.setState({
                filteredUsers: users.filter((item) => {
                    return item.email.includes(email)
                })
            })
        } */
    }
}

export default PageNews;



