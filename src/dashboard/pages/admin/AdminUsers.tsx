import { useState } from 'react';
import {
  Users, UserCheck, Clock, Plus, FileDown,
  Pencil, Trash2, Mail, Building2, ShieldCheck, AlertTriangle
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import StatCard from '../../components/StatCard';
import SearchBar from '../../components/SearchBar';
import { formatDate, getInitials, formatTimeAgo } from '../../utils/formatters';
import { mockUsers } from '../../data/mockData';
import type { User } from '../../data/mockData';
import UserModal from '../../components/UserModal';
import { Eye } from 'lucide-react';

interface AdminUsersProps {
  onViewUser: (user: User) => void;
}

export default function AdminUsers({ onViewUser }: AdminUsersProps) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Stats calculation
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    customers: users.filter(u => u.role === 'Customer').length,
    pending: users.filter(u => u.status === 'Pending').length,
  };

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                         u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSaveUser = (userData: Partial<User>) => {
    if (selectedUser) {
      // Edit
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...userData } as User : u));
      showNotification('User updated successfully');
    } else {
      // Add
      const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      } as User;
      setUsers(prev => [newUser, ...prev]);
      showNotification('New user added successfully');
    }
  };

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Joined'];
    const csvData = filtered.map(u => [
      u.name,
      u.email,
      u.role,
      u.status,
      formatDate(u.joinedAt)
    ]);
    
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `kitchenbots-users-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>User Management</h1>
          <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Manage your system users, roles, and permissions.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-[14px] font-medium hover:bg-slate-50 transition-colors">
            <FileDown size={16} /> Export
          </button>
          <button 
            onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-[14px] font-semibold hover:opacity-90 transition-opacity shadow-lg"
            style={{ background: 'var(--dash-green)' }}>
            <Plus size={18} /> Add User
          </button>
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={stats.total} icon={<Users size={20} />} color="green" />
        <StatCard label="Active Now" value={stats.active} icon={<UserCheck size={20} />} color="blue" />
        <StatCard label="Customers" value={stats.customers} icon={<Building2 size={20} />} color="purple" />
        <StatCard label="Pending Invites" value={stats.pending} icon={<Clock size={20} />} color="orange" />
      </div>

      {/* ── TABLE & FILTERS ── */}
      <div className="dash-card overflow-hidden">
        {/* Filters bar */}
        <div className="border-b border-slate-100 p-5 bg-slate-50/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <SearchBar 
                value={search} 
                onChange={setSearch} 
                placeholder="Search by name, email or company..." 
              />
            </div>
            <div className="flex gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-[44px] px-4 rounded-xl border border-slate-200 bg-white text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--dash-green)]/20 cursor-pointer"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Customer">Customer</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[44px] px-4 rounded-xl border border-slate-200 bg-white text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--dash-green)]/20 cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th className="w-[30%]">User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Last Active</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0 shadow-sm"
                        style={{ background: 'var(--dash-green)' }}>
                        {getInitials(user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[14px] truncate" style={{ color: 'var(--dash-heading)' }}>{user.name}</p>
                        <p className="text-[12px] truncate opacity-70 flex items-center gap-1" style={{ color: 'var(--dash-muted)' }}>
                          <Mail size={12} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-[14px] font-medium" style={{ color: 'var(--dash-body)' }}>
                      {user.role === 'Admin' ? <ShieldCheck size={14} className="text-[#E8940A]" /> : <Users size={14} className="text-slate-400" />}
                      {user.role}
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                  <td>
                    <div className="text-[13px]" style={{ color: 'var(--dash-body)' }}>
                      {formatDate(user.joinedAt)}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--dash-muted)' }}>
                      <Clock size={13} />
                      {formatTimeAgo(user.lastActive)}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => onViewUser(user)}
                        className="w-9 h-9 rounded-xl hover:bg-slate-200/50 flex items-center justify-center transition-colors"
                        title="View Profile"
                      >
                        <Eye size={15} className="text-slate-400 group-hover:text-[var(--dash-green)]" />
                      </button>
                      <button 
                        onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}
                        className="w-9 h-9 rounded-xl hover:bg-slate-200/50 flex items-center justify-center transition-colors">
                        <Pencil size={15} className="text-slate-400 group-hover:text-slate-600" />
                      </button>
                      <button className="w-9 h-9 rounded-xl hover:bg-red-50 flex items-center justify-center transition-colors"
                        onClick={() => setDeleteId(user.id)}>
                        <Trash2 size={15} className="text-red-400 group-hover:text-red-600" />
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
                <Users size={32} className="text-slate-300" />
              </div>
              <h3 className="text-[18px] font-bold mb-1" style={{ color: 'var(--dash-heading)' }}>No users found</h3>
              <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={() => { setSearch(''); setRoleFilter('All'); setStatusFilter('All'); }}
                className="mt-6 text-[14px] font-bold text-[var(--dash-green)] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Footer / Pagination */}
        {filtered.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            <p className="text-[13px]" style={{ color: 'var(--dash-muted)' }}>
              Showing <span className="font-bold text-slate-900">{filtered.length}</span> of <span className="font-bold text-slate-900">{users.length}</span> users
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-[13px] font-medium opacity-50 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-[13px] font-medium hover:bg-slate-50">Next</button>
            </div>
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          setUsers(u => u.filter(x => x.id !== deleteId));
          setDeleteId(null);
          showNotification('User deleted successfully');
        }}
        title="Delete User"
        message="This will permanently delete the user and all associated data. This action cannot be undone."
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedUser(null); }}
        onSave={handleSaveUser}
        initialData={selectedUser}
      />

      {/* ── NOTIFICATION TOAST ── */}
      {notification && (
        <div 
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-4 duration-300"
        >
          <div className={`px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border ${
            notification.type === 'success' 
              ? 'bg-[#1A7A3C] border-[#14532D] text-white' 
              : 'bg-red-600 border-red-700 text-white'
          }`}>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              {notification.type === 'success' ? <Users size={14} /> : <AlertTriangle size={14} />}
            </div>
            <p className="text-[14px] font-semibold tracking-wide">{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
