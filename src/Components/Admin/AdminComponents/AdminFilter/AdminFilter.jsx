import React, {Component} from 'react';
import Button from '../../../Button/Button';
import '../AdminFilter/AdminFilter.css'
class AdminFilter extends Component {
    state = {
        title : this.props.filter.title,
        id: this.props.filter._id
    }
   
    render() {
        return (
            <div  id = {this.state.id} className = 'admin-filter-container'>
              <span className = 'admin-filter-title'> {this.state.title}</span>
              <Button
                       name = "button-admin "
                       label = {<span aria-hidden="true">&times;</span>}
                       clickHandler = {this.props.deleteHandler}
                   />
            </div> 
        )
    }
}

export default AdminFilter;
