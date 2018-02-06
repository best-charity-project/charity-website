import React from 'react';
import SingleNews from '../News/SingleNews';
import { Link } from 'react-router-dom';
import './ThreeNews.css';
import '../News/SingleNews.css';
import data from '../../Database/News.json';
var news = data.slice(0, 3);
export default () => {
    return (
        <div className='news-box'>
            <p className='news-box--heading'>Latest News</p>
            <div className='homepage-news'>
                {
                    news.map((item, i) => 
                    <Link to='/news/1' className='news--link' key  = {item.id}>
                        <SingleNews className='homepage-news--box' key  = {item.id} title = {item.title} text= {item.text} />
                    </Link>   
                )
                } 
            </div>
        </div>
    );
}

