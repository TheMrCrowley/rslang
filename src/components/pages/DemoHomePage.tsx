import { Box, Typography, ButtonGroup, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import { RootState } from '../../redux/store';
import Bg from '../../assets/Untitled.png';
import MainPageLayoutButton from './MainPageLayoutButton';

// const StyledButton = styled(Button)`
//   background-color: #fecb00;
//   border: 2px solid transparent;
//   font-size: 24px;
//   &:hover {
//     background-color: #202026;
//     color: #fecb00;
//     border: 2px solid #fecb00;
//   }
// `;

// const SyledMainPageWrpper = styled(Box)`

// `;

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
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '100vh',
        backgroundImage: `url(${Bg})`,
        backgroundSize: 'cover',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          p: '5em 0 0 10em',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            backgroundColor: '#99ffe0',
            borderRadius: '3em',
            p: '0.5em 1em 0.5em 1em',

            fontWeight: 'bold',
          }}
        >
          RS Lang
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Play and study English for free
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            columnGap: '2em',
          }}
        >
          <MainPageLayoutButton onClick={() => navigate('/book')} text="E-book">
            <MenuBookIcon fontSize="large" />
          </MainPageLayoutButton>
          <MainPageLayoutButton onClick={() => null} text="Sprint">
            <DirectionsRunIcon fontSize="large" />
          </MainPageLayoutButton>
          <MainPageLayoutButton onClick={() => null} text="Savanah">
            <EmojiNatureIcon fontSize="large" />
          </MainPageLayoutButton>
        </Box>
        <Box
          sx={{
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            rowGap: '0.5em',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            color: '#000',
            borderRadius: '3em',
            backgroundColor: '#fff',
            p: '2em',
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          ml: 'auto',
          mt: '4em',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#14cba8',
            fontWeight: 'bold',
            p: '1em',
            borderRadius: '3em',
            backgroundColor: '#ffffff',
          }}
        >
          Create account and get
          <br /> more options!
        </Typography>
        <StyledButtonGroup>
          {!isAuth && (
            <MainPageLayoutButton
              onClick={() => navigate('/registration')}
              text="Registration"
            />
          )}
          <MainPageLayoutButton text="About App" />
        </StyledButtonGroup>
      </Box>
    </Box>
  );
};

export default DemoHomePage;
