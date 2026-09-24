import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Sun, 
  CheckCircle2,
  Globe 
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo, settings, setIsQuoteOpen } = useData();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Callout */}
        <div className="bg-[#0f2b48] rounded-2xl p-8 mb-16 border border-slate-700/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase flex items-center justify-center md:justify-start gap-1.5">
              <Sun className="w-4 h-4 text-emerald-400" /> Engineering Progress • Empowering Growth
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Barlow']">
              Ready to Build Your Prefab or Solar Infrastructure?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              From concept planning and Tekla detailing to automated fabrication and on-site commissioning.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all shadow-md flex items-center space-x-2"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-lg text-sm border border-white/20 transition-all flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-sm">
          
          {/* Col 1: About PEBSOL */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight uppercase font-['Barlow']">
                Peb<span className="text-emerald-400">Sol</span> Projects
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Founded in 2009 in Hyderabad, PebSol Projects is an industry leader delivering complete, end-to-end Pre-Engineered Buildings and Solar Module Mounting Structures across India and international markets.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> ISO 9001:2015
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                <Globe className="w-3.5 h-3.5 text-emerald-400" /> 4 Countries
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold font-['Barlow'] uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-emerald-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-emerald-400 transition-colors">
                  About Us & Journey
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-emerald-400 transition-colors">
                  PEB & Solar Services
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('projects')} className="hover:text-emerald-400 transition-colors">
                  Projects Delivered
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('team')} className="hover:text-emerald-400 transition-colors">
                  Our Engineering Team
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-emerald-400 hover:underline flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white text-base font-bold font-['Barlow'] uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
              Services & Products
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('services')}>
                • PEB & Prefab Buildings
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('services')}>
                • Solar Module Mounting Structures (MMS)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('services')}>
                • Commercial & Convention Centers
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('services')}>
                • Industrial Warehouses & Logistics Hubs
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('services')}>
                • Light-Gauge Steel Housing (LGSF)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo('services')}>
                • Solar Rooftop & Carport Canopies
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Facility */}
          <div>
            <h4 className="text-white text-base font-bold font-['Barlow'] uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-3">
              Plant & Office
            </h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{settings.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-400 font-semibold text-white">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-emerald-400">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs">{settings.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PebSol Projects. All rights reserved. Engineering Progress. Empowering Growth.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => navigateTo('about')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => navigateTo('about')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={() => navigateTo('admin')} className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
