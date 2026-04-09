import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChallengeContent } from '../../types';

interface MatchThePairsProps {
  challenges: ChallengeContent[];
  onComplete: (score: number, total: number) => void;
  playSound: (sound: string, note: string) => void;
}

interface Item {
  text: string;
  pairId: number;
  id: string;
}

export const MatchThePairs: React.FC<MatchThePairsProps> = ({ challenges, onComplete, playSound }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    let flatItems: Item[] = [];
    challenges.forEach((pair, i) => {
      flatItems.push({ text: pair.action!, pairId: i, id: `action-${i}` });
      flatItems.push({ text: pair.consequence!, pairId: i, id: `consequence-${i}` });
    });
    setItems(flatItems.sort(() => Math.random() - 0.5));
  }, [challenges]);

  const handleSelect = (item: Item) => {
    if (isChecking || matched.includes(item.pairId) || selected.find(s => s.id === item.id)) return;
    
    playSound('click', 'C4');
    const newSelected = [...selected, item];
    setSelected(newSelected);
    
    if (newSelected.length === 2) {
      setIsChecking(true);
      if (newSelected[0].pairId === newSelected[1].pairId) {
        playSound('correct', 'F5');
        setTimeout(() => {
          setMatched(m => [...m, newSelected[0].pairId]);
          setSelected([]);
          setIsChecking(false);
        }, 600);
      } else {
        playSound('incorrect', 'C3');
        setTimeout(() => {
          setSelected([]);
          setIsChecking(false);
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (challenges.length > 0 && matched.length === challenges.length) {
      setTimeout(() => onComplete(challenges.length, challenges.length), 500);
    }
  }, [matched, challenges, onComplete]);

  return (
    <div className="space-y-4">
      <p className="text-center text-slate-400 text-sm">Find the matching pairs by clicking on the cards.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map(item => {
          const isMatched = matched.includes(item.pairId);
          const isSelected = selected.find(s => s.id === item.id);
          const isIncorrect = selected.length === 2 && isSelected && selected[0].pairId !== selected[1].pairId;

          return (
            <motion.div
              key={item.id}
              whileHover={!isMatched ? { scale: 1.02 } : {}}
              whileTap={!isMatched ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(item)}
              className={`h-24 p-3 rounded-xl border-2 flex items-center justify-center text-center text-sm font-medium transition-all duration-300 cursor-pointer ${
                isMatched ? 'bg-green-500/20 border-green-500 text-green-400 opacity-50 cursor-default' :
                isIncorrect ? 'bg-red-500/20 border-red-500 text-red-400 animate-shake' :
                isSelected ? 'bg-sky-500/20 border-sky-500 text-sky-400 shadow-lg shadow-sky-500/20' :
                'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              {item.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
