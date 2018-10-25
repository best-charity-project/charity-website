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
    peopleList: [],
    currentPeopleList: [],
    page: 1,
    pageSize: 10,
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
    this.setState({
      currentPeopleList: this.state.peopleList.slice(
        this.state.page - 1,
        this.state.pageSize
      )
    });
  }

  handlePageChange = page => {
      console.log(page);
  }

  render() {
    return (
      <div className="main-page-client">
        <Menu name="client-menu" />
        <div className="edu-people-list-page">
          <EduWayPeopleFilter />
          <div className="column">
            <EduWayPeopleControlBar
              itemsCount={this.state.peopleList.length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
            />
            <EduWayPeopleTable peopleList={this.state.currentPeopleList} />
          </div>
        </div>
      </div>
    );
  }
}

export default EducationWayPeopleList;
