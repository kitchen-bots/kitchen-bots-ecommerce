import React from 'react';

interface DashboardCardProps {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function DashboardCard({ title, action, children, className = '', noPadding = false }: DashboardCardProps) {
  return (
    <div className={`dash-card overflow-hidden ${className}`}>
      {(title || action) && (
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--dash-border)' }}
        >
          {title && (
            <h3 className="text-[15px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
              {title}
            </h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>{children}</div>
    </div>
  );
}
