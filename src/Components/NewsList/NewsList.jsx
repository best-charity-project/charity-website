import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import New from '../News/News';
import '../NewsList/NewsList.css';
import { server } from '../../../src/api';

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
    if(value.length === 0){
        this.setState({filterNew: this.state.news}) 
    }else{
        let filterArray =this.state.news.filter (news => {
            return (news.source === value)
           })
           this.setState({filterNew:filterArray })
    }
}     
render() {
     const {news, filterNew} = this.state;
    return (
         <div className={this.props.name}>
            <Masonry className = 'masonry-div'> 
                {(filterNew.length >0)?filterNew.map(function(news){
                    return <New id = {news._id} name = {news.title} text = {news.shortText} date = {news.date} key = {news._id} img = {news.image}/>
                }):null}
            </Masonry>
         </div>
        ) 
    }
    
getNews= () => {
    fetch(`${server}/news`)
    .then(response => response.json())
    .then(data => {
        this.setState({news: data.news }, () => {
            this.filterNew('')
        });
    })
}
}

export default NewsList;

