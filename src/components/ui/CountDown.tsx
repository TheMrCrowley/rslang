import { Typography } from '@mui/material';
import React, { useEffect, useState, FC } from 'react';

interface CountDownProps {
  color: string;
}

const CountDown: FC<CountDownProps> = ({ color }) => {
  const [time, setTimeLeft] = useState(15);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const timer = setTimeout(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
  }, [time]);

  return (
    <Typography variant="h4" color={color}>
      {time}
    </Typography>
  );
};

export default CountDown;
