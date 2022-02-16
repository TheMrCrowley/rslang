import React, { FC, useMemo } from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useAudiocallQuestion from './useAudiocallQuestion';
import { AuthState } from '../../redux/types/authTypes';
import { AudioCallQuestionItem } from './audioCallModel';
import AudiocallInGameUpAssets from '../ui/AudiocallInGameUpAssets';
import { darkColors } from '../e-book/cosnstants';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import AudiocallInGameBottomAssets from '../ui/AudiocallInGameBottomAssets';
import getAssetsUrl from '../../helpers/getAssetsUrl';

interface AudiocallQuestionProps {
  auth: AuthState;
  correctAnswer: (answer: AudioCallQuestionItem) => void;
  incorrectAnswer: (answer: AudioCallQuestionItem) => void;
}

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
  // const answerButtons = useMemo(() => {
  //   return answers.map(answerItem => (
  //     <MainPageLayoutButton
  //       key={answerItem}
  //       onClick={() => giveAnswer(answerItem)}
  //       color={changeButtonColor(answerItem)}
  //       text={answerItem}
  //       disabled={afterAnswerState}
  //     />
  //   ));
  // }, [answers, afterAnswerState, changeButtonColor]);
  return (
    <>
      {/* <AudiocallInGameUpAssets */}
      {/*  status={afterAnswerState} */}
      {/*  onClick={currentAudio} */}
      {/*  color={darkColors[group]} */}
      {/*  image={image} */}
      {/*  word={word} */}
      {/* /> */}
      {/* <ButtonWrapper>{answerButtons}</ButtonWrapper> */}
      {/* <AudiocallInGameBottomAssets */}
      {/*  disabled={!afterAnswerState} */}
      {/*  onClick={nextQuestion} */}
      {/*  group={group} */}
      {/* /> */}
    </>
  );
};

export default AudiocallQuestion;
