import React, { Component } from 'react';
import axios from 'axios';
import './EduWayMarkerList.css';
import { server } from '../../api';
import _ from 'lodash';

class MarkersList extends Component {
  state = {
    markers: [],
  };
  componentDidMount() {
    axios({
      method: 'get',
      url: `${server}/api/eduway/a`,
      config: { headers: { 'Content-Type': 'application/json; charset=UTF-8' } },
    })
      .then(response => {
        this.setState({ markers: response.data.markers });
      })
      .catch(function(error) {
        console.log(error);
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
          return marker._id == updatedMarker._id;
        });
        this.state.markers[index].isPublic = updatedMarker.isPublic;
        this.forceUpdate();
      })
      .catch(function(error) {
        console.log(error);
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
          return marker._id == deletedMarker._id;
        });
        array.splice(index, 1);
        this.setState({ markers: array });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="markers-content">
        <div className="markers-list">
          {this.state.markers.length !== 0
            ? this.state.markers.map((marker, index) => (
                <div className="row" key={index}>
                  <div className="cell"> {marker.location}</div>
                  <div className="cell">{marker.type === 'kindergarten' ? 'Сад' : 'Школа'}</div>
                  <div className="cell">{marker.description}</div>
                  <div className="cell action">
                    <button onClick={e => this.changeStatus(marker._id, marker.isPublic)}>
                      {marker.isPublic ? 'Убрать' : 'Опубликовать'}
                    </button>
                    <button onClick={e => this.deleteMarker(marker._id)}>Удалить</button>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}
export default MarkersList;
