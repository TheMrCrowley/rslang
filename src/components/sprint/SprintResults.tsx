import React, { useState } from 'react';
import { SprintQuestionItem } from './SprintModel';

const SprintResults = () => {
  const [correctAnswers, setCorrectAnswers] = useState<SprintQuestionItem[]>(
    []
  );
  const [incorrectAnswers, setIncorrectAnswers] = useState<
    SprintQuestionItem[]
  >([]);
  return <div />;
};

export default SprintResults;
