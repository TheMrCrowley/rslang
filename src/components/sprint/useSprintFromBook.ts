import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestSprintDataAction } from '../../redux/store/reducers/sprintGameReducer';

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
      dispatch(
        requestSprintDataAction({
          group: group - 1,
          page: page - 1,
          book: true,
          userId,
        })
      );
    } else {
      dispatch(requestSprintDataAction({ group: group - 1, page: page - 1 }));
    }
  };
};

export default useSprintFromBook;
