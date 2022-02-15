import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestAudioCallDataAction } from '../../redux/store/reducers/audioCallReducer';

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
    if (isAuth && userId) {
      dispatch(
        requestAudioCallDataAction({
          group: group - 1,
          page: page - 1,
          book: true,
          userId,
        })
      );
    } else {
      dispatch(
        requestAudioCallDataAction({ group: group - 1, page: page - 1 })
      );
    }
  };
};

export default useAudiocallFromBook;
