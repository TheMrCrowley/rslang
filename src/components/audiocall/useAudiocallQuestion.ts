import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { AuthState } from '../../redux/types/authTypes';
import useTypedSelector from '../../hooks/useTypedSelector';
import useAudio from '../../hooks/useAudio';
import getAssetsUrl from '../../helpers/getAssetsUrl';
import {
  audiocallCorrectAction,
  audiocallInCorrectAction,
  changeAudiocallPageAction,
  changeAudioCallStatusAction,
} from '../../redux/store/reducers/audioCallReducer';
import WordsService from '../../services/words/wordsService';
import { AudioCallGameStatus } from '../../redux/types/audioCallTypes';
import {
  darkColors,
  darkCorrectColor,
  DIFFICULT_GROUP,
} from '../e-book/cosnstants';
import {
  AudioCallQuestionItem,
  compareAnswers,
  getAllTranslates,
  getAudioCallQuestions,
} from '../../helpers/gameHelpers';
import { getUserWordsAction } from '../../redux/store/reducers/userWordsReducer';

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

  const { words, group, book, currentPage, allAnswers } = useTypedSelector(
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
    dispatch(getUserWordsAction({ userId: auth.userData.userId }));
    setQuestions(getAudioCallQuestions(words, allAnswers));
    nextQuestion();
  }, []);
  useEffect(() => {
    if (currentQuestion.audio) {
      currentAudio();
    }
  }, [currentQuestion]);

  const checkPrevPage = (prevPage: number, userId: string) => {
    if (prevPage < 0) {
      dispatch(changeAudioCallStatusAction(AudioCallGameStatus.END));
    }
    if (book) {
      Promise.all([
        WordsService.getNotStudiedWords(userId, group, prevPage),
        WordsService.getWords(group, prevPage),
      ]).then(data => {
        if (data[0].length) {
          setQuestions(
            getAudioCallQuestions(data[0], getAllTranslates(data[1]))
          );
          setAfterAnswerState(true);
        } else {
          dispatch(changeAudiocallPageAction());
          checkPrevPage(prevPage - 1, userId);
        }
      });
    } else {
      WordsService.getWords(group, prevPage).then(data => {
        setQuestions(getAudioCallQuestions(data, getAllTranslates(data)));
      });
    }
  };

  const answerHandler = (answer: string) => {
    const isCorrect = compareAnswers(currentQuestion.answer, answer);
    const { userId } = auth.userData;
    if (auth.isAuth) {
      const { wordId } = currentQuestion;
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
    } else if (group === DIFFICULT_GROUP) {
      dispatch(changeAudioCallStatusAction(AudioCallGameStatus.END));
    } else {
      const newPage = currentPage - 1;
      dispatch(changeAudiocallPageAction());
      checkPrevPage(newPage, userId);
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
  useEffect(() => {
    const answerByKey = (e: KeyboardEvent) => {
      if (e.key === '1') {
        answerHandler(currentQuestion.answers[0]);
      }
      if (e.key === '2') {
        answerHandler(currentQuestion.answers[1]);
      }
      if (e.key === '3') {
        answerHandler(currentQuestion.answers[2]);
      }
      if (e.key === '4') {
        answerHandler(currentQuestion.answers[3]);
      }
      if (e.key === '2') {
        answerHandler(currentQuestion.answers[1]);
      }
      if (e.key === ' ' && afterAnswerState) {
        nextQuestion();
      }
      if (e.key === 'r') {
        currentAudio();
      }
    };
    window.addEventListener('keydown', answerByKey);
    return () => {
      window.removeEventListener('keydown', answerByKey);
    };
  }, [answerHandler]);

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
