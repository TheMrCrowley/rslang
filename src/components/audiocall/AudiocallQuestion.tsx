import React, { FC, useMemo } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import useAudiocallQuestion from './useAudiocallQuestion';
import { AuthState } from '../../redux/types/authTypes';
import AudiocallInGameUpAssets from '../ui/AudiocallInGameUpAssets';
import { darkColors } from '../e-book/cosnstants';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import AudiocallInGameBottomAssets from '../ui/AudiocallInGameBottomAssets';
import { AudioCallQuestionItem } from '../../helpers/gameHelpers';

interface AudiocallQuestionProps {
  auth: AuthState;
  correctAnswer: (answer: AudioCallQuestionItem) => void;
  incorrectAnswer: (answer: AudioCallQuestionItem) => void;
}

const QuestionWrapper = styled(Box)`
  flex: 1 1 auto;
  display: grid;
  grid-template-rows: 0.8fr 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
  padding: 1rem;
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  gap: 1em;
`;

const AudiocallQuestion: FC<AudiocallQuestionProps> = ({
  auth,
  correctAnswer,
  incorrectAnswer,
}) => {
  const {
    word,
    answers,
    group,
    giveAnswer,
    afterAnswerState,
    changeButtonColor,
    image,
    nextQuestion,
    currentAudio,
  } = useAudiocallQuestion(auth, correctAnswer, incorrectAnswer);

  //
  const answerButtons = useMemo(() => {
    return answers.map(answerItem => (
      <MainPageLayoutButton
        key={answerItem}
        onClick={() => giveAnswer(answerItem)}
        color={changeButtonColor(answerItem)}
        text={answerItem}
        disabled={afterAnswerState}
      />
    ));
  }, [answers, afterAnswerState, changeButtonColor]);
  return (
    <QuestionWrapper>
      <AudiocallInGameUpAssets
        status={afterAnswerState}
        onClick={currentAudio}
        color={darkColors[group]}
        image={image}
        word={word}
      />
      <ButtonWrapper>{answerButtons}</ButtonWrapper>
      <AudiocallInGameBottomAssets
        disabled={!afterAnswerState}
        onClick={nextQuestion}
        group={group}
      />
    </QuestionWrapper>
  );
};

export default AudiocallQuestion;
