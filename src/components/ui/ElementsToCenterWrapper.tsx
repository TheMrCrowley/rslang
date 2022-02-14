import { Box, styled } from '@mui/material';
import React, { FC } from 'react';

const Wrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  align-self: center;
  gap: 1em;
  padding-bottom: 0.5rem;
`;

const ElementsToCenterWrapper: FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ElementsToCenterWrapper;
