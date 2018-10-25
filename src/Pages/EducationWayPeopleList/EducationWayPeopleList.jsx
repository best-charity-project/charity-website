import React, { Component } from "react";
import "./EducationWayPeopleList.css";
import Menu from "../../Components/Menu/Menu";
import EduWayPeopleFilter from "../../Components/EduWayPeopleFilter/EduWayPeopleFilter";
import EduWayPeopleControlBar from "../../Components/EduWayPeopleControlBar/EduWayPeopleControlBar";
import EduWayPeopleTable from "../../Components/EduWayPeopleTable/EduWayPeopleTable";
import { server } from "../../api";
import axios from "axios";

class EducationWayPeopleList extends Component {
  state = {
    peopleList: []
  };

  async componentDidMount() {
    const {
      data: { persons: peopleList }
    } = await axios({
      method: "get",
      url: `${server}/api/edulist`,
      config: { headers: { "Content-Type": "application/json; charset=UTF-8" } }
    });

    this.setState({ peopleList });
  }
  render() {
    return (
      <div className="main-page-client">
        <Menu name="client-menu" />
        <div className="edu-people-list-page">
          <EduWayPeopleFilter/>
          <div className="column">
            <EduWayPeopleControlBar />
            <EduWayPeopleTable peopleList={this.state.peopleList} />
          </div>
        </div>
      </div>
    );
  }
}

export default EducationWayPeopleList;
