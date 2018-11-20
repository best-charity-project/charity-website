import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';
import Select, { Option, OptGroup } from 'rc-select';
import 'rc-select/assets/index.css';
import { map, filter, find } from 'lodash';

import geoDB from '../../../Configs/geo';
import { server } from "../../../api";
import Button from '../../../Components/Button/Button';
import './EduListRegistration.css';

export default class EduListRegistration extends Component {
  state = {
    diagnosis: '',
    contactPerson: '',
    contacts: {
      email: '',
      phone: ''
    },
    location: {
      region: '',
      district: '',
      city: ''
    },
    years: '',
    districtArray: [],
    cityArray: []
  };

  getDiagnosis = (e) => {
    this.setState({ diagnosis: e.target.value });
  };

  getContactPerson = (e) => {
    this.setState({ contactPerson: e.target.value });
  };

  getEmail = (e) => {
    this.setState({ 
      contacts: {
        ...this.state.contacts,
        email: e.target.value
      }
     });
  };

  getPhone = (e) => {
    this.setState({ 
      contacts: {
        ...this.state.contacts,
        phone: e.target.value
      }
     });
  };

  getYears = (e) => {
    this.setState({ years: e.target.value });
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
      contacts: {
        email: '',
        phone: ''
      },
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
        contacts: {
          email: '',
          phone: ''
        },
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
              placeholder="e-mail"
              name="edulist-registration-email"
              required
              className="edulist-registration-email"
              onChange={this.getEmail}
            />
            <InputMask 
              required
              placeholder="Телефон"
              mask="+375 (99) 999-99-99"
              onChange={this.getPhone}
              name="edulist-registration-phone"
              className="edulist-registration-phone"
            />
            <InputMask 
              required
              placeholder="Годы поступления"
              formatChars={{
                '1': '[0-1]',
                '2': '[1-2]',
                '3': '[0-3]',
                '9': '[0-9]'
              }}
              mask="39-19-2999"
              onChange={this.getYears}
              name="edulist-registration-years"
              className="edulist-registration-phone"
            />
            <label className="place-type"> Ваш примерный адрес: </label>
            <div>
              <Select
                combobox
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