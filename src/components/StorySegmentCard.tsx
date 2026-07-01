import { CheckCircle2, Circle, Clock3 } from 'lucide-react';
import { useAppState } from '../state/useAppState';
import type { StorySegment } from '../types';

type StorySegmentCardProps = {
  segment: StorySegment;
};

export const StorySegmentCard = ({ segment }: StorySegmentCardProps) => {
  const { toggleSegment } = useAppState();

  return (
    <article className={`segment-card ${segment.isReady ? 'ready' : ''}`}>
      <div className="segment-head">
        <div>
          <span className="duration-pill">
            <Clock3 size={15} />
            {segment.duration}s
          </span>
          <h3>{segment.title}</h3>
        </div>
        <button className="icon-button" type="button" onClick={() => toggleSegment(segment.id)} aria-label={`Toggle ${segment.title}`}>
          {segment.isReady ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>
      </div>

      <p>{segment.prompt}</p>

      <div className="talking-points">
        {segment.talkingPoints.map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>
    </article>
  );
};
