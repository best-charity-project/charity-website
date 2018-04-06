import React from 'react';
import { getLocations, filterEducationalRoutes } from '../../educationCalls';
import ResultsTable from './ResultsTable';
import programs from '../EducationRoute/programs.json';
import './EducationRouteSearch.css';

class EducationRouteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      region: '',
      regionIndex: 'Регион проживания',
      educationalInstitution: '',
      regionDistricts: '',
      firstYear: '',
      lastYear: '',
      program: '',
      filterResult: null,
      isOpenTable: false,
    };
    this.setCategories = this.setCategories.bind(this);
    this.setRegion = this.setRegion.bind(this);
    this.handleRegionDistricts = this.handleRegionDistricts.bind(this);
    this.handleEducation = this.handleEducation.bind(this);
    this.handleFirstYear = this.handleFirstYear.bind(this);
    this.handleLastTear = this.handleLastTear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProgram = this.handleProgram.bind(this);
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
    this.setState({ regionIndex: event.target.value });
    this.setState({ region: this.state.locations[event.target.value].name });
  }

  handleRegionDistricts(event) {
    this.setState({ regionDistricts: event.target.value });
  }

  handleEducation(event) {
    this.setState({ educationalInstitution: event.target.value });
  }

  handleFirstYear(event) {
    this.setState({ firstYear: event.target.value });
  }

  handleLastTear(event) {
    this.setState({ lastYear: event.target.value });
  }

  handleProgram(event) {
    this.setState({ program: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    filterEducationalRoutes(
      encodeURIComponent(this.state.region),
      encodeURIComponent(this.state.regionDistricts),
      encodeURIComponent(this.state.educationalInstitution),
      this.state.firstYear,
      this.state.lastYear,
      encodeURIComponent(this.state.program),
    ).then(filterResult => this.setState({ filterResult }));
    this.showTable();
  }

  showTable() {
    this.setState({ isOpenTable: true });
  }

  render() {
    const districts = (this.state.locations[this.state.regionIndex] || {}).districts || [];
    return (
      <div className='education-route'>
        <div className='education-route--filter'>
          <h2 className='secondary-heading'>Поиск по образовательному маршруту</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='filter--box'>
              <select
                id='region'
                className='form--field field--wide'
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
                className='form--field field--wide'
                onChange={this.handleRegionDistricts}
                value={this.state.regionDistricts}
                required
              >
                <option value='' disabled selected>
                  Район
                </option>
                {districts.map(district => (
                  <option key={district} title={district}>
                    {district}
                  </option>
                ))}
              </select>
              <select
                id='edicationalInstitution'
                onChange={this.handleEducation}
                value={this.state.educationalInstitution}
                className='form--field field--wide'
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
                className='form--field field--wide'
                onChange={this.handleProgram}
                value={this.state.program}
              >
                <option value='' disabled selected>
                  Программа образования
                </option>
                {programs.map(program => <option key={program}>{program}</option>)}
              </select>
              <p>
                <label htmlFor='first-year' className='form--filter-label'>
                  c
                </label>
                <input
                  id='first-year'
                  value={this.state.firstYear}
                  onChange={this.handleFirstYear}
                  type='number'
                  className='form--field field--narrow'
                  placeholder='20__'
                  min='2018'
                  max='2100'
                  required
                />
                <label htmlFor='last-year'>по</label>
                <input
                  id='last-year'
                  value={this.state.lastYear}
                  onChange={this.handleLastTear}
                  type='number'
                  className='form--field field--narrow'
                  placeholder='20__'
                  min='2018'
                  max='2100'
                  required
                />
              </p>
            </div>
            <input type='submit' className='control-button control-button--blue' value='Искать' />
          </form>
        </div>
        <table className='education-route--table'>
          {this.state.isOpenTable &&
            this.state.filterResult &&
            this.state.filterResult.length > 0 && (
              <thead>
                <tr className='table--header'>
                  <th className='header--field'>Контактная информация</th>
                  <th className='header--field'>Адрес</th>
                  <th className='header--field'>Год обучения</th>
                  <th className='header--field'>Учреждение образования</th>
                  <th className='header--field'>Программа образования</th>
                </tr>
              </thead>
            )}
          <tbody>
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
