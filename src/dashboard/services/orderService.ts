import { mockOrders } from '../data/mockData';
import type { Order, OrderStatus } from '../data/mockData';

let orders: Order[] = [...mockOrders];

export const orderService = {
  getAll: () => [...orders],

  getById: (id: string) => orders.find(o => o.id === id) ?? null,

  getByCustomer: (customerId: string) => orders.filter(o => o.customerId === customerId),

  getByStatus: (status: OrderStatus) => orders.filter(o => o.status === status),

  search: (query: string) => {
    const q = query.toLowerCase();
    return orders.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.company?.toLowerCase().includes(q)
    );
  },

  updateStatus: (id: string, status: OrderStatus): boolean => {
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) return false;
    orders[idx].status = status;
    orders[idx].updatedAt = new Date().toISOString().split('T')[0];
    return true;
  },

  getStats: () => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => ['Processing', 'Manufacturing', 'QC'].includes(o.status)).length,
    dispatch: orders.filter(o => o.status === 'Dispatch').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    revenue: orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.total, 0),
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  }),
};
