import { Box, Typography, ButtonGroup, styled } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import { RootState } from '../../redux/store';
import Bg from '../../assets/Untitled.png';
import MainPageLayoutButton from './MainPageLayoutButton';

const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
  column-gap: 1rem;
`;

const DemoHomePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((store: RootState) => store.auth);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: '5em 2em 0 6em',
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              maxWidth: '6em',
              backgroundColor: '#99ffe0',
              borderRadius: '3em',
              p: '0.4em 1em 0.4em 1em',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            RS Lang
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            variant="h3"
            sx={{
              maxWidth: '13em',
              color: '#14cba8',
              fontWeight: 'bold',
              ml: 'auto',
              p: '0.8em',
              borderRadius: '3em',
              backgroundColor: '#ffffff',
            }}
          >
            Create account and get more options!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              mb: '10%',
              fontWeight: 'bold',
            }}
          >
            Play and study English for free
          </Typography>
        </Grid>
        <Grid item xs>
          <MainPageLayoutButton onClick={() => navigate('/book')} text="E-book">
            <MenuBookIcon fontSize="large" />
          </MainPageLayoutButton>
        </Grid>
        <Grid item xs>
          <MainPageLayoutButton onClick={() => null} text="Sprint">
            <DirectionsRunIcon fontSize="large" />
          </MainPageLayoutButton>
        </Grid>
        <Grid item xs>
          <MainPageLayoutButton onClick={() => null} text="Savanah">
            <EmojiNatureIcon fontSize="large" />
          </MainPageLayoutButton>
        </Grid>
        <Grid item xs>
          {!isAuth && (
            <MainPageLayoutButton
              onClick={() => navigate('/registration')}
              text="Registration"
            />
          )}
        </Grid>
        <Grid item xs>
          <MainPageLayoutButton text="About App" />
        </Grid>
        <Grid item xs={12} height="4em" />
        <Grid item xs>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            More than 3500 words!
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Two amazing games!
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Detailed progress statistics for authorized users!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DemoHomePage;
