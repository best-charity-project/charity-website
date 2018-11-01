import React, { Component } from "react";
import "./EduWayPeopleFilter.css";
import CharityForm from "./../Common/CharityForm/CharityForm";
import Joi from "joi-browser";
class EduWayPeopleFilter extends CharityForm {
  state = {
    data: {
      diagnose: "",
      name: "",
      region: "",
      district: "",
      city: "",
      microdistrict: "",
      years: ""
    },
    names: [],
    regions: [],
    districts: [],
    cities: [],
    microdistricts: [],
    errors: {}
  };

  schema = {
    diagnose: Joi.string().allow(""),
    name: Joi.string().allow(""),
    region: Joi.string().allow(""),
    district: Joi.string().allow(""),
    city: Joi.string().allow(""),
    microdistrict: Joi.string().allow(""),
    years: Joi.number()
      .integer()
      .min(1900)
      .max(2018)
      .allow("")
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const names = [...new Set(this.props.data.map(obj => obj.name))];
      const adresses = [...new Set(this.props.data.map(obj => obj.location))];

      this.setState({
        names,
        regions: adresses,
        districts: adresses,
        cities: adresses,
        microdistricts: adresses
      });
    }
  }

  doSubmit = () => {
    const {
      data: {
        diagnose: diagnosis,
        name,
        years,
        region,
        district,
        city,
        microdistrict
      }
    } = this.state;
    const { data: peopleList } = this.props;
    const location = [region, district, city, microdistrict]
      .filter(p => p)
      .join(",");

    const result = peopleList.filter((value, index) => {
      return (
        value.diagnosis.includes(diagnosis) &&
        value.name.includes(name) &&
        value.location.includes(location) &&
        value.years.includes(years)
      );
    });

    this.props.onSubmit(result);
  };

  render() {
    const { names, regions, districts, cities, microdistricts } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="edu-people-list-filter">
        {this.renderInput("diagnose", "Диагноз")}
        {this.renderSelect("name", "Ищу", names)}
        {this.renderSelect("region", "Область", regions)}
        {this.renderSelect("district", "Район", districts)}
        {this.renderSelect("city", "Населенный пункт", cities)}
        {this.renderSelect("microdistrict", "Микрорайон", microdistricts)}
        {this.renderInput("years", "Годы поступления")}

        {this.renderButton("Подобрать")}
      </form>
    );
  }
}

export default EduWayPeopleFilter;
