import React, { Component } from 'react';
import NewsListAndAside from '../NewsListAndAside/NewsListAndAside'
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import '../NewsContainer/NewsContainer.css';
import { server } from '../../api';

class NewsContainer extends Component {
  state = {
    events: {}
  }
  componentDidMount(){      
    this.getNews();              
}  

getNewSourse = (str) => {
       (str ==='Все')? this.filterArray(''): this.filterArray(str);
}

getNews= () => {
  fetch(`${server}/news`)
  .then(response => response.json())
  .then(data => {
      this.setState({news: data.news }, () => {
          this.filterArray('')
      });
  })
}

filterArray = (value) =>{
  if(value.length === 0){
      this.setState({filterArray : this.state.news}) 
  }else{
      let filterArray =this.state.news.filter (news => {
          return (news.source === value)
     })
   this.setState({filterArray :filterArray })
  }
}

  render() {
    return (
      <div className = 'news-container'> 
        <Menu name = 'client-menu'/>
        <NewsListAndAside array = {this.state.filterArray}  listSourse ={['все','организаторы', 'спонсоры','активисты','волонтеры']} getNewSourse = {this.getNewSourse}/>
        <Footer name = ' footer footer-news'/>
      </div>
    );
  }
}

export default NewsContainer;