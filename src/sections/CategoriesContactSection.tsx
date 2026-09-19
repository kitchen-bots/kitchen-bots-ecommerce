import { Phone, Mail, MessageSquare, Utensils, Zap, ShieldCheck, Settings } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function CategoriesContactSection() {
  const categories = [
    { icon: Utensils, label: 'Advanced Cooking' },
    { icon: Zap, label: 'Food Prep' },
    { icon: ShieldCheck, label: 'Storage Solutions' },
    { icon: Settings, label: 'Robotic Grilling' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: CATEGORIES */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-[20px] font-bold text-[#111827] mb-6">Our Product Categories</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((cat, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col items-center justify-center w-[125px] h-[100px] border border-[#E5E7EB] rounded-lg hover:border-kb-primary hover:text-kb-primary transition-all cursor-pointer bg-[#F9FAFB]"
                >
                  <cat.icon size={24} className="mb-2 opacity-70" />
                  <span className="text-[12px] font-bold px-2 text-center">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: CONTACT */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-[20px] font-bold text-[#111827] mb-6">Get In Touch</h2>
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#111827]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#6B7280] font-medium uppercase tracking-wider">Call Us</p>
                    <p className="text-[15px] font-bold text-[#111827]">+91 94907 01421</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#111827]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#6B7280] font-medium uppercase tracking-wider">Email Us</p>
                    <p className="text-[15px] font-bold text-[#111827]">info@kitchenbots.in</p>
                  </div>
                </div>
              </div>

              <div className="md:border-l md:border-gray-100 md:pl-8 mt-2">
                <Button 
                  className="bg-[#25D366] hover:bg-[#20bd5a] rounded-full"
                >
                  <MessageSquare size={20} fill="white" />
                  <span>WhatsApp Us</span>
                </Button>
                <p className="mt-2 text-[11px] text-[#6B7280] font-medium text-center md:text-left">
                  Average response: 5 mins
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

