import { Activity, BadgeCheck, Clock4, Cpu } from 'lucide-react';
import { useEffect } from 'react';
import { AuthGate } from './components/AuthGate';
import { ChallengeEditor } from './components/ChallengeEditor';
import { FocusChecklist } from './components/FocusChecklist';
import { MetricCard } from './components/MetricCard';
import { ReadinessRadar } from './components/ReadinessRadar';
import { Sidebar } from './components/Sidebar';
import { StorySegmentCard } from './components/StorySegmentCard';
import { TimerPanel } from './components/TimerPanel';
import { TopBar } from './components/TopBar';
import { VideoScript } from './components/VideoScript';
import { useAppState } from './state/useAppState';

const App = () => {
  const { state } = useAppState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.activeView, state.user]);

  if (!state.user) {
    return <AuthGate />;
  }

  const readySegments = state.segments.filter((segment) => segment.isReady).length;
  const readiness = Math.round((readySegments / state.segments.length) * 100);
  const totalDuration = state.segments.reduce((sum, segment) => sum + segment.duration, 0);
  const timingScore = totalDuration >= 300 && totalDuration <= 420 ? 100 : Math.max(20, 100 - Math.abs(360 - totalDuration));
  const checkedSkills = [...state.frontendSkills, ...state.backendSkills].filter((skill) => skill.checked).length;
  const totalSkills = state.frontendSkills.length + state.backendSkills.length;
  const technical = Math.round((checkedSkills / totalSkills) * 100);

  return (
    <main className="app-shell">
      <Sidebar />
      <section className="workspace">
        <TopBar />

        {state.activeView === 'dashboard' && (
          <div className="view-grid">
            <section className="metric-grid">
              <MetricCard label="Story readiness" value={`${readiness}%`} detail={`${readySegments} of ${state.segments.length} segments ready`} icon={BadgeCheck} tone="green" />
              <MetricCard label="Planned duration" value={`${Math.floor(totalDuration / 60)}m ${totalDuration % 60}s`} detail="Ideal range is 5-7 minutes" icon={Clock4} tone="amber" />
              <MetricCard label="Technical proof" value={`${technical}%`} detail={`${checkedSkills} implementation points selected`} icon={Cpu} tone="coral" />
              <MetricCard label="Preparation mode" value="Focused" detail="Built for clear ownership explanation" icon={Activity} tone="ink" />
            </section>

            <ReadinessRadar readiness={readiness} timing={timingScore} technical={technical} />
            <TimerPanel />
            <ChallengeEditor />
          </div>
        )}

        {state.activeView === 'storyline' && (
          <section className="storyline-grid">
            {state.segments.map((segment) => (
              <StorySegmentCard key={segment.id} segment={segment} />
            ))}
          </section>
        )}

        {state.activeView === 'technical' && (
          <div className="technical-grid">
            <FocusChecklist title="Frontend contribution" scope="frontendSkills" skills={state.frontendSkills} />
            <FocusChecklist title="Backend-ready explanation" scope="backendSkills" skills={state.backendSkills} />
          </div>
        )}

        {state.activeView === 'rehearsal' && (
          <div className="rehearsal-grid">
            <TimerPanel />
            <section className="panel">
              <div className="panel-head">
                <div>
                  <span className="section-kicker">Run order</span>
                  <h2>Segment checklist</h2>
                </div>
              </div>
              <div className="mini-timeline">
                {state.segments.map((segment, index) => (
                  <div key={segment.id}>
                    <span>{index + 1}</span>
                    <strong>{segment.title}</strong>
                    <small>{segment.duration}s</small>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {state.activeView === 'script' && <VideoScript />}
      </section>
    </main>
  );
};

export default App;
