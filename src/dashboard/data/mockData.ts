// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Manufacturing' | 'QC' | 'Dispatch' | 'Shipped' | 'Delivered' | 'Cancelled';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type DocType = 'Invoice' | 'Warranty' | 'Quotation' | 'AMC' | 'Installation';
export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Suspended';
export type UserRole = 'Customer' | 'Admin' | 'Manager';

export interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: OrderStatus;
  trackingId?: string;
  address: string;
  customerName: string;
  customerEmail: string;
  customerId?: string;
  company?: string;
  updatedAt?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: TicketStatus;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
  description: string;
  customerId?: string;
  assignedTo?: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocType;
  orderId?: string;
  uploadedAt: string;
  size: string;
  url: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  status: 'Active' | 'Inactive' | 'Out of Stock' | 'Draft' | 'Archived';
  image?: string;
  images?: string[];
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserPermission {
  name: string;
  granted: boolean;
}

export interface UserDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  url: string;
}

export interface UserActivity {
  id: string;
  text: string;
  time: string;
  type: 'order' | 'profile' | 'login';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  company?: string;
  status: UserStatus;
  joinedAt: string;
  lastActive?: string;
  orders: number;
  // Detailed fields
  designation?: string;
  address?: string;
  gstin?: string;
  permissions?: UserPermission[];
  recentOrders?: Partial<Order>[];
  documents?: UserDocument[];
  activity?: UserActivity[];
  adminNotes?: string;
}


export interface ActivityItem {
  id: string;
  type: 'order' | 'ticket' | 'document' | 'user';
  icon: string;
  text: string;
  time: string;
}

// ─────────────────────────────────────────────
// MOCK ORDERS
// ─────────────────────────────────────────────
export const mockOrders: Order[] = [
  { id: 'ORD-2024-001', date: '2024-11-12', items: ['Industrial Fryer 40L', 'Exhaust Hood'], total: 128500, status: 'Delivered', trackingId: 'DTDC123456', address: 'Bandra, Mumbai - 400050', customerName: 'Vijay Sharma', customerEmail: 'vijay@sharmacaterers.in', customerId: 'USR-001', company: 'Sharma Caterers' },
  { id: 'ORD-2024-002', date: '2024-12-03', items: ['Commercial Oven 6-Burner', 'Bain Marie 5 Pot'], total: 89200, status: 'Shipped', trackingId: 'DTDC654321', address: 'Koramangala, Bengaluru - 560034', customerName: 'Priya Menon', customerEmail: 'priya@spicehaven.com', customerId: 'USR-002', company: 'Spice Haven' },
  { id: 'ORD-2025-001', date: '2025-01-18', items: ['Dosa Plate x4', 'Idli Stand'], total: 14700, status: 'Processing', address: 'Andheri West, Mumbai - 400058', customerName: 'Rajan Iyer', customerEmail: 'rajan@grandmumbai.in', customerId: 'USR-003', company: 'Grand Mumbai' },
  { id: 'ORD-2025-002', date: '2025-02-07', items: ['Sous Vide Circulator', 'Vacuum Sealer Pro'], total: 44500, status: 'Confirmed', address: 'Juhu, Mumbai - 400049', customerName: 'Meera Das', customerEmail: 'meera@urbanfood.in', customerId: 'USR-007', company: 'Urban Food' },
  { id: 'ORD-2025-003', date: '2025-02-22', items: ['Planetary Mixer 20L'], total: 67800, status: 'Pending', address: 'HSR Layout, Bengaluru - 560102', customerName: 'Suresh Raina', customerEmail: 'suresh@cricketkitchen.com', customerId: 'USR-006', company: 'Cricket Kitchen' },
  { id: 'ORD-2025-004', date: '2025-03-01', items: ['Display Counter 4ft'], total: 32400, status: 'Cancelled', address: 'Powai, Mumbai - 400076', customerName: 'Ananya Krishnan', customerEmail: 'ananya@cateringco.in', customerId: 'USR-004', company: 'Ananya Catering' },
];

