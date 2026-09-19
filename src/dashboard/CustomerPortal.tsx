import { useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import type { NavGroup, DashboardUser } from './layouts/DashboardLayout';
import CustomerOverview from './pages/customer/CustomerOverview';
import CustomerOrders from './pages/customer/CustomerOrders';
import CustomerEnquiries from './pages/customer/CustomerEnquiries';
import CustomerDocuments from './pages/customer/CustomerDocuments';
import CustomerAddresses from './pages/customer/CustomerAddresses';
import CustomerProfile from './pages/customer/CustomerProfile';
import type { Page } from '../types';
import { SidebarProvider } from '@/components/ui/sidebar';
import { 
  LayoutDashboard, ShoppingBag, MessageSquare, 
  FileText, Wrench, Cpu, MapPin, User 
} from 'lucide-react';

type CustomerRoute = 'overview' | 'orders' | 'enquiries' | 'documents' | 'service' | 'equipment' | 'addresses' | 'profile';

interface CustomerPortalProps {
  onSiteNavigate: (page: Page) => void;
  initialRoute?: CustomerRoute;
}

const CUSTOMER_NAV: NavGroup[] = [
  {
    label: 'My Dashboard',
    items: [
      { key: 'overview',   label: 'Overview',            icon: <LayoutDashboard size={18} /> },
      { key: 'orders',     label: 'My Orders',           icon: <ShoppingBag size={18} /> },
      { key: 'enquiries',  label: 'Enquiries',           icon: <MessageSquare size={18} /> },
      { key: 'documents',  label: 'Documents',           icon: <FileText size={18} /> },
      { key: 'service',    label: 'Service & Warranty',  icon: <Wrench size={18} /> },
      { key: 'equipment',  label: 'Equipment Planning',  icon: <Cpu size={18} /> },
    ]
  },
  {
    label: 'Account',
    items: [
      { key: 'addresses',  label: 'Addresses',           icon: <MapPin size={18} /> },
      { key: 'profile',    label: 'Profile & Settings',  icon: <User size={18} /> },
    ]
  }
];

const CUSTOMER_USER: DashboardUser = { 
  name: 'Vijay Sharma', 
  role: 'Platinum Member', 
  company: 'Sharma Caterers Pvt Ltd' 
};

const PAGES: Record<CustomerRoute, React.ReactNode> = {
  overview:  <CustomerOverview />,
  orders:    <CustomerOrders />,
  enquiries: <CustomerEnquiries />,
  documents: <CustomerDocuments />,
  service:   <CustomerEnquiries />,   // reuses enquiries with AMC/warranty filter
  equipment: <CustomerOverview />,    // placeholder — extend later
  addresses: <CustomerAddresses />,
  profile:   <CustomerProfile />,
};

export default function CustomerPortal({ onSiteNavigate, initialRoute = 'overview' }: CustomerPortalProps) {
  const [route, setRoute] = useState<CustomerRoute>(initialRoute);

  return (
    <SidebarProvider>
      <DashboardLayout
        userRole="customer"
        userData={CUSTOMER_USER}
        navGroups={CUSTOMER_NAV}
        currentRoute={route}
        onNavigate={(r) => setRoute(r as CustomerRoute)}
        onSiteNavigate={onSiteNavigate}
      >
        {PAGES[route]}
      </DashboardLayout>
    </SidebarProvider>
  );
}

