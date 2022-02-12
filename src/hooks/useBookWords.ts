import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import useTypedSelector from './useTypedSelector';
import {
  requestWordsAction,
  requestWordsWithPropsAction,
} from '../redux/store/reducers/wordsReducer';
import useBookParams from './useBookParams';

const useBookWords = (isAuth: boolean, userId?: string) => {
  const { userWords } = useTypedSelector(state => state.userWords);
  const { words, request } = useTypedSelector(state => state.words);
  const { group, page } = useBookParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (group && page) {
      if (isAuth && userId) {
        dispatch(
          requestWordsWithPropsAction({
            group: group - 1,
            page: page - 1,
            userId,
          })
        );
      } else {
        dispatch(requestWordsAction({ group: group - 1, page: page - 1 }));
      }
    }
  }, [page, group, isAuth, dispatch, userWords]);
  const cards = useMemo(() => words, [words]);
  return {
    cards,
    request,
  };
};

export default useBookWords;
