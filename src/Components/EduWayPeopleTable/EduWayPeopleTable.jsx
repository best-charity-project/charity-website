import React, { Component } from "react";
import "./EduWayPeopleTable.css";

class EduWayPeopleTable extends Component {
  // id: 1,
  // diagnosis: "Аутизм",
  // name: "Александра",
  // contactPerson: "Александра Константиновна",
  // contacts: "+375 (44) 123 - 45 - 67 aleksandra.konstantinovna@gmail.com",
  // location: "г. Минск, Первомайский р-н, ул.  академика Купревича",
  // years: "2018 - 2019",
  // isPublic: true,
  // createdAt: "2018-10-24T14:49:14.046Z",
  // updatedAt: "2018-10-24T14:49:14.046Z"
  render() {
    const { peopleList } = this.props;
    return (
      <div className="edu-way-people-table">
        <div className="edu-way-people-row edu-way-header">
          <div className="edu-way-people-column diagnose-column">Диагноз</div>
          <div className="edu-way-people-column name-of-child-column">
            Имя ребенка
          </div>
          <div className="edu-way-people-column contact-person-column">
            Контактное лицо
          </div>
          <div className="edu-way-people-column contacts-column">Контакты</div>
          <div className="edu-way-people-column address-column">
            Адрес (без дома и кв)
          </div>
          <div className="edu-way-people-column years-column">
            <span>Годы</span>
            <span style={{ fontWeight: "normal" }}>(поступления)</span>
          </div>
        </div>
        {peopleList.map(person => (
          <div className="edu-way-people-row" key={person.id}>
            <div className="edu-way-people-column diagnose-column">
              {person.diagnosis}
            </div>
            <div className="edu-way-people-column name-of-child-column">
              {person.name}
            </div>
            <div className="edu-way-people-column contact-person-column">
              {person.contactPerson}
            </div>
            <div className="edu-way-people-column contacts-column">
              {person.contacts}
            </div>
            <div className="edu-way-people-column address-column">
              {person.location}
            </div>
            <div className="edu-way-people-column years-column">
              {person.years}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default EduWayPeopleTable;
