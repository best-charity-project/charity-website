import React, { Component } from 'react';

const SliderNextBtn = (props) => {
  return (
    <div>
        <button onClick={props.nextProject} className="next"></button>  
    </div>
  );
}

export default SliderNextBtn;