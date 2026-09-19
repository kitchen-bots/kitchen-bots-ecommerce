import { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingBag, MessageSquare, 
  Archive, HeadphonesIcon, Settings, Users
} from 'lucide-react';
import DashboardLayout from './layouts/DashboardLayout';
import type { NavGroup, NavItem, DashboardUser } from './layouts/DashboardLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminServices from './pages/admin/AdminServices';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUserDetails from './pages/admin/AdminUserDetails';
import type { Page } from '../types';
import type { User } from './data/mockData';
import { SidebarProvider } from '@/components/ui/sidebar';
import { NotificationProvider } from './context/NotificationContext';

type AdminRoute = 'overview' | 'users' | 'products' | 'orders' | 'documents' | 'enquiries' | 'services' | 'settings' | 'user-details';

interface AdminPortalProps {
  onSiteNavigate: (page: Page) => void;
  initialRoute?: AdminRoute;
}

const ADMIN_NAV: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { key: 'overview',   label: 'Overview',   icon: <LayoutDashboard size={18} /> },
      { key: 'orders',     label: 'Orders',     icon: <ShoppingBag size={18} /> },
      { key: 'products',   label: 'Inventory',  icon: <Package size={18} /> },
      { key: 'users',      label: 'Users',      icon: <Users size={18} /> },
    ]
  },
  {
    label: 'Support',
    items: [
      { key: 'services',   label: 'Service Tickets', icon: <HeadphonesIcon size={18} /> },
      { key: 'enquiries',  label: 'Enquiries',       icon: <MessageSquare size={18} /> },
    ]
  },
  {
    label: 'Assets',
    items: [
      { key: 'documents',  label: 'Documents',  icon: <Archive size={18} /> },
    ]
  }
];

const ADMIN_BOTTOM_NAV: NavItem[] = [
  { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

const ADMIN_USER: DashboardUser = {
  name: 'Admin User',
  role: 'System Administrator',
  initials: 'AD'
};

export default function AdminPortal({ onSiteNavigate, initialRoute = 'overview' }: AdminPortalProps) {
  const [route, setRoute] = useState<AdminRoute>(initialRoute);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  const handleNavigate = (r: AdminRoute) => {
    setRoute(r);
    if (r !== 'user-details') {
      setViewingUser(null);
    }
  };

  const handleViewUser = (user: User) => {
    setViewingUser(user);
    setRoute('user-details');
  };

  const renderContent = () => {
    if (route === 'user-details' && viewingUser) {
      return <AdminUserDetails user={viewingUser} onBack={() => setRoute('users')} />;
    }

    switch (route) {
      case 'overview':  return <AdminOverview />;
      case 'users':     return <AdminUsers onViewUser={handleViewUser} />;
      case 'products':  return <AdminProducts />;
      case 'orders':    return <AdminOrders />;
      case 'enquiries': return <AdminServices mode="enquiries" />;
      case 'documents': return <AdminDocuments />;
      case 'services':  return <AdminServices mode="tickets" />;
      case 'settings':  return <AdminSettings />;
      default:          return <AdminOverview />;
    }
  };

  return (
    <NotificationProvider>
      <SidebarProvider>
        <DashboardLayout
          userRole="admin"
          userData={ADMIN_USER}
          navGroups={ADMIN_NAV}
          bottomNavItems={ADMIN_BOTTOM_NAV}
          currentRoute={route === 'user-details' ? 'users' : route}
          onNavigate={(r) => handleNavigate(r as AdminRoute)}
          onSiteNavigate={onSiteNavigate}
        >
          {renderContent()}
        </DashboardLayout>
      </SidebarProvider>
    </NotificationProvider>
  );
}
