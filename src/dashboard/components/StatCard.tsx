interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'red';
  trend?: string;
  // Legacy props support
  accent?: string;
  iconColor?: string;
  delta?: string;
}

export default function StatCard({ 
  label, 
  value, 
  icon, 
  color = 'green', 
  trend,
  accent,
  iconColor,
  delta
}: StatCardProps) {
  
  // Theme mapping
  const themes = {
    green: { bg: 'var(--dash-soft-green)', text: 'var(--dash-green)' },
    blue: { bg: '#E0F2FE', text: '#0284C7' },
    purple: { bg: '#F3E8FF', text: '#7C3AED' },
    orange: { bg: '#FFEDD5', text: '#EA580C' },
    red: { bg: '#FEE2E2', text: '#DC2626' },
  };

  const theme = themes[color] || themes.green;
  const finalBg = accent || theme.bg;
  const finalText = iconColor || theme.text;
  const finalDelta = trend || delta;

  return (
    <div className="dash-card p-5 flex flex-col gap-3 group hover:border-[var(--dash-green)]/30 transition-all">
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
          style={{ background: finalBg, color: finalText }}
        >
          {icon}
        </div>
        {finalDelta && (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-[10px] shadow-sm animate-in fade-in zoom-in duration-300"
            style={{ background: finalBg, color: finalText }}>
            {finalDelta}
          </span>
        )}
      </div>
      <div>
        <p className="text-[26px] font-bold leading-none mb-1.5" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
          {value}
        </p>
        <p className="text-[13px] font-medium" style={{ color: 'var(--dash-muted)' }}>{label}</p>
      </div>
    </div>
  );
}
