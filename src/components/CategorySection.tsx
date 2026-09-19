import { ArrowRight, ChefHat, Factory, Warehouse, WashingMachine } from 'lucide-react';
import type { Page } from '../App';

interface CategorySectionProps {
  onNavigate?: (page: Page, params?: string) => void;
}

const SOLUTIONS = [
  {
    id: 'commercial-kitchens',
    title: 'Commercial Kitchens',
    subtitle: 'Restaurants & Hotels',
    icon: ChefHat,
    image: '/images/solution-kitchen.png',
    link: 'products'
  },
  {
    id: 'food-processing',
    title: 'Food Processing',
    subtitle: 'Mass Production Units',
    icon: Factory,
    image: '/images/solution-processing.png',
    link: 'capabilities'
  },
  {
    id: 'cold-storage',
    title: 'Cold Storage',
    subtitle: 'Preservation Systems',
    icon: Warehouse,
    image: '/images/solution-coldstorage.png',
    link: 'products'
  },
  {
    id: 'industrial-laundry',
    title: 'Industrial Laundry',
    subtitle: 'High-Volume Systems',
    icon: WashingMachine,
    image: '/images/solution-laundry.png',
    link: 'products'
  }
];

export default function CategorySection({ onNavigate }: CategorySectionProps) {
  return (
    <section className="w-full py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-[80px]">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-[#F0FDF4] text-kb-primary text-[12px] font-bold uppercase tracking-widest rounded-full mb-6 font-['Outfit']">
              Sector Expertise
            </span>
            <h2 className="text-[40px] md:text-[56px] font-bold text-[#111827] leading-[1.1] mb-6 font-['Outfit']">
              Industry Specific <br />
              <span className="text-kb-primary">Commercial Solutions</span>
            </h2>
            <p className="text-[#64748B] text-[18px] leading-relaxed font-['DM_Sans']">
              Our engineering fleet is purpose-built to deliver operational excellence across diverse high-demand environments.
            </p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('products')}
            className="mt-10 lg:mt-0 flex items-center gap-3 text-[#111827] font-bold uppercase tracking-widest text-[14px] font-['Outfit'] group"
          >
            All Sectors <div className="w-10 h-10 bg-[#F8FAFC] rounded-full flex items-center justify-center group-hover:bg-kb-tertiary group-hover:text-white transition-all"><ArrowRight size={18} /></div>
          </button>
        </div>

        {/* SOLUTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SOLUTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="group relative aspect-[4/5] rounded-[40px] overflow-hidden cursor-pointer shadow-premium hover:shadow-lg transition-all duration-700"
                onClick={() => onNavigate && onNavigate(item.link as Page)}
              >
                {/* Background Image */}
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Advanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col items-start">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20 group-hover:bg-kb-tertiary group-hover:border-kb-tertiary transition-all duration-500">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-white text-[24px] font-bold leading-tight font-['Outfit'] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-[14px] font-['DM_Sans'] mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-kb-tertiary font-bold text-[12px] uppercase tracking-widest font-['Outfit'] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Systems <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CUSTOM CTA */}
        <div className="mt-24 p-12 md:p-20 rounded-[56px] bg-[#1E2329] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-kb-primary opacity-5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-kb-tertiary opacity-5 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-2xl">
              <h3 className="text-white text-[32px] md:text-[40px] font-bold mb-6 font-['Outfit'] leading-tight">
                Specialized Engineering <br />
                <span className="text-kb-tertiary">Requirements?</span>
              </h3>
              <p className="text-white/60 text-[18px] font-['DM_Sans'] leading-relaxed">
                Our R&D unit specializes in manufacturing bespoke equipment for niche culinary processes and industrial kitchen waste management.
              </p>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="h-[64px] px-10 bg-kb-tertiary text-white font-bold rounded-2xl hover:bg-[#D18509] transition-all shadow-xl shadow-kb-tertiary font-['Outfit'] flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap"
            >
              Start Custom Project <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
