import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLibraryItemsAmount } from '../../../../libraryCalls';
import './Type.css';

class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
    };
  }

  componentDidMount() {
    getLibraryItemsAmount(this.props.categoryTag, this.props.typeTag).then((amount) => {
      this.setState({ amount });
    });
  }

  render() {
    return (
      <Link
        className='type--link'
        to={`${this.props.match.url}/${this.props.categoryTag}/${this.props.typeTag}`}
      >
        {this.props.text}
        <span className='type--quantity'>({this.state.amount})</span>
      </Link>
    );
  }
}

export default Type;

Type.propTypes = {
  categoryTag: PropTypes.string.isRequired,
  typeTag: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
