import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import { SprintQuestionItem } from './SprintModel';
import getRandomNumber from '../../helpers/getRandomNumber';
import {
  requestSprintDataAction,
  resetSprintStateAction,
} from '../../redux/store/reducers/sprintGameReducer';

const useSprintGame = () => {
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
    setCorrectAnswers([]);
    setInCorrectAnswers([]);
    dispatch(
      requestSprintDataAction({
        group: sprintGameState.group,
        page: sprintGameState.initialPage,
      })
    );
  }, [sprintGameState.group, sprintGameState.initialPage]);

  const backHandler = () => {
    navigate('/games');
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

  return {
    gameState: sprintGameState,
    authState,
    startHandler,
    correctAnswers,
    inCorrectAnswers,
    restartHandler,
    backHandler,
    group,
    handleCorrectAnswer,
    handleInCorrectAnswer,
  };
};

export default useSprintGame;
