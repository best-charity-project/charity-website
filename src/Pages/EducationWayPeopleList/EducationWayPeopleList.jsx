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
    return _.sortBy(peopleList, "createdAt").reverse();
  }

  handlePageChange = currentPage => {
    this.setState({ currentPage });
  };

  handleTabSelect = tab => {
    if (tab._id === this.state.selectedTab._id) return;
    this.setState({ selectedTab: tab, currentPage: 1 });
  };

  getPagedData = () => {
    const { peopleList, currentPage, pageSize, selectedTab } = this.state;

    const sortedData =
      selectedTab && selectedTab._id && selectedTab.handleFunction
        ? selectedTab.handleFunction(peopleList)
        : peopleList;

    const currentData = paginate(sortedData, currentPage, pageSize);

    return { totalCount: sortedData.length, data: currentData };
  };

  render() {
    const { peopleList, currentPage, pageSize, peopleListTabs, selectedTab } = this.state;
    const { totalCount, data: currentPeopleList } = this.getPagedData();

    return (
      <div className="main-page-client">
        <Menu name="client-menu" />
        <div className="edu-people-list-page">
          <EduWayPeopleFilter data={peopleList}/>
          <div className="column">
            <EduWayPeopleControlBar
              tabList={peopleListTabs}
              selectedTab={selectedTab}
              onTabSelect={this.handleTabSelect}
              itemsCount={totalCount}
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
