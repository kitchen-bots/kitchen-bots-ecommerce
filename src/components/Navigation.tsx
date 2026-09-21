import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useCart } from '../hooks/use-cart';
import { PRODUCTS } from '../data/products';
import type { Page } from '../App';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onCartClick: () => void;
  onCatalog: (query?: string, category?: string) => void;
}

const CATEGORIES = ['All', ...new Set(PRODUCTS.map(product => product.category))];

export default function Navigation({ currentPage, onNavigate, onCartClick, onCatalog }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { totalItems } = useCart();
  const productMenu = useRef<HTMLDivElement>(null);
  const productButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!productMenu.current?.contains(event.target as Node)) setProductsOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  const navigate = (page: Page) => {
    setMobileOpen(false);
    setProductsOpen(false);
    setSearchOpen(false);
    onNavigate(page);
  };

  const browse = (category = 'All') => {
    setMobileOpen(false);
    setProductsOpen(false);
    setSearchOpen(false);
    onCatalog('', category);
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    setSearchOpen(false);
    setMobileOpen(false);
    onCatalog(query);
  };

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-[#F1F5F9] bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-6 lg:px-[80px]">
        <button onClick={() => navigate('home')} aria-label="KitchenBots home" className="shrink-0">
          <img src="/images/kitchenbots-logo.svg" alt="KitchenBots" className="h-12 w-auto object-contain" />
        </button>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          <button className="nav-link" aria-current={currentPage === 'home' ? 'page' : undefined} onClick={() => navigate('home')}>Home</button>
          <div
            ref={productMenu}
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            onBlur={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false);
            }}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                setProductsOpen(false);
                productButton.current?.focus();
              }
            }}
          >
            <button
              ref={productButton}
              className="nav-link flex items-center gap-1.5"
              aria-expanded={productsOpen}
              aria-controls="product-menu"
              onClick={() => setProductsOpen(open => !open)}
              onKeyDown={event => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  setProductsOpen(true);
                  requestAnimationFrame(() => productMenu.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus());
                }
              }}
            >
              Products <ChevronDown size={15} />
            </button>
            {productsOpen && (
              <div id="product-menu" role="menu" className="absolute left-0 top-full mt-3 w-64 border border-[#E2E8F0] bg-white p-2 shadow-xl">
                <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Product categories</p>
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    role="menuitem"
                    className="block w-full px-3 py-2.5 text-left text-sm font-semibold text-[#334155] hover:bg-[#FFF7ED] hover:text-[#C2410C] focus:bg-[#FFF7ED] focus:text-[#C2410C]"
                    onClick={() => browse(category)}
                  >
                    {category === 'All' ? 'All products' : category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="nav-link" aria-current={currentPage === 'capabilities' ? 'page' : undefined} onClick={() => navigate('capabilities')}>Capabilities</button>
          <button className="nav-link" aria-current={currentPage === 'about' ? 'page' : undefined} onClick={() => navigate('about')}>About</button>
          <button className="nav-link" aria-current={currentPage === 'contact' ? 'page' : undefined} onClick={() => navigate('contact')}>Contact</button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            ref={searchButton}
            variant="ghost"
            size="icon"
            className="rounded-lg"
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(open => !open)}
          >
            <Search size={20} />
          </Button>
          <Button variant="ghost" className="hidden rounded-lg sm:flex" onClick={() => navigate('dashboard')}>
            <User size={18} /> My Account
          </Button>
          <Button variant="ghost" size="icon" className="relative rounded-lg" onClick={onCartClick} aria-label={`Open cart, ${totalItems} items`}>
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="absolute -right-1 -top-1 min-w-4 rounded-sm bg-[#C2410C] px-1 text-[10px] text-white">{totalItems}</span>}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-lg lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <Menu size={22} />
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="absolute right-6 top-[calc(100%+8px)] w-[min(560px,calc(100%-3rem))] border border-[#E2E8F0] bg-white p-4 shadow-xl lg:right-[80px]">
          <form role="search" className="flex gap-2" onSubmit={submitSearch} onKeyDown={event => {
            if (event.key === 'Escape') {
              setSearchOpen(false);
              searchButton.current?.focus();
            }
          }}>
            <label className="sr-only" htmlFor="navbar-search">Search products</label>
            <input
              ref={searchInput}
              id="navbar-search"
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search grills, stoves, features..."
              className="min-w-0 flex-1 border border-[#CBD5E1] px-4 py-3 outline-none focus:border-[#E45400]"
            />
            <Button type="submit" className="rounded-md"><Search size={17} /> Search</Button>
          </form>
        </div>
      )}

      <div className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}>
        <button className={`absolute inset-0 bg-[#0F172A]/40 transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
        <div className={`absolute bottom-0 right-0 top-0 w-[min(88%,360px)] bg-white transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-[#F1F5F9] p-5">
            <img src="/images/kitchenbots-logo.svg" alt="KitchenBots" className="h-10 w-auto" />
            <Button variant="ghost" size="icon" className="rounded-lg" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X /></Button>
          </div>
          <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
            <Button variant="ghost" className="justify-start rounded-md" onClick={() => navigate('home')}>Home</Button>
            <p className="mt-3 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#64748B]">Products</p>
            {CATEGORIES.map(category => (
              <Button key={category} variant="ghost" className="justify-start rounded-md" onClick={() => browse(category)}>
                {category === 'All' ? 'All products' : category}
              </Button>
            ))}
            <Button variant="ghost" className="mt-3 justify-start rounded-md" onClick={() => navigate('capabilities')}>Capabilities</Button>
            <Button variant="ghost" className="justify-start rounded-md" onClick={() => navigate('about')}>About</Button>
            <Button variant="ghost" className="justify-start rounded-md" onClick={() => navigate('contact')}>Contact</Button>
            <Button variant="outline" className="mt-4 rounded-md" onClick={() => navigate('dashboard')}><User size={18} /> My Account</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
