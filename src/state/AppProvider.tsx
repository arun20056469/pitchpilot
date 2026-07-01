import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { defaultChallenges, defaultSegments, frontendSkills, backendSkills } from '../data/blueprint';
import { createSession, loadProjectState, saveProjectState } from '../services/mockApi';
import type { ProjectState, UserProfile, View } from '../types';
import { AppContext } from './appContext';

type Action =
  | { type: 'hydrate'; payload: ProjectState }
  | { type: 'login'; payload: UserProfile }
  | { type: 'logout' }
  | { type: 'view'; payload: View }
  | { type: 'toggleSegment'; payload: string }
  | { type: 'toggleSkill'; payload: { scope: 'frontendSkills' | 'backendSkills'; id: string } }
  | { type: 'notes'; payload: string }
  | { type: 'updateChallenge'; payload: { id: string; field: 'title' | 'cause' | 'solution' | 'learning'; value: string } };

const initialState: ProjectState = {
  user: null,
  activeView: 'dashboard',
  segments: defaultSegments,
  frontendSkills,
  backendSkills,
  challenges: defaultChallenges,
  notes: 'I built PitchPilot to help candidates turn a project into a clear 5-7 minute technical explanation. My main contribution was the frontend architecture, reusable dashboard widgets, rehearsal timer, and persistent preparation workflow.',
};

const hydrateState = (loadedState: ProjectState): ProjectState => ({
  ...initialState,
  ...loadedState,
  segments: defaultSegments.map((segment) => ({
    ...segment,
    isReady: loadedState.segments.find((savedSegment) => savedSegment.id === segment.id)?.isReady ?? segment.isReady,
  })),
  frontendSkills: frontendSkills.map((skill) => ({
    ...skill,
    checked: loadedState.frontendSkills.find((savedSkill) => savedSkill.id === skill.id)?.checked ?? skill.checked,
  })),
  backendSkills: backendSkills.map((skill) => ({
    ...skill,
    checked: loadedState.backendSkills.find((savedSkill) => savedSkill.id === skill.id)?.checked ?? skill.checked,
  })),
  challenges: loadedState.challenges.length > 0 ? loadedState.challenges : defaultChallenges,
  notes: loadedState.notes || initialState.notes,
});

const reducer = (state: ProjectState, action: Action): ProjectState => {
  if (action.type === 'hydrate') {
    return hydrateState(action.payload);
  }

  if (action.type === 'login') {
    return {
      ...state,
      user: action.payload,
      activeView: 'dashboard',
    };
  }

  if (action.type === 'logout') {
    return initialState;
  }

  if (action.type === 'view') {
    return {
      ...state,
      activeView: action.payload,
    };
  }

  if (action.type === 'toggleSegment') {
    return {
      ...state,
      segments: state.segments.map((segment) =>
        segment.id === action.payload
          ? {
              ...segment,
              isReady: !segment.isReady,
            }
          : segment,
      ),
    };
  }

  if (action.type === 'toggleSkill') {
    return {
      ...state,
      [action.payload.scope]: state[action.payload.scope].map((skill) =>
        skill.id === action.payload.id
          ? {
              ...skill,
              checked: !skill.checked,
            }
          : skill,
      ),
    };
  }

  if (action.type === 'notes') {
    return {
      ...state,
      notes: action.payload,
    };
  }

  if (action.type === 'updateChallenge') {
    return {
      ...state,
      challenges: state.challenges.map((challenge) =>
        challenge.id === action.payload.id
          ? {
              ...challenge,
              [action.payload.field]: action.payload.value,
            }
          : challenge,
      ),
    };
  }

  return state;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [booting, setBooting] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadProjectState()
      .then((loadedState) => {
        if (mounted && loadedState) {
          dispatch({ type: 'hydrate', payload: loadedState });
        }
      })
      .finally(() => {
        if (mounted) {
          setBooting(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (booting) {
      return;
    }

    let mounted = true;
    setSaving(true);

    saveProjectState(state).finally(() => {
      if (mounted) {
        setSaving(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [booting, state]);

  const login = useCallback(async (profile: UserProfile) => {
    const session = await createSession(profile);
    dispatch({ type: 'login', payload: session });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'logout' });
  }, []);

  const setView = useCallback((view: View) => {
    dispatch({ type: 'view', payload: view });
  }, []);

  const toggleSegment = useCallback((id: string) => {
    dispatch({ type: 'toggleSegment', payload: id });
  }, []);

  const toggleSkill = useCallback((scope: 'frontendSkills' | 'backendSkills', id: string) => {
    dispatch({ type: 'toggleSkill', payload: { scope, id } });
  }, []);

  const setNotes = useCallback((notes: string) => {
    dispatch({ type: 'notes', payload: notes });
  }, []);

  const updateChallenge = useCallback((id: string, field: 'title' | 'cause' | 'solution' | 'learning', value: string) => {
    dispatch({ type: 'updateChallenge', payload: { id, field, value } });
  }, []);

  const value = useMemo(
    () => ({
      state,
      booting,
      saving,
      login,
      logout,
      setView,
      toggleSegment,
      toggleSkill,
      setNotes,
      updateChallenge,
    }),
    [booting, login, logout, saving, setNotes, setView, state, toggleSegment, toggleSkill, updateChallenge],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
