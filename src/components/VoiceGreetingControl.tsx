import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { isVoiceMuted, setVoiceMuted, playWelcomeVoiceGreeting } from '../utils/voiceGreeting';

interface VoiceGreetingControlProps {
  variant?: 'header' | 'floating';
}

export const VoiceGreetingControl: React.FC<VoiceGreetingControlProps> = ({ variant = 'header' }) => {
  const [muted, setMuted] = useState(isVoiceMuted());
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Monitor speaking status
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const interval = setInterval(() => {
      setIsPlaying(window.speechSynthesis.speaking);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (muted) {
      setVoiceMuted(false);
      setMuted(false);
      // Play greeting immediately when user unmutes
      playWelcomeVoiceGreeting(true);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2500);
    } else {
      setVoiceMuted(true);
      setMuted(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (muted) {
      setVoiceMuted(false);
      setMuted(false);
    }
    playWelcomeVoiceGreeting(true);
  };

  if (variant === 'header') {
    return (
      <div className="relative inline-flex items-center">
        <button
          type="button"
          onClick={handleToggle}
          title={muted ? "Unmute Voice Greeting" : "Mute Voice Greeting (Click to toggle)"}
          className={`p-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-xs font-semibold ${
            muted 
              ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' 
              : isPlaying
                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                : 'text-[#50007c] hover:bg-purple-50'
          }`}
          aria-label={muted ? "Unmute Voice Greeting" : "Mute Voice Greeting"}
        >
          {muted ? (
            <VolumeX className="w-4 h-4 stroke-[2.2]" />
          ) : (
            <div className="relative flex items-center">
              <Volume2 className={`w-4 h-4 stroke-[2.2] ${isPlaying ? 'animate-pulse text-emerald-600' : ''}`} />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              )}
            </div>
          )}
          <span className="hidden xl:inline text-[11px]">
            {muted ? 'Voice Muted' : isPlaying ? 'Speaking...' : 'Voice Greeting'}
          </span>
        </button>

        {/* Tooltip feedback */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute top-full right-0 mt-1 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none"
            >
              {muted ? 'Voice Greeting Muted' : 'Voice Greeting Enabled'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Floating variant (subtle, accessible bottom corner control)
  return (
    <div className="fixed bottom-20 left-4 z-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 pr-3 rounded-full border border-slate-200/90 shadow-md text-xs font-bold text-slate-800"
      >
        <button
          type="button"
          onClick={handleToggle}
          className={`p-2 rounded-full transition-colors cursor-pointer ${
            muted ? 'bg-slate-100 text-slate-400' : 'bg-purple-50 text-[#50007c]'
          }`}
          aria-label={muted ? "Unmute Voice Greeting" : "Mute Voice Greeting"}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={handleReplay}
          className="text-[11px] font-semibold hover:text-[#50007c] cursor-pointer flex items-center gap-1"
        >
          <span>{isPlaying ? 'Speaking...' : muted ? 'Audio Muted' : 'Voice Greeting'}</span>
          {!muted && <Sparkles className="w-3 h-3 text-amber-500" />}
        </button>
      </motion.div>
    </div>
  );
};
