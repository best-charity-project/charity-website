import React from 'react';
import { Link } from 'react-router-dom';
import './Organization.css';

const Organization = item => (
  <div className='organization-item' key={item._id}>
    <h2 className='item-heading'>{item.name}</h2>
    <p>{item.shortDescription}</p>
    <p>{item.contacts}</p>
    <Link to={item.url} target='_blank' rel='noopener noreferrer'>
      {item.url}
    </Link>
  </div>
);

export default Organization;
