import { useState } from 'react';
import { Wrench, MessageSquare, X, User } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import SearchBar from '../../components/SearchBar';
import SelectField from '../../components/SelectField';
import { formatDate } from '../../utils/formatters';
import { ticketService } from '../../services/ticketService';
import { useNotification } from '../../context/NotificationContext';

const PRIORITY_COLOR: Record<string, { bg: string; text: string }> = {
  High:   { bg: '#FFEAEA', text: '#C0392B' },
  Medium: { bg: '#FFF3DC', text: '#E8940A' },
  Low:    { bg: '#DCEBFF', text: '#1E6BD3' },
};

const STATUS_OPTIONS = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Open', label: 'Open' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Resolved', label: 'Resolved' },
  { value: 'Closed', label: 'Closed' },
];

interface AdminServicesProps {
  mode?: 'tickets' | 'enquiries';
}

export default function AdminServices({ mode = 'tickets' }: AdminServicesProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [tickets, setTickets] = useState(ticketService.getAll());
  const { success } = useNotification();

  const [assigningTicketId, setAssigningTicketId] = useState<string | null>(null);

  const isEnquiryMode = mode === 'enquiries';

  const handleAssign = (id: string) => {
    setAssigningTicketId(id);
  };

  const handleConfirmAssign = (engineer: string) => {
    if (assigningTicketId) {
      ticketService.assign(assigningTicketId, engineer);
      setTickets(ticketService.getAll());
      setAssigningTicketId(null);
      success('Ticket Assigned', `Ticket ${assigningTicketId} has been assigned to ${engineer}.`);
    }
  };

  const handleResolve = (id: string) => {
    ticketService.updateStatus(id, 'Resolved');
    setTickets(ticketService.getAll());
    success('Ticket Resolved', `Ticket ${id} has been marked as resolved.`);
  };

  const filtered = tickets.filter(t => {
    const isEnquiry = t.category === 'Order Support'; // Enquiries are mapped to Order Support for now
    const categoryMatch = isEnquiryMode ? isEnquiry : !isEnquiry;

    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    
    return categoryMatch && matchSearch && (filter === 'All' || t.status === filter);
  });

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* ── HEADER ── */}
        <div>
          <h1 className="text-[28px] font-bold tracking-tight" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
            {isEnquiryMode ? 'Customer Enquiries' : 'Service Tickets & Support'}
          </h1>
          <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>
            {isEnquiryMode 
              ? 'View and respond to general customer enquiries and order-related questions.'
              : 'Monitor and manage technical support tickets and maintenance requests.'}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search tickets…" className="flex-1" />
            <SelectField options={STATUS_OPTIONS} value={filter} onChange={e => setFilter(e.target.value)} />
          </div>

          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="dash-card p-12 text-center">
                <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                <p style={{ color: 'var(--dash-muted)' }}>No service tickets found</p>
              </div>
            )}
            {filtered.map(ticket => {
              const pc = PRIORITY_COLOR[ticket.priority] ?? { bg: '#F3F4F6', text: '#6B7280' };
              return (
                <div key={ticket.id} className="dash-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF3DC' }}>
                      <Wrench size={18} color="#E8940A" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[14px] font-bold" style={{ color: 'var(--dash-heading)' }}>{ticket.id}</span>
                        <StatusBadge status={ticket.status} />
                        <span className="px-2 py-0.5 rounded-[8px] text-[11px] font-bold"
                          style={{ background: pc.bg, color: pc.text }}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-[14px] font-semibold mb-1" style={{ color: 'var(--dash-body)' }}>{ticket.subject}</p>
                      <p className="text-[13px] line-clamp-2 mb-3" style={{ color: 'var(--dash-muted)' }}>{ticket.description}</p>
                      <div className="flex flex-wrap gap-4">
                        <span className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>
                          Category: <strong style={{ color: 'var(--dash-body)' }}>{ticket.category}</strong>
                        </span>
                        <span className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>
                          Created: <strong style={{ color: 'var(--dash-body)' }}>{formatDate(ticket.createdAt)}</strong>
                        </span>
                        <span className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>
                          Updated: <strong style={{ color: 'var(--dash-body)' }}>{formatDate(ticket.updatedAt)}</strong>
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {ticket.status === 'Open' && (
                        <button 
                          onClick={() => handleAssign(ticket.id)}
                          className="px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all hover:brightness-95 active:scale-95"
                          style={{ background: '#FFF3DC', color: '#E8940A', border: '1px solid #FCD34D' }}
                        >
                          Assign
                        </button>
                      )}
                      {ticket.status === 'In Progress' && (
                        <button 
                          onClick={() => handleResolve(ticket.id)}
                          className="px-3 py-1.5 rounded-[10px] text-[12px] font-semibold transition-all hover:brightness-95 active:scale-95"
                          style={{ background: '#DDF3E4', color: '#1A7A3C', border: '1px solid #86EFAC' }}
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Assignment Modal */}
      {assigningTicketId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-[18px] font-bold" style={{ color: 'var(--dash-heading)' }}>Assign Engineer</h3>
              <button 
                onClick={() => setAssigningTicketId(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>
                Select an engineer to assign to ticket <strong>{assigningTicketId}</strong>.
              </p>
              <div className="grid gap-2">
                {ticketService.getEngineers().map(engineer => (
                  <button
                    key={engineer}
                    onClick={() => handleConfirmAssign(engineer)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-[var(--dash-green)] hover:bg-[var(--dash-soft-green)] transition-all group text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white transition-colors">
                      <User size={18} className="text-slate-500 group-hover:text-[var(--dash-green)]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold" style={{ color: 'var(--dash-heading)' }}>{engineer}</p>
                      <p className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>Service Engineer • KitchenBots</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 border-t border-slate-100">
              <button 
                onClick={() => setAssigningTicketId(null)}
                className="w-full py-3 rounded-xl border border-slate-200 text-[14px] font-bold hover:bg-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
