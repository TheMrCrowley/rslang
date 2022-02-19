import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import { isNewWord } from '../../helpers/statisticHandlers';
import { changeSprintNewWordAction } from '../../redux/store/reducers/statisticReducer';
import {
  changeSprintPageAction,
  changeSprintStatusAction,
  sprintCorrectAction,
  sprintInCorrectAction,
} from '../../redux/store/reducers/sprintGameReducer';
import WordsService from '../../services/words/wordsService';
import { SprintGameStatus } from '../../redux/types/sprintTypes';
import { AuthState } from '../../redux/types/authTypes';
import useAudio from '../../hooks/useAudio';
import {
  compareAnswers,
  getAllTranslates,
  getSprintQuestions,
  SprintQuestionItem,
} from '../../helpers/gameHelpers';
import { DIFFICULT_GROUP } from '../e-book/cosnstants';
import { getUserWordsAction } from '../../redux/store/reducers/userWordsReducer';

const useSprintQuestion = (
  auth: AuthState,
  correctAnswer: (answer: SprintQuestionItem) => void,
  incorrectAnswer: (answer: SprintQuestionItem) => void
) => {
  const correctAudio = useAudio(
    'https://rslang-team15-natein.netlify.app/static/media/correct.a7b1cde9.mp3'
  );
  const inCorrectAudio = useAudio(
    'https://rslang-team15-natein.netlify.app/static/media/wrong.8e2ad3b1.mp3'
  );
  const dispatch = useDispatch();
  const { words, group, book, currentPage, allAnswers } = useTypedSelector(
    store => store.sprintGame
  );
  const { userWords } = useTypedSelector(store => store.userWords);

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
    dispatch(getUserWordsAction({ userId: auth.userData.userId }));
    setQuestions(getSprintQuestions(words, allAnswers));
    nextQuestion();
  }, [words]);
  // TODO try move this function on helpers
  const checkPrevPage = (prevPage: number, userId: string) => {
    if (prevPage < 0) {
      dispatch(changeSprintStatusAction(SprintGameStatus.END));
    }
    if (book) {
      Promise.all([
        WordsService.getNotStudiedWords(userId, group, prevPage),
        WordsService.getWords(group, prevPage),
      ]).then(data => {
        if (data[0].length) {
          setQuestions(getSprintQuestions(data[0], getAllTranslates(data[1])));
          nextQuestion();
        } else {
          dispatch(changeSprintPageAction());
          checkPrevPage(prevPage - 1, userId);
        }
      });
    } else {
      WordsService.getWords(group, prevPage).then(data => {
        setQuestions(getSprintQuestions(data, getAllTranslates(data)));
        nextQuestion();
      });
    }
  };

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
      correctAudio();
      setStreak(streak + 1);
      setPoints(points + (Math.floor(streak / 3) * 10 || 10));
    } else {
      setStreak(0);
      incorrectAnswer(currentQuestion);
      inCorrectAudio();
    }
    if (questions.length) {
      nextQuestion();
    } else if (group === DIFFICULT_GROUP) {
      dispatch(changeSprintStatusAction(SprintGameStatus.END));
    } else {
      const newPage = currentPage - 1;
      dispatch(changeSprintPageAction());
      checkPrevPage(newPage, userId);
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
    answer: currentQuestion.fakeAnswer,
    confirm: confirmAnswer,
    decline: declineAnswer,
    group,
    points: useMemo(() => points, [points]),
  };
};

export default useSprintQuestion;
