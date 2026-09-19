import { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Mail,
  Lock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import type { Page } from '../App';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-[1000px] mx-auto bg-white rounded-[48px] shadow-[0_30px_80px_rgba(0,0,0,0.04)] border border-[#F1F5F9] overflow-hidden flex flex-col md:flex-row">
          
          {/* LEFT SIDE - BRANDING */}
          <div className="w-full md:w-[45%] bg-[#1E2329] p-12 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-kb-tertiary opacity-10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-kb-primary opacity-10 blur-[100px]" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 backdrop-blur-md">
                <ShieldCheck size={32} className="text-kb-tertiary" />
              </div>
              <h1 className="text-[36px] font-bold mb-6 font-['Outfit'] leading-tight text-white">
                Secure Engineering <br /> Access
              </h1>
              <p className="text-white/90 font-['DM_Sans'] leading-relaxed">
                Login to access your project dashboard, manage inventory deployments, and track industrial orders.
              </p>
            </div>

            <div className="relative z-10 pt-12 border-t border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1E2329] overflow-hidden">
                      <img src={`/images/redesign/team-${i}.png`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-white/80 font-['DM_Sans']">Joined by 500+ <br /> Industry Leaders</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="w-full md:w-[55%] p-12 lg:p-20">
            {/* TABS */}
            <div className="flex gap-8 mb-12 border-b border-[#F1F5F9]">
              <Button 
                variant="ghost"
                onClick={() => setActiveTab('login')}
                className={`h-auto pb-4 px-0 rounded-none bg-transparent hover:bg-transparent text-[14px] font-bold uppercase tracking-widest transition-all relative font-['Outfit'] ${activeTab === 'login' ? 'text-[#111827]' : 'text-[#94A3B8] hover:text-[#111827]'}`}
              >
                Login
                {activeTab === 'login' && <div className="absolute bottom-0 inset-x-0 h-1 bg-kb-tertiary rounded-full" />}
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setActiveTab('signup')}
                className={`h-auto pb-4 px-0 rounded-none bg-transparent hover:bg-transparent text-[14px] font-bold uppercase tracking-widest transition-all relative font-['Outfit'] ${activeTab === 'signup' ? 'text-[#111827]' : 'text-[#94A3B8] hover:text-[#111827]'}`}
              >
                Sign Up
                {activeTab === 'signup' && <div className="absolute bottom-0 inset-x-0 h-1 bg-kb-primary rounded-full" />}
              </Button>
            </div>

            {activeTab === 'login' ? (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-[#64748B] uppercase tracking-widest font-['Outfit']">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                    <input 
                      type="email" 
                      placeholder="engineer@kitchenbots.in" 
                      className="w-full h-[56px] pl-12 pr-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-[15px] focus:outline-none focus:border-kb-tertiary focus:bg-white transition-all font-['DM_Sans']"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-[12px] font-bold text-[#64748B] uppercase tracking-widest font-['Outfit']">Password</label>
                    <Button 
                      type="button"
                      variant="link"
                      onClick={() => onNavigate('forgot-password')}
                      className="text-[12px] h-auto p-0 text-kb-tertiary hover:text-[#D18509] font-bold uppercase tracking-widest"
                    >
                      Forgot?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                    <input 
                      type={showLoginPass ? 'text' : 'password'} 
                      placeholder="••••••••" 
                      className="w-full h-[56px] pl-12 pr-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-[15px] focus:outline-none focus:border-kb-tertiary focus:bg-white transition-all font-['DM_Sans']"
                    />
                    <Button 
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setShowLoginPass(!showLoginPass)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#111827] hover:bg-[#F1F5F9]"
                    >
                      {showLoginPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full mt-4 shadow-xl shadow-black/10"
                >
                  Enter Dashboard <ArrowRight size={20} />
                </Button>
              </form>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-[#64748B] uppercase tracking-widest font-['Outfit']">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Vijay Sharma" 
                    className="w-full h-[56px] px-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-[15px] focus:outline-none focus:border-kb-primary focus:bg-white transition-all font-['DM_Sans']"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-[#64748B] uppercase tracking-widest font-['Outfit']">Company Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full h-[56px] px-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-[15px] focus:outline-none focus:border-kb-primary focus:bg-white transition-all font-['DM_Sans']"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-[#64748B] uppercase tracking-widest font-['Outfit']">Create Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full h-[56px] px-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-[15px] focus:outline-none focus:border-kb-primary focus:bg-white transition-all font-['DM_Sans']"
                  />
                </div>

                <Button 
                  variant="secondary"
                  size="lg"
                  className="w-full mt-4 shadow-xl shadow-kb-primary"
                >
                  Create Account <ArrowRight size={20} />
                </Button>
                
                <p className="text-[12px] text-[#94A3B8] text-center font-['DM_Sans'] pt-2">
                  By joining, you agree to our <span className="text-[#111827] font-bold hover:underline cursor-pointer">Terms of Service</span>.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
