import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { 
  Building2, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Weight, 
  ChevronRight, 
  Sun,
  Zap,
  ArrowRight
} from 'lucide-react';

export const ProjectsPage = () => {
  const { projects, setSelectedProject, setIsQuoteOpen } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const categories = [
    'All',
    'PEB & Prefab Buildings',
    'Solar Mounting Solutions',
    'Commercial & Convention Centers',
    'Industrial Warehouses'
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        project.title.toLowerCase().includes(q) ||
        (project.client && project.client.toLowerCase().includes(q)) ||
        (project.location && project.location.toLowerCase().includes(q)) ||
        (project.description && project.description.toLowerCase().includes(q))
      );
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [projects, selectedCategory, statusFilter, searchQuery]);

  return (
    <div className="w-full bg-white text-slate-800">
      
      {/* Clean Banner */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
            Executed Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-['Barlow'] uppercase text-[#0f2b48] tracking-tight">
            Projects Delivered
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Delivering landmark Pre-Engineered Buildings, aerospace manufacturing facilities, and utility-scale solar mounting structures across India and global markets.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by client, title, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Status:</span>
              {['All', 'Completed', 'Ongoing'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                    statusFilter === st
                      ? 'bg-[#0f2b48] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? projects.length 
                : projects.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-4">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-xl font-bold text-slate-700 font-['Barlow']">No Projects Found</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                No projects matched your criteria "{searchQuery}". Try selecting another category or clear search terms.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setStatusFilter('All'); }}
                className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const isSolar = project.category?.toLowerCase().includes('solar');
                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Image */}
                      <div className="h-52 overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#0f2b48]/90 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded backdrop-blur flex items-center gap-1">
                          {isSolar ? <Sun className="w-3 h-3 text-emerald-400" /> : <Building2 className="w-3 h-3 text-emerald-400" />}
                          <span>{project.category}</span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase shadow ${
                            project.status === 'Completed' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        {project.featured && (
                          <div className="absolute bottom-3 left-3 bg-emerald-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow">
                            Key Landmark
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2.5">
                        <h3 className="font-bold text-lg text-[#0f2b48] font-['Barlow'] group-hover:text-emerald-700 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold text-slate-700 truncate max-w-[200px]">
                            {project.client}
                          </span>
                          <span className="flex items-center gap-1 font-mono text-slate-600">
                            <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {project.year}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 text-slate-600 font-semibold">
                        <span className="text-emerald-700 font-bold">{project.area}</span>
                        <span>•</span>
                        <span>{project.tonnage}</span>
                      </div>
                      <span className="text-slate-700 group-hover:text-emerald-700 font-bold flex items-center gap-1">
                        View Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Quote Callout */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <h3 className="text-2xl sm:text-3xl font-bold font-['Barlow'] uppercase text-[#0f2b48]">
            Plan Your Next Solar or Prefab Project With Us
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Our structural design team can review your site layouts and provide preliminary cost budgeting within 24 to 48 hours.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-lg text-sm transition-all shadow-sm"
            >
              Request Project Estimation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
