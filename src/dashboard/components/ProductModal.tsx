import React, { useState, useEffect } from 'react';
import { X, Package, Info } from 'lucide-react';
import InputField from './InputField';
import SelectField from './SelectField';
import TextareaField from './TextareaField';
import UploadField from './UploadField';
import type { Product } from '../data/mockData';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  initialData?: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSave, initialData }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: 'Grills',
    price: 0,
    stock: 0,
    status: 'Active',
    description: '',
    images: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        images: initialData.images || (initialData.image ? [initialData.image] : []),
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        category: 'Cooking Equipment',
        price: 0,
        stock: 0,
        status: 'Active',
        description: '',
        images: [],
      });
    }
    setErrors({});
    setHasChanges(false);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Product name is required';
    if (!formData.sku?.trim()) newErrors.sku = 'SKU is required';
    if ((formData.price ?? 0) <= 0) newErrors.price = 'Please enter a valid price';
    if ((formData.stock ?? 0) < 0) newErrors.stock = 'Stock cannot be negative';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    if (hasChanges) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const finalData = {
        ...formData,
        image: formData.images?.[0] || formData.image,
      };
      onSave(finalData);
      onClose();
    }
  };

  const updateFormData = (updates: Partial<Product>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
    // Live validation if errors already exist
    if (Object.keys(errors).length > 0) {
      const newErrors = { ...errors };
      Object.keys(updates).forEach(key => delete newErrors[key]);
      setErrors(newErrors);
    }
  };

  const handleImageChange = (files: File[]) => {
    // In a real app, you'd upload these to a server
    // For now, we'll create object URLs for preview
    const previews = files.map(f => URL.createObjectURL(f));
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...previews]
    }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--dash-soft-green)] flex items-center justify-center">
              <Package size={20} className="text-[var(--dash-green)]" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold" style={{ color: 'var(--dash-heading)' }}>
                {initialData ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-[12px]" style={{ color: 'var(--dash-muted)' }}>
                Fill in the details to {initialData ? 'update' : 'list'} the equipment.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Product Name"
                placeholder="e.g. Industrial BBQ Smoker"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                error={errors.name}
                required
              />
              <InputField
                label="SKU"
                placeholder="e.g. KB-GR-001"
                value={formData.sku}
                onChange={(e) => updateFormData({ sku: e.target.value })}
                error={errors.sku}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <SelectField
                label="Category"
                value={formData.category}
                onChange={(e) => updateFormData({ category: e.target.value })}
                options={[
                  { value: 'Cooking Equipment', label: 'Cooking Equipment' },
                  { value: 'Mixing & Blending', label: 'Mixing & Blending' },
                  { value: 'Food Display', label: 'Food Display' },
                  { value: 'Ventilation', label: 'Ventilation' },
                  { value: 'Precision Cooking', label: 'Precision Cooking' },
                ]}
              />
              <InputField
                label="Price (₹)"
                type="number"
                value={formData.price}
                onChange={(e) => updateFormData({ price: Number(e.target.value) })}
                error={errors.price}
                required
              />
              <InputField
                label="Stock Level"
                type="number"
                value={formData.stock}
                onChange={(e) => updateFormData({ stock: Number(e.target.value) })}
                error={errors.stock}
                required
              />
            </div>

            <SelectField
              label="Visibility Status"
              value={formData.status}
              onChange={(e) => updateFormData({ status: e.target.value as any })}
              options={[
                { value: 'Active', label: 'Active (Visible to customers)' },
                { value: 'Draft', label: 'Draft (Internal only)' },
                { value: 'Inactive', label: 'Inactive (Out of stock or unavailable)' },
                { value: 'Archived', label: 'Archived (Hidden)' },
              ]}
            />

            <TextareaField
              label="Description"
              placeholder="Detailed specifications and features..."
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              rows={4}
            />

            <UploadField
              label="Product Images"
              hint="Upload high-quality photos (JPG, PNG)"
              multiple={true}
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="p-4 rounded-xl bg-blue-50 flex gap-3 items-start border border-blue-100">
              <Info size={18} className="text-blue-500 mt-0.5" />
              <p className="text-[12px] leading-relaxed text-blue-700">
                Listing your products with detailed descriptions and high-quality images helps in improving search rankings and customer trust.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl text-white text-[14px] font-bold hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: 'var(--dash-green)' }}
            >
              {initialData ? 'Update Product' : 'List Product'}
            </button>
          </div>
        </form>
      </div>

      {/* Discard Changes Confirmation */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white rounded-[20px] p-6 shadow-2xl max-w-sm w-full animate-in zoom-in-95 duration-200">
            <h3 className="text-[18px] font-bold mb-2" style={{ color: 'var(--dash-heading)' }}>Discard Changes?</h3>
            <p className="text-[14px] mb-6" style={{ color: 'var(--dash-muted)' }}>You have unsaved changes. Are you sure you want to close this window?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDiscardConfirm(false)}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-[14px] font-semibold hover:bg-slate-100 transition-colors"
              >
                Keep Editing
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-[14px] font-semibold hover:bg-red-600 transition-colors"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
