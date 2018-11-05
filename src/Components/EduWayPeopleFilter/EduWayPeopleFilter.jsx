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

  addressPropLinkToNext = {
    region: "districts",
    district: "cities",
    city: "microdistricts"
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

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const names = [
        ...new Set(this.props.data.map(obj => ({ name: obj.name })))
      ];

      const addresses = [];

      this.props.data.forEach(obj => {
        const indexOfRegion = addresses.findIndex(
          region => region.name === obj.region
        );

        if (indexOfRegion === -1) {
          addresses.push(this.makeNewAddress(obj));
        } else {
          const indexOfDistrict = addresses[indexOfRegion].districts.findIndex(
            district => district.name === obj.district
          );
          if (indexOfDistrict === -1) {
            addresses[indexOfRegion].districts.push(
              this.makeNewAddress(obj, "district")
            );
          } else {
            const indexOfCity = addresses[indexOfRegion].districts[
              indexOfDistrict
            ].cities.findIndex(city => city.name === obj.city);
            if (indexOfCity === -1) {
              addresses[indexOfRegion].districts[indexOfDistrict].cities.push(
                this.makeNewAddress(obj, "city")
              );
            } else {
              const indexOfMicrodistrict = addresses[indexOfRegion].districts[
                indexOfDistrict
              ].cities[indexOfCity].microdistricts.findIndex(
                microdistrict => microdistrict.name === obj.microdistrict
              );
              if (indexOfMicrodistrict === -1 && obj.microdistrict) {
                addresses[indexOfRegion].districts[indexOfDistrict].cities[
                  indexOfCity
                ].microdistricts.push(this.makeNewAddress(obj, "microdistrict"));
              }
            }
          }
        }
      });

      this.setState({
        names,
        regions: addresses,
        districts: [],
        cities: [],
        microdistricts: []
      });
    }
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
            console.log(searchedCity.microdistricts)
            this.setState({ microdistricts: searchedCity.microdistricts });
          }
        }
      }
    }
  }

  handleSelect = propName => {
    const { data } = this.state;
    const tempData = {...data};
    if (propName === 'region') {
      tempData.district = '';
      tempData.city = '';
      tempData.microdistrict = '';
      this.setState({data: tempData, districts: [], cities: [], microdistricts: []}, this.rerender);
    } else if (propName === 'district') {
      tempData.city = '';
      tempData.microdistrict = '';
      this.setState({data: tempData, cities: [], microdistricts: []}, this.rerender);
    } else if (propName === 'city') {
      tempData.microdistrict = '';

      this.setState({data: tempData, microdistricts: []}, this.rerender);
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
