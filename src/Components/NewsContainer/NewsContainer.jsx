import React, { Component } from 'react';
import NewsListAndAside from '../NewsListAndAside/NewsListAndAside'
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import '../NewsContainer/NewsContainer.css';
import { server } from '../../api';
import axios from 'axios';
import _ from 'lodash';

class NewsContainer extends Component {
  state = {
    news: []
  }
  componentDidMount(){      
    this.getNews(); 
    this.getFiltersList();             
}  

getFilteredNews  = (str) => {
       (str ==='все')? this.filterArray(''): this.filterArray(str);
}

getNews= () => {
  fetch(`${server}/news`)
  .then(response => response.json())
  .then(data => {
      this.setState({news: data.news }, () => {
          this.filterArray('');
      });
  })
}
getFiltersList = () => {  
  axios({
      method: 'get',
      url: `${ server }/filters`,
  })
  .then(res =>{
      let filterList = res.data.filterList;
      let filtersNews = _.filter(filterList , function(el){
          if(el.type === 'news'){
              return el
          }
      })
      this.setState({
        filters:filtersNews,
      })
  })

}
filterArray = (value) =>{
  if(value.length === 0){
      this.setState({filterArray : this.state.news}); 
  }else{
      let filterArray =this.state.news.filter (news => {
          return (news.filter === value)
     })
   this.setState({filterArray : filterArray });
  }
}

  render() {
    return (
      <div className = 'news-container'> 
        <Menu name = 'client-menu'/>
        <NewsListAndAside 
          array = {this.state.filterArray} 
          filters ={this.state.filters} 
          getNewFilter = {this.getFilteredNews}
        />
        <Footer name = ' footer footer-news'/>
      </div>
    );
  }
}

export default NewsContainer;