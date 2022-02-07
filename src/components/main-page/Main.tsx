import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

const StyledMain = styled('main')`
  padding: 64px 0 0 0;
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
      <StyledContainer maxWidth="1800px">{children}</StyledContainer>
    </StyledMain>
  );
};
export default Main;
