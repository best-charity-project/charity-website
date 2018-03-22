import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.defaultTypesArray = ['video', 'literature', 'article', 'studyMaterial'];
    this.typesValuesRus = ['Видео', 'Литератруа', 'Статьи', 'Учебные материалы'];
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

  getCheckedValues() {
    return Object.keys(this.state.checkedTypes).filter(key => this.state.checkedTypes[key]);
  }

  handleChangeOfText(event) {
    this.setState({ searchText: event.target.value });
  }

  handleChangeOfCheckboxes(event) {
    const { checkedTypes } = this.state;
    checkedTypes[event.target.value] = !checkedTypes[event.target.value];
    this.setState({ checkedTypes });
  }

  handleSubmit(event) {
    event.preventDefault();
    let checkedTypesArray = this.getCheckedValues();
    if (checkedTypesArray.length === 0) {
      checkedTypesArray = this.defaultTypesArray;
    }
    this.props.history.push({
      pathname: `${this.props.match.url}/search`,
      search: `textSearch=${encodeURIComponent(this.state.searchText)}&types=${JSON.stringify(checkedTypesArray)}`,
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
            {this.defaultTypesArray.map((item, index) => (
              <div className='search--checkbox-item'>
                <input
                  type='checkbox'
                  id={item}
                  name='type'
                  value={item}
                  onChange={this.handleChangeOfCheckboxes}
                />
                <label htmlFor={item}>{this.typesValuesRus[index]}</label>
              </div>
            ))}
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
