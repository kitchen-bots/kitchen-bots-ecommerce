import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Truck, MapPin, Package, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const deliveryZones = [
    {
        icon: '🌆',
        name: 'Metro Cities',
        cities: 'Mumbai • Delhi • Bangalore • Chennai • Hyderabad • Kolkata • Pune • Ahmedabad',
        timeline: '3–5 Business Days',
        color: '#4A4A4A',
    },
    {
        icon: '🏙️',
        name: 'Tier 2 Cities',
        cities: 'Jaipur • Surat • Lucknow • Nagpur • Indore • Bhopal • Visakhapatnam • Kochi',
        timeline: '4–7 Business Days',
        color: '#156331',
    },
    {
        icon: '🗺️',
        name: 'Remote & Rural',
        cities: 'All remaining PIN codes covered via our extended delivery network',
        timeline: '7–10 Business Days',
        color: '#4A4A4A',
    },
];

const logisticsFeatures = [
    { icon: Truck, title: 'Pan-India Network', description: 'Delivery to 19,000+ PIN codes across all 28 states and 8 union territories.' },
    { icon: Package, title: 'Heavy-Duty Packaging', description: 'Double-boxed with foam corners and reinforced crating for large grills.' },
    { icon: MapPin, title: 'Real-Time Tracking', description: 'Track your order with a live link sent within 24 hours of dispatch.' },
    { icon: Clock, title: 'Dispatch Within 24hrs', description: 'In-stock orders dispatched within 1 business day of confirmed payment.' },
];

export default function DeliverySection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const header = section.querySelector('.delivery-header');
            const zones = section.querySelectorAll('.delivery-zone');
            const features = section.querySelectorAll('.delivery-feature');

            gsap.set(header, { opacity: 0, y: 30 });
            gsap.set(zones, { opacity: 0, y: 40 });
            gsap.set(features, { opacity: 0, x: -30 });

            ScrollTrigger.create({
                trigger: section,
                start: 'top 60%',
                onEnter: () => {
                    gsap.to(header, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
                    gsap.to(zones, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'expo.out', delay: 0.2 });
                    gsap.to(features, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'expo.out', delay: 0.4 });
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
                <div className="delivery-header text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block text-xs font-medium tracking-widest text-[var(--brand-800)] uppercase mb-4">
                        Nationwide Reach
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-['Outfit'] text-[#4A4A4A] mb-4">
                        We Deliver Everywhere in India
                    </h2>
                    <p className="text-lg text-[#4A4A4A]/80 leading-relaxed">
                        From Leh to Kanyakumari, from Dwarka to Arunachal — KitchenBots grills reach every corner of India
                        through our express logistics network.
                    </p>
                </div>

                {/* Delivery Zones */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {deliveryZones.map((zone, index) => (
                        <div
                            key={index}
                            className="delivery-zone p-8 rounded-3xl border border-[#E0EAE0] bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="text-4xl mb-4">{zone.icon}</div>
                            <h3 className="text-xl font-bold font-['Outfit'] text-[#4A4A4A] mb-2">{zone.name}</h3>
                            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{zone.cities}</p>
                            <div
                                className="inline-block px-4 py-2 rounded-full text-sm font-bold"
                                style={{ background: `${zone.color}15`, color: zone.color }}
                            >
                                {zone.timeline}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logistics Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#4A4A4A] rounded-[40px] p-10">
                    {logisticsFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="delivery-feature text-center">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-[var(--brand-300)]" />
                                </div>
                                <h4 className="text-white font-semibold font-['Outfit'] mb-2">{feature.title}</h4>
                                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
