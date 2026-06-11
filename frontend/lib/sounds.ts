/**
 * Sound Effects Manager
 * Provides Web Audio API fallback for generating sounds if files are unavailable
 */

export type SoundType = "click" | "navigate" | "success" | "error";

const SOUND_FILES: Record<SoundType, string> = {
  click: "/sounds/click.mp3",
  navigate: "/sounds/navigate.mp3",
  success: "/sounds/success.mp3",
  error: "/sounds/error.mp3",
};

class SoundManager {
  private audioContext: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
    }
    return this.audioContext;
  }

  /**
   * Generate a simple beep sound using Web Audio API
   */
  private playBeep(
    frequency: number = 440,
    duration: number = 100,
    type: SoundType = "click",
  ) {
    try {
      const audioContext = this.getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.debug("Web Audio API error:", error);
    }
  }

  /**
   * Play a sound effect
   */
  playSound(soundType: SoundType, volume: number = 0.3): void {
    try {
      // Try to play from file first
      if (!this.audioElement) {
        this.audioElement = new Audio();
      }

      this.audioElement.volume = Math.max(0, Math.min(1, volume));
      this.audioElement.src = SOUND_FILES[soundType];
      this.audioElement.currentTime = 0;

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If file playback fails, fall back to Web Audio API
          this.playSoundFallback(soundType);
        });
      }
    } catch (error) {
      // If file playback fails, use Web Audio API fallback
      this.playSoundFallback(soundType);
    }
  }

  /**
   * Fallback: Generate sound effects using Web Audio API
   */
  private playSoundFallback(soundType: SoundType): void {
    try {
      switch (soundType) {
        case "click":
          this.playBeep(800, 50, soundType);
          break;
        case "navigate":
          this.playBeep(600, 80, soundType);
          setTimeout(() => this.playBeep(800, 80, soundType), 100);
          break;
        case "success":
          this.playBeep(523, 150, soundType);
          setTimeout(() => this.playBeep(659, 150, soundType), 160);
          break;
        case "error":
          this.playBeep(300, 150, soundType);
          setTimeout(() => this.playBeep(200, 150, soundType), 160);
          break;
      }
    } catch (error) {
      console.debug("Sound fallback error:", error);
    }
  }

  /**
   * Disable all sounds
   */
  mute(): void {
    if (this.audioElement) {
      this.audioElement.volume = 0;
    }
  }

  /**
   * Resume audio context if suspended
   */
  resumeAudioContext(): void {
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }
}

// Singleton instance
let soundManager: SoundManager | null = null;

export function getSoundManager(): SoundManager {
  if (!soundManager) {
    soundManager = new SoundManager();
  }
  return soundManager;
}
