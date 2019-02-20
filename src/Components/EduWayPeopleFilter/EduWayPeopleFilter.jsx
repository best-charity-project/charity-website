import React from "react";
import "./EduWayPeopleFilter.css";
import CharityForm from "./../Common/CharityForm/CharityForm";
import Joi from "joi-browser";
const programs = [
  {name: "Вспомогательная 1 отделение"},
  {name: "Вспомогательная 2 отделение"},
  {name: "Трудности в обучении"},
  {name: "Тяжелые нарушения речи"},
  {name: "Общеобразовательная программа"},
  {name: "Свой вариант"},
]

class EduWayPeopleFilter extends CharityForm {
  state = {
    data: {
      diagnose: "",
      customProgram: "",
      name: "",
      region: "",
      district: "",
      city: "",
      subdistrict: "",
      years: ""
    },
    names: [],
    regions: [],
    districts: [],
    cities: [],
    subdistricts: [],
    yearList: [],
    errors: {}
  };

  schema = {
    diagnose: Joi.string().allow(""),
    customProgram: Joi.string().allow(""),
    name: Joi.string().allow(""),
    region: Joi.string().allow(""),
    district: Joi.string().allow(""),
    city: Joi.string().allow(""),
    subdistrict: Joi.string().allow(""),
    years: Joi.number()
      .integer()
      .allow("")
  };

  locationTypeNames = ["region", "district", "city", "subdistrict"];
  locationTypeListNames = ["regions", "districts", "cities", "subdistricts"];

  componentDidUpdate(prevProps) {
    if (this.props.data === prevProps.data) {
      return;
    }

    this.setState({
      names: [...new Set(this.props.data.map(obj => obj.contactPerson))]
        .sort()
        .map(name => ({ name })),
      regions: this.getAddressesByLocationType(),
      yearList: this.genearateYearList()
    });
  }

  genearateYearList(startYear, ageLimit = 18) {
    const currentYear = new Date().getFullYear();
    const defaultStartYear = currentYear - ageLimit;
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
      subdistrict: { name: obj.subdistrict }
    };

    const { region, district, city, subdistrict } = newObj;
    city.subdistricts = subdistrict.name ? [subdistrict] : [];
    district.cities = [city];
    region.districts = [district];

    return optionalProperty ? newObj[optionalProperty] : region;
  }

  getIndexOfLocationType(tempDataList, locationData) {
    return tempDataList.findIndex(tempData => tempData.name === locationData);
  }

  structureLocationData(locationList, personData, initialIndex = 0) {
    const type = personData[this.locationTypeNames[initialIndex]];
    if (!type) return;

    const currentIndex = this.getIndexOfLocationType(locationList, type);

    if (currentIndex === -1) {
      locationList.push(
        this.makeNewAddress(personData, this.locationTypeNames[initialIndex])
      );
    } else {
      const nextIndex = initialIndex + 1;
      const nextLocationList =
        locationList[currentIndex][this.locationTypeListNames[nextIndex]];

      this.structureLocationData(nextLocationList, personData, nextIndex);
    }
  }

  getAddressesByLocationType() {
    const addresses = [];

    this.props.data.forEach(obj => {
      this.structureLocationData(addresses, obj.location);
    });

    return addresses;
  }

  rerenderSelectData(
    locationData = this.state.regions,
    indexOfLocationType = 0
  ) {
    const { data } = this.state;
    const indexOfLocationTypeList = indexOfLocationType + 1;

    const locationTypeName = this.locationTypeNames[indexOfLocationType];
    const locationTypeListName = this.locationTypeListNames[
      indexOfLocationTypeList
    ];
    if (!data[locationTypeName]) return;

    const searchedLocation = locationData.find(
      location => location.name === data[locationTypeName]
    );
    if (locationTypeListName && searchedLocation[locationTypeListName].length) {
      this.setState({
        [locationTypeListName]: searchedLocation[locationTypeListName]
      });
      this.rerenderSelectData(
        searchedLocation[locationTypeListName],
        indexOfLocationTypeList
      );
    }
  }

  updateLocationData(currentLocationNameIndex) {
    const { data } = this.state;
    const tempData = { ...data };
    const tempClearedLocationData = {};

    for (
      let i = currentLocationNameIndex + 1;
      i < this.locationTypeNames.length;
      i++
    ) {
      const tempLocationName = this.locationTypeNames[i];
      const tempLocationListName = this.locationTypeListNames[i];
      tempData[tempLocationName] = "";
      tempClearedLocationData[tempLocationListName] = [];
    }

    this.setState(
      { data: tempData, ...tempClearedLocationData },
      this.rerenderSelectData
    );
  }

  handleSelect(propName) {
    const currentLocationNameIndex = this.locationTypeNames.indexOf(propName);

    if (
      currentLocationNameIndex === this.locationTypeNames.length - 1 ||
      currentLocationNameIndex === -1
    ) {
      this.rerenderSelectData();
    } else {
      this.updateLocationData(currentLocationNameIndex);
    }
  }

  doSubmit() {
    const diagnosis = this.state.data.diagnose === "Свой вариант" ? this.state.data.customProgram : this.state.data.diagnose;
    
    const {
      data: {
        name,
        years,
        region,
        district,
        city,
        subdistrict
      }
    } = this.state;
    const { data: peopleList } = this.props;

    const result = peopleList.filter(value => {
      const yearStart = Number(value.yearStart);
      const yearEnd = value.yearEnd ? Number(value.yearEnd) : null;
      const currentYear = years ? Number(years) : null;
      const yearFilter = yearEnd ? (currentYear <= yearEnd && currentYear >= yearStart) : (currentYear >= yearStart);

      return (
        value.diagnosis.toLowerCase().includes(diagnosis.toLowerCase()) &&
        value.contactPerson.includes(name) &&
        value.location.region.includes(region) &&
        value.location.district.includes(district) &&
        value.location.city.includes(city) &&
        value.location.subdistrict.includes(subdistrict) &&
        (currentYear ? yearFilter : true)
      );
    });

    this.props.onSubmit(result);
  }

  showAdditionalInput() {
    if (this.state.data.diagnose !== "Свой вариант") return;
    return this.renderInput("customProgram", "Введите программу")
  }

  render() {
    const {
      names,
      regions,
      districts,
      cities,
      subdistricts,
      yearList,
      data
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="edu-people-list-filter">
        {this.renderSelect("diagnose", "Программа", programs)}
        {this.showAdditionalInput()}
        {this.renderSelect("name", "Ищу", names)}
        {this.renderSelect("region", "Область", regions)}
        {this.renderSelect("district", "Район", districts, !data.region)}
        {this.renderSelect("city", "Населенный пункт", cities, !data.district)}
        {this.renderSelect(
          "subdistrict",
          "Район города",
          subdistricts,
          !data.city || !subdistricts.length
        )}
        {this.renderSelect("years", "Годы поступления", yearList)}

        {this.renderButton("Подобрать")}
      </form>
    );
  }
}

export default EduWayPeopleFilter;
