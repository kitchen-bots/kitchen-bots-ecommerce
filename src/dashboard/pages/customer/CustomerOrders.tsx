import { useState } from 'react';
import { ShoppingBag, Truck, MapPin, Package } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import SearchBar from '../../components/SearchBar';
import { mockOrders } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';
import type { OrderStatus } from '../../data/mockData';

const STATUS_FILTERS: (OrderStatus | 'All')[] = ['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function CustomerOrders() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = mockOrders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some(i => i.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'All' || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search orders or items…" className="flex-1" />
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-[12px] text-[13px] font-semibold transition-all ${filter === s ? 'bg-[#1A7A3C] text-white' : 'hover:bg-gray-100'}`}
              style={filter !== s ? { background: 'var(--dash-surface)', color: 'var(--dash-body)', border: '1px solid var(--dash-border)' } : {}}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="dash-card p-12 text-center">
            <ShoppingBag size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-[15px] font-semibold" style={{ color: 'var(--dash-muted)' }}>No orders found</p>
          </div>
        )}
        {filtered.map(order => (
          <div key={order.id} className="dash-card overflow-hidden">
            <button
              className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#DDF3E4' }}>
                <Package size={18} color="#1A7A3C" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[15px] font-bold" style={{ color: 'var(--dash-heading)' }}>{order.id}</span>
                  <StatusBadge status={order.status} />
                </div>
                <p className="text-[13px] truncate mt-0.5" style={{ color: 'var(--dash-muted)' }}>
                  {order.items.join(', ')}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[16px] font-bold" style={{ color: 'var(--dash-heading)' }}>{formatCurrency(order.total)}</p>
                <p className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>{formatDate(order.date)}</p>
              </div>
            </button>

            {expanded === order.id && (
              <div className="px-6 pb-5 border-t pt-4 space-y-3" style={{ borderColor: 'var(--dash-border)', background: 'var(--dash-bg)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--dash-muted)' }}>Order Items</p>
                    {order.items.map(i => (
                      <p key={i} className="text-[13px]" style={{ color: 'var(--dash-body)' }}>• {i}</p>
                    ))}
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--dash-muted)' }} />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--dash-muted)' }}>Delivery Address</p>
                      <p className="text-[13px]" style={{ color: 'var(--dash-body)' }}>{order.address}</p>
                    </div>
                  </div>
                  {order.trackingId && (
                    <div className="flex items-start gap-2">
                      <Truck size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--dash-muted)' }} />
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--dash-muted)' }}>Tracking ID</p>
                        <p className="text-[13px] font-semibold" style={{ color: 'var(--dash-green)' }}>{order.trackingId}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
