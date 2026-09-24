import React from 'react';
import { useData } from '../context/DataContext';
import { X, MapPin, Calendar, Building2, Weight, CheckCircle2, ArrowRight, Sun, Zap } from 'lucide-react';

export const ProjectDetailModal = () => {
  const { selectedProject, setSelectedProject, setIsQuoteOpen } = useData();

  if (!selectedProject) return null;

  const isSolar = selectedProject.category?.toLowerCase().includes('solar');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#0f2b48] px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
              {isSolar ? <Sun className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
              {selectedProject.category}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
              selectedProject.status === 'Completed' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              {selectedProject.status}
            </span>
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Project Image Banner */}
          <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden shadow-inner group">
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Barlow'] text-white">
                {selectedProject.title}
              </h2>
              <p className="text-emerald-400 text-sm font-semibold">
                Client: {selectedProject.client}
              </p>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Location</span>
              <div className="flex items-center space-x-1.5 text-sm font-bold text-slate-900">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{selectedProject.location}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                {isSolar ? 'Capacity' : 'Built-up Area'}
              </span>
              <div className="flex items-center space-x-1.5 text-sm font-bold text-slate-900">
                {isSolar ? <Zap className="w-4 h-4 text-emerald-600 shrink-0" /> : <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                <span>{selectedProject.area}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Steel / Structure</span>
              <div className="flex items-center space-x-1.5 text-sm font-bold text-slate-900">
                <Weight className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{selectedProject.tonnage}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Commissioned Year</span>
              <div className="flex items-center space-x-1.5 text-sm font-bold text-slate-900">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{selectedProject.year}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-base font-bold font-['Barlow'] uppercase tracking-wider text-slate-900">
              Project Overview & Execution
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {selectedProject.description}
            </p>
          </div>

          {/* Engineering Highlights */}
          {selectedProject.highlights && selectedProject.highlights.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-base font-bold font-['Barlow'] uppercase tracking-wider text-emerald-700">
                Key Technical & Engineering Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProject.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Project Code: <span className="font-mono text-slate-700 font-bold">{selectedProject.id}</span>
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedProject(null)}
              className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setSelectedProject(null);
                setIsQuoteOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-lg text-sm transition-all flex items-center space-x-2 shadow-sm"
            >
              <span>Inquire for Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
