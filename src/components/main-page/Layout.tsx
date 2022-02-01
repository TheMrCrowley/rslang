import Box from '@mui/material/Box';
import React from 'react';
import Header from './Header';

const Layout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'stretch',
        flexDirection: 'column',
      }}
    >
      <Header />
    </Box>
  );
};

export default Layout;
