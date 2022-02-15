// General hook for Audiocall game
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import { AudioCallQuestionItem } from './audioCallModel';
import getRandomNumber from '../../helpers/getRandomNumber';
import {
  changeAudioCallStatusAction,
  requestAudioCallDataAction,
  resetAudioCallStateAction,
} from '../../redux/store/reducers/audioCallReducer';
import { AudioCallGameStatus } from '../../redux/types/audioCallTypes';

const useAudiocallGame = () => {
  const authState = useTypedSelector(store => store.auth);
  const audioCallState = useTypedSelector(store => store.audioCallGame);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [correctAnswers, setCorrectAnswers] = useState<AudioCallQuestionItem[]>(
    [] as AudioCallQuestionItem[]
  );
  const [inCorrectAnswers, setInCorrectAnswers] = useState<
    AudioCallQuestionItem[]
  >([] as AudioCallQuestionItem[]);

  const startHandler = (group: number) => {
    const randomPage = getRandomNumber(0, 29);
    dispatch(requestAudioCallDataAction({ group, page: randomPage }));
  };

  const restartHandler = useCallback(() => {
    setInCorrectAnswers([]);
    setCorrectAnswers([]);
    dispatch(
      requestAudioCallDataAction({
        group: audioCallState.group,
        page: audioCallState.initialPage,
      })
    );
  }, [audioCallState.group, audioCallState.initialPage]);

  const backHandler = () => {
    navigate('/games');
  };

  useEffect(() => {
    return () => {
      dispatch(resetAudioCallStateAction());
    };
  }, []);

  useEffect(() => {
    if (correctAnswers.length + inCorrectAnswers.length === 20) {
      dispatch(changeAudioCallStatusAction(AudioCallGameStatus.END));
    }
  }, [correctAnswers, inCorrectAnswers]);

  const handleCorrectAnswer = (answer: AudioCallQuestionItem) => {
    setCorrectAnswers(prev => [...prev, { ...answer }]);
  };

  const handleInCorrectAnswer = (answer: AudioCallQuestionItem) => {
    setInCorrectAnswers(prev => [...prev, { ...answer }]);
  };

  return {
    gameState: audioCallState,
    authState,
    startHandler,
    restartHandler,
    backHandler,
    handleCorrectAnswer,
    handleInCorrectAnswer,
    correctAnswers,
    inCorrectAnswers,
    group: audioCallState.group,
  };
};

export default useAudiocallGame;
