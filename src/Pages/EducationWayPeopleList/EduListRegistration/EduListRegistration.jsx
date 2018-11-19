import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import Select, { Option, OptGroup } from 'rc-select';
import 'rc-select/assets/index.css';
import { map, filter, find } from 'lodash';

import geoDB from '../../../Configs/geo';
import { server } from "../../../api";
import Button from '../../../Components/Button/Button';
import './EduListRegistration.css';
import { finished } from 'stream';

export default class EduListRegistration extends Component {
  state = {
    diagnosis: '',
    contactPerson: '',
    contacts: '',
    location: {
      region: '',
      district: '',
      city: ''
    },
    years: '',
    districtArray: [],
    cityArray: []
  };

  getDiagnosis = (str) => {
    this.setState({ diagnosis: str });
  };

  getContactPerson = (str) => {
    this.setState({ contactPerson: str });
  };

  getContacts = (str) => {
    this.setState({ contacts: str });
  };

  getYears = (str) => {
    this.setState({ years: str });
  };

  onRegionChange = (str) => {
    this.setState({
      location: {
        ...this.state.location,
        region: str
      }
    }, () => {
      map(geoDB, el => {
        if(el.region === str ) {
          this.setState({
            districtArray: el.districts
          })
        }
      })
    })
  }

  onDistrictChange = (str) => {
    this.setState({
      location: {
        ...this.state.location,
        district: str
      }
    }, () => {
      const areaValue = find(this.state.districtArray, { name: str })
      this.setState({
        cityArray: areaValue.cities
      })
    });
  }

  onCityChange = (str) => {
    this.setState({
      location: {
        ...this.state.location,
        city: str
      }
    });
  }

  onCancel = (e) => {
    e.preventDefault();
    this.setState({
      diagnosis: '',
      contactPerson: '',
      contacts: '',
      location: {
        region: '',
        district: '',
        city: ''
      },
      years: ''
    })
    this.props.history.push({
      pathname: '/education-way-people-list'
    });
  }

  onPublish = (e) => {
    axios({
      method: 'post',
      url: `${server}/api/edulist/`,
      data: this.state
    })
    .then(respose => {
      this.setState({
        diagnosis: '',
        contactPerson: '',
        contacts: '',
        location: {
          region: '',
          district: '',
          city: ''
        },
        years: ''
      })
      this.props.history.push({
        pathname: '/education-way-people-list'
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    const { districtArray, cityArray } = this.state;

    return (
      <div className="edulist-registration-wrapper">
        <div className="edulist-registration-container">
          <div className="edulist-registration-form">
            <input
              type="text"
              placeholder="Название болезни"
              name="edulist-registration-diagnosis"
              required
              className="edulist-registration-diagnosis"
              onChange={this.getDiagnosis}
            />
            <input
              type="text"
              placeholder="Контактное лицо"
              name="edulist-registration-contact-person"
              required
              className="edulist-registration-contact-person"
              onChange={this.getContactPerson}
            />
            <input
              type="text"
              placeholder="Контакты"
              name="edulist-registration-contacts"
              required
              className="edulist-registration-contacts"
              onChange={this.getContacts}
            />
            <input
              type="text"
              placeholder="Годы поступления"
              name="edulist-registration-years"
              required
              className="edulist-registration-years"
              onChange={this.getYears}
            />
            <label className="place-type"> Ваш примерный адрес: </label>
            <div>
              <Select
                onChange={this.onRegionChange}
                placeholder="Область:"
                className="place-type-select-edulist"
                notFoundContent="Область не найдена"
                optionLabelProp="children"
              >
                {
                  map(geoDB, (element, index) => {
                    return <Option key={index} value={element.region}>{element.region}</Option>
                  })
                }
              </Select>     
            </div>
            <div>
              <Select
                onChange={this.onDistrictChange}
                placeholder="Регион:"
                className="place-type-select-edulist"
                notFoundContent="Регион не найден"
                optionLabelProp="children"
                dropdownMenuStyle = {{ maxHeight: 250 }}
              >
                {
                  map(districtArray, (item, id) => {
                    return <Option key={id} value={item.name}>{item.name}</Option>
                  })
                }
              </Select>     
            </div>
            <div>
              <Select
                onChange={this.onCityChange}
                placeholder="Город:"
                className="place-type-select-edulist"
                notFoundContent="Город не найден"
                optionLabelProp="children"
                dropdownMenuStyle = {{ maxHeight: 250 }}
              >
                {
                  map(cityArray, (item, id) => {
                    return <Option key={id} value={item}>{item}</Option>
                  })
                }
              </Select>     
            </div>
            
          </div>
          <div className="edulist-registration-button">
            <Route render={({ history }) => (
              <Button 
                label={"Отменить"}
                name = "button-user-registration button-user-registration-cancel"
                clickHandler = {this.onCancel}
              />
            )} />
            <Route render={({ history }) => (
              <Button 
                label={"Подать заявку"}
                name = "button-user-registration button-user-registration-done"
                clickHandler = {this.onPublish}
              />
            )} />
          </div>
        </div>
      </div>
    );
  }
};