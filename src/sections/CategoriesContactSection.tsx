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
    <section className="border-t border-[#E5E7EB] bg-white py-14">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-[20px] font-bold text-[#111827]">Product categories</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {CATEGORIES.map(({ icon: Icon, label, category }) => (
              <button
                key={category}
                type="button"
                onClick={() => onCatalog(category)}
                className="flex min-h-28 flex-col items-start justify-between border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-left text-[#111827] transition-colors hover:border-[#E45400] hover:bg-[#FFF7ED] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E45400]"
              >
                <Icon size={22} className="text-[#E45400]" aria-hidden="true" />
                <span className="text-[13px] font-bold leading-snug">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[20px] font-bold text-[#111827]">Get in touch</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a href="tel:+919490701421" className="flex items-center gap-3 border border-[#E5E7EB] p-4 hover:border-[#E45400] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E45400]">
              <Phone size={19} className="shrink-0 text-[#E45400]" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">Call us</span>
                <span className="block break-words text-[15px] font-bold text-[#111827]">+91 94907 01421</span>
              </span>
            </a>
            <a href="mailto:info@kitchenbots.in" className="flex items-center gap-3 border border-[#E5E7EB] p-4 hover:border-[#E45400] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E45400]">
              <Mail size={19} className="shrink-0 text-[#E45400]" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">Email us</span>
                <span className="block break-all text-[15px] font-bold text-[#111827]">info@kitchenbots.in</span>
              </span>
            </a>
          </div>
          <a
            href="https://wa.me/919490701421"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md bg-[#166534] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#14532D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#166534]"
          >
            <MessageSquare size={18} aria-hidden="true" />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
