import type { ProjectState, UserProfile } from '../types';

const storageKey = 'pitchpilot-state';

const wait = (milliseconds: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });

export const loadProjectState = async (): Promise<ProjectState | null> => {
  await wait(240);
  const stored = window.localStorage.getItem(storageKey);
  return stored ? (JSON.parse(stored) as ProjectState) : null;
};

export const saveProjectState = async (state: ProjectState): Promise<void> => {
  await wait(120);
  window.localStorage.setItem(storageKey, JSON.stringify(state));
};

export const createSession = async (profile: UserProfile): Promise<UserProfile> => {
  await wait(360);
  return profile;
};

export const clearSession = async (): Promise<void> => {
  await wait(160);
  window.localStorage.removeItem(storageKey);
};
