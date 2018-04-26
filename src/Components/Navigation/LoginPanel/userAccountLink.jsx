import React from 'react';
import { Link } from 'react-router-dom';

const userAccountLink = (userInfo) => {
  let path = '/account';
  let text = 'Кабинет';
  if (userInfo.admin) {
    path = '/admin';
    text = 'Администратор';
  }
  return (
    <Link className='login-panel--navigation' to={path}>
      {text}
    </Link>
  );
};

export default userAccountLink;
