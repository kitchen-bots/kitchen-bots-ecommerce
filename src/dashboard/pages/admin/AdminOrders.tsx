import { useState } from 'react';
import { ShoppingBag, FileDown, Search, Eye, Clock, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import OrderModal from '../../components/OrderModal';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { orderService } from '../../services/orderService';
import { useNotification } from '../../context/NotificationContext';
import type { Order, OrderStatus } from '../../data/mockData';

// Reusable StatCard for consistent look
const StatCard = ({ label, value, icon, color, bg }: { label: string; value: string | number; icon: React.ReactNode; color: string; bg: string }) => (
  <div className="dash-card p-5 group hover:border-[var(--dash-green)]/30 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
        style={{ background: bg, color: color }}>
        {icon}
      </div>
      <div>
        <p className="text-[13px] font-medium" style={{ color: 'var(--dash-muted)' }}>{label}</p>
        <p className="text-2xl font-bold" style={{ color: 'var(--dash-heading)' }}>{value}</p>
      </div>
    </div>
  </div>
);

const STATUS_OPTIONS = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Processing', label: 'Processing' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'QC', label: 'QC' },
  { value: 'Dispatch', label: 'Dispatch' },
  { value: 'Shipped', label: 'Shipped' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Cancelled', label: 'Cancelled' },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(orderService.getAll());
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { success, error } = useNotification();

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    const isUpdated = orderService.updateStatus(orderId, newStatus);
    if (isUpdated) {
      setOrders(orderService.getAll());
      success(`Order ${orderId} status updated to ${newStatus}`);
    } else {
      error('Failed to update order status');
    }
  };

  // Stats calculation
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    revenue: orders.reduce((acc, o) => o.status !== 'Cancelled' ? acc + o.total : acc, 0),
    completed: orders.filter(o => o.status === 'Delivered').length,
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some(i => i.toLowerCase().includes(search.toLowerCase())) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (filter === 'All' || o.status === filter);
  });

  const handleExport = () => {
    const headers = ['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date'];
    const csvData = filtered.map(o => [
      o.id,
      o.customerName || 'N/A',
      o.items.join('; '),
      o.total,
      o.status,
      o.date
    ]);
    
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `kitchenbots-orders-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Order Management</h1>
          <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Track and manage all customer orders and shipments.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-[14px] font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <FileDown size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={stats.total} icon={<ShoppingBag size={20} />} color="var(--dash-green)" bg="var(--dash-soft-green)" />
        <StatCard label="Pending Orders" value={stats.pending} icon={<Clock size={20} />} color="#F59E0B" bg="#FEF3C7" />
        <StatCard label="Total Revenue" value={formatCurrency(stats.revenue)} icon={<CheckCircle2 size={20} />} color="#10B981" bg="#D1FAE5" />
        <StatCard label="Completed" value={stats.completed} icon={<CheckCircle2 size={20} />} color="#6366F1" bg="#EEF2FF" />
      </div>

      {/* ── FILTERS & TABLE ── */}
      <div className="dash-card overflow-hidden">
        <div className="border-b border-slate-100 p-5 bg-slate-50/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 group">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--dash-green)]"
                style={{ color: 'var(--dash-muted)' }} />
              <input
                type="text"
                placeholder="Search orders, customers or items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--dash-green)]/20 focus:border-[var(--dash-green)] transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--dash-green)]/20 cursor-pointer"
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Order Details</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td>
                    <span className="font-bold text-[14px]" style={{ color: 'var(--dash-heading)' }}>{o.id}</span>
                  </td>
                  <td>
                    <div className="min-w-0">
                      <p className="font-semibold text-[14px]" style={{ color: 'var(--dash-heading)' }}>{o.customerName || 'Anonymous'}</p>
                      <p className="text-[12px] opacity-70" style={{ color: 'var(--dash-muted)' }}>{o.customerEmail || '—'}</p>
                    </div>
                  </td>
                  <td>
                    <div className="max-w-[200px]">
                      <p className="text-[13px] truncate" style={{ color: 'var(--dash-body)' }}>{o.items.join(', ')}</p>
                      {o.items.length > 1 && <p className="text-[11px]" style={{ color: 'var(--dash-muted)' }}>{o.items.length} items total</p>}
                    </div>
                  </td>
                  <td>
                    <span className="font-bold text-[14px]" style={{ color: 'var(--dash-heading)' }}>{formatCurrency(o.total)}</span>
                  </td>
                  <td>
                    <StatusBadge status={o.status} />
                  </td>
                  <td>
                    <span className="text-[13px]" style={{ color: 'var(--dash-muted)' }}>{formatDate(o.date)}</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end">
                      <button 
                        onClick={() => { setSelectedOrder(o); setIsModalOpen(true); }}
                        className="w-9 h-9 rounded-xl hover:bg-slate-200/50 flex items-center justify-center transition-colors group/btn"
                      >
                        <Eye size={16} className="text-slate-400 group-hover/btn:text-[var(--dash-green)]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filtered.length === 0 && (
            <div className="p-20 text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} className="text-slate-300" />
              </div>
              <h3 className="text-[18px] font-bold mb-1" style={{ color: 'var(--dash-heading)' }}>No orders found</h3>
              <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Try adjusting your search or filters.</p>
              <button
                onClick={() => { setSearch(''); setFilter('All'); }}
                className="mt-6 text-[14px] font-bold text-[var(--dash-green)] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }}
        order={selectedOrder}
        onStatusUpdate={handleUpdateStatus}
      />
    </div>
  );
}
