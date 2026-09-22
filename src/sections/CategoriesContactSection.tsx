import { Flame, Gauge, Mail, MessageSquare, PackageOpen, Phone, RotateCw } from 'lucide-react';
import type { ProductCategory } from '../types/product';

interface CategoriesContactSectionProps {
  onCatalog: (category: ProductCategory) => void;
}

const CATEGORIES: Array<{
  icon: typeof Flame;
  label: string;
  category: ProductCategory;
}> = [
  { icon: Flame, label: 'Santa Maria grills', category: 'Santa Maria Series' },
  { icon: Gauge, label: 'Rocket stoves', category: 'Rocket Stoves' },
  { icon: PackageOpen, label: 'Collapsible BBQs', category: 'Collapsible BBQ' },
  { icon: RotateCw, label: 'Automatic BBQs', category: 'Automatic BBQ' },
];

export default function CategoriesContactSection({ onCatalog }: CategoriesContactSectionProps) {
  return (
    <section className="border-t border-[#E2E8F0] bg-white py-16">
      <div className="mx-auto grid w-full max-w-[1440px] 2xl:max-w-[1480px] gap-12 px-6 lg:px-12 2xl:px-16 lg:grid-cols-2">
        <div>
          <h2 className="font-['Outfit'] text-[22px] font-bold text-[#111827]">Product categories</h2>
          <p className="mt-1 font-['DM_Sans'] text-sm text-[#64748B]">Quick navigation by equipment type</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {CATEGORIES.map(({ icon: Icon, label, category }) => (
              <button
                key={category}
                type="button"
                onClick={() => onCatalog(category)}
                className="flex min-h-28 flex-col items-start justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-left text-[#111827] transition-all hover:border-[#C2410C] hover:bg-[#FFF7ED] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C2410C]"
              >
                <Icon size={22} className="text-[#C2410C]" aria-hidden="true" />
                <span className="font-['DM_Sans'] text-[13px] font-bold leading-snug">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-['Outfit'] text-[22px] font-bold text-[#111827]">Direct kitchen support</h2>
          <p className="mt-1 font-['DM_Sans'] text-sm text-[#64748B]">Speak with an equipment specialist</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href="tel:+919490701421"
              className="flex items-center gap-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-all hover:border-[#C2410C] hover:bg-[#FFF7ED]/40 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C2410C]"
            >
              <Phone size={20} className="shrink-0 text-[#C2410C]" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Direct line</span>
                <span className="block break-words font-['Outfit'] text-[15px] font-bold text-[#111827]">+91 94907 01421</span>
              </span>
            </a>
            <a
              href="mailto:info@kitchenbots.in"
              className="flex items-center gap-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-all hover:border-[#C2410C] hover:bg-[#FFF7ED]/40 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C2410C]"
            >
              <Mail size={20} className="shrink-0 text-[#C2410C]" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Email support</span>
                <span className="block break-all font-['Outfit'] text-[15px] font-bold text-[#111827]">info@kitchenbots.in</span>
              </span>
            </a>
          </div>
          <a
            href="https://wa.me/919490701421"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#166534] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#14532D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#166534]"
          >
            <MessageSquare size={18} aria-hidden="true" />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
