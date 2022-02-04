import { Box, Button, ButtonGroup, styled, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
`;

const HomeTitle = styled('h1')`
  font-size: 64px;
  text-align: center;
  margin: 0;
`;

const HomeDescription = styled(Typography)`
  font-size: 32px;
  text-align: center;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  display: flex;
  column-gap: 1rem;
`;

const StyledButton = styled(Button)`
  background-color: #fecb00;
  border: 2px solid transparent;
  font-size: 24px;
  &:hover {
    background-color: #202026;
    color: #fecb00;
    border: 2px solid #fecb00;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((store: RootState) => store.auth);
  return (
    <StyledBox>
      <HomeTitle>Rs Lang</HomeTitle>
      <HomeDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ratione
        culpa maxime in aspernatur perferendis quod quo. Ab repudiandae soluta,
        veniam, harum deleniti perferendis itaque, nam excepturi voluptatibus
        illo architecto.
      </HomeDescription>
      <StyledButtonGroup>
        {!isAuth && (
          <StyledButton onClick={() => navigate('/registration')}>
            Registration
          </StyledButton>
        )}
        <StyledButton>About App</StyledButton>
      </StyledButtonGroup>
    </StyledBox>
  );
};

export default HomePage;
