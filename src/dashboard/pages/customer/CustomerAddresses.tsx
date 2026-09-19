import { useState } from 'react';
import { Plus, MapPin, Star, Pencil, Trash2 } from 'lucide-react';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import { mockAddresses } from '../../data/mockData';
import type { Address } from '../../data/mockData';

export default function CustomerAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ label: '', street: '', city: '', state: 'Maharashtra', pincode: '' });

  const handleDelete = () => {
    if (deleteId) setAddresses(a => a.filter(x => x.id !== deleteId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => setShowForm(p => !p)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90">
          <Plus size={16} /> Add Address
        </button>
      </div>

      {showForm && (
        <div className="dash-card p-6 border-l-4" style={{ borderLeftColor: '#1A7A3C' }}>
          <h3 className="text-[16px] font-bold mb-5" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>New Address</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <InputField label="Label" placeholder="e.g. Main Kitchen, Outlet 2" value={form.label}
              onChange={e => setForm(p => ({ ...p, label: e.target.value }))} />
            <InputField label="Pincode" placeholder="400001" value={form.pincode}
              onChange={e => setForm(p => ({ ...p, pincode: e.target.value }))} />
            <div className="sm:col-span-2">
              <InputField label="Street Address" placeholder="Building, Street, Area" value={form.street}
                onChange={e => setForm(p => ({ ...p, street: e.target.value }))} />
            </div>
            <InputField label="City" placeholder="Mumbai" value={form.city}
              onChange={e => setForm(p => ({ ...p, city: e.target.value }))} />
            <SelectField label="State" value={form.state}
              onChange={e => setForm(p => ({ ...p, state: e.target.value }))}
              options={['Maharashtra','Karnataka','Delhi','Tamil Nadu','Telangana','Gujarat'].map(s => ({ value: s, label: s }))} />
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90"
              onClick={() => setShowForm(false)}>Save Address</button>
            <button className="px-6 py-2.5 rounded-[14px] text-[14px] font-semibold hover:bg-gray-100"
              style={{ border: '1px solid var(--dash-border)', color: 'var(--dash-body)' }}
              onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map(addr => (
          <div key={addr.id} className={`dash-card p-5 relative ${addr.isDefault ? 'ring-2 ring-[#1A7A3C]' : ''}`}>
            {addr.isDefault && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-[8px]" style={{ background: '#DDF3E4' }}>
                <Star size={10} color="#1A7A3C" fill="#1A7A3C" />
                <span className="text-[10px] font-bold" style={{ color: '#1A7A3C' }}>Default</span>
              </div>
            )}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#DDF3E4' }}>
              <MapPin size={18} color="#1A7A3C" />
            </div>
            <p className="text-[15px] font-bold mb-1" style={{ color: 'var(--dash-heading)' }}>{addr.label}</p>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--dash-muted)' }}>
              {addr.street}<br />{addr.city}, {addr.state} - {addr.pincode}
            </p>
            <div className="flex gap-2 mt-4">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[12px] font-semibold hover:bg-gray-100"
                style={{ border: '1px solid var(--dash-border)', color: 'var(--dash-body)' }}>
                <Pencil size={12} /> Edit
              </button>
              {!addr.isDefault && (
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[12px] font-semibold hover:bg-[#FFEAEA]"
                  style={{ border: '1px solid #FECACA', color: '#C0392B' }}
                  onClick={() => setDeleteId(addr.id)}>
                  <Trash2 size={12} /> Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Address"
        message="Are you sure you want to remove this address? This cannot be undone."
      />
    </div>
  );
}
