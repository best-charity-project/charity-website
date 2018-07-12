import React, {Component} from 'react';
import AdminFilter from '../AdminFilter/AdminFilter';
import TextField from '../../../TextField/TextField';
import Button from '../../../Button/Button';
import { server } from '../../../../api';
import axios from 'axios';
import '../AdminFiltersForPages/AdminFiltersForPages.css';

class FiltersForPages extends Component {
    state = {
        type:'',
        filters: {},
        title:'',
        isOpen: false
    }
    componentDidMount(){
        this.setState({
            type:this.props.type,
            filters: this.props.list,
        })
    }
    componentWillReceiveProps(curprops, nextprops){
        if( curprops.list != this.state.filters){
            this.setState({filters:curprops.list })
        }
    }
    addFilter = () => {
        if(this.state.title){        
            this.createFilter();
            this.props.getNewFilterList();
            this.setState({title: ''});
        }        
    }
    getValue = (str) => {
        this.setState({title: str.value});    
    }
    deleteFilter= (filter) => {
        let id = filter._id; 
        this.removeFilter(id);
    }
    showFilterList = () => {
        this.setState({isOpen: !this.state.isOpen});
    }
    onKeyPress  = (e) => {
        (e.charCode === 13)? this.addFilter(): null;
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
                                <AdminFilter 
                                    filter = {el} key = {index} 
                                    deleteHandler = {() => this.deleteFilter(el) }/>
                                ): null} 
                        </ul>
                    </div>
                </div> : null}               
            </div>  
        )
    }
    createFilter = () => {
        if(this.state.title.toLowerCase() !== 'все'){
            axios({
                method: 'post',
                url: `${ server }/filters`,
                data: this.state,
                config: { headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }},
            })
        }
      

    }
    removeFilter = (id) => {
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
}

export default FiltersForPages;
