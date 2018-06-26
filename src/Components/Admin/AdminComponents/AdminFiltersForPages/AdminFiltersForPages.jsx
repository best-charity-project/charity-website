import React, {Component} from 'react';
import AdminFilter from '../AdminFilter/AdminFilter';
import TextField from '../../../TextField/TextField';
import Button from '../../../Button/Button';
import { server } from '../../../../api';
import axios from 'axios';
import '../AdminFiltersForPages/AdminFiltersForPages.css';
class FiltersForPages extends Component {
state = {
    type:this.props.type,
    filters: this.props.list,
    title:'',
    isOpen: false
}
componentWillReceiveProps(curprops, nextprops){
    if( curprops.list != this.state.filters){
        this.setState({filters:curprops.list })
    }
}
addFilter = () => {
    //проверка на пустую строку
    fetch(`${ server }/filters`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
        })
        
        .then(response => response.json())
        this.props.getNewFilterList();
        this.setState({title: ''})
        
}
getValue = (str) => {
    this.setState({title: str.value})
    
}
deleteFilter= (filter) =>{
    console.log(filter)
    let id = filter._id
 
    axios({
        method: 'delete',
        url: `${server}/filters/` + id,
        config: { headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }}
    })
    .then((result) => {
        this.setState({            
            filters: this.state.filters.filter(item => item._id !== result.data.filter._id)
        }) 
    })
}
showFilterList = () => {
    this.setState({isOpen: !this.state.isOpen})
}
onKeyPress  = (e) => {
    (e.charCode === 13)? this.addFilter(): null
}
    render() {
        return (
            <div className="filters-for-pages">
               <p className = 'filter-title' onClick = {this.showFilterList}> {this.props.title}</p>
               {this.state.isOpen ? 
               <div>
               <div className = 'input-button-filters-page'>
               <TextField
                    onKeyPress = {this.onKeyPress}
                    label = 'Добавить фильтр :'
                    value = {this.state.title}
                    onChangeValue = {this.getValue}
               />
               <Button                        
                       clickHandler = {this.addFilter}                        
                       label = 'Добавить'
                   />
                   </div>
               <div className = 'filters-list'>
                    <ul>
                   {this.state.filters? this.state.filters.map ( (el, index) =>
                       <AdminFilter filter = {el} key = {index} deleteHandler = {() => this.deleteFilter(el) }/>
                    ): null} 
                    </ul>
               </div> </div>: null}
               
            </div>  
        )
    }
}

export default FiltersForPages;
