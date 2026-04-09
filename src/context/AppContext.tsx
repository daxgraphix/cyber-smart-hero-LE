import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { Profile, AppScreen } from '../types';

const STORAGE_KEY = 'cyberSmartHeroProfile';

interface AppContextType {
  profile: Profile;
  updateProfile: (updater: (p: Profile) => Profile) => void;
  resetProfile: () => void;
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentMissionId: string | null;
  setCurrentMissionId: (id: string | null) => void;
  isHandbookOpen: boolean;
  setIsHandbookOpen: (open: boolean) => void;
  isAchievementsOpen: boolean;
  setIsAchievementsOpen: (open: boolean) => void;
}

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

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultProfile,
          ...parsed,
          missionProgress: parsed.missionProgress || {}
        };
      }
    } catch (e) {
      console.error('Failed to load profile:', e);
    }
    return defaultProfile;
  });

  const [screen, setScreen] = useState<AppScreen>('splash');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMissionId, setCurrentMissionId] = useState<string | null>(null);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  useEffect(() => {
    if (profile.username) {
      setScreen('dashboard');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('cyberSmartHeroTheme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
  }, [profile]);

  const updateProfile = useCallback((updater: (p: Profile) => Profile) => {
    setProfile(updater);
  }, []);

  const resetProfile = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(defaultProfile);
    setScreen('splash');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value: AppContextType = {
    profile,
    updateProfile,
    resetProfile,
    screen,
    setScreen,
    theme,
    toggleTheme,
    soundEnabled,
    setSoundEnabled,
    sidebarOpen,
    setSidebarOpen,
    currentMissionId,
    setCurrentMissionId,
    isHandbookOpen,
    setIsHandbookOpen,
    isAchievementsOpen,
    setIsAchievementsOpen
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
