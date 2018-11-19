import React, { Component } from "react";
import "../../Components/Menu/Menu.css";
import "./Events.css";
import EventsListAnsAside from "../../Components/EventsListAndAside/EventsListAndAside";
class Events extends Component {
  state = {
    events: {}
  };
  render() {
    return <EventsListAnsAside />;
  }
}

export default Events;
