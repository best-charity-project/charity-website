import React from 'react';
import PropTypes from 'prop-types';
import './TypeList.css';
import types from './types.json';
import Type from './Type/Type';

const TypeList = ({ categoryTag }) => (
  <ul className='type-list'>
    {types.map(item => (
      <li key={item.typeTag}>
        <Type type={item.typeTag} category={categoryTag} text={item.text} />
      </li>
    ))}
  </ul>
);

export default TypeList;

TypeList.propTypes = {
  categoryTag: PropTypes.string.isRequired,
};
