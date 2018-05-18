import React, { Component } from 'react';
 import './TextSubscribe.css';
import Subscribe from "./Subscribe/Subscribe";
class TextAboutUs extends Component {
  render() {
    return (
  <div className = 'TextAboutUs'> 
			<p>КТО МЫ?</p>
			<h1> Мы сообщество людей, которые помогают особенным людям или 
			людям с особенными детьми. Сейчас сайт находится в разработке, 
			если хотите получать наши новости оставьте, пожалуйста, вашу электронную почту.</h1>
      <Subscribe/>
  </div>
    );
  }
}

export default TextAboutUs;