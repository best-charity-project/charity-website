import React, { Component } from "react";
import "./EduWayPeopleFilter.css";
import CharityInput from "./../Common/CharityInput/CharityInput";
import Joi from "joi-browser";
class EduWayPeopleFilter extends Component {
  state = {
    filterForm: {
      diagnose: undefined,
      name: undefined,
      region: undefined,
      district: undefined,
      city: undefined,
      microdistrict: undefined,
      years: undefined
    },
    errors: {}
  };

  schema = {
    diagnose: Joi.string().required(),
    name: Joi.string(),
    region: Joi.string(),
    district: Joi.string(),
    city: Joi.string(),
    microdistrict: Joi.string(),
    years: Joi.number()
      .integer()
      .min(1900)
      .max(2018)
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.filterForm, this.schema, options);

    if (!error) {
      return null;
    }

    const errors = {};

    error.details.forEach(error => {
      errors[error.path[0]] = error.message;
    });

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const filterForm = { ...this.state.filterForm };
    filterForm[input.name] = input.value;
    this.setState({ filterForm, errors });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("Submitted");
  };
  render() {
    const { filterForm, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="edu-people-list-filter">
        <CharityInput
          name="diagnose"
          value={filterForm.diagnose}
          label="Диагноз"
          onChange={this.handleChange}
          error={errors.diagnose}
        />
        <CharityInput
          name="name"
          value={filterForm.name}
          label="Ищу"
          onChange={this.handleChange}
          error={errors.name}
        />
        <CharityInput
          name="region"
          value={filterForm.region}
          label="Область"
          onChange={this.handleChange}
          error={errors.region}
        />
        <CharityInput
          name="district"
          value={filterForm.district}
          label="Район"
          onChange={this.handleChange}
          error={errors.district}
        />
        <CharityInput
          name="city"
          value={filterForm.city}
          label="Населенный пункт"
          onChange={this.handleChange}
          error={errors.city}
        />
        <CharityInput
          name="microdistrict"
          value={filterForm.microdistrict}
          label="Микрорайон"
          onChange={this.handleChange}
          error={errors.microdistrict}
        />
        <CharityInput
          name="years"
          value={filterForm.years}
          label="Годы поступления"
          onChange={this.handleChange}
          error={errors.years}
        />

        <button  disabled={this.validate()} className="edu-people-list-btn">Подобрать</button>
      </form>
    );
  }
}

export default EduWayPeopleFilter;
