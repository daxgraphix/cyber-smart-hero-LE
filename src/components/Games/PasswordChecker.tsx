import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, X, ShieldCheck } from 'lucide-react';
import { ChallengeContent } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface PasswordCheckerProps {
  challenges: ChallengeContent[];
  onComplete: (score: number, total: number) => void;
  playSound: (sound: string, note: string) => void;
}

export const PasswordChecker: React.FC<PasswordCheckerProps> = ({ challenges, onComplete, playSound }) => {
  const [cIndex, setCIndex] = useState(0);
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  
  const challenge = challenges[cIndex];
  const rules = challenge.rules!;

  useEffect(() => {
    const checks: Record<string, boolean> = {};
    checks.length = password.length >= rules.minLength;
    checks.lower = rules.needsLower ? /[a-z]/.test(password) : true;
    checks.upper = rules.needsUpper ? /[A-Z]/.test(password) : true;
    checks.number = rules.needsNumber ? /\d/.test(password) : true;
    checks.symbol = rules.needsSymbol ? /[!@#$%^&*]/.test(password) : true;
    setFeedback(checks);
  }, [password, rules]);

  const allRulesMet = Object.values(feedback).every(Boolean);

  const handleSubmit = () => {
    playSound('correct', 'G5');
    if (cIndex + 1 < challenges.length) {
      setCIndex(i => i + 1);
      setPassword('');
    } else {
      onComplete(challenges.length, challenges.length);
    }
  };
  
  const RuleItem = ({ text, isMet }: { text: string, isMet: boolean }) => (
    <div className={`flex items-center gap-2 text-sm transition-colors ${isMet ? 'text-green-400' : 'text-slate-500'}`}>
      {isMet ? <Check size={14} /> : <X size={14} />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h4 className="text-lg font-medium text-slate-400">Security Level {cIndex + 1}</h4>
        <p className="text-xl font-bold text-slate-100">{challenge.scenario}</p>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 space-y-4">
        <div className="flex items-center gap-3 text-sky-400 mb-2">
          <ShieldCheck size={20} />
          <span className="font-bold">Requirements:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {rules.minLength && <RuleItem text={`At least ${rules.minLength} characters`} isMet={feedback.length} />}
          {rules.needsLower && <RuleItem text="Lowercase letter (a-z)" isMet={feedback.lower} />}
          {rules.needsUpper && <RuleItem text="Uppercase letter (A-Z)" isMet={feedback.upper} />}
          {rules.needsNumber && <RuleItem text="A number (0-9)" isMet={feedback.number} />}
          {rules.needsSymbol && <RuleItem text="A symbol (!, @, #, $)" isMet={feedback.symbol} />}
        </div>
      </div>

      <div className="space-y-4">
        <Input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="h-14 text-lg text-center bg-slate-800 border-2 border-slate-700 focus:border-sky-500 transition-all"
          placeholder="Type your secure password..."
        />
        
        <div className="flex justify-center">
          <Button 
            onClick={handleSubmit} 
            disabled={!allRulesMet}
            size="lg"
            className="rounded-full px-10 font-bold transition-all"
          >
            {cIndex + 1 < challenges.length ? 'Next Level' : 'Finish Mission'}
          </Button>
        </div>
      </div>
    </div>
  );
};
