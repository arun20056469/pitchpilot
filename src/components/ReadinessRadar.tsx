type ReadinessRadarProps = {
  readiness: number;
  timing: number;
  technical: number;
};

export const ReadinessRadar = ({ readiness, timing, technical }: ReadinessRadarProps) => (
  <section className="panel readiness-panel">
    <div className="panel-head">
      <div>
        <span className="section-kicker">Readiness map</span>
        <h2>Submission signal</h2>
      </div>
    </div>

    <div className="radar-grid">
      <div style={{ height: `${readiness}%` }}>
        <span>{readiness}%</span>
      </div>
      <div style={{ height: `${timing}%` }}>
        <span>{timing}%</span>
      </div>
      <div style={{ height: `${technical}%` }}>
        <span>{technical}%</span>
      </div>
    </div>

    <div className="radar-labels">
      <span>Story</span>
      <span>Timing</span>
      <span>Depth</span>
    </div>
  </section>
);
