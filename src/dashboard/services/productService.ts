import { mockProducts } from '../data/mockData';
import type { Product } from '../data/mockData';

let products = [...mockProducts];

export const productService = {
  getAll: () => [...products],

  getById: (id: string) => products.find(p => p.id === id) ?? null,

  getByCategory: (category: string) => products.filter(p => p.category === category),

  getCategories: () => [...new Set(products.map(p => p.category))],

  search: (query: string) => {
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  },

  create: (data: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...data,
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    products.push(newProduct);
    return newProduct;
  },

  update: (id: string, data: Partial<Product>): Product | null => {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...data };
    return products[idx];
  },

  duplicate: (id: string): Product | null => {
    const src = products.find(p => p.id === id);
    if (!src) return null;
    const dup: Product = {
      ...src,
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      sku: `${src.sku}-COPY`,
      name: `${src.name} (Copy)`,
      status: 'Draft',
      createdAt: new Date().toISOString().split('T')[0],
    };
    products.push(dup);
    return dup;
  },

  archive: (id: string): boolean => {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    products[idx].status = 'Archived';
    return true;
  },

  delete: (id: string): boolean => {
    const prev = products.length;
    products = products.filter(p => p.id !== id);
    return products.length < prev;
  },

  getStats: () => ({
    total: products.length,
    active: products.filter(p => p.status === 'Active').length,
    draft: products.filter(p => p.status === 'Draft').length,
    archived: products.filter(p => p.status === 'Archived').length,
    outOfStock: products.filter(p => p.stock === 0).length,
  }),
};
