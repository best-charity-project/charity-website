import React from 'react';
import SingleNews from './SingleNews';
import { Link } from 'react-router-dom';
import './News.css'
import data from '../../Database/News.json';

export default () => {
    return (
        <div className = 'news-list'>
             <h1 className = 'news--heading'>Latest News</h1>
             <div className = 'news--list-news'>
            {
                data.map ((item) => 
                <Link to='/news/1' className = 'news--link' key  = {item.id} >
                <SingleNews className = 'news--single-box'  key  = {item.id} title = {item.title} text= {item.text}/>
                </Link>
              )}
          </div>  
        </div>
    );
}

