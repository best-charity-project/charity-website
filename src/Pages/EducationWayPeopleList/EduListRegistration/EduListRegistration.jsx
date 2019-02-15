import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import { map, find } from 'lodash';
import geoDB from '../../../Configs/geo';
import { server } from "../../../api";
import Button from '../../../Components/Button/Button';
import YearPicker from "react-year-picker";
import { withAlert } from 'react-alert';
import './EduListRegistration.css';
const programs = [
  "Вспомогательная 1 отделение",
  "Вспомогательная 2 отделение",
  "Трудности в обучении",
  "Тяжелые нарушения речи",
  "Общеобразовательная программа",
  "Свой вариант",
]

class EduListRegistration extends Component {
  state = {
    program: '',
    customProgram: "",
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
    yearStart: '',
    yearEnd: '',
    districtArray: [],
    cityArray: []
  };

  getContactPerson = (e) => {
    this.setState({ contactPerson: e.target.value });
  };

  onProgramChange = (program) => {
    this.setState({ program });
  };

  onCustomProgramChange = (e) => {
    this.setState({ customProgram: e.target.value });
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

  getYearStart = (year) => {
    this.setState({ yearStart: year.toString() });
  };

  getYearEnd = (year) => {
    this.setState({ yearEnd: year.toString() });
  };

  onRegionChange = (str) => {
    this.setState({
      location: {
        ...this.state.location,
        region: str
      }
    }, () => {
      map(geoDB, el => {
        if (el.region === str) {
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
      program: '',
      customProgram: "",
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
      yearStart: '',
      yearEnd: ""
    })
    this.props.history.push({
      pathname: '/education-way-people-list'
    });
  }

  onPublish = (e) => {
    const body = this.state;
    body.diagnosis = this.state.program === "Свой вариант" ? this.state.customProgram : this.state.program;
    if(
      !body.diagnosis ||
      !body.contactPerson ||
      !body.contacts.email ||
      !body.contacts.phone ||
      !body.location.region ||
      !body.location.district ||
      !body.location.city ||
      !body.yearStart
    ) return this.props.alert.error('Заполните все необходимые поля');

    axios({
      method: 'post',
      url: `${server}/api/edulist/`,
      data: body
    })
      .then(respose => {
        this.setState({
          program: '',
          customProgram: "",
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
          yearStart: '',
          yearEnd: ""
        })
        this.props.history.push({
          pathname: '/education-way-people-list'
        });
      })
      .catch(err => {
        this.props.alert.error("Ошибка базы данных");
      });
  }

  showAdditionalInput() {
    if (this.state.program !== "Свой вариант") return;
    return (
      <input
        type="text"
        placeholder="Введите программу"
        name="edulist-registration-program"
        required
        className="edulist-registration-program"
        onChange={this.onCustomProgramChange}
      />
    )
  }

  render() {
    const { districtArray, cityArray } = this.state;

    return (
      <div className="edulist-registration-wrapper">
        <div className="edulist-registration-container">
          <div className="edulist-registration-form">
            <Select
              onChange={this.onProgramChange}
              placeholder="Рекомендованная программа образования*"
              className="place-type-select-edulist"
              notFoundContent="Программа не найдена"
              optionLabelProp="children"
            >
              {
                map(programs, item => {
                  return <Option key={item} value={item}>{item}</Option>
                })
              }
            </Select>
            {this.showAdditionalInput()}
            <input
              type="text"
              placeholder="Контактное лицо*"
              name="edulist-registration-contact-person"
              required
              className="edulist-registration-contact-person"
              onChange={this.getContactPerson}
            />
            <input
              type="text"
              placeholder="e-mail*"
              name="edulist-registration-email"
              required
              className="edulist-registration-email"
              onChange={this.getEmail}
            />
            <InputMask
              required
              placeholder="Телефон*"
              mask="+375 (99) 999-99-99"
              onChange={this.getPhone}
              name="edulist-registration-phone"
              className="edulist-registration-phone"
            />
            <label className="place-type">Ваш примерный адрес:</label>
            <div>
              <Select
                combobox
                onChange={this.onRegionChange}
                placeholder="Область*"
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
                placeholder="Регион*"
                className="place-type-select-edulist"
                notFoundContent="Регион не найден"
                optionLabelProp="children"
                dropdownMenuStyle={{ maxHeight: 400 }}
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
                placeholder="Город*"
                className="place-type-select-edulist"
                notFoundContent="Город не найден"
                optionLabelProp="children"
                dropdownMenuStyle={{ maxHeight: 400 }}
              >
                {
                  map(cityArray, (item, id) => {
                    return <Option key={id} value={item}>{item}</Option>
                  })
                }
              </Select>
              <label className="place-type">Предполагаемые годы зачисления в учреждение:</label>
              <div className="years-container">
                {"c*"}<YearPicker onChange={this.getYearStart} />
                {"до"}<YearPicker onChange={this.getYearEnd} />
              </div>

            </div>

          </div>
          <div className="edulist-registration-button">
            <Route render={({ history }) => (
              <Button
                label={"Отменить"}
                name="button-user-registration button-user-registration-cancel"
                clickHandler={this.onCancel}
              />
            )} />
            <Route render={({ history }) => (
              <Button
                label={"Подать заявку"}
                name="button-user-registration button-user-registration-done"
                clickHandler={this.onPublish}
              />
            )} />
          </div>
        </div>
      </div>
    );
  }
};

export default withAlert(EduListRegistration);