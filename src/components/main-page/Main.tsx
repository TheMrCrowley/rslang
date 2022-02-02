import React, { FC } from 'react';
import { styled } from '@mui/material/styles';

const StyledMain = styled('main')`
  padding: 1rem 0;
`;

const Main: FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
export default Main;
