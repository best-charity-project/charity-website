import React from 'react';
import ThreeNews from '../News/ThreeNews';
import './Home.css';
import '../News/ThreeNews.css';
import './main.css';

export default () => {
    return (
        <div className='main Home'>
            <div className="top_img">
                <img alt={'img'} src={require('../img/front.jpg')} className="header" />
            </div>
            <ThreeNews />
        </div>
    );
}

