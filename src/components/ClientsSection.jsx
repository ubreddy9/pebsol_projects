import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Quote, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const CLIENTS_DATA = [
  {
    id: 'azad',
    name: 'Azad Engineering',
    sector: 'Aerospace & Precision Manufacturing',
    location: 'Jeedimetla, Hyderabad',
    logo: 'https://pebsol.in/wp-content/uploads/2025/06/AZAD-logo-blue-1-e1696590887222.png',
    project: '65,000 sq.ft Facility Delivered in 48 Days',
    testimonial: {
      quote: "We are thoroughly impressed with Pebsol’s ability to deliver our 65,000 sq. ft facility within just 48 days. From civil works to final structure, their team ensured flawless execution while adhering to our stringent standards.",
      author: 'Operations Head',
      rating: 5
    }
  },
  {
    id: 'reliance',
    name: 'Reliance Retail',
    sector: 'Commercial Retail & Superstores',
    location: 'Tirupati (Adjacent to Temple)',
    logo: 'https://pebsol.in/wp-content/uploads/2025/06/reliance-retail-logo-e1751177873916.png',
    project: 'Night-Shift Urban Commercial Facility (2.5 Months)',
    testimonial: {
      quote: "Executing a project next to the temple in a bustling market and under night-only work constraints was no small feat. Pebsol’s dedication, planning & professionalism helped us complete the project on time without disrupting the surrounding activity.",
      author: 'Project Manager',
      rating: 5
    }
  },
  {
    id: 'geekay',
    name: 'Geekay Wires Limited',
    sector: 'Heavy Galvanized Steel Wires',
    location: 'Wadiram, Telangana',
    logo: 'https://pebsol.in/wp-content/uploads/2025/06/logo.png',
    project: '95,000 sq.ft Manufacturing Plant with Heavy Cranes',
    testimonial: {
      quote: "From prefab design to project execution, PEBSOL delivered everything ahead of schedule. Their automated fabrication quality and crane integration were outstanding.",
      author: 'Head of Operations',
      rating: 5
    }
  },
  {
    id: 'shri-raj',
    name: 'Shri Raj Udyog Pvt Ltd',
    sector: 'Iron & Steel Products Mega Factory',
    location: 'Cherkurda, Hyderabad',
    logo: 'https://pebsol.in/wp-content/uploads/2025/06/logo-dark.png',
    project: '250,000 sq.ft Mega Integrated Steel Plant',
    testimonial: {
      quote: "PEBSOL is a reliable partner for industrial and solar projects. Their quality, speed, and service are unmatched.",
      author: 'Director',
      rating: 5
    }
  },
  {
    id: 'ananda',
    name: 'Ananda Convention Center',
    sector: 'Commercial & Convention Infrastructure',
    location: 'Hyderabad, Telangana',
    logo: 'https://pebsol.in/wp-content/uploads/2025/07/Ananda-covention.png',
    project: '70,000 sq.ft Clear-Span Grand Convention Center',
    testimonial: {
      quote: "Pebsol delivered a top-class structure that perfectly balances aesthetics & functionality for our convention center. The team’s attention to detail & commitment to timelines made the entire experience smooth and stress-free.",
      author: 'Director',
      rating: 5
    }
  },
  {
    id: 'parle',
    name: 'Vivala Amrit (Parle Agro Bailley)',
    sector: 'Food & Beverage Processing',
    location: 'Hyderabad, Telangana',
    logo: 'https://pebsol.in/wp-content/uploads/2025/06/cropped-cropped-Pebsol_Logo-03-1-scaled-1-4.png',
    project: '85,000 sq.ft Food-Grade Beverage Plant',
    testimonial: {
      quote: "A high-performance industrial facility built to strict hygienic and 24/7 operational standards. Pebsol's custom engineering and rapid erection exceeded our expectations.",
      author: 'Plant Operations Head',
      rating: 5
    }
  },
  {
    id: 'devi',
    name: 'Devi Convention Group',
    sector: 'Hospitality & Grand Event Centers',
    location: 'Shankarpally, Hyderabad',
    logo: 'https://pebsol.in/wp-content/uploads/2025/07/Devi-AC-Convention-Hall-6-scaled.jpg',
    project: '70,000 sq.ft Multi-Purpose Clear-Span Venue',
    testimonial: {
      quote: "Spacious, elegant, and structurally robust. The column-free interior gives us unmatched flexibility for large gatherings and cultural events.",
      author: 'Managing Partner',
      rating: 5
    }
  }
];

