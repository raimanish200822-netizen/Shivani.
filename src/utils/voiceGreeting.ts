// Web Speech API Voice Greeting Utility for Shivani Graphics
// Spoken in Hindi per customer requirement

export const GREETING_TEXT = "शिवानी ग्राफिक्स में आपका स्वागत है! आपकी डिजिटल प्रिंटिंग और डिज़ाइनिंग की सम्पूर्ण दुकान।";
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
 * Triggers the Web Speech API utterance in Hindi.
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
    utterance.lang = 'hi-IN'; // Set to Hindi (India)
    utterance.rate = 0.92;    // Natural Hindi speaking cadence
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Attempt to pick a natural Hindi voice (e.g., Google हिन्दी, Lekha, Hindi India)
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const hindiVoice = voices.find(v => 
        v.lang === 'hi-IN' || 
        v.lang.startsWith('hi') ||
        v.name.includes('Hindi') || 
        v.name.includes('हिन्दी') ||
        v.name.includes('Lekha') ||
        v.name.includes('Kalpana')
      );
      if (hindiVoice) {
        utterance.voice = hindiVoice;
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
