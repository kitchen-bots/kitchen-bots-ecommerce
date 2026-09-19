import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, ExternalLink, Store } from 'lucide-react';

import { Button } from '../components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const platforms = [
    { name: 'Amazon India', icon: '🛒', tag: 'Prime Eligible', color: '#FF9900', url: '#' },
    { name: 'Flipkart', icon: '📦', tag: 'SuperCoins Eligible', color: '#2874F0', url: '#' },
    { name: 'JioMart', icon: '🏪', tag: 'Jio Partner', color: '#006EB3', url: '#' },
    { name: 'Tata Neu', icon: '⭐', tag: 'NeuCoins Eligible', color: '#000000', url: '#' },
    { name: 'Zepto', icon: '⚡', tag: '10-Minute Delivery', color: '#8B5CF6', url: '#' },
    { name: 'Blinkit', icon: '🟡', tag: 'Blinkit Partner', color: '#F0C528', url: '#' },
    { name: 'IndiaMART', icon: '🏭', tag: 'B2B Platform', color: '#1E7E34', url: '#' },
    { name: 'Swiggy Instamart', icon: '🧡', tag: 'Express Delivery', color: '#FC8019', url: '#' },
];

const directAdvantages = [
    'Widest product range — 15+ models',
    'Manufacturer-direct pricing',
    'Custom and commercial inquiries',
    'Full warranty and GST support',
    'Dedicated post-purchase service',
];

export default function MarketplaceSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const header = section.querySelector('.marketplace-header');
            const cards = section.querySelectorAll('.platform-card');
            const direct = section.querySelector('.direct-box');

            gsap.set(header, { opacity: 0, y: 30 });
            gsap.set(cards, { opacity: 0, y: 40, scale: 0.9 });
            gsap.set(direct, { opacity: 0, x: 40 });

            ScrollTrigger.create({
                trigger: section,
                start: 'top 60%',
                onEnter: () => {
                    gsap.to(header, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
                    gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'expo.out', delay: 0.2 });
                    gsap.to(direct, { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out', delay: 0.4 });
                },
                once: true,
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-[#F7FAF7]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="marketplace-header text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block text-xs font-medium tracking-widest text-[var(--brand-800)] uppercase mb-4">
                        Find Us Everywhere
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] text-[#4A4A4A] mb-4">
                        Available Across India's Top Platforms
                    </h2>
                    <p className="text-lg text-[#4A4A4A]/80">
                        KitchenBots products are listed on every major Indian ecommerce and quick-commerce platform.
                        Shop wherever you're most comfortable — or order direct for the best range and support.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Platform Grid */}
                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {platforms.map((platform, index) => (
                            <a
                                key={index}
                                href={platform.url}
                                className="platform-card group flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-[#E0EAE0] hover:border-[var(--brand-300)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="text-3xl mb-3">{platform.icon}</div>
                                <h3 className="text-sm font-bold text-[#4A4A4A] mb-1">{platform.name}</h3>
                                <span
                                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                    style={{ background: `${platform.color}15`, color: platform.color }}
                                >
                                    {platform.tag}
                                </span>
                                <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-500 mt-2 transition-colors" />
                            </a>
                        ))}
                    </div>

                    {/* Direct Advantage Box */}
                    <div className="direct-box">
                        <div className="bg-[#4A4A4A] rounded-3xl p-8 text-white relative overflow-hidden">
                            {/* Glow */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px]"
                                style={{ background: 'radial-gradient(circle, var(--brand-600) 0%, transparent 70%)' }} />

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-[var(--brand-300)] rounded-2xl flex items-center justify-center mb-4">
                                    <Store className="w-6 h-6 text-[#4A4A4A]" />
                                </div>

                                <h3 className="text-2xl font-bold font-['Outfit'] mb-2">Buy Direct. Best Benefits.</h3>
                                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                                    The official KitchenBots website offers the full product range, direct manufacturer support, and exclusive benefits not available on third-party platforms.
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {directAdvantages.map((adv, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                                            <ShoppingBag className="w-4 h-4 text-[var(--brand-300)] mt-0.5 flex-shrink-0" />
                                            {adv}
                                        </li>
                                    ))}
                                </ul>

                                <Button variant="accent" className="w-full">
                                    Shop Official Store
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
