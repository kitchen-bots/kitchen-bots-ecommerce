import { useState } from 'react';
import { 
  Mail, Phone, Building, ShieldCheck, Receipt, 
  FileText, Folder, History, ArrowRight, Download,
  CheckCircle, XCircle,
  SquarePen
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import type { User } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

interface AdminUserDetailsProps {
  user: User;
  onBack: () => void;
}

export default function AdminUserDetails({ user, onBack }: AdminUserDetailsProps) {
  const [adminNote, setAdminNote] = useState(user.adminNotes || '');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* ── HEADER ── */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <ArrowRight className="rotate-180" size={20} />
        </button>
        <div>
          <h1 className="text-[28px] font-bold tracking-tight" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>User Details</h1>
          <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Viewing detailed profile for {user.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT COLUMN (8/12) */}
        <div className="xl:col-span-8 space-y-8">
          {/* HERO CARD */}
          <section className="dash-card p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white flex-shrink-0">
                <img 
                  src={user.id === 'USR-001' ? "https://lh3.googleusercontent.com/aida-public/AB6AXuA-IxfDqf4fwV32eBy0MnWhcYoa-FVwDdPA_vAff8Hm_0EODqHDfrP1-6D6b4WdXcg3ZdjPkwYt16HMdVkESEO--GjKPxX3yLokPupKyrzKOvzvmqFjaqJ4HGAgrDo2M9CMIxSiRU1KHxDsInqYdK6ngIDFdJlRoMLRr6PdR6K6Ocf4xbzT4ZKecwKLJ6_bj6n2odLJq65bWXzjsHFuRfk_96642kd4hOMumryXFOpKQgLnBY102976ykIoscaw0f9IpHy6yRyY" : `https://ui-avatars.com/api/?name=${user.name}&background=1A7A3C&color=fff&size=128`}
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                  <div>
                    <h2 className="text-[32px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>{user.name}</h2>
                    <p className="text-[18px] text-[var(--dash-green)] font-medium mt-1">
                      {user.designation || user.role} {user.company ? `at ${user.company}` : ''}
                    </p>
                  </div>
                  <StatusBadge status={user.status} />
                </div>
                <div className="flex flex-wrap gap-6 mt-4 text-[16px]" style={{ color: 'var(--dash-muted)' }}>
                  <div className="flex items-center gap-2">
                    <Mail size={20} /> {user.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={20} /> {user.phone}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-slate-100">
              <button className="bg-[var(--dash-green)] text-white px-6 py-2.5 rounded-full font-bold text-[15px] hover:opacity-90 transition-opacity">
                Message User
              </button>
              <button className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-full font-bold text-[15px] hover:bg-slate-200 transition-colors">
                Edit User
              </button>
              <div className="flex-1"></div>
              <button className="text-red-500 px-6 py-2.5 rounded-full font-bold text-[15px] hover:bg-red-50 transition-colors">
                Suspend
              </button>
              <button className="text-red-600 px-6 py-2.5 rounded-full font-bold text-[15px] hover:bg-red-50 transition-colors">
                Delete
              </button>
            </div>
          </section>

          {/* BUSINESS & PERMISSIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BUSINESS DETAILS */}
            <section className="dash-card p-6">
              <h3 className="text-[20px] font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--dash-heading)' }}>
                <Building className="text-[var(--dash-green)]" size={20} /> Business Details
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-[14px] uppercase tracking-wider font-bold mb-1" style={{ color: 'var(--dash-muted)' }}>Registered Address</p>
                  <p className="text-[16px] leading-relaxed" style={{ color: 'var(--dash-body)' }}>
                    {user.address || 'Not Provided'}
                  </p>
                </div>
                <div>
                  <p className="text-[14px] uppercase tracking-wider font-bold mb-1" style={{ color: 'var(--dash-muted)' }}>Tax ID / GSTIN</p>
                  <p className="text-[16px]" style={{ color: 'var(--dash-body)' }}>{user.gstin || 'Not Available'}</p>
                </div>
                <div>
                  <p className="text-[14px] uppercase tracking-wider font-bold mb-1" style={{ color: 'var(--dash-muted)' }}>Joined Date</p>
                  <p className="text-[16px]" style={{ color: 'var(--dash-body)' }}>{new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </section>

            {/* PERMISSIONS */}
            <section className="dash-card p-6">
              <h3 className="text-[20px] font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--dash-heading)' }}>
                <ShieldCheck className="text-[var(--dash-green)]" size={20} /> Active Permissions
              </h3>
              <ul className="space-y-4">
                {user.permissions?.map((perm, idx) => (
                  <li key={idx} className={`flex items-center gap-3 ${!perm.granted ? 'opacity-50' : ''}`}>
                    {perm.granted ? (
                      <CheckCircle className="text-[var(--dash-green)]" size={18} />
                    ) : (
                      <XCircle className="text-slate-400" size={18} />
                    )}
                    <span className="text-[16px] font-medium" style={{ color: 'var(--dash-body)' }}>{perm.name}</span>
                  </li>
                )) || <li className="text-slate-500 italic">No specific permissions set.</li>}
              </ul>
            </section>
          </div>

          {/* RECENT ORDERS */}
          <section className="dash-card p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[20px] font-bold flex items-center gap-2" style={{ color: 'var(--dash-heading)' }}>
                <Receipt className="text-[var(--dash-green)]" size={20} /> Recent Orders
              </h3>
              <button className="text-[var(--dash-green)] font-bold text-[14px] hover:underline flex items-center gap-1">
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[14px] font-bold uppercase tracking-wider" style={{ color: 'var(--dash-muted)' }}>
                    <th className="pb-4">Order ID</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[16px]">
                  {user.recentOrders?.map((order, idx) => (
                    <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 font-bold" style={{ color: 'var(--dash-heading)' }}>#{order.id}</td>
                      <td className="py-5" style={{ color: 'var(--dash-body)' }}>{order.date}</td>
                      <td className="py-5 font-bold" style={{ color: 'var(--dash-heading)' }}>{formatCurrency(order.total || 0)}</td>
                      <td className="py-5">
                        <StatusBadge status={order.status as any} />
                      </td>
                    </tr>
                  )) || <tr><td colSpan={4} className="py-10 text-center text-slate-400 italic">No orders found for this user.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (4/12) */}
        <div className="xl:col-span-4 space-y-8">
          {/* ADMIN NOTES */}
          <section className="dash-card p-6">
            <h3 className="text-[20px] font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--dash-heading)' }}>
              <SquarePen className="text-[var(--dash-green)]" size={20} /> Admin Notes
            </h3>
            <textarea 
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-[15px] h-32 focus:ring-2 focus:ring-[var(--dash-green)]/20 transition-all resize-none"
              placeholder="Add internal notes about this user..."
            ></textarea>
            <button className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-2xl mt-4 hover:bg-slate-200 transition-colors">
              Save Note
            </button>
          </section>

          {/* DOCUMENTS */}
          <section className="dash-card p-6">
            <h3 className="text-[20px] font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--dash-heading)' }}>
              <Folder className="text-[var(--dash-green)]" size={20} /> Documents
            </h3>
            <div className="space-y-4">
              {user.documents?.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold truncate max-w-[150px]" style={{ color: 'var(--dash-heading)' }}>{doc.name}</p>
                      <p className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>{doc.size} • {doc.date}</p>
                    </div>
                  </div>
                  <Download className="text-slate-300 group-hover:text-[var(--dash-green)] transition-colors" size={18} />
                </div>
              )) || <p className="text-slate-400 italic">No documents uploaded.</p>}
            </div>
          </section>

          {/* ACTIVITY FEED */}
          <section className="dash-card p-6">
            <h3 className="text-[20px] font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--dash-heading)' }}>
              <History className="text-[var(--dash-green)]" size={20} /> Activity Feed
            </h3>
            <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {user.activity?.map((act) => (
                <div key={act.id} className="relative">
                  <span className={`absolute -left-[30px] top-1 w-3.5 h-3.5 rounded-full border-4 border-white ring-1 ring-slate-100 shadow-sm ${
                    act.type === 'order' ? 'bg-[var(--dash-green)]' : 'bg-slate-300'
                  }`}></span>
                  <p className="text-[14px] font-bold" style={{ color: 'var(--dash-heading)' }}>{act.text}</p>
                  <p className="text-[12px] mt-1" style={{ color: 'var(--dash-muted)' }}>{act.time}</p>
                </div>
              )) || <p className="text-slate-400 italic">No recent activity.</p>}
            </div>
            <button className="w-full text-center mt-8 text-[var(--dash-green)] font-bold text-[14px] hover:underline">
              Load More Activity
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
