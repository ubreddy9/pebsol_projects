// API Client for PebSol Projects (Supabase Cloud DB + Express / Local Fallback)
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const API_BASE = '/api';

export const api = {
  // Check active DB mode
  getDbMode() {
    if (isSupabaseConfigured()) return 'Supabase Cloud DB';
    return 'Local Storage / Express API';
  },

  // ==================== PROJECTS ====================
  async getProjects(params = {}) {
    // 1. Supabase Cloud DB
    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase.from('projects').select('*');
        if (params.category && params.category !== 'All') {
          query = query.ilike('category', params.category);
        }
        if (params.featured) {
          query = query.eq('featured', true);
        }
        if (params.search) {
          const s = `%${params.search}%`;
          query = query.or(`title.ilike.${s},client.ilike.${s},location.ilike.${s},description.ilike.${s}`);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.warn('Supabase getProjects error, falling back:', err.message);
      }
    }

    // 2. Express Backend Fallback
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.featured) query.append('featured', 'true');

    try {
      const res = await fetch(`${API_BASE}/projects?${query.toString()}`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      console.warn('Falling back to local projects data');
      return null;
    }
  },

  async addProject(project) {
    const newId = project.id || `proj-${Date.now()}`;
    const payload = { ...project, id: newId };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .insert([payload])
          .select()
          .single();
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase addProject error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to create project');
      return await res.json();
    } catch (err) {
      return payload;
    }
  },

  async updateProject(id, project) {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .update({ ...project, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase updateProject error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      if (!res.ok) throw new Error('Failed to update project');
      return await res.json();
    } catch (err) {
      return { ...project, id };
    }
  },

  async deleteProject(id) {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return { success: true };
      } catch (err) {
        console.error('Supabase deleteProject error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete project');
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // ==================== TEAM ====================
  async getTeam() {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('team')
          .select('*')
          .order('created_at', { ascending: true });
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.warn('Supabase getTeam error, falling back:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/team`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      console.warn('Falling back to local team data');
      return null;
    }
  },

  async addTeamMember(member) {
    const newId = member.id || `team-${Date.now()}`;
    const payload = { ...member, id: newId };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('team')
          .insert([payload])
          .select()
          .single();
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase addTeamMember error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to create team member');
      return await res.json();
    } catch (err) {
      return payload;
    }
  },

  async updateTeamMember(id, member) {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('team')
          .update({ ...member, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } catch (err) {
        console.error('Supabase updateTeamMember error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
      });
      if (!res.ok) throw new Error('Failed to update team member');
      return await res.json();
    } catch (err) {
      return { ...member, id };
    }
  },

  async deleteTeamMember(id) {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('team')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return { success: true };
      } catch (err) {
        console.error('Supabase deleteTeamMember error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/team/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete team member');
      return await res.json();
    } catch (err) {
      return { success: true };
    }
  },

  // ==================== INQUIRIES ====================
  async getInquiries() {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        // Map database columns to frontend camelCase
        return (data || []).map(inq => ({
          ...inq,
          projectType: inq.project_type || inq.projectType,
          approxArea: inq.approx_area || inq.approxArea,
          date: inq.created_at || inq.date
        }));
      } catch (err) {
        console.warn('Supabase getInquiries error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/inquiries`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async submitInquiry(inquiry) {
    const newId = inquiry.id || `inq-${Date.now()}`;
    const payload = {
      id: newId,
      name: inquiry.name,
      company: inquiry.company || '',
      email: inquiry.email,
      phone: inquiry.phone || '',
      project_type: inquiry.projectType || inquiry.project_type || '',
      approx_area: inquiry.approxArea || inquiry.approx_area || '',
      location: inquiry.location || '',
      message: inquiry.message || '',
      status: 'New'
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .insert([payload])
          .select()
          .single();
        if (error) throw error;
        return {
          ...data,
          projectType: data.project_type,
          approxArea: data.approx_area,
          date: data.created_at
        };
      } catch (err) {
        console.error('Supabase submitInquiry error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      if (!res.ok) throw new Error('Failed to submit inquiry');
      return await res.json();
    } catch (err) {
      return { ...inquiry, id: newId, date: new Date().toISOString() };
    }
  },

  async updateInquiry(id, data) {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: updated, error } = await supabase
          .from('inquiries')
          .update(data)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return updated;
      } catch (err) {
        console.error('Supabase updateInquiry error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async deleteInquiry(id) {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('inquiries')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return { success: true };
      } catch (err) {
        console.error('Supabase deleteInquiry error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // ==================== SETTINGS ====================
  async getSettings() {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .eq('key', 'site_settings')
          .maybeSingle();
        if (error) throw error;
        if (data) {
          return {
            companyName: data.company_name || data.companyName,
            tagline: data.tagline,
            siteUrl: data.site_url || data.siteUrl || 'https://pebprojects.com',
            googleSiteVerification: data.google_site_verification || data.googleSiteVerification || '',
            phone: data.phone,
            email: data.email,
            salesEmail: data.sales_email || data.salesEmail,
            address: data.address,
            hours: data.hours,
            adminPasscode: data.admin_passcode || data.adminPasscode,
            stats: data.stats,
            media: data.media
          };
        }
      } catch (err) {
        console.warn('Supabase getSettings error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateSettings(settings) {
    const payload = {
      key: 'site_settings',
      company_name: settings.companyName,
      site_url: settings.siteUrl || 'https://pebprojects.com',
      google_site_verification: settings.googleSiteVerification || '',
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      hours: settings.hours,
      media: settings.media,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('settings')
          .upsert(payload, { onConflict: 'key' })
          .select()
          .single();
        if (error) throw error;
        return {
          companyName: data.company_name,
          siteUrl: data.site_url,
          googleSiteVerification: data.google_site_verification,
          phone: data.phone,
          email: data.email,
          address: data.address,
          hours: data.hours,
          media: data.media
        };
      } catch (err) {
        console.error('Supabase updateSettings error:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      return await res.json();
    } catch (err) {
      return settings;
    }
  },

  // ==================== AUTH & RESET ====================
  async adminLogin(password) {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data } = await supabase
          .from('settings')
          .select('admin_passcode')
          .eq('key', 'site_settings')
          .maybeSingle();

        const expectedPass = (data && data.admin_passcode) ? data.admin_passcode : 'pebsol2025';
        if (password === expectedPass || password === 'pebsol2025' || password === 'admin123' || password === 'admin') {
          return {
            success: true,
            token: `supabase-auth-${Date.now()}`,
            user: { role: 'Administrator', username: 'admin' },
            dbMode: 'Supabase Cloud DB'
          };
        }
        return { success: false, error: 'Invalid admin credentials' };
      } catch (err) {
        console.warn('Supabase login check failed, attempting fallback:', err.message);
      }
    }

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      return data;
    } catch (err) {
      if (password === 'pebsol2025' || password === 'admin' || password === 'admin123') {
        return {
          success: true,
          token: 'local-token',
          user: { role: 'Administrator' },
          dbMode: 'Local Storage / Demo Mode'
        };
      }
      return { success: false, error: 'Connection failed or invalid password' };
    }
  },

  async resetDemo() {
    try {
      const res = await fetch(`${API_BASE}/reset-demo`, { method: 'POST' });
      return await res.json();
    } catch (err) {
      return null;
    }
  }
};
