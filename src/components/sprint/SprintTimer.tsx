import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useTimer from '../../hooks/useTimer';
import { changeSprintStatusAction } from '../../redux/store/reducers/sprintGameReducer';
import { SprintGameStatus } from '../../redux/types/sprintTypes';

const SprintTimer = () => {
  // TODO switch to const
  const [time, status] = useTimer(5);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!status) {
      dispatch(changeSprintStatusAction(SprintGameStatus.END));
    }
  }, [status, dispatch]);
  return (
    <Typography
      variant="h4"
      component="span"
      fontWeight="bold"
      color="white"
      textAlign="center"
    >
      Time left: {time}s
    </Typography>
  );
};

export default SprintTimer;
