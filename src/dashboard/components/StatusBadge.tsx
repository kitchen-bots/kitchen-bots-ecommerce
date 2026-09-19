const MAP: Record<string, { bg: string; text: string; dot: string }> = {
  // Order statuses
  Pending:       { bg: '#FFF3DC', text: '#E8940A', dot: '#E8940A' },
  Confirmed:     { bg: '#DCEBFF', text: '#1E6BD3', dot: '#1E6BD3' },
  Processing:    { bg: '#E8DEFF', text: '#6B3FA0', dot: '#6B3FA0' },
  Manufacturing: { bg: '#E0E7FF', text: '#4338CA', dot: '#4338CA' },
  QC:            { bg: '#E0F2FE', text: '#0369A1', dot: '#0369A1' },
  Dispatch:      { bg: '#FEF3C7', text: '#D97706', dot: '#D97706' },
  Shipped:       { bg: '#DDF3E4', text: '#1A7A3C', dot: '#1A7A3C' },
  Delivered:     { bg: '#DDF3E4', text: '#1A7A3C', dot: '#1A7A3C' },
  Cancelled:     { bg: '#FFEAEA', text: '#C0392B', dot: '#C0392B' },
  // Ticket statuses
  Open:          { bg: '#FFEAEA', text: '#C0392B', dot: '#C0392B' },
  'In Progress': { bg: '#FFF3DC', text: '#E8940A', dot: '#E8940A' },
  Resolved:      { bg: '#DDF3E4', text: '#1A7A3C', dot: '#1A7A3C' },
  Closed:        { bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' },
  // User / product statuses
  Active:        { bg: '#DDF3E4', text: '#1A7A3C', dot: '#1A7A3C' },
  Inactive:      { bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' },
  'Out of Stock':{ bg: '#FFEAEA', text: '#C0392B', dot: '#C0392B' },
};

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const c = MAP[status] ?? { bg: '#F3F4F6', text: '#6B7280', dot: '#9CA3AF' };
  const textSize = size === 'md' ? 'text-[13px]' : 'text-[11px]';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] font-bold ${textSize} whitespace-nowrap`}
      style={{ background: c.bg, color: c.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.dot }} />
      {status}
    </span>
  );
}
