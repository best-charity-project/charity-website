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
        console.log(this.state)
        return (
            <div>
            {(this.state.new)? (<div>
                <p> {this.state.new.name}</p>                
                <p> {this.state.new.text}</p>
                <p> {this.state.new.date}</p>
            </div>): null }
            </div>
        ) 
    }
    getInfoAboutNew = () =>{
        const id = this.props.match.params.id;
        console.log(id)
        var URL = 'http://localhost:3001/api/events/'+id;
        console.log(URL)
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({new:data });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
}

export default FullNew;
