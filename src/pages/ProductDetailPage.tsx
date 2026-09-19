import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Check, Play, Shield, Flame, Hammer, Layers, Users, Share2, Heart, X, ZoomIn, ShoppingCart } from 'lucide-react';
import { useCart } from '../modules/cart-system';
import { useWishlist } from '../hooks/use-wishlist';
import { useToast } from '../hooks/use-toast';
import { PRODUCTS, getProductById } from '../data/products';
import ViewportVideo from '../components/ViewportVideo';
import SEOHead from '../components/SEOHead';
import { getProductSEO, getProductJsonLd } from '../lib/seo';
import { trackViewProduct } from '../lib/analytics';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}

type DetailsTab = 'overview' | 'specs' | 'dimensions' | 'usage' | 'warranty';

export default function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = getProductById(productId) || PRODUCTS[0];

  const [activeTab, setActiveTab] = useState<DetailsTab>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0, show: false });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    trackViewProduct({
      productId: product.id,
      productName: product.name,
      category: product.category,
      price: product.price,
    });

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.reveal');
      gsap.fromTo(elements, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, [productId, product.id, product.name, product.category, product.price]);

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setIsAdded(true);
    showToast(`${product.name} Secured`, 'View Cart', () => onBack && onBack());
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.host + '/#product-' + product.id);
    showToast('Specs Link Copied');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setMagnifierPos({ x, y, show: true });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(price);

  const seo = getProductSEO(product);
  const jsonLd = getProductJsonLd(product);

  return (
    <>
      <SEOHead {...seo} jsonLd={jsonLd} />
      <section ref={sectionRef} className="pt-32 pb-24 bg-[var(--kb-surface)] min-h-screen overflow-x-hidden">
        <div className="container mx-auto px-6">
          
          {/* NAVIGATION BREADCRUMB */}
          <div className="flex items-center justify-between mb-12 reveal">
            <Button
              variant="ghost"
              onClick={onBack}
              className="group flex items-center gap-4 text-[var(--kb-text-muted)] hover:text-[var(--kb-charcoal)] transition-colors h-auto p-0 hover:bg-transparent"
            >
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all group-hover:border-[var(--kb-primary)] group-hover:bg-[var(--kb-primary)] group-hover:text-white">
                <ArrowLeft size={18} />
              </div>
              <span className="text-[13px] font-black uppercase tracking-widest">Return to Series</span>
            </Button>
            
            <div className="flex gap-3">
              <Button 
                variant="outline"
                size="icon-lg"
                onClick={handleShare}
                className="size-12 rounded-full border-gray-200 text-[var(--kb-charcoal)] hover:border-[var(--kb-primary)] hover:text-[var(--kb-primary)]"
              >
                <Share2 size={18} />
              </Button>
              <Button 
                variant="outline"
                size="icon-lg"
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "size-12 rounded-full border-gray-200 transition-all",
                  isInWishlist(product.id) ? 'bg-red-50 border-red-100 text-red-500 hover:bg-red-100' : 'text-[var(--kb-charcoal)] hover:border-red-400 hover:text-red-400'
                )}
              >
                <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
            
            {/* GALLERY SIDE */}
            <div className="reveal space-y-8">
              <div className="relative aspect-square bg-white rounded-[48px] border border-gray-100 overflow-hidden shadow-premium-sm group/viewer">
                {/* Image Lens / Video */}
                <div className="w-full h-full p-12">
                  {showVideo && product.videoPath ? (
                    <div className="w-full h-full rounded-[32px] overflow-hidden bg-black shadow-2xl">
                      <ViewportVideo src={product.videoPath} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div 
                      className="w-full h-full relative cursor-zoom-in flex items-center justify-center"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setMagnifierPos(prev => ({ ...prev, show: false }))}
                      onClick={() => setIsLightboxOpen(true)}
                    >
                      <img 
                        src={product.images[activeImageIndex]} 
                        alt={product.name} 
                        className="max-w-full max-h-full object-contain transition-transform duration-700"
                      />
                      
                      {/* Desktop Magnifier Lens */}
                      {magnifierPos.show && (
                        <div 
                          className="hidden lg:block absolute pointer-events-none border-4 border-white rounded-full shadow-2xl z-50 overflow-hidden"
                          style={{
                            width: '300px',
                            height: '300px',
                            left: `${magnifierPos.x}%`,
                            top: `${magnifierPos.y}%`,
                            transform: 'translate(-50%, -50%)',
                            backgroundImage: `url(${product.images[activeImageIndex]})`,
                            backgroundPosition: `${magnifierPos.x}% ${magnifierPos.y}%`,
                            backgroundSize: '1800px', 
                            backgroundRepeat: 'no-repeat'
                          }}
                        />
                      )}

                      <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/viewer:opacity-100 transition-opacity">
                        <ZoomIn size={20} className="text-[var(--kb-charcoal)]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Media Selectors */}
                <div className="absolute top-8 left-8 flex gap-2">
                  <Button
                    onClick={() => setShowVideo(false)}
                    variant={!showVideo ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full uppercase tracking-widest",
                      !showVideo ? 'bg-[var(--kb-charcoal)] text-white shadow-xl' : 'bg-white/90 backdrop-blur-md text-gray-500 border-gray-100'
                    )}
                  >
                    Gallery
                  </Button>
                  {product.videoPath && (
                    <Button
                      onClick={() => setShowVideo(true)}
                      variant={showVideo ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "rounded-full uppercase tracking-widest gap-2",
                        showVideo ? 'bg-[var(--kb-charcoal)] text-white shadow-xl' : 'bg-white/90 backdrop-blur-md text-gray-500 border-gray-100'
                      )}
                    >
                      <Play size={12} fill="currentColor" /> Blueprint In Motion
                    </Button>
                  )}
                </div>
              </div>

              {/* THUMBNAILS GRID */}
                <div className="grid grid-cols-5 gap-4 px-2">
                  {product.images.map((img, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "relative aspect-square rounded-2xl overflow-hidden p-0 transition-all duration-300 h-auto",
                        activeImageIndex === idx ? 'border-[var(--kb-primary)] shadow-lg' : 'border-transparent hover:border-gray-300'
                      )}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 bg-black/5 transition-opacity ${activeImageIndex === idx ? 'opacity-0' : 'opacity-100'}`} />
                    </Button>
                  ))}
                </div>
            </div>

            {/* CONTENT SIDE */}
            <div className="reveal flex flex-col pt-4">
              <div className="mb-6">
                <span className="inline-block text-[11px] font-black text-[var(--kb-primary)] tracking-[0.2em] uppercase mb-4 px-4 py-1.5 bg-[var(--kb-primary)]/5 rounded-full">
                  {product.category} — Engineering Specs
                </span>
                <h1 className="text-4xl md:text-[56px] font-bold text-[var(--kb-charcoal)] leading-[1.1] mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {product.name}
                </h1>
                <p className="text-xl text-[var(--kb-text-muted)] leading-relaxed font-medium">
                  {product.shortDescription}
                </p>
              </div>

              <div className="flex items-center gap-12 mb-12 p-8 bg-white rounded-[32px] border border-gray-100 shadow-premium-sm">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Standard Unit Price</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-[var(--kb-charcoal)]">
                      {formatPrice(product.price)}
                    </span>
                    {product.mrp && (
                      <span className="text-lg text-gray-300 line-through">
                        {formatPrice(product.mrp)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-100" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Stock Status</span>
                  <div className="flex items-center gap-2 text-[var(--kb-primary)] font-bold">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--kb-primary)] animate-pulse" />
                    Available For Deployment
                  </div>
                </div>
              </div>

              {/* ACTION SYSTEM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className={cn(
                    "h-20 rounded-3xl text-[16px] transition-all duration-300 shadow-premium-lg",
                    isAdded ? "bg-green-500 hover:bg-green-600 text-white" : ""
                  )}
                >
                  {isAdded ? (
                    <><Check className="w-6 h-6 stroke-[3px]" /> Logged In Cart</>
                  ) : (
                    <><ShoppingCart className="w-6 h-6 transition-transform group-hover:rotate-12" /> Add To Inventory</>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-20 rounded-3xl border-2 text-[16px] shadow-premium-sm"
                >
                  Project Proposal
                </Button>
              </div>

              {/* TECHNICAL TABS */}
              <div className="flex gap-10 border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
                {(['overview', 'specs', 'dimensions', 'usage'] as const).map((tab) => (
                  <Button
                    key={tab}
                    variant="ghost"
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "pb-4 h-auto px-0 rounded-none text-[12px] font-black uppercase tracking-widest transition-all relative border-b-4 border-transparent hover:bg-transparent",
                      activeTab === tab ? 'text-[var(--kb-charcoal)]' : 'text-gray-400 hover:text-[var(--kb-charcoal)]'
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-[var(--kb-primary)] rounded-full animate-grow-x" />
                    )}
                  </Button>
                ))}
              </div>

              <div className="min-h-[200px]">
                {activeTab === 'overview' && (
                  <div className="space-y-6 animate-fade-in">
                    <p className="text-[17px] text-[var(--kb-text-muted)] leading-[1.8]">
                      {product.description ?? `The KitchenBots ${product.name} represents the pinnacle of industrial thermal engineering. Each unit is stress-tested in our Bangalore facility to ensure consistent performance under heavy commercial loads.`}
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-white rounded-3xl border border-gray-100 flex items-start gap-4">
                        <div className="w-12 h-12 bg-[var(--kb-primary)]/5 rounded-2xl flex items-center justify-center text-[var(--kb-primary)]">
                          <Shield size={22} />
                        </div>
                        <div>
                          <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">Integrity</span>
                          <span className="text-[14px] font-bold text-[var(--kb-charcoal)]">{product.durability}</span>
                        </div>
                      </div>
                      <div className="p-6 bg-white rounded-3xl border border-gray-100 flex items-start gap-4">
                        <div className="w-12 h-12 bg-[var(--kb-orange)]/5 rounded-2xl flex items-center justify-center text-[var(--kb-orange)]">
                          <Flame size={22} />
                        </div>
                        <div>
                          <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">Thermal Range</span>
                          <span className="text-[14px] font-bold text-[var(--kb-charcoal)]">{product.heatResistance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'specs' && (
                  <div className="animate-fade-in bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-premium-sm">
                    <table className="w-full text-left">
                      <tbody>
                        {product.specs?.map((spec, i: number) => (
                          <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-[var(--kb-surface)] transition-colors">
                            <td className="py-5 px-8 text-[12px] font-black text-gray-400 uppercase tracking-widest w-1/3 bg-gray-50/50">
                              {spec.label}
                            </td>
                            <td className="py-5 px-8 text-[15px] font-bold text-[var(--kb-charcoal)]">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === 'dimensions' && (
                  <div className="p-10 bg-[var(--kb-charcoal)] rounded-[32px] text-white animate-fade-in relative overflow-hidden">
                    <Layers className="w-12 h-12 text-white/10 absolute -top-4 -right-4" />
                    <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-6 opacity-40">Operational Footprint</h4>
                    <p className="text-2xl font-bold leading-relaxed mb-8">
                      {product.dimensions || '38.5" L × 24.0" W × 42.0" H'}
                    </p>
                    <div className="flex gap-2">
                       <span className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase">CAD Certified</span>
                       <span className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase">Standard Mount</span>
                    </div>
                  </div>
                )}
                {activeTab === 'usage' && (
                  <div className="animate-fade-in space-y-6">
                    <p className="text-[15px] text-[var(--kb-text-muted)] font-medium">Verified performance benchmarks for the following environments:</p>
                    <div className="grid grid-cols-1 gap-3">
                      {(product.usage || 'High-volume Hospitality, Outdoor Catering, Industrial Kitchens').split(', ').map((u, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-50 shadow-sm group hover:border-[var(--kb-primary)] transition-all">
                          <div className="w-10 h-10 rounded-full bg-[var(--kb-primary)]/5 flex items-center justify-center text-[var(--kb-primary)] border border-[var(--kb-primary)]/10">
                            <Check size={16} strokeWidth={3} />
                          </div>
                          <span className="text-[15px] font-bold text-[var(--kb-charcoal)]">{u}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LOWER SECTION: TECHNICAL PILLARS */}
          <div className="reveal pt-24 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-xl">
                <span className="text-[11px] font-black text-[var(--kb-primary)] uppercase tracking-widest mb-4 block">Quality Assurance</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--kb-charcoal)] leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  The <span className="italic text-[var(--kb-primary)]">Engineering</span> Standard
                </h2>
              </div>
              <p className="text-[var(--kb-text-muted)] text-[16px] font-medium max-w-sm">
                Each component is rigorously stress-tested to 200% of standard output requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Hammer />, title: 'Material', value: product.material ?? 'Aerospace Mild Steel' },
                { icon: <Flame />, title: 'Hardness', value: product.heatResistance ?? 'Heat Treated 800°C' },
                { icon: <Shield />, title: 'Integrity', value: product.durability ?? 'Lifetime Structural' },
                { icon: <Users />, title: 'Capacity', value: product.cookingCapacity ?? 'Variable/Modular' }
              ].map((pillar, i) => (
                <div key={i} className="group p-10 bg-white rounded-[40px] border border-gray-100 shadow-premium-sm transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-2">
                  <div className="w-16 h-16 bg-[var(--kb-surface)] rounded-3xl flex items-center justify-center text-[var(--kb-charcoal)] mb-8 transition-colors group-hover:bg-[var(--kb-charcoal)] group-hover:text-white">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--kb-charcoal)] mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>{pillar.title}</h3>
                  <p className="text-[14px] font-bold text-[var(--kb-text-muted)]">{pillar.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LIGHTBOX MODAL */}
        {isLightboxOpen && (
          <div className="fixed inset-0 z-[5000] bg-[var(--kb-charcoal)]/98 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in p-8">
            <Button 
              variant="ghost"
              size="icon-lg"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-8 right-8 size-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-[5001]"
            >
              <X size={32} />
            </Button>
            <img 
              src={product.images[activeImageIndex]} 
              alt={product.name} 
              className="max-w-full max-h-[80vh] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
            />
            <div className="mt-12 flex gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
              {product.images.map((img, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => setActiveImageIndex(i)}
                  className={cn(
                    "w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all p-0",
                    activeImageIndex === i ? 'border-white' : 'border-white/10 opacity-40 hover:opacity-100'
                  )}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </Button>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

