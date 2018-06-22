import React, {Component} from 'react';
import './Checkbox.css';

class Checkbox extends Component {
    render() {
        return (
            <input 
                type = "checkbox" 
                name = {this.props.name} 
                onChange = {this.props.onChange}
                className = {this.props.styles}
            />
        );
    }
}

export default Checkbox;