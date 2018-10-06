import React, { Component } from 'react';
import { server } from '../../api';
import axios from 'axios';
import Select, {Option, OptGroup} from 'rc-select';
import 'rc-select/assets/index.css';
import Map from '../../Components/Map/map';
import { debounce } from 'lodash';
import './EducationWay.css';
import ymaps from 'ymaps';
import Menu from '../../Components/Menu/Menu';
import Button from '../../Components/Button/Button';

class App extends Component {
  state = {
    selectedCoords: [],
    suggestionList: [],
    kindergartenArray: [],
    allArray:[],
    schoolArray: [],
    displayedStep: 1,
    isModalWindowShow: false,
    typeValue: '',
    symbolsCounter: 0,
    pointDetails: {
      coords: [],
      location: '',
      type: '',
      description: '',
    },
  };
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.descRef = React.createRef();
  }
  async componentDidMount() {
    const kindergartenData = {markers:[]},
          schoolData = {markers:[]},
          allData = {markers:[]};

    this.api = await ymaps.load();
    axios({
      method: 'get',
      url: `${server}/api/eduway`,
      config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    })
      .then(response => {
        response.data.markers.map((el,index) => {
          if(el.type === 'school'){
            schoolData.markers.push(el);
          }
          if(el.type === 'kindergarten'){
            kindergartenData.markers.push(el);
          }
        });
        this.setState({
          allArray: response.data,
          selectedCoords: response.data,
          kindergartenArray: kindergartenData,
          schoolArray: schoolData
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  resetData = () => {
    this.setState({ suggestionList: [] });
    if (this.inputRef.current && this.inputRef.current.value !== '') this.inputRef.current.value = '';
    if (this.descRef.current && this.descRef.current.value !== '') this.descRef.current.value = '';
  };

  nextStep = () => {
    this.setState({ displayedStep: 2 });
  };

  getCoordinates = e => {
    let location = e.target.textContent;
    this.resetData();
    let geocoder = this.api.geocode(location);
    geocoder.then(
      res => {
        this.setState(prevState => ({
          pointDetails: {
            ...prevState.pointDetails,
            coords: res.geoObjects.get(0).geometry.getCoordinates(),
            location: location,
          },
        }));
      },
      err => {
        console.log(err);
      }
    );
    this.nextStep();
  };

  getSugestions(location) {
    let suggest = this.api.suggest(location);
    suggest.then(
      res => {
        this.setState({ suggestionList: res });
      },
      err => {
        console.log(err);
      }
    );
  }

  addingPoint = () => {
    this.setState(
      prevState => ({
        pointDetails: {
          ...prevState.pointDetails,
          type: this.state.typeValue,
          description: this.descRef.current.value,
        },
      }),
      () => {
        axios({
          method: 'post',
          url: `${server}/api/eduway`,
          data: this.state.pointDetails,
          config: {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        })
          .then(res => {
            this.hideAddPointModal();
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  };

  findAddress = debounce(value => {
    this.getSugestions(value);
  }, 1000);

  showAddPointModal = e => {
    this.setState({ isModalWindowShow: true });
  };

  hideAddPointModal = e => {
    this.setState({ isModalWindowShow: false, displayedStep: 1 });
    this.resetData();
  };

  showSchoolMarkers = () => {
    this.setState({
      selectedCoords: this.state.schoolArray
    });
  }

  showKindergartenMarkers = () => {
    this.setState({
      selectedCoords: this.state.kindergartenArray
    });
  }

  showAllMarkers = () => {
    this.setState({
      selectedCoords: this.state.allArray
    });
  }

  onChange = (typeValue) => {
    this.setState({
      typeValue,
    });
  };

  getCurrentText = (event) => {
    this.setState({
        symbolsCounter: event.target.value.length
    });
};

  render() {
    return (
      <div className="main-page-client">
      <Menu name="client-menu" />
      <div className="app">
        <ul className="app__sidebar">
          <li><input className="add-marker-btn" type="button" value="+" onClick={this.showAddPointModal} /></li>
          <li>
            <input className="add-filter-btn" type="button" />
            <ul className="filter-submenu">
              <li><input className="filter-school-btn" type="button" onClick={this.showSchoolMarkers} /></li>
              <li><input className="filter-kindergarten-btn" type="button" onClick={this.showKindergartenMarkers} /></li>
              <li><input className="filter-all-btn" type="button" onClick={this.showAllMarkers} /></li>
            </ul>
          </li>
        </ul>
        <Map coords={this.state.selectedCoords} />
        {this.state.isModalWindowShow ? (
          <div>
            <div className="modal-window-overlay" />
            <div className="modal-window">
              <div className="modal-window-head" onClick={this.hideAddPointModal}>
                <a className="close-icon"></a>
              </div>
              <div className="modal-window-body">
                {this.state.displayedStep === 1 ? (
                  <div className="first-step">
                    <label className="search-label">
                      Адрес учереждения:
                      <input type="text" ref={this.inputRef} onChange={e => this.findAddress(e.target.value)} />
                    </label>
                    <div className="suggestions-list">
                      <ul>
                        {this.state.suggestionList.length !== 0
                          ? this.state.suggestionList.map((item, index) => (
                              <li className="search-result" key={index} onClick={this.getCoordinates}>
                                {item.displayName}
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="second-step">
                    <label className="place-type">
                      Тип учереждения:
                      <Select 
                        value={this.state.typeValue}
                        onChange={this.onChange}
                        placeholder="Выберите:"
                        className="place-type-select"
                        notFoundContent="Адрес не найден"
                        optionLabelProp="title"
                      >
                        <Option title="Школа" value="school">Школа</Option>
                        <Option title="Сад" value="kindergarten">Сад</Option>
                      </Select>
                    </label>
                    <label className="place-desc">
                      Описание:
                      <br/>
                      <textarea
                        cols="30"
                        rows="10"
                        ref={this.descRef}
                        maxLength="100"
                        onChange={this.getCurrentText}
                      />
                      <span>Количество оставшихся символов: <b>{100-this.state.symbolsCounter}</b></span>
                    </label>
                    <Button 
                      name="button-add-marker"
                      clickHandler={this.addingPoint}
                      label="Отправить запрос на добавление"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      </div>
    );
  }
}

export default App;
