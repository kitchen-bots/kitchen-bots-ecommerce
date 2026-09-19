import { mockTickets } from '../data/mockData';
import type { Ticket, TicketStatus } from '../data/mockData';

let tickets = [...mockTickets];

export const ticketService = {
  getAll: () => [...tickets],

  getById: (id: string) => tickets.find(t => t.id === id) ?? null,

  getByCustomer: (customerId: string) => tickets.filter(t => t.customerId === customerId),

  getByStatus: (status: TicketStatus) => tickets.filter(t => t.status === status),
  
  search: (query: string) => {
    const q = query.toLowerCase();
    return tickets.filter(t => 
      t.id.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  },

  create: (data: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Ticket => {
    const newTicket: Ticket = {
      ...data,
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    tickets.push(newTicket);
    return newTicket;
  },

  updateStatus: (id: string, status: TicketStatus): boolean => {
    const idx = tickets.findIndex(t => t.id === id);
    if (idx === -1) return false;
    tickets[idx].status = status;
    tickets[idx].updatedAt = new Date().toISOString().split('T')[0];
    return true;
  },

  assign: (id: string, engineer: string): boolean => {
    const idx = tickets.findIndex(t => t.id === id);
    if (idx === -1) return false;
    tickets[idx].assignedTo = engineer;
    tickets[idx].status = 'In Progress';
    tickets[idx].updatedAt = new Date().toISOString().split('T')[0];
    return true;
  },

  getStats: () => ({
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
  }),

  getEngineers: () => ['Rajesh Kumar', 'Amit Singh', 'Sneha Patil', 'Vikram Rathore', 'Priya Sharma'],
};
