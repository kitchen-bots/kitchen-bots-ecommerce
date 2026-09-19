import { useState } from 'react';
import { Package, Plus, Pencil, Trash2, AlertTriangle, Layers, FileDown } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import StatusBadge from '../../components/StatusBadge';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import ProductModal from '../../components/ProductModal';
import StatCard from '../../components/StatCard';
import { mockProducts } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import type { Product } from '../../data/mockData';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Stats
  const stats = {
    total: products.length,
    outOfStock: products.filter((p: Product) => p.stock === 0).length,
    lowStock: products.filter((p: Product) => p.stock > 0 && p.stock < 5).length,
    categories: new Set(products.map((p: Product) => p.category)).size
  };

  const filtered = products.filter((p: Product) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStock = stockFilter === 'All' || 
                        (stockFilter === 'Out of Stock' && p.stock === 0) ||
                        (stockFilter === 'Low Stock' && p.stock > 0 && p.stock < 5);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (selectedProduct) {
      setProducts((prev: Product[]) => prev.map((p: Product) => p.id === selectedProduct.id ? { ...p, ...productData } as Product : p));
      showNotification('Product updated successfully');
    } else {
      const newProduct: Product = {
        ...productData,
        id: `prod-${Date.now()}`,
      } as Product;
      setProducts((prev: Product[]) => [newProduct, ...prev]);
      showNotification('New product added successfully');
    }
  };

  const handleExport = () => {
    const headers = ['Name', 'SKU', 'Category', 'Price', 'Stock', 'Status'];
    const csvData = filtered.map((p: Product) => [
      p.name,
      p.sku,
      p.category,
      p.price,
      p.stock,
      p.status
    ]);
    
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `kitchenbots-inventory-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
            Inventory Management
          </h1>
          <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Track stock levels, prices, and product details.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-[14px] font-medium hover:bg-slate-50 transition-colors">
            <FileDown size={16} /> Export
          </button>
          <button 
            onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-[14px] font-semibold hover:opacity-90 transition-opacity shadow-lg"
            style={{ background: 'var(--dash-green)' }}>
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Products" value={stats.total} icon={<Package size={20} />} trend="+3" color="blue" />
        <StatCard label="Categories" value={stats.categories} icon={<Layers size={20} />} color="purple" />
        <StatCard label="Low Stock" value={stats.lowStock} icon={<AlertTriangle size={20} />} trend={stats.lowStock > 0 ? "Check" : undefined} color="orange" />
        <StatCard label="Out of Stock" value={stats.outOfStock} icon={<AlertTriangle size={20} />} color="red" />
      </div>

      {/* ── FILTERS ── */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or SKU..." />
        </div>
        <div className="flex flex-wrap gap-3">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-[14px] outline-none bg-white min-w-[140px]">
            <option value="All">All Categories</option>
            <option value="Grills">Grills</option>
            <option value="Smokers">Smokers</option>
            <option value="Accessories">Accessories</option>
          </select>
          <select 
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-[14px] outline-none bg-white min-w-[140px]">
            <option value="All">All Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="dash-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: Product) => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#DDF3E4' }}>
                        <Package size={16} color="#1A7A3C" />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px]" style={{ color: 'var(--dash-heading)' }}>{p.name}</p>
                        {p.description && <p className="text-[12px] truncate max-w-[200px]" style={{ color: 'var(--dash-muted)' }}>{p.description}</p>}
                      </div>
                    </div>
                  </td>
                  <td><code className="text-[12px] px-2 py-0.5 rounded-[6px]" style={{ background: '#F3F4F6', color: 'var(--dash-muted)' }}>{p.sku}</code></td>
                  <td><span style={{ color: 'var(--dash-body)' }}>{p.category}</span></td>
                  <td><span className="font-bold" style={{ color: 'var(--dash-heading)' }}>{formatCurrency(p.price)}</span></td>
                  <td>
                    <span className={`font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock < 5 ? 'text-[#E8940A]' : ''}`}
                      style={p.stock >= 5 ? { color: 'var(--dash-heading)' } : {}}>
                      {p.stock === 0 ? 'Out of stock' : p.stock}
                    </span>
                  </td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setSelectedProduct(p); setIsModalOpen(true); }}
                        className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
                        <Pencil size={15} className="text-slate-400" />
                      </button>
                      <button 
                        onClick={() => setDeleteId(p.id)}
                        className="w-9 h-9 rounded-xl hover:bg-red-50 flex items-center justify-center transition-colors">
                        <Trash2 size={15} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p style={{ color: 'var(--dash-muted)' }}>No products found</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          setProducts((p: Product[]) => p.filter((x: Product) => x.id !== deleteId));
          setDeleteId(null);
          showNotification('Product deleted successfully');
        }}
        title="Delete Product"
        message="This will permanently remove the product from the catalog."
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedProduct(null); }}
        onSave={handleSaveProduct}
        initialData={selectedProduct}
      />

      {/* ── NOTIFICATION TOAST ── */}
      {notification && (
        <div 
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-4 duration-300"
        >
          <div className={`px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border ${
            notification.type === 'success' 
              ? 'bg-[#1A7A3C] border-[#14532D] text-white' 
              : 'bg-red-600 border-red-700 text-white'
          }`}>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              {notification.type === 'success' ? <Package size={14} /> : <AlertTriangle size={14} />}
            </div>
            <p className="text-[14px] font-semibold tracking-wide">{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
