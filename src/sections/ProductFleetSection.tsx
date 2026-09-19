import { ShoppingCart, ArrowRight, Zap, Star } from 'lucide-react';
import { useCart } from '../hooks/use-cart';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';

interface ProductFleetSectionProps {
  onCartOpen?: () => void;
  onProductClick?: (id: string) => void;
}

const FEATURED_PRODUCTS = [
  {
    id: 'fryer',
    name: 'Electric Deep Fryer',
    category: 'Commercial Series',
    price: 25000,
    image: '/images/redesign/fryer.png',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'mixer',
    name: 'Industrial Food Mixer',
    category: 'Heavy Duty',
    price: 95000,
    image: '/images/redesign/mixer.png',
    rating: 4.9,
    reviews: 86
  },
  {
    id: 'robogrill',
    name: 'Robotic Grill Station',
    category: 'Smart Fleet',
    price: 125000,
    image: '/images/redesign/robogrill.png',
    rating: 5.0,
    reviews: 42
  },
  {
    id: 'bbq',
    name: 'Commercial BBQ Grill',
    category: 'Outdoor Series',
    price: 80000,
    image: '/images/redesign/bbq.png',
    rating: 4.7,
    reviews: 95
  }
];

export default function ProductFleetSection({ onProductClick, onCartOpen }: ProductFleetSectionProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(price);

  return (
    <section className="relative z-20 pb-24 lg:pb-32 px-6">
      <div className="container mx-auto px-6 lg:px-[80px]">
        {/* Section Heading for Homepage variant */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
             <div className="flex items-center gap-2 text-kb-tertiary font-bold text-[13px] uppercase tracking-widest mb-4 font-['Outfit']">
                <Zap size={16} className="fill-current" />
                Trending Fleet
             </div>
             <h2 className="text-[36px] md:text-[48px] font-bold text-[#111827] leading-tight font-['Outfit']">
                Featured Industrial <br />
                <span className="text-kb-tertiary">Equipment</span>
             </h2>
          </div>
          <Button 
             variant="outline"
             onClick={() => onProductClick?.('all')}
             className="flex items-center gap-3"
          >
             View All Products <ArrowRight size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-[40px] border border-[#F1F5F9] overflow-hidden flex flex-col shadow-premium hover:shadow-lg transition-all duration-500 cursor-pointer"
              onClick={() => onProductClick && onProductClick(product.id)}
            >
              {/* Image Area */}
              <div className="relative aspect-square bg-[#F8FAFC] p-10 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#111827] font-['Outfit']">
                   {product.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-8">
                   <div className="flex items-center gap-1 text-kb-tertiary mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-current' : 'opacity-20'} />
                      ))}
                      <span className="text-[11px] font-bold text-[#94A3B8] ml-1 font-['DM_Sans']">({product.reviews})</span>
                   </div>
                   <h3 className="text-[18px] font-bold text-[#111827] mb-2 leading-tight font-['Outfit'] group-hover:text-kb-primary transition-colors">
                      {product.name}
                   </h3>
                   <div className="text-[20px] font-bold text-[#111827] font-['Outfit']">
                      {formatPrice(product.price)}
                   </div>
                </div>

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
                  className="mt-auto w-full"
                >
                  <ShoppingCart size={18} />
                  Quick Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
