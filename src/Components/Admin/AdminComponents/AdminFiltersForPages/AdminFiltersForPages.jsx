import React, {Component} from 'react';
import AdminFilter from '../AdminFilter/AdminFilter';
import TextField from '../../../TextField/TextField';
import Button from '../../../Button/Button';
import { server } from '../../../../api';
import '../AdminFiltersForPages/AdminFiltersForPages.css'
class FiltersForPages extends Component {
state = {
    title:'events',
filters:[
        {
            name: 'здоровье'
        },
        {
            name: 'спортивные'
        },
        {
            name: 'культурные'
        }
    ]
}
// showFiltersList = () => {
//     alert('rfrf')
// }
addFilter = () => {
    alert('rfr');
    fetch(`${ server }/filters`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
        })
        .then(response => response.json())
        .then(data => console.log(data)) 
}
    render() {
        return (
            <div className="filters-for-pages" onClick  = {this.showFiltersList}>
               <p className = 'filter-title'> {this.props.title}</p>
               <TextField />
               <Button                        
                       clickHandler = {this.addFilter}                        
                       label = 'Добавить'
                   />
               <div className = 'filters-list'>
                    <ul>
                   {this.state.filters.map ( (el, index) =>
                       <AdminFilter filter = {el} key = {index}/>
                    )} 
                    </ul>
               </div>
            </div>  
        )
    }
}

export default FiltersForPages;
