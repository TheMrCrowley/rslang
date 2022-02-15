import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { AuthState } from '../../redux/types/authTypes';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import { SprintQuestionItem } from './SprintModel';
import SprintTimer from './SprintTimer';
import useSprint from '../../hooks/useSprint';
import SprintQuestionText from './SprintQuestionText';
import { darkColors } from '../e-book/cosnstants';
import SprintInGameUpAssets from '../ui/SprintInGameUpAssets';
import CountDown from '../ui/CountDown';

interface SprintQuestionProps {
  auth: AuthState;
  correctAnswer: (answer: SprintQuestionItem) => void;
  incorrectAnswer: (answer: SprintQuestionItem) => void;
  audioHandler: (isCorrect: boolean) => void;
}

const StyledButtonWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SprintQuestion: FC<SprintQuestionProps> = ({
  auth,
  audioHandler,
  correctAnswer,
  incorrectAnswer,
}) => {
  const { word, answer, confirm, decline, group, points } = useSprint(
    auth,
    correctAnswer,
    incorrectAnswer,
    audioHandler
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SprintInGameUpAssets color={darkColors[group]}>
        <Typography
          variant="h4"
          color="white"
          fontWeight="bold"
          component="span"
        >
          {points}
        </Typography>
        <SprintTimer />
      </SprintInGameUpAssets>

      <SprintQuestionText word={word} answer={answer} />
      <StyledButtonWrapper>
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
      </StyledButtonWrapper>
    </Box>
  );
};

export default SprintQuestion;
