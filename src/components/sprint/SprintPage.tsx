/* eslint-disable jsx-a11y/media-has-caption */
import React, { FC, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import useTypedSelector from '../../hooks/useTypedSelector';
import getRandomNumber from '../../helpers/getRandomNumber';
import { SprintQuestionItem } from './SprintModel';

import {
  requestSprintDataAction,
  resetSprintStateAction,
} from '../../redux/store/reducers/sprintGameReducer';
import { SprintGameStatus } from '../../redux/types/sprintTypes';
import SprintMenu from './SprintMenu';
import Results from './Results';
import { colors } from '../e-book/cosnstants';
import GamePageWrapper from '../ui/GamePageWrapper';
import useAudio from '../../hooks/useAudio';
import SprintQuestion from './SprintQuestion';

const StyledBox = styled(Box)<{ group: number }>(({ group }) => ({
  width: '100%',
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors[group],
}));

const StyledProgress = styled(CircularProgress)`
  color: #202026;
  width: 100px;
  height: 100px;
`;

const SprintPage: FC = () => {
  // TODO switch src to const's
  // TODO add description to the game
  const correctAudio = useAudio(
    'https://rslang-team15-natein.netlify.app/static/media/correct.a7b1cde9.mp3'
  );
  const inCorrectAudio = useAudio(
    'https://rslang-team15-natein.netlify.app/static/media/wrong.8e2ad3b1.mp3'
  );
  const authState = useTypedSelector(store => store.auth);
  const sprintGameState = useTypedSelector(store => store.sprintGame);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [correctAnswers, setCorrectAnswers] = useState<SprintQuestionItem[]>(
    [] as SprintQuestionItem[]
  );
  const [inCorrectAnswers, setInCorrectAnswers] = useState<
    SprintQuestionItem[]
  >([] as SprintQuestionItem[]);

  const startHandler = (group: number) => {
    const randomPage = getRandomNumber(0, 29);
    dispatch(requestSprintDataAction({ group, page: randomPage }));
  };

  const restartHandler = useCallback(() => {
    dispatch(
      requestSprintDataAction({
        group: sprintGameState.group,
        page: sprintGameState.page,
      })
    );
  }, [sprintGameState.group, sprintGameState.page]);

  const backHandler = () => {
    navigate('/games');
  };

  const playHandler = (isCorrect: boolean) => {
    if (isCorrect) {
      correctAudio();
    } else {
      inCorrectAudio();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetSprintStateAction());
    };
  }, []);

  const { group } = sprintGameState;

  const handleCorrectAnswer = (answer: SprintQuestionItem) => {
    setCorrectAnswers(prev => [...prev, { ...answer }]);
  };

  const handleInCorrectAnswer = (answer: SprintQuestionItem) => {
    setInCorrectAnswers(prev => [...prev, { ...answer }]);
  };

  if (sprintGameState.request) {
    return (
      <StyledBox group={group}>
        <StyledProgress size={100} />
      </StyledBox>
    );
  }

  return (
    <GamePageWrapper color={colors[group]}>
      {sprintGameState.gameStatus === SprintGameStatus.PREPARE && (
        <SprintMenu isAuth={authState.isAuth} onClick={startHandler} />
      )}
      {sprintGameState.gameStatus === SprintGameStatus.INRUN && (
        <SprintQuestion
          audioHandler={playHandler}
          correctAnswer={handleCorrectAnswer}
          incorrectAnswer={handleInCorrectAnswer}
          auth={authState}
        />
      )}
      {sprintGameState.gameStatus === SprintGameStatus.END && (
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
