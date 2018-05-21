import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import './menu.css'
class MedialList extends Component {
	
  render() {
    return (
  <div className = 'media-list'> 
      <ul>
        <a href = '#'><li></li></a>
        <a href = '#'><li></li></a>
        <a href = '#'><li></li></a>
        <a href = '#'><li></li></a>
      </ul>
  </div>
    );
  }
}

export default MedialList;