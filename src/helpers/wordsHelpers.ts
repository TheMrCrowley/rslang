import { WordWithCustomProps } from '../services/words/wordsServiceTypes';

export const updateWords = (
  words: WordWithCustomProps[],
  newWord: WordWithCustomProps
) => {
  return words.map(word => {
    if (word._id === newWord._id) {
      return newWord;
    }
    return word;
  });
};

export const removeHardWord = (
  hardWords: WordWithCustomProps[],
  hardWord: WordWithCustomProps
): WordWithCustomProps[] => {
  return hardWords.filter(word => word._id !== hardWord._id);
};
