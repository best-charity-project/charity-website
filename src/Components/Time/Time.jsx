import React from 'react';

export default () => {
  const date = new Date();
  return <span>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</span>;
};
