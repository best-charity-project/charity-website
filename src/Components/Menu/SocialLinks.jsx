import React, { Component } from 'react';
import {NavLink} from "react-router-dom";


class SocialLinks extends Component {	
  render() {
    return (
      <div className = 'social-icons'> 
          <ul>
             <li><a href = 'https://www.facebook.com/'></a></li>
             <li><a href = 'https://www.youtube.com/'></a></li>
             <li><a href = 'https://www.instagram.com/?hl=ru'></a></li>
             <li><a href = 'https://vk.com/'></a></li>
          </ul>
      </div>
    );
  }
}

export default SocialLinks;