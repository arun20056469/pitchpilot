import type { LucideIcon } from 'lucide-react';

export type Role = 'Frontend Developer' | 'Backend Developer' | 'Full Stack Developer';

export type View = 'dashboard' | 'storyline' | 'technical' | 'rehearsal' | 'script';

export type UserProfile = {
  name: string;
  role: Role;
  projectName: string;
};

export type StorySegment = {
  id: string;
  title: string;
  duration: number;
  prompt: string;
  talkingPoints: string[];
  isReady: boolean;
};

export type TechnicalSkill = {
  id: string;
  label: string;
  detail: string;
  checked: boolean;
};

export type Challenge = {
  id: string;
  title: string;
  cause: string;
  solution: string;
  learning: string;
};

export type ProjectState = {
  user: UserProfile | null;
  activeView: View;
  segments: StorySegment[];
  frontendSkills: TechnicalSkill[];
  backendSkills: TechnicalSkill[];
  challenges: Challenge[];
  notes: string;
};

export type NavItem = {
  id: View;
  label: string;
  icon: LucideIcon;
};
