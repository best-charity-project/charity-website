import React, { Component } from "react";
import "./EducationWayPeopleList.css";
import Menu from "../../Components/Menu/Menu";
import EduWayPeopleFilter from "../../Components/EduWayPeopleFilter/EduWayPeopleFilter";
import EduWayPeopleControlBar from "../../Components/EduWayPeopleControlBar/EduWayPeopleControlBar";
import EduWayPeopleTable from "../../Components/EduWayPeopleTable/EduWayPeopleTable";
import { paginate } from "../../Utils/charityPaginate";
import { getPeopleList } from "../../Services/EducationWayPeopleService";

class EducationWayPeopleList extends Component {
  state = {
    peopleList: [],
    pageSize: 10,
    currentPage: 0
  };

  async componentDidMount() {
    const {
      data: { persons: peopleList }
    } = await getPeopleList();
    this.setState({ peopleList });
    this.handlePageChange(1);
  }

  handlePageChange = currentPage => {
    this.setState({ currentPage });
  };

  render() {
    const { peopleList, currentPage, pageSize } = this.state;
    const currentPeopleList = paginate(peopleList, currentPage, pageSize);

    return (
      <div className="main-page-client">
        <Menu name="client-menu" />
        <div className="edu-people-list-page">
          <EduWayPeopleFilter />
          <div className="column">
            <EduWayPeopleControlBar
              itemsCount={peopleList.length}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
            <EduWayPeopleTable peopleList={currentPeopleList} />
          </div>
        </div>
      </div>
    );
  }
}

export default EducationWayPeopleList;
