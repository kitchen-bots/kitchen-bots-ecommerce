import type { Product } from '../types/product';
import { getMediaUrl } from '../lib/cdn';

const RAW_PRODUCTS: Product[] = [
{
    id: 'prod-1',
    name: 'Commercial BBQ Grill',
    category: 'Santa Maria Series',
    price: 18000,
    mrp: 22000,
    featured: true,
    image: '/images/products/kb-commercial-bbq.webp',
    images: ['/images/products/kb-commercial-bbq.webp'],
    description: 'Stainless steel commercial charcoal/gas BBQ grill built for heavy use.',
    features: ['Stainless Steel', 'Heavy Duty', 'Even Heat'],
    specifications: { 'Material': 'Stainless Steel' },
},
{
    id: 'prod-2',
    name: 'Rocket Stove (Single Burner)',
    category: 'Rocket Stoves',
    price: 8500,
    mrp: 11000,
    featured: true,
    image: '/images/products/kb-rocket-stove.webp',
    images: [
        '/images/products/kb-rocket-stove.webp',
        '/images/products/6_Visualise Files - Rocket Stove_150MM/Rocket Stove (Single Burner)- Paint Model 1.jpg',
        '/images/products/6_Visualise Files - Rocket Stove_150MM/Rocket Stove (Single Burner)- Paint Model 2.jpg',
        '/images/products/6_Visualise Files - Rocket Stove_150MM/Rocket Stove (Single Burner)- Paint Model 3.jpg'
    ],
    description: 'Highly efficient single burner rocket stove for outdoor/commercial cooking.',
    features: ['High Heat Output', 'Fuel Efficient', 'Portable'],
    specifications: { 'Material': 'Steel', 'Burners': 'Single' },
},
{
    id: 'prod-3',
    name: 'Food Processing Machine',
    category: 'Accessories',
    price: 45000,
    mrp: 55000,
    featured: true,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
    images: ['https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600'],
    description: 'Industrial food mixer and processor for high-capacity hotel kitchens.',
    features: ['High Capacity', 'Stainless Steel Bowl', 'Variable Speed'],
    specifications: { 'Material': 'Stainless Steel', 'Motor': 'Commercial Grade' },
},
{
    id: 'prod-4',
    name: 'Street Food Griddle',
    category: 'Accessories',
    price: 12000,
    mrp: 15000,
    featured: true,
    image: '/images/products/kb-street-food-griddle.webp',
    images: ['/images/products/kb-street-food-griddle.webp'],
    description: 'Commercial flat griddle/tawa for rapid street food preparation.',
    features: ['Thick Hot Plate', 'Even Heating', 'Easy to Clean'],
    specifications: { 'Material': 'Mild Steel/Stainless', 'Type': 'Flat Tawa' },
},
{
    id: 'prod-5',
    name: 'Flip BBQ Height Adjustable',
    category: 'Collapsible BBQ',
    price: 15000,
    featured: false,
    image: '/images/products/kb-flip-bbq-adj.webp',
    images: [
        '/images/products/kb-flip-bbq-adj.webp',
        '/images/products/2_Visualise Files - Flip Base Height Adjustable/Flip High Adjustable Base- Paint Model 1.jpg',
        '/images/products/2_Visualise Files - Flip Base Height Adjustable/Flip High Adjustable Base- Paint Model 2.jpg'
    ],
    description: 'Premium Flip BBQ with fully adjustable height base.',
    features: ['Height Adjustable Base', 'Flip Grill Design', 'Premium Build'],
    specifications: { 'Material': 'Stainless Steel', 'Height': 'Adjustable' },
},
{
    id: 'prod-6',
    name: 'Collapsible BBQ Large',
    category: 'Collapsible BBQ',
    price: 12000,
    featured: false,
    image: '/images/products/kb-collapsible-bbq-big.webp',
    images: [
        '/images/products/kb-collapsible-bbq-big.webp',
        '/images/products/3_Visualise Files - Collapsible_BBQ/Collapsible_BBQ- Paint Model 1.jpg',
        '/images/products/3_Visualise Files - Collapsible_BBQ/Collapsible_BBQ- Paint Model 2.jpg'
    ],
    description: 'Large heavy-duty collapsible BBQ for commercial spaces.',
    features: ['High Capacity', 'Foldable Legs', 'Heavy Duty'],
    specifications: { 'Material': 'Stainless Steel', 'Type': 'Collapsible' },
},
{
    id: 'prod-7',
    name: 'Collapsible Flip Combo',
    category: 'Collapsible BBQ',
    price: 24500,
    featured: false,
    image: '/images/products/kb-collapsible-flip.webp',
    images: [
        '/images/products/kb-collapsible-flip.webp',
        '/images/products/4_Visualise Files  - Collapsible_Flip/Collapsible -Flip Combo- Paint Model 1.jpg',
        '/images/products/4_Visualise Files  - Collapsible_Flip/Collapsible -Flip Combo- Paint Model 2.jpg'
    ],
    description: 'Ultimate combination of the collapsible frame and flip grill.',
    features: ['Combo Unit', 'Ultimate Flexibility', 'Easy Setup'],
    specifications: { 'Material': 'Stainless Steel', 'Combo': 'Yes' },
},
{
    id: 'prod-8',
    name: 'Collapsible BBQ Small',
    category: 'Collapsible BBQ',
    price: 6200,
    featured: false,
    image: '/images/products/kb-collapsible-bbq-small.webp',
    images: [
        '/images/products/kb-collapsible-bbq-small.webp',
        '/images/products/5_Visualise Files  - Collapsible_BBQ Small/Collapsible_BBQ Small- Paint Model 1.jpg',
        '/images/products/5_Visualise Files  - Collapsible_BBQ Small/Collapsible_BBQ Small- Paint Model 2.jpg'
    ],
    description: 'Small footprint collapsible BBQ perfect for outdoor spaces.',
    features: ['Small Footprint', 'Collapsible', 'Quick Heating'],
    specifications: { 'Material': 'Painted Steel', 'Type': 'Collapsible Small' },
},
{
    id: 'prod-9',
    name: 'Rocket Stove 150MM',
    category: 'Rocket Stoves',
    price: 3499,
    featured: false,
    image: '/images/products/kb-rocket-stove-150.webp',
    images: [
        '/images/products/kb-rocket-stove-150.webp',
        '/images/products/6_Visualise Files - Rocket Stove_150MM/Rocket Stove (Single Burner)- Paint Model 1.jpg',
        '/images/products/6_Visualise Files - Rocket Stove_150MM/Rocket Stove (Single Burner)- Paint Model 2.jpg'
    ],
    description: 'High efficiency 150mm rocket stove.',
    features: ['Efficiency Burner', '150MM Output', 'Heat Focused'],
    specifications: { 'Material': 'Painted Steel', 'Size': '150MM' },
},
{
    id: 'prod-10',
    name: 'Rocket Stove Collapsible',
    category: 'Rocket Stoves',
    price: 4200,
    featured: false,
    image: '/images/products/kb-rocket-stove-coll.webp',
    images: [
        '/images/products/kb-rocket-stove-coll.webp',
        '/images/products/7_Visualise Files - Rocket Stove_Collapsible/Rocket Stove - Collapsible- Paint Model 1.jpg',
        '/images/products/7_Visualise Files - Rocket Stove_Collapsible/Rocket Stove - Collapsible- Paint Model 2.jpg'
    ],
    description: 'Easily transportable collapsible rocket stove.',
    features: ['Collapsible Design', 'Fuel Efficient', 'Backpacking Ready'],
    specifications: { 'Material': 'Painted Steel', 'Type': 'Collapsible' },
},
{
    id: 'prod-11',
    name: 'Automatic BBQ',
    category: 'Automatic BBQ',
    price: 12999,
    featured: false,
    image: '/images/products/kb-auto-bbq-ss.webp',
    images: [
        '/images/products/kb-auto-bbq-ss.webp',
        '/images/products/8_Visualise Renders  - Automatic BBQ/Automatic BBQ SS Model 2.png',
        '/images/products/8_Visualise Renders  - Automatic BBQ/Automatic BBQ SS Model 3.png',
        '/images/products/8_Visualise Renders  - Automatic BBQ/Automatic BBQ SS Model 4.png'
    ],
    description: 'Industrial grade automatic rotisserie BBQ.',
    features: ['Automated Grilling', 'Even Heat Distribution', 'Rotisserie Setup'],
    specifications: { 'Material': 'Stainless/Painted', 'Automation': 'Yes' },
},
{
    id: 'prod-12',
    name: 'Santa Maria Grill Medium',
    category: 'Santa Maria Series',
    price: 55000,
    featured: false,
    image: '/images/products/kb-santa-maria-med.webp',
    images: [
        '/images/products/kb-santa-maria-med.webp',
        '/images/products/9_Visualise Files -Santa Maria Grill Medium/SantaMaria BBQ Meduim- Paint Model 1.jpg',
        '/images/products/9_Visualise Files -Santa Maria Grill Medium/SantaMaria BBQ Meduim- Paint Model 2.jpg'
    ],
    description: 'Medium sized professional Santa Maria Grill with adjustable grate.',
    features: ['Adjustable Grate Height', 'Wood Fire Pan', 'Medium Pro Size'],
    specifications: { 'Material': 'Stainless/Painted', 'Size': 'Medium' },
}
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map(p => ({
    ...p,
    image: getMediaUrl(p.image),
    images: (p.images || []).map(img => getMediaUrl(img)),
}));

export const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
