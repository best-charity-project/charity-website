import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Search extends React.Component {
  render() {
    return (
      <form role='search'>
        <div>
          <input type='search' id='search' name='search' placeholder='Поиск по категории...' />
          <button>Поиск</button>
        </div>
      </form>
    );
  }
}

export default Search;
