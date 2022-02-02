import React, { FC } from 'react';
import { styled } from '@mui/material/styles';

const StyledMain = styled('main')`
  padding: 1rem 0;
`;

type MainProps = {
  children: React.ReactElement | React.ReactNode;
};
const Main: FC<MainProps> = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
export default Main;
