import { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Twitter, 
  Linkedin, 
  ChevronDown, 
  CheckCircle, 
  ShoppingCart,
  Globe,
  Lock,
  CreditCard
} from 'lucide-react';
import type { Page } from '../App';
import { Button } from '../components/ui/button';

interface CheckoutPageProps {
  onNavigate: (page: Page) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pay'>('pay');

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      
      {/* TOP INFO BAR */}
      <div className="bg-white border-b border-[#E5E7EB] h-[40px] hidden md:flex items-center justify-between px-6">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
            <MapPin size={14} className="text-gray-400" />
            <span>Hyderabad, india</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
            <Mail size={14} className="text-gray-400" />
            <span>info@kitchenbots.in</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
            <Phone size={14} className="text-gray-400" />
            <span>+91-9876543210</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-bold text-[#111827]">Vijay Sharma</span>
          <div className="flex items-center gap-3 text-gray-400">
            <Twitter size={16} />
            <Linkedin size={16} />
            <div className="w-5 h-5 bg-red-500 rounded-md flex items-center justify-center text-white text-[10px] font-bold">
              3
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR (Checkout variant) */}
      <nav className="bg-white border-b border-[#E5E7EB] h-[80px] flex items-center px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-[var(--kb-green)] rounded flex items-center justify-center text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-black text-[#111827] leading-tight tracking-tight">KitchenBots</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest -mt-1">India Pvt. Ltd.</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-1 text-[15px] font-medium text-[#111827] hover:text-[var(--kb-green)] cursor-pointer">
              Products <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-1 text-[15px] font-medium text-[#111827] hover:text-[var(--kb-green)] cursor-pointer">
              Our Capabilities <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-1 text-[15px] font-medium text-[#111827] hover:text-[var(--kb-green)] cursor-pointer">
              About <ChevronDown size={14} />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer" onClick={() => onNavigate('cart')}>
              <ShoppingCart size={22} className="text-[#111827]" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                1
              </div>
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

      {/* BREADCRUMB */}
      <div className="container mx-auto px-6 mt-6">
        <p className="text-[13px] text-gray-400">
          Home / Checkout
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 mt-6 pb-20">
        <h1 className="text-[30px] font-bold text-[#111827] mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-[4%]">
          
          {/* LEFT COLUMN: BILLING DETAILS (48%) */}
          <div className="w-full lg:w-[48%] flex flex-col gap-8">
            <div className="border border-[#E5E7EB] rounded-[12px] p-8 bg-white shadow-sm">
              <h2 className="text-[18px] font-bold text-[#111827] mb-6">Billing Details</h2>
              
              <div className="mb-6">
                <p className="text-[13px] text-[#6B7280] mb-3">Select a saved address</p>
                <div className="border-2 border-[#16A34A] rounded-[8px] p-4 flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-[#16A34A] mt-0.5 flex-shrink-0" />
                    <p className="text-[13px] text-[#111827] leading-relaxed font-medium">
                      41/8f 2nd Cross Street,<br />
                      Hyderabad, Telangana 500115, India
                    </p>
                  </div>
                  <ChevronDown size={20} className="text-gray-400" />
                </div>
                <div className="text-center mt-3">
                  <p className="text-[13px] text-[#6B7280]">
                    Or <span className="text-[#16A34A] font-bold cursor-pointer hover:underline ml-1">+ use a new address</span>
                  </p>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 gap-5 mt-8">
                <div>
                  <label className="block text-[13px] font-bold text-[#111827] mb-2">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Vijay Sharma" 
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-gray-500 focus:outline-none focus:border-[#16A34A]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#111827] mb-2">41/8f 2nd Cross Street</label>
                  <input 
                    type="text" 
                    defaultValue="Hyderabad" 
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-gray-500 focus:outline-none focus:border-[#16A34A]"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-[0.6]">
                    <input 
                      type="text" 
                      defaultValue="Telangana" 
                      className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-gray-500 focus:outline-none focus:border-[#16A34A]"
                    />
                  </div>
                  <div className="flex-[0.35]">
                    <input 
                      type="text" 
                      defaultValue="500015" 
                      className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-gray-500 focus:outline-none focus:border-[#16A34A]"
                    />
                  </div>
                </div>
                <div>
                  <input 
                    type="text" 
                    defaultValue="+91 9876543210" 
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-gray-500 focus:outline-none focus:border-[#16A34A]"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    defaultValue="vijay.sharma@email.com" 
                    className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-[6px] text-[14px] text-gray-500 focus:outline-none focus:border-[#16A34A]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#111827] mb-2">Order Notes (optional, special notes for delivery)</label>
                  <textarea 
                    className="w-full h-[80px] p-4 border border-[#E5E7EB] rounded-[6px] text-[14px] focus:outline-none focus:border-[#16A34A] resize-none"
                    placeholder="Enter any special instructions for your delivery..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: YOUR ORDER (48%) */}
          <div className="w-full lg:w-[48%] flex flex-col gap-8">
            <div className="border border-[#E5E7EB] rounded-[12px] p-8 bg-[#FDFDFD] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[18px] font-bold text-[#111827]">Your Order</h2>
                <span className="text-[14px] text-[#6B7280] flex items-center gap-1 cursor-pointer hover:text-[#111827]">
                  <ChevronDown size={16} /> Change
                </span>
              </div>

              {/* Order items */}
              <div className="space-y-5">
                {[
                  { name: 'Electric Deep Fryer', price: '50,000' },
                  { name: 'Industrial Food Mixer', price: '95,000' },
                  { name: 'Robotic Grill Station', price: '3,75,000' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between pb-4 border-b border-[#F3F4F6]">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-gray-200 rounded-sm" />
                      <span className="text-[13px] text-[#111827] font-medium">{item.name}</span>
                    </div>
                    <span className="text-[13px] font-bold text-[#111827]">₹ {item.price}</span>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4">
                  <span className="text-[14px] font-bold text-[#111827]">Subtotal</span>
                  <span className="text-[16px] font-bold text-[#111827]">₹ 5,20,000</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-10">
                <h3 className="text-[16px] font-bold text-[#111827] mb-6">Payment Method</h3>
                
                <div className="space-y-6">
                  {/* Option 1 */}
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mt-0.5"
                      onClick={() => setPaymentMethod('card')}
                    >
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#111827]" />}
                    </div>
                    <div>
                      <span className="text-[14px] font-bold text-[#111827]">Credit/Debit Card</span>
                      {paymentMethod === 'card' && (
                        <div className="grid grid-cols-1 gap-4 mt-4 w-full animate-fade-in">
                          <div className="relative">
                            <input type="text" placeholder="Card Number" className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-[6px] text-[13px] bg-[#F9FAFB] focus:outline-none" />
                            <CreditCard size={16} className="absolute right-3 top-3.5 text-gray-400" />
                          </div>
                          <div className="flex gap-4">
                            <input type="text" placeholder="MM / YY" className="flex-1 h-[44px] px-4 border border-[#E5E7EB] rounded-[6px] text-[13px] bg-[#F9FAFB] focus:outline-none" />
                            <div className="relative flex-1">
                              <input type="text" placeholder="CVC" className="w-full h-[44px] px-4 border border-[#E5E7EB] rounded-[6px] text-[13px] bg-[#F9FAFB] focus:outline-none" />
                              <Lock size={14} className="absolute right-3 top-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Option 2 */}
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer mt-0.5"
                      onClick={() => setPaymentMethod('pay')}
                    >
                      {paymentMethod === 'pay' && <div className="w-2.5 h-2.5 rounded-full bg-kb-tertiary" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#111827]">Pay with <span className="text-kb-tertiary">Pay</span></span>
                    </div>
                  </div>
                </div>

                {/* Payment icons */}
                <div className="flex items-center gap-3 mt-8">
                  <div className="h-8 px-2 border border-gray-200 rounded flex items-center text-[10px] font-bold text-gray-400">VISA</div>
                  <div className="h-8 w-12 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                  <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <div className="w-4 h-4 bg-red-500 rounded-full" />
                    <div className="w-4 h-4 bg-yellow-500 rounded-full -ml-2 opacity-80" />
                  </div>
                  <div className="h-8 px-2 border border-gray-200 rounded flex items-center text-[10px] font-black italic text-blue-900">RuPay</div>
                  <CreditCard size={20} className="text-gray-300 ml-2" />
                </div>

                <p className="text-[12px] text-[#6B7280] leading-relaxed mt-8">
                  Your personal data will be used to process your order, and support your experience throughout this website. See our <span className="text-[#111827] font-bold cursor-pointer hover:underline">Privacy Policy</span>.
                </p>

                <Button 
                  onClick={() => onNavigate('order-confirmation')}
                  variant="accent"
                  size="lg"
                  className="w-full"
                >
                  Place Order
                </Button>

                <div className="flex justify-center mt-6">
                  {/* Decorative pointing hand cursor icon */}
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#9CA3AF" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="transform rotate-[15deg]"
                  >
                    <path d="M14.5 10.5V6.5C14.5 5.39543 13.6046 4.5 12.5 4.5C11.3954 4.5 10.5 5.39543 10.5 6.5V10.5" />
                    <path d="M10.5 10.5V7.5C10.5 6.39543 9.60457 5.5 8.5 5.5C7.39543 5.5 6.5 6.39543 6.5 7.5V10.5" />
                    <path d="M6.5 10.5V9.5C6.5 8.39543 5.60457 7.5 4.5 7.5C3.39543 7.5 2.5 8.39543 2.5 9.5V14.5C2.5 17.8137 5.18629 20.5 8.5 20.5H12.5C15.8137 20.5 18.5 17.8137 18.5 14.5V10.5C18.5 9.39543 17.6046 8.5 16.5 8.5C15.3954 8.5 14.5 9.39543 14.5 10.5Z" />
                    <path d="M12.5 4.5V1.5C12.5 0.947715 12.9477 0.5 13.5 0.5C14.0523 0.5 14.5 0.947715 14.5 1.5V4.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER (Checkout variant) */}
      <div className="bg-[#F9FAFB] pt-12 pb-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1A4A2E] rounded flex items-center justify-center text-white">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[24px] font-black text-[#111827] leading-tight">KitchenBots</span>
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest -mt-1">India Pvt. Ltd.</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-[14px] font-bold text-[#111827]">
              <Phone size={18} className="text-[#1A4A2E]" />
              <span>+ 91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 text-[14px] font-bold text-[#111827]">
              <Mail size={18} className="text-[#1A4A2E]" />
              <span>info@kitchenbots.in</span>
            </div>
            <div className="flex items-center gap-2 text-[14px] font-bold text-[#111827]">
              <Globe size={18} className="text-[#1A4A2E]" />
              <span>www.kitchenbots.in</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1E2329] py-6 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/50">
          <p>© 2024 KitchenBots India Pvt. Ltd. All Rights Reserved</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Products</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Our Capabilities</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">About</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Blog</span>
          </div>
        </div>
      </div>

    </div>
  );
}
