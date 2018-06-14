import React, { Component } from 'react';
import {Link,Switch,NavLink} from "react-router-dom";
import DropMenu from '../DropMenu/DropMenu';
class MenuLinks extends Component {
constructor(props){
   super(props);
   this.state = {
     list:this.props.list,
     isOpenDropMenu:false
    }
}
getCurrentLink = (e) => {
  if(e.target.classList.contains("activity")){
    this.setState({isOpenDropMenu: !this.state.isOpenDropMenu})
    e.target.classList.toggle('activeDropMenu')
  }
  
}
render() {
  const classActive= this.props.classActive;
  let {isOpenDropMenu} = this.state;
  return (
    <div className = {this.props.className}>
       <ul onClick = {this.getCurrentLink}>
         {this.state.list.map(function(el,index) {
           if(index === 1){
              return <li  key = {index} className = 'activity'>
                  {el.name}             
              {(isOpenDropMenu) ?<DropMenu/>: null }
              </li>          
           }else{
              return <li  className = {(el.url === window.location.pathname) ? classActive : null} key = {index}>
                  <NavLink to={el.url} >{el.name}</NavLink>
              </li>
              }
         })}
        </ul>
    </div>
  );
}
}

export default MenuLinks;