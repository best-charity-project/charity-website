import React from 'react';

class Time extends React.Component {
     render() {
        return (
            <span>{`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}</span>
        );
    }
}
export default Time;
