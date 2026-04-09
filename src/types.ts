export type GameType = 'matchThePairs' | 'passwordChecker' | 'spotThePhish' | 'chooseYourResponse' | 'dragAndDrop' | 'spotTheAd' | 'sorting' | 'codeBreaker';

export interface Flashcard {
  term: string;
  definition: string;
}

export interface KnowledgePage {
  text: string;
  image?: string;
}

export interface ChallengeOption {
  text: string;
  feedback: string;
  correct: boolean;
}

export interface Hotspot {
  style: {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    width: string;
    height: string;
  };
  explanation: string;
}

export interface ChallengeContent {
  action?: string;
  consequence?: string;
  scenario?: string;
  options?: ChallengeOption[];
  rules?: {
    minLength: number;
    needsNumber: boolean;
    needsSymbol: boolean;
    needsUpper: boolean;
    needsLower: boolean;
  };
  title?: string;
  hotspots?: Hotspot[];
  text?: string;
  type?: 'safe' | 'unsafe';
}

export interface Mission {
  id: string;
  title: string;
  badgeName: string;
  icon: import('react').ReactNode;
  badgeIcon: import('react').ReactNode;
  description: string;
  knowledge: {
    title: string;
    pages: KnowledgePage[];
  };
  training: {
    title: string;
    flashcards: Flashcard[];
  };
  challenge: {
    title: string;
    gameType: GameType;
    timeLimit: number;
    content: ChallengeContent[];
  };
}

export interface MissionProgress {
  knowledge: boolean;
  training: boolean;
  challenge: boolean;
  stars: number;
}

export interface Profile {
  username: string | null;
  avatarId: string | null;
  colorId: string;
  totalPoints: number;
  missionProgress: Record<string, MissionProgress>;
  badges: string[];
  unlockedItems: string[];
  equipped: {
    color: string;
    accessory: string;
  };
}

export type AppScreen = 'splash' | 'login' | 'avatar' | 'welcome' | 'dashboard';
