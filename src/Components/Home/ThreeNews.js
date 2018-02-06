import React from 'react';
import SingleNews from '../News/SingleNews';
import { Link } from 'react-router-dom';
import './ThreeNews.css';
import '../News/SingleNews.css';

function ThreeNews() {
    return (
        <div className='news-box'>
            <p className='news-box--heading'>Latest News</p>
            <div className='homepage-news'>
                <Link to='/news/1' className='news--link'>
                    <SingleNews className='homepage-news--box' title="New-title one" text="Through our partners we can provide you with a full solution including the weather content and advertising engine as well." />
                </Link>
                <Link to='/news/2' className='news--link'>
                    <SingleNews className='homepage-news--box' title="New-title two" text="Proxy server can filter recieved data, for example block some sites, change content or even replace it with its own." />
                </Link>
                <Link to='/news/3' className='news--link'>
                    <SingleNews className='homepage-news--box' title="New-title-three" text="Such screens are easily maintained, environmentally-friendly and can playback dynamic content." />
                </Link>
            </div>
        </div>
    );
}

export default ThreeNews
