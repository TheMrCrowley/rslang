const useAudio = (src: string) => {
  const audio = new Audio(src);
  function play() {
    if (audio.played) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.play();
    }
  }
  return play;
};
export default useAudio;
