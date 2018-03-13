import React from 'react';
import types from './types.json';
import Type from './Type/Type';
import './TypeList.css';

const TypeList = props => (
  <ul className='type-list'>
    {types.map(item => (
      <li key={item.typeTag}>
        <Type {...props} {...item} />
      </li>
    ))}
  </ul>
);

export default TypeList;
