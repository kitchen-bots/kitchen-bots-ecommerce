import { useState } from 'react';
import { 
  ShoppingCart,
  ChevronRight,
  Search,
  Phone,
  Mail,
  Zap,
  ShieldCheck,
  Cpu,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../hooks/use-cart';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import type { Page } from '../App';

interface ProductsPageProps {
  onProductClick: (id: string) => void;
  onCartOpen?: () => void;
  onNavigate?: (page: Page, productId?: string) => void;
}

const PRODUCTS_DATA = [
  { 
    id: 'fryer-1', 
    name: 'Electric Deep Fryer', 
    category: 'fryers',
    price: 25000, 
    image: '/images/redesign/fryer.png', 
    tag: 'Best Seller',
    specs: ['Smart Temperature Control', 'High-Efficiency Heating']
  },
  { 
    id: 'mixer-1', 
    name: 'Industrial Food Mixer', 
    category: 'food-prep',
    price: 95000, 
    image: '/images/redesign/mixer.png', 
    tag: 'Premium Build',
    specs: ['Variable Speed Control', 'Stainless Steel Chassis']
  },
  { 
    id: 'robogrill-1', 
    name: 'Robotic Grill Station', 
    category: 'grilling',
    price: 125000, 
    image: '/images/redesign/robogrill.png', 
    tag: 'Next-Gen',
    specs: ['AI Searing Tech', 'Automated Flipping']
  },
  { 
    id: 'fryer-2', 
    name: 'Compact Deep Fryer', 
    category: 'fryers',
    price: 18000, 
    image: '/images/redesign/fryer.png', 
    tag: 'Space Saver',
    specs: ['Quick Recovery Time', 'Easy-Drain System']
  },
  { 
    id: 'mixer-2', 
    name: 'Heavy Duty Mixer', 
    category: 'food-prep',
    price: 145000, 
    image: '/images/redesign/mixer.png', 
    tag: 'Large Volume',
    specs: ['80-Quart Capacity', 'Planetary Gear System']
  },
  { 
    id: 'bbq-1', 
    name: 'Commercial BBQ Grill', 
    category: 'grilling',
    price: 80000, 
    image: '/images/redesign/bbq.png', 
    tag: 'Outdoor Pro',
    specs: ['Even Heat Distribution', 'Dual-Fuel Ready']
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Equipment', icon: Zap },
  { id: 'fryers', label: 'Deep Fryers', icon: Flame },
  { id: 'food-prep', label: 'Food Preparation', icon: Cpu },
  { id: 'grilling', label: 'Grilling Solutions', icon: ShieldCheck },
];

export default function ProductsPage({ onProductClick, onCartOpen, onNavigate }: ProductsPageProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS_DATA.filter(p => 
    (activeCategory === 'all' || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(price);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      {/* --- HERO BANNER --- */}
      <section className="bg-white border-b border-[#F1F5F9] pt-6 pb-12 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-[80px]">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-[12px] font-bold text-[#94A3B8] uppercase tracking-widest mb-6 font-['Outfit']">
              <span className="hover:text-[#111827] cursor-pointer" onClick={() => onNavigate?.('home')}>Home</span>
              <ChevronRight size={12} />
              <span className="text-kb-primary">Catalog</span>
            </nav>
            <h1 className="text-[40px] md:text-[56px] font-bold text-[#111827] leading-tight mb-6 font-['Outfit']">
              Industrial <span className="text-kb-tertiary">Fleet</span>
            </h1>
            <p className="text-[18px] text-[#64748B] leading-relaxed font-['DM_Sans']">
              Professional-grade kitchen equipment engineered for scale, durability, and intelligent automation.
            </p>
          </div>
        </div>
      </section>

      {/* --- FILTER & SEARCH BAR --- */}
      <section className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-xl border-b border-[#F1F5F9] py-4 shadow-sm transition-all">
        <div className="container mx-auto px-6 lg:px-[80px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full uppercase tracking-widest",
                  activeCategory === cat.id 
                    ? 'shadow-xl shadow-black/10' 
                    : 'text-[#64748B] border-[#E2E8F0] hover:text-[#111827]'
                )}
              >
                <cat.icon size={14} />
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <input 
              type="text" 
              placeholder="Search equipment..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] pl-12 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-[14px] focus:outline-none focus:border-kb-tertiary focus:bg-white transition-all font-['DM_Sans']"
            />
          </div>
        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section className="section-padding">
        <div className="container mx-auto px-6 lg:px-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-[40px] border border-[#F1F5F9] overflow-hidden flex flex-col h-full shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer"
                onClick={() => onProductClick(product.id)}
              >
                {/* Image Area */}
                <div className="relative aspect-square bg-[#F8FAFC] p-12 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Tag */}
                  <div className="absolute top-[12px] left-[12px] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] text-[#111827] shadow-sm font-['Outfit'] border border-[#F1F5F9]">
                    {product.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-8">
                    <h3 className="text-[22px] font-bold text-[#111827] mb-2 leading-tight font-['Outfit'] group-hover:text-kb-tertiary transition-colors">
                      {product.name}
                    </h3>
                    <div className="inline-flex items-baseline gap-[6px] mb-6">
                      <span className="text-[24px] font-bold text-[#111827] font-['Outfit']">{formatPrice(product.price)}</span>
                      <span className="text-[12px] text-[#94A3B8] font-bold uppercase font-['DM_Sans']">Excl. GST</span>
                    </div>
                    
                    {/* Specs */}
                    <div className="space-y-2">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-[13px] text-[#64748B] font-['DM_Sans'] mb-[6px] last:mb-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0] shrink-0" />
                          <span className="leading-tight">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-[#F1F5F9] flex items-center justify-between gap-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        });
                        showToast(`${product.name} added to cart`, 'View Cart', () => onCartOpen && onCartOpen());
                      }}
                      size="lg"
                      className="flex-grow h-[52px] gap-2 uppercase"
                    >
                      <ShoppingCart size={18} />
                      Purchase
                    </Button>
                    <Button 
                      variant="outline"
                      size="icon-lg"
                      className="size-[52px]"
                    >
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-20 h-20 bg-[#F8FAFC] rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#E2E8F0]">
                <Search size={40} />
              </div>
              <h2 className="text-[24px] font-bold text-[#111827] mb-2 font-['Outfit']">No equipment found</h2>
              <p className="text-[#64748B] font-['DM_Sans']">Try adjusting your search or category filters.</p>
              <Button 
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                size="lg"
                className="mt-8 uppercase"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* --- BULK ORDERS CTA --- */}
      <section className="section-padding">
        <div className="container mx-auto px-6 lg:px-[80px]">
          <div 
            className="rounded-[48px] p-12 md:p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl"
            style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.06) 0%, transparent 60%), #2D6B2F' }}
          >
            <div className="relative z-10 max-w-xl">
              <h2 className="text-[32px] md:text-[40px] text-[#FFFFFF] font-bold mb-4 font-['Outfit'] leading-tight">Scale Your Operation with <span className="text-kb-tertiary">Bulk Fleet</span> Orders</h2>
              <p className="text-[rgba(255,255,255,0.85)] text-[18px] font-['DM_Sans']">
                Equipping a new franchise or upgrading a central production unit? Our consultants provide custom quotes and logistics support.
              </p>
            </div>
            <div className="relative z-10 shrink-0 flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <button 
                onClick={() => onNavigate?.('bulk-enquiry')}
                className="w-full md:w-auto bg-kb-tertiary text-[#1A1A1A] border-none px-[28px] py-[14px] font-bold text-[13px] tracking-[0.08em] rounded-[6px] cursor-pointer flex items-center justify-center gap-2 uppercase hover:bg-[#e09a00] transition-colors"
              >
                Bulk Enquiry <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => onNavigate?.('contact')}
                className="w-full md:w-auto bg-transparent text-[#FFFFFF] border-2 border-[rgba(255,255,255,0.7)] px-[28px] py-[14px] font-bold text-[13px] tracking-[0.08em] rounded-[6px] cursor-pointer flex items-center justify-center gap-2 uppercase hover:border-[#FFFFFF] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                Consult Sales <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUICK CONTACT BAR --- */}
      <div className="bg-white border-t border-[#F1F5F9] section-padding">
        <div className="container mx-auto px-6 lg:px-[80px] flex flex-wrap justify-center gap-12">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-kb-tertiary group-hover:bg-kb-tertiary group-hover:text-white transition-all">
              <Phone size={20} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest font-['Outfit']">Direct Sales</div>
              <div className="text-[15px] font-bold text-[#111827] font-['DM_Sans']">+91 94907 01421</div>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-kb-primary group-hover:bg-kb-primary group-hover:text-white transition-all">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest font-['Outfit']">Engineering Support</div>
              <div className="text-[15px] font-bold text-[#111827] font-['DM_Sans']">info@kitchenbots.in</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
