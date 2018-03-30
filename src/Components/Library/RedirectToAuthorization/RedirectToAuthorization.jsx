import React from 'react';
import Card from '../../Card/Card';

export default () => (
  <Card
    classNameCard='form'
    heading='Пожалуйста, авторизируйтесь'
    text='По правилам сайта, для того,
чтобы добавить информацию в библиотеку,
пользователь должен авторизироваться'
    path='/login'
    linkText='Авторизироваться'
    classNameLink='card--link'
  />
);
