import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import Select, {Option, OptGroup} from 'rc-select';
import 'rc-select/assets/index.css';

import { server } from "../../../api";
import { getRegions } from "../Services/geoServices";
import Button from '../../../Components/Button/Button';
import './EduListRegistration.css';

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
    regionArray: [],
    cityArray: []
  };

  componentDidMount = () => {
    console.log('qq');
    getRegions();
  }

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
    });
  }

  onDistrictChange = (str) => {
    this.setState({
      location: {
        ...this.state.location,
        district: str
      }
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
    return(
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
                  {/* {
                    Object.keys(this.state.region).map(key => (
                      <Option key={key} value={key}>{this.state.region[key].name}</Option>
                    ))
                  } */}
                  <Option title="Школа" value="school">Школа</Option>
                  <Option title="Сад" value="kindergarten">Сад</Option>
                </Select>     
            </div>
            <div>
                <Select
                  onChange={this.onDistrictChange}
                  placeholder="Регион:"
                  className="place-type-select-edulist"
                  notFoundContent="Регион не найден"
                  optionLabelProp="children"
                >
                  {/* {
                    Object.keys(cases).map(key => (
                      <Option key={key} value={key}>{cases[key].name}</Option>
                    ))
                  } */}
                  <Option title="Школа" value="school">Школа</Option>
                  <Option title="Сад" value="kindergarten">Сад</Option>
                </Select>     
            </div>
            <div>
                <Select
                  onChange={this.onCityChange}
                  placeholder="Город:"
                  className="place-type-select-edulist"
                  notFoundContent="Город не найден"
                  optionLabelProp="children"
                >
                  {/* {
                    Object.keys(cases).map(key => (
                      <Option key={key} value={key}>{cases[key].name}</Option>
                    ))
                  } */}
                  <Option title="Школа" value="school">Школа</Option>
                  <Option title="Сад" value="kindergarten">Сад</Option>
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