import React, { Component } from 'react';
import {Link,Switch,NavLink} from "react-router-dom";
import './menu.css'
class MainList extends Component {
constructor(props){
	super(props);
	this.state = this.props
}
	
  render() {
console.log(this.props)
    return (
  <div className = 'mainList'> 
     <ul>
      {this.state.list.map(function(el,index) {
    return  <NavLink to={el.url}><li key = {new Date()}>{el.name}</li></NavLink>
      })}
      </ul>
  </div>
    );
  }
}

export default MainList;