import React from 'react';

class Time extends React.Component {
    constructor() {
        super();
        let today = new Date(),
            date =  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        this.state = {
            date: date
        };
    }
    render() {
        return (
            <div>{this.state.date}</div>
        );
    }
}
export default Time;