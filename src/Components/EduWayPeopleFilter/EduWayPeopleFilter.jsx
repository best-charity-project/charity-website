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
    yearList: [],
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

  ageLimit = 18;

  componentDidUpdate(prevProps) {
    if (this.props.data === prevProps.data) {
      return;
    }

    const names = [...new Set(this.props.data.map(obj => obj.contactPerson))]
      .sort()
      .map(name => ({ name }));

    const yearList = this.genearateYearList();

    this.setState({
      names,
      regions: this.getAddressesByLocationType(),
      yearList
    });
  }

  genearateYearList(startYear) {
    const currentYear = new Date().getFullYear();
    const defaultStartYear = new Date().getFullYear() - this.ageLimit;
    const years = [];
    startYear = startYear || defaultStartYear;

    while (startYear <= currentYear) {
      years.push({ name: startYear++ });
    }

    return years;
  }

  makeNewAddress(obj, optionalProperty) {
    const newObj = {
      region: { name: obj.region },
      district: { name: obj.district },
      city: { name: obj.city },
      microdistrict: { name: obj.microdistrict }
    };
    const { region, district, city, microdistrict } = newObj;
    city.microdistricts = microdistrict.name ? [microdistrict] : [];
    district.cities = [city];
    region.districts = [district];

    return optionalProperty ? newObj[optionalProperty] : region;
  }

  getIndexOfLocationType(tempDataList, locationData) {
    return tempDataList.findIndex(tempData => tempData.name === locationData);
  }

  structureLocationData(
    array,
    obj,
    initialIndex,
    locationTypeNames,
    locationTypeListNames
  ) {
    const type = obj[locationTypeNames[initialIndex]];
    if (!type) return;

    const currentIndex = this.getIndexOfLocationType(array, type);
    if (currentIndex === -1) {
      array.push(this.makeNewAddress(obj, locationTypeNames[initialIndex]));
    } else {
      const nextArray =
        array[currentIndex][locationTypeListNames[initialIndex + 1]];
      this.structureLocationData(
        nextArray,
        obj,
        initialIndex + 1,
        locationTypeNames,
        locationTypeListNames
      );
    }
  }

  getAddressesByLocationType() {
    const addresses = [];
    const locationTypeNames = ["region", "district", "city", "microdistrict"];
    const locationTypeListNames = [
      "regions",
      "districts",
      "cities",
      "microdistricts"
    ];
    this.props.data.forEach(obj => {
      this.structureLocationData(
        addresses,
        obj,
        0,
        locationTypeNames,
        locationTypeListNames
      );
    });

    return addresses;
  }

  rerender = () => {
    const { regions, data } = this.state;

    if (data.region) {
      const searchedRegion = regions.find(
        region => region.name === data.region
      );
      if (searchedRegion.districts.length) {
        this.setState({ districts: searchedRegion.districts });
      }
      if (data.district) {
        const searchedDistrict = searchedRegion.districts.find(
          district => district.name === data.district
        );

        if (searchedDistrict.cities.length) {
          this.setState({ cities: searchedDistrict.cities });
        }

        if (data.city) {
          const searchedCity = searchedDistrict.cities.find(
            city => city.name === data.city
          );

          if (searchedCity.microdistricts.length) {
            console.log(searchedCity.microdistricts);
            this.setState({ microdistricts: searchedCity.microdistricts });
          }
        }
      }
    }
  };

  handleSelect = propName => {
    const { data } = this.state;
    const tempData = { ...data };
    if (propName === "region") {
      tempData.district = "";
      tempData.city = "";
      tempData.microdistrict = "";
      this.setState(
        { data: tempData, districts: [], cities: [], microdistricts: [] },
        this.rerender
      );
    } else if (propName === "district") {
      tempData.city = "";
      tempData.microdistrict = "";
      this.setState(
        { data: tempData, cities: [], microdistricts: [] },
        this.rerender
      );
    } else if (propName === "city") {
      tempData.microdistrict = "";

      this.setState({ data: tempData, microdistricts: [] }, this.rerender);
    } else {
      this.rerender();
    }
  };

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

    const result = peopleList.filter((value, index) => {
      return (
        value.diagnosis.includes(diagnosis) &&
        value.contactPerson.includes(name) &&
        value.region.includes(region) &&
        value.district.includes(district) &&
        value.city.includes(city) &&
        value.microdistrict.includes(microdistrict) &&
        value.years.toString().includes(years)
      );
    });

    this.props.onSubmit(result);
  };

  render() {
    const {
      names,
      regions,
      districts,
      cities,
      microdistricts,
      yearList,
      data
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="edu-people-list-filter">
        {this.renderInput("diagnose", "Диагноз")}
        {this.renderSelect("name", "Ищу", names)}
        {this.renderSelect("region", "Область", regions)}
        {this.renderSelect("district", "Район", districts, !data.region)}
        {this.renderSelect("city", "Населенный пункт", cities, !data.district)}
        {this.renderSelect(
          "microdistrict",
          "Микрорайон",
          microdistricts,
          !data.city || !microdistricts.length
        )}
        {this.renderSelect("years", "Годы поступления", yearList)}

        {this.renderButton("Подобрать")}
      </form>
    );
  }
}

export default EduWayPeopleFilter;
