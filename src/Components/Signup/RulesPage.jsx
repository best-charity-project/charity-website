import React from 'react';
import PropTypes from 'prop-types';
import rules from './rules.json';
import './RulesPage.css';

const RulesPage = props => (
  <div className='form--accept-rules'>
    <div className='accept-rules--window'>
      <button className='window--close' onClick={props.toggle} />
      <p className='window--heading'>{rules[0].heading}</p>
      {rules.map(rule => <p>{rule.point}</p>)}
    </div>
  </div>
);

export default RulesPage;

RulesPage.propTypes = {
  toggle: PropTypes.func.isRequired,
};