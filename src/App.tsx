import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Trophy, 
  Settings, 
  Book, 
  LogOut, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  UserCheck,
  Zap,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast, Toaster } from 'sonner';

import { Avatar } from './components/Avatar';
import { MissionCard } from './components/MissionCard';
import { MissionModal } from './components/MissionModal';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Dialog, DialogContent } from './components/ui/dialog';
import { missions, avatarsInfo, customizations } from './constants';
import { useSound } from './hooks/useSound';
import { sanitizeInput, validateUsername } from './lib/security';
import type { Profile, Mission, MissionProgress } from './types';
import { Handbook } from './components/Handbook';
import { Achievements } from './components/Achievements';

const defaultProfile: Profile = {
  username: null,
  avatarId: null,
  colorId: 'default',
  totalPoints: 0,
  missionProgress: {},
  badges: [],
  unlockedItems: ['default', 'none'],
  equipped: { color: 'default', accessory: 'none' }
};

// Initialize mission progress for all missions
const initializeMissionProgress = () => {
  const progress: Record<string, MissionProgress> = {};
  Object.keys(missions).forEach(missionId => {
    progress[missionId] = {
      knowledge: false,
      training: false,
      challenge: false,
      stars: 0
    };
  });
  return progress;
};

const SystemFeed = () => {
  const [logs, setLogs] = useState([
    { id: 1, text: 'Security protocols updated', time: '2m ago', type: 'info' },
    { id: 2, text: 'New hero detected in sector 7', time: '5m ago', type: 'alert' },
    { id: 3, text: 'Encryption layer 4 stabilized', time: '12m ago', type: 'success' },
    { id: 4, text: 'Unauthorized access attempt blocked', time: '15m ago', type: 'warning' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        text: [
          'Scanning for vulnerabilities...',
          'Firewall integrity check: 100%',
          'Data packets encrypted',
          'Neural link synchronized',
          'Cyber City status: SECURE'
        ][Math.floor(Math.random() * 5)],
        time: 'Just now',
        type: ['info', 'success', 'alert'][Math.floor(Math.random() * 3)]
      };
      setLogs(prev => [newLog, ...prev.slice(0, 3)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">System Logs</h3>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-sky-500 animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-sky-500 animate-pulse delay-75" />
          <div className="w-1 h-1 rounded-full bg-sky-500 animate-pulse delay-150" />
        </div>
      </div>
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {logs.map(log => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center justify-between p-3 bg-slate-900/30 rounded-xl border border-slate-800/50 text-[10px] font-mono"
            >
              <div className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full ${
                  log.type === 'success' ? 'bg-green-500' : 
                  log.type === 'alert' ? 'bg-sky-500' : 
                  log.type === 'warning' ? 'bg-amber-500' : 'bg-slate-500'
                }`} />
                <span className="text-slate-300 uppercase">{log.text}</span>
              </div>
              <span className="text-slate-600">{log.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'login' | 'avatar' | 'welcome' | 'dashboard'>('splash');
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [heroName, setHeroName] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentMissionId, setCurrentMissionId] = useState<string | null>(null);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const { init: initSound, play: playSound, toggle: toggleSound, isEnabled: soundIsEnabled } = useSound();

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('cyberSmartHeroProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        const initializedProgress = initializeMissionProgress();
        setProfile({ 
          ...defaultProfile, 
          ...parsed,
          missionProgress: { ...initializedProgress, ...parsed.missionProgress }
        });
        if (parsed.settings) {
          setTheme(parsed.settings.theme || 'dark');
          setSoundEnabled(parsed.settings.soundEnabled ?? true);
        }
      } else {
        // Initialize new profile with mission progress
        setProfile(p => ({
          ...p,
          missionProgress: initializeMissionProgress()
        }));
      }
    } catch (e) {
      console.error("Failed to load profile", e);
      // Initialize with mission progress on error
      setProfile(p => ({
        ...p,
        missionProgress: initializeMissionProgress()
      }));
    }
  }, []);

  useEffect(() => {
    const profileToSave = { ...profile, settings: { theme, soundEnabled } };
    localStorage.setItem('cyberSmartHeroProfile', JSON.stringify(profileToSave));
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [profile, theme, soundEnabled]);

  const handleMissionComplete = useCallback((missionId: string) => {
    const mission = missions[missionId];
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#4ade80', '#facc15']
    });
    toast.success(`Badge Unlocked: ${mission.badgeName}!`, {
      description: "You're becoming a true Cyber Hero!",
    });
  }, []);

  const toggleTheme = useCallback(() => {
    playSound('click', 'E4');
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, [playSound]);

  const handleReset = useCallback(() => {
    if (confirm("Are you sure you want to reset all progress?")) {
      localStorage.removeItem('cyberSmartHeroProfile');
      window.location.reload();
    }
  }, []);

  const handleLogin = useCallback(() => {
    const validation = validateUsername(heroName);
    if (validation.isValid) {
      const sanitized = sanitizeInput(heroName);
      setProfile(p => ({ ...p, username: sanitized }));
      playSound('click', 'D4');
      setScreen('avatar');
    } else {
      toast.error(validation.error || 'Invalid username');
    }
  }, [heroName, playSound]);

  const handleAvatarSelect = useCallback((avatarId: string) => {
    try {
      playSound('click', 'E4');
    } catch (e) {
      console.error('Sound play error:', e);
    }
    setProfile(p => ({ ...p, avatarId }));
  }, [playSound]);

  const handleColorSelect = useCallback((colorId: string) => {
    playSound('click', 'F4');
    setProfile(p => ({ ...p, colorId, equipped: { ...p.equipped, color: colorId } }));
  }, [playSound]);

  const handleMissionClick = useCallback((missionId: string) => {
    playSound('click', 'C4');
    setCurrentMissionId(missionId);
  }, [playSound]);

  const missionsList = useMemo(() => Object.values(missions), []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Toaster position="top-center" />
      
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <motion.div 
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="fixed inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 z-50 bg-slate-950 overflow-hidden cyber-grid"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/4 -left-1/4 w-[100%] h-[100%] bg-sky-500/10 rounded-full blur-[120px]" 
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/4 -right-1/4 w-[100%] h-[100%] bg-purple-500/10 rounded-full blur-[120px]" 
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center space-y-6 sm:space-y-8 md:space-y-12 relative z-10 w-full max-w-4xl"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  filter: ["drop-shadow(0 0 0px rgba(56,189,248,0))", "drop-shadow(0 0 20px rgba(56,189,248,0.4))", "drop-shadow(0 0 0px rgba(56,189,248,0))"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block p-4 sm:p-6 md:p-8 bg-sky-500/10 rounded-2xl sm:rounded-3xl md:rounded-[3rem] border border-sky-500/20 backdrop-blur-md mb-2 sm:mb-4 relative"
              >
                <Shield size={60} className="sm:w-20 sm:h-20 md:w-32 md:h-32 w-16 h-16 text-sky-400 mx-auto" />
                <div className="absolute -inset-1 bg-sky-500/20 blur-xl rounded-2xl sm:rounded-3xl md:rounded-[3rem] -z-10 animate-pulse" />
              </motion.div>

              <div className="space-y-4 sm:space-y-6 md:space-y-6">
                <motion.h1 
                  initial={{ letterSpacing: "0.5em", opacity: 0 }}
                  animate={{ letterSpacing: "-0.05em", opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] uppercase"
                >
                  <span className="bg-gradient-to-b from-white via-white to-slate-500 text-transparent bg-clip-text">CYBER</span>
                  <br />
                  <span className="text-sky-500 text-glow">SMART</span>
                  <br />
                  <span className="bg-gradient-to-t from-slate-600 to-slate-300 text-transparent bg-clip-text">HERO</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 text-slate-500 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] sm:text-xs md:text-sm flex-wrap px-2"
                >
                  <div className="h-px w-8 sm:w-12 bg-slate-800" />
                  <span className="whitespace-nowrap">Elite Digital Defense Academy</span>
                  <div className="h-px w-8 sm:w-12 bg-slate-800" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full"
              >
                <Button 
                  size="lg" 
                  onClick={() => { 
                    try {
                      initSound(); 
                      const nextScreen = profile.username ? 'dashboard' : 'login';
                      playSound('click', 'C4'); 
                      setScreen(nextScreen);
                    } catch (e) {
                      console.error('Initialization error:', e);
                      setScreen(profile.username ? 'dashboard' : 'login'); 
                    }
                  }}
                  className="group relative overflow-hidden rounded-full px-6 sm:px-12 md:px-20 py-3 sm:py-4 md:py-6 text-sm sm:text-lg md:text-2xl lg:text-3xl font-black bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_50px_rgba(14,165,233,0.4)] transition-all hover:scale-105 active:scale-95 cyber-border w-full sm:w-auto max-w-md"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                    <span className="hidden sm:inline">INITIATE PROTOCOL</span>
                    <span className="sm:hidden">START</span>
                    <ChevronRight className="group-hover:translate-x-2 transition-transform w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </Button>
                
                <div className="flex flex-col xs:flex-row items-center gap-3 xs:gap-4 md:gap-6 text-slate-600 font-mono text-[9px] xs:text-[10px] sm:text-xs tracking-widest flex-wrap justify-center">
                  <span className="flex items-center gap-2 whitespace-nowrap"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SYSTEM ONLINE</span>
                  <span className="flex items-center gap-2 whitespace-nowrap"><div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" /> ENCRYPTION ACTIVE</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {screen === 'login' && (
          <motion.div 
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 cyber-grid"
          >
            <Card className="w-full max-w-2xl p-6 sm:p-8 md:p-10 space-y-8 sm:space-y-10 bg-slate-900/80 backdrop-blur-2xl border-slate-800 cyber-border shadow-2xl shadow-sky-500/10">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-sky-500/10 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-sky-500/20">
                  <UserCheck className="text-sky-400 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">Identity Check</h2>
                <p className="text-sm sm:text-base text-slate-400 font-medium">What should we call our new hero?</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <input
                    autoFocus
                    type="text"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder="Enter your hero name..."
                    className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-lg sm:text-xl md:text-2xl text-center focus:border-sky-500 outline-none transition-all font-bold placeholder:text-slate-700"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleLogin();
                    }}
                  />
                  <div className="flex items-center justify-center gap-2 text-slate-600 text-[9px] sm:text-[10px] md:text-xs font-black tracking-widest uppercase flex-wrap">
                    <div className="h-px w-4 bg-slate-800" />
                    <span className="whitespace-nowrap">Press Enter to continue</span>
                    <div className="h-px w-4 bg-slate-800" />
                  </div>
                </div>

                <Button 
                  className="w-full h-12 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl text-base sm:text-lg md:text-xl font-black uppercase tracking-widest bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                  disabled={!heroName.trim()}
                  onClick={handleLogin}
                >
                  Next
                  <ChevronRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {screen === 'avatar' && (
          <motion.div 
            key="avatar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
          >
            <div className="w-full max-w-6xl space-y-8 sm:space-y-10 md:space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">Customize Your Hero</h2>
                <p className="text-sm sm:text-base text-slate-400">Choose your look before entering Cyber City.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="flex flex-col items-center space-y-6 md:space-y-8">
                  <Avatar 
                    avatarId={profile.avatarId} 
                    equipped={profile.equipped} 
                    size={160}
                    className="sm:w-48 sm:h-48 md:w-60 md:h-60 shadow-2xl shadow-sky-500/10 w-40 h-40"
                  />
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
                    {avatarsInfo.map(av => (
                      <button
                        key={av.id}
                        onClick={() => handleAvatarSelect(av.id)}
                        className={`p-1.5 sm:p-2 rounded-lg sm:rounded-2xl border-2 transition-all ${profile.avatarId === av.id ? 'border-sky-500 bg-sky-500/10 scale-110' : 'border-slate-800 hover:border-slate-600'}`}
                      >
                        <Avatar avatarId={av.id} equipped={{ color: profile.colorId, accessory: 'none' }} size={45} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500">Hero Color</h3>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-2 sm:gap-3">
                      {customizations.colors.map(c => (
                        <button
                          key={c.id}
                          onClick={() => handleColorSelect(c.id)}
                          className={`aspect-square rounded-lg sm:rounded-xl border-4 transition-all ${profile.colorId === c.id ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                          style={{ backgroundColor: c.value }}
                        />
                      ))}
                    </div>
                  </div>

                  <Button 
                    disabled={!profile.avatarId}
                    onClick={() => { 
                      try {
                        setScreen('dashboard'); 
                        playSound('click', 'G4');
                      } catch (e) {
                        console.error('Navigation error:', e);
                        setScreen('dashboard');
                      }
                    }}
                    className="w-full rounded-lg sm:rounded-2xl h-11 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg font-bold px-4 sm:px-6"
                  >
                    Enter Cyber City
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-screen overflow-hidden"
          >
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                  className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 lg:hidden"
                />
              )}
            </AnimatePresence>

            <aside className={`fixed inset-y-0 left-0 z-40 w-72 sm:w-80 md:w-80 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/95 border-r border-slate-800 transition-transform lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex flex-col h-full p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                  <motion.div 
                    className="flex items-center gap-3 sm:gap-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-sky-500/20 to-sky-600/20 rounded-lg sm:rounded-2xl border border-sky-500/30 shadow-lg shadow-sky-500/20">
                      <Shield className="text-sky-400 w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h1 className="text-lg sm:text-2xl font-black tracking-tighter leading-tight">
                        CYBER<br /><span className="text-sky-500 text-sm sm:text-base">HERO</span>
                      </h1>
                    </div>
                  </motion.div>
                  <Button variant="ghost" size="icon" className="lg:hidden rounded-lg" onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Navigation Section */}
                <nav className="flex-grow space-y-1 sm:space-y-2">
                  <div className="text-[8px] font-black uppercase tracking-widest text-slate-600 px-4 py-2">Navigation</div>
                  
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start gap-3 sm:gap-4 h-12 sm:h-14 rounded-xl sm:rounded-2xl transition-all px-4 sm:px-6 text-sm sm:text-base font-bold ${!isAchievementsOpen && !isHandbookOpen ? 'bg-gradient-to-r from-sky-500/20 to-sky-600/10 text-sky-300 shadow-[0_0_20px_rgba(14,165,233,0.15)] border border-sky-500/30' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 border border-transparent'}`}
                      onClick={() => { playSound('click', 'C4'); setIsAchievementsOpen(false); setIsHandbookOpen(false); setIsSettingsOpen(false); setSidebarOpen(false); }}
                    >
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <span className="font-black uppercase tracking-widest text-xs flex-grow">Missions</span>
                      <Zap className="w-4 h-4 opacity-50" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start gap-3 sm:gap-4 h-12 sm:h-14 rounded-xl sm:rounded-2xl transition-all px-4 sm:px-6 text-sm sm:text-base font-bold ${isAchievementsOpen ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)] border border-amber-500/30' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 border border-transparent'}`}
                      onClick={() => { playSound('click', 'C4'); setIsAchievementsOpen(true); setIsHandbookOpen(false); setIsSettingsOpen(false); setSidebarOpen(false); }}
                    >
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <span className="font-black uppercase tracking-widest text-xs flex-grow">Achievements</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start gap-3 sm:gap-4 h-12 sm:h-14 rounded-xl sm:rounded-2xl transition-all px-4 sm:px-6 text-sm sm:text-base font-bold ${isHandbookOpen ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/10 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.15)] border border-purple-500/30' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 border border-transparent'}`}
                      onClick={() => { playSound('click', 'C4'); setIsHandbookOpen(true); setIsAchievementsOpen(false); setIsSettingsOpen(false); setSidebarOpen(false); }}
                    >
                      <Book className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <span className="font-black uppercase tracking-widest text-xs flex-grow">Handbook</span>
                      <Eye className="w-4 h-4 opacity-50" />
                    </Button>
                  </motion.div>
                </nav>

                {/* Settings & Controls Section */}
                <div className="pt-6 sm:pt-8 border-t border-slate-800/50 space-y-4 sm:space-y-6">
                  {/* Settings Button */}
                  <motion.div whileHover={{ x: 4 }}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start gap-3 sm:gap-4 h-11 sm:h-13 rounded-xl sm:rounded-2xl transition-all px-4 sm:px-6 text-sm font-bold ${isSettingsOpen ? 'bg-gradient-to-r from-slate-700/50 to-slate-800/50 text-slate-100 border border-slate-700' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50 border border-transparent'}`}
                      onClick={() => setIsSettingsOpen(true)}
                    >
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="font-black uppercase tracking-widest text-xs">Settings</span>
                    </Button>
                  </motion.div>

                  {/* Quick Controls */}
                  <div className="flex items-center justify-between gap-2 px-2 py-3 bg-slate-900/50 rounded-xl border border-slate-800/30">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => { toggleSound(); playSound('click', 'D4'); }} 
                        title={soundEnabled ? "Sound On" : "Sound Off"}
                        className="rounded-lg w-9 h-9 sm:w-10 sm:h-10 hover:bg-slate-800/70 transition-colors"
                      >
                        {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />}
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleTheme}
                        title={theme === 'dark' ? "Light Mode" : "Dark Mode"}
                        className="rounded-lg w-9 h-9 sm:w-10 sm:h-10 hover:bg-slate-800/70 transition-colors"
                      >
                        {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />}
                      </Button>
                    </motion.div>

                    <div className="h-6 w-px bg-slate-700/50" />
                    
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleReset}
                        title="Logout & Reset"
                        className="rounded-lg w-9 h-9 sm:w-10 sm:h-10 text-red-400/70 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </motion.div>
                  </div>
                  
                  {/* Profile Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 sm:p-5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 rounded-2xl sm:rounded-3xl border border-slate-800/60 backdrop-blur-sm shadow-lg shadow-slate-900/30"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Avatar avatarId={profile.avatarId} equipped={profile.equipped} size={40} className="w-10 h-10 sm:w-12 sm:h-12 ring-2 ring-sky-500/30" />
                      </motion.div>
                      <div className="overflow-hidden min-w-0 flex-grow">
                        <p className="font-black text-slate-100 truncate text-sm sm:text-base">{profile.username || 'Hero'}</p>
                        <p className="text-[8px] sm:text-[9px] text-sky-400 uppercase tracking-[0.2em] font-black">Level 1 Guardian</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[7px] font-black uppercase tracking-widest text-slate-500">
                        <span>XP Progress</span>
                        <span>75 / 100</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-sky-500 to-sky-400 shadow-[0_0_12px_rgba(14,165,233,0.6)]"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* System Feed - Desktop Only */}
                  <div className="hidden lg:block pt-4 border-t border-slate-800/30">
                    <SystemFeed />
                  </div>
                </div>
              </div>
            </aside>

            <main className="flex-grow overflow-y-auto bg-slate-950 relative cyber-grid">
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]" />
              </div>

              <div className="p-4 sm:p-6 lg:p-8 xl:p-12 max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12 relative min-h-full flex flex-col">
                <header className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Button variant="ghost" size="icon" className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-slate-900 border border-slate-800" onClick={() => setSidebarOpen(true)}>
                      <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Button>
                    <div className="min-w-0">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter uppercase leading-none">Cyber City</h2>
                      <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1">Welcome back, Hero. Choose your next mission.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 bg-slate-900/40 p-3 sm:p-4 rounded-2xl sm:rounded-[2rem] border border-slate-800/50 backdrop-blur-xl flex-shrink-0">
                    <div className="text-right">
                      <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-black">Total Points</p>
                      <p className="text-lg sm:text-2xl lg:text-3xl font-black text-sky-400 text-glow leading-none">{profile.totalPoints.toLocaleString()}</p>
                    </div>
                    <div className="h-8 sm:h-10 w-px bg-slate-800" />
                    <div className="text-right">
                      <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-black">Badges</p>
                      <p className="text-lg sm:text-2xl lg:text-3xl font-black text-amber-400 text-glow leading-none">{profile.badges.length}</p>
                    </div>
                  </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {missionsList.map((m, i) => (
                      <MissionCard 
                        key={m.id} 
                        mission={m} 
                        index={i}
                        progress={profile.missionProgress[m.id]} 
                        onClick={() => handleMissionClick(m.id)}
                      />
                    ))}
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl sm:rounded-[2.5rem] cyber-border relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Trophy className="w-20 h-20 sm:w-32 sm:h-32" />
                      </div>
                      <div className="relative z-10 space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 bg-amber-500/10 rounded-lg sm:rounded-2xl text-amber-500">
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">Hero Rank</h3>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Global Standing</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-end">
                            <span className="text-4xl font-black text-slate-100">#1,248</span>
                            <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                              <ChevronRight size={12} className="-rotate-90" /> +12 today
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            Complete more missions to climb the global leaderboard and unlock elite gear.
                          </p>
                        </div>

                        <Button className="w-full rounded-2xl h-14 font-black uppercase tracking-widest text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700">
                          View Leaderboard
                        </Button>
                      </div>
                    </motion.div>

                    <div className="lg:hidden">
                      <SystemFeed />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={!!currentMissionId} onOpenChange={(open) => !open && setCurrentMissionId(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-slate-950 border-slate-800 sm:rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          {currentMissionId && (
            <MissionModal 
              mission={missions[currentMissionId]} 
              profile={profile}
              onClose={() => setCurrentMissionId(null)}
              onUpdateProfile={setProfile}
              playSound={playSound}
              onMissionComplete={handleMissionComplete}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isHandbookOpen} onOpenChange={setIsHandbookOpen}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800 sm:rounded-[2.5rem] p-8 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <Handbook />
        </DialogContent>
      </Dialog>

      <Dialog open={isAchievementsOpen} onOpenChange={setIsAchievementsOpen}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800 sm:rounded-[2.5rem] p-8 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <Achievements profile={profile} />
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-md w-[95vw] bg-slate-950 border-slate-800 sm:rounded-3xl p-6 sm:p-8 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl border border-slate-700">
                  <Settings className="w-6 h-6 text-slate-300" />
                </div>
                Settings
              </h2>
              <p className="text-sm text-slate-400">Customize your experience</p>
            </div>

            <div className="space-y-4">
              {/* Sound Toggle */}
              <motion.div
                whileHover={{ x: 4 }}
                className="p-4 sm:p-5 bg-slate-900/50 rounded-xl border border-slate-800/60 hover:bg-slate-900/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                      {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-100">Sound Effects</p>
                      <p className="text-xs text-slate-500">{soundEnabled ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { 
                      toggleSound(); 
                      playSound('click', 'D4');
                    }}
                    className="text-xs rounded-lg bg-slate-800 border-slate-700 hover:bg-slate-700"
                  >
                    {soundEnabled ? 'Off' : 'On'}
                  </Button>
                </div>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div
                whileHover={{ x: 4 }}
                className="p-4 sm:p-5 bg-slate-900/50 rounded-xl border border-slate-800/60 hover:bg-slate-900/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-600/20 text-slate-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-100">Theme</p>
                      <p className="text-xs text-slate-500 capitalize">{theme} Mode</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="text-xs rounded-lg bg-slate-800 border-slate-700 hover:bg-slate-700"
                  >
                    {theme === 'dark' ? 'Light' : 'Dark'}
                  </Button>
                </div>
              </motion.div>

              {/* Reset Progress */}
              <motion.div
                whileHover={{ x: 4 }}
                className="p-4 sm:p-5 bg-red-950/20 rounded-xl border border-red-900/40 hover:bg-red-950/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-100">Reset All</p>
                      <p className="text-xs text-slate-500">Clear progress and logout</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSettingsOpen(false);
                      handleReset();
                    }}
                    className="text-xs rounded-lg border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    Reset
                  </Button>
                </div>
              </motion.div>

              {/* Info Section */}
              <div className="p-4 sm:p-5 bg-slate-900/30 rounded-xl border border-slate-800/30 space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">App Info</p>
                <div className="space-y-1 text-xs text-slate-500">
                  <p>Version: 1.0.0</p>
                  <p>Missions Completed: {profile.badges.length}</p>
                  <p>Total Points: {profile.totalPoints.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsSettingsOpen(false)}
              className="w-full rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold py-2"
            >
              Close
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
