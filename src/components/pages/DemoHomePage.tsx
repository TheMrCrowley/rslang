import { Box, Typography } from '@mui/material';
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
import { darkBgColor, lightBgColor, mainBgColor } from '../e-book/cosnstants';

const HomePageWrapper = styled(Box)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background-image: url(${Bg});
  background-size: cover;
  padding-top: 5rem;
  @media (max-width: 720px) {
    background-image: none;
    background-color: ${mainBgColor};
    justify-content: space-between;
  }
`;

const StyledHeaderWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding-left: 4rem;
  @media (max-width: 1200px) {
    justify-content: space-around;
    padding-left: 0;
  }
  @media (max-width: 720px) {
    justify-content: space-around;
    padding-left: 0;
  }
`;

const StyledTitle = styled(Typography)`
  font-size: 6rem;
  background-color: ${lightBgColor};
  border-radius: 3em;
  padding: 0.4em 1em;
  text-align: center;
  font-weight: bold;
  @media (max-width: 560px) {
    font-size: 3.5rem;
  }
` as typeof Typography;

const StyledSubTitle = styled(Typography)`
  align-self: flex-start;
  max-width: 13em;
  color: ${darkBgColor};
  font-weight: bold;
  text-align: center;
  padding: 0.65em;
  border-radius: 3em;
  background-color: #fff;
  @media (max-width: 1280px) {
    font-size: 2.5rem;
  }
  @media (max-width: 720px) {
    display: none;
  }
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  gap: 1em;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const TextWrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  gap: 1em;
  justify-content: space-evenly;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
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
        <StyledTitle component="h1">RS Lang</StyledTitle>
        <StyledSubTitle variant="h3">
          Create account and get more options!
        </StyledSubTitle>
      </StyledHeaderWrapper>
      <TextWrapper>
        <Typography variant="h3">Play and study English for free</Typography>
      </TextWrapper>
      <ButtonWrapper>
        <MainPageLayoutButton
          onClick={() => navigate('/book/0/0')}
          text="E-book"
        >
          <MenuBookIcon fontSize="large" />
        </MainPageLayoutButton>
        <MainPageLayoutButton
          onClick={() => navigate('/games/sprint')}
          text="Sprint"
        >
          <DirectionsRunIcon fontSize="large" />
        </MainPageLayoutButton>
        <MainPageLayoutButton
          onClick={() => navigate('/games/audiocall')}
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
        <MainPageLayoutButton onClick={() => navigate('/team')} text="About" />
      </ButtonWrapper>
      <TextWrapper>
        <TypografyBold variant="h5">More than 3500 words!</TypografyBold>
        <TypografyBold variant="h5">Two amazing games!</TypografyBold>
        <TypografyBold variant="h5">
          Detailed progress statistics for authorized users!
        </TypografyBold>
      </TextWrapper>
    </HomePageWrapper>
  );
};

export default DemoHomePage;
