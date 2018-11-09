import React, { Component } from "react";
import "./EduWayPeopleTable.css";
import CharityTable from "../Common/CharityTable/CharityTable";
import CharityNotFoundData from "../Common/CharityNotFoundData/CharityNotFoundData";
import { Link } from 'react-router-dom';

class EduWayPeopleTable extends Component {
  columns = [
    {
      className: "diagnose-column",
      propertyName: "diagnosis",
      label: "Диагноз"
    },
    {
      className: "contact-person-column",
      propertyName: "contactPerson",
      label: "Контактное лицо"
    },
    {
      className: "contacts-column",
      propertyName: "contacts",
      label: "Контакты"
    },
    {
      className: "address-column",
      propertyName: "location",
      label: "Адрес (без дома и кв)"
    },
    {
      className: "years-column",
      propertyName: "years",
      label: "Годы (поступления)"
    }
  ];

  linkToRegistrationCurrentUser = '/education-way-people-list-registration';
  render() {
    const { peopleList } = this.props;
    return (
      <React.Fragment>
        <button className="edu-way-people-add"><Link to={this.linkToRegistrationCurrentUser}>Добавиться в список</Link></button>
        {peopleList.length ? (
          <CharityTable
            tableClassName="edu-way-people-table"
            headerClassName="edu-way-people-row edu-way-header"
            bodyClassName="edu-way-people-row edu-way-body"
            columnsClassName="edu-way-people-column"
            columns={this.columns}
            items={peopleList}
          />
        ) : (
          <CharityNotFoundData />
        )}
      </React.Fragment>
    );
  }
}

export default EduWayPeopleTable;
