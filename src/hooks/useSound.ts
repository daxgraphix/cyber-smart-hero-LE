import { useRef, useCallback, useState, useEffect } from 'react';
import * as Tone from 'tone';

interface SoundEngine {
  click: Tone.Synth | null;
  correct: Tone.Synth | null;
  incorrect: Tone.Synth | null;
  complete: Tone.Synth | null;
  purchase: Tone.Synth | null;
}

const NOTES = {
  click: 'C4',
  correct: 'E5',
  incorrect: 'C2',
  complete: 'G5',
  purchase: 'C5'
} as const;

export function useSound() {
  const engine = useRef<SoundEngine>({
    click: null,
    correct: null,
    incorrect: null,
    complete: null,
    purchase: null
  });
  
  const [isEnabled, setIsEnabled] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastSoundTime = useRef(0);

  const init = useCallback(async () => {
    if (isInitialized) return;
    
    try {
      await Tone.start();
      
      engine.current = {
        click: new Tone.Synth({ 
          oscillator: { type: "sine" }, 
          envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.1 } 
        }).toDestination(),
        
        correct: new Tone.Synth({ 
          oscillator: { type: "triangle" }, 
          envelope: { attack: 0.005, decay: 0.2, sustain: 0.1, release: 0.2 } 
        }).toDestination(),
        
        incorrect: new Tone.Synth({ 
          oscillator: { type: "square" }, 
          envelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.1 } 
        }).toDestination(),
        
        complete: new Tone.Synth({ 
          oscillator: { type: "triangle" }, 
          envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 } 
        }).toDestination(),
        
        purchase: new Tone.Synth({ 
          oscillator: { type: "sine" }, 
          envelope: { attack: 0.005, decay: 0.1, sustain: 0.8, release: 0.2 } 
        }).toDestination()
      };
      
      setIsInitialized(true);
    } catch (e) {
      console.error('Audio engine failed to initialize:', e);
      setIsEnabled(false);
    }
  }, [isInitialized]);

  const play = useCallback((sound: keyof typeof NOTES, customNote?: string) => {
    if (!isEnabled || !engine.current[sound]) return;
    
    const now = Tone.now();
    const time = Math.max(now, lastSoundTime.current + 0.001);
    const note = customNote ?? NOTES[sound];
    
    engine.current[sound]?.triggerAttackRelease(note, '8n', time);
    lastSoundTime.current = time;
  }, [isEnabled]);

  const toggle = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  useEffect(() => {
    return () => {
      if (isInitialized) {
        Object.values(engine.current).forEach(synth => {
          synth?.dispose();
        });
      }
    };
  }, [isInitialized]);

  return {
    init,
    play,
    toggle,
    isEnabled,
    isInitialized
  };
}
