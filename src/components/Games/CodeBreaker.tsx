import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, ShieldAlert } from 'lucide-react';
import { ChallengeContent } from '../../types';
import { Button } from '../ui/button';

interface CodeBreakerProps {
  challenges: ChallengeContent[];
  onComplete: (score: number, total: number) => void;
  playSound: (sound: string, note: string) => void;
}

export const CodeBreaker: React.FC<CodeBreakerProps> = ({ challenges, onComplete, playSound }) => {
  const [cIndex, setCIndex] = useState(0);
  const [guess, setGuess] = useState<string[]>(['', '', '', '']);
  const [attempts, setAttempts] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const challenge = challenges[cIndex];
  const targetCode = challenge.text!; // We'll store the target code in the text field
  const hints = challenge.scenario!.split('|'); // Hints separated by pipe

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newGuess = [...guess];
    newGuess[index] = value;
    setGuess(newGuess);
    playSound('click', 'C4');

    if (value && index < 3) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCheck = () => {
    const currentGuess = guess.join('');
    if (currentGuess === targetCode) {
      setIsUnlocked(true);
      playSound('correct', 'C6');
      setTimeout(() => {
        if (cIndex + 1 < challenges.length) {
          setCIndex(i => i + 1);
          setGuess(['', '', '', '']);
          setAttempts(0);
          setIsUnlocked(false);
        } else {
          onComplete(challenges.length, challenges.length);
        }
      }, 1500);
    } else {
      setAttempts(a => a + 1);
      playSound('incorrect', 'G2');
      setGuess(['', '', '', '']);
      document.getElementById('digit-0')?.focus();
    }
  };

  return (
    <div className="space-y-12 py-4">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest">
          <Lock size={12} />
          <span>Encryption Layer {cIndex + 1}</span>
        </div>
        <h4 className="text-3xl font-black text-slate-100 tracking-tight leading-tight max-w-xl mx-auto">
          Decrypt the security code using the hints!
        </h4>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldAlert size={120} />
        </div>
        <div className="flex items-center gap-3 text-amber-400 relative z-10">
          <ShieldAlert size={24} />
          <span className="font-black uppercase tracking-[0.3em] text-xs">Security Intelligence</span>
        </div>
        <ul className="space-y-4 relative z-10">
          {hints.map((hint, i) => (
            <motion.li 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="text-slate-300 text-lg flex gap-4 items-start"
            >
              <span className="text-sky-500 font-mono font-bold mt-1">{i + 1}.</span>
              <span className="leading-relaxed">{hint}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center space-y-12">
        <div className="flex gap-4 sm:gap-6">
          {guess.map((digit, i) => (
            <motion.div
              key={i}
              whileFocus={{ scale: 1.05 }}
              className="relative"
            >
              <input
                id={`digit-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleDigitChange(i, e.target.value)}
                className={`w-16 h-24 sm:w-20 sm:h-28 text-5xl font-black text-center bg-slate-950 border-4 rounded-3xl transition-all outline-none cyber-border ${
                  isUnlocked ? 'border-green-500 text-green-500 bg-green-500/10 text-glow' : 'border-slate-800 focus:border-sky-500 text-slate-100 focus:bg-sky-500/5'
                }`}
              />
              {!digit && !isUnlocked && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
          <Button
            size="lg"
            onClick={handleCheck}
            disabled={guess.some(d => !d) || isUnlocked}
            className={`w-full rounded-2xl h-20 text-2xl font-black transition-all cyber-border shadow-2xl ${
              isUnlocked ? 'bg-green-500 hover:bg-green-500 shadow-green-500/20' : 'bg-sky-500 hover:bg-sky-400 shadow-sky-500/20'
            }`}
          >
            <span className="flex items-center gap-4">
              {isUnlocked ? <Unlock size={28} /> : <Lock size={28} />}
              {isUnlocked ? 'ACCESS GRANTED' : 'DECRYPT SYSTEM'}
            </span>
          </Button>
          
          <AnimatePresence>
            {attempts > 0 && !isUnlocked && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 text-red-400 text-xs font-black tracking-widest uppercase bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20"
              >
                <ShieldAlert size={14} />
                <span>Attempt {attempts} Failed: Invalid Credentials</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
