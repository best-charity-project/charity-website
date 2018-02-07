import React from 'react';
import './Home.css';

export default () => (
            <div className = 'home indent'>
                <div className='home--image-wrapper'>
                    <img src={require('../img/front.jpg')}  className='home--image_big'/>    
                </div> 
            </div>
);
