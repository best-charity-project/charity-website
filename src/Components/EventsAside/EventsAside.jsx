import React, { Component } from "react";
import "./EventsAside.css";

class EventsAside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      filters: []
    };
  }
  componentDidMount() {
    this.setState({ activeItem: "все", filters: this.props.filters });
  }
  getCurrentFilter = e => {
    let currentFilter = e.target;
    this.setState({ activeItem: currentFilter.innerText.toLowerCase() }, () => {
      this.props.getCurrentFilter(this.state.activeItem);
    });
  };
  render() {
    const { activeItem } = this.state;
    return (
      <div className="events-aside ">
        <ul
          className={"link-news " + this.props.name}
          onClick={this.getCurrentFilter}
        >
          {this.props.filters.map((el, index) => (
            <li className={activeItem === el.title ? "active-link-news" : null} key={el.title + index}>
              {el.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EventsAside;
