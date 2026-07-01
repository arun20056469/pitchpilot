import { BarChart3, ClipboardCheck, FileText, Gauge, Mic2, Route, Sparkles } from 'lucide-react';
import { useAppState } from '../state/useAppState';
import type { NavItem } from '../types';

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
  },
  {
    id: 'storyline',
    label: 'Storyline',
    icon: Route,
  },
  {
    id: 'technical',
    label: 'Technical',
    icon: ClipboardCheck,
  },
  {
    id: 'rehearsal',
    label: 'Rehearsal',
    icon: Mic2,
  },
  {
    id: 'script',
    label: 'Guide',
    icon: FileText,
  },
];

export const Sidebar = () => {
  const { state, setView } = useAppState();

  return (
    <aside className="sidebar">
      <div className="brand-lockup compact">
        <span className="brand-icon">
          <Sparkles size={20} />
        </span>
        <span>PitchPilot</span>
      </div>

      <nav aria-label="Workspace sections">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button className={state.activeView === item.id ? 'active' : ''} key={item.id} type="button" onClick={() => setView(item.id)}>
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-meter">
        <Gauge size={22} />
        <div>
          <strong>5-7 min target</strong>
          <span>Keep answers crisp and technical.</span>
        </div>
      </div>
    </aside>
  );
};
