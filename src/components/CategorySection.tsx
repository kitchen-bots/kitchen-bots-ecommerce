import { ArrowRight, Flame, Gauge, PackageOpen, RotateCw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { ProductCategory } from '../types/product';

interface CategorySectionProps {
  onCatalog: (category: ProductCategory) => void;
}

const OPERATIONS: Array<{
  title: string;
  description: string;
  category: ProductCategory;
  icon: typeof Flame;
}> = [
  {
    title: 'Open-fire grilling',
    description: 'Adjustable-grate grills for wood and charcoal cooking.',
    category: 'Santa Maria Series',
    icon: Flame,
  },
  {
    title: 'Fuel-efficient cooking',
    description: 'Rocket stoves for focused heat and compact setups.',
    category: 'Rocket Stoves',
    icon: Gauge,
  },
  {
    title: 'Portable cooking',
    description: 'Collapsible grills built for transport and quick setup.',
    category: 'Collapsible BBQ',
    icon: PackageOpen,
  },
  {
    title: 'Automated grilling',
    description: 'Rotisserie equipment for consistent turning during cooking.',
    category: 'Automatic BBQ',
    icon: RotateCw,
  },
];

export default function CategorySection({ onCatalog }: CategorySectionProps) {
  return (
    <section className="w-full overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-[80px]">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-['Outfit'] text-[38px] font-bold leading-tight text-[#111827] md:text-[52px]">
            Solutions by operation
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-[#64748B]">
            Start with the way you cook, then browse the equipment category built for that operation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {OPERATIONS.map(operation => {
            const Icon = operation.icon;
            const image = PRODUCTS.find(product => product.category === operation.category)?.image;
            return (
              <button
                key={operation.category}
                onClick={() => onCatalog(operation.category)}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#111827] text-left shadow-premium focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#E45400]"
              >
                {image && <img src={image} alt="" className="h-full w-full object-cover opacity-75 transition-transform duration-300 group-hover:scale-[1.03]" />}
                <span className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/35 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <Icon size={23} className="mb-4 text-kb-tertiary" />
                  <span className="block font-['Outfit'] text-[22px] font-bold">{operation.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-white/75">{operation.description}</span>
                  <span className="mt-5 flex items-center gap-2 text-sm font-bold text-kb-tertiary">Browse products <ArrowRight size={16} /></span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
