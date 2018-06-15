import React, { Component } from 'react';

const SliderPreviousBtn = (props) => {
  return (
    <div>
        <button onClick={props.previousProject} className="prev"></button>
    </div>
  );
}

export default SliderPreviousBtn;