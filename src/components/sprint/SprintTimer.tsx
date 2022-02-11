import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useTimer from '../../hooks/useTimer';
import { changeSprintStatusAction } from '../../redux/store/reducers/sprintGameReducer';
import { SprintGameStatus } from '../../redux/types/sprintTypes';

const SprintTimer = () => {
  const [time, status] = useTimer(10);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!status) {
      dispatch(changeSprintStatusAction(SprintGameStatus.END));
    }
  }, [status, dispatch]);
  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: 32,
        color: '#202026',
      }}
    >
      {time}
    </Typography>
  );
};

export default SprintTimer;
