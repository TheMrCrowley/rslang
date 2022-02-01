import { Button, ButtonGroup, IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Nav from './Nav';

const Header = () => {
  const [navState, setNavState] = useState<boolean>(false);
  return (
    <Toolbar
      sx={{
        justifyContent: 'space-between',
      }}
    >
      {!navState && (
        <IconButton
          sx={{ color: 'rgba(0,0,0,0.5)' }}
          onClick={() => setNavState(true)}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Nav open={navState} setOpen={setNavState} />
      <Typography variant="h3">RS-LANG</Typography>
      <ButtonGroup sx={{ columnGap: '1rem' }}>
        <Button variant="contained">SIGN UP</Button>
        <Button variant="outlined">LOGIN</Button>
      </ButtonGroup>
    </Toolbar>
  );
};

export default Header;
