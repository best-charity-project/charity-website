import ymaps from 'ymaps';
import React, { Component } from 'react';
import './map.css';
const labels = [
  { id: "expertise", label: "Опыт обучения детей с особыми образовательными потребностями" },
  { id: "transportation", label: "Подвоз учеников с особыми потребностями" },
  { id: "parking", label: "Парковка" },
  { id: "entrance", label: "Оборудованный вход (пандус, подъемник)" },
  { id: "wc", label: "Туалет" },
  { id: "elevator", label: "Лифт" },
  { id: "relaxRoom", label: "Комната психологической и сенсорной разгрузки" },
];

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

  getSize(size) {
    return size ? `<div>Наполняемость: ${size}</div>` : '';
  }

  getShift(shift) {
    return shift ? `<div>Количество смен: ${shift}</div>` : '';
  }

  getCategory(category, value) {
    if (value) {
      const item = labels.find(item => item.id === category);
      return `<div>${item.label}</div>`;
    } else return "";
  }

  updatePoints() {
    if (this.props.coords.markers) {
      this.yMap.geoObjects.removeAll();
      this.props.coords.markers.forEach((marker, idx) => {
        const point = new this.api.Placemark(marker.coords, {
          hintContent: `
            <h3>${marker.type === 'school' ? `Школа` : `Детский садик`}</h3>
            <h4>${marker.location}</h4>
            <br/>
            <p>${marker.description}</p>
            <br/>
          ` + this.getSize(marker.size)
            + this.getShift(marker.shift)
            + this.getCategory("expertise", marker.expertise)
            + this.getCategory("transportation", marker.transportation)
            + this.getCategory("parking", marker.parking)
            + this.getCategory("entrance", marker.entrance)
            + this.getCategory("wc", marker.wc)
            + this.getCategory("elevator", marker.elevator)
            + this.getCategory("relaxRoom", marker.relaxRoom)
        }, {
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
