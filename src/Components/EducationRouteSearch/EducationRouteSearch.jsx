import React from 'react';
import { getLocations, filterEducationalRoutes } from '../../educationCalls';
import ResultsTable from './ResultsTable';
import programs from '../EducationRoute/programs.json';
import InputField from '../InputField/InputField';
import './EducationRouteSearch.css';

class EducationRouteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      regionIndex: 'Регион проживания',
      educationalInstitution: '',
      regionDistricts: '',
      firstYear: '',
      lastYear: '',
      program: '',
      filterResult: null,
      isOpenTable: false,
    };
    this.setRegion = this.setRegion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showTable = this.showTable.bind(this);
  }

  componentDidMount() {
    this.setCategories();
  }

  setCategories() {
    getLocations().then((locations) => {
      this.setState({ locations });
    });
  }

  setRegion(event) {
    this.setState({
      regionIndex: event.target.value,
    });
  }

  getRegion() {
    return this.state.locations[this.state.regionIndex] || {};
  }

  handleFieldChange(value, event) {
    const fieldData = this.state;
    fieldData[event.target.id] = event.target.value;
    this.setState({ fieldData });
  }

  handleSubmit(event) {
    event.preventDefault();
    filterEducationalRoutes(
      this.getRegion().name,
      this.state.regionDistricts,
      this.state.educationalInstitution,
      this.state.firstYear,
      this.state.lastYear,
      this.state.program,
    ).then(filterResult => this.setState({ filterResult }));
    this.showTable();
  }

  showTable() {
    this.setState({ isOpenTable: true });
  }

  render() {
    const regions = this.getRegion().districts || [];
    return (
      <div className='education-route'>
        <div className='education-route--filter'>
          <h2 className='secondary-heading'>Поиск по образовательному маршруту</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='filter--box'>
              <select
                id='region'
                className='form--field field-medium'
                onChange={this.setRegion}
                value={this.state.regionIndex}
                required
              >
                <option value='Регион проживания' disabled selected>
                  Регион проживания
                </option>
                {this.state.locations.map((region, index) => (
                  <option key={region.name} value={index}>
                    {region.name}
                  </option>
                ))}
              </select>
              <select
                id='regionDistricts'
                className='form--field field-medium'
                onChange={(event, id) => this.handleFieldChange(id, event)}
                value={this.state.regionDistricts}
                required
              >
                <option value='' disabled selected>
                  Район
                </option>
                {regions.map(region => (
                  <option key={region} title={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                id='educationalInstitution'
                onChange={(event, id) => this.handleFieldChange(id, event)}
                value={this.state.educationalInstitution}
                className='form--field field-medium'
                required
              >
                <option value='' disabled selected>
                  Учреждение образования
                </option>
                <option>Дошкольное детское учреждение</option>
                <option>Средняя школа</option>
              </select>
              <select
                id='program'
                className='form--field field-medium'
                onChange={(event, id) => this.handleFieldChange(id, event)}
                value={this.state.program}
              >
                <option value='' disabled selected>
                  Программа образования
                </option>
                {programs.map(program => <option key={program}>{program}</option>)}
              </select>
              <label htmlFor='first-year' className='form--filter-label'>
                c
              </label>
              <InputField
                id='firstYear'
                size='narrow'
                value={this.state.firstYear}
                onChange={(value, event) => this.handleFieldChange(value, event)}
                type='number'
                placeholder='20__'
                min='2018'
                max='2100'
                required
              />
              <label htmlFor='last-year' className='form--filter-label'>
                по
              </label>
              <InputField
                id='lastYear'
                size='narrow'
                value={this.state.lastYear}
                onChange={(value, event) => this.handleFieldChange(value, event)}
                type='number'
                placeholder='20__'
                min='2018'
                max='2100'
                required
              />
            </div>
            <input type='submit' className='control-button control-button-primary' value='Искать' />
          </form>
        </div>
        <table className='education-route--results-table'>
          {this.state.isOpenTable &&
            this.state.filterResult &&
            this.state.filterResult.length > 0 && (
              <thead className='results-table--header'>
                <tr className='header-row'>
                  <th className='row--field'>Контактная информация</th>
                  <th className='row--field'>Адрес</th>
                  <th className='row--field'>Год обучения</th>
                  <th className='row--field'>Учреждение образования</th>
                  <th className='row--field'>Программа образования</th>
                </tr>
              </thead>
            )}
          <tbody className='results-table--results-body'>
            {this.state.filterResult &&
              this.state.filterResult.map((item, index) => (
                <ResultsTable index={index} key={item._id} {...item} />
              ))}
          </tbody>
        </table>
        {this.state.filterResult &&
          this.state.filterResult.length === 0 && (
            <p className='educational-route--message'>По данному запросу ничего не найдено</p>
          )}
      </div>
    );
  }
}

export default EducationRouteSearch;
