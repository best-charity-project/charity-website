import ymaps from 'ymaps';
import React, { Component } from 'react';
import './map.css';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  async componentDidMount() {
    this.baseLocation = [53.893009, 27.567444];
    this.api = await ymaps.load();
    this.yMap = new this.api.Map(this.mapRef.current, {
      center: this.baseLocation,
      controls: ['geolocationControl', 'zoomControl'],
      zoom: 12,
    });

    this.updatePoints();
  }

  componentDidUpdate() {
    this.updatePoints();
  }

  updatePoints() {
    if (this.props.coords.markers) {
      this.yMap.geoObjects.removeAll();
      this.props.coords.markers.forEach((marker, idx) => {
        const point = new this.api.Placemark(marker.coords, {
          hintContent: `
            <h2>${marker.type === 'school' ? `Школа` : `Детский садик`}</h2>
            <h3>${marker.location}</h3><br>
            <p>${marker.description}</p>`  
        },{
          preset: marker.type === 'school' ? 'islands#darkOrangeDotIcon' : 'islands#redDotIcon'
        });
        this.yMap.geoObjects.add(point);
      });
    }
  }

  render() {
    return <div className="map" ref={this.mapRef} />;
  }
}
