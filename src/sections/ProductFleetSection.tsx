import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/use-cart';
import { useToast } from '../hooks/use-toast';
import { PRODUCTS } from '../data/products';
import { Button } from '../components/ui/button';

interface ProductFleetSectionProps {
  onBrowse?: () => void;
  onCartOpen?: () => void;
  onProductClick?: (id: string) => void;
}

const FEATURED_PRODUCTS = PRODUCTS.filter(product => product.featured).slice(0, 4);

const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(price);

export default function ProductFleetSection({ onBrowse, onProductClick, onCartOpen }: ProductFleetSectionProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  return (
    <section className="relative z-20 px-6 pb-24 lg:pb-32">
      <div className="container mx-auto px-6 lg:px-[80px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="font-['Outfit'] text-[36px] font-bold leading-tight text-[#111827] md:text-[48px]">
              Featured equipment
            </h2>
            <p className="mt-4 text-[#64748B]">Current grills, stoves, and cooking equipment from the product catalog.</p>
          </div>
          <Button variant="outline" onClick={onBrowse} className="rounded-md">
            View all products <ArrowRight size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map(product => (
            <article key={product.id} className="group flex flex-col overflow-hidden rounded-3xl border border-[#F1F5F9] bg-white shadow-premium">
              <button
                className="aspect-square overflow-hidden bg-[#F8FAFC] p-8"
                onClick={() => onProductClick?.(product.id)}
                aria-label={`View ${product.name}`}
              >
                <img src={product.image} alt={product.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
              </button>
              <div className="flex flex-1 flex-col p-6">
                <button className="text-left" onClick={() => onProductClick?.(product.id)}>
                  <h3 className="font-['Outfit'] text-[18px] font-bold leading-tight text-[#111827] hover:text-kb-tertiary">{product.name}</h3>
                </button>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#64748B]">{product.description}</p>
                <div className="mt-5 font-['Outfit'] text-[20px] font-bold text-[#111827]">{formatPrice(product.price)}</div>
                <Button
                  className="mt-6 w-full rounded-md"
                  onClick={() => {
                    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
                    showToast(`${product.name} added to cart`, 'View cart', () => onCartOpen?.());
                  }}
                >
                  <ShoppingCart size={18} /> Add to cart
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
