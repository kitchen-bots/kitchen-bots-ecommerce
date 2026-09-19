import { useState } from 'react';
import { Plus, MessageSquare, Clock } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import SearchBar from '../../components/SearchBar';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import { mockTickets } from '../../data/mockData';
import { formatDate } from '../../utils/formatters';

const PRIORITY_COLOR: Record<string, string> = {
  High: '#FFEAEA',
  Medium: '#FFF3DC',
  Low: '#DCEBFF',
};
const PRIORITY_TEXT: Record<string, string> = {
  High: '#C0392B',
  Medium: '#E8940A',
  Low: '#1E6BD3',
};

export default function CustomerEnquiries() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ subject: '', category: 'Technical Issue', priority: 'Medium', description: '' });

  const filtered = mockTickets.filter(t =>
    t.subject.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search tickets…" className="flex-1" />
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90 transition-opacity">
          <Plus size={16} /> New Ticket
        </button>
      </div>

      {/* New ticket form */}
      {showForm && (
        <div className="dash-card p-6 border-l-4" style={{ borderLeftColor: '#1A7A3C' }}>
          <h3 className="text-[16px] font-bold mb-5" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
            Create Support Ticket
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <InputField label="Subject" placeholder="Describe your issue briefly" value={form.subject}
              onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} />
            <SelectField label="Category" value={form.category}
              onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              options={[
                { value: 'Technical Issue', label: 'Technical Issue' },
                { value: 'Warranty', label: 'Warranty Claim' },
                { value: 'AMC', label: 'AMC / Service Contract' },
                { value: 'Order Support', label: 'Order Support' },
                { value: 'Other', label: 'Other' },
              ]}
            />
          </div>
          <div className="mb-4">
            <label className="text-[13px] font-semibold mb-1.5 block" style={{ color: 'var(--dash-heading)' }}>Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Provide as much detail as possible…"
              className="w-full px-4 py-3 rounded-[14px] border text-[14px] outline-none resize-none focus:ring-2 focus:ring-[#1A7A3C]/20 focus:border-[#1A7A3C]"
              style={{ background: '#FAFBFC', borderColor: 'var(--dash-border)', color: 'var(--dash-heading)', fontFamily: 'var(--font-body)' }}
            />
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90 transition-opacity"
              onClick={() => setShowForm(false)}>Submit Ticket</button>
            <button className="px-6 py-2.5 rounded-[14px] text-[14px] font-semibold hover:bg-gray-100 transition-colors"
              style={{ border: '1px solid var(--dash-border)', color: 'var(--dash-body)' }}
              onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Ticket list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="dash-card p-12 text-center">
            <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-[15px] font-semibold" style={{ color: 'var(--dash-muted)' }}>No tickets found</p>
          </div>
        )}
        {filtered.map(ticket => (
          <div key={ticket.id} className="dash-card p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF3DC' }}>
                <MessageSquare size={18} color="#E8940A" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[15px] font-bold" style={{ color: 'var(--dash-heading)' }}>{ticket.id}</span>
                  <StatusBadge status={ticket.status} />
                  <span className="px-2 py-0.5 rounded-[8px] text-[11px] font-bold"
                    style={{ background: PRIORITY_COLOR[ticket.priority], color: PRIORITY_TEXT[ticket.priority] }}>
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: 'var(--dash-body)' }}>{ticket.subject}</p>
                <p className="text-[13px] line-clamp-2 mb-2" style={{ color: 'var(--dash-muted)' }}>{ticket.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>Category: <strong>{ticket.category}</strong></span>
                  <span className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--dash-muted)' }}>
                    <Clock size={11} /> Updated {formatDate(ticket.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
