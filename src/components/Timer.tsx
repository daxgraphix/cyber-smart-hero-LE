import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isPaused: boolean;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isPaused }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeIsLow = timeLeft <= 10;

  return (
    <div className={`flex items-center gap-2 font-mono text-lg font-bold p-2 px-3 rounded-lg transition-colors ${
      timeIsLow ? 'text-red-400 animate-pulse bg-red-500/10' : 'text-slate-300 bg-slate-800/50'
    }`}>
      <TimerIcon size={18} />
      <span>{minutes}:{seconds < 10 ? '0' : ''}{seconds}</span>
    </div>
  );
};
