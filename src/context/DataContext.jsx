import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { DEFAULT_PROJECTS, DEFAULT_TEAM, DEFAULT_SETTINGS } from '../data/initialData';

const PAGE_TITLES = {
  home: "PebSol Projects | Pre-Engineered Buildings & Solar Mounting Solutions",
  about: "About Us | PebSol Projects - Prefab & Solar Infrastructure",
  services: "Services | PEB Construction & Solar MMS Solutions | PebSol Projects",
  projects: "Projects Delivered | Landmark PEB & Solar Projects | PebSol Projects",
  team: "Engineering Leadership & Team | PebSol Projects",
  contact: "Contact Us | Get a Quote for PEB & Solar Infra | PebSol Projects",
  admin: "Admin Portal | PebSol Projects"
};

const getPageFromUrl = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const validPages = ['home', 'about', 'services', 'projects', 'team', 'contact', 'admin'];
  if (validPages.includes(path)) return path;
  return 'home';
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const initialPage = getPageFromUrl();
    if (typeof document !== 'undefined' && PAGE_TITLES[initialPage]) {
      document.title = PAGE_TITLES[initialPage];
    }
    return initialPage;
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  
  const DATA_VERSION = 'v2_upender_card';

  // Data states initialized from localStorage or defaults
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('pebsol_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [team, setTeam] = useState(() => {
    const version = localStorage.getItem('pebsol_data_version');
    if (version !== DATA_VERSION) {
      localStorage.setItem('pebsol_data_version', DATA_VERSION);
      localStorage.setItem('pebsol_team', JSON.stringify(DEFAULT_TEAM));
      return DEFAULT_TEAM;
    }
    const saved = localStorage.getItem('pebsol_team');
    return saved ? JSON.parse(saved) : DEFAULT_TEAM;
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('pebsol_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const cleanMedia = (media = {}) => {
    const cleaned = { ...DEFAULT_SETTINGS.media, ...media };
    const bad404s = [
      'photo-1509391365360-2e959784a276',
      'photo-1541888946425-d0fbb18615f3',
      'photo-1558441719-aa34bef57312',
      'photo-1504917599217-d4dc5ebe6122'
    ];
    for (const [k, v] of Object.entries(cleaned)) {
      if (typeof v === 'string' && bad404s.some(b => v.includes(b))) {
        cleaned[k] = DEFAULT_SETTINGS.media[k] || v;
      }
    }
    return cleaned;
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('pebsol_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.siteUrl === 'https://pebprojects.com') {
          parsed.siteUrl = 'https://pebsolprojects.com';
        }
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          managingDirector: parsed.managingDirector || DEFAULT_SETTINGS.managingDirector,
          phone: parsed.phone || DEFAULT_SETTINGS.phone,
          secondaryPhone: parsed.secondaryPhone || DEFAULT_SETTINGS.secondaryPhone,
          factoryAddress: parsed.factoryAddress || DEFAULT_SETTINGS.factoryAddress,
          media: cleanMedia(parsed.media)
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

  // Synchronize browser history and popstate for Googlebot and user back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromUrl();
      setCurrentPage(page);
      if (PAGE_TITLES[page]) {
        document.title = PAGE_TITLES[page];
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation helper with clean SEO URLs and dynamic document titles
  const navigateTo = (page, param = null) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window !== 'undefined') {
      const targetPath = page === 'home' ? '/' : `/${page}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page }, '', targetPath);
      }
      if (PAGE_TITLES[page]) {
        document.title = PAGE_TITLES[page];
      }
    }

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
    
    // Update local state immediately (optimistic UI) and persist to localStorage
    setProjects(prev => {
      const updated = [newProj, ...prev];
      try { localStorage.setItem('pebsol_projects', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Project created successfully!');

    // Sync with backend API
    await api.addProject(newProj);
    return newProj;
  };

  const updateProject = async (id, updatedData) => {
    setProjects(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, ...updatedData } : p));
      try { localStorage.setItem('pebsol_projects', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Project updated successfully!');
    await api.updateProject(id, updatedData);
  };

  const deleteProject = async (id) => {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== id);
      try { localStorage.setItem('pebsol_projects', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Project deleted', 'info');
    await api.deleteProject(id);
  };

  // ================= Team CRUD =================
  const addTeamMember = async (memberData) => {
    const newMember = {
      ...memberData,
      id: 'team-' + Date.now()
    };
    setTeam(prev => {
      const updated = [...prev, newMember];
      try { localStorage.setItem('pebsol_team', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Team member added!');
    await api.addTeamMember(newMember);
    return newMember;
  };

  const updateTeamMember = async (id, updatedData) => {
    setTeam(prev => {
      const updated = prev.map(m => (m.id === id ? { ...m, ...updatedData } : m));
      try { localStorage.setItem('pebsol_team', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Team member updated!');
    await api.updateTeamMember(id, updatedData);
  };

  const deleteTeamMember = async (id) => {
    setTeam(prev => {
      const updated = prev.filter(m => m.id !== id);
      try { localStorage.setItem('pebsol_team', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
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
    setInquiries(prev => {
      const updated = [newInq, ...prev];
      try { localStorage.setItem('pebsol_inquiries', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Thank you! Your inquiry has been submitted. Our engineering team will contact you shortly.');
    await api.submitInquiry(newInq);
    return true;
  };

  const updateInquiryStatus = async (id, status) => {
    setInquiries(prev => {
      const updated = prev.map(i => (i.id === id ? { ...i, status } : i));
      try { localStorage.setItem('pebsol_inquiries', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast(`Inquiry status updated to ${status}`);
    await api.updateInquiry(id, { status });
  };

  const deleteInquiry = async (id) => {
    setInquiries(prev => {
      const updated = prev.filter(i => i.id !== id);
      try { localStorage.setItem('pebsol_inquiries', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast('Inquiry removed', 'info');
    await api.deleteInquiry(id);
  };

  // ================= Settings & Reset =================
  const updateSettingsData = async (newSettings) => {
    setSettings(prev => {
      const merged = {
        ...prev,
        ...newSettings,
        media: {
          ...(prev.media || {}),
          ...(newSettings.media || {})
        }
      };
      try {
        localStorage.setItem('pebsol_settings', JSON.stringify(merged));
      } catch (err) {
        console.warn('LocalStorage save failed:', err);
      }
      return merged;
    });
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
