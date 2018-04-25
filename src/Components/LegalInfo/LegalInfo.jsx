import React from 'react';
import Card from '../Card/Card';
import lawImage from '../img/balance.svg';
import './LegalInfo.css';

export default () => (
  <div className='LegalInfo'>
    <h1 className='LegalInfo primary-heading'>Правовая информация</h1>
    <div className='LegalInfo--content'>
      <img src={lawImage} alt='Правовая информация' className='LegalInfo--image' />
      <div className='LegalInfo--cards'>
        <Card
          heading='«Белорусская ассоциация
          помощи детям-инвалидам и молодым инвалидам»'
          text=''
          target='_blank'
          path='http://actngo.info/content/belapdi'
          linkText='Перейти'
          classNameLink='card--link'
        />
        <Card
          heading='Офис по правам людей с инвалидностью'
          text=''
          target='_blank'
          path='http://www.disright.org/be'
          linkText='Перейти'
          classNameLink='card--link'
        />
      </div>
    </div>
  </div>
);
