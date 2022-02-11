import { useEffect, useState } from 'react';

const useTimer = (time: number) => {
  const [seconds, setSeconds] = useState<number>(time);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    // let interval: NodeJS.Timer | null = null;
    // if (isActive) {
    //   interval = setInterval(() => {
    //     setSeconds(prev => prev - 1);
    //   }, 1000);
    // } else if (!isActive && seconds !== 0) {
    //   clearInterval(interval);
    // }
    // return () => clearInterval(interval);
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
