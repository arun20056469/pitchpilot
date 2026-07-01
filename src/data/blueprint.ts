import type { Challenge, StorySegment, TechnicalSkill } from '../types';

export const defaultSegments: StorySegment[] = [
  {
    id: 'intro',
    title: 'Introduction',
    duration: 30,
    prompt: 'Introduce yourself, your role, and the project in one confident opening.',
    talkingPoints: ['Name and role', 'Project name', 'One-line purpose'],
    isReady: true,
  },
  {
    id: 'overview',
    title: 'Project Overview',
    duration: 50,
    prompt: 'Explain the problem, target users, and the outcome your project creates.',
    talkingPoints: ['Problem statement', 'Intended users', 'Main feature set'],
    isReady: true,
  },
  {
    id: 'contribution',
    title: 'Your Contribution',
    duration: 70,
    prompt: 'Focus on the parts you personally built and the decisions you owned.',
    talkingPoints: ['Owned modules', 'Reusable components', 'State and data flow'],
    isReady: false,
  },
  {
    id: 'implementation',
    title: 'Technical Implementation',
    duration: 145,
    prompt: 'Walk through architecture, components, data handling, and performance choices.',
    talkingPoints: ['Architecture', 'API flow', 'Authentication', 'Optimization'],
    isReady: false,
  },
  {
    id: 'challenge',
    title: 'Challenges',
    duration: 70,
    prompt: 'Describe one issue, how you found it, what you changed, and the result.',
    talkingPoints: ['Issue', 'Debugging approach', 'Fix', 'Learning'],
    isReady: false,
  },
  {
    id: 'learning',
    title: 'Learnings',
    duration: 35,
    prompt: 'Share what improved technically and what you would refine next time.',
    talkingPoints: ['Technical growth', 'Design improvement', 'Future enhancement'],
    isReady: true,
  },
  {
    id: 'closing',
    title: 'Closing',
    duration: 20,
    prompt: 'End cleanly with thanks and openness for follow-up questions.',
    talkingPoints: ['Thank you', 'Ready for technical questions'],
    isReady: true,
  },
];

export const frontendSkills: TechnicalSkill[] = [
  {
    id: 'component-system',
    label: 'Reusable Component System',
    detail: 'Cards, panels, checklists, and navigation share consistent props and styling.',
    checked: true,
  },
  {
    id: 'state-context',
    label: 'Context State Management',
    detail: 'A typed reducer centralizes profile, checklist, segment, challenge, and notes state.',
    checked: true,
  },
  {
    id: 'mock-api',
    label: 'Mock API Integration',
    detail: 'Async service functions simulate authenticated loading and saving flows.',
    checked: true,
  },
  {
    id: 'responsive-ui',
    label: 'Responsive Layout',
    detail: 'The interface adapts from compact mobile panels to desktop productivity views.',
    checked: true,
  },
  {
    id: 'performance',
    label: 'Memoized Readiness Metrics',
    detail: 'Derived scores are computed with memoization to avoid unnecessary recalculation.',
    checked: true,
  },
  {
    id: 'protected-app',
    label: 'Protected Workspace',
    detail: 'The dashboard stays unavailable until the candidate profile is created.',
    checked: true,
  },
];

export const backendSkills: TechnicalSkill[] = [
  {
    id: 'api-design',
    label: 'REST API Planning',
    detail: 'The data model maps cleanly to profile, segment, skill, and challenge endpoints.',
    checked: false,
  },
  {
    id: 'auth-model',
    label: 'Authentication Model',
    detail: 'The login boundary is structured for later JWT replacement.',
    checked: false,
  },
  {
    id: 'validation',
    label: 'Input Validation',
    detail: 'Form inputs are constrained before state changes are accepted.',
    checked: false,
  },
  {
    id: 'persistence',
    label: 'Persistence Strategy',
    detail: 'Local storage mirrors the shape of a server-side persistence layer.',
    checked: false,
  },
];

export const defaultChallenges: Challenge[] = [
  {
    id: 'focus',
    title: 'Keeping the explanation specific',
    cause: 'The first draft sounded like a technology list instead of personal contribution.',
    solution: 'The app separates contribution, implementation, and challenge cards so each answer stays evidence-based.',
    learning: 'A strong project explanation needs structure as much as technical detail.',
  },
  {
    id: 'timing',
    title: 'Staying within 5-7 minutes',
    cause: 'Candidates often over-explain implementation and rush the closing.',
    solution: 'Each segment has a target duration and readiness state, then the rehearsal timer tracks the total flow.',
    learning: 'Time-boxing makes technical communication clearer and calmer.',
  },
];
