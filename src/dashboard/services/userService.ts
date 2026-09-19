import { mockUsers } from '../data/mockData';
import type { User, UserRole, UserStatus } from '../data/mockData';

let users = [...mockUsers];

export const userService = {
  getAll: () => [...users],

  getById: (id: string) => users.find(u => u.id === id) ?? null,

  getByRole: (role: UserRole) => users.filter(u => u.role === role),

  search: (query: string) => {
    const q = query.toLowerCase();
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.company && u.company.toLowerCase().includes(q))
    );
  },

  create: (data: Omit<User, 'id' | 'joinedAt' | 'lastActive' | 'orders'>): User => {
    const newUser: User = {
      ...data,
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      joinedAt: new Date().toISOString().split('T')[0],
      lastActive: undefined,
      orders: 0,
      status: 'Active',
    };
    users.push(newUser);
    return newUser;
  },

  update: (id: string, data: Partial<User>): User | null => {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...data };
    return users[idx];
  },

  updateStatus: (id: string, status: UserStatus): boolean => {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    users[idx].status = status;
    return true;
  },

  updateRole: (id: string, role: UserRole): boolean => {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return false;
    users[idx].role = role;
    return true;
  },

  delete: (id: string): boolean => {
    const prev = users.length;
    users = users.filter(u => u.id !== id);
    return users.length < prev;
  },

  getStats: () => ({
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    suspended: users.filter(u => u.status === 'Suspended').length,
    customers: users.filter(u => u.role === 'Customer').length,
    staff: users.filter(u => u.role !== 'Customer').length,
  }),
};
