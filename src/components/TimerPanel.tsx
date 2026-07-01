import { useEffect, useMemo, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useAppState } from '../state/useAppState';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
};

export const TimerPanel = () => {
  const { state } = useAppState();
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const target = useMemo(() => state.segments.reduce((sum, segment) => sum + segment.duration, 0), [state.segments]);
  const progress = Math.min(100, Math.round((elapsed / target) * 100));
  const status = elapsed < 300 ? 'Build more detail' : elapsed <= 420 ? 'Ideal window' : 'Trim the explanation';

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = window.setInterval(() => setElapsed((current) => current + 1), 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <section className="panel timer-panel">
      <div className="panel-head">
        <div>
          <span className="section-kicker">Live rehearsal</span>
          <h2>{formatTime(elapsed)}</h2>
        </div>
        <span className="status-pill">{status}</span>
      </div>

      <div className="timer-orbit" aria-label={`${progress}% of planned explanation time`}>
        <div style={{ transform: `rotate(${progress * 3.6}deg)` }} />
        <strong>{progress}%</strong>
        <span>Plan {formatTime(target)}</span>
      </div>

      <div className="timer-actions">
        <button className="primary-action compact-action" type="button" onClick={() => setRunning((value) => !value)}>
          {running ? <Pause size={18} /> : <Play size={18} />}
          <span>{running ? 'Pause' : 'Start'}</span>
        </button>
        <button className="icon-button labeled" type="button" onClick={() => setElapsed(0)} aria-label="Reset timer">
          <RotateCcw size={18} />
          <span>Reset</span>
        </button>
      </div>
    </section>
  );
};
