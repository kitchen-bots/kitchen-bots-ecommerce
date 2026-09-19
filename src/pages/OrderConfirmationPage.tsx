import { CheckCircle2, Package, MapPin, CreditCard, ChevronRight, Download, ShoppingBag, Twitter, Linkedin, MapPin as MapPinIcon, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import type { Page } from '../App';

interface OrderConfirmationPageProps {
  onNavigate: (page: Page) => void;
}

export default function OrderConfirmationPage({ onNavigate }: OrderConfirmationPageProps) {
  const orderId = "KB-2024-98765";
  const orderDate = "April 29, 2026";
  
  const items = [
    {
      id: '1',
      name: 'Electric Deep Fryer',
      price: 25000,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1594498653385-d5172b532c00?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: '2',
      name: 'Industrial Food Mixer',
      price: 95000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1594498653385-d5172b532c00?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: '3',
      name: 'Robotic Grill Station',
      price: 375000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1594498653385-d5172b532c00?auto=format&fit=crop&q=80&w=200'
    }
  ];

  const subtotal = 520000;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F9FBFC] font-['DM_Sans']">
      {/* TOP INFO BAR */}
      <div className="h-10 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between">
        <div className="flex items-center gap-5 text-[13px] text-[#6B7280]">
          <div className="flex items-center gap-1.5">
            <MapPinIcon size={14} />
            <span>Hyderabad, india</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail size={14} />
            <span>info@kitchenbots.in</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={14} />
            <span>+91-9876543210</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold text-[#111827]">Vijay Sharma</span>
          <div className="flex items-center gap-3">
            <Twitter size={14} className="text-[#6B7280]" />
            <Linkedin size={14} className="text-[#6B7280]" />
            <div className="w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center text-[10px] text-white font-bold">3</div>
          </div>
        </div>
      </div>

      {/* NAVBAR (Specialized) */}
      <nav className="h-20 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
          <img 
            src="/images/Kitchen-Bots-3.png" 
            alt="KitchenBots" 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
          />
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6 text-[14px] font-medium text-[#374151]">
            <span className="cursor-pointer hover:text-kb-tertiary">Products ▾</span>
            <span className="cursor-pointer hover:text-kb-tertiary">Our Capabilities ▾</span>
            <span className="cursor-pointer hover:text-kb-tertiary">About</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer" onClick={() => onNavigate('cart')}>
              <ShoppingBag size={20} className="text-[#374151]" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#EF4444] rounded-full flex items-center justify-center text-[10px] text-white font-bold">1</div>
            </div>
            <Button 
              onClick={() => onNavigate('bulk-enquiry')}
              variant="accent"
              size="sm"
            >
              Get Quote / Bulk Enquiry
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF] mb-8">
          <span className="cursor-pointer hover:text-[#111827]" onClick={() => onNavigate('home')}>Home</span>
          <ChevronRight size={14} />
          <span className="cursor-pointer hover:text-[#111827]" onClick={() => onNavigate('checkout')}>Checkout</span>
          <ChevronRight size={14} />
          <span className="text-[#111827]">Order Success</span>
        </div>

        {/* SUCCESS HEADER */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={48} className="text-[#22C55E]" />
          </div>
          <h1 className="text-[32px] font-bold text-[#111827] mb-2">Thank you for your order, Vijay!</h1>
          <p className="text-[#6B7280]">Your order <span className="font-bold text-[#111827]">#{orderId}</span> has been placed and is being processed.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: ORDER SUMMARY */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FBFC] flex items-center justify-between">
                <h2 className="text-[16px] font-bold text-[#111827]">Order Summary</h2>
                <span className="text-[13px] text-[#6B7280]">{orderDate}</span>
              </div>
              <div className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-[#F9FBFC] border-b border-[#E5E7EB]">
                    <tr>
                      <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase">Product</th>
                      <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase text-center">Qty</th>
                      <th className="px-6 py-3 text-[12px] font-bold text-[#9CA3AF] uppercase text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-14 object-cover rounded-md bg-[#F3F4F6]" />
                            <div>
                              <div className="text-[14px] font-bold text-[#111827]">{item.name}</div>
                              <div className="text-[12px] text-[#6B7280]">SKU: {item.id}00-KB</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center text-[14px] font-medium text-[#111827]">{item.quantity}</td>
                        <td className="px-6 py-4 text-right text-[14px] font-bold text-[#111827]">₹ {item.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-[#F9FBFC] border-t border-[#E5E7EB]">
                <div className="space-y-3 max-w-[300px] ml-auto">
                  <div className="flex justify-between text-[14px] text-[#6B7280]">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-[#6B7280]">
                    <span>Shipping</span>
                    <span className="text-[#22C55E]">Free</span>
                  </div>
                  <div className="flex justify-between text-[18px] font-bold text-[#111827] pt-3 border-t border-[#E5E7EB]">
                    <span>Total Amount</span>
                    <span>₹ {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                variant="default"
                className="flex-1 shadow-xl shadow-black/10"
              >
                <Download size={18} />
                Download Invoice
              </Button>
              <Button 
                onClick={() => onNavigate('products')}
                variant="accent"
                className="flex-1 shadow-xl shadow-kb-tertiary"
              >
                <ShoppingBag size={18} />
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: DELIVERY & PAYMENT INFO */}
          <div className="lg:col-span-4 space-y-6">
            {/* SHIPPING ADDRESS */}
            <div className="bg-white border border-[#22C55E] rounded-xl p-6 shadow-sm relative">
              <div className="absolute top-4 right-4 bg-[#22C55E]/10 px-2 py-1 rounded text-[10px] font-bold text-[#22C55E] uppercase">Shipping To</div>
              <h3 className="text-[14px] font-bold text-[#111827] mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-[#22C55E]" />
                Delivery Address
              </h3>
              <div className="space-y-1 text-[14px] text-[#374151]">
                <div className="font-bold text-[#111827]">Vijay Sharma</div>
                <div>41/8f 2nd Cross Street,</div>
                <div>Hyderabad, Telangana 500115,</div>
                <div>India</div>
                <div className="pt-2 text-[#6B7280] flex items-center gap-2">
                  <Phone size={12} />
                  +91 9876543210
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
              <h3 className="text-[14px] font-bold text-[#111827] mb-4 flex items-center gap-2">
                <CreditCard size={16} className="text-kb-tertiary" />
                Payment Method
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-[#F3F4F6] rounded flex items-center justify-center text-[10px] font-bold text-[#9CA3AF]">VISA</div>
                <div>
                  <div className="text-[14px] font-bold text-[#111827]">Visa Card Ending **** 4242</div>
                  <div className="text-[12px] text-[#6B7280]">Paid on {orderDate}</div>
                </div>
              </div>
            </div>

            {/* NEED HELP */}
            <div className="bg-[#1E2329] rounded-xl p-6 text-white">
              <h3 className="text-[15px] font-bold mb-3">Need Help?</h3>
              <p className="text-[13px] text-gray-400 mb-4">If you have any questions about your order, our 24/7 support team is here to help.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[13px]">
                  <Phone size={14} className="text-kb-tertiary" />
                  <span>+91 9490701421</span>
                </div>
                <div className="flex items-center gap-3 text-[13px]">
                  <Mail size={14} className="text-kb-tertiary" />
                  <span>support@kitchenbots.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER (Specialized) */}
      <footer className="bg-white border-t border-[#E5E7EB] mt-12">
        <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <img 
              src="/images/Kitchen-Bots-3.png" 
              alt="KitchenBots" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </div>
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 text-[14px] text-[#374151] font-medium">
              <Phone size={16} className="text-kb-primary" />
              <span>+ 91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#374151] font-medium">
              <Mail size={16} className="text-kb-primary" />
              <span>info@kitchenbots.in</span>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#374151] font-medium">
              <Package size={16} className="text-kb-primary" />
              <span>www.kitchenbots.in</span>
            </div>
          </div>
        </div>
        <div className="bg-[#1E2329] py-4 px-6 flex items-center justify-between text-[11px] text-gray-500 font-medium">
          <div>© 2024 KitchenBots India Pvt. Ltd. All Rights Reserved</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Products</span>
            <span className="hover:text-white cursor-pointer transition-colors">Our Capabilities</span>
            <span className="hover:text-white cursor-pointer transition-colors">About</span>
            <span className="hover:text-white cursor-pointer transition-colors">Blog</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
