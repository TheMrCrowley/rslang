import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { AuthState } from '../../redux/types/authTypes';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import { SprintQuestionItem } from './SprintModel';
import SprintTimer from './SprintTimer';
import useSprint from '../../hooks/useSprint';

interface SprintQuestionProps {
  auth: AuthState;
  correctAnswer: (answer: SprintQuestionItem) => void;
  incorrectAnswer: (answer: SprintQuestionItem) => void;
  audioHandler: (isCorrect: boolean) => void;
}

const SprintQuestion: FC<SprintQuestionProps> = ({
  auth,
  audioHandler,
  correctAnswer,
  incorrectAnswer,
}) => {
  const { word, answer, confirm, decline } = useSprint(
    auth,
    correctAnswer,
    incorrectAnswer,
    audioHandler
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SprintTimer />
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          gap: '1em',
          color: 'white',
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          {word} = {answer}?
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <MainPageLayoutButton
          color="#ff1744"
          onClick={decline}
          text="incorrect"
        />
        <MainPageLayoutButton
          color="#00e576"
          onClick={confirm}
          text="correct"
        />
      </Box>
    </Box>
  );
};

export default SprintQuestion;
