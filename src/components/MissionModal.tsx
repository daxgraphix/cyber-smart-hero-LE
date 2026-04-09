import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Gamepad2, 
  GraduationCap, 
  Trophy,
  Star,
  X,
  CheckCircle2
} from 'lucide-react';
import { Mission, Profile, MissionProgress } from '../types';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Timer } from './Timer';
import { ChooseYourResponse } from './Games/ChooseYourResponse';
import { MatchThePairs } from './Games/MatchThePairs';
import { PasswordChecker } from './Games/PasswordChecker';
import { DragAndDrop } from './Games/DragAndDrop';
import { SpotThePhish } from './Games/SpotThePhish';
import { SpotTheAd } from './Games/SpotTheAd';
import { Sorting } from './Games/Sorting';
import { CodeBreaker } from './Games/CodeBreaker';
import { Avatar } from './Avatar';

interface MissionModalProps {
  mission: Mission;
  profile: Profile;
  onClose: () => void;
  onUpdateProfile: (updater: (p: Profile) => Profile) => void;
  playSound: (sound: string, note: string) => void;
  onMissionComplete: (missionId: string) => void;
}

export const MissionModal: React.FC<MissionModalProps> = ({ 
  mission, 
  profile, 
  onClose, 
  onUpdateProfile, 
  playSound, 
  onMissionComplete 
}) => {
  const [stage, setStage] = useState<'overview' | 'knowledge' | 'training' | 'challenge' | 'results'>('overview');
  const progress = profile.missionProgress[mission.id];

  const handleStageComplete = (completedStage: keyof MissionProgress) => {
    onUpdateProfile(p => {
      const newProgress = { ...p.missionProgress };
      newProgress[mission.id] = { ...newProgress[mission.id], [completedStage]: true };
      return { ...p, missionProgress: newProgress };
    });
  };
  
  const handleChallengeComplete = (stars: number, points: number) => {
    const isFirstCompletion = !progress.challenge;
    onUpdateProfile(p => {
      const newProgress = { ...p.missionProgress };
      newProgress[mission.id] = { 
        ...newProgress[mission.id], 
        challenge: true,
        stars: Math.max(stars, newProgress[mission.id].stars)
      };
      
      const updatedBadges = isFirstCompletion && !p.badges.includes(mission.id)
        ? [...p.badges, mission.id]
        : p.badges;
                
      return {
        ...p,
        totalPoints: p.totalPoints + points,
        missionProgress: newProgress,
        badges: updatedBadges,
      };
    });
    
    if (isFirstCompletion) {
      onMissionComplete(mission.id);
    }
    setStage('results');
  };

  return (
    <div className="flex flex-col h-full max-h-[90vh] bg-slate-950 cyber-grid relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 border-b border-slate-900 bg-slate-950/50 backdrop-blur-md relative z-10 gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 min-w-0">
          <div className="p-2 sm:p-3 md:p-4 bg-sky-500/10 rounded-lg sm:rounded-xl md:rounded-2xl text-sky-400 border border-sky-500/20 flex-shrink-0">
            {React.cloneElement(mission.icon as React.ReactElement, { 
              className: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7' 
            })}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tighter text-slate-100 uppercase line-clamp-1">{mission.title}</h2>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-[7px] sm:text-[9px] md:text-[10px] text-sky-500 uppercase tracking-[0.15em] font-black whitespace-nowrap">Protocol {mission.id.split('-')[0]}</span>
              <div className="h-0.5 w-0.5 rounded-full bg-slate-700" />
              <span className="text-[7px] sm:text-[9px] md:text-[10px] text-slate-500 uppercase tracking-[0.15em] font-black whitespace-nowrap">Active</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-lg sm:rounded-xl md:rounded-2xl w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:bg-red-500/10 hover:text-red-400 transition-all flex-shrink-0">
          <X className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {stage === 'overview' && (
            <OverviewStage 
              mission={mission} 
              progress={progress} 
              onStart={(s) => { playSound('click', 'C4'); setStage(s); }} 
            />
          )}
          {stage === 'knowledge' && (
            <KnowledgeStage 
              mission={mission} 
              onComplete={() => { handleStageComplete('knowledge'); setStage('training'); }} 
              onBack={() => setStage('overview')}
              playSound={playSound}
            />
          )}
          {stage === 'training' && (
            <TrainingStage 
              mission={mission} 
              onComplete={() => { handleStageComplete('training'); setStage('challenge'); }} 
              onBack={() => setStage('overview')}
              playSound={playSound}
            />
          )}
          {stage === 'challenge' && (
            <ChallengeStage 
              mission={mission} 
              onComplete={handleChallengeComplete} 
              playSound={playSound}
            />
          )}
          {stage === 'results' && (
            <ResultsStage 
              mission={mission} 
              profile={profile} 
              onClose={onClose} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface OverviewStageProps {
  mission: Mission;
  progress: MissionProgress;
  onStart: (s: 'knowledge' | 'training' | 'challenge') => void;
}

const OverviewStage: React.FC<OverviewStageProps> = ({ mission, progress, onStart }) => {
  const stages = [
    { key: 'knowledge', name: 'Knowledge', icon: <BookOpen size={20} />, completed: progress.knowledge, locked: false, color: 'sky' },
    { key: 'training', name: 'Training', icon: <GraduationCap size={20} />, completed: progress.training, locked: !progress.knowledge, color: 'purple' },
    { key: 'challenge', name: 'Challenge', icon: <Gamepad2 size={20} />, completed: progress.challenge, locked: !progress.training, color: 'green' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 sm:space-y-12 py-6 sm:py-8"
    >
      <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto px-2">
        <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-medium">{mission.description}</p>
        <div className="flex items-center justify-center gap-2 text-slate-500 font-mono text-[9px] sm:text-xs uppercase tracking-widest flex-wrap">
          <div className="h-px w-6 sm:w-8 bg-slate-800" />
          <span className="whitespace-nowrap">Protocol Analysis Required</span>
          <div className="h-px w-6 sm:w-8 bg-slate-800" />
        </div>
      </div>
      
      <div className="grid gap-4 sm:gap-5 md:gap-6 max-w-lg mx-auto px-2">
        {stages.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card 
              className={`relative overflow-hidden p-4 sm:p-5 md:p-6 border-2 transition-all duration-500 cyber-border ${
                s.locked ? 'opacity-40 grayscale bg-slate-900/50 border-slate-800' : 
                s.completed ? 'border-green-500/30 bg-green-500/5' : 'border-slate-800 bg-slate-900/80 hover:border-sky-500/50 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between relative z-10 gap-3 flex-wrap">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0">
                  <div className={`p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl transition-colors flex-shrink-0 ${
                    s.completed ? 'text-green-400 bg-green-400/10' : s.locked ? 'text-slate-600 bg-slate-800' : 'text-sky-400 bg-sky-400/10'
                  }`}>
                    {React.cloneElement(s.icon as React.ReactElement, { 
                      className: 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' 
                    })}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg md:text-xl font-black text-slate-100 tracking-tight">{s.name}</h4>
                    <p className="text-[9px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest">
                      {s.completed ? 'Protocol Verified' : s.locked ? 'Access Restricted' : 'Ready for Uplink'}
                    </p>
                  </div>
                </div>
                {!s.locked && !s.completed && (
                  <Button 
                    size="lg" 
                    onClick={() => onStart(s.key as any)}
                    className="rounded-lg sm:rounded-xl font-black uppercase tracking-widest text-xs px-4 sm:px-6 md:px-8 h-10 sm:h-12 whitespace-nowrap flex-shrink-0"
                  >
                    Start
                  </Button>
                )}
                {s.completed && (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-green-500 font-black text-[9px] sm:text-xs uppercase tracking-widest whitespace-nowrap flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline">Verified</span>
                  </div>
                )}
              </div>
              {/* Progress Line */}
              {!s.locked && !s.completed && (
                <div className="absolute bottom-0 left-0 h-1 bg-sky-500/20 w-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/2 bg-sky-500"
                  />
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-6 sm:pt-8 px-2">
        <Button 
          size="lg" 
          className="rounded-full px-6 sm:px-12 md:px-20 h-12 sm:h-16 md:h-20 text-base sm:text-lg md:text-2xl font-black uppercase tracking-tighter cyber-border hover:scale-105 transition-all shadow-[0_0_30px_rgba(14,165,233,0.2)]"
          onClick={() => {
            if (!progress.knowledge) onStart('knowledge');
            else if (!progress.training) onStart('training');
            else onStart('challenge');
          }}
        >
          {progress.challenge ? 'RE-INIT' : 'CONTINUE'}
        </Button>
      </div>
    </motion.div>
  );
};

interface KnowledgeStageProps {
  mission: Mission;
  onComplete: () => void;
  onBack: () => void;
  playSound: (sound: string, note: string) => void;
}

const KnowledgeStage: React.FC<KnowledgeStageProps> = ({ mission, onComplete, onBack, playSound }) => {
  const [page, setPage] = useState(0);
  const isLastPage = page === mission.knowledge.pages.length - 1;

  const handleNext = () => {
    playSound('click', 'E4');
    if (isLastPage) onComplete();
    else setPage(p => p + 1);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12 py-8"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full" />
          <Avatar avatarId="bot3" equipped={{ color: 'default', accessory: 'none' }} size={140} className="relative z-10" />
          <div className="absolute -top-4 -right-4 bg-sky-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-sky-500/40 uppercase tracking-widest">CYBIE AI</div>
        </motion.div>
        
        <Card className="p-10 bg-slate-900/80 backdrop-blur-xl border-slate-800 cyber-border relative w-full max-w-2xl shadow-2xl">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-900 border-t border-l border-slate-800 rotate-45" />
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-6">
              <h3 className="text-3xl font-black tracking-tight text-sky-400 uppercase">Intelligence Briefing</h3>
              <span className="text-xs font-mono text-slate-500 tracking-[0.3em]">PAGE {page + 1}/{mission.knowledge.pages.length}</span>
            </div>
            
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <p className="text-slate-200 text-2xl leading-relaxed text-center font-medium">{mission.knowledge.pages[page].text}</p>
            </motion.div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-800">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="rounded-xl text-slate-500 hover:text-slate-100 font-bold uppercase tracking-widest text-xs"
              >
                Abort Mission
              </Button>
              <Button 
                onClick={handleNext}
                className="rounded-xl px-10 h-14 text-lg font-black uppercase tracking-widest cyber-border shadow-lg shadow-sky-500/20"
              >
                {isLastPage ? 'Finish Briefing' : 'Next Protocol'}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

interface TrainingStageProps {
  mission: Mission;
  onComplete: () => void;
  onBack: () => void;
  playSound: (sound: string, note: string) => void;
}

const TrainingStage: React.FC<TrainingStageProps> = ({ mission, onComplete, onBack, playSound }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setFlipped] = useState(false);
  const cards = mission.training.flashcards;

  const navigate = (direction: number) => {
    playSound('click', 'D4');
    setFlipped(false);
    setTimeout(() => setCardIndex(i => Math.max(0, Math.min(cards.length - 1, i + direction))), 150);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12 flex flex-col items-center py-8"
    >
      <div className="text-center space-y-4">
        <h3 className="text-4xl font-black text-slate-100 tracking-tight uppercase">Training Deck</h3>
        <p className="text-slate-400 text-lg font-medium">Analyze the data. Click to reveal the protocol definition.</p>
      </div>

      <div 
        className="relative w-full max-w-md aspect-[4/3] perspective-1000 cursor-pointer group"
        onClick={() => { playSound('click', 'F4'); setFlipped(!isFlipped); }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-full h-full relative preserve-3d"
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-slate-900 border-2 border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-12 shadow-2xl group-hover:border-sky-500/50 transition-all cyber-border">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <GraduationCap size={120} />
            </div>
            <GraduationCap size={64} className="text-sky-500/20 mb-8" />
            <h4 className="text-4xl font-black text-center text-slate-100 tracking-tighter leading-none uppercase">{cards[cardIndex].term}</h4>
            <div className="mt-10 flex items-center gap-2 text-sky-500/40 text-[10px] font-black uppercase tracking-[0.3em]">
              <div className="h-1 w-1 rounded-full bg-sky-500/40" />
              <span>Click to Decrypt</span>
              <div className="h-1 w-1 rounded-full bg-sky-500/40" />
            </div>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-sky-500/5 border-2 border-sky-500/30 rounded-[2.5rem] flex items-center justify-center p-12 shadow-2xl rotate-y-180 cyber-border backdrop-blur-xl">
            <p className="text-2xl text-center text-slate-100 leading-relaxed font-bold tracking-tight">{cards[cardIndex].definition}</p>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-10 w-full max-w-md">
        <div className="flex items-center justify-between w-full px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => { e.stopPropagation(); navigate(-1); }} 
            disabled={cardIndex === 0}
            className="rounded-2xl w-14 h-14 bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-20"
          >
            <ArrowLeft size={24} />
          </Button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Module Progress</span>
            <span className="font-mono font-black text-xl text-sky-400">{cardIndex + 1} <span className="text-slate-700">/</span> {cards.length}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => { e.stopPropagation(); navigate(1); }} 
            disabled={cardIndex === cards.length - 1}
            className="rounded-2xl w-14 h-14 bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-20"
          >
            <ArrowRight size={24} />
          </Button>
        </div>

        <div className="flex gap-6 w-full">
          <Button variant="ghost" onClick={onBack} className="flex-1 rounded-2xl h-16 font-black uppercase tracking-widest text-xs text-slate-500 hover:text-slate-100">
            Abort Training
          </Button>
          <Button 
            onClick={onComplete} 
            disabled={cardIndex < cards.length - 1}
            className="flex-[2] rounded-2xl h-16 text-lg font-black uppercase tracking-widest cyber-border shadow-lg shadow-sky-500/20"
          >
            Start Challenge
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

interface ChallengeStageProps {
  mission: Mission;
  onComplete: (stars: number, points: number) => void;
  playSound: (sound: string, note: string) => void;
}

const ChallengeStage: React.FC<ChallengeStageProps> = ({ mission, onComplete, playSound }) => {
  const [started, setStarted] = useState(false);
  
  const handleEndChallenge = (score: number, totalQuestions: number) => {
    playSound('complete', 'C5');
    const percentage = totalQuestions > 0 ? (score / totalQuestions) : 0;
    let stars = percentage >= 0.9 ? 3 : percentage >= 0.6 ? 2 : score > 0 ? 1 : 0;
    let points = stars === 3 ? 100 : (stars === 2 ? 75 : (stars === 1 ? 50 : 0));
    onComplete(stars, points);
  };

  if (!started) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-12 py-20 text-center"
      >
        <div className="space-y-6">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex p-8 bg-amber-500/10 rounded-[2.5rem] text-amber-500 border-2 border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.1)]"
          >
            <Trophy size={80} />
          </motion.div>
          <div className="space-y-2">
            <h3 className="text-5xl font-black text-slate-100 uppercase tracking-tighter">Final Assessment</h3>
            <p className="text-slate-400 text-xl font-medium max-w-md mx-auto">
              You have <span className="text-sky-400 font-black">{mission.challenge.timeLimit} seconds</span> to complete the mission. 
              Precision is key, Hero.
            </p>
          </div>
        </div>
        
        <Button 
          size="lg" 
          onClick={() => { playSound('click', 'G4'); setStarted(true); }} 
          className="rounded-2xl px-20 h-20 text-2xl font-black uppercase tracking-widest cyber-border shadow-2xl shadow-sky-500/20 hover:scale-105 transition-all"
        >
          INITIATE CHALLENGE
        </Button>
      </motion.div>
    );
  }
  
  const gameProps = { 
    onComplete: handleEndChallenge, 
    playSound, 
    title: mission.challenge.title, 
    timeLimit: mission.challenge.timeLimit 
  };
  
  return (
    <div className="space-y-8 py-4">
      <div className="flex justify-between items-center bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4 text-sky-400">
          <div className="p-2 bg-sky-500/10 rounded-xl">
            <Gamepad2 size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Protocol</span>
            <span className="font-black text-lg text-slate-100">{mission.challenge.title}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-px bg-slate-800" />
          <Timer duration={mission.challenge.timeLimit} onTimeUp={() => handleEndChallenge(0, 1)} isPaused={false} />
        </div>
      </div>

      <div className="bg-slate-900/40 rounded-[2.5rem] p-10 border border-slate-800/50 backdrop-blur-sm min-h-[400px] flex flex-col justify-center">
        {mission.challenge.gameType === 'chooseYourResponse' && <ChooseYourResponse {...gameProps} challenges={mission.challenge.content} />}
        {mission.challenge.gameType === 'matchThePairs' && <MatchThePairs {...gameProps} challenges={mission.challenge.content} />}
        {mission.challenge.gameType === 'passwordChecker' && <PasswordChecker {...gameProps} challenges={mission.challenge.content} />}
        {mission.challenge.gameType === 'dragAndDrop' && <DragAndDrop {...gameProps} challenges={mission.challenge.content} />}
        {mission.challenge.gameType === 'spotThePhish' && <SpotThePhish {...gameProps} challenges={mission.challenge.content} />}
        {mission.challenge.gameType === 'spotTheAd' && <SpotTheAd {...gameProps} challenges={mission.challenge.content} />}
        {mission.challenge.gameType === 'sorting' && <Sorting {...gameProps} challenges={mission.challenge.content} />}
        {mission.challenge.gameType === 'codeBreaker' && <CodeBreaker {...gameProps} challenges={mission.challenge.content} />}
      </div>
    </div>
  );
};

interface ResultsStageProps {
  mission: Mission;
  profile: Profile;
  onClose: () => void;
}

const ResultsStage: React.FC<ResultsStageProps> = ({ mission, profile, onClose }) => {
  const progress = profile.missionProgress[mission.id];
  const stars = progress.stars;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-12 py-12 text-center"
    >
      <div className="space-y-6">
        <motion.div 
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
          className="w-48 h-48 mx-auto bg-amber-500/10 rounded-[3rem] flex items-center justify-center text-amber-500 border-4 border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.2)] relative group"
        >
          <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 scale-[2]">
            {mission.badgeIcon}
          </div>
        </motion.div>
        <div className="space-y-2">
          <h3 className="text-5xl font-black text-slate-100 uppercase tracking-tighter">Mission Accomplished</h3>
          <p className="text-slate-400 text-xl font-medium">Protocol verified. You've earned the <span className="text-amber-400 font-black">{mission.badgeName}</span> badge!</p>
        </div>
      </div>

      <div className="flex gap-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
          >
            <Star 
              size={64} 
              className={i < stars ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" : "text-slate-800"} 
            />
          </motion.div>
        ))}
      </div>

      <div className="pt-8">
        <Button 
          size="lg" 
          onClick={onClose} 
          className="rounded-2xl px-20 h-20 text-2xl font-black uppercase tracking-widest cyber-border shadow-2xl shadow-sky-500/20 hover:scale-105 transition-all"
        >
          Return to City
        </Button>
      </div>
    </motion.div>
  );
};
