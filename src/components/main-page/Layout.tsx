import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-around',
          minHeight: 'calc(100vh - 4em)',
        }}
      >
        <Header />
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
