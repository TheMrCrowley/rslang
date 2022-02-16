import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import useTypedSelector from './useTypedSelector';
import {
  requestHardWordsAction,
  requestWordsAction,
  requestWordsWithPropsAction,
} from '../redux/store/reducers/wordsReducer';
import useBookParams from './useBookParams';

const useBookWords = (isAuth: boolean, userId?: string) => {
  const { words, request, hardWords } = useTypedSelector(state => state.words);
  const { group, page } = useBookParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (group && page) {
      if (isAuth && userId) {
        // TODO magic number
        if (group === 7) {
          dispatch(requestHardWordsAction({ userId }));
        } else {
          dispatch(
            requestWordsWithPropsAction({
              group: group - 1,
              page: page - 1,
              userId,
            })
          );
        }
      } else {
        dispatch(requestWordsAction({ group: group - 1, page: page - 1 }));
      }
    }
  }, [page, group, isAuth]);

  const cards = useMemo(() => words, [words]);
  const hardCards = useMemo(() => hardWords, [hardWords]);

  if (group === 7) {
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
