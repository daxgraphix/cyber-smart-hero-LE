import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Grab } from 'lucide-react';
import { ChallengeContent } from '../../types';

interface DragAndDropProps {
  challenges: ChallengeContent[];
  onComplete: (score: number, total: number) => void;
  playSound: (sound: string, note: string) => void;
}

export const DragAndDrop: React.FC<DragAndDropProps> = ({ challenges, onComplete, playSound }) => {
  const [items, setItems] = useState(challenges);
  const [safeItems, setSafeItems] = useState<ChallengeContent[]>([]);
  const [unsafeItems, setUnsafeItems] = useState<ChallengeContent[]>([]);
  const [draggedItem, setDraggedItem] = useState<ChallengeContent | null>(null);

  const handleDrop = (zone: 'safe' | 'unsafe') => {
    if (!draggedItem) return;
    if (draggedItem.type === zone) {
      playSound('correct', 'E5');
      setItems(i => i.filter(item => item.text !== draggedItem.text));
      if (zone === 'safe') setSafeItems(s => [...s, draggedItem]);
      else setUnsafeItems(u => [...u, draggedItem]);
    } else {
      playSound('incorrect', 'C3');
    }
    setDraggedItem(null);
  };

  useEffect(() => {
    if (items.length === 0) {
      setTimeout(() => onComplete(challenges.length, challenges.length), 500);
    }
  }, [items, challenges, onComplete]);

  return (
    <div className="space-y-6">
      <p className="text-center text-slate-400 text-sm">Drag each item to the correct shield.</p>
      
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-700 min-h-[300px] flex flex-col gap-2">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">Items to Sort</h4>
          <AnimatePresence mode="popLayout">
            {items.map(item => (
              <motion.div
                key={item.text}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                draggable
                onDragStart={() => setDraggedItem(item)}
                className="bg-slate-800 p-4 rounded-xl text-slate-200 border border-slate-700 cursor-grab active:cursor-grabbing flex items-center justify-between group hover:border-sky-500/50 transition-colors"
              >
                <span>{item.text}</span>
                <Grab size={16} className="text-slate-600 group-hover:text-sky-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop('safe')}
            className="flex-1 bg-green-500/5 border-2 border-dashed border-green-500/30 rounded-2xl p-4 min-h-[140px] transition-colors hover:bg-green-500/10"
          >
            <div className="flex items-center justify-center gap-2 text-green-400 font-bold mb-4">
              <ShieldCheck size={20} />
              <span>Safe to Share</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {safeItems.map(item => (
                <div key={item.text} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop('unsafe')}
            className="flex-1 bg-red-500/5 border-2 border-dashed border-red-500/30 rounded-2xl p-4 min-h-[140px] transition-colors hover:bg-red-500/10"
          >
            <div className="flex items-center justify-center gap-2 text-red-400 font-bold mb-4">
              <ShieldAlert size={20} />
              <span>Not Safe</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {unsafeItems.map(item => (
                <div key={item.text} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-medium border border-red-500/30">
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
