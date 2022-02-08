import { Box, FormGroup } from '@mui/material';
import React from 'react';

const AuthPageContainer: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <FormGroup
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          bgcolor: '#64ffda',
          p: '2em',
          borderRadius: '2em',
        }}
      >
        {children}
      </FormGroup>
    </Box>
  );
};

export default AuthPageContainer;
