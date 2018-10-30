import React, { Component } from 'react';
import "./EduWayPeopleFilter.css";
import EduWayPeopleInput from "../../Components/EduWayPeopleInput/EduWayPeopleInput";


class EduWayPeopleFilter extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="edu-people-list-filter">
                <EduWayPeopleInput label="Диагноз"/>
                <EduWayPeopleInput label="Ищу"/>
                <EduWayPeopleInput label="Область"/>
                <EduWayPeopleInput label="Район"/>
                <EduWayPeopleInput label="Населенный пункт"/>
                <EduWayPeopleInput label="Микрорайон"/>
                <EduWayPeopleInput label="Годы поступления"/>

                <button className="edu-people-list-btn">Подобрать</button>
            </div>
         );
    }
}
 
export default EduWayPeopleFilter;