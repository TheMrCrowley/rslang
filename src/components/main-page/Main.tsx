import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

const StyledMain = styled('main')`
  padding: 1rem 0;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main: FC = ({ children }) => {
  return (
    <StyledMain>
      <StyledContainer>{children}</StyledContainer>
    </StyledMain>
  );
};
export default Main;
