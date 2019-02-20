import React, { Component } from 'react';
import axios from 'axios';
import './EduWayMarkerList.css';
import { server } from '../../api';
import _ from 'lodash';
import { withAlert } from 'react-alert';
import Button from '../Button/Button';
import AdminNewsSearch from '../Admin/AdminComponents/AdminNewsSearch/AdminNewsSearch';

class MarkersList extends Component {
  state = {
    markers: [],
    filteredMarkers: [],
    checkedIds: []
  };
  componentDidMount() {
    axios({
      method: 'get',
      url: `${server}/api/eduway/a`,
      config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    })
      .then(response => {
        this.setState({
          markers: response.data.markers,
          filteredMarkers: response.data.markers 
        });
      })
      .catch(error => {
        this.props.alert.error("Ошибка сервера");
      });
  }

  changeStatus = (id, status) => {
    axios({
      method: 'put',
      url: `${server}/api/eduway/${id}`,
      data: { isPublic: status },
      config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    })
      .then(response => {
        let updatedMarker = response.data;
        let index = _.findIndex(this.state.markers, function(marker) {
          return marker._id === updatedMarker._id;
        });
        const markers = [...this.state.markers];
        markers[index].isPublic = updatedMarker.isPublic;

        this.setState({markers})
        this.forceUpdate();
      })
      .catch(error => {
        this.props.alert.error("Ошибка сервера");
      });
  };
  deleteMarker = id => {
    axios({
      method: 'delete',
      url: `${server}/api/eduway/${id}`,
      config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    })
      .then(response => {
        let deletedMarker = response.data;
        var array = [...this.state.markers];
        let index = _.findIndex(this.state.markers, function(marker) {
          return marker._id === deletedMarker._id;
        });
        array.splice(index, 1);
        this.setState({ markers: array });
      })
      .catch(error => {
        this.props.alert.error("Ошибка сервера");
      });
  };

  findMarkers = (description) => {
    if(!description) {
      axios({
        url: `${server}/api/eduway/a`,
        method: 'get',
        config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
    })
    .then(res => this.setState({ markers: res.data.markers }))
    .catch(error => this.setState({ error }));
    } else {
        const { markers } = this.state;

        this.setState({
          markers: markers.filter((item) => {
            return item.description.toLowerCase().includes(description);
          })
        });
    };
  };
 
  render() {
    return (
      <div className="markers-content">
        <AdminNewsSearch findNews={this.findMarkers} />
        <div className="markers-list">
          <div className="markers-list-header">
            <span>Описание</span>
            <span>Тип учреждения</span>
            <span>Адрес</span>
            <span>Удалить маркер</span>
            <span>Статус</span>
          </div>
          {this.state.markers.length !== 0
            ? this.state.markers.map((marker, index) => (
                <div className="row" key={index}>
                  <span className="cell">{marker.description}</span>
                  <span className="cell">{marker.type === 'kindergarten' ? 'Сад' : 'Школа'}</span>
                  <span className="cell"> {marker.location}</span>
                  <div className="cell">
                    <Button 
                      name="button-admin admin-cancel"
                      clickHandler={e => this.deleteMarker(marker._id)}
                      label = {<span aria-hidden="true">&times;</span>}
                    />
                  </div>
                  <div className="cell">
                    <Button
                      name={marker.isPublic ? 'button-publish-news':'button-not-publish-news' } 
                      clickHandler={e => this.changeStatus(marker._id, marker.isPublic)}
                      label={marker.isPublic ? 'Отменить публикацию' : 'Опубликовать'}
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
export default withAlert(MarkersList);
