import { useEffect, useState } from 'react';

const useTimer = (time: number) => {
  const [seconds, setSeconds] = useState<number>(time);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (seconds > 0 && isActive) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timerId);
        setIsActive(false);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [isActive, seconds]);
  return [seconds, isActive];
};

export default useTimer;
