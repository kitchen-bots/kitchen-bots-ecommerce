import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }: SearchBarProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search size={16} className="absolute left-4 pointer-events-none" style={{ color: 'var(--dash-muted)' }} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[44px] pl-10 pr-10 rounded-[14px] border text-[14px] outline-none transition-all duration-150 w-full
          focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C]"
        style={{
          background: '#FAFBFC',
          borderColor: 'var(--dash-border)',
          color: 'var(--dash-heading)',
          fontFamily: 'var(--font-body)',
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 w-6 h-6 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X size={13} style={{ color: 'var(--dash-muted)' }} />
        </button>
      )}
    </div>
  );
}
