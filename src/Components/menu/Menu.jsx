import React, { Component } from 'react';
import Logo from './logo'
import MainList from './mainList'
import MediaList from './mediaList'
class Menu extends Component {
handlerClick = (e)=>{
console.log(e.target)
}
  render() {
    return (
  <div className ={'menu '+ this.props.name }> 
      <Logo/>
      <MainList list = {[{name: 'о нас', url :'/'},{name: 'новости', url :'/news'}]} onClick = {this.handlerClick}/>
       <MediaList/>
  </div>
    );
  }
}

export default Menu;