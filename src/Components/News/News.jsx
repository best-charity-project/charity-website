import React from 'react';
import { Link } from 'react-router-dom';
import SingleNews from './SingleNews';
import data from '../../Database/News.json';
import './News.css'

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

