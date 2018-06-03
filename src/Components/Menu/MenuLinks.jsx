import React, { Component } from 'react';
import {Link,Switch,NavLink} from "react-router-dom";

class MenuLinks extends Component {
constructor(props){
   super(props);
   this.state = this.props
}
render() {
  const classActive= this.props.classActive;
  return (
    <div className = {this.props.className}>
       <ul>
         {this.state.list.map(function(el,index) {
           return <li  key = {index}>
             <NavLink to={el.url} className = {(el.url === window.location.pathname) ? classActive : null}>{el.name}</NavLink>
            </li>
           
         })}
        </ul>
    </div>
  );
}
}

export default MenuLinks;