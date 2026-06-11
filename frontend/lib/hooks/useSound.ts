import { useCallback, useEffect } from "react";
import { getSoundManager, type SoundType } from "@/lib/sounds";

export const useSound = () => {
  const soundManager = getSoundManager();

  // Resume audio context on first user interaction
  useEffect(() => {
    const resumeAudio = () => {
      soundManager.resumeAudioContext();
      document.removeEventListener("click", resumeAudio);
    };

    document.addEventListener("click", resumeAudio);
    return () => document.removeEventListener("click", resumeAudio);
  }, [soundManager]);

  const playSound = useCallback(
    (soundType: SoundType, volume = 0.3) => {
      soundManager.playSound(soundType, volume);
    },
    [soundManager],
  );

  return { playSound };
};
