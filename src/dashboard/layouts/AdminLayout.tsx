import {
  LayoutDashboard, Package, ShoppingBag, MessageSquare,
  Archive, BarChart2, HeadphonesIcon, Settings,
  Bell, LogOut, Shield, Search, ChevronRight
} from 'lucide-react';
import type { Page } from '../../types';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_MAIN: NavItem[] = [
  { key: 'overview',   label: 'Overview',   icon: <LayoutDashboard size={18} /> },
  { key: 'products',   label: 'Products',   icon: <Package size={18} /> },
  { key: 'orders',     label: 'Orders',     icon: <ShoppingBag size={18} /> },
  { key: 'enquiries',  label: 'Enquiries',  icon: <MessageSquare size={18} /> },
  { key: 'documents',  label: 'Inventory',  icon: <Archive size={18} /> },
  { key: 'services',   label: 'Analytics',  icon: <BarChart2 size={18} /> },
  { key: 'users',      label: 'Support',    icon: <HeadphonesIcon size={18} /> },
];

const NAV_BOTTOM: NavItem[] = [
  { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
];

interface AdminLayoutProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onSiteNavigate: (page: Page) => void;
  children: React.ReactNode;
  pageTitle?: string;
}

export default function AdminLayout({
  currentRoute, onNavigate, onSiteNavigate, children, pageTitle,
}: AdminLayoutProps) {
  const allItems = [...NAV_MAIN, ...NAV_BOTTOM];
  const activeLabel = allItems.find(i => i.key === currentRoute)?.label ?? 'Dashboard';

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: 'var(--dash-bg)', fontFamily: 'var(--font-body)' }}>
      <Sidebar collapsible="icon" className="border-r" style={{ borderColor: 'var(--dash-border)' }}>
        <SidebarHeader className="px-5 pt-6 pb-5" style={{ background: 'var(--dash-surface)' }}>
          <button onClick={() => onSiteNavigate('home')} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-[15px]"
              style={{ background: 'var(--dash-green)' }}>
              KB
            </div>
            <div className="text-left group-data-[collapsible=icon]:hidden">
              <p className="text-[15px] font-bold leading-tight" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
                KitchenBots
              </p>
              <p className="text-[11px]" style={{ color: 'var(--dash-muted)' }}>Premium SaaS</p>
            </div>
          </button>
        </SidebarHeader>

        <SidebarContent style={{ background: 'var(--dash-surface)' }}>
          {/* Admin badge */}
          <div className="mx-4 mb-4 group-data-[collapsible=icon]:hidden">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: '#FFF3DC' }}>
              <Shield size={11} color="#E8940A" />
              <span className="text-[11px] font-bold" style={{ color: '#E8940A' }}>Admin Panel</span>
            </div>
          </div>

          <SidebarGroup>
            <SidebarMenu className="px-1">
              {NAV_MAIN.map(item => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    isActive={currentRoute === item.key}
                    onClick={() => onNavigate(item.key)}
                    className={`admin-nav-item w-full ${currentRoute === item.key ? 'active' : ''}`}
                    tooltip={item.label}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                    {currentRoute === item.key && <ChevronRight size={14} className="ml-auto opacity-70 group-data-[collapsible=icon]:hidden" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="px-3 pb-5 pt-3 border-t" style={{ borderColor: 'var(--dash-border)', background: 'var(--dash-surface)' }}>
          <SidebarMenu>
            {NAV_BOTTOM.map(item => (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton
                  isActive={currentRoute === item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`admin-nav-item w-full ${currentRoute === item.key ? 'active' : ''}`}
                  tooltip={item.label}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => onSiteNavigate('home')}
                className="admin-nav-item w-full hover:!bg-[#FFEAEA] hover:!text-red-600"
                tooltip="Back to Store"
              >
                <LogOut size={18} />
                <span className="group-data-[collapsible=icon]:hidden">Back to Store</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header
          className="flex items-center justify-between px-6 border-b flex-shrink-0"
          style={{ height: 'var(--dash-navbar-height)', background: 'var(--dash-surface)', borderColor: 'var(--dash-border)' }}
        >
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <div className="hidden lg:block">
              <SidebarTrigger />
            </div>
            {/* On desktop, page title is in the main content welcome banner — hide it */}
            <div className="hidden lg:block">
              <p className="text-[13px]" style={{ color: 'var(--dash-muted)' }}>KitchenBots Admin Panel</p>
            </div>
            {/* Mobile: show page title */}
            <div className="lg:hidden">
              <h1 className="text-[17px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
                {pageTitle ?? activeLabel}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Search size={18} style={{ color: 'var(--dash-body)' }} />
            </button>
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Bell size={18} style={{ color: 'var(--dash-body)' }} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E8940A] border-2 border-white" />
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
              style={{ background: 'var(--dash-green)' }}>
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}
