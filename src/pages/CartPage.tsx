import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';

interface CartPageProps {
  onNavigate: (page: string, data?: any) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
        <div className="glass-dark p-12 rounded-3xl text-center max-w-md w-full border border-white/5 shadow-2xl animate-float">
          <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your stash is empty</h2>
          <p className="text-gray-400 mb-8 text-lg">Looks like you haven't added any bots to your kitchen arsenal yet.</p>
          <button 
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 bg-kb-primary hover:bg-kb-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-kb-primary/20 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Explore The Bot Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12 animate-slide-up">
          <h1 className="text-5xl font-black text-white tracking-tighter">
            YOUR <span className="text-amber-500">STASH</span>
          </h1>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          <span className="text-gray-500 font-mono text-sm uppercase tracking-widest">{totalItems} UNITS READY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className="glass-dark rounded-2xl p-6 border border-white/5 flex flex-col sm:flex-row items-center gap-6 group hover:border-kb-primary/30 transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">{item.name}</h3>
                    <p className="text-2xl font-mono text-white">${item.price.toLocaleString()}</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-1">Industrial Grade Components • Certified Unit</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/5">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-mono text-white font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 text-red-400/70 hover:text-red-400 text-sm font-bold transition-colors uppercase tracking-wider"
                    >
                      <Trash2 className="w-4 h-4" />
                      Decommission
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-dark rounded-3xl p-8 border border-white/10 sticky top-32 shadow-2xl shadow-black/50 overflow-hidden group">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl -z-10 group-hover:bg-amber-500/20 transition-all duration-700" />
              
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-amber-500" />
                TRANS MISSION
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Shipping</span>
                  <span className="text-kb-primary font-mono font-bold">COMPLIMENTARY</span>
                </div>
                <div className="h-px bg-white/5 my-6" />
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold text-white">Total</span>
                  <span className="text-4xl font-black text-amber-500 font-mono tracking-tighter">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('checkout')}
                className="w-full bg-kb-primary hover:bg-kb-primary-dark text-white py-5 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-kb-primary/30 flex items-center justify-center gap-3 group/btn"
              >
                INITIATE CHECKOUT
                <ShoppingBag className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-gray-500 text-xs mt-6 font-mono uppercase tracking-widest leading-relaxed">
                SECURE AES-256 ENCRYPTED TRANSACTION • 2-YEAR INDUSTRIAL WARRANTY INCLUDED
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

