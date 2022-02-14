import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CountDown = () => {
  const [time, setTimeLeft] = useState(15);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (time > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
  }, [time]);

  return (
    <Typography variant="h4" color="white" fontWeight="bold" component="span">
      Time left: {time}
    </Typography>
  );
};

export default CountDown;
