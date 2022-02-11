import { Box, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isNewWord } from '../../helpers/statisticHandlers';
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  changeSprintStatusAction,
  setWordsSectionAction,
  sprintCorrectAction,
  sprintInCorrectAction,
} from '../../redux/store/reducers/sprintGameReducer';
import { changeSprintNewWordAction } from '../../redux/store/reducers/statisticReducer';
import { AuthState } from '../../redux/types/authTypes';
import { SprintGameStatus } from '../../redux/types/sprintTypes';
import WordsService from '../../services/words/wordsService';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import {
  compareAnswers,
  getQuestionItems,
  SprintQuestionItem,
} from './SprintModel';
import SprintTimer from './SprintTimer';

interface SprintQuestionProps {
  auth: AuthState;
  correctAnswer: (answer: SprintQuestionItem) => void;
  incorrectAnswer: (answer: SprintQuestionItem) => void;
  audioHandler: (isCorrect: boolean) => void;
}

const SprintQuestion: FC<SprintQuestionProps> = ({
  auth,
  audioHandler,
  correctAnswer,
  incorrectAnswer,
}) => {
  const dispatch = useDispatch();
  const { words, group, page } = useTypedSelector(store => store.sprintGame);
  const { userWords } = useTypedSelector(store => store.userWords);

  const [questions, setQuestions] = useState<SprintQuestionItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<SprintQuestionItem>(
    {} as SprintQuestionItem
  );

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

  const answerHandler = (answer: boolean) => {
    const isCorrect = compareAnswers(currentQuestion.isCorrect, answer);
    if (auth.isAuth) {
      const { userId } = auth.userData;
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
    } else {
      incorrectAnswer(currentQuestion);
      audioHandler(false);
    }
    if (questions.length) {
      nextQuestion();
    } else {
      const newPage = page - 1;
      if (page >= 0) {
        dispatch(setWordsSectionAction({ group, page: newPage }));
        WordsService.getWords(group, newPage).then(data => {
          setQuestions(getQuestionItems(data));
          nextQuestion();
        });
      } else {
        dispatch(changeSprintStatusAction(SprintGameStatus.END));
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keypress');
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SprintTimer />
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          gap: '1em',
          color: 'white',
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          {currentQuestion.word} = {currentQuestion.answer}?
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <MainPageLayoutButton
          color="#ff1744"
          onClick={() => answerHandler(false)}
          text="incorrect"
        />
        <MainPageLayoutButton
          color="#00e576"
          onClick={() => answerHandler(true)}
          text="correct"
        />
      </Box>
    </Box>
  );
};

export default SprintQuestion;
