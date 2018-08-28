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

  changeStatus = id => {
    console.log(id);
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
                    <button onClick={e => this.changeStatus(marker._id)}>
                      {marker.isPublic ? 'Убрать' : 'Опубликовать'}
                    </button>
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
