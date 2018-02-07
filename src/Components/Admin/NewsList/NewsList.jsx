import React from 'react';
import NewsListItem from './NewsListItem.jsx';

export default () => (
    <div className="news-list">
        <NewsListItem title="title" shortDescription="description" />
        <NewsListItem title="title2" shortDescription="description2" />  
    </div>
);