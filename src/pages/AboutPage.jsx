import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Building2, 
  Sun, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Target, 
  Eye, 
  Factory, 
  Globe, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo, setIsQuoteOpen, settings } = useData();

  return (
    <div className="w-full bg-white text-slate-800">
      
      {/* Simple Clean Banner */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
            Our Journey & Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-['Barlow'] uppercase text-[#0f2b48] tracking-tight">
            About PEBSOL
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Building smart, scalable, and sustainable infrastructure across Pre-Engineered Buildings and Renewable Solar Energy since 2009.
          </p>
        </div>
      </section>

      {/* Main Narrative & Story (from pebsol.in) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Building the PEBSOL Legacy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
                A Journey of Innovation & Precision Engineering
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Founded in <strong>2009</strong> in Balanagar, Hyderabad, PEBSOL began as a modest manufacturing unit providing secondary line fabrication solutions at a time when Pre-Engineered Buildings (PEB) were still an emerging concept in India.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Recognizing the potential of this industry, we quickly evolved into delivering complete PEB solutions, investing in advanced automated welding systems to meet growing national demand.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                In <strong>2014</strong>, we strategically diversified into the renewable energy sector, introducing Solar Module Mounting Structures (MMS) just as solar adoption accelerated across India. By <strong>2020</strong>, to meet the surge in demand for warehouses and light-gauge steel housing, we inaugurated our <strong>80,000 sq.ft state-of-the-art facility in Medchal</strong>.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-emerald-600 font-['Barlow']">1.2M+ sq.ft</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">PEB Projects Annually</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-[#0f2b48] font-['Barlow']">700 MW</div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Solar Structures / Year</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&q=80&w=1200"
                  alt="PEBSOL Engineering"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
              Growth Milestones
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">
              How PEBSOL Evolved
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-emerald-600 font-mono">YEAR 2009</div>
              <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Founded in Balanagar</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Started as a fabrication unit in Balanagar, Hyderabad, delivering secondary steel components and early PEB solutions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-emerald-600 font-mono">YEAR 2014</div>
              <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Solar MMS Diversification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expanded into renewable energy by introducing Solar Module Mounting Structures (MMS) with dedicated facility in Gandimaisamma.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-emerald-600 font-mono">YEAR 2020</div>
              <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">80,000 sq.ft Medchal Unit</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Established world-class mega manufacturing facility in Medchal bringing high-speed welding lines and automated roll forming under one roof.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-emerald-600 font-mono">TODAY & BEYOND</div>
              <h4 className="text-lg font-bold text-[#0f2b48] font-['Barlow']">Global Delivery</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Delivering 1.2M sq.ft PEB and 700 MW solar structures across India, Tanzania, Vietnam, and Canada with uncompromised quality.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To be the most trusted, innovative, and single-source infrastructure partner for smart prefabricated construction and solar energy solutions across global emerging markets.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f2b48] text-white flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#0f2b48] font-['Barlow'] uppercase">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To empower our clients' growth by delivering speed, structural precision, and cost optimization through automated fabrication, integrated Tekla engineering, and zero-accident site execution.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="py-14 bg-[#0f2b48] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-['Barlow'] uppercase">
            Let's Collaborate on Your Next Landmark Project
          </h3>
          <p className="text-slate-300 text-sm">
            Contact our engineering division to discuss structural parameters, solar capacity design, and execution timelines.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3 rounded-lg text-sm transition-all"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
