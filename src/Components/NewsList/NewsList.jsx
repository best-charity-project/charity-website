import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import New from '../News/News';
import '../NewsList/NewsList.css'

class NewsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            news: {},
            currentSourse :this.props.currentSourse,
            filterNew : ''
        }
    }
  
componentWillReceiveProps (nextprop){
    if(nextprop.currentSourse != this.props.currentSourse){
        this.filterNew(nextprop.currentSourse)
    }
}
       componentDidMount(){      
         this.getNews();  
             
       }    
       filterNew = (value) =>{
           console.log(this.props.currentSourse)
        let filterArray =this.state.news.filter (news => {
            return (news.name === value)
        })
        this.setState({filterNew:filterArray })
       }
      
       
    render() {
        const {news, filterNew} = this.state;
        return (
            <div className="news-list">
            <Masonry className = 'masonry-div'> 
                {(filterNew.length >0)?filterNew.map(function(news){
                    return <New id = {news._id} name = {news.name} text = {news.text} date = {news.date}/>
                }):null}
                </Masonry>
            </div>
        ) 
    }
    
getNews= () => {
    fetch('http://localhost:3001/api/events')
    .then(response => response.json())
    .then(data => {
        this.setState({news: data.events }, () => {
            this.filterNew(this.props.currentSourse)
        });
    })
    .catch(error => this.setState({ error, isLoading: false }));
}
}

export default NewsList;

