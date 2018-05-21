import React, { Component } from 'react';
import {Link,Switch,NavLink} from "react-router-dom";
import './menu.css'
class MainList extends Component {
constructor(props){
	super(props);
	this.state = this.props
}
	handlerClick = (e)=>{
    let mas = e.target.parentNode.parentNode.childNodes;
    for (var i = 0; i < mas.length; i++) {
      if (mas[i].firstChild.classList.contains('active')) {
        mas[i].firstChild.classList.remove('active');
      }
    }
   e.target.classList.add('active')

  }
  render() {
    return (
  <div className = 'main-list'> 
     <ul onClick = {this.handlerClick}>
      {this.state.list.map(function(el,index) {
        if (index ==0) {
          return <NavLink  to={el.url}><li key = {index} className = 'active'>{el.name}</li></NavLink>
        }
     return <NavLink  to={el.url}><li key = {index}>{el.name}</li></NavLink>
      })}
      </ul>
  </div>
    );
  }
}

export default MainList;