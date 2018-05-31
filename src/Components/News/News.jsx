import React, {Component} from 'react';
import '../News/News.css'
class News extends Component {
    render() {
        return (
            <div id = {this.props.id} className = 'news'>
               <p>{this.props.date} </p>
               <div> </div>
               <p>{this.props.name} </p>
               <span> {this.props.text}</span>
            </div>
        ) 
    }
}

export default News;