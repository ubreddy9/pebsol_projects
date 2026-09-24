import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { DEFAULT_PROJECTS, DEFAULT_TEAM, DEFAULT_SETTINGS } from '../data/initialData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  
  // Data states initialized from localStorage or defaults
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('pebsol_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('pebsol_team');
    return saved ? JSON.parse(saved) : DEFAULT_TEAM;
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('pebsol_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('pebsol_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          media: {
            ...DEFAULT_SETTINGS.media,
            ...(parsed.media || {})
          }
        };
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('pebsol_admin_auth') === 'true';
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync with API on mount
  useEffect(() => {
    const fetchData = async () => {
      const serverProjects = await api.getProjects();
      if (serverProjects && serverProjects.length > 0) {
        setProjects(serverProjects);
        localStorage.setItem('pebsol_projects', JSON.stringify(serverProjects));
      }

      const serverTeam = await api.getTeam();
      if (serverTeam && serverTeam.length > 0) {
        setTeam(serverTeam);
        localStorage.setItem('pebsol_team', JSON.stringify(serverTeam));
      }

      const serverInquiries = await api.getInquiries();
      if (serverInquiries) {
        setInquiries(serverInquiries);
        localStorage.setItem('pebsol_inquiries', JSON.stringify(serverInquiries));
      }

      const serverSettings = await api.getSettings();
      if (serverSettings) {
        setSettings(prev => {
          const merged = {
            ...prev,
            ...serverSettings,
            media: {
              ...(prev.media || {}),
              ...(serverSettings.media || {})
            }
          };
          localStorage.setItem('pebsol_settings', JSON.stringify(merged));
          return merged;
        });
      }
    };

    fetchData();
  }, []);

  // Save to localStorage whenever states change
  useEffect(() => {
    localStorage.setItem('pebsol_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('pebsol_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('pebsol_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('pebsol_settings', JSON.stringify(settings));
  }, [settings]);

  // Navigation helper
  const navigateTo = (page, param = null) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (param && param.projectId) {
      const proj = projects.find(p => p.id === param.projectId);
      if (proj) setSelectedProject(proj);
    }
  };

  // ================= Project CRUD =================
  const addProject = async (projectData) => {
    const newProj = {
      ...projectData,
      id: 'proj-' + Date.now(),
      year: projectData.year || new Date().getFullYear().toString(),
      status: projectData.status || 'Completed'
    };
    
    // Update local state immediately (optimistic UI)
    setProjects(prev => [newProj, ...prev]);
    showToast('Project created successfully!');

    // Sync with backend API
    await api.addProject(newProj);
    return newProj;
  };

  const updateProject = async (id, updatedData) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updatedData } : p)));
    showToast('Project updated successfully!');
    await api.updateProject(id, updatedData);
  };

  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project deleted', 'info');
    await api.deleteProject(id);
  };

  // ================= Team CRUD =================
  const addTeamMember = async (memberData) => {
    const newMember = {
      ...memberData,
      id: 'team-' + Date.now()
    };
    setTeam(prev => [...prev, newMember]);
    showToast('Team member added!');
    await api.addTeamMember(newMember);
    return newMember;
  };

  const updateTeamMember = async (id, updatedData) => {
    setTeam(prev => prev.map(m => (m.id === id ? { ...m, ...updatedData } : m)));
    showToast('Team member updated!');
    await api.updateTeamMember(id, updatedData);
  };

  const deleteTeamMember = async (id) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    showToast('Team member deleted', 'info');
    await api.deleteTeamMember(id);
  };

  // ================= Inquiry Management =================
  const submitInquiry = async (inquiryData) => {
    const newInq = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      status: 'New',
      date: new Date().toISOString()
    };
    setInquiries(prev => [newInq, ...prev]);
    showToast('Thank you! Your inquiry has been submitted. Our engineering team will contact you shortly.');
    await api.submitInquiry(newInq);
    return true;
  };

  const updateInquiryStatus = async (id, status) => {
    setInquiries(prev => prev.map(i => (i.id === id ? { ...i, status } : i)));
    showToast(`Inquiry status updated to ${status}`);
    await api.updateInquiry(id, { status });
  };

  const deleteInquiry = async (id) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
    showToast('Inquiry removed', 'info');
    await api.deleteInquiry(id);
  };

  // ================= Settings & Reset =================
  const updateSettingsData = async (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Settings saved!');
    await api.updateSettings(newSettings);
  };

  const resetDemoData = async () => {
    setProjects(DEFAULT_PROJECTS);
    setTeam(DEFAULT_TEAM);
    setSettings(DEFAULT_SETTINGS);
    setInquiries([]);
    localStorage.removeItem('pebsol_projects');
    localStorage.removeItem('pebsol_team');
    localStorage.removeItem('pebsol_inquiries');
    localStorage.removeItem('pebsol_settings');
    showToast('Website demo data restored to factory defaults!', 'info');
    await api.resetDemo();
  };

  // ================= Admin Auth =================
  const loginAdmin = async (password) => {
    const res = await api.adminLogin(password);
    if (res && res.success) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('pebsol_admin_auth', 'true');
      showToast('Logged in as Administrator');
      return { success: true };
    } else {
      showToast(res?.error || 'Incorrect passcode', 'error');
      return { success: false, error: res?.error || 'Invalid passcode' };
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pebsol_admin_auth');
    showToast('Logged out of admin panel', 'info');
  };

  return (
    <DataContext.Provider
      value={{
        currentPage,
        navigateTo,
        projects,
        addProject,
        updateProject,
        deleteProject,
        team,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        settings,
        updateSettings: updateSettingsData,
        resetDemoData,
        selectedProject,
        setSelectedProject,
        isQuoteOpen,
        setIsQuoteOpen,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        toastMessage,
        showToast
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
