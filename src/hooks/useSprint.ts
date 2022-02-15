import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import useTypedSelector from './useTypedSelector';
import {
  compareAnswers,
  getQuestionItems,
  SprintQuestionItem,
} from '../components/sprint/SprintModel';
import { isNewWord } from '../helpers/statisticHandlers';
import { changeSprintNewWordAction } from '../redux/store/reducers/statisticReducer';
import {
  changeSprintStatusAction,
  sprintCorrectAction,
  sprintInCorrectAction,
} from '../redux/store/reducers/sprintGameReducer';
import WordsService from '../services/words/wordsService';
import { SprintGameStatus } from '../redux/types/sprintTypes';
import { AuthState } from '../redux/types/authTypes';

const useSprint = (
  auth: AuthState,
  correctAnswer: (answer: SprintQuestionItem) => void,
  incorrectAnswer: (answer: SprintQuestionItem) => void,
  audioHandler: (isCorrect: boolean) => void
) => {
  const dispatch = useDispatch();
  const { words, group, page, book } = useTypedSelector(
    store => store.sprintGame
  );
  const { userWords } = useTypedSelector(store => store.userWords);

  const [currentPage, setCurrentPage] = useState(page);
  const [questions, setQuestions] = useState<SprintQuestionItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<SprintQuestionItem>(
    {} as SprintQuestionItem
  );

  // handle streak for points
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);

  const nextQuestion = () => {
    setQuestions(prev => {
      setCurrentQuestion(prev.pop() as SprintQuestionItem);
      return prev;
    });
  };

  useEffect(() => {
    setQuestions(getQuestionItems(words));
    nextQuestion();
  }, [words]);

  // TODO divide this fck big function
  const answerHandler = (answer: boolean) => {
    const isCorrect = compareAnswers(currentQuestion.isCorrect, answer);
    const { userId } = auth.userData;
    if (auth.isAuth) {
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
      correctAnswer(currentQuestion);

      audioHandler(true);
      setStreak(streak + 1);
      setPoints(points + (Math.floor(streak / 3) * 10 || 10));
    } else {
      setStreak(0);
      incorrectAnswer(currentQuestion);
      audioHandler(false);
    }
    if (questions.length) {
      nextQuestion();
    } else {
      setCurrentPage(currentPage - 1);
      if (currentPage >= 0) {
        if (book) {
          WordsService.getNotStudiedWords(userId, group, currentPage).then(
            data => {
              setQuestions(getQuestionItems(data));
              nextQuestion();
            }
          );
        } else {
          WordsService.getWords(group, currentPage).then(data => {
            setQuestions(getQuestionItems(data));
            nextQuestion();
          });
        }
      } else {
        dispatch(changeSprintStatusAction(SprintGameStatus.END));
      }
    }
  };

  const confirmAnswer = () => answerHandler(true);
  const declineAnswer = () => answerHandler(false);

  useEffect(() => {
    const answerByKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        answerHandler(false);
      }
      if (e.key === 'ArrowRight') {
        answerHandler(true);
      }
    };
    window.addEventListener('keydown', answerByKey);
    return () => {
      window.removeEventListener('keydown', answerByKey);
    };
  }, [answerHandler]);

  return {
    word: currentQuestion.word,
    answer: currentQuestion.answer,
    confirm: confirmAnswer,
    decline: declineAnswer,
    group,
    points: useMemo(() => points, [points]),
  };
};

export default useSprint;
