import React from 'react';
import Masonry from 'react-masonry-component';
import LibraryItem from '../LibraryItem/LibraryItem';
import './LibraryList.css';

const LibraryList = (props) => {
  const showItems = () => {
    if (!props.array.length) return <span className="library__message">Нет данных для отображения</span>;
    return props.array.map((item, index) => <LibraryItem item={item} key={item.title + index} />);
  };

  return (
    <div className={props.name}>
      <Masonry className='masonry-div'>
        {showItems()}
      </Masonry>
    </div>
  )
}

export default LibraryList;
