import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLibraryItemsAmount } from '../../../../libraryCalls';
import cancelablePromise from '../../../../utils/cancelablePromise';
import './Type.css';

export default class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
    };
  }

  componentDidMount() {
    this.cancelablePromise =
      cancelablePromise(getLibraryItemsAmount(this.props.categoryTag, this.props.typeTag));
    this.cancelablePromise.promise
      .then((amount) => {
        this.setState({ amount });
      })
      .catch((err) => {
        window.console.log(err);
      });
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
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

Type.propTypes = {
  categoryTag: PropTypes.string.isRequired,
  typeTag: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
