import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { submitEnquiry } from '../lib/api';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    title: 'Manufacturing Unit',
    details: ['Plot No. 45, Industrial Estate', 'Cherlapally, Hyderabad', 'Telangana 500051'],
    href: null,
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 94907 01421'],
    href: 'tel:+919490701421',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['kitchenbots.sales@gmail.com'],
    href: 'mailto:kitchenbots.sales@gmail.com',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Monday to Saturday', '9:00 AM to 5:00 PM'],
    href: null,
  },
];

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    city: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll('.animate-in');
      gsap.set(elements, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
          });
        },
        once: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        city: formData.city || undefined,
        message: formData.message,
        items: [],
      });

      setSubmittedRef(response.reference);
      setFormData({ name: '', email: '', phone: '', company: '', city: '', message: '' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to submit enquiry. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} className="pt-20 bg-[#FAFAFA] min-h-screen">
      <div className="container mx-auto px-6 md:px-[80px] py-12 md:py-20">

        {/* Header */}
        <div className="animate-in max-w-2xl mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.1em] text-kb-primary uppercase mb-4 font-['Outfit']">
            Request a Quote
          </span>
          <h1 className="text-[40px] md:text-[48px] font-bold font-['Outfit'] text-[#111827] mb-4 leading-tight">
            Get Quote / Bulk Enquiry
          </h1>
          <p className="text-[18px] font-bold text-[#111827] mb-3 font-['Outfit']">
            Request a Quote or Submit Your Bulk Enquiry
          </p>
          <p className="text-[15px] text-[#6B7280] leading-relaxed font-['DM_Sans']">
            Tell us your requirements: products, quantities, and delivery city. Our team will respond within 24 hours to provide a customized solution.
          </p>
        </div>

        {/* Layout: Form + Sidebar */}
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Contact Info (sidebar) */}
          <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = (
                <div
                  className="animate-in p-6 bg-white border border-[#E5E7EB] rounded-2xl hover:border-kb-primary transition-all duration-300 group shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]"
                >
                  <div className="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center mb-4 group-hover:bg-kb-primary transition-colors duration-300">
                    <Icon className="w-6 h-6 text-kb-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[16px] font-bold font-['Outfit'] text-[#111827] mb-1.5">{info.title}</h3>
                  {info.details.map((d, i) => (
                    <p key={i} className="text-[14px] text-[#6B7280] font-['DM_Sans']">{d}</p>
                  ))}
                </div>
              );

              return info.href ? (
                <a
                  key={index}
                  href={info.href}
                  className="block group focus:outline-none"
                >
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>

          {/* Main Form */}
          <div className="animate-in lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white border border-[#E0EAE0] rounded-3xl p-8 md:p-10">
              {submittedRef ? (
                /* Success State */
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-kb-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-['Outfit'] text-[#111827] mb-2">
                    Enquiry Received
                  </h3>
                  <p className="text-kb-primary font-bold text-lg mb-3 font-['Outfit']">
                    Reference: {submittedRef}
                  </p>
                  <p className="text-[#6B7280] text-base max-w-md mx-auto">
                    We have recorded your enquiry and our sales team will contact you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmittedRef(null)}
                    variant="outline"
                    size="sm"
                    className="mt-6 font-bold"
                  >
                    Submit another enquiry
                  </Button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl flex items-start gap-3 text-[#991B1B]">
                      <AlertCircle className="shrink-0 mt-0.5" size={18} />
                      <div className="text-sm font-['DM_Sans']">
                        <p className="font-semibold mb-1">Submission Failed</p>
                        <p>{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Name + Email */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5 font-['Outfit']">
                        Name <span className="text-[var(--brand-600)]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-[#E0EAE0] focus:outline-none focus:ring-2 focus:ring-[var(--brand-300)]/50 focus:border-[var(--brand-300)] transition-all disabled:opacity-50"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5 font-['Outfit']">
                        Email <span className="text-[var(--brand-600)]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-[#E0EAE0] focus:outline-none focus:ring-2 focus:ring-[var(--brand-300)]/50 focus:border-[var(--brand-300)] transition-all disabled:opacity-50"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone + Company */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5 font-['Outfit']">
                        Phone
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#E0EAE0] bg-[#F7FAF7] text-[#4A4A4A]/60 text-sm select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="flex-1 px-4 py-3 rounded-r-xl border border-[#E0EAE0] focus:outline-none focus:ring-2 focus:ring-[var(--brand-300)]/50 focus:border-[var(--brand-300)] transition-all disabled:opacity-50"
                          placeholder="9490701421"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5 font-['Outfit']">
                        Company Name <span className="text-[#4A4A4A]/40 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-[#E0EAE0] focus:outline-none focus:ring-2 focus:ring-[var(--brand-300)]/50 focus:border-[var(--brand-300)] transition-all disabled:opacity-50"
                        placeholder="Restaurant / Hotel / Trade name"
                      />
                    </div>
                  </div>

                  {/* Row 3: City */}
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5 font-['Outfit']">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0EAE0] focus:outline-none focus:ring-2 focus:ring-[var(--brand-300)]/50 focus:border-[var(--brand-300)] transition-all disabled:opacity-50"
                      placeholder="e.g. Mumbai, Hyderabad, Delhi"
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-1.5 font-['Outfit']">
                      Requirements <span className="text-[var(--brand-600)]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0EAE0] focus:outline-none focus:ring-2 focus:ring-[var(--brand-300)]/50 focus:border-[var(--brand-300)] transition-all resize-none disabled:opacity-50"
                      placeholder="E.g. 10 units BBQ Grill Commercial Grade, delivery to Mumbai, need GST invoice"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 text-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-[#E0EAE0]" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                      <span className="bg-white px-3 text-[#4A4A4A]/40">or</span>
                    </div>
                  </div>

                  {/* WhatsApp alternative */}
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-lg shadow-[#25D366]/20"
                  >
                    <a
                      href="https://wa.me/919490701421"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Prefer WhatsApp? Chat with us
                    </a>
                  </Button>
                  <p className="text-xs text-center text-[#4A4A4A]/40 mt-1 font-['DM_Sans']">
                    Fastest response via WhatsApp: wa.me/919490701421
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
