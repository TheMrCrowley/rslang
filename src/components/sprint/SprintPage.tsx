/* eslint-disable jsx-a11y/media-has-caption */
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

import { SprintGameStatus } from '../../redux/types/sprintTypes';
import SprintMenu from './SprintMenu';
import Results from './Results';
import { colors } from '../e-book/cosnstants';
import GamePageWrapper from '../ui/GamePageWrapper';
import SprintQuestion from './SprintQuestion';
import useSprintGame from './useSprintGame';
import GameDescription from '../ui/GameDescription';

const StyledBox = styled(Box)<{ group: number }>(({ group }) => ({
  width: '100%',
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors[group],
}));

const StyledProgress = styled(CircularProgress)`
  color: white;
  width: 100px;
  height: 100px;
`;

const SprintPage: FC = () => {
  // TODO switch src to const's
  // TODO remove to hook
  const {
    gameState,
    authState,
    correctAnswers,
    inCorrectAnswers,
    handleInCorrectAnswer,
    restartHandler,
    startHandler,
    backHandler,
    handleCorrectAnswer,
    group,
  } = useSprintGame();

  if (gameState.request) {
    return (
      <StyledBox group={group}>
        <StyledProgress size={100} />
      </StyledBox>
    );
  }
  return (
    <GamePageWrapper color={colors[group]}>
      {gameState.gameStatus === SprintGameStatus.PREPARE && (
        <SprintMenu isAuth={authState.isAuth} onClick={startHandler}>
          <GameDescription title="Sprint">
            Choose if the translation matches the suggested word
            <Typography>
              To play with keyboard use key &apos;&#8592;&apos; for answer
              &apos;incorrect&apos; and key &apos;&#8594;&apos; for answer
              &apos;correct&apos;
            </Typography>
          </GameDescription>
        </SprintMenu>
      )}
      {gameState.gameStatus === SprintGameStatus.INRUN && (
        <SprintQuestion
          correctAnswer={handleCorrectAnswer}
          incorrectAnswer={handleInCorrectAnswer}
          auth={authState}
        />
      )}
      {gameState.gameStatus === SprintGameStatus.END && (
        <Results
          correctAnswers={correctAnswers}
          inCorrectAnswers={inCorrectAnswers}
          restartHandler={restartHandler}
          group={group}
          backHandler={backHandler}
        />
      )}
    </GamePageWrapper>
  );
};

export default SprintPage;
