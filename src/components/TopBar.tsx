import { LogOut, Save } from 'lucide-react';
import { useAppState } from '../state/useAppState';

export const TopBar = () => {
  const { state, saving, logout } = useAppState();

  if (!state.user) {
    return null;
  }

  return (
    <header className="topbar">
      <div>
        <span className="section-kicker">{state.user.role}</span>
        <h1>{state.user.projectName}</h1>
      </div>

      <div className="topbar-actions">
        <span className="save-state">
          <Save size={17} />
          {saving ? 'Saving' : 'Saved'}
        </span>
        <button className="icon-button labeled" type="button" onClick={logout} aria-label="Sign out">
          <LogOut size={18} />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
};
