import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { TrendingUp, Package, ShoppingBag, CalendarDays, Users, Clock, ChevronRight } from 'lucide-react';
import { adminStats, mockRevenueChart, mockOrders } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import StatCard from '../../components/StatCard';

// Colour each bar: last 2 are KB-green + lime, rest muted gray
const BAR_COLORS = mockRevenueChart.map((_, i, arr) => {
  if (i === arr.length - 1) return '#C8F135'; // lime
  if (i === arr.length - 2) return '#1A7A3C'; // dark green
  return '#D1D5DB';                            // gray
});

const recentOrders = [...mockOrders]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 4);

const ORDER_ICON_BG: Record<string, string> = {
  Delivered: '#DDF3E4',
  Shipped:   '#DCEBFF',
  Processing:'#FFF3DC',
  Confirmed: '#E8DEFF',
  Pending:   '#F3F4F6',
  Cancelled: '#FFEAEA',
};
const ORDER_ICON_COLOR: Record<string, string> = {
  Delivered: '#1A7A3C',
  Shipped:   '#1E6BD3',
  Processing:'#E8940A',
  Confirmed: '#6B3FA0',
  Pending:   '#6B7280',
  Cancelled: '#C0392B',
};
const STATUS_PILL: Record<string, { bg: string; text: string }> = {
  Delivered:  { bg: '#DDF3E4', text: '#1A7A3C' },
  Shipped:    { bg: '#DCEBFF', text: '#1E6BD3' },
  Processing: { bg: '#FFF3DC', text: '#E8940A' },
  Confirmed:  { bg: '#E8DEFF', text: '#6B3FA0' },
  Pending:    { bg: '#F3F4F6', text: '#6B7280' },
  Cancelled:  { bg: '#FFEAEA', text: '#C0392B' },
};

const TEAM = [
  { initials: 'AM', name: 'Anita Menon',  status: 'Active now',    online: true },
  { initials: 'RK', name: 'Ravi Kumar',   status: 'Offline (2h)',  online: false },
];

// Custom Y-axis tick: ₹0, ₹1L … ₹5L
const formatY = (v: number) => {
  if (v === 0) return '₹0';
  return `₹${v / 100000}L`;
};

export default function AdminOverview() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* ── WELCOME BANNER ── */}
      <div>
        <h2 className="text-[28px] font-bold leading-tight" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
          Welcome back, Raj&nbsp;👋
        </h2>
        <p className="mt-1 text-[14px]" style={{ color: 'var(--dash-muted)' }}>
          Here's what's happening with your kitchen operations today.
        </p>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          label="Total Revenue"
          value={formatCurrency(adminStats.totalRevenue)}
          icon={<TrendingUp size={20} />}
          color="green"
          trend={`+${adminStats.revenueGrowth}%`}
        />
        <StatCard
          label="Total Orders"
          value={adminStats.totalOrders.toLocaleString('en-IN')}
          icon={<ShoppingBag size={20} />}
          color="blue"
          trend={`+${adminStats.ordersGrowth}%`}
        />
        <StatCard
          label="Total Products"
          value="342"
          icon={<Package size={20} />}
          color="orange"
          trend="In Stock"
        />
      </div>

      {/* ── MAIN GRID: chart+orders | right panel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Revenue chart + Recent Orders */}
        <div className="lg:col-span-2 space-y-6">

          {/* Revenue Growth bar chart */}
          <div className="dash-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[17px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
                Revenue Growth
              </h3>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-semibold"
                style={{ borderColor: 'var(--dash-border)', color: 'var(--dash-muted)', background: 'var(--dash-bg)' }}>
                <CalendarDays size={13} />
                Last 30 Days
              </div>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={mockRevenueChart} barSize={28} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatY}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 600000]}
                  ticks={[0, 100000, 200000, 300000, 400000, 500000]}
                />
                <Tooltip
                  formatter={(v) => [formatCurrency(Number(v ?? 0)), 'Revenue']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #E8EAED', fontSize: 13 }}
                  cursor={{ fill: 'rgba(26,122,60,0.05)', radius: 8 }}
                />
                <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                  {mockRevenueChart.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Orders */}
          <div className="dash-card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--dash-border)' }}>
              <h3 className="text-[17px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
                Recent Orders
              </h3>
              <button className="flex items-center gap-1 text-[13px] font-semibold" style={{ color: 'var(--dash-green)' }}>
                View All <ChevronRight size={15} />
              </button>
            </div>

            <div className="divide-y" style={{ borderColor: 'var(--dash-border)' }}>
              {recentOrders.map(order => {
                const pill = STATUS_PILL[order.status] ?? { bg: '#F3F4F6', text: '#6B7280' };
                const iconBg = ORDER_ICON_BG[order.status] ?? '#F3F4F6';
                const iconColor = ORDER_ICON_COLOR[order.status] ?? '#6B7280';
                return (
                  <div key={order.id} className="flex items-center gap-4 px-6 py-4">
                    {/* Icon bubble */}
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: iconBg }}>
                      <ShoppingBag size={18} color={iconColor} />
                    </div>
                    {/* Name + id */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold truncate" style={{ color: 'var(--dash-heading)' }}>
                        {order.items[0]}{order.items.length > 1 ? ` +${order.items.length - 1}` : ''}
                      </p>
                      <p className="text-[12px] mt-0.5" style={{ color: 'var(--dash-muted)' }}>
                        {order.id} &bull; {order.date}
                      </p>
                    </div>
                    {/* Amount */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-[15px] font-bold" style={{ color: 'var(--dash-heading)' }}>
                        {formatCurrency(order.total)}
                      </p>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                        style={{ background: pill.bg, color: pill.text }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Maintenance card + Team members */}
        <div className="space-y-5">

          {/* Maintenance Alert Card */}
          <div className="rounded-[24px] p-6 flex flex-col gap-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A7A3C 0%, #146232 100%)' }}>
            {/* Decorative circle */}
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-10"
              style={{ background: '#C8F135' }} />
            <div>
              <p className="text-[18px] font-bold leading-snug text-white" style={{ fontFamily: 'var(--font-display)' }}>
                New Maintenance<br />Request
              </p>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                2 machines require immediate scheduled maintenance.
              </p>
            </div>
            <button className="w-full py-3 rounded-2xl text-[14px] font-bold transition-transform hover:scale-[1.02] active:scale-95"
              style={{ background: '#FFFFFF', color: '#1A7A3C' }}>
              Schedule Now
            </button>
          </div>

          {/* Team Members Online */}
          <div className="dash-card p-5">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--dash-muted)' }}>
              Team Members Online
            </p>
            <div className="space-y-3">
              {TEAM.map(m => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
                      style={{ background: m.online ? 'var(--dash-green)' : '#9CA3AF' }}>
                      {m.initials}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                      style={{ background: m.online ? '#22C55E' : '#9CA3AF' }} />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold" style={{ color: 'var(--dash-heading)' }}>{m.name}</p>
                    <p className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>{m.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-[13px] font-semibold flex items-center gap-1" style={{ color: 'var(--dash-green)' }}>
              <Users size={14} /> Invite Member
            </button>
          </div>

          {/* Quick stats strip */}
          <div className="dash-card p-5 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--dash-muted)' }}>
              Open Tickets
            </p>
            <div className="flex items-end justify-between">
              <p className="text-[28px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
                {adminStats.openTickets}
              </p>
              <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: '#FFEAEA', color: '#C0392B' }}>
                {adminStats.ticketsDelta > 0 ? `+${adminStats.ticketsDelta}` : adminStats.ticketsDelta} vs last week
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} color="#E8940A" />
              <span className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>Avg resolution: 2.4 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
