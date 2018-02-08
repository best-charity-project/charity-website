import React from 'react';
import { Link } from 'react-router-dom';
import SingleNews from '../News/SingleNews';
import data from '../../Database/News.json';
import './ThreeNews.css';
import '../News/SingleNews.css';

export default () => {
    return (
        <div className='news-box'>
            <h1 className='news-box--heading'>Latest News</h1>
            <div className='homepage-news'>
                {
                    data.slice(0, 3).map((item) => 
                    <Link to='/news/1' className='news--link' key  = {item.id}>
                        <SingleNews className='homepage-news--box' key  = {item.id} title = {item.title} text= {item.text} />    
                    </Link>   
                    )
                } 
            </div>
        </div>
    );
}

