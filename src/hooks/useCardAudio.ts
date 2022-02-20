import { useEffect } from 'react';

const useCardAudio = (src: string[]) => {
  let currentSrc = 0;
  let audio = new Audio(src[currentSrc]);
  const stop = () => {
    audio.pause();
  };

  function playNext() {
    currentSrc += 1;
    if (currentSrc < src.length) {
      audio = new Audio(src[currentSrc]);
      audio.play();
      audio.onended = () => playNext();
    } else {
      currentSrc = 0;
      audio = new Audio(src[currentSrc]);
      audio.onended = () => playNext();
      audio.pause();
    }
  }
  function playAudio() {
    if (audio.played) {
      audio.play();
    }
  }
  useEffect(() => {
    audio.addEventListener('ended', playNext);
    return () => {
      audio.removeEventListener('ended', playNext);
      stop();
    };
  }, []);
  return playAudio;
};

export default useCardAudio;
