import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { ChallengeContent } from '../../types';
import { Button } from '../ui/button';

interface SpotTheAdProps {
  challenges: ChallengeContent[];
  onComplete: (score: number, total: number) => void;
  playSound: (sound: string, note: string) => void;
}

export const SpotTheAd: React.FC<SpotTheAdProps> = ({ challenges, onComplete, playSound }) => {
  const [cIndex, setCIndex] = useState(0);
  const [found, setFound] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  
  const challenge = challenges[cIndex];
  
  const handleFind = (hotspotIndex: number, explanation: string) => {
    if (found.includes(hotspotIndex)) return;
    playSound('correct', 'A5');
    setFound(f => [...f, hotspotIndex]);
    setFeedback(explanation);
  };

  const handleNext = () => {
    playSound('click', 'G4');
    setFound([]);
    setFeedback('');
    if (cIndex + 1 < challenges.length) {
      setCIndex(i => i + 1);
    } else {
      onComplete(challenges.length, challenges.length);
    }
  };
  
  const allFound = found.length === challenge.hotspots?.length;
  
  const gameScreen = useMemo(() => {
    if (challenge.title?.includes("Pet")) {
      return (
        <div className="bg-pink-100 text-slate-900 p-4 rounded-3xl aspect-[9/16] w-full max-w-[320px] mx-auto flex flex-col relative overflow-hidden shadow-2xl border-4 border-pink-200">
          <div className="text-center p-3 bg-pink-300/50 rounded-xl mb-4">
            <h3 className="font-bold text-pink-800">Cute Pet Salon</h3>
          </div>
          <div className="flex-grow flex items-center justify-center text-8xl">🐶</div>
          
          {/* Banner Ad */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-[12%] bg-slate-800 flex items-center justify-center text-white text-[10px] text-center rounded-lg border border-slate-600">
            AD: Play 'Candy Crunch' NOW!
          </div>
          
          {/* Purchase Prompt */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-2xl text-center shadow-xl border-2 border-pink-400 w-[80%]">
            <p className="font-bold text-pink-600 text-sm">Get the Sparkle Brush!</p>
            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white mt-2 w-full">$4.99</Button>
          </div>
        </div>
      );
    }
    return null;
  }, [challenge.title]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h4 className="text-lg font-medium text-slate-400">Ad Alert Mission {cIndex + 1}</h4>
        <p className="text-xl font-bold text-slate-100">{challenge.title}</p>
        <p className="text-sm text-slate-400">Find all {challenge.hotspots?.length} sneaky ads or purchases!</p>
      </div>

      <div className="relative">
        {gameScreen}
        {challenge.hotspots?.map((h, i) => (
          <div 
            key={i} 
            className={`absolute cursor-pointer rounded-xl transition-all duration-300 ${
              found.includes(i) ? 'bg-amber-500/20 border-2 border-amber-500' : 'bg-transparent border-2 border-dashed border-amber-500/10 hover:border-amber-500/50'
            }`} 
            style={h.style} 
            onClick={() => handleFind(i, h.explanation)} 
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {feedback && (
          <motion.div
            key={feedback}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900/80 border border-slate-700 p-4 rounded-xl flex gap-3 items-start"
          >
            <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={20} />
            <div>
              <p className="text-amber-400 font-bold">Sneaky Trick Spotted!</p>
              <p className="text-slate-300 text-sm mt-1">{feedback}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {allFound && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button onClick={handleNext} size="lg" className="rounded-full px-10 font-bold">
            {cIndex + 1 < challenges.length ? 'Next Game' : 'Finish Mission'}
          </Button>
        </motion.div>
      )}
    </div>
  );
};
