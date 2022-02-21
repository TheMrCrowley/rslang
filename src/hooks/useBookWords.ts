import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import useTypedSelector from './useTypedSelector';
import {
  requestHardWordsAction,
  requestWordsAction,
  requestWordsWithPropsAction,
} from '../redux/store/reducers/wordsReducer';
import useBookParams from './useBookParams';
import { DIFFICULT_GROUP } from '../components/e-book/cosnstants';

const useBookWords = (isAuth: boolean, userId?: string) => {
  const { words, request, hardWords } = useTypedSelector(state => state.words);
  const [cards, setCards] = useState(words);
  const { group, page } = useBookParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (group >= 0 && page >= 0) {
      if (isAuth && userId) {
        // TODO magic number
        if (group === DIFFICULT_GROUP) {
          dispatch(requestHardWordsAction({ userId }));
        } else {
          dispatch(
            requestWordsWithPropsAction({
              group,
              page,
              userId,
            })
          );
        }
      } else {
        dispatch(requestWordsAction({ group, page }));
      }
    }
  }, [page, group, isAuth]);

  useEffect(() => {
    if (words.length) {
      setCards(words);
    }
  }, [words]);

  // const cards = useMemo(() => words, [words]);
  const hardCards = useMemo(() => hardWords, [hardWords]);

  if (group === DIFFICULT_GROUP) {
    return {
      cards: hardCards,
      request,
    };
  }
  return {
    cards,
    request,
  };
};

export default useBookWords;
