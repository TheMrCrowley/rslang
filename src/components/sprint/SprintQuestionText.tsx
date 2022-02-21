import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SprintQuestionTextProps {
  word: string;
  answer: string;
}

const StyledText = styled(Typography)`
  font-weight: bold;
  font-size: 4.5rem;
  text-align: center;
  @media (max-width: 520px) {
    font-size: 2.5rem;
    word-break: break-all;
    margin: 0 1rem;
  }
`;

const StyledTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  @media (max-width: 520px) {
    margin: 2rem 0;
  }
`;

const SprintQuestionText: FC<SprintQuestionTextProps> = ({ word, answer }) => {
  return (
    <StyledTextWrapper>
      <StyledText>{word}</StyledText>
      <StyledText>{answer}</StyledText>
    </StyledTextWrapper>
  );
};

export default SprintQuestionText;
