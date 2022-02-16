import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  requestAudioCallDataAction,
  requestAudiocallHardWordsAction,
} from '../../redux/store/reducers/audioCallReducer';
import { DIFFICULT_GROUP } from '../e-book/cosnstants';

const useAudiocallFromBook = (
  isAuth: boolean,
  group: number,
  page: number,
  userId?: string
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return () => {
    navigate('/games/audiocall');
    if (isAuth) {
      if (group === DIFFICULT_GROUP && userId) {
        dispatch(requestAudiocallHardWordsAction({ userId }));
      } else {
        dispatch(
          requestAudioCallDataAction({
            group,
            page,
            book: true,
            userId,
          })
        );
      }
    } else {
      dispatch(requestAudioCallDataAction({ group, page }));
    }
  };
};

export default useAudiocallFromBook;
