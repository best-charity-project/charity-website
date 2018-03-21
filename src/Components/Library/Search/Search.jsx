import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.defaultQuery = ['video', 'literature', 'article', 'studyMaterial'];
    this.queryValuesRus = ['Видео', 'Литератруа', 'Статьи', 'Учебные материалы'];
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
    checkedTypes[event.target.value] = !checkedTypes[event.target.value];
    this.setState({ checkedTypes });
  }

  handleSubmit(event) {
    event.preventDefault();
    let checkedTypesArray = [];
    checkedTypesArray = Object.keys(this.state.checkedTypes).filter(key => this.state.checkedTypes[key] === true);
    if (checkedTypesArray.length === 0) {
      checkedTypesArray = this.defaultQuery;
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
            {this.defaultQuery.map((item, index) => (
              <div className='search--checkbox-item'>
                <input
                  type='checkbox'
                  id={item}
                  name='type'
                  value={item}
                  onChange={this.handleChangeOfCheckboxes}
                />
                <label htmlFor={item}>{this.queryValuesRus[index]}</label>
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
