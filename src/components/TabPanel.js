import React from 'react';
import { Fade } from '@mui/material';

const TabPanel = ({ children, value, index }) => {
  return (
    <Fade in={value === index} timeout={500}>
      <div hidden={value !== index} style={{ width: '100%' }}>
        {value === index && children}
      </div>
    </Fade>
  );
};

export default TabPanel; 