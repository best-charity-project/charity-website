import React from 'react';
import NewsList from './NewsList/NewsListItem.jsx';
export default () => (
    <div className="Admin">
        <NewsList title="Title" shortDescription='Description' />
        <NewsList title="Title2" shortDescription='Description2' />  
    </div>
);