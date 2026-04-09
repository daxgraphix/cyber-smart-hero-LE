import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { ChallengeContent } from '../../types';
import { Button } from '../ui/button';

interface SpotThePhishProps {
  challenges: ChallengeContent[];
  onComplete: (score: number, total: number) => void;
  playSound: (sound: string, note: string) => void;
}

export const SpotThePhish: React.FC<SpotThePhishProps> = ({ challenges, onComplete, playSound }) => {
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
  
  const emailContent = useMemo(() => {
    if (challenge.title?.includes("Bank")) {
      return (
        <div className="bg-white text-slate-900 p-6 rounded-xl font-sans shadow-xl border border-slate-200">
          <div className="border-b border-slate-100 pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500">From:</p>
                <p className="font-medium text-blue-600">security-update@your-bank-online.co</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Subject:</p>
                <p className="font-bold text-red-600">URGENT: Your Account will be DELETED!</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-medium">Dear Valued Customer,</p>
            <p>We detected suspicious activity on your account. To protect your funds, we have temporarily suspended your profile. You must verify your identity within 24 hours or your account will be permanently deleted.</p>
            <div className="py-6 flex justify-center">
              <div className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition-colors">
                Verify Identity Now
              </div>
            </div>
            <p className="text-sm text-slate-500">Thank you,<br />Your Bank Security Team</p>
          </div>
        </div>
      );
    }
    return null;
  }, [challenge.title]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h4 className="text-lg font-medium text-slate-400">Detective Mission {cIndex + 1}</h4>
        <p className="text-xl font-bold text-slate-100">{challenge.title}</p>
        <p className="text-sm text-slate-400">Find all {challenge.hotspots?.length} red flags!</p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {emailContent}
        {challenge.hotspots?.map((h, i) => (
          <div 
            key={i} 
            className={`absolute cursor-pointer rounded-lg transition-all duration-300 ${
              found.includes(i) ? 'bg-green-500/20 border-2 border-green-500' : 'bg-transparent border-2 border-dashed border-red-500/20 hover:border-red-500/50'
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
            <Info className="text-sky-400 shrink-0 mt-1" size={20} />
            <div>
              <p className="text-green-400 font-bold">Red Flag Found!</p>
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
            {cIndex + 1 < challenges.length ? 'Next Case' : 'Finish Investigation'}
          </Button>
        </motion.div>
      )}
    </div>
  );
};
