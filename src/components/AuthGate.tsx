import { FormEvent, useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, Clock, Layers3, Sparkles } from 'lucide-react';
import { roleOptions } from '../data/roles';
import { useAppState } from '../state/useAppState';
import type { Role } from '../types';

export const AuthGate = () => {
  const { login, booting } = useAppState();
  const [name, setName] = useState('');
  const [projectName, setProjectName] = useState('PitchPilot');
  const [role, setRole] = useState<Role>('Frontend Developer');
  const [submitting, setSubmitting] = useState(false);

  const ready = useMemo(() => name.trim().length > 1 && projectName.trim().length > 2, [name, projectName]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ready) {
      return;
    }

    setSubmitting(true);
    await login({
      name: name.trim(),
      role,
      projectName: projectName.trim(),
    });
    setSubmitting(false);
  };

  if (booting) {
    return (
      <main className="auth-shell">
        <section className="auth-card loading-card">
          <span className="loading-mark" />
          <p>Opening your workspace</p>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-shell">
      <section className="auth-showcase" aria-label="PitchPilot overview">
        <div className="brand-lockup">
          <span className="brand-icon">
            <Sparkles size={24} />
          </span>
          <span>PitchPilot</span>
        </div>
        <h1>Turn your project into a calm, technical 7-minute story.</h1>
        <p>
          A preparation cockpit for developer candidates who need to explain ownership, architecture, challenges, and learnings without sounding scripted.
        </p>
        <div className="showcase-grid">
          <article>
            <BadgeCheck size={22} />
            <strong>Contribution first</strong>
            <span>Separate your work from team-level description.</span>
          </article>
          <article>
            <Layers3 size={22} />
            <strong>Technical depth</strong>
            <span>Map features to architecture, state, APIs, and UX choices.</span>
          </article>
          <article>
            <Clock size={22} />
            <strong>Rehearsal timing</strong>
            <span>Stay inside the 5-7 minute interview sweet spot.</span>
          </article>
        </div>
      </section>

      <form className="auth-card" onSubmit={submit}>
        <div>
          <span className="section-kicker">Candidate setup</span>
          <h2>Create your protected workspace</h2>
        </div>

        <label>
          <span>Your name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Example: Rahul Sharma" autoFocus />
        </label>

        <label>
          <span>Project name</span>
          <input value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Your project name" />
        </label>

        <fieldset>
          <legend>Role focus</legend>
          <div className="role-options">
            {roleOptions.map((option) => (
              <button className={role === option ? 'selected' : ''} type="button" key={option} onClick={() => setRole(option)}>
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <button className="primary-action" disabled={!ready || submitting} type="submit">
          <span>{submitting ? 'Creating workspace' : 'Enter workspace'}</span>
          <ArrowRight size={18} />
        </button>
      </form>
    </main>
  );
};
