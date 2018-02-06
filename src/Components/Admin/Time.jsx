import React from 'react';

class Time extends React.Component {
     render() {
        return (
            <div>{new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear()}</div>
        );
    }
}
export default Time;