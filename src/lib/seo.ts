import type { Product } from '../types/product';

/** Per-page SEO metadata */
export interface SEOMeta {
    title: string;
    description: string;
    ogImage?: string;
    ogType?: string;
    canonical?: string;
}

/** Default SEO for each static page */
export const PAGE_SEO: Record<string, SEOMeta> = {
    home: {
        title: 'KitchenBots India | Commercial BBQ Grills & Kitchen Equipment',
        description:
            'KitchenBots India Pvt. Ltd. manufactures heavy-duty commercial BBQ grills, rocket stoves, and industrial kitchen equipment. Pan India delivery. Call: +91 9490701421',
        ogImage: '/images/og-home.jpg',
        ogType: 'website',
    },
    products: {
        title: 'Industrial Kitchen Products | KitchenBots India',
        description:
            'Explore our high-performance fleet: Automatic BBQ Grills, Santa Maria Series, Rocket Stoves, and more. Built for commercial excellence.',
        ogImage: '/images/og-products.jpg',
        ogType: 'website',
    },
    about: {
        title: 'Our Story | KitchenBots India',
        description:
            'The premier manufacturer of heavy-duty cooking systems in India. Learn about our commitment to engineering perfection and customer success.',
        ogImage: '/images/og-about.jpg',
        ogType: 'website',
    },
    contact: {
        title: 'Get a Quote | KitchenBots India',
        description:
            'Request a bulk quote for your commercial kitchen. Fast response within 24 hours. GST invoices provided for all business orders.',
        ogImage: '/images/og-contact.jpg',
        ogType: 'website',
    },
    policies: {
        title: 'Customer Policies | KitchenBots India',
        description:
            'Shipping, Warranty, and Return policies for KitchenBots India. Transparency and reliability for every customer.',
        ogImage: '/images/og-home.jpg',
        ogType: 'website',
    },
    capabilities: {
        title: 'Manufacturing Capabilities | KitchenBots India',
        description:
            'From custom fabrication to after-sales support, see why KitchenBots is the trusted choice for commercial kitchen setups.',
        ogImage: '/images/og-home.jpg',
        ogType: 'website',
    },
    blog: {
        title: 'Blog & Recipes | KitchenBots India',
        description:
            'Commercial cooking tips, maintenance guides, and innovative recipes from the KitchenBots engineering team.',
        ogImage: '/images/og-home.jpg',
        ogType: 'website',
    },
    login: {
        title: 'Secure Login | KitchenBots India',
        description: 'Login to manage your orders and wishlist.',
        ogImage: '/images/og-home.jpg',
        ogType: 'website',
    },
    cart: {
        title: 'Shopping Cart | KitchenBots India',
        description: 'Review selected equipment and request a confirmed order quote from KitchenBots India.',
        ogImage: '/images/og-home.jpg',
        ogType: 'website',
    },
};


/** Returns SEO metadata for a product detail page */
export function getProductSEO(product: Product): SEOMeta {
    return {
        title: `${product.name} | KitchenBots India`,
        description: product.shortDescription || product.description || '',
        ogImage: product.thumbnail ?? product.image,
        ogType: 'product',
        canonical: `/products/${product.id}`,
    };
}

/** Returns a JSON-LD Product schema string for injection into <script> tags */
export function getProductJsonLd(product: Product): string {
    const schema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: [product.thumbnail ?? product.image],
        description: product.description || product.shortDescription || '',
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: 'KitchenBots India',
        },
        offers: {
            '@type': 'Offer',
            url: `https://kitchenbots.in/products/${product.id}`,
            priceCurrency: 'INR',
            price: product.price,
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: 'KitchenBots India',
            },
        },
    };
    return JSON.stringify(schema, null, 2);
}
