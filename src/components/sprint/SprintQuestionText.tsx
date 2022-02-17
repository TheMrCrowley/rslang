import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SprintQuestionTextProps {
  word: string;
  answer: string;
}

const StyledTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #fff;
`;

const SprintQuestionText: FC<SprintQuestionTextProps> = ({ word, answer }) => {
  return (
    <StyledTextWrapper>
      <Typography variant="h2" component="p" fontWeight="bold">
        {word}
      </Typography>
      <Typography variant="h2" component="p" fontWeight="bold">
        {answer}
      </Typography>
    </StyledTextWrapper>
  );
};

export default SprintQuestionText;
