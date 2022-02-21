import React from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import SprintMenu from '../sprint/SprintMenu';
import { AudioCallGameStatus } from '../../redux/types/audioCallTypes';
import { colors } from '../e-book/cosnstants';
import GamePageWrapper from '../ui/GamePageWrapper';
import AudiocallQuestion from './AudiocallQuestion';
import AudiocallResults from './AudicallResults';
import useAudiocallGame from './useAudiocallGame';
import GameDescription from '../ui/GameDescription';

const StyledProgress = styled(CircularProgress)`
  color: white;
  width: 100px;
  height: 100px;
`;

const AudioCallPage = () => {
  const {
    gameState,
    authState,
    correctAnswers,
    inCorrectAnswers,
    handleCorrectAnswer,
    handleInCorrectAnswer,
    restartHandler,
    startHandler,
    backHandler,
    group,
  } = useAudiocallGame();

  if (gameState.request) {
    return <StyledProgress />;
  }
  return (
    <GamePageWrapper color={colors[group]}>
      {gameState.gameStatus === AudioCallGameStatus.PREPARE && (
        <SprintMenu isAuth={authState.isAuth} onClick={startHandler}>
          <GameDescription title="Audiocall">
            Choose if the translation matches the suggested word
            <Typography>
              To play with keyboard use keys: 1 2 3 4 for answer,
              &apos;space&apos; for next word, &apos;r&apos; for repeat word
            </Typography>
          </GameDescription>
        </SprintMenu>
      )}
      {gameState.gameStatus === AudioCallGameStatus.INRUN && (
        <AudiocallQuestion
          auth={authState}
          correctAnswer={handleCorrectAnswer}
          incorrectAnswer={handleInCorrectAnswer}
        />
      )}
      {gameState.gameStatus === AudioCallGameStatus.END && (
        <AudiocallResults
          correctAnswers={correctAnswers}
          inCorrectAnswers={inCorrectAnswers}
          restartHandler={restartHandler}
          backHandler={backHandler}
          group={group}
        />
      )}
    </GamePageWrapper>
  );
};

export default AudioCallPage;
