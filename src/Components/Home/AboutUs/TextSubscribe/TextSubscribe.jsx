import React, { Component } from 'react';
 import './TextSubscribe.css';
import Subscribe from "./Subscribe/Subscribe";
class TextAboutUs extends Component {
  render() {
    return (
  <div className = 'text-about-us'> 
			<h2>КТО МЫ?</h2>
			<h3> Мы сообщество людей, которые помогают особенным людям или 
			людям с особенными детьми. Сейчас сайт находится в разработке, 
			если хотите получать наши новости оставьте, пожалуйста, вашу электронную почту.</h3>
      <Subscribe/>
  </div>
    );
  }
}

export default TextAboutUs;