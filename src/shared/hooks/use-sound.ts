import { useRef } from "react";

export const useSound = (src: string,volume:number = 1.0) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
    }
    audioRef.current.volume = volume

    audioRef.current.currentTime = 0; // перезапуск с начала
    audioRef.current.play();
  };

  return play;
};
