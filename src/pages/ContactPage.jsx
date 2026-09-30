import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Building2, 
  CheckCircle2, 
  Sun, 
  Factory, 
  Globe 
} from 'lucide-react';

export const ContactPage = () => {
  const { settings, submitInquiry } = useData();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'PEB & Prefab Buildings',
    approxArea: '',
    location: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitInquiry(formData);
    setSubmitting(false);
    setSuccess(true);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      projectType: 'PEB & Prefab Buildings',
      approxArea: '',
      location: '',
      message: ''
    });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="w-full bg-white text-slate-800">
      
      {/* Simple Clean Banner */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-['Barlow'] uppercase text-[#0f2b48] tracking-tight">
            Contact PEBSOL
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Connect with our engineering estimation desk or schedule a visit to our 80,000 sq.ft manufacturing facility in Medchal.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details (Left 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Corporate Coordination
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
                  Let's Discuss Your Structure or Solar Project
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Our senior structural engineers and solar mounting specialists are ready to help optimize your technical specifications and bill of quantities.
                </p>
              </div>

              <div className="space-y-3.5">
                
                {/* Office Address */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-['Barlow'] uppercase">
                      Corporate Office
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {settings.address}
                    </p>
                  </div>
                </div>

                {/* Factory Address */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Factory className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-['Barlow'] uppercase">
                      Manufacturing Factory
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {settings.factoryAddress || 'Medak, Telangana'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Heavy steel fabrication, roll-forming & solar MMS production</p>
                  </div>
                </div>

                {/* Contact Person & Phone */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-slate-900 text-sm font-['Barlow'] uppercase">
                        Upender Reddy
                      </h4>
                      <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        Managing Director
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 font-semibold mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <a href={`tel:${(settings.phone || '+91 95424 45555').replace(/\s+/g, '')}`} className="hover:text-emerald-600 text-slate-900">
                        {settings.phone || '+91 95424 45555'}
                      </a>
                      <span className="text-slate-300">|</span>
                      <a href={`tel:${(settings.secondaryPhone || '+91 87122 07555').replace(/\s+/g, '')}`} className="hover:text-emerald-600 text-slate-900">
                        {settings.secondaryPhone || '+91 87122 07555'}
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Direct technical desk & project consultations</p>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-['Barlow'] uppercase">
                      Official Email
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      <a href={`mailto:${settings.email}`} className="text-emerald-700 font-semibold hover:underline">
                        {settings.email}
                      </a>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Website: pebsolprojects.com</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-['Barlow'] uppercase">
                      Office Working Hours
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">{settings.hours}</p>
                    <p className="text-[11px] text-slate-400">Manufacturing units operate in continuous shifts</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Inquiries Form (Right 7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 sm:p-10 space-y-6">
                
                <div>
                  <h3 className="text-2xl font-black text-[#0f2b48] font-['Barlow'] uppercase">
                    Send Project Inquiries
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Submit your building parameters or solar mounting capacity for immediate engineering review.
                  </p>
                </div>

                {success && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center space-x-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Your inquiry has been successfully transmitted to our engineering team!</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ABC Energy / Infra Ltd"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99632 06999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Project Category *
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                      >
                        <option value="PEB & Prefab Buildings">PEB & Prefab Buildings</option>
                        <option value="Solar Module Mounting (Ground Mount)">Solar MMS - Ground Mount</option>
                        <option value="Solar Module Mounting (Rooftop)">Solar MMS - Industrial Rooftop</option>
                        <option value="Solar Carports & EV Canopies">Solar Carports & EV Canopies</option>
                        <option value="Commercial & Convention Centers">Commercial & Convention Centers</option>
                        <option value="Industrial Warehouses">Industrial Warehouses</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Approx Area / Capacity
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 50,000 sq.ft or 15 MW"
                        value={formData.approxArea}
                        onChange={(e) => setFormData({ ...formData, approxArea: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Project Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad, Telangana"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Scope / Specifications
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify building height, clear span, wind speed, tilt angle, or timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-lg text-sm transition-all flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting...' : 'Send Inquiry to PEBSOL'}</span>
                  </button>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
