import React from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import SprintMenu from '../sprint/SprintMenu';
import { AudioCallGameStatus } from '../../redux/types/audioCallTypes';
import { colors } from '../e-book/cosnstants';
import GamePageWrapper from '../ui/GamePageWrapper';
import AudiocallQuestion from './AudiocallQuestion';
import AudiocallResults from './AudicallResults';
import useAudiocallGame from './useAudiocallGame';

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
        <SprintMenu isAuth={authState.isAuth} onClick={startHandler} />
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