export const ClientsSection = ({ showTestimonials = true, className = "" }) => {
  const { navigateTo, setIsQuoteOpen } = useData();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % CLIENTS_DATA.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + CLIENTS_DATA.length) % CLIENTS_DATA.length);
  };

  return (
    <section className={`py-20 bg-slate-50 border-t border-slate-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
            Trusted Enterprise Partners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase tracking-tight">
            Our Esteemed Clients
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From precision aerospace leaders to India's largest retail conglomerate and heavy steel manufacturers, 
            industry pioneers rely on PebSol Projects for unmatched engineering speed and structural integrity.
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {CLIENTS_DATA.slice(0, 8).map((client) => (
            <div 
              key={client.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-600 transition-all flex flex-col items-center justify-between text-center group"
            >
              <div className="h-16 w-full flex items-center justify-center p-2 mb-3 bg-slate-50 rounded-lg group-hover:bg-emerald-50/50 transition-colors overflow-hidden">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  onError={(e) => {
                    // Fallback to stylized name if external image is blocked
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'block';
                  }}
                />
                <span className="hidden font-bold text-slate-800 text-sm font-['Barlow']">
                  {client.name}
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base font-['Barlow'] leading-snug">
                  {client.name}
                </h4>
                <p className="text-[11px] text-emerald-700 font-medium line-clamp-1">
                  {client.sector}
                </p>
                <div className="flex items-center justify-center text-[10px] text-slate-500 pt-1 space-x-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{client.location.split(',')[0]}</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 w-full text-[11px] text-slate-600 font-medium">
                {client.project.split('(')[0]}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        {showTestimonials && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-emerald-50 rounded-full opacity-60 pointer-events-none" />
            
            <div className="max-w-4xl mx-auto space-y-8 relative z-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <Quote className="w-8 h-8 text-emerald-600 opacity-80" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Client Endorsement ({activeTestimonial + 1} of {CLIENTS_DATA.length})
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={prevTestimonial}
                    className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Active Testimonial Content */}
              <div className="space-y-6">
                <div className="flex items-center space-x-1">
                  {[...Array(CLIENTS_DATA[activeTestimonial].testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <blockquote className="text-base sm:text-xl lg:text-2xl text-slate-800 font-medium leading-relaxed italic">
                  "{CLIENTS_DATA[activeTestimonial].testimonial.quote}"
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-lg font-['Barlow']">
                      {CLIENTS_DATA[activeTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base font-['Barlow']">
                        {CLIENTS_DATA[activeTestimonial].name}
                      </h4>
                      <p className="text-xs text-emerald-700 font-semibold">
                        {CLIENTS_DATA[activeTestimonial].testimonial.author} • {CLIENTS_DATA[activeTestimonial].sector}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Project: {CLIENTS_DATA[activeTestimonial].project}</span>
                  </div>
                </div>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 pt-4">
                {CLIENTS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all ${
                      activeTestimonial === idx ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA banner */}
        <div className="bg-[#0f2b48] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Proven Track Record</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-['Barlow'] uppercase">
              Ready to Join Our Roster of Satisfied Clients?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Get in touch with our design & structural engineering specialists today to get a fast-track project feasibility estimate.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all shadow-sm"
            >
              Get Free Estimate
            </button>
            <button
              onClick={() => navigateTo('projects')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-lg text-sm transition-all flex items-center justify-center space-x-2 border border-white/20"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
