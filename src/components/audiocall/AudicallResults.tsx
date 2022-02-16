import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography } from '@mui/material';
import {
  darkColors,
  darkCorrectColor,
  darkIncorrectColor,
} from '../e-book/cosnstants';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import ResultLine from '../sprint/ResultLine';
import { AudioCallQuestionItem } from '../../helpers/gameHelpers';

const ResultsWrapper = styled(Box)`
  height: 65vh;
  margin-bottom: 1rem;
  padding: 2.5rem 1rem 2.5rem 2.5rem;
  background-color: white;
  border-radius: 2em;
  min-width: 25%;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-right: 1.5rem;
  background-color: white;
  overflow: auto;
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

interface ResultsProps {
  correctAnswers: AudioCallQuestionItem[];
  inCorrectAnswers: AudioCallQuestionItem[];
  restartHandler: () => void;
  backHandler: () => void;
  group: number;
}
const AudiocallResults: FC<ResultsProps> = ({
  correctAnswers,
  inCorrectAnswers,
  restartHandler,
  group,
  backHandler,
}) => {
  const correct = correctAnswers.map(item => (
    <ResultLine
      audio={item.audio}
      translate={item.answer}
      word={item.word}
      key={item.wordId}
      color={darkCorrectColor}
    />
  ));
  const incorrect = inCorrectAnswers.map(item => (
    <ResultLine
      audio={item.audio}
      translate={item.answer}
      word={item.word}
      key={item.wordId}
      color={darkIncorrectColor}
    />
  ));
  return (
    <>
      <ResultsWrapper>
        <StyledBox>
          <Typography variant="h4" color={darkCorrectColor}>
            Correct: {correctAnswers.length}
          </Typography>
          {correct}
          <Divider />
          <Typography variant="h4" color={darkIncorrectColor}>
            Incorrect: {inCorrectAnswers.length}
          </Typography>
          {incorrect}
        </StyledBox>
      </ResultsWrapper>
      <ButtonWrapper>
        <MainPageLayoutButton
          color={darkColors[group]}
          onClick={restartHandler}
          text="Play again"
        />
        <MainPageLayoutButton
          color={darkColors[group]}
          onClick={backHandler}
          text="Back to games"
        />
      </ButtonWrapper>
    </>
  );
};

export default AudiocallResults;
