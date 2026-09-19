import {
  Bell, Search, LogOut, ChevronRight, Shield
} from 'lucide-react';
import { getInitials } from '../utils/formatters';
import { useState } from 'react';
import { CommandSearch } from '../components/CommandSearch';
import { Kbd } from '@/components/ui/kbd';
import type { Page } from '../../types';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';

export interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export interface DashboardUser {
  name: string;
  role: string;
  company?: string;
  initials?: string;
}

interface DashboardLayoutProps {
  userRole: 'admin' | 'customer';
  userData: DashboardUser;
  navGroups: NavGroup[];
  currentRoute: string;
  onNavigate: (route: string) => void;
  onSiteNavigate: (page: Page) => void;
  children: React.ReactNode;
  pageTitle?: string;
  bottomNavItems?: NavItem[];
}

export default function DashboardLayout({
  userRole,
  userData,
  navGroups,
  currentRoute,
  onNavigate,
  onSiteNavigate,
  children,
  pageTitle,
  bottomNavItems
}: DashboardLayoutProps) {
  const isCustomer = userRole === 'customer';
  const isAdmin = userRole === 'admin';
  const [openSearch, setOpenSearch] = useState(false);

  // Find active label for page title fallback
  const allItems = [...navGroups.flatMap(g => g.items), ...(bottomNavItems || [])];
  const activeItem = allItems.find(i => i.key === currentRoute);

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: 'var(--dash-bg)', fontFamily: 'var(--font-body)' }}>
      <Sidebar collapsible="icon" className="border-r" style={{ borderColor: 'var(--dash-border)' }}>
        <SidebarHeader className={`px-5 pt-6 pb-5 ${isAdmin ? '' : 'border-b'}`} style={{ borderColor: 'var(--dash-border)', background: 'var(--dash-surface)' }}>
          {isCustomer ? (
            <button onClick={() => onSiteNavigate('home')} className="flex items-center gap-2 group">
              <img src="/images/Kitchen-Bots-3.png" alt="KitchenBots" className="h-8 w-auto object-contain" />
            </button>
          ) : (
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
          )}
        </SidebarHeader>

        <SidebarContent style={{ background: 'var(--dash-surface)' }}>
          {/* Admin badge or Customer User Card */}
          {isAdmin ? (
            <div className="mx-4 mb-4 group-data-[collapsible=icon]:hidden">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: '#FFF3DC' }}>
                <Shield size={11} color="#E8940A" />
                <span className="text-[11px] font-bold" style={{ color: '#E8940A' }}>Admin Panel</span>
              </div>
            </div>
          ) : (
            <div className="mx-4 mt-5 mb-4 p-4 rounded-[20px]" style={{ background: 'var(--dash-bg)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                  style={{ background: 'var(--dash-green)' }}>
                  {userData.initials || getInitials(userData.name)}
                </div>
                <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                  <p className="text-[14px] font-bold truncate" style={{ color: 'var(--dash-heading)' }}>{userData.name}</p>
                  <p className="text-[11px] truncate" style={{ color: 'var(--dash-muted)' }}>{userData.role}</p>
                </div>
              </div>
            </div>
          )}

          {navGroups.map((group, idx) => (
            <SidebarGroup key={group.label || idx}>
              {group.label && (
                <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider px-3 mb-2" style={{ color: 'var(--dash-muted)' }}>
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarMenu className="px-1">
                {group.items.map(item => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      isActive={currentRoute === item.key}
                      onClick={() => onNavigate(item.key)}
                      className={`${userRole}-nav-item w-full ${currentRoute === item.key ? 'active' : ''}`}
                      tooltip={item.label}
                    >
                      <span className={`${isCustomer ? 'dash-nav-icon' : ''} flex-shrink-0`}>{item.icon}</span>
                      <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                      {currentRoute === item.key && (
                        <ChevronRight size={14} className={`ml-auto group-data-[collapsible=icon]:hidden ${isAdmin ? 'opacity-70' : ''}`} 
                          style={isCustomer ? { color: 'var(--dash-green)' } : undefined} />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="px-3 pb-5 pt-3 border-t" style={{ borderColor: 'var(--dash-border)', background: 'var(--dash-surface)' }}>
          <SidebarMenu>
            {bottomNavItems?.map(item => (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton
                  isActive={currentRoute === item.key}
                  onClick={() => onNavigate(item.key)}
                  className={`${userRole}-nav-item w-full ${currentRoute === item.key ? 'active' : ''}`}
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
                className={`${userRole}-nav-item w-full hover:!bg-[#FFEAEA] hover:!text-red-600`}
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

      <SidebarInset className="flex flex-col min-w-0 overflow-hidden">
        {/* ── TOP NAVBAR ── */}
        <header
          className="flex items-center justify-between px-6 border-b flex-shrink-0"
          style={{
            height: 'var(--dash-navbar-height)',
            background: 'var(--dash-surface)',
            borderColor: 'var(--dash-border)',
          }}
        >
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <div className="hidden lg:block">
              <SidebarTrigger />
            </div>
            
            {/* Contextual Header Info */}
            {isCustomer ? (
              <div>
                <h1 className="text-[18px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
                  {pageTitle ?? activeItem?.label ?? 'Dashboard'}
                </h1>
                <p className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>KitchenBots Customer Portal</p>
              </div>
            ) : (
              <>
                <div className="hidden lg:block">
                  <p className="text-[13px]" style={{ color: 'var(--dash-muted)' }}>KitchenBots Admin Panel</p>
                </div>
                <div className="lg:hidden">
                  <h1 className="text-[17px] font-bold" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
                    {pageTitle ?? activeItem?.label ?? 'Dashboard'}
                  </h1>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <button 
              onClick={() => setOpenSearch(true)}
              className="flex items-center gap-2 h-9 px-3 rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all group"
            >
              <Search size={16} style={{ color: 'var(--dash-muted)' }} />
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-[13px]" style={{ color: 'var(--dash-muted)' }}>Search...</span>
                <Kbd className="bg-gray-100/50 border-gray-200">
                  <span className="text-[10px]">⌘</span>K
                </Kbd>
              </div>
            </button>
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Bell size={18} style={{ color: 'var(--dash-body)' }} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E8940A] border-2 border-white" />
            </button>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-bold cursor-pointer"
              style={{ background: 'var(--dash-green)' }}
            >
              {userData.initials || getInitials(userData.name)}
            </div>
          </div>
        </header>

        {/* ── SCROLLABLE PAGE CONTENT ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </SidebarInset>

      <CommandSearch 
        open={openSearch} 
        setOpen={setOpenSearch} 
        onNavigate={onNavigate} 
      />
    </div>
  );
}

