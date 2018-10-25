import React, { Component } from "react";
import "./EduWayPeopleControlBar.css";

class EduWayPeopleControlBar extends Component {
  state = {};
  render() {
    return (
        <div className="edu-way-people-bar">
          <div className="edu-way-bar-column">
            <button className="edu-way-bar-btn btn-all">Все</button>
            <button className="edu-way-bar-btn btn-new">Новые запросы</button>
          </div>
          <div className="edu-way-bar-column second">
            <div className="edu-way-bar-row">
                <span className="edu-way-bar-text">Вы находитесь на <span>1</span> странице из 100</span>
            </div>
            <div className="edu-way-bar-row">
                <button className="edu-way-bar-btn btn-arrow edu-way-bar-btn-left">
                <div className="arrow-wrapper">
                    <div className="arrow-divider"></div>
                </div>
                </button>
                <button className="edu-way-bar-btn btn-arrow edu-way-bar-btn-right">
                <div className="arrow-wrapper">
                    <div className="arrow-divider"></div>
                </div>
                </button>
            </div>
          </div>
        </div>
    );
  }
}

export default EduWayPeopleControlBar;
