import React, { forwardRef } from 'react';

interface PlayerProps {
  src: string
}

const Player = forwardRef<HTMLAudioElement, PlayerProps>(({src, ref})) => {
  return (
    <audio src={src} ref={ref}></audio>
  );
};

export default Player;
