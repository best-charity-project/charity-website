import React, { Component } from "react";
import "./EduWayPeopleFilter.css";
import CharityForm from "./../Common/CharityForm/CharityForm";
import Joi from "joi-browser";
class EduWayPeopleFilter extends CharityForm {
  columns = [
    {
      className: "diagnose-column",
      propertyName: "diagnosis",
      label: "Диагноз"
    },
    {
      className: "name-of-child-column",
      propertyName: "name",
      label: "Имя ребенка"
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
    diagnose: Joi.string(),
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

  componentDidMount() {
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

  doSubmit = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="edu-people-list-filter">
        {this.renderInput("diagnose", "Диагноз")}
        {this.renderInput("name", "Ищу")}
        {this.renderInput("region", "Область")}
        {this.renderInput("district", "Район")}
        {this.renderInput("city", "Населенный пункт")}
        {this.renderInput("microdistrict", "Микрорайон")}
        {this.renderInput("years", "Годы поступления")}

        {this.renderButton("Подобрать")}
      </form>
    );
  }
}

export default EduWayPeopleFilter;
