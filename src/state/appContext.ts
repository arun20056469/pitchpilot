import { createContext } from 'react';
import type { ProjectState, UserProfile, View } from '../types';

export type AppContextValue = {
  state: ProjectState;
  booting: boolean;
  saving: boolean;
  login: (profile: UserProfile) => Promise<void>;
  logout: () => void;
  setView: (view: View) => void;
  toggleSegment: (id: string) => void;
  toggleSkill: (scope: 'frontendSkills' | 'backendSkills', id: string) => void;
  setNotes: (notes: string) => void;
  updateChallenge: (id: string, field: 'title' | 'cause' | 'solution' | 'learning', value: string) => void;
};

export const AppContext = createContext<AppContextValue | null>(null);
