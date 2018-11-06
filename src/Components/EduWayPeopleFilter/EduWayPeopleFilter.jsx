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

  blapow(array, obj, initialIndex, proplist, propsList) {
    const type = obj[proplist[initialIndex]];
    const currentIndex = this.getIndexOfLocationType(array, type);
    if (currentIndex === -1) {
      array.push(this.makeNewAddress(obj, proplist[initialIndex]));
    } else {
      const aa =  array[currentIndex];
      const bb = aa[proplist[initialIndex+1]];
      const nextArray = bb;
      this.blapow(nextArray, obj, initialIndex+1, proplist);
    }
  }

  getAddressesByLocationType() {
    const addresses = [];
    const locationTypes = ['region', 'district', 'city', 'microdistrict'];
    const locationTypess = ['regions', 'districts', 'cities', 'microdistricts'];
    this.props.data.forEach(obj => {
      // const { region, district, city, microdistrict } = obj;

      this.blapow(addresses, obj, 0, locationTypes, locationTypess);

      // const indexOfRegion = this.getIndexOfLocationType(addresses, region);

      // if (indexOfRegion === -1) {
      //   addresses.push(this.makeNewAddress(obj));
      // } else {
      //   const districts = addresses[indexOfRegion].districts;
      //   const indexOfDistrict = this.getIndexOfLocationType(
      //     districts,
      //     district
      //   );

      //   if (indexOfDistrict === -1) {
      //     districts.push(this.makeNewAddress(obj, "district"));
      //   } else {
      //     const cities = districts[indexOfDistrict].cities;
      //     const indexOfCity = this.getIndexOfLocationType(cities, city);

      //     if (indexOfCity === -1) {
      //       cities.push(this.makeNewAddress(obj, "city"));
      //     } else {
      //       const microdistricts = cities[indexOfCity].microdistricts;
      //       const indexOfMicrodistrict = this.getIndexOfLocationType(
      //         microdistricts,
      //         microdistrict
      //       );

      //       if (indexOfMicrodistrict === -1 && obj.microdistrict) {
      //         microdistricts.push(this.makeNewAddress(obj, "microdistrict"));
      //       }
      //     }
      //   }
      // }
    });

    debugger;

    return addresses;
  }

  componentDidUpdate(prevProps) {
    if (this.props.data === prevProps.data) {
      return;
    }

    const names = [...new Set(this.props.data.map(obj => obj.contactPerson))]
      .sort()
      .map(name => ({ name }));

    this.setState({
      names,
      regions: this.getAddressesByLocationType()
    });
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
        {this.renderInput("years", "Годы поступления")}

        {this.renderButton("Подобрать")}
      </form>
    );
  }
}

export default EduWayPeopleFilter;
