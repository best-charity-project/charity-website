import React, {Component} from 'react';
import Button from '../../../Button/Button';
class AdminFilter extends Component {
    state = {
        name : this.props.filter.name
    }
    render() {
        return (
            <div className="filters-for-pages">
              <span> {this.state.name}</span>
              <Button
                       name = "button-admin admin-cancel"
                       label = {<span aria-hidden="true">&times;</span>}
                       clickHandler = {this.props.deleteHandler}
                   />
            </div> 
        )
    }
}

export default AdminFilter;
