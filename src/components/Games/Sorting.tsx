import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ArrowRightLeft } from 'lucide-react';
import { ChallengeContent } from '../../types';
import { Button } from '../ui/button';

interface SortingProps {
  challenges: ChallengeContent[];
  onComplete: (score: number, total: number) => void;
  playSound: (sound: string, note: string) => void;
}

export const Sorting: React.FC<SortingProps> = ({ challenges, onComplete, playSound }) => {
  const [cIndex, setCIndex] = useState(0);
  const [items, setItems] = useState(() => 
    [...challenges[cIndex].content!].sort(() => Math.random() - 0.5)
  );
  const [sorted, setSorted] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});

  const challenge = challenges[cIndex];
  const categories: string[] = Array.from(new Set(challenge.content!.map(i => i.type as string)));

  const handleSort = (itemText: string, category: string) => {
    const item = challenge.content!.find(i => i.text === itemText);
    const isCorrect = item?.type === category;
    
    setSorted(prev => ({ ...prev, [itemText]: category }));
    setFeedback(prev => ({ ...prev, [itemText]: isCorrect ? 'correct' : 'incorrect' }));
    
    if (isCorrect) {
      playSound('correct', 'C5');
    } else {
      playSound('incorrect', 'G3');
    }

    const newSortedCount = Object.keys(sorted).length + 1;
    if (newSortedCount === challenge.content!.length) {
      const correctCount = Object.values({ ...feedback, [itemText]: isCorrect ? 'correct' : 'incorrect' })
        .filter(f => f === 'correct').length;
      
      setTimeout(() => {
        if (cIndex + 1 < challenges.length) {
          setCIndex(i => i + 1);
          setItems([...challenges[cIndex + 1].content!].sort(() => Math.random() - 0.5));
          setSorted({});
          setFeedback({});
        } else {
          onComplete(correctCount, challenge.content!.length);
        }
      }, 1000);
    }
  };

  return (
    <div className="space-y-12 py-4">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 rounded-full border border-sky-500/20 text-sky-400 text-[10px] font-black uppercase tracking-widest">
          <ArrowRightLeft size={12} />
          <span>Classification Protocol {cIndex + 1}</span>
        </div>
        <h4 className="text-3xl font-black text-slate-100 tracking-tight leading-tight max-w-xl mx-auto">
          {challenge.scenario || "Sort the items into the correct categories!"}
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {categories.map(cat => (
          <div key={cat} className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-dashed border-slate-800 min-h-[250px] flex flex-col items-center space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h5 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 relative z-10">{cat}</h5>
            <div className="flex flex-wrap gap-3 justify-center relative z-10">
              {Object.entries(sorted)
                .filter(([_, c]) => c === cat)
                .map(([text, _]) => (
                  <motion.div
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    key={text}
                    className={`px-5 py-3 rounded-2xl text-sm font-black flex items-center gap-3 shadow-lg ${
                      feedback[text] === 'correct' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {text}
                    <div className={`p-1 rounded-full ${feedback[text] === 'correct' ? 'bg-green-500 text-slate-950' : 'bg-red-500 text-slate-950'}`}>
                      {feedback[text] === 'correct' ? <Check size={12} /> : <X size={12} />}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 justify-center pt-8">
        <AnimatePresence>
          {items.filter(i => !sorted[i.text!]).map((item) => (
            <motion.div
              key={item.text}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              className="relative"
            >
              <div className="bg-slate-900 border-2 border-slate-800 p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-6 hover:border-sky-500/50 transition-all group cyber-border">
                <span className="font-black text-slate-200 text-lg group-hover:text-sky-400 transition-colors">{item.text}</span>
                <div className="flex gap-3">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      size="sm"
                      variant="outline"
                      onClick={() => handleSort(item.text!, cat!)}
                      className="text-[10px] font-black uppercase tracking-widest rounded-xl border-slate-700 hover:bg-sky-500 hover:border-sky-500 hover:text-white transition-all h-10 px-4"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
