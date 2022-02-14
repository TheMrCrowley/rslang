/* eslint-disable jsx-a11y/media-has-caption */
import { Box, Typography } from '@mui/material';
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
import useTypedSelector from '../../hooks/useTypedSelector';
import getRandomNumber from '../../helpers/getRandomNumber';
import {
  compareAnswers,
  getQuestionItems,
  SprintQuestionItem,
} from './SprintModel';

import {
  changeSprintStatusAction,
  requestSprintDataAction,
  resetSprintStateAction,
  sprintCorrectAction,
  sprintInCorrectAction,
} from '../../redux/store/reducers/sprintGameReducer';
import { SprintGameStatus } from '../../redux/types/sprintTypes';
import SprintMenu from './SprintMenu';
import ResultLine from './ResultLine';
import Results from './Results';
import getAssetsUrl from '../../helpers/getAssetsUrl';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import {
  colors,
  darkColors,
  darkCorrectColor,
  darkIncorrectColor,
} from '../e-book/cosnstants';
import { isNewWord } from '../../helpers/statisticHandlers';
import { changeSprintNewWordAction } from '../../redux/store/reducers/statisticReducer';
import ElementsToCenterWrapper from '../ui/ElementsToCenterWrapper';
import GameWhiteContent from '../ui/GameWhiteContent';
import CountDown from '../ui/CountDown';
import GamePageWrapper from '../ui/GamePageWrapper';
import SprintInGameUpAssets from '../ui/SprintInGameUpAssets';

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
    dispatch(requestSprintDataAction({ group, page: randomPage }));
  };

  const restartHandler = useCallback(() => {
    const { group, page } = sprintGameState;
    dispatch(requestSprintDataAction({ group, page }));
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
      if (isNewWord(userWords, wordId)) {
        dispatch(changeSprintNewWordAction());
      }
      if (isCorrect) {
        dispatch(sprintCorrectAction({ userId, wordId, words: userWords }));
      } else {
        dispatch(sprintInCorrectAction({ userId, wordId, words: userWords }));
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

  const { group } = sprintGameState;

  if (sprintGameState.request) {
    return <StyledProgress />;
  }

  return (
    <GamePageWrapper color={colors[group]}>
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
        <>
          <SprintInGameUpAssets color={darkColors[group]}>
            <Typography
              variant="h4"
              color="white"
              fontWeight="bold"
              component="span"
            >
              Points: 0
            </Typography>
            <CountDown />
          </SprintInGameUpAssets>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              mb: '2rem',
            }}
          >
            <ElementsToCenterWrapper>
              <GameWhiteContent>{currentQuestion.word}</GameWhiteContent>
            </ElementsToCenterWrapper>
            <ElementsToCenterWrapper>
              <GameWhiteContent>{currentQuestion.answer}</GameWhiteContent>
            </ElementsToCenterWrapper>
          </Box>
          <ElementsToCenterWrapper>
            <MainPageLayoutButton
              color={darkIncorrectColor}
              onClick={() => answerHandler(false)}
              text="incorrect"
            />
            <MainPageLayoutButton
              color={darkCorrectColor}
              onClick={() => answerHandler(true)}
              text="correct"
            />
          </ElementsToCenterWrapper>
        </>
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
                color={darkCorrectColor}
              />
            ))}
            incorrect={inCorrectAnswers.map(item => (
              <ResultLine
                audio={item.audio}
                translate={item.translate}
                word={item.word}
                key={item.wordId}
                color={darkIncorrectColor}
              />
            ))}
            correctNum={correctAnswers.length}
            incorrectNum={inCorrectAnswers.length}
          />
          <MainPageLayoutButton
            color={darkColors[group]}
            onClick={restartHandler}
            text="Play again"
          />
        </>
      )}
    </GamePageWrapper>
  );
};

export default SprintPage;
