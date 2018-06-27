import React, {Component} from 'react';
import Select, {Option, OptGroup} from 'rc-select';
import 'rc-select/assets/index.css';
import _ from 'lodash';
import '../AdminSelectSearch/AdminSelectSearch.css';
import TextField from '../../../TextField/TextField';
import Button from '../../../Button/Button';
import {server} from '../../../../api';

class AdminSelectSearch extends Component {
    state = {
        filters: this.props.filtersList,
        addNewOption:false,
    }

    componentDidMount(){
        this.createOptions();
    }

    createOptions = () =>{
        let array = [];
        if(this.state.filters){
            this.state.filters.forEach(function(item, index){
                let filter = {};
                filter.label= item.title;
                filter.value = index;
                array.push(filter)
            })
        }
     this.setState({filters:array})
    }

    onChange = (e) => {
        (e)? this.setState ({value:e }): '';
      }

    render() {
        const { selectedOption, addNewOption } = this.state;
        return (
            <div className="select-component" onChange= {this.getOptions}>
                <Select                    
                    id="my-select"
                    value={this.state.value}
                    placeholder="Введите источник"
                    dropdownMenuStyle={{ maxHeight: 250 }}
                    style={{ width: 500 }}
                    onInputKeydown= {this.onSearch}
                    onChange={this.onChange}
                    notFoundContent = 'Ничего не найдено'
                >
                {this.state.filters.map((filter,index) => {
                    return <Option 
                                key = {index} 
                                value={filter.label}>
                            {filter.label}
                            </Option>;
                })}
                </Select>
                {addNewOption?<div className = 'input-buttom-select' >
                    <TextField
                            onKeyPress = {this.onKeyPress}
                            label = 'Добавить фильтр :'
                            value = {this.state.newFilterValue}
                            onChangeValue = {this.getValue}
                    />
                    <Button   
                                name = 'select-button'                     
                            clickHandler = {this.addNewFilter}                        
                            label = 'Добавить'
                        />
                        </div>:null}       
            </div>
        )
    }

    getOptions = (e) => {
        let value = e.target.value;
       let addNewOption = _.filter(this.state.filters, function(o) { 
        return o.label.includes(value) });   
       (!addNewOption.length)? this.setState({addNewOption:true}) : null;
       (!e.target.value.length)? this.setState({addNewOption:false}) : null;
    }

    getValue =(str) => {
        this.setState({newFilterValue: str.value })
    }

    addNewFilter = (e) => {
        e.preventDefault();
        fetch(`${ server }/filters`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({title:this.state.newFilterValue, type:'news'}),
        })
        this.setState({newFilterValue: ''})
        let arrayFilter = this.state.filters;
        let lengthArray= arrayFilter.length;
        let lastValue = arrayFilter[lengthArray-1].value;
        let newFilter = this.state.newFilterValue;
        arrayFilter.push({label:newFilter, value: lastValue ++} )          
        this.setState({filters: arrayFilter, addNewOption:false})
    }

}

export default AdminSelectSearch;