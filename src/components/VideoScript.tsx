import { Copy, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAppState } from '../state/useAppState';

export const VideoScript = () => {
  const { state, setNotes } = useAppState();
  const [copied, setCopied] = useState(false);

  const guide = useMemo(() => {
    const userName = state.user?.name || 'Candidate';
    const projectName = state.user?.projectName || 'PitchPilot';
    const role = state.user?.role || 'Frontend Developer';
    const checkedSkills = [...state.frontendSkills, ...state.backendSkills].filter((skill) => skill.checked).map((skill) => skill.label);
    const challenge = state.challenges[0];

    return [
      `Hello, I am ${userName}, and I am applying for the ${role} role. My project is ${projectName}.`,
      `${projectName} helps developer candidates prepare a structured 5-7 minute explanation of their project, with focus on contribution, implementation, challenges, and learnings.`,
      `My contribution included ${checkedSkills.slice(0, 4).join(', ') || 'the core dashboard workflow'}.`,
      `Technically, the app is organized around reusable React components, typed state management, mock API services, protected workspace behavior, persistent local storage, and responsive layouts.`,
      `One challenge was ${challenge.title.toLowerCase()}. I identified it because ${challenge.cause.toLowerCase()} The solution was: ${challenge.solution}`,
      `The main learning was ${challenge.learning.toLowerCase()} If I rebuilt it, I would connect the same state model to a real backend with JWT authentication and database persistence.`,
      'Thank you for watching. I would be happy to answer technical questions about the implementation.',
    ].join('\n\n');
  }, [state.backendSkills, state.challenges, state.frontendSkills, state.user]);

  const copy = async () => {
    await navigator.clipboard.writeText(guide);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section className="panel script-panel">
      <div className="panel-head">
        <div>
          <span className="section-kicker">Recording guide</span>
          <h2>Natural speaking notes</h2>
        </div>
        <FileText size={22} />
      </div>

      <textarea className="notes-area" value={state.notes} onChange={(event) => setNotes(event.target.value)} />

      <div className="generated-guide">
        <div className="panel-head mini">
          <strong>Auto-generated 5-7 minute flow</strong>
          <button className="icon-button labeled" type="button" onClick={copy} aria-label="Copy guide">
            <Copy size={18} />
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre>{guide}</pre>
      </div>
    </section>
  );
};
