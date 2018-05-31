import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import New from '../News/News';
import '../NewsList/NewsList.css'

class NewsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            news: {},
        }
    }
  

       componentDidMount(){      
         this.getNews();
          
       }    
   
    render() {
        const masonryOptions = {
            itemSelector: '.New',
            gutter: 10,
            isFitWidth: true
        };
        console.log(this.state)
        const {news} = this.state;
        console.log(news)
        return (
            <div className="news-list">
            <Masonry className = 'masonry-div'> 
                {(news.length >0)?news.map(function(news){
                    return <New id = {news.id} name = {news.name} text = {news.text} date = {news.date}/>
                }):null}
                </Masonry>
            </div>
        ) 
    }
getNews= () => {
    fetch('http://localhost:3001/api/events')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        this.setState({news: data.events });
    })
    .catch(error => this.setState({ error, isLoading: false }));
}
}

export default NewsList;