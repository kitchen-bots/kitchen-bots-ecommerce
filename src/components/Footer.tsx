import { Phone, Mail, Globe, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import type { Page } from '../App';
import { Button } from './ui/button';

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', page: 'about' as Page },
      { label: 'Our Capabilities', page: 'capabilities' as Page },
      { label: 'Blog', page: 'blog' as Page },
      { label: 'Careers', page: 'home' as Page },
    ],
    products: [
      { label: 'Deep Fryers', page: 'products' as Page },
      { label: 'Food Preparation', page: 'products' as Page },
      { label: 'Grilling Solutions', page: 'products' as Page },
      { label: 'Custom Solutions', page: 'products' as Page },
    ],
    support: [
      { label: 'Contact Us', page: 'contact' as Page },
      { label: 'Privacy Policy', page: 'policies' as Page },
      { label: 'Terms of Service', page: 'policies' as Page },
      { label: 'Bulk Enquiry', page: 'bulk-enquiry' as Page },
    ]
  };

  return (
    <footer className="bg-[#1E2329] text-white pt-16 pb-48 md:pb-8 font-['DM_Sans']">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <div 
              className="mb-6 cursor-pointer group" 
              onClick={() => onNavigate?.('home')}
            >
              <img 
                src="/images/kitchen-bots-white.png" 
                alt="KitchenBots" 
                className="h-[48px] w-auto object-contain transition-transform group-hover:scale-105" 
              />
            </div>
            <p className="text-gray-400 text-[14px] leading-relaxed mb-8 max-w-sm">
              Innovating the future of commercial kitchens through advanced automation, intelligent engineering, and smart technology solutions.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/kitchenbots" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-kb-tertiary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://linkedin.com/company/kitchenbots" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-kb-tertiary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://facebook.com/kitchenbots" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-kb-tertiary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com/kitchenbots" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-kb-tertiary transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-bold text-white mb-6 font-['Outfit'] uppercase tracking-wider">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate?.(link.page)} 
                    className="h-auto p-0 text-[14px] text-gray-400 hover:text-kb-tertiary hover:bg-transparent transition-colors font-medium"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-bold text-white mb-6 font-['Outfit'] uppercase tracking-wider">Products</h4>
            <ul className="space-y-4">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate?.(link.page)} 
                    className="h-auto p-0 text-[14px] text-gray-400 hover:text-kb-tertiary hover:bg-transparent transition-colors font-medium"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-bold text-white mb-6 font-['Outfit'] uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-kb-primary" />
                </div>
                <div>
                  <div className="text-[12px] text-gray-500 uppercase font-bold mb-0.5">Call Us</div>
                  <div className="text-[15px] font-bold text-white">+91 94907 01421</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-kb-primary" />
                </div>
                <div>
                  <div className="text-[12px] text-gray-500 uppercase font-bold mb-0.5">Email Us</div>
                  <div className="text-[15px] font-bold text-white break-all">info@kitchenbots.in</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <Globe size={18} className="text-kb-primary" />
                </div>
                <div>
                  <div className="text-[12px] text-gray-500 uppercase font-bold mb-0.5">Website</div>
                  <div className="text-[15px] font-bold text-white">www.kitchenbots.in</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[15px] font-bold text-white mb-6 font-['Outfit'] uppercase tracking-wider">Stay Updated</h4>
            <p className="text-gray-400 text-[14px] mb-4">
              Subscribe to our newsletter for the latest industry insights and product updates.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-kb-primary transition-colors w-full"
                required
              />
              <Button type="submit" className="w-full bg-kb-primary hover:bg-kb-primary-dark text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <p className="text-[13px] text-gray-500 text-center md:text-left">
            © {currentYear} KitchenBots India Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <Button 
              variant="link" 
              onClick={() => onNavigate?.('policies')} 
              className="p-0 h-auto text-[13px] text-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Button>
            <Button 
              variant="link" 
              onClick={() => onNavigate?.('policies')} 
              className="p-0 h-auto text-[13px] text-gray-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Button>
            <Button 
              variant="link" 
              onClick={() => onNavigate?.('home')} 
              className="p-0 h-auto text-[13px] text-gray-500 hover:text-white transition-colors"
            >
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>

  );
}
