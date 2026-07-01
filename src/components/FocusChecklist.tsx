import { Check, Square } from 'lucide-react';
import { useAppState } from '../state/useAppState';
import type { TechnicalSkill } from '../types';

type FocusChecklistProps = {
  title: string;
  scope: 'frontendSkills' | 'backendSkills';
  skills: TechnicalSkill[];
};

export const FocusChecklist = ({ title, scope, skills }: FocusChecklistProps) => {
  const { toggleSkill } = useAppState();

  return (
    <section className="panel checklist-panel">
      <div className="panel-head">
        <div>
          <span className="section-kicker">Technical evidence</span>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="checklist">
        {skills.map((skill) => (
          <button className={skill.checked ? 'checked' : ''} key={skill.id} type="button" onClick={() => toggleSkill(scope, skill.id)}>
            <span className="check-icon">{skill.checked ? <Check size={17} /> : <Square size={17} />}</span>
            <span>
              <strong>{skill.label}</strong>
              <small>{skill.detail}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
