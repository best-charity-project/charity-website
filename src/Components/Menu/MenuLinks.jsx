import React, { Component } from 'react';
import {Link,Switch,NavLink} from "react-router-dom";
import DropMenu from '../Menu/DropMenu';
class MenuLinks extends Component {
constructor(props){
   super(props);
   this.state = {
     list:this.props.list,
     isOpenDropMenu:false
    }
}
getCurrentLink = (e) => {
  (e.target.innerText === 'АКТИВНОСТИ')?this.setState({isOpenDropMenu: !this.state.isOpenDropMenu}):this.setState({isOpenDropMenu: false});
}
render() {
  console.log(this.state)
  const classActive= this.props.classActive;
  return (
    <div className = {this.props.className}>
       <ul onClick = {this.getCurrentLink}>
         {this.state.list.map(function(el,index) {
           return <NavLink to={el.url} key = {index}>
             <li  className = {(el.url === window.location.pathname) ? classActive : null}>{el.name}
            </li>
           </NavLink>
         })}
         {this.state.isOpenDropMenu? <DropMenu name = 'drop-menu'/> : null}
        </ul>
    </div>
  );
}
}

export default MenuLinks;