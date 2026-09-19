import { type Page } from '../App';
import { Settings, Bot, Cpu, Recycle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

interface CapabilitiesPageProps {
  onNavigate?: (page: Page) => void;
}

export default function CapabilitiesPage({ onNavigate }: CapabilitiesPageProps) {
  const capabilities = [
    {
      icon: Settings,
      title: 'Mechanical Engineering Excellence',
      color: 'bg-kb-tertiary',
      description: 'We specialize in designing and manufacturing high-performance kitchen automation equipment with precision engineering.',
      features: [
        'Precision mechanical design and manufacturing.',
        'Heavy-duty & reliable industrial grade machinery.',
        'Custom solutions tailored to specific commercial needs.'
      ]
    },
    {
      icon: Bot,
      title: 'Advanced Automation & Robotics',
      color: 'bg-kb-primary',
      description: 'KitchenBots integrates state-of-the-art automation and robotics to transform kitchen productivity and safety.',
      features: [
        'AI-driven robotics for automated cooking tasks.',
        'Seamless integration for unmanned kitchen operations.',
        'Programmable cooking solutions for consistency.'
      ]
    },
    {
      icon: Cpu,
      title: 'Electronics & Smart Control Systems',
      color: 'bg-[#1E2329]',
      description: 'We develop intelligent electronic control systems that ensure the seamless operation of complex kitchen ecosystems.',
      features: [
        'Advanced temperature and thermal process control.',
        'IoT platforms for connected and smart kitchens.',
        'Precision sensors for real-time performance monitoring.'
      ]
    },
    {
      icon: Recycle,
      title: 'Sustainable Waste Management',
      color: 'bg-kb-primary',
      description: 'Innovation meets sustainability. We provide eco-friendly solutions for the modern, responsible kitchen.',
      features: [
        'Advanced grease traps designed for zero-clogging.',
        'Efficient food waste composting systems.',
        'Organic waste decomposers for eco-friendly handling.'
      ]
    }
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-20">
      {/* HERO SECTION */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-white">
        <div className="container mx-auto px-6 lg:px-[80px]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-[#F0FDF4] text-kb-primary text-[12px] font-bold uppercase tracking-widest rounded-full mb-6 font-['Outfit']">
                Technical Mastery
              </span>
              <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-bold text-[#111827] leading-[1.1] mb-6 font-['Outfit']">
                Our Engineering <span className="text-kb-tertiary">Capabilities</span>
              </h1>
              <p className="text-[18px] text-[#475569] leading-relaxed mb-8 font-['DM_Sans']">
                At KitchenBots, our capabilities span the full spectrum of kitchen technology innovation. We combine mechanical engineering, electronics, and AI to design intelligent kitchen solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => onNavigate?.('contact')}
                  variant="accent"
                  size="lg"
                >
                  Contact Our Engineers <ArrowRight size={20} />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-[48px] overflow-hidden shadow-2xl">
                <img 
                  src="/images/redesign/capabilities-hero.png" 
                  alt="Industrial Kitchen Technology" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[32px] shadow-xl border border-[#F1F5F9] hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F0FDF4] rounded-2xl flex items-center justify-center text-kb-primary">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <div className="text-[18px] font-bold text-[#111827] font-['Outfit']">ISO Certified</div>
                    <div className="text-[13px] text-[#64748B] font-['DM_Sans']">Manufacturing Standards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="py-12 md:py-20 container mx-auto px-6 lg:px-[80px]">
        <div className="text-center mb-16">
          <h2 className="text-[36px] font-bold text-[#111827] mb-4 font-['Outfit']">Innovating Every Component</h2>
          <p className="text-[16px] text-[#64748B] max-w-2xl mx-auto font-['DM_Sans']">
            We bring together multiple disciplines to create a cohesive ecosystem of smart kitchen equipment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[40px] border border-[#F1F5F9] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group">
              <div className={`w-16 h-16 ${cap.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <cap.icon size={32} />
              </div>
              <h3 className="text-[24px] font-bold text-[#111827] mb-4 font-['Outfit'] group-hover:text-kb-tertiary transition-colors">{cap.title}</h3>
              <p className="text-[15px] text-[#64748B] leading-relaxed mb-8 font-['DM_Sans']">
                {cap.description}
              </p>
              <ul className="space-y-4">
                {cap.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-kb-primary shrink-0" />
                    <span className="text-[14px] text-[#475569] font-medium font-['DM_Sans']">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNICAL SHOWCASE */}
      <section className="py-12 md:py-20 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          <div className="aspect-[3/2] rounded-[32px] overflow-hidden">
            <img src="/images/redesign/cap-1.png" alt="Engineering" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/2] rounded-[32px] overflow-hidden">
            <img src="/images/redesign/cap-2.png" alt="Automation" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/2] rounded-[32px] overflow-hidden">
            <img src="/images/redesign/cap-3.png" alt="Robotics" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="aspect-[3/2] rounded-[32px] overflow-hidden">
            <img src="/images/redesign/cap-4.png" alt="Sustainability" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 md:py-20 container mx-auto px-6 lg:px-[80px]">
        <div className="bg-[#1E2329] rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-kb-tertiary opacity-10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-kb-primary opacity-10 blur-[100px]" />
          
          <h2 className="text-[28px] sm:text-[32px] md:text-[48px] font-bold text-white mb-6 font-['Outfit'] leading-tight">
            Ready to Build the Future of Your Kitchen?
          </h2>
          <p className="text-white/60 text-[18px] max-w-2xl mx-auto mb-10 font-['DM_Sans']">
            Consult with our engineering team today for custom solutions tailored to your unique requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              onClick={() => onNavigate?.('contact')}
              variant="accent"
              size="lg"
            >
              Start Your Project
            </Button>
            <Button 
              onClick={() => onNavigate?.('contact')}
              variant="outline"
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20 border-white/10 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
