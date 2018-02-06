
import React from 'react';
import ThreeNews from './ThreeNews';
import './Home.css';
import './ThreeNews.css';
import './main.css';

function Home() {
    return (
        <div className = 'main Home'>
            <div className="top_img">
                <img alt = {'img'} src={require('../img/front.jpg')}  className="header"/>    
            </div> 
           <ThreeNews />
        </div>
    );
}
 
export default Home 