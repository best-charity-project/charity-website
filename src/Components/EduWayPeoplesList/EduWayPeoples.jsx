import React, { Component } from 'react';
import axios from 'axios';
import { server } from '../../api';
import _ from 'lodash';
import { withAlert } from 'react-alert';
import Button from '../Button/Button';

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
      .catch(error => {
        this.props.alert.error("Ошибка сервера");
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
          return person._id === updatedPerson._id;
        });
        const peoples = [...this.state.peoples];
        peoples[index].isPublic = updatedPerson.isPublic;
        this.setState({peoples});
        this.forceUpdate();
      })
      .catch(error => {
        this.props.alert.error("Ошибка сервера");
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
          return person._id === deletedPerson._id;
        });
        array.splice(index, 1);
        this.setState({ peoples: array });
      })
      .catch(error => {
        this.props.alert.error("Ошибка сервера");
      });
  };

  decorateYears(person) {
    let years;
      if(person.yearEnd) {
        years = `${person.yearStart} - ${person.yearEnd}`;
      } else {
        years = person.yearStart;
      }
      return years;
  }

  render() {
    return (
      <div className="markers-content">
        <div className="markers-list">
          <div className="markers-list-header">
            <span>Рекомендованная программа</span>
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
                  <span className="cell"> {person.contactPerson}</span>
                  <span className="cell"> {person.contacts.email} <br/> {person.contacts.phone}</span>
                  <span className="cell"> {person.location.region} <br/> {person.location.district}<br/> {person.location.city}<br/> {person.location.subdistrict} </span>
                  <span className="cell"> {this.decorateYears(person)}</span>
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
export default withAlert(EduWayPeoples);
