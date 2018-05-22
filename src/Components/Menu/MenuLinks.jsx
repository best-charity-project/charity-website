import React, { Component } from 'react';
import {Link,Switch,NavLink} from "react-router-dom";

class MenuLinks extends Component {
constructor(props){
    super(props);
    this.state = this.props
}
handlerClick = (e)=>{
  console.log()
  let mas = e.target.parentNode.parentNode.childNodes;
  for (var i = 0; i < mas.length; i++) {
    if (mas[i].firstChild.classList.contains(this.props.classActive)) {
      mas[i].firstChild.classList.remove(this.props.classActive);
    }
  }
 e.target.classList.add(this.props.classActive)
}
 render() {
   const classActive= this.props.classActive;
   return (
     <div className = {this.props.className}>
        <ul onClick = {this.handlerClick}>
         {this.state.list.map(function(el,index) {
           if (index === 0) {
             return <NavLink   to={el.url} key = {index}><li  className = {classActive}>{el.name}</li></NavLink>
           }
           return <NavLink  to='/' key = {index}><li >{el.name}</li></NavLink>
         })}
         </ul>
     </div>
   );
 }
}

export default MenuLinks;