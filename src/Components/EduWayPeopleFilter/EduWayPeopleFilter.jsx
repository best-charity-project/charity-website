import React from "react";
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
      .allow("")
  };

  locationTypeNames = ["region", "district", "city", "microdistrict"];
  locationTypeListNames = ["regions", "districts", "cities", "microdistricts"];

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
      this.structureLocationData(addresses, obj);
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
        value.diagnosis.toLowerCase().includes(diagnosis.toLowerCase()) &&
        value.contactPerson.includes(name) &&
        value.region.includes(region) &&
        value.district.includes(district) &&
        value.city.includes(city) &&
        value.microdistrict.includes(microdistrict) &&
        value.years.toString().includes(years)
      );
    });

    this.props.onSubmit(result);
  }

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
