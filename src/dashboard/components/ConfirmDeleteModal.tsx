import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
}

export default function ConfirmDeleteModal({
  isOpen, onClose, onConfirm,
  title = 'Confirm Delete',
  message = 'This action cannot be undone. Are you sure you want to delete this item?',
  confirmLabel = 'Delete',
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[400px] dash-card p-6 flex flex-col gap-5" style={{ zIndex: 1 }}>
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#FFEAEA] flex items-center justify-center">
            <AlertTriangle size={22} color="#C0392B" />
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
            <X size={16} color="#6B7280" />
          </button>
        </div>
        <div>
          <h3 className="text-[17px] font-bold mb-2" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>{title}</h3>
          <p className="text-[14px] leading-relaxed" style={{ color: 'var(--dash-muted)' }}>{message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-[44px] rounded-[14px] border font-semibold text-[14px] transition-colors hover:bg-gray-50"
            style={{ borderColor: 'var(--dash-border)', color: 'var(--dash-body)' }}
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 h-[44px] rounded-[14px] bg-[#C0392B] text-white font-semibold text-[14px] transition-opacity hover:opacity-90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
