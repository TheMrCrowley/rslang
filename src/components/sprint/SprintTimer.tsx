import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import useTimer from '../../hooks/useTimer';
import { changeSprintStatusAction } from '../../redux/store/reducers/sprintGameReducer';
import { SprintGameStatus } from '../../redux/types/sprintTypes';

const StyledTypo = styled(Typography)`
  font-size: 32px;
  color: #202026;
  font-weight: 600;
  text-align: center;
`;

const SprintTimer = () => {
  // TODO switch to const
  const [time, status] = useTimer(60000);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!status) {
      dispatch(changeSprintStatusAction(SprintGameStatus.END));
    }
  }, [status, dispatch]);
  return <StyledTypo variant="h2">{time}</StyledTypo>;
};

export default SprintTimer;
