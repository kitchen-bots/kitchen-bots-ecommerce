import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, ChevronRight, LayoutGrid, List, Search, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { Page } from '../App';
import type { Product, ProductCategory } from '../types/product';
import { useCart } from '../hooks/use-cart';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import ProductImage from '../components/ProductImage';
import { fetchCatalogProducts } from '../lib/api';

interface ProductsPageProps {
  onProductClick: (id: string) => void;
  onCartOpen?: () => void;
  onNavigate?: (page: Page, productId?: string) => void;
}

type ViewMode = 'grid' | 'list';
type CategoryFilter = ProductCategory | 'All';

const CATEGORIES: CategoryFilter[] = ['All', ...new Set(PRODUCTS.map(product => product.category))];

const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(price);

export default function ProductsPage({ onProductClick, onCartOpen, onNavigate }: ProductsPageProps) {
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get('category');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(
    CATEGORIES.includes(requestedCategory as CategoryFilter) ? requestedCategory as CategoryFilter : 'All',
  );
  const [searchQuery, setSearchQuery] = useState(params.get('q') ?? '');
  const [view, setView] = useState<ViewMode>('grid');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await fetchCatalogProducts();
      setProducts(items);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load catalog products.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    const terms = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return products.filter(product => {
      const searchable = [product.name, product.description, product.category, ...product.features].join(' ').toLowerCase();
      return (activeCategory === 'All' || product.category === activeCategory)
        && terms.every(term => searchable.includes(term));
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      <section className="border-b border-[#F1F5F9] bg-white pb-12 pt-6 lg:pb-16">
        <div className="mx-auto w-full max-w-[1440px] 2xl:max-w-[1480px] px-6 lg:px-12 2xl:px-16">
          <nav className="mb-6 flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#94A3B8]" aria-label="Breadcrumb">
            <button className="hover:text-[#111827]" onClick={() => onNavigate?.('home')}>Home</button>
            <ChevronRight size={12} />
            <span className="text-kb-primary">Products</span>
          </nav>
          <h1 className="font-['Outfit'] text-[36px] font-bold leading-tight text-[#111827] sm:text-[46px] md:text-[54px]">Product catalog</h1>
          <p className="mt-4 max-w-2xl font-['DM_Sans'] text-[17px] leading-relaxed text-[#64748B]">
            Browse commercial Santa Maria grills, rocket stoves, automated BBQ rotisseries, and cooking hardware.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-40 border-b border-[#E2E8F0] bg-white/95 py-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1440px] 2xl:max-w-[1480px] flex-col gap-4 px-6 lg:px-12 2xl:px-16">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`shrink-0 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                    activeCategory === category
                      ? 'bg-[#C2410C] text-white shadow-sm'
                      : 'border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC] hover:text-[#111827]'
                  }`}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category === 'All' ? 'All products' : category}
                </button>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              className="change-view-button shrink-0 self-start rounded-xl border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC] lg:self-auto"
              onClick={() => setView(current => current === 'grid' ? 'list' : 'grid')}
              aria-label={`Switch to ${view === 'grid' ? 'list' : 'grid'} view`}
            >
              {view === 'grid' ? <List size={18} className="text-[#C2410C]" /> : <LayoutGrid size={18} className="text-[#C2410C]" />}
              Change view
            </Button>
          </div>

          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C2410C]" size={18} />
            <label className="sr-only" htmlFor="catalog-search">Search products</label>
            <input
              id="catalog-search"
              type="search"
              placeholder="Search products, categories, or features..."
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#CBD5E1] bg-white pl-12 pr-4 font-['DM_Sans'] text-[14px] outline-none transition-colors focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]"
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto w-full max-w-[1440px] 2xl:max-w-[1480px] px-6 lg:px-12 2xl:px-16">
          {error && (
            <div className="mb-8 flex items-center justify-between rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-4 text-[#991B1B]">
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-['DM_Sans']">{error}</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2 shrink-0 rounded-xl font-bold" onClick={loadProducts}>
                <RefreshCw size={14} /> Retry
              </Button>
            </div>
          )}

          <p className="mb-6 font-['DM_Sans'] text-sm text-[#64748B]" aria-live="polite">
            {isLoading ? 'Loading products...' : `${filteredProducts.length} products`}
          </p>

          {isLoading ? (
            <div className={view === 'grid' ? 'grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3' : 'grid gap-5'}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                  <div className="aspect-square w-full rounded-xl bg-[#F1F5F9] mb-6" />
                  <div className="h-6 w-3/4 rounded bg-[#F1F5F9] mb-3" />
                  <div className="h-4 w-full rounded bg-[#F1F5F9] mb-2" />
                  <div className="h-4 w-2/3 rounded bg-[#F1F5F9] mb-6" />
                  <div className="h-8 w-1/3 rounded bg-[#F1F5F9]" />
                </div>
              ))}
            </div>
          ) : (
            <div className={view === 'grid' ? 'grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-5'}>
              {filteredProducts.map(product => (
                <article
                  key={product.id}
                  className={view === 'grid'
                    ? 'group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all duration-200 hover:border-[#CBD5E1] hover:shadow-md'
                    : 'group grid overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white transition-all duration-200 hover:border-[#CBD5E1] hover:shadow-md md:grid-cols-[280px_1fr]'}
                >
                  <button
                    onClick={() => onProductClick(product.id)}
                    className={view === 'grid' ? 'aspect-square overflow-hidden bg-[#F8FAFC] p-8 text-center' : 'min-h-[240px] overflow-hidden bg-[#F8FAFC] p-8 text-center'}
                    aria-label={`View ${product.name}`}
                  >
                    <ProductImage src={product.image} alt={product.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
                  </button>

                  <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
                    <button className="text-left" onClick={() => onProductClick(product.id)}>
                      <h2 className="font-['Outfit'] text-[20px] font-bold leading-tight text-[#111827] hover:text-kb-tertiary">{product.name}</h2>
                    </button>
                    <p className="mt-2.5 font-['DM_Sans'] text-[14px] leading-relaxed text-[#64748B]">{product.description}</p>
                    <ul className="mt-4 grid gap-2 font-['DM_Sans'] text-[13px] text-[#64748B] sm:grid-cols-2">
                      {product.features.slice(0, 4).map(feature => <li key={feature}>• {feature}</li>)}
                    </ul>
                    <div className="mt-5 font-['Outfit'] text-[22px] font-bold text-[#111827]">{formatPrice(product.price)}</div>

                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      <Button
                        className="min-w-[140px] flex-1 rounded-xl font-semibold"
                        onClick={() => {
                          addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
                          showToast(`${product.name} added to cart`, 'View cart', () => onCartOpen?.());
                        }}
                      >
                        <ShoppingCart size={17} className="mr-1.5" /> Add to cart
                      </Button>
                      <Button variant="outline" className="min-w-[120px] flex-1 rounded-xl border-[#CBD5E1] font-semibold text-[#111827] hover:bg-[#F8FAFC]" onClick={() => onProductClick(product.id)}>
                        View details <ArrowRight size={17} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="py-24 text-center">
              <Search size={36} className="mx-auto mb-4 text-[#CBD5E1]" />
              <h2 className="font-['Outfit'] text-[22px] font-bold text-[#111827]">No matching products</h2>
              <p className="mt-2 font-['DM_Sans'] text-[#64748B]">Change the search text or select another category filter.</p>
              <Button className="mt-6 rounded-xl" onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}>Clear filters</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
