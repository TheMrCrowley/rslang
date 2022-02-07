import { Box, Button } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { RootState } from '../../redux/store';
import { requestWordsAction } from '../../redux/store/reducers/wordsReducer';
import BasicSelect from '../e-book/ui/select/BasicSelect';
import {
  Word,
  WordWithCustomProps,
} from '../../services/words/wordsServiceTypes';
import {
  correctAnswerAction,
  incorrectAnswerAction,
} from '../../redux/store/reducers/userWordsReducer';
import requestMethodChoiser from '../../helpers/requestMethodChoiser';
import useTypedSelector from '../../hooks/useTypedSelector';
import getRandomNumber from '../../helpers/getRandomNumber';
import { compareAnswers, getQuestionItems } from './SprintModel';
import SprintButton from './SprintButton';

interface SprintPageProps {
  words?: Word[] | WordWithCustomProps[];
}

const StyledBox = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SprintPage: FC<SprintPageProps> = ({ words }) => {
  const [gameStatus, setGameStatus] = useState<'prepare' | 'run' | 'end'>(
    'prepare'
  );
  const [group, setGroup] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const dispatch = useDispatch();
  const { userWords } = useTypedSelector(store => store.userWords);
  const authState = useTypedSelector(store => store.auth);
  const wordsState = useSelector((store: RootState) => store.words);

  const gameWords = useMemo(() => {
    return getQuestionItems(wordsState.words);
  }, [wordsState]);

  const answerHandler = (answer: boolean) => {
    const isCorrect = compareAnswers(
      gameWords[currentQuestion].isCorrect,
      answer
    );
    if (authState.isAuth) {
      const { userId } = authState.userData;
      const { wordId } = gameWords[currentQuestion];
      const method = requestMethodChoiser(userWords, wordId);
      if (isCorrect) {
        dispatch(correctAnswerAction({ userId, wordId, method }));
      } else {
        dispatch(incorrectAnswerAction({ userId, wordId, method }));
      }
    }
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
    setCurrentQuestion(prev => prev + 1);
  };

  const startHandler = () => {
    const randomPage = getRandomNumber(0, 29);
    setCurrentQuestion(0);
    dispatch(requestWordsAction({ group, page: randomPage }));
  };

  useEffect(() => {
    if (gameWords.length) {
      setGameStatus('run');
    }
  }, [gameWords]);

  useMemo(() => {
    if (currentQuestion >= gameWords.length - 1 && currentQuestion !== 0) {
      setGameStatus('end');
    }
  }, [currentQuestion, gameWords]);
  return (
    <StyledBox>
      {gameStatus === 'prepare' && (
        <>
          <BasicSelect setGroup={setGroup} group={group} />
          <Button onClick={startHandler}>Start</Button>
        </>
      )}
      {gameStatus === 'run' && (
        <div>
          <div>{gameWords[currentQuestion].word}</div>
          <div>{gameWords[currentQuestion].answer}</div>
          <SprintButton type="button" onClick={() => answerHandler(false)}>
            InCorrect
          </SprintButton>
          <SprintButton onClick={() => answerHandler(true)}>
            Correct
          </SprintButton>
        </div>
      )}
      {gameStatus === 'end' && (
        <div>{`${correctAnswers}/${gameWords.length}`}</div>
      )}
    </StyledBox>
  );
};

export default SprintPage;
