import type { LucideIcon } from 'lucide-react';

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: 'green' | 'amber' | 'coral' | 'ink';
};

export const MetricCard = ({ label, value, detail, icon: Icon, tone }: MetricCardProps) => (
  <article className={`metric-card ${tone}`}>
    <div className="metric-icon">
      <Icon size={22} />
    </div>
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </div>
  </article>
);
