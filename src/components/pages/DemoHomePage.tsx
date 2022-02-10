import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CampaignIcon from '@mui/icons-material/Campaign';
import { RootState } from '../../redux/store';
import Bg from '../../assets/Untitled.png';
import MainPageLayoutButton from './MainPageLayoutButton';
import { darkBgColor, lightBgColor } from '../e-book/cosnstants';

const DemoHomePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((store: RootState) => store.auth);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1em',
        minHeight: 'calc(100vh - 4em)',
        p: '5em 2em 5em 6em',
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          gap: '1em',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            backgroundColor: lightBgColor,
            borderRadius: '3em',
            p: '0.4em 1em 0.4em 1em',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          RS Lang
        </Typography>
        <Typography
          variant="h3"
          sx={{
            maxWidth: '13em',
            color: darkBgColor,
            fontWeight: 'bold',
            p: '0.8em',
            borderRadius: '3em',
            backgroundColor: '#ffffff',
          }}
        >
          Create account and get more options!
        </Typography>
      </Box>
      <Typography
        variant="h3"
        sx={{
          mb: '10%',
          fontWeight: 'bold',
        }}
      >
        Play and study English for free
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-evenly',
          gap: '1em',
        }}
      >
        <MainPageLayoutButton onClick={() => navigate('/book')} text="E-book">
          <MenuBookIcon fontSize="large" />
        </MainPageLayoutButton>
        <MainPageLayoutButton onClick={() => navigate('/sprint')} text="Sprint">
          <DirectionsRunIcon fontSize="large" />
        </MainPageLayoutButton>
        <MainPageLayoutButton
          onClick={() => navigate('/audiocall')}
          text="Audiocall"
        >
          <CampaignIcon fontSize="large" />
        </MainPageLayoutButton>
        {!isAuth && (
          <MainPageLayoutButton
            onClick={() => navigate('/registration')}
            text="Registration"
          />
        )}
        <MainPageLayoutButton text="About" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-around',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          More than 3500 words!
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Two amazing games!
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Detailed progress statistics for authorized users!
        </Typography>
      </Box>
    </Box>
  );
};

export default DemoHomePage;
