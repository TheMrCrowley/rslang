import { Box } from '@mui/material';
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { AuthState } from '../../redux/types/authTypes';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import { SprintQuestionItem } from './SprintModel';
import SprintTimer from './SprintTimer';
import useSprint from '../../hooks/useSprint';
import SprintQuestionText from './SprintQuestionText';

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
  const { word, answer, confirm, decline } = useSprint(
    auth,
    correctAnswer,
    incorrectAnswer,
    audioHandler
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SprintTimer />
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
