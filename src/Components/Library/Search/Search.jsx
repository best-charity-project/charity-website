import React from 'react';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      checkedTypes: [],
    };
    this.handleChangeOfText = this.handleChangeOfText.bind(this);
    this.handleChangeOfCheckboxes = this.handleChangeOfCheckboxes.bind(this);
  }
  handleChangeOfText(event) {
    this.setState({ searchText: event.target.value });
    //   console.log(this.state.searchText);
  }
  handleChangeOfCheckboxes(event) {
    this.setState({ checkedTypes: [...this.state.checkedTypes, event.target.value] });
    //  console.log(this.state.checkedTypes);
  }
  render() {
    return (
      <form role='search'>
        <div>
          <input
            type='search'
            id='search'
            placeholder='Поиск по категории...'
            value={this.state.searchText}
            onChange={this.handleChangeOfText}
          />
          <button>Поиск</button>
        </div>
        <div className='search'>
          <div>
            <input
              type='checkbox'
              id='articles'
              name='type'
              value='articles'
              onChange={this.handleChangeOfCheckboxes}
            />
            <label htmlFor='articles'>Статьи</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='video'
              name='interest'
              value='video'
              onChange={this.handleChangeOfCheckboxes}
            />
            <label htmlFor='video'>Видео</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='literature'
              name='interest'
              value='literature'
              onChange={this.handleChangeOfCheckboxes}
            />
            <label htmlFor='literature'>Литература</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='study_material'
              name='interest'
              value='study_material'
              onChange={this.handleChangeOfCheckboxes}
            />
            <label htmlFor='study_material'>Учебный материал</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='all'
              name='interest'
              value='all'
              onChange={this.handleChangeOfCheckboxes}
            />
            <label htmlFor='all'>Везде</label>
          </div>
        </div>
      </form>
    );
  }
}

export default Search;