// ─────────────────────────────────────────────
// MOCK TICKETS
// ─────────────────────────────────────────────
export const mockTickets: Ticket[] = [
  { id: 'TKT-001', subject: 'Fryer temperature fluctuation after 2 months', category: 'Technical Issue', status: 'Open', priority: 'High', createdAt: '2025-01-20', updatedAt: '2025-01-22', description: 'The fryer temperature drops by 10-15°C after continuous 4-hour operation.', customerId: 'USR-001' },
  { id: 'TKT-002', subject: 'Warranty claim for Commercial Oven burner failure', category: 'Warranty', status: 'In Progress', priority: 'High', createdAt: '2025-02-10', updatedAt: '2025-02-14', description: 'One of the six burners stopped igniting after 3 months of use.', customerId: 'USR-002' },
  { id: 'TKT-003', subject: 'AMC renewal for exhaust hood system', category: 'AMC', status: 'Resolved', priority: 'Medium', createdAt: '2024-12-05', updatedAt: '2024-12-18', description: 'Annual maintenance contract renewal request for exhaust hood.', customerId: 'USR-003' },
  { id: 'TKT-004', subject: 'Delivery address update for ORD-2025-002', category: 'Order Support', status: 'Closed', priority: 'Low', createdAt: '2025-02-08', updatedAt: '2025-02-09', description: 'Need to change delivery address before dispatch.', customerId: 'USR-007' },
];

// ─────────────────────────────────────────────
// MOCK DOCUMENTS
// ─────────────────────────────────────────────
export const mockDocuments: Document[] = [
  { id: 'DOC-001', name: 'Invoice_ORD2024001.pdf', type: 'Invoice', orderId: 'ORD-2024-001', uploadedAt: '2024-11-13', size: '245 KB', url: '#' },
  { id: 'DOC-002', name: 'Warranty_IndustrialFryer.pdf', type: 'Warranty', orderId: 'ORD-2024-001', uploadedAt: '2024-11-13', size: '180 KB', url: '#' },
  { id: 'DOC-003', name: 'Invoice_ORD2024002.pdf', type: 'Invoice', orderId: 'ORD-2024-002', uploadedAt: '2024-12-04', size: '312 KB', url: '#' },
  { id: 'DOC-004', name: 'Quotation_PlantaryMixer.pdf', type: 'Quotation', uploadedAt: '2025-01-10', size: '198 KB', url: '#' },
  { id: 'DOC-005', name: 'AMC_Contract_2025.pdf', type: 'AMC', uploadedAt: '2025-01-05', size: '450 KB', url: '#' },
  { id: 'DOC-006', name: 'InstallationReport_Oven.pdf', type: 'Installation', orderId: 'ORD-2024-002', uploadedAt: '2024-12-20', size: '780 KB', url: '#' },
];

