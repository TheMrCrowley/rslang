import { useMemo } from 'react';
import useTypedSelector from './useTypedSelector';
import { DIFFICULT_GROUP } from '../components/e-book/cosnstants';

const useLearnedPage = (group: number) => {
  const { words } = useTypedSelector(state => state.words);
  const isLearnedPage = useMemo(() => {
    return words.every(
      wordItem =>
        wordItem.userWord?.difficulty === 'studied' ||
        wordItem.userWord?.difficulty === 'hard'
    );
  }, [words, group]);
  if (group === DIFFICULT_GROUP) {
    return false;
  }
  return isLearnedPage;
};

export default useLearnedPage;
