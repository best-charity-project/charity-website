import React, {Component} from 'react';
import FiltersForPages from  '../AdminFiltersForPages/AdminFiltersForPages';
import '../AdminFiltersContent/AdminFiltersContent.css';
class AdminFiltersContent extends Component {

    render() {
        return (
            <div className="filters-content">
               <FiltersForPages title = 'События'/>
            </div>  
        )
    }
}

export default AdminFiltersContent;
