import React, { FC } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SprintQuestionTextProps {
  word: string;
  answer: string;
}

const StyledTextWrapper = styled(Box)`
  display: flex;
  gap: 1rem;
  color: #fff;
`;

const SprintQuestionText: FC<SprintQuestionTextProps> = ({ word, answer }) => {
  console.log('render');
  return (
    <Fade in={word}>
      <StyledTextWrapper>
        <Typography variant="h2" fontWeight="bold">
          {word} = {answer}?
        </Typography>
      </StyledTextWrapper>
    </Fade>
  );
};

export default SprintQuestionText;
