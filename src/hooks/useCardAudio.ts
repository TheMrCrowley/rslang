import { useEffect } from 'react';

const useCardAudio = (src: string[]) => {
  let currentSrc = 0;
  let audio = new Audio(src[currentSrc]);
  useEffect(() => {
    audio.addEventListener('ended', playNext);
    return () => audio.removeEventListener('ended', playNext);
  }, []);

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
  return playAudio;
};

export default useCardAudio;
