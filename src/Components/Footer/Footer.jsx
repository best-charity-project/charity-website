import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default () => (
  <div className='footer'>
    <div>
      <Link to='/about' className='footer-about'>
        О нас
      </Link>
    </div>
    <div>
      <p className='footer--content'>Phone: +375-25-555-5555</p>
      <p className='footer--content'>mail@mail.com</p>
      <p className='footer--content'>&#169; Vasilij Pupkin</p>
    </div>
  </div>
);
