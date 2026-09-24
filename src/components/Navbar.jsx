import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Sun, 
  Building2,
  Zap,
  Globe
} from 'lucide-react';

export const Navbar = () => {
  const { currentPage, navigateTo, setIsQuoteOpen, settings, projects, team, isAdminLoggedIn } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects Delivered', badge: projects.length },
    { id: 'team', label: 'Our Team', badge: team.length },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNav = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full z-40 sticky top-0 shadow-sm bg-white">
      {/* Top Simple Utility Bar */}
      <div className="bg-slate-50 text-slate-600 text-xs py-2 px-4 border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center space-x-6">
            <a 
              href={`tel:${settings.phone.replace(/\s+/g, '')}`} 
              className="flex items-center space-x-1.5 hover:text-emerald-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium text-slate-700">{settings.phone}</span>
            </a>
            <a 
              href={`mailto:${settings.email}`} 
              className="flex items-center space-x-1.5 hover:text-emerald-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>{settings.email}</span>
            </a>
            <div className="flex items-center space-x-1.5 text-slate-500">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>India • Tanzania • Vietnam • Canada</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>HITEX / Shilpa Layout, Hyderabad</span>
            </div>
            <span className="text-slate-300">|</span>
            <button 
              onClick={() => handleNav('admin')}
              className={`flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs transition-colors font-medium ${
                currentPage === 'admin' 
                  ? 'bg-emerald-600 text-white font-bold' 
                  : 'bg-slate-200/80 hover:bg-slate-300 text-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isAdminLoggedIn ? 'Admin Panel (Active)' : 'Admin Login'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Clean White Navbar */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div 
              onClick={() => handleNav('home')} 
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0f2b48] flex items-center justify-center text-white shadow-sm group-hover:bg-[#1a3d66] transition-colors relative">
                <Building2 className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Sun className="w-2 h-2 text-white" />
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-2xl font-black tracking-tight text-[#0f2b48] font-['Barlow'] uppercase">
                    Peb<span className="text-emerald-600">Sol</span> <span className="text-[#0f2b48]">Projects</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    PREFAB • SOLAR
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                  Engineering Progress. Empowering Growth.
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 flex items-center space-x-1.5 ${
                      isActive 
                        ? 'text-emerald-700 bg-emerald-50/80 font-bold' 
                        : 'text-slate-700 hover:text-[#0f2b48] hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Action Button */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm shadow-sm hover:shadow transition-all flex items-center space-x-2 active:scale-95"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-md"
              >
                Inquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-700">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
            
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => handleNav('admin')}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-800 bg-slate-100 flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Admin Portal</span>
              </button>
              <div className="text-xs text-slate-500 px-3.5 pt-2">
                <p>Call Us: {settings.phone}</p>
                <p>Email: {settings.email}</p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
