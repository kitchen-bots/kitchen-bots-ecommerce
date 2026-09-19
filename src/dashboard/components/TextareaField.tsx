import React from 'react';

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default function TextareaField({ label, error, helper, className = '', id, ...props }: TextareaFieldProps) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-[13px] font-semibold" style={{ color: 'var(--dash-heading)' }}>
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        className={`min-h-[100px] px-4 py-3 rounded-[14px] border text-[14px] outline-none transition-all duration-150
          focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C] resize-none ${error ? 'border-red-400' : ''} ${className}`}
        style={{
          background: '#FAFBFC',
          borderColor: error ? '#F87171' : 'var(--dash-border)',
          color: 'var(--dash-heading)',
          fontFamily: 'var(--font-body)',
        }}
        {...props}
      />
      {error && <p className="text-[12px] text-red-500">{error}</p>}
      {helper && !error && <p className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>{helper}</p>}
    </div>
  );
}
