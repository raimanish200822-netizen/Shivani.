// Web Speech API Voice Greeting Utility for Shivani Graphics
// Spoken in Hindi per customer requirement

export const GREETING_TEXT = "Welcome to Shivani Graphics! Your complete destination for digital printing and custom design solutions.";
const SESSION_KEY = "shivani_voice_greeted";
const MUTE_KEY = "shivani_voice_muted";

export const isVoiceMuted = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(MUTE_KEY) === 'true';
};

export const setVoiceMuted = (muted: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MUTE_KEY, muted ? 'true' : 'false');
  if (muted && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const hasBeenGreeted = (): boolean => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_KEY) === 'true';
};

export const markGreeted = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_KEY, 'true');
};

/**
 * Triggers the Web Speech API utterance in English.
 * Plays only once per session on first interaction, respecting browser autoplay restrictions.
 */
export const playWelcomeVoiceGreeting = (force = false): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  // If muted and not explicitly forced by user, skip
  if (isVoiceMuted() && !force) {
    return false;
  }

  // If already greeted in this session and not forced, skip
  if (hasBeenGreeted() && !force) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Cancel any previous speech

    const utterance = new SpeechSynthesisUtterance(GREETING_TEXT);
    utterance.lang = 'en-IN'; // Indian English / Global English
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const preferredVoice = voices.find(v => 
        v.lang === 'en-IN' || 
        v.lang === 'en-GB' ||
        v.lang === 'en-US' ||
        v.lang.startsWith('en')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    markGreeted();
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.warn('SpeechSynthesis Hindi greeting error:', error);
    return false;
  }
};

/**
 * Sets up global one-time interaction listener for the voice greeting
 */
export const initVoiceGreetingInteractionListener = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  if (hasBeenGreeted()) {
    return () => {};
  }

  const handleFirstInteraction = () => {
    playWelcomeVoiceGreeting();
    removeListeners();
  };

  const removeListeners = () => {
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
    window.removeEventListener('keydown', handleFirstInteraction);
  };

  window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
  window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
  window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true });

  return removeListeners;
};
