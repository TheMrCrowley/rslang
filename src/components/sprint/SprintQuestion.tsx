import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { AuthState } from '../../redux/types/authTypes';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import SprintTimer from './SprintTimer';
import useSprintQuestion from './useSprintQuestion';
import SprintQuestionText from './SprintQuestionText';
import {
  darkColors,
  darkCorrectColor,
  darkIncorrectColor,
} from '../e-book/cosnstants';
import SprintInGameUpAssets from '../ui/SprintInGameUpAssets';
import { SprintQuestionItem } from '../../helpers/gameHelpers';

interface SprintQuestionProps {
  auth: AuthState;
  correctAnswer: (answer: SprintQuestionItem) => void;
  incorrectAnswer: (answer: SprintQuestionItem) => void;
}

const StyledButtonWrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 1rem;
`;

const SprintQuestion: FC<SprintQuestionProps> = ({
  auth,
  correctAnswer,
  incorrectAnswer,
}) => {
  const { word, answer, confirm, decline, group, points } = useSprintQuestion(
    auth,
    correctAnswer,
    incorrectAnswer
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '70vh',
        mb: 'auto',
      }}
    >
      <SprintInGameUpAssets color={darkColors[group]}>
        <Typography
          variant="h4"
          color="white"
          fontWeight="bold"
          component="span"
        >
          Points: {points}
        </Typography>
        <SprintTimer />
      </SprintInGameUpAssets>

      <SprintQuestionText word={word} answer={answer} />
      <StyledButtonWrapper>
        <MainPageLayoutButton
          color={darkIncorrectColor}
          onClick={decline}
          text="incorrect"
        />
        <MainPageLayoutButton
          color={darkCorrectColor}
          onClick={confirm}
          text="correct"
        />
      </StyledButtonWrapper>
    </Box>
  );
};

export default SprintQuestion;
