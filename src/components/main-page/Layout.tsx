import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';

const LayoutWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'stretch',
  flexDirection: 'column',
  backgroundColor: '#202026',
});

const TopContentWrapper = styled(Box)({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const Layout = () => {
  return (
    <LayoutWrapper>
      <TopContentWrapper>
        <Header />
      </TopContentWrapper>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
