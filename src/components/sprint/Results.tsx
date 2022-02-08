import React, { ReactNode, ReactElement, FC } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography } from '@mui/material';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

const StyledTypografy = styled(Typography)`
  font-size: 24px;
  color: #202026;
`;

interface ResultsProps {
  correct: ReactNode[] | ReactElement[];
  incorrect: ReactNode[] | ReactElement[];
}
const Results: FC<ResultsProps> = ({ correct, incorrect }) => {
  return (
    <StyledBox>
      <StyledTypografy>Correct</StyledTypografy>
      {correct}
      <Divider />
      <StyledTypografy>Incorrect</StyledTypografy>
      {incorrect}
    </StyledBox>
  );
};

export default Results;
