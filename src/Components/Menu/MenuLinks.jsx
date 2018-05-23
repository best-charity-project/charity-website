import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class MenuLinks extends Component {
constructor(props){
    super(props);
    this.state = this.props
}
handlerClick = (e)=>{
  let linksArray = e.target.parentNode.parentNode.childNodes;
  for (var i = 0; i < linksArray.length; i++) {
    if (linksArray[i].classList.contains(this.props.classActive)) {
      linksArray[i].classList.remove(this.props.classActive);
    }
  }
 e.target.classList.add(this.props.classActive)
}
 render() {
   const classActive= this.props.classActive;
   return (
     <div className = {this.props.name}>
        <ul onClick = {this.handlerClick}>
         {this.state.list.map(function(el,index) {
           if (index === 0) {
             return <li   key = {index}><NavLink className = {classActive}  to={el.url}>{el.name}</NavLink></li>
           }
           return <li key = {index}><NavLink  to={el.url} >{el.name}</NavLink></li>
         })}
         </ul>
     </div>
   );
 }
}

export default MenuLinks;