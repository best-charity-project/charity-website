import React, { Component } from 'react';

class AdminValidationWindow extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div>
                    <span>{this.props.title}</span>
                </div>
            </div>
        );
    }
}

export default AdminValidationWindow;