import { useState, useCallback, useEffect } from 'react';
import type { Profile, AppScreen } from '../types';

const STORAGE_KEY = 'cyberSmartHeroProfile';

interface StoredProfile extends Omit<Profile, 'missionProgress'> {
  settings?: {
    theme?: 'dark' | 'light';
    soundEnabled?: boolean;
  };
  missionProgress?: Record<string, {
    knowledge: boolean;
    training: boolean;
    challenge: boolean;
    stars: number;
  }>;
}

const defaultMissionProgress = {
  knowledge: false,
  training: false,
  challenge: false,
  stars: 0
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile>({
    username: null,
    avatarId: null,
    colorId: 'default',
    totalPoints: 0,
    missionProgress: {},
    badges: [],
    unlockedItems: ['default', 'none'],
    equipped: { color: 'default', accessory: 'none' }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredProfile = JSON.parse(stored);
        setProfile({
          username: parsed.username ?? null,
          avatarId: parsed.avatarId ?? null,
          colorId: parsed.colorId ?? 'default',
          totalPoints: parsed.totalPoints ?? 0,
          missionProgress: parsed.missionProgress ?? {},
          badges: parsed.badges ?? [],
          unlockedItems: parsed.unlockedItems ?? ['default', 'none'],
          equipped: parsed.equipped ?? { color: 'default', accessory: 'none' }
        });
      }
    } catch (e) {
      console.error('Failed to load profile:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback((updater: (p: Profile) => Profile) => {
    setProfile(prev => {
      const updated = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save profile:', e);
      }
      return updated;
    });
  }, []);

  const resetProfile = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile({
      username: null,
      avatarId: null,
      colorId: 'default',
      totalPoints: 0,
      missionProgress: {},
      badges: [],
      unlockedItems: ['default', 'none'],
      equipped: { color: 'default', accessory: 'none' }
    });
  }, []);

  return { profile, updateProfile, resetProfile, isLoading };
}

export function useAppState() {
  const [screen, setScreen] = useState<AppScreen>('splash');
  
  const getInitialScreen = useCallback((profile: Profile): AppScreen => {
    if (profile.username) return 'dashboard';
    return 'splash';
  }, []);

  return { screen, setScreen, getInitialScreen };
}
