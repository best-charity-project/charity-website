import React, { Component } from 'react';
import axios from 'axios';
// import './EduWayMarkerList.css';
import { server } from '../../api';
import _ from 'lodash';

import Button from '../Button/Button';
import AdminNewsSearch from '../Admin/AdminComponents/AdminNewsSearch/AdminNewsSearch';
import rubbishImg from '../../Assets/AssetsSvg/mbri-trash.svg';
class EduWayPeoples extends Component {
  state = {
    peoples: [],
  };
  componentDidMount() {
    axios({
      method: 'get',
      url: `${server}/api/edulist/a`,
      config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    })
      .then(response => {
        this.setState({
          peoples: response.data.persons,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  changeStatus = (id, status) => {
    axios({
      method: 'put',
      url: `${server}/api/edulist/${id}`,
      data: { isPublic: status },
      config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    })
      .then(response => {
        let updatedPerson = response.data;
        let index = _.findIndex(this.state.peoples, function(person) {
          return person._id == updatedPerson._id;
        });
        this.state.peoples[index].isPublic = updatedPerson.isPublic;
        this.forceUpdate();
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  deleteUser = id => {
    axios({
      method: 'delete',
      url: `${server}/api/edulist/${id}`,
      config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    })
      .then(response => {
        let deletedPerson = response.data;
        var array = [...this.state.peoples];
        let index = _.findIndex(this.state.peoples, function(person) {
          return person._id == deletedPerson._id;
        });
        array.splice(index, 1);
        this.setState({ peoples: array });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="markers-content">
        <div className="markers-list">
          <div className="markers-list-header">
            <span>Диагноз</span>
            <span>Имя</span>
            <span>Контактное лицо</span>
            <span>Контакты</span>
            <span>Адрес</span>
            <span>Год поступления</span>
            <span>Удалить</span>
            <span>Опубликовать</span>
          </div>
          {this.state.peoples.length !== 0
            ? this.state.peoples.map((person, index) => (
                <div className="row" key={index}>
                  <span className="cell">{person.diagnosis}</span>
                  <span className="cell">{person.name}</span>
                  <span className="cell"> {person.contactPerson}</span>
                  <span className="cell"> {person.contacts}</span>
                  <span className="cell"> {person.location}</span>
                  <span className="cell"> {person.years}</span>
                  <div className="cell">
                    <Button
                      name="button-admin admin-cancel"
                      clickHandler={e => this.deleteUser(person._id)}
                      label={<span aria-hidden="true">&times;</span>}
                    />
                  </div>
                  <div className="cell">
                    <Button
                      name={person.isPublic ? 'button-publish-news' : 'button-not-publish-news'}
                      clickHandler={e => this.changeStatus(person._id, person.isPublic)}
                      label={person.isPublic ? 'Отменить подтверждение' : 'Подтвердить'}
                    />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}
export default EduWayPeoples;