import React, { ReactNode, ReactElement, FC } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography } from '@mui/material';
import { darkCorrectColor, darkIncorrectColor } from '../e-book/cosnstants';

const ResultsWrapper = styled(Box)`
  height: 65vh;
  margin-bottom: 1rem;
  padding: 2.5rem 1rem 2.5rem 2.5rem;
  background-color: white;
  border-radius: 2em;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-right: 1.5rem;
  background-color: white;
  overflow: auto;
`;

interface ResultsProps {
  correct: ReactNode[] | ReactElement[];
  incorrect: ReactNode[] | ReactElement[];
  incorrectNum: number;
  correctNum: number;
}
const Results: FC<ResultsProps> = ({
  correct,
  incorrect,
  correctNum,
  incorrectNum,
}) => {
  return (
    <ResultsWrapper>
      <StyledBox>
        <Typography variant="h4" color={darkCorrectColor}>
          Correct: {correctNum}
        </Typography>
        {correct}
        <Divider />
        <Typography variant="h4" color={darkIncorrectColor}>
          Incorrect: {incorrectNum}
        </Typography>
        {incorrect}
      </StyledBox>
    </ResultsWrapper>
  );
};

export default Results;
