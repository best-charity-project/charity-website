import React, { Component } from "react";
import "./EducationWayPeopleList.css";
import Menu from "../../Components/Menu/Menu";
import EduWayPeopleFilter from "../../Components/EduWayPeopleFilter/EduWayPeopleFilter";
import EduWayPeopleControlBar from "../../Components/EduWayPeopleControlBar/EduWayPeopleControlBar";
import EduWayPeopleTable from "../../Components/EduWayPeopleTable/EduWayPeopleTable";
import { paginate } from "../../Utils/charityPaginate";
import {
  getPeopleList,
  getFakePeopleList
} from "../../Services/EducationWayPeopleService";
import _ from "lodash";

class EducationWayPeopleList extends Component {
  state = {
    initialPeopleList: [],
    searchedPeopleList: [],
    filterFormIsSubmitted: false,
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
      data: { persons: initialPeopleList }
    } = await getFakePeopleList();

    initialPeopleList.forEach(person => {
      person.location = [
        person.region,
        person.district,
        person.city,
        person.microdistrict,
        person.street
      ]
        .filter(p => p)
        .join(", ");
    });
    this.setState({
      initialPeopleList,
      selectedTab: this.state.peopleListTabs[0]
    });
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

  handleFilterSubmit = searchedPeopleList => {
    this.setState({
      searchedPeopleList,
      selectedTab: this.state.peopleListTabs[0],
      currentPage: 1,
      filterFormIsSubmitted: true
    });
  };

  getPagedData = () => {
    const {
      initialPeopleList,
      searchedPeopleList,
      filterFormIsSubmitted,
      currentPage,
      pageSize,
      selectedTab
    } = this.state;

    const peopleList = filterFormIsSubmitted
      ? searchedPeopleList
      : initialPeopleList;

    const sortedData =
      selectedTab && selectedTab._id && selectedTab.handleFunction
        ? selectedTab.handleFunction(peopleList)
        : peopleList;

    const currentData = paginate(sortedData, currentPage, pageSize);

    return { totalCount: sortedData.length, data: currentData };
  };

  render() {
    const {
      initialPeopleList,
      currentPage,
      pageSize,
      peopleListTabs,
      selectedTab
    } = this.state;
    const { totalCount, data: currentPeopleList } = this.getPagedData();

    return (
      <div className="edu-people-list-page">
        <EduWayPeopleFilter
          data={initialPeopleList}
          onSubmit={this.handleFilterSubmit}
        />
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
    );
  }
}

export default EducationWayPeopleList;