// ─────────────────────────────────────────────
// MOCK ADDRESSES
// ─────────────────────────────────────────────
export const mockAddresses: Address[] = [
  { id: 'ADDR-001', label: 'HQ Kitchen', street: '4th Floor, Sharma Towers, SV Road', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', isDefault: true },
  { id: 'ADDR-002', label: 'Outlet 2', street: '12, 1st Cross, Koramangala 4th Block', city: 'Bengaluru', state: 'Karnataka', pincode: '560034', isDefault: false },
  { id: 'ADDR-003', label: 'Warehouse', street: 'Plot B-14, MIDC Industrial Area, Andheri East', city: 'Mumbai', state: 'Maharashtra', pincode: '400069', isDefault: false },
];

// ─────────────────────────────────────────────
// MOCK PRODUCTS (Admin)
// ─────────────────────────────────────────────
export const mockProducts: Product[] = [
  { id: 'PRD-001', name: 'Industrial Deep Fryer 40L', category: 'Cooking Equipment', price: 86000, stock: 12, sku: 'KB-FRY-40L', status: 'Active', description: 'High-capacity 40-liter fryer for commercial use.', createdAt: '2024-10-01' },
  { id: 'PRD-002', name: 'Commercial 6-Burner Oven', category: 'Cooking Equipment', price: 124000, stock: 5, sku: 'KB-OVN-6B', status: 'Active', description: 'Six-burner commercial range with convection oven.', createdAt: '2024-10-01' },
  { id: 'PRD-003', name: 'Planetary Mixer 20L', category: 'Mixing & Blending', price: 67800, stock: 8, sku: 'KB-MIX-20L', status: 'Active', description: 'Heavy-duty 20L planetary mixer for bakeries.', createdAt: '2024-11-01' },
  { id: 'PRD-004', name: 'Bain Marie 5 Pot', category: 'Food Display', price: 28500, stock: 0, sku: 'KB-BM-5P', status: 'Out of Stock', description: '5-pot bain marie for buffet and catering.', createdAt: '2024-11-15' },
  { id: 'PRD-005', name: 'Exhaust Hood 1500mm', category: 'Ventilation', price: 42000, stock: 3, sku: 'KB-EXH-1500', status: 'Active', description: 'Stainless steel exhaust hood with filters.', createdAt: '2024-12-01' },
  { id: 'PRD-006', name: 'Sous Vide Circulator Pro', category: 'Precision Cooking', price: 18500, stock: 20, sku: 'KB-SV-PRO', status: 'Active', description: 'Precision immersion circulator for sous vide cooking.', createdAt: '2025-01-10' },
  { id: 'PRD-007', name: 'Display Counter 4ft', category: 'Food Display', price: 32400, stock: 7, sku: 'KB-DC-4F', status: 'Inactive', description: 'Refrigerated display counter for patisseries.', createdAt: '2025-02-01' },
];

// ─────────────────────────────────────────────
// MOCK USERS (Admin)
// ─────────────────────────────────────────────
export const mockUsers: User[] = [
  { 
    id: 'USR-001', 
    name: 'Priya Kapoor', 
    email: 'priya.k@spiceroots.in', 
    phone: '+91 98765 43210', 
    role: 'Customer', 
    company: 'Spice Roots Ltd.', 
    designation: 'Procurement Manager',
    status: 'Active', 
    joinedAt: '2022-10-12', 
    lastActive: '2025-05-07T10:42:00', 
    orders: 12,
    address: '45 Culinary Heights, Koramangala, Bengaluru, Karnataka 560034',
    gstin: '29ABCDE1234F1Z5',
    permissions: [
      { name: 'Place Orders', granted: true },
      { name: 'Manage Inventory', granted: true },
      { name: 'Billing & Invoices', granted: true },
      { name: 'System Configuration', granted: false },
    ],
    recentOrders: [
      { id: 'ORD-8902', date: 'Today, 10:42 AM', total: 42500, status: 'Processing' },
      { id: 'ORD-8875', date: 'Oct 24, 2023', total: 18200, status: 'Delivered' },
      { id: 'ORD-8850', date: 'Oct 18, 2023', total: 65000, status: 'Delivered' },
    ],
    documents: [
      { id: 'D1', name: 'Service_Contract_2023.pdf', type: 'PDF', size: '2.4 MB', date: 'Oct 12, 2022', url: '#' },
      { id: 'D2', name: 'FSSAI_License.pdf', type: 'PDF', size: '1.1 MB', date: 'Oct 15, 2022', url: '#' },
    ],
    activity: [
      { id: 'ACT1', text: 'Placed Order #ORD-8902', time: 'Today, 10:42 AM', type: 'order' },
      { id: 'ACT2', text: 'Updated Profile Details', time: 'Yesterday, 4:15 PM', type: 'profile' },
      { id: 'ACT3', text: 'Logged In', time: 'Yesterday, 9:00 AM', type: 'login' },
      { id: 'ACT4', text: 'Placed Order #ORD-8875', time: 'Oct 24, 2023, 11:20 AM', type: 'order' },
    ],
    adminNotes: 'Add internal notes about this user...'
  },
  { id: 'USR-002', name: 'Priya Menon', email: 'priya@spicehaven.com', phone: '+91 91234 56789', role: 'Customer', company: 'Spice Haven Restaurants', status: 'Active', joinedAt: '2023-09-20', lastActive: '2025-05-06T18:15:00', orders: 4 },
  { id: 'USR-003', name: 'Rajan Iyer', email: 'rajan@grandmumbai.in', phone: '+91 98765 00123', role: 'Customer', company: 'Grand Mumbai Hotel', status: 'Active', joinedAt: '2024-01-10', lastActive: '2025-05-07T09:45:00', orders: 9 },
  { id: 'USR-004', name: 'Ananya Krishnan', email: 'ananya@cateringco.in', phone: '+91 87654 32100', role: 'Customer', company: 'Ananya Catering Co', status: 'Inactive', joinedAt: '2024-03-05', lastActive: '2025-04-28T14:20:00', orders: 1 },
  { id: 'USR-005', name: 'Admin User', email: 'admin@kitchenbots.in', phone: '+91 90000 00001', role: 'Admin', status: 'Active', joinedAt: '2023-01-01', lastActive: '2025-05-07T12:00:00', orders: 0 },
  { id: 'USR-006', name: 'Suresh Raina', email: 'suresh@cricketkitchen.com', phone: '+91 99887 76655', role: 'Manager', status: 'Pending', joinedAt: '2025-05-01', lastActive: undefined, orders: 0 },
  { id: 'USR-007', name: 'Meera Das', email: 'meera@urbanfood.in', phone: '+91 98765 43211', role: 'Customer', company: 'Urban Food Solutions', status: 'Active', joinedAt: '2024-11-12', lastActive: '2025-05-05T11:10:00', orders: 3 },
];

// ─────────────────────────────────────────────
// MOCK ACTIVITY
// ─────────────────────────────────────────────
export const mockActivity: ActivityItem[] = [
  { id: 'A1', type: 'order', icon: 'shopping-bag', text: 'Order ORD-2025-002 confirmed and is being prepared for dispatch.', time: '2 hours ago' },
  { id: 'A2', type: 'ticket', icon: 'wrench', text: 'Your service ticket TKT-002 has been picked up by our engineer.', time: '1 day ago' },
  { id: 'A3', type: 'document', icon: 'file', text: 'AMC contract document uploaded successfully.', time: '2 days ago' },
  { id: 'A4', type: 'order', icon: 'shopping-bag', text: 'Order ORD-2025-001 is currently being processed at our warehouse.', time: '5 days ago' },
];

// ─────────────────────────────────────────────
// ADMIN STATS
// ─────────────────────────────────────────────
export const adminStats = {
  totalRevenue: 425000,
  totalOrders: 1248,
  activeUsers: 94,
  openTickets: 7,
  revenueGrowth: 12.5,
  ordersGrowth: 8.2,
  usersGrowth: 8.7,
  ticketsDelta: 3,
};

export const mockRevenueChart = [
  { month: 'Aug', revenue: 220000 },
  { month: 'Sep', revenue: 280000 },
  { month: 'Oct', revenue: 310000 },
  { month: 'Nov', revenue: 390000 },
  { month: 'Dec', revenue: 510000 },
  { month: 'Jan', revenue: 440000 },
  { month: 'Feb', revenue: 490000 },
  { month: 'Mar', revenue: 560000 },
  { month: 'Apr', revenue: 640000 },
];

export const mockCategoryChart = [
  { name: 'Cooking Equipment', value: 42 },
  { name: 'Mixing & Blending', value: 18 },
  { name: 'Ventilation', value: 14 },
  { name: 'Food Display', value: 16 },
  { name: 'Precision Cooking', value: 10 },
];
