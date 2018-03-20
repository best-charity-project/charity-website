import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      checkedTypes: {
        video: false,
        literature: false,
        article: false,
        studyMaterial: false,
      },
    };
    this.handleChangeOfText = this.handleChangeOfText.bind(this);
    this.handleChangeOfCheckboxes = this.handleChangeOfCheckboxes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeOfText(event) {
    this.setState({ searchText: event.target.value });
  }

  handleChangeOfCheckboxes(event) {
    const { checkedTypes } = this.state;
    checkedTypes[event.target.value] = event.target.checked;
    this.setState({ checkedTypes });
  }

  handleSubmit(event) {
    event.preventDefault();
    const checkedTypesArray = [];
    Object.keys(this.state.checkedTypes).forEach((key) => {
      if (this.state.checkedTypes[key] === true) {
        checkedTypesArray.push(key);
      }
    });
    const textSearch = encodeURIComponent(this.state.searchText);
    const checkedTypesString = JSON.stringify(checkedTypesArray);
    this.props.history.push({
      pathname: `${this.props.match.url}/search`,
      search: `textSearch=${textSearch}&types=${checkedTypesString}`,
    });
  }

  render() {
    return (
      <div>
        <form className='search' onSubmit={this.handleSubmit}>
          <div>
            <input
              required
              className='search--input'
              type='search'
              id='search'
              name='textSearch'
              placeholder='Поиск по библиотеке...'
              value={this.state.searchText}
              onChange={this.handleChangeOfText}
            />
            <button className='search--button'>Поиск</button>
          </div>
          <div className='search--checkbox'>
            <div className='checkbox-item'>
              <input
                type='checkbox'
                id='article'
                name='type'
                value='article'
                onChange={this.handleChangeOfCheckboxes}
              />
              <label htmlFor='article'>Статьи</label>
            </div>
            <div className='checkbox-item'>
              <input
                type='checkbox'
                id='video'
                name='type'
                value='video'
                onChange={this.handleChangeOfCheckboxes}
              />
              <label htmlFor='video'>Видео</label>
            </div>
            <div className='checkbox-item'>
              <input
                type='checkbox'
                id='literature'
                name='type'
                value='literature'
                onChange={this.handleChangeOfCheckboxes}
              />
              <label htmlFor='literature'>Литература</label>
            </div>
            <div className='checkbox-item'>
              <input
                type='checkbox'
                id='studyMaterial'
                name='type'
                value='studyMaterial'
                onChange={this.handleChangeOfCheckboxes}
              />
              <label htmlFor='studyMaterial'>Учебный материал</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Search);

Search.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
