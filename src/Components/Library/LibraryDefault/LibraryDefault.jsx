import React from 'react';
import libraryPic from '../../img/bookshelf.svg';
import './LibraryDefault.css';

export default () => (
  <div>
    <img src={libraryPic} className='library--image-default' alt='Библиотека' />
  </div>
);
