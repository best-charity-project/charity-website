import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {Link,Switch,NavLink} from "react-router-dom";
class FullNew extends Component {
    state = {

    }
    componentDidMount(){
        this.getInfoAboutNew()
    }
    render() {
        return (
            <div>
            {(this.state.new)? (<div>
                <p> {this.state.new.title}</p>               
                <p> {this.state.new.fullText}</p>
                <p> {this.state.new.createdAt}</p>
            </div>): null }
            </div>
        ) 
    }
    getInfoAboutNew = () =>{
        const id = this.props.match.params.id;
        var URL = 'http://localhost:3001/api/news/'+id;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            this.setState({new:data.news });
        })
    }
}

export default FullNew;
