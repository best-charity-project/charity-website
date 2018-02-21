import React from 'react';
// import { getNews, addNews } from '../../newsCalls';
// import Form from './Form/Form';
import './Admin.css';
import SingleNews from '../News/SingleNews/SingleNews';
import ControlButton from '../ControlButton/ControlButton';
import DetailsButton from '../DetailsButton/DetailsButton';

export default class AdminNewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props._id,
      title: this.props.title,
      shortDescription: this.props.shortDescription,
      url: this.props.url,
      date: this.props.date,
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.props.onNewsUpdate(this.state);
  }

  render() {
    return (
      <div className='news-list--item'>
        <SingleNews title={this.props.title} shortDescription={this.props.shortDescription} />
        <ControlButton text='Редактировать' onButtonClick={this.handleEdit} />
        <ControlButton text='Удалить' />
        <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
      </div>
    );
  }
}
