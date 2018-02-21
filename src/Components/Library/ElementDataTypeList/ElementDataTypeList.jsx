import React from 'react';
import './ElementDataTypeList.css';

// eslint-disable-next-line react/prefer-stateless-function
class ElementDataTypeList extends React.Component {
  render() {
    return (
      <div className='ElementDataType-List'>
        <p className='ElementDataType'>Литература</p>
        <p className='ElementDataType'>Видео</p>
        <p className='ElementDataType'>Статьи</p>
        <p className='ElementDataType'>Учебные материалы</p>
      </div>
    );
  }
}

export default ElementDataTypeList;
