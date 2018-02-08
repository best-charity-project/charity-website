import React from 'react';

export default () => {
           return (
            <span>{`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}</span>
        );
}

