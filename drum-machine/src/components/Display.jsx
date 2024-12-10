import React from 'react';
import { useSelector } from 'react-redux';

const Display = () => {
  const display = useSelector((state) => state.drum.display);
  return <div id="display">{display}</div>;
};

export default Display;
