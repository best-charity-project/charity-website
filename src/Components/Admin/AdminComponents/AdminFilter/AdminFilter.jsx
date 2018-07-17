import React, {Component} from 'react';
import Button from '../../../Button/Button';
import '../AdminFilter/AdminFilter.css';

class AdminFilter extends Component {
    state = {
        title: ''
    }
    componentDidMount(){
        {this.props.title ? this.setState({title:this.props.title}) : this.setState({title:''})};
    };
    render() {
        let defaultFilter = this.state.title;        
        return (
            <div>
                {defaultFilter !== 'все' ?
                    <div  id = {this.props.id} className = 'admin-filter-container'>
                        <span className = 'admin-filter-title'>{this.props.filter}</span>
                        <Button
                            name = "button-admin"
                            label = {<span aria-hidden="true">&times;</span>}
                            clickHandler = {this.props.deleteHandler}
                        />
                    </div> 
               : null}                
            </div>           
        )
    }
}

export default AdminFilter;
