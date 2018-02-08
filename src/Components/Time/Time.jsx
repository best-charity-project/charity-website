import React from 'react';

export default () => {
        let date = new Date();
           return (
             <span>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</span>
        );
}

