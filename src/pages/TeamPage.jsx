import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Users, 
  Mail, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Building2, 
  Sun, 
  Briefcase 
} from 'lucide-react';

export const TeamPage = () => {
  const { team, navigateTo } = useData();

  return (
    <div className="w-full bg-white text-slate-800">
      
      {/* Clean Banner */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
            Engineering Leadership
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-['Barlow'] uppercase text-[#0f2b48] tracking-tight">
            Our Core Team
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The visionary engineers and operations veterans driving PEBSOL’s leadership in Pre-Engineered Buildings and Solar Module Mounting Solutions.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Leadership ({team.length} Members)
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
              Management & Technical Directors
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Combining decades of structural engineering expertise with modern automated manufacturing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="h-72 overflow-hidden relative bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
                    
                    {/* Department Badge */}
                    <div className="absolute top-3 left-3 bg-[#0f2b48]/90 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded backdrop-blur">
                      {member.department}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-xs font-bold text-emerald-300">
                        {member.experience}
                      </span>
                      <h3 className="text-xl font-bold font-['Barlow'] text-white">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-slate-200">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Social / Contact Links */}
                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-emerald-700 transition-colors flex items-center gap-1.5 font-medium"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="truncate max-w-[130px]">{member.email}</span>
                  </a>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-emerald-700 transition-colors p-1"
                      title="LinkedIn Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z"/>
                      </svg>
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Careers Callout */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0f2b48] text-white rounded-2xl p-8 sm:p-12 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-xl">
              <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center lg:justify-start gap-1.5">
                <Briefcase className="w-4 h-4" /> Career Opportunities
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Barlow'] uppercase text-white">
                Join the PEBSOL Engineering Team
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We are actively looking for Senior Tekla Structural Modelers, Solar MMS Design Engineers, and On-site Project Managers to join our Medchal headquarters.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:careers@pebsol.in"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3 rounded-lg text-sm transition-all text-center"
              >
                Send CV to HR (careers@pebsol.in)
              </a>
              <button
                onClick={() => navigateTo('contact')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm border border-white/20 transition-all"
              >
                Contact HR Office
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
