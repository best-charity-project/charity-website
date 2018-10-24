import React from 'react';

import '../ContactsInfo/ContactsInfo.css';

function ContactsInfo() {
    return (
		  <div className= 'container'>
        <div className='wrap'>
          <div className='wrapper-info'>
            <h1 className='name'>логовед</h1>
            <p>центр развития речи и коммуникативных навыков</p>
            <span>220020, Республика Беларусь, г.Минск пр.Победителей 89, к.3.</span>
            <ul className='phones-list'>
              <li>+375 17 202 67 45 (город)</li>
              <li>+375 44 514 10 00 (VELCOM)</li>
              <li>+375 29 239 61 11 (MTS)</li>
            </ul>
            <span>e-mail: logoved_info@mail.ru</span>
          </div>
        </div>
  		</div>
    );
}

export default ContactsInfo;