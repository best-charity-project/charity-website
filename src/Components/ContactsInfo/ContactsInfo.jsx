import React, { Component } from 'react';

import '../ContactsInfo/ContactsInfo.css';
import image from '../../Assets/AssetsImg/main.png';

class ContactsInfo extends Component {
  render() {
    return (
		  <div className= 'container'>
        <div className='wrapper-image with-picture' />
        <div className='wrapper-info'>
          <h1 className='name'>логовед</h1>
          <span>центр развития речи и коммуникативных навыков</span>
          <span>220020, Республика Беларусь, г.Минск пр.Победителей 89, к.3.</span>
          <ul>
            <li>+375 17 202 67 45 (город)</li>
            <li>+375 44 514 10 00 (VELCOM)</li>
            <li>+375 29 239 61 11 (MTS)</li>
          </ul>
          <span>e-mail: logoved_info@mail.ru</span>
        </div>
  		</div>
    );
  }
}

export default ContactsInfo;