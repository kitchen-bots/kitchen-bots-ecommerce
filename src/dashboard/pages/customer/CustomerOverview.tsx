import { ShoppingBag, MessageSquare, TrendingUp, CheckCircle, Package } from 'lucide-react';
import StatCard from '../../components/StatCard';
import ActivityFeed from '../../components/ActivityFeed';
import StatusBadge from '../../components/StatusBadge';
import { mockOrders, mockTickets } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

export default function CustomerOverview() {
  const delivered  = mockOrders.filter(o => o.status === 'Delivered').length;
  const inProgress = mockOrders.filter(o => ['Confirmed', 'Processing', 'Shipped'].includes(o.status)).length;
  const totalSpend = mockOrders.reduce((s, o) => s + o.total, 0);

  const recent = [...mockOrders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="rounded-[24px] p-6 flex items-center gap-5"
        style={{ background: 'linear-gradient(135deg, #1A7A3C 0%, #0F5A2A 100%)' }}>
        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Package size={28} color="white" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome back, Vijay 👋
          </h2>
          <p className="text-white/70 text-[14px] mt-0.5">You have {inProgress} active order{inProgress !== 1 ? 's' : ''} in progress.</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Orders"    value={mockOrders.length.toString()} icon={<ShoppingBag size={20} />} accent="#DDF3E4" iconColor="#1A7A3C" delta="+2 this month" />
        <StatCard label="Total Spend"     value={formatCurrency(totalSpend)}   icon={<TrendingUp size={20} />}  accent="#E8DEFF" iconColor="#6B3FA0" />
        <StatCard label="Open Tickets"    value={mockTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length.toString()} icon={<MessageSquare size={20} />} accent="#FFF3DC" iconColor="#E8940A" />
        <StatCard label="Delivered"       value={delivered.toString()}         icon={<CheckCircle size={20} />} accent="#DCEBFF" iconColor="#1E6BD3" delta="All on time" />
      </div>

      {/* Recent orders + Activity */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-3 dash-card p-0 overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--dash-border)' }}>
            <h3 className="text-[16px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Recent Orders</h3>
            <span className="text-[12px] font-semibold" style={{ color: 'var(--dash-green)' }}>View all →</span>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--dash-border)' }}>
            {recent.map(order => (
              <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#DDF3E4' }}>
                  <ShoppingBag size={16} color="#1A7A3C" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold truncate" style={{ color: 'var(--dash-heading)' }}>{order.id}</p>
                  <p className="text-[12px] truncate" style={{ color: 'var(--dash-muted)' }}>{order.items[0]}{order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[14px] font-bold" style={{ color: 'var(--dash-heading)' }}>{formatCurrency(order.total)}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="lg:col-span-2 dash-card p-6">
          <h3 className="text-[16px] font-bold mb-5" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>Activity</h3>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
