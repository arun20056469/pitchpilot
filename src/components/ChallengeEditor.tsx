import { Lightbulb } from 'lucide-react';
import { useAppState } from '../state/useAppState';

export const ChallengeEditor = () => {
  const { state, updateChallenge } = useAppState();

  return (
    <section className="panel challenge-panel">
      <div className="panel-head">
        <div>
          <span className="section-kicker">Problem solving</span>
          <h2>Challenge stories</h2>
        </div>
        <Lightbulb size={22} />
      </div>

      <div className="challenge-stack">
        {state.challenges.map((challenge) => (
          <article key={challenge.id} className="challenge-card">
            <label>
              <span>Challenge</span>
              <input value={challenge.title} onChange={(event) => updateChallenge(challenge.id, 'title', event.target.value)} />
            </label>
            <label>
              <span>Cause</span>
              <textarea value={challenge.cause} onChange={(event) => updateChallenge(challenge.id, 'cause', event.target.value)} />
            </label>
            <label>
              <span>Solution</span>
              <textarea value={challenge.solution} onChange={(event) => updateChallenge(challenge.id, 'solution', event.target.value)} />
            </label>
            <label>
              <span>Learning</span>
              <textarea value={challenge.learning} onChange={(event) => updateChallenge(challenge.id, 'learning', event.target.value)} />
            </label>
          </article>
        ))}
      </div>
    </section>
  );
};
