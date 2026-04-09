import React from 'react';
import { missions } from '../constants';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

export const Handbook = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black">Hero Handbook</h2>
        <p className="text-slate-400 font-medium">Your complete guide to digital safety.</p>
      </div>

      <div className="grid gap-6">
        {Object.values(missions).map((mission) => (
          <Card key={mission.id} className="p-6 bg-slate-900/50 border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-sky-400">
              {mission.icon}
              <h3 className="text-xl font-bold">{mission.title}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mission.training.flashcards.map((card, i) => (
                <div key={i} className="space-y-1">
                  <p className="font-bold text-slate-200 text-sm">{card.term}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{card.definition}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
