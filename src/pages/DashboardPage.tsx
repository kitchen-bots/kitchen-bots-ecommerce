import { useState } from 'react';
import { Package, LayoutDashboard, ShoppingBag, MapPin, User, LogOut, Search, Bell, Twitter, Linkedin, Mail, Phone, Download, ExternalLink, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import type { Page } from '../App';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
}

type Tab = 'overview' | 'orders' | 'addresses' | 'profile';

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const orders = [
    { id: 'KB-98765', date: 'April 29, 2026', status: 'Processing', total: 520000, items: 3 },
    { id: 'KB-98702', date: 'March 15, 2026', status: 'Delivered', total: 45000, items: 1 },
    { id: 'KB-98654', date: 'Feb 10, 2026', status: 'Delivered', total: 125000, items: 2 }
  ];

  const addresses = [
    {
      id: 1,
      name: 'Vijay Sharma',
      address: '41/8f 2nd Cross Street, Hyderabad, Telangana 500115',
      type: 'Home',
      isDefault: true
    },
    {
      id: 2,
      name: 'Vijay Sharma (Office)',
      address: 'Plot 42, Hitech City, Hyderabad, Telangana 500081',
      type: 'Office',
      isDefault: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FBFC] font-['DM_Sans']">
      {/* TOP INFO BAR */}
      <div className="h-10 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between">
        <div className="flex items-center gap-5 text-[13px] text-[#6B7280]">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span>Hyderabad, india</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail size={14} />
            <span>info@kitchenbots.in</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={14} />
            <span>+91-9876543210</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold text-[#111827]">Vijay Sharma</span>
          <div className="flex items-center gap-3">
            <Twitter size={14} className="text-[#6B7280]" />
            <Linkedin size={14} className="text-[#6B7280]" />
            <div className="w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center text-[10px] text-white font-bold">3</div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="h-20 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
          <img 
            src="/images/Kitchen-Bots-3.png" 
            alt="KitchenBots" 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
          />
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6 text-[14px] font-medium text-[#374151]">
            <span className="cursor-pointer hover:text-kb-tertiary" onClick={() => onNavigate('products')}>Products ▾</span>
            <span className="cursor-pointer hover:text-kb-tertiary" onClick={() => onNavigate('capabilities')}>Capabilities</span>
            <span className="cursor-pointer hover:text-kb-tertiary" onClick={() => onNavigate('about')}>About</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center cursor-pointer">
              <Search size={18} className="text-[#374151]" />
            </div>
            <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center cursor-pointer relative">
              <Bell size={18} className="text-[#374151]" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white"></div>
            </div>
            <div className="w-10 h-10 bg-kb-primary rounded-full flex items-center justify-center text-white font-bold text-[14px] cursor-pointer" onClick={() => onNavigate('dashboard')}>
              VS
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#F3F4F6]">
                <div className="w-14 h-14 bg-kb-primary rounded-full flex items-center justify-center text-white font-bold text-[20px]">
                  VS
                </div>
                <div>
                  <div className="text-[18px] font-bold text-[#111827]">Vijay Sharma</div>
                  <div className="text-[13px] text-[#6B7280]">Platinum Member</div>
                </div>
              </div>

              <div className="space-y-1">
                <Button 
                  variant={activeTab === 'overview' ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3`}
                  onClick={() => setActiveTab('overview')}
                >
                  <LayoutDashboard size={18} />
                  <span>Overview</span>
                </Button>
                <Button 
                  variant={activeTab === 'orders' ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3`}
                  onClick={() => setActiveTab('orders')}
                >
                  <ShoppingBag size={18} />
                  <span>My Orders</span>
                </Button>
                <Button 
                  variant={activeTab === 'addresses' ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <MapPin size={18} />
                  <span>Addresses</span>
                </Button>
                <Button 
                  variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={18} />
                  <span>Profile Settings</span>
                </Button>
                <div className="pt-4 mt-4 border-t border-[#F3F4F6]">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 text-[#EF4444] hover:bg-[#FEF2F2] hover:text-[#EF4444]"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-9 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* STAT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center text-kb-primary mb-4">
                      <ShoppingBag size={24} />
                    </div>
                    <div className="text-[28px] font-bold text-[#111827]">12</div>
                    <div className="text-[13px] text-[#6B7280] font-medium">Total Orders</div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-[#FFFBEB] rounded-xl flex items-center justify-center text-kb-tertiary mb-4">
                      <Clock size={24} />
                    </div>
                    <div className="text-[28px] font-bold text-[#111827]">03</div>
                    <div className="text-[13px] text-[#6B7280] font-medium">Active Enquiries</div>
                  </div>
                  <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-[#2563EB] mb-4">
                      <Package size={24} />
                    </div>
                    <div className="text-[28px] font-bold text-[#111827]">01</div>
                    <div className="text-[13px] text-[#6B7280] font-medium">In Transit</div>
                  </div>
                </div>

                {/* RECENT ORDERS */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
                    <h2 className="text-[16px] font-bold text-[#111827]">Recent Orders</h2>
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => setActiveTab('orders')}
                      className="text-kb-primary p-0 h-auto"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#F9FBFC] border-b border-[#E5E7EB]">
                        <tr>
                          <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase">Order ID</th>
                          <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase">Date</th>
                          <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase">Status</th>
                          <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase">Total</th>
                          <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB]">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-[#F9FBFC] transition-colors">
                            <td className="px-6 py-4 text-[14px] font-bold text-[#111827]">{order.id}</td>
                            <td className="px-6 py-4 text-[14px] text-[#6B7280]">{order.date}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${
                                order.status === 'Processing' ? 'bg-[#FFFBEB] text-kb-tertiary' : 'bg-[#F0FDF4] text-kb-primary'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-[14px] font-bold text-[#111827]">₹ {order.total.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-kb-primary hover:text-[#145e2e] h-auto p-0"
                              >
                                <Download size={14} />
                                Invoice
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[20px] font-bold text-[#111827]">Saved Addresses</h2>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="gap-2"
                  >
                    <MapPin size={16} />
                    Add New Address
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div key={addr.id} className={`bg-white border rounded-2xl p-6 relative shadow-sm ${addr.isDefault ? 'border-kb-primary' : 'border-[#E5E7EB]'}`}>
                      {addr.isDefault && (
                        <div className="absolute top-4 right-4 bg-[#F0FDF4] text-kb-primary text-[10px] font-bold px-2 py-1 rounded uppercase">Default</div>
                      )}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[#374151]">
                          <MapPin size={16} />
                        </div>
                        <span className="text-[14px] font-bold text-[#111827]">{addr.type}</span>
                      </div>
                      <div className="text-[15px] font-bold text-[#111827] mb-1">{addr.name}</div>
                      <div className="text-[14px] text-[#6B7280] leading-relaxed mb-6">{addr.address}</div>
                      <div className="flex items-center gap-4">
                        <Button variant="link" size="sm" className="text-kb-primary p-0 h-auto">Edit</Button>
                        <Button variant="link" size="sm" className="text-[#EF4444] p-0 h-auto">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
               <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-6 py-4 border-b border-[#E5E7EB]">
                    <h2 className="text-[16px] font-bold text-[#111827]">Full Order History</h2>
                  </div>
                  <div className="p-0">
                     <table className="w-full text-left">
                        <thead className="bg-[#F9FBFC] border-b border-[#E5E7EB]">
                          <tr>
                            <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase">Order ID</th>
                            <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase">Date</th>
                            <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase">Status</th>
                            <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase">Total</th>
                            <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB]">
                          {[...orders, ...orders].map((order, idx) => (
                            <tr key={`${order.id}-${idx}`} className="hover:bg-[#F9FBFC] transition-colors">
                              <td className="px-6 py-4 text-[14px] font-bold text-[#111827]">{order.id}</td>
                              <td className="px-6 py-4 text-[14px] text-[#6B7280]">{order.date}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${
                                  order.status === 'Processing' ? 'bg-[#FFFBEB] text-kb-tertiary' : 'bg-[#F0FDF4] text-kb-primary'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-[14px] font-bold text-[#111827]">₹ {order.total.toLocaleString()}</td>
                              <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                                <Button variant="ghost" size="sm" className="text-[#6B7280] hover:text-[#111827] gap-1">
                                  <ExternalLink size={14} />
                                  Track
                                </Button>
                                <Button variant="ghost" size="sm" className="text-kb-primary hover:text-[#145e2e] gap-1">
                                  <Download size={14} />
                                  Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
