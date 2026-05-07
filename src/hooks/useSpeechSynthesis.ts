import { useState, useEffect, useCallback, useRef } from 'react';

interface SpeechState {
  speak: (text: string, lang?: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  supported: boolean;
}

export function useSpeechSynthesis(): SpeechState {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const isAvailable =
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      'SpeechSynthesisUtterance' in window;
    setSupported(isAvailable);

    if (isAvailable) {
      const handleEnd = () => setIsSpeaking(false);
      speechSynthesis.addEventListener('voiceschanged', () => {});
      speechSynthesis.addEventListener('end', handleEnd);
      return () => {
        speechSynthesis.removeEventListener('end', handleEnd);
      };
    }
  }, []);

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (!supported) return;

    stop();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [supported]);

  const stop = useCallback(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, []);

  return { speak, stop, isSpeaking, supported };
}
