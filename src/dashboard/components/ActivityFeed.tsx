import { Package, FileText, User, Wrench, ShoppingBag } from 'lucide-react';
import { mockActivity } from '../data/mockData';
import { formatDate } from '../utils/formatters';

const iconMap: Record<string, React.ReactNode> = {
  package:      <Package size={14} />,
  file:         <FileText size={14} />,
  user:         <User size={14} />,
  wrench:       <Wrench size={14} />,
  'shopping-bag': <ShoppingBag size={14} />,
};

const accentMap: Record<string, string> = {
  order:    '#DCEBFF',
  ticket:   '#FFF3DC',
  document: '#E8DEFF',
  user:     '#DDF3E4',
};

export default function ActivityFeed() {
  return (
    <div className="flex flex-col gap-4">
      {mockActivity.map((item, i) => (
        <div key={item.id} className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: accentMap[item.type] ?? '#F3F4F6', color: 'var(--dash-heading)' }}
          >
            {iconMap[item.icon] ?? <Package size={14} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--dash-body)' }}>{item.text}</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--dash-muted)' }}>{item.time}</p>
          </div>
          {i < mockActivity.length - 1 && (
            <div className="absolute left-[19px] mt-8 w-px h-4 bg-gray-100" />
          )}
        </div>
      ))}
    </div>
  );
}
