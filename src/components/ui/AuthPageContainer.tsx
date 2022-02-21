import { Box, FormGroup } from '@mui/material';
import React from 'react';
import { mainBgColor } from '../e-book/cosnstants';

const AuthPageContainer: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        bgcolor: mainBgColor,
      }}
    >
      <FormGroup
        sx={{
          flexBasis: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          p: '2em',
          borderRadius: '2em',
          bgcolor: 'white',
        }}
      >
        {children}
      </FormGroup>
    </Box>
  );
};

export default AuthPageContainer;
