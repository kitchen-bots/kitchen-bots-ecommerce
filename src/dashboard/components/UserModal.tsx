import React, { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import InputField from './InputField';
import SelectField from './SelectField';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import type { User } from '../data/mockData';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
  initialData?: User | null;
}

export default function UserModal({ isOpen, onClose, onSave, initialData }: UserModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'Customer',
    status: 'Active',
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'Customer',
        status: 'Active',
      });
    }
    setHasChanges(false);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleClose = () => {
    if (hasChanges) {
      setShowDiscardModal(true);
    } else {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-[20px] font-bold" style={{ color: 'var(--dash-heading)' }}>
                {initialData ? 'Edit User' : 'Add New User'}
              </h2>
              <p className="text-[13px]" style={{ color: 'var(--dash-muted)' }}>
                {initialData ? 'Update user details and permissions' : 'Create a new user account for the system'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid gap-5">
              <InputField
                label="Full Name"
                placeholder="e.g. John Doe"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                id="user-name"
              />
              <InputField
                label="Email Address"
                type="email"
                placeholder="e.g. john@example.com"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                id="user-email"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <SelectField
                label="User Role"
                value={formData.role || ''}
                onChange={(e) => handleChange('role', e.target.value)}
                options={[
                  { value: 'Admin', label: 'Administrator' },
                  { value: 'Manager', label: 'Manager' },
                  { value: 'Customer', label: 'Customer' },
                ]}
                id="user-role"
              />
              <SelectField
                label="Account Status"
                value={formData.status || ''}
                onChange={(e) => handleChange('status', e.target.value)}
                options={[
                  { value: 'Active', label: 'Active' },
                  { value: 'Inactive', label: 'Inactive' },
                  { value: 'Pending', label: 'Pending' },
                ]}
                id="user-status"
              />
            </div>

            <div className="p-4 rounded-xl bg-[var(--dash-soft-green)] flex gap-3 items-start border border-[var(--dash-green)]/10">
              <Shield size={18} className="text-[var(--dash-green)] mt-0.5" />
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--dash-body)' }}>
                <span className="font-bold">Pro Tip:</span> Roles determine what sections of the dashboard this user can access. Admins have full control, while Managers have limited access to reports and inventory.
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 rounded-xl text-white text-[14px] font-bold hover:opacity-90 transition-opacity shadow-lg"
                style={{ background: 'var(--dash-green)' }}
              >
                {initialData ? 'Update User' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
        onConfirm={onClose}
        title="Discard Changes?"
        message="You have unsaved changes. Are you sure you want to discard them?"
        confirmLabel="Discard"
      />
    </>
  );
}

