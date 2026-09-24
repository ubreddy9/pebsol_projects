import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ClientsSection } from '../components/ClientsSection';
import { 
  Building2, 
  Sun, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Cog, 
  Users, 
  ChevronRight, 
  Zap,
  Globe,
  Warehouse,
  Factory,
  Check,
  Quote
} from 'lucide-react';

export const HomePage = () => {
  const { navigateTo, projects, team, settings, setIsQuoteOpen, setSelectedProject } = useData();

  // Hero Carousel
  const slides = [
    {
      title: "Engineering Progress. Empowering Growth.",
      subtitle: "Prefab. Solar. Infra. Delivered with Precision.",
      desc: "Complete end-to-end solutions under one roof. From structural Tekla design and precision fabrication to on-site commissioning.",
      image: settings?.media?.heroSlide1 || "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1920",
      tag: "PREFAB & SOLAR INFRASTRUCTURE"
    },
    {
      title: "Pre-Engineered & Prefabricated Buildings",
      subtitle: "Rapid, Reliable, and Cost-Effective Industrial Construction",
      desc: "Executing over 1.2 million sq.ft annually. Column-free clear spans, automated welding, and record project handovers.",
      image: settings?.media?.heroSlide2 || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920",
      tag: "PEB & INDUSTRIAL PREFAB"
    },
    {
      title: "Solar Module Mounting Solutions (MMS)",
      subtitle: "700 MW Annual Production Capacity • 175 km/h Wind Resilience",
      desc: "Cutting-edge ground mount, industrial rooftop, and solar carport structures engineered for maximum power generation.",
      image: settings?.media?.heroSlide3 || "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1920",
      tag: "RENEWABLE SOLAR ENERGY"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const testimonials = [
    {
      client: "Azad Engineering",
      role: "Operations Head",
      quote: "We are thoroughly impressed with Pebsol’s ability to deliver our 65,000 sq.ft facility within just 48 days. From civil works to final structure, their team ensured flawless execution while adhering to our stringent aerospace standards."
    },
    {
      client: "Reliance Retail",
      role: "Project Manager",
      quote: "Executing a project next to the temple in a bustling market and under night-only work constraints was no small feat. Pebsol’s dedication, planning & professionalism helped us complete the project on time without disrupting surrounding activity."
    },
    {
      client: "Geekay Wires Limited",
      role: "Head of Operations",
      quote: "From prefab structural design to turnkey execution, PEBSOL delivered everything ahead of schedule. Their automated fabrication quality and crane integration were outstanding."
    },
    {
      client: "Sri Raj Udyog Pvt Ltd",
      role: "Director",
      quote: "PEBSOL is a reliable partner for industrial sheds and solar mounting structures. Their engineering quality, erection speed, and post-completion service are unmatched."
    },
    {
      client: "Ananda Convention Center",
      role: "Director",
      quote: "Pebsol delivered a top-class structure that perfectly balances aesthetics and functionality for our convention center. The team’s attention to detail made the entire experience smooth and stress-free."
    }
  ];

  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  return (
    <div className="w-full bg-white text-slate-800">

      {/* Hero Section */}
      <section className="relative min-h-[580px] lg:h-[650px] bg-slate-900 overflow-hidden text-white flex items-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.38] scale-100 transition-transform duration-10000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2b48]/90 via-[#0f2b48]/60 to-transparent" />
          </div>
        ))}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sun className="w-3.5 h-3.5 text-emerald-400" />
              <span>{slides[currentSlide].tag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Barlow'] leading-tight tracking-tight text-white uppercase">
              {slides[currentSlide].title}
            </h1>

            <p className="text-xl sm:text-2xl text-emerald-300 font-semibold font-['Barlow']">
              {slides[currentSlide].subtitle}
            </p>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
              {slides[currentSlide].desc}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-lg text-sm shadow-md transition-all flex items-center space-x-2 active:scale-95"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('projects')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-lg text-sm border border-white/20 transition-all flex items-center space-x-2"
              >
                <span>Projects Delivered</span>
              </button>
            </div>

          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 right-8 z-30 flex items-center space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-emerald-500' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Metrics Banner (pebsol.in actual stats) */}
      <section className="bg-slate-50 border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-[#0f2b48] font-['Barlow']">
                1.2M+ sq.ft
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                PEB Projects Annually
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-['Barlow']">
                700 MW
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                Solar Structures / Year
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-[#0f2b48] font-['Barlow']">
                80,000 sq.ft
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                Medchal Manufacturing Plant
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-['Barlow']">
                15+ Years
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mt-1">
                Legacy (Founded 2009)
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* End-to-End Solutions Section (from pebsol.in) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                End-to-End Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
                Complete Prefab & Solar Infrastructure Under One Roof
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                At <strong>PEBSOL</strong>, we don’t just offer products, we deliver complete, end-to-end solutions. From concept planning, structural design, and precision fabrication to on-site installation and project commissioning, we manage every phase under one roof.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Whether it’s a prefabricated industrial shed, a utility-scale solar mounting structure, or a turnkey commercial project, our integrated approach ensures speed, quality, and accountability at every step.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Tekla 3D Detailing & Analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Automated Submerged Arc Welding</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>175 km/h Wind Resistance Certified</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Rapid On-Site Erection Teams</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="bg-[#0f2b48] hover:bg-[#1a3d66] text-white font-bold px-6 py-3 rounded-lg text-sm transition-all inline-flex items-center space-x-2"
                >
                  <span>Our Journey & Legacy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={settings?.media?.aboutPlant || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200"}
                  alt="PEBSOL Medchal Facility"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase">State-of-the-art Plant</span>
                    <h4 className="text-base font-bold text-[#0f2b48] font-['Barlow']">Medchal Unit • 80,000 sq.ft</h4>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded">
                    ISO 9001:2015
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Two Core Services (matching pebsol.in: PEB Buildings + Solar Mounting) */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
              Our Core Offerings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
              Specialized Services
            </h2>
            <p className="text-slate-600 text-sm">
              Engineered for strength, rapid execution, and sustainable long-term performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Pillar 1: PEB */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0f2b48] text-white flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
                  PEB & Prefab Buildings
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Rapid, reliable, and cost-effective construction tailored for industrial, pharmaceutical, and commercial needs. Column-free clear spans, standing seam roofing, and turnkey civil-to-erection execution.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Industrial Warehouses & Logistics Parks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Commercial Showrooms & Convention Centers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Light Gauge Steel Housing (LGSF)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigateTo('services')}
                className="text-emerald-700 hover:text-emerald-800 font-bold text-sm inline-flex items-center gap-1.5"
              >
                <span>Learn More About PEB</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pillar 2: Solar */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
                  Solar Module Mounting Solutions (MMS)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cutting-edge solar structures engineered for strength, alignment, and 25-year solar performance. Over 700 MW annual capacity manufactured with high-durability hot-dip galvanizing.
                </p>
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Utility-Scale Ground Mount Structures (Fixed & Tracker)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Industrial Rooftop Solar (Non-penetrating seam clamps)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Solar Carports & Commercial EV Charging Canopies</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigateTo('services')}
                className="text-emerald-700 hover:text-emerald-800 font-bold text-sm inline-flex items-center gap-1.5"
              >
                <span>Explore Solar Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Industries We Serve (from pebsol.in) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Client Verticals</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
              Industries We Serve
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              "Renewable Energy & Solar",
              "Pharmaceuticals",
              "Commercial & High Rise",
              "Convention Centers",
              "Manufacturing & Engineering",
              "Paper & Spinning Mills",
              "Warehousing & Logistics",
              "Infrastructure & EPC"
            ].map((industry, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 p-4 rounded-xl transition-all font-semibold text-slate-700 text-xs sm:text-sm"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Delivered */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase mt-2">
                Projects Delivered
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Landmark achievements across Solar Farms, Industrial PEBs, and Convention Centers.
              </p>
            </div>
            <button
              onClick={() => navigateTo('projects')}
              className="inline-flex items-center space-x-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-slate-300 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0f2b48]/90 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded backdrop-blur">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-base text-[#0f2b48] font-['Barlow'] line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center justify-between">
                      <span className="font-medium text-slate-700">{project.client}</span>
                      <span>{project.year}</span>
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-700">{project.area}</span>
                  <span className="text-slate-600 font-bold flex items-center gap-1 group-hover:text-[#0f2b48]">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Dedicated Our Clients & Client Testimonials Section (from pebsol.in) */}
      <ClientsSection showTestimonials={true} />

      {/* Team Preview Section (4 members) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
                Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase mt-2">
                Engineering Leadership Team
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                The experts leading PEBSOL's Solar & Prefab Building operations.
              </p>
            </div>
            <button
              onClick={() => navigateTo('team')}
              className="inline-flex items-center space-x-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-white border border-slate-300 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <span>View Full Team ({team.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.slice(0, 4).map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#0f2b48]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
                    {member.experience}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-base text-[#0f2b48] font-['Barlow']">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Global Footprint Banner */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Delivering Across International Markets
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm font-bold text-[#0f2b48]">
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-emerald-600" /> India</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-emerald-600" /> Tanzania</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-emerald-600" /> Vietnam</span>
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-emerald-600" /> Canada</span>
          </div>
        </div>
      </section>

    </div>
  );
};
