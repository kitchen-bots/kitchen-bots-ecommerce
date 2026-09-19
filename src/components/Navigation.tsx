import { useState } from 'react';
import { Menu, X, User, MapPin, Phone, Mail, Twitter, Linkedin, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '../hooks/use-cart';
import type { Page } from '../App';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onCartClick: () => void;
}

export default function Navigation({ currentPage, onNavigate, onCartClick }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = [
    { label: 'Home', page: 'home' as Page },
    { label: 'Products', page: 'products' as Page },
    { label: 'Our Capabilities', page: 'capabilities' as Page },
    { label: 'About', page: 'about' as Page },
    { label: 'Contact', page: 'contact' as Page },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'unset';
  };

  return (
    <>
      {/* TOP INFO BAR */}
      <div className="hidden lg:flex h-10 bg-white border-b border-[#F1F5F9] px-[80px] items-center justify-between z-[1001]">
        <div className="flex items-center gap-6 text-[13px] text-[#64748B] font-medium font-['DM_Sans']">
          <div className="flex items-center gap-1.5 hover:text-[#111827] cursor-pointer transition-colors">
            <MapPin size={14} className="text-kb-primary" />
            <span>Hyderabad, India</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-[#111827] cursor-pointer transition-colors">
            <Mail size={14} className="text-kb-primary" />
            <span>info@kitchenbots.in</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-[#111827] cursor-pointer transition-colors">
            <Phone size={14} className="text-kb-primary" />
            <span>+91 94907 01421</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Twitter size={14} className="text-[#94A3B8] hover:text-[#1DA1F2] cursor-pointer transition-colors" />
            <Linkedin size={14} className="text-[#94A3B8] hover:text-[#0077B5] cursor-pointer transition-colors" />
          </div>
          <div className="h-4 w-[1px] bg-[#E2E8F0]" />
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-1.5 text-[13px] text-[#64748B] hover:text-[#111827] font-bold font-['Outfit']"
          >
            <User size={14} />
            My Account
          </Button>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header 
        className="sticky top-0 z-[1000] bg-white border-b border-[#F1F5F9] shadow-sm shadow-black/[0.02]" 
        style={{ height: '80px' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[80px] h-full flex items-center justify-between">
          
          {/* LOGO - LEFT */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src="/images/kitchen-bots-white.png" 
              alt="KitchenBots" 
              className="h-[48px] w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </div>

          {/* DESKTOP NAV - CENTER */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <Button
                  key={link.label}
                  variant="ghost"
                  onClick={() => handleNavClick(link.page)}
                  className={cn(
                    "flex items-center gap-1.5 text-[15px] font-bold transition-all font-['Outfit'] relative py-2 h-auto px-0 hover:bg-transparent",
                    isActive 
                      ? "text-kb-tertiary after:content-[''] after:absolute after:bottom-[4px] after:left-0 after:w-full after:h-[2px] after:bg-kb-tertiary after:rounded-[2px]" 
                      : "text-[#475569] hover:text-kb-tertiary"
                  )}
                >
                  {link.label}
                </Button>
              );
            })}
          </nav>

          {/* ACTIONS - RIGHT */}
          <div className="flex items-center gap-5 lg:gap-8">
            <div className="hidden sm:flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-[#475569] hover:bg-[#F1F5F9] rounded-full"
              >
                <Search size={20} />
              </Button>
              <div className="relative cursor-pointer group" onClick={onCartClick}>
                <div className="p-2 text-[#475569] group-hover:bg-[#F1F5F9] rounded-full transition-all">
                  <ShoppingBag size={20} />
                </div>
                {totalItems > 0 && (
                  <div className="absolute top-0 right-0 w-4 h-4 bg-[#EF4444] rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold animate-in fade-in zoom-in duration-300">
                    {totalItems}
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={() => handleNavClick('bulk-enquiry')}
              variant="accent"
              size="sm"
              className="hidden md:flex"
            >
              Get Bulk Quote
            </Button>

            {/* MOBILE TOGGLE */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden text-[#111827] hover:bg-[#F1F5F9] rounded-lg relative z-[1001]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div 
          className={cn(
            "fixed inset-0 z-[2000] lg:hidden transition-all duration-300",
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div 
            className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          
          <div 
            className={cn(
              "absolute top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white flex flex-col transition-transform duration-300 ease-out",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2" onClick={() => handleNavClick('home')}>
                <img 
                  src="/images/kitchen-bots-white.png" 
                  alt="KitchenBots" 
                  className="h-[36px] w-auto object-contain" 
                />
              </div>
              <Button 
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu} 
                className="text-[#64748B] hover:bg-[#F1F5F9] rounded-full"
              >
                <X size={24} />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto py-6">
              <nav className="px-4 space-y-1">
                {navLinks.map((link) => (
                  <Button
                    key={link.label}
                    variant="ghost"
                    onClick={() => handleNavClick(link.page)}
                    className={cn(
                      "w-full px-4 py-3 justify-start text-[16px] font-bold rounded-xl transition-all font-['Outfit'] h-auto",
                      currentPage === link.page ? "text-kb-tertiary bg-[#FFF7EC] hover:bg-[#FFF7EC]" : "text-[#475569] hover:bg-[#F8FAFC]"
                    )}
                  >
                    {link.label}
                  </Button>
                ))}
              </nav>
            </div>

            <div className="p-6 border-t border-[#F1F5F9] space-y-4">
              <Button
                onClick={() => handleNavClick('dashboard')}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-[52px]"
              >
                <User size={18} />
                My Account
              </Button>
              <Button
                onClick={() => handleNavClick('bulk-enquiry')}
                variant="accent"
                className="w-full h-[52px]"
              >
                Get Bulk Quote
              </Button>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
