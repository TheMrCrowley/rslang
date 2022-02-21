import { useMemo } from 'react';
import useTypedSelector from './useTypedSelector';
import { DIFFICULT_GROUP } from '../components/e-book/cosnstants';

const useLearnedPage = (group: number) => {
  const { words, hardWords } = useTypedSelector(state => state.words);
  const isLearnedPage = useMemo(() => {
    if (group !== DIFFICULT_GROUP) {
      return words.every(
        wordItem =>
          wordItem.userWord?.difficulty === 'studied' ||
          wordItem.userWord?.difficulty === 'hard'
      );
    }
    return false;
  }, [words, group, hardWords]);
  if (group === DIFFICULT_GROUP && !hardWords.length) {
    return true;
  }
  return isLearnedPage;
};

export default useLearnedPage;
