import { useState } from 'react';
import { Shield, Bell, Database, Globe } from 'lucide-react';
import ToggleSwitch from '../../components/ToggleSwitch';
import InputField from '../../components/InputField';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    emailNotifications: true,
    smsAlerts: true,
    autoAssignTickets: false,
    publicCatalog: true,
    gstEnabled: true,
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      {/* ── HEADER ── */}
      <div>
        <h1 className="text-[28px] font-bold tracking-tight" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
          System Settings
        </h1>
        <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Configure site-wide parameters, notification preferences, and tax settings.</p>
      </div>

      <div className="space-y-6">

      {/* Site Settings */}
      <div className="dash-card p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#DDF3E4' }}>
            <Globe size={18} color="#1A7A3C" />
          </div>
          <h3 className="text-[16px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Site Settings</h3>
        </div>
        <InputField label="Site Name" defaultValue="KitchenBots India" />
        <InputField label="Support Email" defaultValue="support@kitchenbots.in" type="email" />
        <InputField label="Support Phone" defaultValue="+91 90000 00000" />
        <ToggleSwitch
          checked={settings.maintenanceMode}
          onChange={v => setSettings(p => ({ ...p, maintenanceMode: v }))}
          label="Maintenance Mode"
          description="Temporarily disable customer access to the store"
        />
        <ToggleSwitch
          checked={settings.publicCatalog}
          onChange={v => setSettings(p => ({ ...p, publicCatalog: v }))}
          label="Public Product Catalog"
          description="Allow non-logged in visitors to browse products"
        />
        <button className="px-6 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90">
          Save Site Settings
        </button>
      </div>

      {/* Notifications */}
      <div className="dash-card p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#FFF3DC' }}>
            <Bell size={18} color="#E8940A" />
          </div>
          <h3 className="text-[16px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Notifications</h3>
        </div>
        <ToggleSwitch
          checked={settings.emailNotifications}
          onChange={v => setSettings(p => ({ ...p, emailNotifications: v }))}
          label="Email Notifications"
          description="Send order and ticket updates via email"
        />
        <ToggleSwitch
          checked={settings.smsAlerts}
          onChange={v => setSettings(p => ({ ...p, smsAlerts: v }))}
          label="SMS Alerts"
          description="Send critical alerts via SMS"
        />
        <ToggleSwitch
          checked={settings.autoAssignTickets}
          onChange={v => setSettings(p => ({ ...p, autoAssignTickets: v }))}
          label="Auto-assign Tickets"
          description="Automatically assign incoming tickets to available engineers"
        />
      </div>

      {/* Tax & Billing */}
      <div className="dash-card p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#DCEBFF' }}>
            <Database size={18} color="#1E6BD3" />
          </div>
          <h3 className="text-[16px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Tax & Billing</h3>
        </div>
        <ToggleSwitch
          checked={settings.gstEnabled}
          onChange={v => setSettings(p => ({ ...p, gstEnabled: v }))}
          label="GST Enabled"
          description="Apply 18% GST on all orders"
        />
        <InputField label="GST Number" defaultValue="27AABCK1234B1Z5" />
        <InputField label="Company Legal Name" defaultValue="KitchenBots India Pvt Ltd" />
        <button className="px-6 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90">
          Save Tax Settings
        </button>
      </div>

      {/* Security */}
      <div className="dash-card p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#E8DEFF' }}>
            <Shield size={18} color="#6B3FA0" />
          </div>
          <h3 className="text-[16px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Security</h3>
        </div>
        <InputField label="Current Password" type="password" placeholder="••••••••" />
        <InputField label="New Password" type="password" placeholder="••••••••" />
        <InputField label="Confirm New Password" type="password" placeholder="••••••••" />
        <button className="px-6 py-2.5 rounded-[14px] bg-[#6B3FA0] text-white text-[14px] font-semibold hover:opacity-90">
          Update Password
        </button>
      </div>
    </div>
    </div>
  );
}
