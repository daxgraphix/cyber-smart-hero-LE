import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Lock } from 'lucide-react';
import { Profile } from '../types';
import { missions } from '../constants';
import { Card } from './ui/card';

interface AchievementsProps {
  profile: Profile;
}

export const Achievements: React.FC<AchievementsProps> = ({ profile }) => {
  const allMissions = Object.values(missions);
  const earnedBadgesCount = profile.badges.length;
  const totalBadgesCount = allMissions.length;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-amber-500/10 rounded-full text-amber-500 mb-2">
          <Trophy size={48} />
        </div>
        <h2 className="text-4xl font-black tracking-tight">Hero Achievements</h2>
        <p className="text-slate-400 font-medium max-w-lg mx-auto">
          You've collected <span className="text-amber-400 font-bold">{earnedBadgesCount}</span> out of <span className="text-slate-200 font-bold">{totalBadgesCount}</span> badges. Keep going, Hero!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allMissions.map((mission) => {
          const isEarned = profile.badges.includes(mission.id);
          const progress = profile.missionProgress[mission.id];

          return (
            <Card 
              key={mission.id}
              className={`p-6 border-2 transition-all duration-500 ${
                isEarned 
                  ? 'bg-slate-900/50 border-amber-500/30 shadow-lg shadow-amber-500/5' 
                  : 'bg-slate-950/50 border-slate-800 opacity-60 grayscale'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                  isEarned ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'bg-slate-800 border-slate-700 text-slate-600'
                }`}>
                  {isEarned ? mission.badgeIcon : <Lock size={32} />}
                </div>
                
                <div>
                  <h3 className={`text-xl font-bold ${isEarned ? 'text-slate-100' : 'text-slate-500'}`}>
                    {mission.badgeName}
                  </h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">
                    {mission.title}
                  </p>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {isEarned 
                    ? `Awarded for mastering ${mission.title.toLowerCase()} and completing the challenge.`
                    : "Complete this mission to unlock this legendary badge."
                  }
                </p>

                {isEarned && (
                  <div className="flex gap-1 pt-2">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < (progress?.stars || 0) ? "fill-amber-400 text-amber-400" : "text-slate-700"} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
