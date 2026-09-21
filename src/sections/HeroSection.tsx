import type { Page } from '../App';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function HeroSection({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  return (
    <section className="relative flex min-h-[760px] w-full items-center overflow-hidden bg-white pt-24 lg:pt-32">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/redesign/hero-robot.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-[80px]">
        <div className="max-w-3xl">
          <h1 className="mb-8 font-['Outfit'] text-[42px] font-bold leading-[1.03] tracking-[-0.03em] text-[#112329] sm:text-[58px] md:text-[76px]">
            Commercial grills and cooking equipment
            <span className="mt-3 block text-kb-tertiary">for demanding kitchens.</span>
          </h1>
          <p className="mb-10 max-w-xl font-['DM_Sans'] text-[18px] leading-relaxed text-[#475569] md:text-[20px]">
            Browse BBQ grills, rocket stoves, automated grills, and portable cooking equipment for restaurants, caterers, and outdoor operations.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={() => onNavigate?.('products')} className="rounded-md px-8">
              Explore products <ArrowRight size={20} />
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate?.('capabilities')} className="rounded-md px-8">
              <Play size={17} className="fill-current text-kb-tertiary" />
              View capabilities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
