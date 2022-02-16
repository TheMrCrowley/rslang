import { WordWithCustomProps } from '../services/words/wordsServiceTypes';

export const updateWords = (
  words: WordWithCustomProps[],
  newWord: WordWithCustomProps
) => {
  const oldWordIndex = words.findIndex(word => word._id === newWord._id);
  if (oldWordIndex) {
    words.splice(oldWordIndex, 1, newWord);
    return words;
  }
  return [...words, newWord];
};

export const removeHardWord = (
  hardWords: WordWithCustomProps[],
  hardWord: WordWithCustomProps
): WordWithCustomProps[] => {
  const newHard = hardWords.filter(word => word._id !== hardWord._id);
  return newHard;
};
