import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Star, BookOpen, GraduationCap, Gamepad2, ChevronRight } from 'lucide-react';
import { Mission, MissionProgress } from '../types';

interface MissionCardProps {
  mission: Mission;
  progress?: MissionProgress;
  onClick: () => void;
  index: number;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, progress, onClick, index }) => {
  // Default progress if not provided
  const defaultProgress: MissionProgress = {
    knowledge: false,
    training: false,
    challenge: false,
    stars: 0
  };
  
  const missionProgress = progress || defaultProgress;
  const isCompleted = missionProgress.challenge;
  
  const stages = [
    { key: 'knowledge', icon: BookOpen, label: 'Knowledge' },
    { key: 'training', icon: GraduationCap, label: 'Training' },
    { key: 'challenge', icon: Gamepad2, label: 'Challenge' },
  ];

  const completedStagesCount = stages.filter(s => missionProgress[s.key as keyof MissionProgress]).length;
  const progressPercent = (completedStagesCount / stages.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className={`relative cursor-pointer group flex flex-col h-full ${
        isCompleted ? 'text-green-400' : 'text-sky-400'
      }`}
    >
      {/* Cyber Border Background */}
      <div className={`absolute inset-0 cyber-border transition-all duration-500 ${
        isCompleted 
          ? 'bg-green-500/5 border-2 border-green-500/30' 
          : 'bg-slate-900/80 border-2 border-slate-800 group-hover:border-sky-500/50'
      }`} />
      
      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5 md:p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <div className={`p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-2xl transition-all duration-300 ${
            isCompleted ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-sky-400 group-hover:bg-sky-500/20'
          }`}>
            {React.cloneElement(mission.icon as React.ReactElement, {
              className: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'
            })}
          </div>
          
          {isCompleted ? (
            <div className="flex flex-col items-end gap-1">
              <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-green-500" />
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < missionProgress.stars ? "fill-amber-400 text-amber-400" : "text-slate-700"}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-800 rounded-md">
              Mission {index + 1}
            </div>
          )}
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-1.5 sm:mb-2 text-slate-100 group-hover:text-glow transition-all line-clamp-2">
          {mission.title}
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-8 flex-grow line-clamp-2 leading-relaxed">
          {mission.description}
        </p>
        
        <div className="space-y-4 sm:space-y-6 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex -space-x-1">
              {stages.map((stage) => {
                const Icon = stage.icon;
                const isDone = missionProgress[stage.key as keyof MissionProgress];
                return (
                  <div 
                    key={stage.key}
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-slate-900 flex items-center justify-center transition-all ${
                      isDone ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-600'
                    }`}
                    title={stage.label}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-bold text-slate-500 group-hover:text-sky-400 transition-colors">
              <span className="hidden xs:inline">VIEW</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                isCompleted ? 'bg-green-500' : 'bg-sky-500'
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
