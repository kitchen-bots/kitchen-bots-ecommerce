import { type Page } from '../App';
import { ArrowRight, Play, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';

interface HeroSectionProps {
  onNavigate?: (page: Page) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[900px] bg-white overflow-hidden flex items-center pt-24 lg:pt-32">
      {/* ── BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/redesign/hero-robot.png" 
          alt="Smart Kitchen Automation" 
          className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
        />
        {/* Advanced Multi-layer Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-white to-transparent" />
        
      </div>

      {/* ── CONTENT LAYER ── */}
      <div className="container mx-auto px-6 lg:px-[80px] relative z-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] border border-[#DCFCE7] rounded-full text-kb-primary text-[13px] font-bold uppercase tracking-widest mb-8 animate-fade-in font-['Outfit']">
            <Zap size={14} className="fill-current" />
            Next-Gen Kitchen Automation
          </div>

          {/* Main Heading */}
          <h1 
            className="text-[40px] sm:text-[56px] md:text-[84px] font-bold text-[#112329] leading-[1.1] sm:leading-[1] mb-8 tracking-[-0.03em] font-['Outfit'] animate-fade-in-up"
          >
            Engineering <br />
            <span className="text-kb-tertiary">Intelligent</span> <br />
            Culinary Spaces
          </h1>

          {/* Subheading */}
          <p 
            className="text-[#475569] text-[18px] md:text-[22px] max-w-xl mb-12 leading-relaxed font-['DM_Sans'] animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Revolutionizing high-volume food production through advanced robotics, precision thermal engineering, and smart IoT monitoring.
          </p>
          
          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              onClick={() => onNavigate && onNavigate('products')}
              className="group relative px-10 shadow-2xl shadow-black/10 overflow-hidden"
            >
              <span className="relative z-10">Explore Fleet</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate && onNavigate('capabilities')}
              className="px-8 flex items-center gap-3 active:scale-95 group"
            >
              <div className="w-10 h-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-kb-primary group-hover:bg-kb-primary transition-colors">
                <Play size={16} className="fill-current" />
              </div>
              View Capabilities
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-10 opacity-70 animate-fade-in" style={{ animationDelay: '0.6s' }}>
             <div className="flex items-center gap-3 text-[15px] sm:text-[14px] font-bold text-[#112329] font-['Outfit']">
               <ShieldCheck size={20} className="text-kb-primary shrink-0" />
               Industrial Certification
             </div>
             <div className="flex items-center gap-3 text-[15px] sm:text-[14px] font-bold text-[#112329] font-['Outfit']">
               <div className="w-2.5 h-2.5 rounded-full bg-kb-tertiary shrink-0" />
               24/7 Technical Support
             </div>
             <div className="flex items-center gap-3 text-[15px] sm:text-[14px] font-bold text-[#112329] font-['Outfit']">
               <div className="w-2.5 h-2.5 rounded-full bg-kb-primary shrink-0" />
               Smart IoT Ready
             </div>
          </div>

        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute left-[40px] md:left-[80px] top-[40%] bottom-0 w-[1px] bg-gradient-to-b from-[#E2E8F0] to-transparent z-10" />
    </section>
  );
}
