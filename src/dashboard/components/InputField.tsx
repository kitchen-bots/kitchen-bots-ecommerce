import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default function InputField({ label, error, helper, className = '', id, ...props }: InputFieldProps) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-[13px] font-semibold" style={{ color: 'var(--dash-heading)' }}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={fieldId}
          className={`w-full h-[44px] px-4 rounded-[14px] border text-[14px] outline-none transition-all duration-200
            focus:ring-4 focus:ring-[#1A7A3C]/5 focus:border-[#1A7A3C] shadow-sm
            ${error ? 'border-red-300 bg-red-50/30' : 'border-[#E8EAED] bg-[#FAFBFC]'} ${className}`}
          style={{
            borderColor: error ? '#FCA5A5' : undefined,
            color: 'var(--dash-heading)',
            fontFamily: 'var(--font-body)',
          }}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <AlertCircle size={18} />
          </div>
        )}
      </div>
      {error && <p className="text-[12px] text-red-500 font-medium ml-1 flex items-center gap-1">{error}</p>}
      {helper && !error && <p className="text-[12px] ml-1" style={{ color: 'var(--dash-muted)' }}>{helper}</p>}
    </div>
  );
}
