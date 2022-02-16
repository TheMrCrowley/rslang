import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { AuthState } from '../../redux/types/authTypes';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAudio from '../../hooks/useAudio';
import getAssetsUrl from '../../helpers/getAssetsUrl';
import {
  AudioCallQuestionItem,
  getAudiCallQuestionItems,
} from './audioCallModel';
import { isNewWord } from '../../helpers/statisticHandlers';
import { changeAudioCallNewWordAction } from '../../redux/store/reducers/statisticReducer';
import {
  audiocallCorrectAction,
  audiocallInCorrectAction,
  changeAudiocallPageAction,
  changeAudioCallStatusAction,
} from '../../redux/store/reducers/audioCallReducer';
import WordsService from '../../services/words/wordsService';
import { AudioCallGameStatus } from '../../redux/types/audioCallTypes';
import { darkColors, darkCorrectColor } from '../e-book/cosnstants';
import { WordWithCustomProps } from '../../services/words/wordsServiceTypes';
import { compareAnswers } from '../../helpers/gameHelpers';

const useAudiocallQuestion = (
  auth: AuthState,
  correctAnswer: (answer: AudioCallQuestionItem) => void,
  incorrectAnswer: (answer: AudioCallQuestionItem) => void
) => {
  const correctAudio = useAudio(
    'https://rslang-team15-natein.netlify.app/static/media/correct.a7b1cde9.mp3'
  );
  const inCorrectAudio = useAudio(
    'https://rslang-team15-natein.netlify.app/static/media/wrong.8e2ad3b1.mp3'
  );

  const dispatch = useDispatch();

  const { words, group, book, currentPage } = useTypedSelector(
    store => store.audioCallGame
  );

  const { userWords } = useTypedSelector(store => store.userWords);

  const [questions, setQuestions] = useState<AudioCallQuestionItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<AudioCallQuestionItem>(
    {} as AudioCallQuestionItem
  );
  const [afterAnswerState, setAfterAnswerState] = useState(false);

  const currentAudio = useCallback(() => {
    if (currentQuestion.audio) {
      const sound = new Audio(getAssetsUrl(currentQuestion.audio));
      return sound.play();
    }
    return function () {};
  }, [currentQuestion.audio]);

  const nextQuestion = () => {
    setAfterAnswerState(false);
    setQuestions(prev => {
      setCurrentQuestion(prev.pop() as AudioCallQuestionItem);
      return prev;
    });
  };

  useEffect(() => {
    if (words.length) {
      setQuestions(getAudiCallQuestionItems(words));
      nextQuestion();
    }
  }, []);

  useEffect(() => {
    if (currentQuestion.audio) {
      currentAudio();
    }
  }, [currentQuestion]);

  const answerHandler = (answer: string) => {
    const isCorrect = compareAnswers(currentQuestion.answer, answer);
    const { userId } = auth.userData;
    if (auth.isAuth) {
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
      correctAnswer(currentQuestion);
      correctAudio();
    } else {
      incorrectAnswer(currentQuestion);
      inCorrectAudio();
    }
    if (questions.length) {
      setAfterAnswerState(true);
    } else {
      const newPage = currentPage - 1;
      dispatch(changeAudiocallPageAction());
      if (newPage >= 0) {
        if (book) {
          WordsService.getNotStudiedWords(userId, group, newPage).then(data => {
            if (data.length) {
              setQuestions(getAudiCallQuestionItems(data));
              nextQuestion();
            } else {
              dispatch(changeAudioCallStatusAction(AudioCallGameStatus.END));
            }
          });
        } else {
          WordsService.getWords(group, newPage).then(data => {
            if (data.length) {
              setQuestions(
                getAudiCallQuestionItems(data as WordWithCustomProps[])
              );
              nextQuestion();
            } else {
              dispatch(changeAudioCallStatusAction(AudioCallGameStatus.END));
            }
          });
        }
      } else {
        dispatch(changeAudioCallStatusAction(AudioCallGameStatus.END));
      }
    }
  };

  const changeButtonColor = (answer: string | boolean): string => {
    if (!afterAnswerState) {
      return darkColors[group];
    }
    if (compareAnswers(currentQuestion.answer, answer)) {
      return darkCorrectColor;
    }
    return darkColors[group];
  };

  const giveAnswer = (answerText: string) => answerHandler(answerText);
  // TODO add keyboard events
  return {
    word: currentQuestion.word || '',
    answers: currentQuestion.answers || [],
    image: currentQuestion.imgSrc || '',
    giveAnswer,
    changeButtonColor,
    afterAnswerState,
    nextQuestion,
    currentAudio,
    group,
  };
};

export default useAudiocallQuestion;
