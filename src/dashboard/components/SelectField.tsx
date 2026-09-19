import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export default function SelectField({ label, error, options, className = '', id, ...props }: SelectFieldProps) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-[13px] font-semibold" style={{ color: 'var(--dash-heading)' }}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={fieldId}
          className={`w-full h-[44px] px-4 rounded-[14px] border text-[14px] outline-none transition-all duration-200
            focus:ring-4 focus:ring-[#1A7A3C]/5 focus:border-[#1A7A3C] shadow-sm cursor-pointer appearance-none
            ${error ? 'border-red-300 bg-red-50/30' : 'border-[#E8EAED] bg-[#FAFBFC]'} ${className}`}
          style={{
            borderColor: error ? '#FCA5A5' : undefined,
            color: 'var(--dash-heading)',
            fontFamily: 'var(--font-body)',
          }}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1">
          {error && <AlertCircle size={18} className="text-red-500" />}
          <ChevronDown size={18} className="text-slate-400" />
        </div>
      </div>
      {error && <p className="text-[12px] text-red-500 font-medium ml-1">{error}</p>}
    </div>
  );
}
