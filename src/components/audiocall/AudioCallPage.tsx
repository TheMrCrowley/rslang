import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ReactAudioPlayer from 'react-audio-player';
import useTypedSelector from '../../hooks/useTypedSelector';
import getAssetsUrl from '../../helpers/getAssetsUrl';
import SprintMenu from '../sprint/SprintMenu';
import Results from '../sprint/Results';
import ResultLine from '../sprint/ResultLine';
import { AudioCallGameStatus } from '../../redux/types/audioCallTypes';
import {
  AudioCallQuestionItem,
  getAudiCallQuestionItems,
} from './audioCallModel';
import getRandomNumber from '../../helpers/getRandomNumber';
import {
  audiocallCorrectAction,
  audiocallInCorrectAction,
  changeAudioCallStatusAction,
  requestAudioCallDataAction,
  resetAudioCallStateAction,
} from '../../redux/store/reducers/audioCallReducer';
import { compareAnswers } from '../sprint/SprintModel';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import { colors, darkColors } from '../e-book/cosnstants';
import { isNewWord } from '../../helpers/statisticHandlers';
import { changeAudioCallNewWordAction } from '../../redux/store/reducers/statisticReducer';
import AudicallInGameBottomAssets from '../ui/AudiocallInGameBottomAssets';
import AudicallInGameUpAssets from '../ui/AudiocallInGameUpAssets';

const StyledBox = styled(Box)`
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3.5rem;
`;

const StyledGameContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  gap: 1em;
`;

const StyledProgress = styled(CircularProgress)`
  color: #202026;
  width: 100px;
  height: 100px;
`;

const AudioCallPage = () => {
  const correctAudio = useRef() as RefObject<ReactAudioPlayer>;
  const inCorrectAudio = useRef() as RefObject<ReactAudioPlayer>;
  const questionAudio = useRef<HTMLAudioElement>();

  const { userWords } = useTypedSelector(store => store.userWords);
  const authState = useTypedSelector(store => store.auth);
  const audioCallState = useTypedSelector(store => store.audioCallGame);
  const dispatch = useDispatch();

  const [currentQuestion, setCurrentQuestion] = useState<AudioCallQuestionItem>(
    {} as AudioCallQuestionItem
  );
  const [gameQuestions, setGameQuestions] = useState<AudioCallQuestionItem[]>([
    {} as AudioCallQuestionItem,
  ] as AudioCallQuestionItem[]);
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
    const { group, page } = audioCallState;
    dispatch(requestAudioCallDataAction({ group, page }));
  }, [audioCallState.group, audioCallState.page]);

  const nextQuestion = () => {
    setGameQuestions(prev => {
      setCurrentQuestion(prev.pop() as AudioCallQuestionItem);
      return prev;
    });
    if (questionAudio.current) {
      questionAudio.current.play();
    }
  };

  const showResults = () => {
    dispatch(changeAudioCallStatusAction(AudioCallGameStatus.END));
  };

  const playHandler = (ref: RefObject<ReactAudioPlayer>) => {
    if (ref.current) {
      ref.current.audioEl.current?.play();
    }
  };

  const answerHandler = (answer: boolean | string) => {
    const isCorrect = compareAnswers(currentQuestion.answer, answer);
    if (authState.isAuth) {
      const { userId } = authState.userData;
      const { wordId } = currentQuestion;
      if (isNewWord(userWords, wordId)) {
        dispatch(changeAudioCallNewWordAction());
      }
      if (isCorrect) {
        dispatch(audiocallCorrectAction({ userId, wordId, words: userWords }));
      } else {
        dispatch(
          audiocallInCorrectAction({ userId, wordId, words: userWords })
        );
      }
    }
    if (isCorrect) {
      setCorrectAnswers(prev => [...prev, { ...currentQuestion }]);
      playHandler(correctAudio);
    } else {
      setInCorrectAnswers(prev => [...prev, { ...currentQuestion }]);
      playHandler(inCorrectAudio);
    }
    if (gameQuestions.length) {
      nextQuestion();
    } else {
      showResults();
    }
  };

  useEffect(() => {
    if (gameQuestions.length) {
      dispatch(changeAudioCallStatusAction(AudioCallGameStatus.INRUN));
    }
  }, [gameQuestions.length, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetAudioCallStateAction());
    };
  }, []);

  useMemo(() => {
    setGameQuestions(getAudiCallQuestionItems(audioCallState.words));
    nextQuestion();
  }, [audioCallState.words]);

  if (audioCallState.request) {
    return <StyledProgress />;
  }

  const { group } = audioCallState;

  return (
    <StyledBox sx={{ backgroundColor: colors[group] }}>
      <>
        <ReactAudioPlayer
          src="https://rslang-team15-natein.netlify.app/static/media/correct.a7b1cde9.mp3"
          ref={correctAudio}
        />
        <ReactAudioPlayer
          src="https://rslang-team15-natein.netlify.app/static/media/wrong.8e2ad3b1.mp3"
          ref={inCorrectAudio}
        />
      </>
      {audioCallState.gameStatus === AudioCallGameStatus.PREPARE && (
        <SprintMenu onClick={startHandler} />
      )}
      {audioCallState.gameStatus === AudioCallGameStatus.INRUN && (
        <div>
          <ReactAudioPlayer
            src={getAssetsUrl(currentQuestion.audio)}
            autoPlay
          />
          <StyledGameContainer>
            <AudicallInGameUpAssets color={darkColors[group]} />
            <ButtonWrapper>
              {currentQuestion.answers.map(answerItem => (
                <MainPageLayoutButton
                  key={answerItem}
                  onClick={() => answerHandler(answerItem)}
                  color={darkColors[group]}
                  text={answerItem}
                />
              ))}
            </ButtonWrapper>
            <AudicallInGameBottomAssets color={darkColors[group]} />
          </StyledGameContainer>
        </div>
      )}
      {audioCallState.gameStatus === AudioCallGameStatus.END && (
        <>
          <Results
            correct={correctAnswers.map(item => (
              <ResultLine
                audio={item.audio}
                translate={item.answer}
                word={item.word}
                key={item.wordId}
              />
            ))}
            incorrect={inCorrectAnswers.map(item => (
              <ResultLine
                audio={item.audio}
                translate={item.answer}
                word={item.word}
                key={item.wordId}
              />
            ))}
            group={group}
          />
          <button type="button" onClick={restartHandler}>
            Restart
          </button>
        </>
      )}
    </StyledBox>
  );
};

export default AudioCallPage;
