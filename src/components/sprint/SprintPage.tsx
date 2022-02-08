/* eslint-disable jsx-a11y/media-has-caption */
import { Box } from '@mui/material';
import React, {
  FC,
  LegacyRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import {
  correctAnswerAction,
  incorrectAnswerAction,
} from '../../redux/store/reducers/userWordsReducer';
import requestMethodChoiser from '../../helpers/requestMethodChoiser';
import useTypedSelector from '../../hooks/useTypedSelector';
import getRandomNumber from '../../helpers/getRandomNumber';
import {
  compareAnswers,
  getQuestionItems,
  SprintQuestionItem,
} from './SprintModel';
import SprintButton from './SprintButton';
import {
  changeSprintStatusAction,
  requestSptintDataAction,
  resetSprintStateAction,
} from '../../redux/store/reducers/sprintGameReducer';
import { SprintGameStatus } from '../../redux/types/sprintTypes';
import SprintMenu from './SprintMenu';
import ResultLine from './ResultLine';
import Results from './Results';
import getAssetsUrl from '../../helpers/getAssetsUrl';

const StyledBox = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledProgress = styled(CircularProgress)`
  color: #202026;
  width: 100px;
  height: 100px;
`;

const SprintPage: FC = () => {
  const correctAudio = useRef<HTMLAudioElement>();
  const inCorrectAudio = useRef<HTMLAudioElement>();
  // redux
  const { userWords } = useTypedSelector(store => store.userWords);
  const authState = useTypedSelector(store => store.auth);
  const sprintGameState = useTypedSelector(store => store.sprintGame);
  const dispatch = useDispatch();
  //
  const [currentQuestion, setCurrentQuestion] = useState<SprintQuestionItem>(
    {} as SprintQuestionItem
  );
  const [gameQuestions, setGameQuestions] = useState<SprintQuestionItem[]>([
    {} as SprintQuestionItem,
  ] as SprintQuestionItem[]);
  const [correctAnswers, setCorrectAnswers] = useState<SprintQuestionItem[]>(
    [] as SprintQuestionItem[]
  );
  const [inCorrectAnswers, setInCorrectAnswers] = useState<
    SprintQuestionItem[]
  >([] as SprintQuestionItem[]);

  const startHandler = (group: number) => {
    const randomPage = getRandomNumber(0, 29);
    dispatch(requestSptintDataAction({ group, page: randomPage }));
  };

  const restartHandler = useCallback(() => {
    const { group, page } = sprintGameState;
    dispatch(requestSptintDataAction({ group, page }));
  }, [sprintGameState.group, sprintGameState.page]);

  const nextQuestion = () => {
    setGameQuestions(prev => {
      setCurrentQuestion(prev.pop() as SprintQuestionItem);
      return prev;
    });
  };

  const showResults = () => {
    dispatch(changeSprintStatusAction(SprintGameStatus.END));
  };

  const playHandler = (ref: MutableRefObject<HTMLAudioElement>) => {
    if (ref.current) {
      ref.current.play();
    }
  };

  const answerHandler = (answer: boolean) => {
    const isCorrect = compareAnswers(currentQuestion.isCorrect, answer);
    if (authState.isAuth) {
      const { userId } = authState.userData;
      const { wordId } = currentQuestion;
      const method = requestMethodChoiser(userWords, wordId);
      if (isCorrect) {
        dispatch(
          correctAnswerAction({ userId, wordId, method, from: 'SPRINT' })
        );
      } else {
        dispatch(
          incorrectAnswerAction({ userId, wordId, method, from: 'SPRINT' })
        );
      }
    }
    if (isCorrect) {
      setCorrectAnswers(prev => [...prev, { ...currentQuestion }]);
      playHandler(correctAudio as MutableRefObject<HTMLAudioElement>);
    } else {
      setInCorrectAnswers(prev => [...prev, { ...currentQuestion }]);
      playHandler(inCorrectAudio as MutableRefObject<HTMLAudioElement>);
    }
    if (gameQuestions.length) {
      nextQuestion();
    } else {
      showResults();
    }
  };

  useEffect(() => {
    if (gameQuestions.length) {
      dispatch(changeSprintStatusAction(SprintGameStatus.INRUN));
    }
  }, [gameQuestions.length, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetSprintStateAction());
    };
  }, []);

  useMemo(() => {
    setGameQuestions(getQuestionItems(sprintGameState.words));
    nextQuestion();
  }, [sprintGameState.words]);

  if (sprintGameState.request) {
    return <StyledProgress />;
  }

  return (
    <StyledBox>
      <>
        <audio
          src={getAssetsUrl('files/01_0001.mp3')}
          ref={correctAudio as LegacyRef<HTMLAudioElement>}
        />
        <audio
          src={getAssetsUrl('files/01_0002.mp3')}
          ref={inCorrectAudio as LegacyRef<HTMLAudioElement>}
        />
      </>
      {sprintGameState.gameStatus === SprintGameStatus.PREPARE && (
        <SprintMenu onClick={startHandler} />
      )}
      {sprintGameState.gameStatus === SprintGameStatus.INRUN && (
        <div>
          <div>{currentQuestion.word}</div>
          <div>{currentQuestion.answer}</div>
          <SprintButton type="button" onClick={() => answerHandler(false)}>
            InCorrect
          </SprintButton>
          <SprintButton onClick={() => answerHandler(true)}>
            Correct
          </SprintButton>
        </div>
      )}
      {sprintGameState.gameStatus === SprintGameStatus.END && (
        <>
          <Results
            correct={correctAnswers.map(item => (
              <ResultLine
                audio={item.audio}
                translate={item.translate}
                word={item.word}
                key={item.wordId}
              />
            ))}
            incorrect={inCorrectAnswers.map(item => (
              <ResultLine
                audio={item.audio}
                translate={item.translate}
                word={item.word}
                key={item.wordId}
              />
            ))}
          />
          <button type="button" onClick={restartHandler}>
            Restart
          </button>
        </>
      )}
    </StyledBox>
  );
};

export default SprintPage;
