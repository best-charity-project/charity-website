import React from 'react';
import './Footer.css';

export default () => (
  <div className='footer'>
    <a className='footer--content' href='tel:+375-25-555-5555'>
      Phone: +375-25-555-5555
    </a>
    <a className='footer--content' href='mailto:mail@mail.com'>
      mail@mail.com
    </a>
    <p className='footer--content'>&#169; Vasilij Pupkin</p>
  </div>
);
