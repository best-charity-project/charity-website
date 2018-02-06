import React from 'react';
import './ThreeNews.css';
import SingleNews from '../News/SingleNews';
import { Link } from 'react-router-dom';

function ThreeNews() {
    return (
        <div>
            <p className = 'heading'>Latest News</p>
             <div className = 'news'>
                <Link to='/NewsItemPage' className = 'link'><SingleNews className = 'news-box' title="New-title one" text="Through our partners we can provide you with a full solution including the weather content and advertising engine as well." /></Link>
                <Link to='/NewsItemPage' className = 'link'><SingleNews className = 'news-box' title="New-title two" text="Proxy server can filter recieved data, for example block some sites, change content or even replace it with its own."/></Link>
                <Link to='/NewsItemPage' className = 'link'><SingleNews className = 'news-box' title="New-title-three" text="Such screens are easily maintained, environmentally-friendly and can playback dynamic content." /></Link>
             </div>
        </div>
    );
}

export default ThreeNews