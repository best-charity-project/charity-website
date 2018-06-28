import React, {Component} from 'react';
import Button from '../../../Button/Button';
import '../AdminFilter/AdminFilter.css';

class AdminFilter extends Component {
    state = {
        title : '',
        id : ''
    }
   componentDidMount(){
       this.setState({
        title : this.props.filter.title,
        id : this.props.filter._id
       })
   }
    render() {
        let defaultFilter = this.state.title.toLowerCase();
        return (
            <div>
                {defaultFilter !== 'все' ?
                    <div  id = {this.state.id} className = 'admin-filter-container' >
                        <span className = 'admin-filter-title' > {this.state.title}</span>
                        <Button
                            name = "button-admin "
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
