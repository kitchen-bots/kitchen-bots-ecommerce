import { type Page } from '../App';
import { MapPin, Phone, Mail, Clock, Linkedin } from 'lucide-react';
import { Button } from '../components/ui/button';

interface AboutPageProps {
  onNavigate?: (page: Page) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[320px] lg:h-[400px] bg-[#EFF3EF] flex flex-col lg:flex-row overflow-hidden">
        {/* CONTENT AREA */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 md:px-[80px] py-12 md:py-20 z-10">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#111827] leading-tight">
            Innovators in
          </h1>
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#111827] leading-tight">
            Smart Kitchen Technology
          </h1>
          <p className="text-[15px] text-gray-500 mt-3 font-medium">
            Redefining the Future of Commercial Kitchens
          </p>
          <Button 
            onClick={() => onNavigate?.('contact')}
            variant="accent"
            size="sm"
            className="mt-5 w-[140px]"
          >
            Contact Us
          </Button>
        </div>
        {/* IMAGE AREA (Desktop Only) */}
        <div className="absolute right-0 top-0 w-1/2 h-full z-0 hidden lg:block">
          <img 
            src="/images/redesign/capabilities-hero.png" 
            alt="AI Robot Kitchen" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFF3EF] via-transparent to-transparent" />
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section className="bg-white py-12 md:py-20 px-6 md:px-[80px] flex justify-center border-b border-gray-100">
        <div className="max-w-[1000px] w-full">
          <h2 className="text-[24px] font-bold text-[#111827] mb-6 font-['Outfit']">About Us – Innovating the Future of Kitchen Technology</h2>
          <div className="text-[14px] text-[#374151] leading-[1.7] space-y-5 font-['DM_Sans']">
            <p>
              Welcome to KitchenBots, your trusted partner in cutting-edge kitchen technology solutions. We specialize in designing and manufacturing innovative, high-quality kitchen equipment and kitchen waste management systems for diverse sectors.
            </p>
            <p>
              Our mission is to <span className="font-bold text-kb-tertiary">revive</span> the <span className="font-bold text-kb-tertiary">kitchen</span> industry through advanced automation, intelligent engineering, and smart technology, enabling safer, more efficient, and future-ready kitchens.
            </p>
            <p>
              At KitchenBots, we don't just build equipment — we engineer smart kitchen ecosystems that combine performance, reliability, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* 3. COMPANY OVERVIEW SECTION */}
      <section className="bg-white py-12 md:py-20 px-6 md:px-[80px]">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-12">
          {/* LEFT 55% */}
          <div className="lg:w-[55%]">
            <h2 className="text-[20px] font-bold text-[#111827] mb-4 font-['Outfit']">Company Overview – Revolutionizing Kitchens Across Segments</h2>
            <p className="text-[14px] text-[#374151] leading-[1.7] mb-4 font-['DM_Sans']">
              KitchenBots India Pvt. Ltd. is a technology-driven kitchen equipment company operating across three core segments:
            </p>
            <ul className="text-[14px] text-[#374151] leading-[1.7] space-y-2 mb-6 ml-4 list-disc pl-2 marker:text-gray-400 font-['DM_Sans']">
              <li>Retail / Domestic Kitchen Equipment</li>
              <li>Commercial Kitchen Equipment</li>
              <li>Kitchen Waste Management Solutions</li>
            </ul>
            <p className="text-[14px] text-[#374151] leading-[1.7] font-['DM_Sans']">
              We bring together deep expertise in mechanical engineering, electronics, and programming to deliver state-of-the-art, customized solutions tailored to modern kitchens. We combine innovation, quality, and durability to ensure total customer satisfaction.
            </p>
          </div>

          {/* RIGHT 40% Vision & Mission Box */}
          <div className="lg:w-[40%] bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] p-[24px]">
            <h3 className="text-[16px] font-bold text-[#111827] mb-6 font-['Outfit']">Vision & Mission</h3>
            <div className="mb-6">
              <h4 className="text-[13px] font-bold text-[#111827] mb-2 font-['Outfit']">Vision</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed font-medium font-['DM_Sans']">
                To become a leading kitchen technology company in India, empowering kitchens worldwide through innovation and sustainable solutions.
              </p>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#111827] mb-2 font-['Outfit']">Mission</h4>
              <ul className="text-[13px] text-gray-500 leading-relaxed list-disc pl-4 space-y-1 marker:text-gray-400 font-medium ml-1 font-['DM_Sans']">
                <li className="pl-1">To deliver high-quality, durable, and intelligent kitchen equipment designed with a focus on performance.</li>
                <li className="pl-1">To push the boundaries of technology and innovation.</li>
                <li className="pl-1">To foster a culture of integrity, excellence, and customer satisfaction.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEET OUR TEAM & CONTACT GRID */}
      <section className="bg-white py-12 md:py-20 px-6 md:px-[80px]">
        <div className="container mx-auto">
          {/* Main Layout containing Team Area and Right Sidebar */}
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* LEFT AREA: TEAM SECITON */}
            <div className="lg:flex-1">
              <h2 className="text-[22px] font-bold text-[#111827] mb-[20px]">Meet Our Team</h2>
              {/* 4 Column Team Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
                
                {/* Team 1 */}
                <div className="flex flex-col items-start">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src="/images/redesign/team-1.png" alt="Dinakar Patel" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-[14px] font-bold text-[#111827] mt-[12px]">Dinakar Patel</h4>
                  <p className="text-[12px] text-gray-500 mt-[4px]">Founder & CEO</p>
                  <div className="w-[32px] h-[32px] bg-[#0077B5] rounded-md flex items-center justify-center mt-[12px] cursor-pointer hover:bg-[#005E93] transition-colors">
                    <Linkedin size={16} className="text-white fill-current" />
                  </div>
                </div>

                {/* Team 2 */}
                <div className="flex flex-col items-start">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src="/images/redesign/team-2.png" alt="Ravi Kumar" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-[14px] font-bold text-[#111827] mt-[12px]">Ravi Kumar</h4>
                  <p className="text-[12px] text-gray-500 mt-[4px]">Head of Engineering</p>
                  <div className="w-[32px] h-[32px] bg-[#0077B5] rounded-md flex items-center justify-center mt-[12px] cursor-pointer hover:bg-[#005E93] transition-colors">
                    <Linkedin size={16} className="text-white fill-current" />
                  </div>
                </div>

                {/* Team 3 */}
                <div className="flex flex-col items-start">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src="/images/redesign/team-3.png" alt="Anita Mehta" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-[14px] font-bold text-[#111827] mt-[12px]">Anita Mehta</h4>
                  <p className="text-[12px] text-gray-500 mt-[4px]">Operations Manager</p>
                  <div className="w-[32px] h-[32px] bg-[#0077B5] rounded-md flex items-center justify-center mt-[12px] cursor-pointer hover:bg-[#005E93] transition-colors">
                    <Linkedin size={16} className="text-white fill-current" />
                  </div>
                </div>

                {/* Team 4 */}
                <div className="flex flex-col items-start">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src="/images/redesign/team-4.png" alt="Vijay Sharma" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-[14px] font-bold text-[#111827] mt-[12px]">Vijay Sharma</h4>
                  <p className="text-[12px] text-gray-500 mt-[4px]">Marketing Head</p>
                  <div className="w-[32px] h-[32px] bg-[#0077B5] rounded-md flex items-center justify-center mt-[12px] cursor-pointer hover:bg-[#005E93] transition-colors">
                    <Linkedin size={16} className="text-white fill-current" />
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT AREA: GET IN TOUCH SIDEBAR */}
            <div className="lg:w-[300px] flex-shrink-0 mt-[66px]">
              <div className="bg-[#F9FAFB] rounded-[12px] p-[20px] shadow-sm border border-gray-100">
                <h3 className="text-[16px] font-bold text-[#111827] mb-[20px] font-['Outfit']">Get In Touch</h3>
                <div className="space-y-[16px]">
                  <div className="flex items-start gap-[12px]">
                    <MapPin size={16} className="text-[#111827] mt-1 flex-shrink-0" />
                    <span className="text-[14px] text-[#374151]">Madhapur, Hyderabad, India</span>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <Phone size={16} className="text-[#111827] mt-1 flex-shrink-0" />
                    <span className="text-[14px] text-[#374151]">+91 94907 01421</span>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <Clock size={16} className="text-[#111827] mt-1 flex-shrink-0" />
                    <span className="text-[14px] text-[#374151]">Monday – Saturday, 9:00 AM- 6:00 PM</span>
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <Mail size={16} className="text-[#111827] mt-1 flex-shrink-0" />
                    <span className="text-[14px] text-[#374151]">info@kitchenbots.in</span>
                  </div>
                </div>
                <Button 
                  variant="accent"
                  size="sm"
                  className="w-full mt-[16px]"
                  onClick={() => onNavigate?.('contact')}
                >
                  Contact Us
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
