import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { ChallengeContent } from '../../types';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ChooseYourResponseProps {
  challenges: ChallengeContent[];
  onComplete: (score: number, total: number) => void;
  playSound: (sound: string, note: string) => void;
}

export const ChooseYourResponse: React.FC<ChooseYourResponseProps> = ({ challenges, onComplete, playSound }) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string, correct: boolean } | null>(null);

  const handleAnswer = (option: any) => {
    if (feedback) return;

    setFeedback({ text: option.feedback, correct: option.correct });
    if (option.correct) {
      playSound('correct', 'G5');
      setScore(s => s + 1);
    } else {
      playSound('incorrect', 'C3');
    }

    setTimeout(() => {
      setFeedback(null);
      if (qIndex + 1 < challenges.length) {
        setQIndex(q => q + 1);
      } else {
        onComplete(score + (option.correct ? 1 : 0), challenges.length);
      }
    }, 2500);
  };

  const q = challenges[qIndex];
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h4 className="text-lg font-medium text-slate-400">Question {qIndex + 1} of {challenges.length}</h4>
        <p className="text-xl font-bold text-slate-100">{q.scenario}</p>
      </div>

      <div className="grid gap-3">
        {q.options?.map((o, i) => (
          <Button
            key={i}
            variant="outline"
            onClick={() => handleAnswer(o)}
            disabled={!!feedback}
            className={`h-auto p-4 justify-start text-left whitespace-normal border-2 transition-all duration-300 ${
              feedback && o.correct ? 'border-green-500 bg-green-500/10' : 
              feedback && !o.correct && feedback.text === o.feedback ? 'border-red-500 bg-red-500/10' : 
              'border-slate-700 hover:border-sky-500/50'
            }`}
          >
            <span className="text-base">{o.text}</span>
          </Button>
        ))}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className={`p-4 border-2 ${feedback.correct ? 'border-green-500 bg-green-500/5' : 'border-red-500 bg-red-500/5'}`}>
              <div className="flex items-start gap-3">
                {feedback.correct ? (
                  <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={20} />
                ) : (
                  <XCircle className="text-red-500 shrink-0 mt-1" size={20} />
                )}
                <div>
                  <p className={`font-bold ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
                    {feedback.correct ? "Great Choice!" : "Think Again..."}
                  </p>
                  <p className="text-slate-300 text-sm mt-1">{feedback.text}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
