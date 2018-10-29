import React, { Component } from 'react';
import './EduWayPeopleTable.css';
import TableHeader from '../TableHeader/TableHeader';
import TableBody from '../TableBody/TableBody';

class EduWayPeopleTable extends Component {
  columns = [
    {className: 'diagnose-column', propertyName: 'diagnosis',  label: 'Диагноз'},
    {className: 'name-of-child-column', propertyName: 'name', label: 'Имя ребенка'},
    {className: 'contact-person-column', propertyName: 'contactPerson', label: 'Контактное лицо'},
    {className: 'contacts-column', propertyName: 'contacts', label: 'Контакты'},
    {className: 'address-column', propertyName: 'location', label: 'Адрес (без дома и кв)'},
    {className: 'years-column', propertyName: 'years', label: 'Годы (поступления)'}
  ]
  render() {
    const { peopleList } = this.props;
    return (
      <div className="edu-way-people-table">
        <TableHeader headerClassName="edu-way-people-row edu-way-header"
        columnsClassName="edu-way-people-column"
        columns={this.columns}/>
        <TableBody bodyClassName="edu-way-people-row edu-way-body"
        columnsClassName="edu-way-people-column" 
        columns={this.columns}
        items={peopleList}/>
      </div>
    );
  }
}

export default EduWayPeopleTable;
