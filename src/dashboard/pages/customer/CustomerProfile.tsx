import { useState } from 'react';
import { User, Building, Phone, Mail, Lock, Camera } from 'lucide-react';
import InputField from '../../components/InputField';
import ToggleSwitch from '../../components/ToggleSwitch';
import { getInitials } from '../../utils/formatters';

const USER = { name: 'Vijay Sharma', email: 'vijay@sharmacaterers.in', phone: '+91 98201 44321', company: 'Sharma Caterers Pvt Ltd', gst: '27AABCS1429B1Z1' };

export default function CustomerProfile() {
  const [form, setForm] = useState(USER);
  const [notifs, setNotifs] = useState({ email: true, sms: true, orderUpdates: true, promotions: false });

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Avatar */}
      <div className="dash-card p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[22px] font-bold"
              style={{ background: 'var(--dash-green)' }}>
              {getInitials(form.name)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center border"
              style={{ borderColor: 'var(--dash-border)' }}>
              <Camera size={12} style={{ color: 'var(--dash-muted)' }} />
            </button>
          </div>
          <div>
            <h3 className="text-[18px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>{form.name}</h3>
            <p className="text-[13px]" style={{ color: 'var(--dash-muted)' }}>Platinum Member · {form.company}</p>
          </div>
        </div>
      </div>

      {/* Profile form */}
      <div className="dash-card p-6 space-y-5">
        <h3 className="text-[16px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Personal Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          <InputField label="Phone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
          <InputField label="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          <InputField label="Company" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
          <InputField label="GST Number" value={form.gst} onChange={e => setForm(p => ({ ...p, gst: e.target.value }))} />
        </div>
        <button className="px-6 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90">
          Save Changes
        </button>
      </div>

      {/* Notifications */}
      <div className="dash-card p-6 space-y-4">
        <h3 className="text-[16px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Notifications</h3>
        <ToggleSwitch checked={notifs.email} onChange={v => setNotifs(p => ({ ...p, email: v }))}
          label="Email Notifications" description="Receive updates via email" />
        <ToggleSwitch checked={notifs.sms} onChange={v => setNotifs(p => ({ ...p, sms: v }))}
          label="SMS Notifications" description="Receive updates via SMS" />
        <ToggleSwitch checked={notifs.orderUpdates} onChange={v => setNotifs(p => ({ ...p, orderUpdates: v }))}
          label="Order Updates" description="Shipping and delivery notifications" />
        <ToggleSwitch checked={notifs.promotions} onChange={v => setNotifs(p => ({ ...p, promotions: v }))}
          label="Promotional Offers" description="New products and special deals" />
      </div>

      {/* Change password */}
      <div className="dash-card p-6 space-y-4">
        <h3 className="text-[16px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Change Password</h3>
        <InputField label="Current Password" type="password" placeholder="••••••••" />
        <InputField label="New Password" type="password" placeholder="••••••••" />
        <InputField label="Confirm New Password" type="password" placeholder="••••••••" />
        <button className="px-6 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90">
          Update Password
        </button>
      </div>
    </div>
  );
}
