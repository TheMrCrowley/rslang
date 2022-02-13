import { Box, Fade, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CampaignIcon from '@mui/icons-material/Campaign';
import { styled } from '@mui/material/styles';
import { RootState } from '../../redux/store';
import Bg from '../../assets/Untitled.png';
import MainPageLayoutButton from './MainPageLayoutButton';
import { darkBgColor, lightBgColor } from '../e-book/cosnstants';

const HomePageWrapper = styled(Box)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background-image: url(${Bg});
  background-size: cover;
  padding: 1rem;
`;

const StyledHeaderWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-between;
`;

const StyledTitle = styled(Typography)`
  background-color: ${lightBgColor};
  border-radius: 3em;
  padding: 0.4em 1em;
  text-align: center;
  font-weight: bold;
` as typeof Typography;

const StyledSubTitle = styled(Typography)`
  max-width: 13em;
  color: ${darkBgColor};
  font-weight: bold;
  padding: 0.8em;
  border-radius: 3em;
  background-color: #fff;
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  gap: 1em;
`;

const TypografyBold = styled(Typography)`
  font-weight: bold;
`;

const DemoHomePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((store: RootState) => store.auth);
  return (
    <HomePageWrapper>
      <StyledHeaderWrapper>
        <StyledTitle variant="h1" component="h1">
          RS Lang
        </StyledTitle>
        <StyledSubTitle variant="h3">
          Create account and get more options!
        </StyledSubTitle>
      </StyledHeaderWrapper>
      <Typography variant="h3">Play and study English for free</Typography>
      <ButtonWrapper>
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
      </ButtonWrapper>
      <ButtonWrapper>
        <TypografyBold variant="h5">More than 3500 words!</TypografyBold>
        <TypografyBold variant="h5">Two amazing games!</TypografyBold>
        <TypografyBold variant="h5">
          Detailed progress statistics for authorized users!
        </TypografyBold>
      </ButtonWrapper>
    </HomePageWrapper>
  );
};

export default DemoHomePage;
