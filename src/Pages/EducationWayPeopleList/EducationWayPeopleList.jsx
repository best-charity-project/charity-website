import React, { Component } from "react";
import "./EducationWayPeopleList.css";
import Menu from "../../Components/Menu/Menu";
import EduWayPeopleFilter from "../../Components/EduWayPeopleFilter/EduWayPeopleFilter";
import EduWayPeopleControlBar from "../../Components/EduWayPeopleControlBar/EduWayPeopleControlBar";
import EduWayPeopleTable from "../../Components/EduWayPeopleTable/EduWayPeopleTable";
import { paginate } from "../../Utils/charityPaginate";
import { getPeopleList } from "../../Services/EducationWayPeopleService";
import _ from "lodash";

class EducationWayPeopleList extends Component {
  state = {
    peopleList: [],
    selectedTab: null,
    peopleListTabs: [
      { _id: "allTab", name: "Все" },
      {
        _id: "newTab",
        name: "Новые запросы",
        handleFunction: this.sortByNewRequests
      }
    ],
    pageSize: 10,
    currentPage: 1
  };

  async componentDidMount() {
    const {
      data: { persons: peopleList }
    } = await getPeopleList();
    this.setState({ peopleList, selectedTab: this.state.peopleListTabs[0] });
  }

  sortByNewRequests(peopleList) {
    return _.sortBy(peopleList, 'createdAt').reverse();
  }

  handlePageChange = currentPage => {
    this.setState({ currentPage });
  };

  handleTabSelect = tab => {
    if (tab._id === this.state.selectedTab._id) return;
    this.setState({ selectedTab: tab, currentPage: 1 });
  };

  render() {
    const {
      peopleList,
      currentPage,
      pageSize,
      peopleListTabs,
      selectedTab
    } = this.state;

    const sortedPeopleList =
      selectedTab && selectedTab._id && selectedTab.handleFunction
        ? selectedTab.handleFunction(peopleList)
        : peopleList;

    const currentPeopleList = paginate(sortedPeopleList, currentPage, pageSize);

    return (
      <div className="main-page-client">
        <Menu name="client-menu" />
        <div className="edu-people-list-page">
          <EduWayPeopleFilter />
          <div className="column">
            <EduWayPeopleControlBar
              tabList={peopleListTabs}
              selectedTab={selectedTab}
              onTabSelect={this.handleTabSelect}
              itemsCount={sortedPeopleList.length}
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
