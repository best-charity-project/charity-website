import React, { Component } from 'react';
import { server } from '../../api';
import axios from 'axios';
import Map from '../../Components/Map/map';
import { debounce } from 'lodash';
import './EducationWay.css';
import ymaps from 'ymaps';

class App extends Component {
  state = {
    selectedCoords: [],
    suggestionList: [],
    displayedStep: 1,
    isModalWindowShow: false,
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
    this.typeRef = React.createRef();
    this.descRef = React.createRef();
  }
  async componentDidMount() {
    this.api = await ymaps.load();
    axios({
      method: 'get',
      url: `${server}/api/eduway`,
      config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    })
      .then(response => {
        this.setState({ selectedCoords: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  resetData = () => {
    this.setState({ suggestionList: [] });
    if (this.inputRef.current && this.inputRef.current.value !== '') this.inputRef.current.value = '';
    if (this.typeRef.current && this.typeRef.current.value !== null) this.typeRef.current.value = '';
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
          type: this.typeRef.current.value,
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

  render() {
    return (
      <div className="app">
        <aside className="app__sidebar">
          <input type="button" value="Добавить" onClick={this.showAddPointModal} />
        </aside>
        <Map coords={this.state.selectedCoords} />
        {this.state.isModalWindowShow ? (
          <div>
            <div className="modal-window-overlay" />
            <div className="modal-window">
              <div className="modal-window-head">
                <a onClick={this.hideAddPointModal}>close</a>
              </div>
              <div className="modal-window-body">
                {this.state.displayedStep === 1 ? (
                  <div className="first-step">
                    <label>
                      Адрес учереждения:
                      <input type="text" ref={this.inputRef} onChange={e => this.findAddress(e.target.value)} />
                    </label>
                    <div className="suggestions-list">
                      <ul>
                        {this.state.suggestionList.length !== 0
                          ? this.state.suggestionList.map((item, index) => (
                              <li key={index} onClick={this.getCoordinates}>
                                {item.displayName}
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="secondStep">
                    <label>
                      Тип учереждения:
                      <select ref={this.typeRef}>
                        <option value="school">Школа</option>
                        <option value="kindergarten">Сад</option>
                      </select>
                    </label>
                    <label>
                      Описание:
                      <textarea cols="30" rows="10" ref={this.descRef} />
                      <button className="btn_finish" onClick={this.addingPoint}>
                        Отправить запрос на добавление
                      </button>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
