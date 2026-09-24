import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ImageUploader } from '../components/ImageUploader';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { 
  ShieldCheck, 
  Lock, 
  Building2, 
  Users, 
  FileText, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  X, 
  Save, 
  LogOut, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Sun,
  Zap 
} from 'lucide-react';

export const AdminPage = () => {
  const { 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    projects, 
    addProject, 
    updateProject, 
    deleteProject,
    team,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    settings,
    updateSettings,
    resetDemoData,
    navigateTo
  } = useData();

  // Login form state
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'team', 'inquiries', 'settings'

  // Modals state
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    category: 'PEB & Prefab Buildings',
    client: '',
    location: '',
    area: '',
    tonnage: '',
    year: '2024',
    status: 'Completed',
    featured: false,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
    description: '',
    highlights: ['']
  });

  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    role: '',
    department: 'Solar MMS Engineering',
    experience: '10+ Years',
    bio: '',
    email: '',
    linkedin: 'https://linkedin.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
  });

  // Settings form state
  const [settingsFormData, setSettingsFormData] = useState({
    companyName: settings.companyName || 'PEBSOL',
    phone: settings.phone || '+91 99632 06999',
    email: settings.email || 'info@pebsol.in',
    address: settings.address || '',
    hours: settings.hours || 'Mon to Sat: 9:00 AM – 6:30 PM'
  });

  // Project search & filter in admin
  const [adminProjectSearch, setAdminProjectSearch] = useState('');

  // Solar & PEB presets
  const imagePresets = [
    { label: 'PEB Aerospace Plant', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Ground Mount Solar Farm', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Rooftop Solar on PEB Shed', url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Commercial Retail Steel', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Convention Hall', url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Heavy Manufacturing Shed', url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Solar Carport Canopy', url: 'https://images.unsplash.com/photo-1558441719-aa34bef57312?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Logistics Warehouse', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200' }
  ];

  const avatarPresets = [
    { label: 'Director / Executive', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800' },
    { label: 'Solar VP / Engineer', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800' },
    { label: 'Structural Architect', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
    { label: 'Plant QA Head', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800' },
    { label: 'Operations Lead', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800' },
    { label: 'Site Erection Head', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800' }
  ];

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await loginAdmin(password);
    if (!res.success) {
      setLoginError(res.error || 'Invalid credentials');
    }
  };

  // Open Project Modal
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectFormData({
      title: '',
      category: 'PEB & Prefab Buildings',
      client: '',
      location: '',
      area: '',
      tonnage: '',
      year: new Date().getFullYear().toString(),
      status: 'Completed',
      featured: false,
      image: imagePresets[0].url,
      description: '',
      highlights: ['Engineered with Tekla 3D modeling', '175 km/h wind certification']
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectFormData({
      title: proj.title || '',
      category: proj.category || 'PEB & Prefab Buildings',
      client: proj.client || '',
      location: proj.location || '',
      area: proj.area || '',
      tonnage: proj.tonnage || '',
      year: proj.year || '',
      status: proj.status || 'Completed',
      featured: Boolean(proj.featured),
      image: proj.image || imagePresets[0].url,
      description: proj.description || '',
      highlights: proj.highlights && proj.highlights.length > 0 ? proj.highlights : ['']
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const cleanedHighlights = projectFormData.highlights.filter(h => h.trim().length > 0);
    const dataToSave = {
      ...projectFormData,
      highlights: cleanedHighlights
    };

    if (editingProject) {
      await updateProject(editingProject.id, dataToSave);
    } else {
      await addProject(dataToSave);
    }
    setProjectModalOpen(false);
  };

  // Open Team Member Modal
  const openNewTeamModal = () => {
    setEditingTeamMember(null);
    setTeamFormData({
      name: '',
      role: '',
      department: 'Solar MMS Engineering',
      experience: '10+ Years',
      bio: '',
      email: '',
      linkedin: 'https://linkedin.com',
      image: avatarPresets[0].url
    });
    setTeamModalOpen(true);
  };

  const openEditTeamModal = (member) => {
    setEditingTeamMember(member);
    setTeamFormData({
      name: member.name || '',
      role: member.role || '',
      department: member.department || 'Executive Leadership',
      experience: member.experience || '',
      bio: member.bio || '',
      email: member.email || '',
      linkedin: member.linkedin || '',
      image: member.image || avatarPresets[0].url
    });
    setTeamModalOpen(true);
  };

  const handleSaveTeam = async (e) => {
    e.preventDefault();
    if (editingTeamMember) {
      await updateTeamMember(editingTeamMember.id, teamFormData);
    } else {
      await addTeamMember(teamFormData);
    }
    setTeamModalOpen(false);
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await updateSettings(settingsFormData);
  };

  // Filtered projects for admin table
  const adminFilteredProjects = projects.filter(p => {
    const q = adminProjectSearch.toLowerCase().trim();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || 
           (p.client && p.client.toLowerCase().includes(q)) || 
           (p.category && p.category.toLowerCase().includes(q)) ||
           (p.location && p.location.toLowerCase().includes(q));
  });

  // If not logged in, show Simple Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          
          <div className="bg-[#0f2b48] p-6 text-white text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h2 className="text-2xl font-black font-['Barlow'] uppercase">PEBSOL Admin Control</h2>
            <p className="text-xs text-slate-300">
              Manage Solar & PEB Projects, Team Members & Client Inquiries
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            {loginError && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter passcode..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Default password: <span className="font-mono text-slate-700 font-bold">pebsol2025</span> or <span className="font-mono text-slate-700 font-bold">admin123</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-lg text-sm shadow-sm transition-all"
            >
              Sign In to Admin Panel
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                ← Return to Public Website
              </button>
            </div>

          </form>

        </div>
      </div>
    );
  }

  // Logged-in Admin Dashboard (Clean, Simple Style)
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* Top Admin Header */}
      <div className="bg-white border-b border-slate-200 py-5 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#0f2b48] text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black font-['Barlow'] uppercase tracking-wide text-[#0f2b48]">
                  PEBSOL Portal Control
                </h1>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border inline-flex items-center space-x-1 ${
                  isSupabaseConfigured()
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  <Zap className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{isSupabaseConfigured() ? 'Supabase Cloud DB' : 'Local Storage Mode'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Manage Solar & PEB Projects, Team Members, and Customer Inquiries
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('home')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center space-x-1.5 border border-red-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </div>

      {/* Metrics Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div 
            onClick={() => setActiveTab('projects')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeTab === 'projects' ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Projects</span>
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-[#0f2b48] font-['Barlow'] mt-1">
              {projects.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Solar & PEB portfolios</p>
          </div>

          <div 
            onClick={() => setActiveTab('team')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeTab === 'team' ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Team Members</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-[#0f2b48] font-['Barlow'] mt-1">
              {team.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Core leadership team</p>
          </div>

          <div 
            onClick={() => setActiveTab('inquiries')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeTab === 'inquiries' ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Inquiries</span>
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-[#0f2b48] font-['Barlow'] mt-1">
              {inquiries.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Quotes submitted</p>
          </div>

          <div 
            onClick={() => setActiveTab('settings')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              activeTab === 'settings' ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Settings & Data</span>
              <Settings className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-[#0f2b48] font-['Barlow'] mt-1">
              Active
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Profile & Demo Reset</p>
          </div>

        </div>
      </div>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'projects' ? 'bg-[#0f2b48] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Manage Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'team' ? 'bg-[#0f2b48] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Manage Team Members ({team.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'inquiries' ? 'bg-[#0f2b48] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Inquiries & Quotes ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'settings' ? 'bg-[#0f2b48] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>Profile & Settings</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={adminProjectSearch}
                  onChange={(e) => setAdminProjectSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                onClick={openNewProjectModal}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3.5">Project Details</th>
                      <th className="px-5 py-3.5">Category</th>
                      <th className="px-5 py-3.5">Client & Location</th>
                      <th className="px-5 py-3.5">Capacity / Area</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {adminFilteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center space-x-3">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-14 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
                            />
                            <div>
                              <span className="font-bold text-slate-900 line-clamp-1">
                                {project.title}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                ID: {project.id}
                              </span>
                              {project.featured && (
                                <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-3.5">
                          <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded border border-slate-200">
                            {project.category}
                          </span>
                        </td>

                        <td className="px-5 py-3.5 text-xs">
                          <div className="font-semibold text-slate-800">{project.client}</div>
                          <div className="text-slate-500">{project.location}</div>
                        </td>

                        <td className="px-5 py-3.5 text-xs">
                          <div className="font-bold text-emerald-700">{project.area}</div>
                          <div className="text-slate-500">{project.tonnage} • {project.year}</div>
                        </td>

                        <td className="px-5 py-3.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            project.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>

                        <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => openEditProjectModal(project)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete project: "${project.title}"?`)) {
                                deleteProject(project.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TEAM MANAGEMENT */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Barlow'] uppercase">
                  PEBSOL Core Leadership ({team.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Manage Solar & PEB leadership profiles, designations, and bios.
                </p>
              </div>

              <button
                onClick={openNewTeamModal}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all flex items-center space-x-2 shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Team Member</span>
              </button>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div 
                  key={member.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover object-top" 
                      />
                      <div className="absolute top-2 right-2 flex items-center space-x-1">
                        <button
                          onClick={() => openEditTeamModal(member)}
                          className="bg-white/95 hover:bg-white text-slate-800 p-1.5 rounded-lg shadow-sm transition-colors"
                          title="Edit Member"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to remove team member: "${member.name}"?`)) {
                              deleteTeamMember(member.id);
                            }
                          }}
                          className="bg-white/95 hover:bg-white text-red-600 p-1.5 rounded-lg shadow-sm transition-colors"
                          title="Delete Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-[#0f2b48]/85 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
                        {member.experience}
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <h4 className="font-bold text-base text-slate-900 font-['Barlow']">
                        {member.name}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-700">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">
                        {member.department}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-3 pt-2">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate max-w-[170px] text-slate-600">{member.email}</span>
                    <button 
                      onClick={() => openEditTeamModal(member)}
                      className="text-emerald-700 hover:text-emerald-800 font-bold"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-['Barlow'] uppercase">
                Customer Inquiries & Quotes ({inquiries.length})
              </h3>
              <p className="text-xs text-slate-500">
                Inquiries submitted for Solar Module Mounting and PEB Buildings.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-2">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700">No Inquiries Received Yet</h4>
                <p className="text-xs text-slate-500">
                  When website visitors submit quotes, they will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div 
                    key={inq.id} 
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-lg text-slate-900 font-['Barlow']">
                            {inq.name}
                          </h4>
                          {inq.company && (
                            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                              {inq.company}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">
                          Received: {new Date(inq.date).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                          className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:border-emerald-600"
                        >
                          <option value="New">New</option>
                          <option value="In Review">In Review</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Resolved">Resolved</option>
                        </select>

                        <button
                          onClick={() => {
                            if (window.confirm('Delete this inquiry?')) {
                              deleteInquiry(inq.id);
                            }
                          }}
                          className="text-slate-400 hover:text-red-600 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block font-semibold uppercase text-[10px]">Contact Info</span>
                        <div className="text-slate-800 font-medium mt-0.5">
                          <a href={`mailto:${inq.email}`} className="text-emerald-700 hover:underline">{inq.email}</a>
                        </div>
                        <div className="text-slate-800 font-medium">
                          <a href={`tel:${inq.phone}`}>{inq.phone}</a>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 block font-semibold uppercase text-[10px]">Scope & Type</span>
                        <div className="font-bold text-slate-800 mt-0.5">{inq.projectType}</div>
                        <div className="text-slate-600">Capacity/Area: {inq.approxArea || 'N/A'}</div>
                      </div>

                      <div>
                        <span className="text-slate-400 block font-semibold uppercase text-[10px]">Site Location</span>
                        <div className="font-medium text-slate-800 mt-0.5">{inq.location || 'India'}</div>
                      </div>
                    </div>

                    {inq.message && (
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                        <span className="font-bold text-slate-500 block text-[10px] uppercase mb-1">Message / Requirements:</span>
                        {inq.message}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 4: SETTINGS & BACKUP */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-2xl">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 font-['Barlow'] uppercase">
                PEBSOL Profile & Contact Information
              </h3>
              <p className="text-xs text-slate-500">
                These settings update the header, footer, and contact details across the website.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company Name</label>
                  <input
                    type="text"
                    value={settingsFormData.companyName}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, companyName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone</label>
                    <input
                      type="text"
                      value={settingsFormData.phone}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Inquiry Email</label>
                    <input
                      type="email"
                      value={settingsFormData.email}
                      onChange={(e) => setSettingsFormData({ ...settingsFormData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Manufacturing Plant Address</label>
                  <input
                    type="text"
                    value={settingsFormData.address}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Working Hours</label>
                  <input
                    type="text"
                    value={settingsFormData.hours}
                    onChange={(e) => setSettingsFormData({ ...settingsFormData, hours: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-lg text-sm transition-all flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </form>
            </div>

            {/* Supabase Cloud Database Status & Vercel / Netlify Info */}
            <div className={`p-6 rounded-xl border space-y-3 ${
              isSupabaseConfigured()
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-amber-50/70 border-amber-200'
            }`}>
              <div className="flex items-center space-x-2">
                <Zap className={`w-5 h-5 ${isSupabaseConfigured() ? 'text-emerald-600' : 'text-amber-600'}`} />
                <h4 className={`font-bold text-base font-['Barlow'] uppercase ${
                  isSupabaseConfigured() ? 'text-emerald-900' : 'text-amber-900'
                }`}>
                  {isSupabaseConfigured() ? '⚡ Supabase Cloud Database Connected' : '📁 Local Storage Mode (Ready for Supabase)'}
                </h4>
              </div>
              <p className={`text-xs leading-relaxed ${
                isSupabaseConfigured() ? 'text-emerald-800' : 'text-amber-800'
              }`}>
                {isSupabaseConfigured()
                  ? 'Your website is directly connected to your Supabase PostgreSQL cloud database. All changes to Projects, Team Members, and Settings are synchronized live to pebprojects.com globally via Vercel/Netlify.'
                  : 'To enable full cloud persistence on Vercel or Netlify, run "supabase_schema.sql" in your Supabase SQL Editor and add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables in your Vercel/Netlify project settings.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                <span className="bg-white/80 border border-slate-200 px-2.5 py-1 rounded font-mono text-slate-700">
                  SQL Schema: supabase_schema.sql
                </span>
                <span className="bg-white/80 border border-slate-200 px-2.5 py-1 rounded font-mono text-slate-700">
                  Guide: SUPABASE_AND_VERCEL_NETLIFY_GUIDE.md
                </span>
              </div>
            </div>

            {/* Reset Defaults */}
            <div className="bg-red-50 p-6 rounded-xl border border-red-200 space-y-3">
              <div className="flex items-center space-x-2 text-red-800">
                <RotateCcw className="w-5 h-5 text-red-600" />
                <h4 className="font-bold text-base font-['Barlow'] uppercase">
                  Reset Demo Data to Initial Defaults
                </h4>
              </div>
              <p className="text-xs text-red-700 leading-relaxed">
                Restore the default PEBSOL demo configuration (4 initial team members, default Solar & PEB projects).
              </p>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all site data back to default template values?')) {
                    resetDemoData();
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center space-x-1.5 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Factory Demo Data</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ================= PROJECT MODAL (ADD / EDIT) ================= */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-[#0f2b48] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold font-['Barlow'] uppercase">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setProjectModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-4 overflow-y-auto">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50 MW Utility-Scale Ground-Mount Solar MMS"
                  value={projectFormData.title}
                  onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category *</label>
                  <select
                    value={projectFormData.category}
                    onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  >
                    <option value="PEB & Prefab Buildings">PEB & Prefab Buildings</option>
                    <option value="Solar Mounting Solutions">Solar Mounting Solutions</option>
                    <option value="Commercial & Convention Centers">Commercial & Convention Centers</option>
                    <option value="Industrial Warehouses">Industrial Warehouses</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Azad Engineering or Solar Corp"
                    value={projectFormData.client}
                    onChange={(e) => setProjectFormData({ ...projectFormData, client: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad, Telangana"
                    value={projectFormData.location}
                    onChange={(e) => setProjectFormData({ ...projectFormData, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Capacity / Area</label>
                  <input
                    type="text"
                    placeholder="e.g. 65,000 sq.ft or 50 MW"
                    value={projectFormData.area}
                    onChange={(e) => setProjectFormData({ ...projectFormData, area: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Steel Tonnage</label>
                  <input
                    type="text"
                    placeholder="e.g. 620 MT"
                    value={projectFormData.tonnage}
                    onChange={(e) => setProjectFormData({ ...projectFormData, tonnage: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Commission Year</label>
                  <input
                    type="text"
                    placeholder="2024"
                    value={projectFormData.year}
                    onChange={(e) => setProjectFormData({ ...projectFormData, year: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status</label>
                  <select
                    value={projectFormData.status}
                    onChange={(e) => setProjectFormData({ ...projectFormData, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
                <div className="flex items-center pt-5">
                  <label className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectFormData.featured}
                      onChange={(e) => setProjectFormData({ ...projectFormData, featured: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Featured on Home</span>
                  </label>
                </div>
              </div>

              {/* Image Uploader (Device Storage + Presets/URL) */}
              <ImageUploader
                value={projectFormData.image}
                onChange={(url) => setProjectFormData({ ...projectFormData, image: url })}
                presets={imagePresets}
                label="Project Photo"
                aspectRatio="video"
                required
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Technical overview of structural design, clear span, wind rating, solar output..."
                  value={projectFormData.description}
                  onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Key Technical Highlights
                </label>
                {projectFormData.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder={`Highlight #${idx + 1}`}
                      value={hl}
                      onChange={(e) => {
                        const newHl = [...projectFormData.highlights];
                        newHl[idx] = e.target.value;
                        setProjectFormData({ ...projectFormData, highlights: newHl });
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                    />
                    {projectFormData.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newHl = projectFormData.highlights.filter((_, i) => i !== idx);
                          setProjectFormData({ ...projectFormData, highlights: newHl });
                        }}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setProjectFormData({ ...projectFormData, highlights: [...projectFormData.highlights, ''] })}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-bold"
                >
                  + Add Another Highlight
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg text-sm shadow-sm transition-all"
                >
                  {editingProject ? 'Update Project' : 'Save Project'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================= TEAM MODAL (ADD / EDIT) ================= */}
      {teamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="bg-[#0f2b48] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold font-['Barlow'] uppercase">
                {editingTeamMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button
                onClick={() => setTeamModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeam} className="p-6 space-y-4 overflow-y-auto">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. M. Venkat Reddy"
                  value={teamFormData.name}
                  onChange={(e) => setTeamFormData({ ...teamFormData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VP & Head of Solar Structures"
                    value={teamFormData.role}
                    onChange={(e) => setTeamFormData({ ...teamFormData, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Experience *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14+ Years"
                    value={teamFormData.experience}
                    onChange={(e) => setTeamFormData({ ...teamFormData, experience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
                <select
                  value={teamFormData.department}
                  onChange={(e) => setTeamFormData({ ...teamFormData, department: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                >
                  <option value="Executive Leadership">Executive Leadership</option>
                  <option value="Solar Module Mounting Solutions">Solar Module Mounting Solutions</option>
                  <option value="Engineering & Tekla Detailing">Engineering & Tekla Detailing</option>
                  <option value="Medchal Plant Operations">Medchal Plant Operations</option>
                  <option value="Project Execution & Erection">Project Execution & Erection</option>
                </select>
              </div>

              {/* Image Uploader (Device Storage + Presets/URL) */}
              <ImageUploader
                value={teamFormData.image}
                onChange={(url) => setTeamFormData({ ...teamFormData, image: url })}
                presets={avatarPresets}
                label="Team Member Photo"
                aspectRatio="square"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="name@pebsol.in"
                    value={teamFormData.email}
                    onChange={(e) => setTeamFormData({ ...teamFormData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={teamFormData.linkedin}
                    onChange={(e) => setTeamFormData({ ...teamFormData, linkedin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Biography</label>
                <textarea
                  rows={3}
                  placeholder="Professional engineering qualifications, accomplishments, and domain expertise..."
                  value={teamFormData.bio}
                  onChange={(e) => setTeamFormData({ ...teamFormData, bio: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setTeamModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg text-sm shadow-sm transition-all"
                >
                  {editingTeamMember ? 'Update Member' : 'Save Member'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
