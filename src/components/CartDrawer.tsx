import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: any) => void;
}

export default function CartDrawer({ isOpen, onClose, onNavigate }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1E2329]/40 backdrop-blur-md z-[2000] transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-[480px] bg-white z-[2001] shadow-premium flex flex-col transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F0FDF4] rounded-xl flex items-center justify-center text-kb-primary">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[#111827] font-['Outfit']">Your Selection</h2>
              <p className="text-[12px] text-[#94A3B8] font-bold uppercase tracking-widest font-['DM_Sans']">
                {totalItems} Industrial Item{totalItems !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={onClose}
            className="hover:bg-[#F8FAFC] rounded-full group"
          >
            <X className="text-[#94A3B8] group-hover:text-[#111827]" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-[#F8FAFC] rounded-[32px] flex items-center justify-center mb-8 text-[#E2E8F0] border border-[#F1F5F9]">
                <ShoppingBag size={48} />
              </div>
              <h3 className="text-[24px] font-bold text-[#111827] mb-3 font-['Outfit']">Cart is Clear</h3>
              <p className="text-[15px] text-[#64748B] mb-10 font-['DM_Sans'] leading-relaxed">
                Ready to optimize your kitchen? <br /> Browse our fleet of intelligent equipment.
              </p>
              <Button 
                onClick={() => { onClose(); onNavigate?.('products'); }}
                size="lg"
                className="uppercase tracking-widest text-[12px]"
              >
                Browse Catalog
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-6 p-6 bg-white border border-[#F1F5F9] rounded-[32px] group hover:shadow-premium transition-all duration-300"
                >
                  <div className="w-24 h-24 bg-[#F8FAFC] rounded-2xl flex items-center justify-center p-4 shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="font-bold text-[#111827] truncate font-['Outfit'] text-[16px]">{item.name}</h4>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#94A3B8] hover:text-[#EF4444]"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    
                    <p className="text-[18px] font-bold text-[#111827] mb-4 font-['Outfit']">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    
                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] w-fit rounded-lg overflow-hidden h-[36px]">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 hover:bg-[#E2E8F0]"
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="text-[13px] font-bold w-4 text-center font-['Outfit']">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 hover:bg-[#E2E8F0]"
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-8 border-t border-[#F1F5F9] bg-[#F8FAFC]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-widest font-['Outfit']">Estimated Total</span>
                <div className="text-[32px] font-bold text-[#111827] font-['Outfit'] leading-tight">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-kb-primary font-bold font-['DM_Sans'] bg-[#F0FDF4] px-4 py-2 rounded-full border border-[#DCFCE7]">
                <ShieldCheck size={14} />
                Secured
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={() => { onClose(); onNavigate?.('checkout'); }}
                variant="accent"
                size="lg"
                className="w-full text-[16px] uppercase tracking-wider gap-3"
              >
                Continue to Checkout <ArrowRight size={20} />
              </Button>
              
              <Button
                onClick={() => { onClose(); onNavigate?.('cart'); }}
                variant="ghost"
                size="lg"
                className="w-full text-[12px] uppercase tracking-widest text-[#64748B] hover:text-[#111827] hover:bg-[#F1F5F9] border border-[#E2E8F0]"
              >
                View Full Cart
              </Button>
            </div>
            
            <p className="text-center text-[12px] text-[#94A3B8] mt-6 font-['DM_Sans']">
              Shipping and taxes calculated during deployment verification.
            </p>
          </div>
        )}

      </div>
    </>
  );
}
