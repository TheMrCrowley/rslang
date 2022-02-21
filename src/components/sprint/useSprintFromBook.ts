import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  requestSprintDataAction,
  requestSprintHardWordsAction,
} from '../../redux/store/reducers/sprintGameReducer';
import { DIFFICULT_GROUP } from '../e-book/cosnstants';

const useSprintFromBook = (
  isAuth: boolean,
  group: number,
  page: number,
  userId?: string
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return () => {
    navigate('/games/sprint');
    if (isAuth) {
      // TODO magic number
      if (group === DIFFICULT_GROUP && userId) {
        dispatch(requestSprintHardWordsAction({ userId }));
      } else {
        dispatch(
          requestSprintDataAction({
            group,
            page,
            book: true,
            userId,
          })
        );
      }
    } else {
      dispatch(requestSprintDataAction({ group, page, book: true }));
    }
  };
};

export default useSprintFromBook;
