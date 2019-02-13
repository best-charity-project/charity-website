import React from 'react';
import Masonry from 'react-masonry-component';
import LibraryItem from '../LibraryItem/LibraryItem';
import './LibraryList.css';

const LibraryList = (props) => {
  const showItems = () => {
    if (!props.array.length) return <span className="library__message">Нет данных для отображения</span>;
    return <Masonry className='masonry-div'>
      {props.array.map((item, index) => <LibraryItem item={item} key={item.title + index} />)}
    </Masonry>
  };

  return (
    <div className={props.name}>
      {showItems()}
    </div>
  )
}

export default LibraryList;
