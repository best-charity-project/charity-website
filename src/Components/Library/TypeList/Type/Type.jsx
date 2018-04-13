import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLibraryItemsAmount } from '../../../../libraryCalls';
import cancelablPromise from '../../../../utils/makeCancelablePromise';
import './Type.css';

class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
    };
  }

  componentDidMount() {
    this.prms = cancelablPromise(getLibraryItemsAmount(this.props.categoryTag, this.props.typeTag));
    this.prms.promise
      .then((amount) => {
        this.setState({ amount });
      })
      .catch((err) => {
        this.error = err;
      });
  }

  componentWillUnmount() {
    this.prms.cancel();
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
