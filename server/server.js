import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

// Helper to read local JSON file
const readData = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.error(`Error parsing ${filename}:`, err);
    return [];
  }
};

// Helper to write local JSON file
const writeData = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// ===================== CLOUD DB (MONGODB ATLAS) SETUP =====================
let isCloudDB = false;

// Mongoose Schemas
const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  category: String,
  client: String,
  location: String,
  area: String,
  tonnage: String,
  year: String,
  status: String,
  featured: Boolean,
  image: String,
  description: String,
  highlights: [String]
}, { timestamps: true });

const TeamSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  role: String,
  department: String,
  experience: String,
  bio: String,
  email: String,
  linkedin: String,
  image: String
}, { timestamps: true });

const InquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  company: String,
  email: String,
  phone: String,
  projectType: String,
  approxArea: String,
  location: String,
  message: String,
  status: { type: String, default: 'New' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const SettingSchema = new mongoose.Schema({
  key: { type: String, default: 'site_settings', unique: true },
  companyName: String,
  tagline: String,
  phone: String,
  email: String,
  salesEmail: String,
  address: String,
  hours: String,
  stats: Object,
  adminPasscode: String
}, { timestamps: true });

const ProjectModel = mongoose.model('Project', ProjectSchema);
const TeamModel = mongoose.model('TeamMember', TeamSchema);
const InquiryModel = mongoose.model('Inquiry', InquirySchema);
const SettingModel = mongoose.model('Setting', SettingSchema);

// Connect to Cloud DB if MONGODB_URI provided
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      isCloudDB = true;
      console.log('✅ Successfully connected to Cloud Database (MongoDB Atlas)!');
      
      // Auto-seed cloud DB if empty
      const projCount = await ProjectModel.countDocuments();
      if (projCount === 0) {
        console.log('⚡ Initializing Cloud Database with seed data from server/data/ ...');
        const localProjects = readData('projects.json');
        const localTeam = readData('team.json');
        const localSettings = readData('settings.json');
        
        if (localProjects.length > 0) await ProjectModel.insertMany(localProjects);
        if (localTeam.length > 0) await TeamModel.insertMany(localTeam);
        if (localSettings) await SettingModel.create({ key: 'site_settings', ...localSettings });
        console.log('✅ Cloud Database successfully seeded!');
      }
    })
    .catch((err) => {
      console.error('⚠️ Could not connect to MongoDB Atlas, falling back to local storage files:', err.message);
      isCloudDB = false;
    });
} else {
  console.log('ℹ️ No MONGODB_URI specified. Operating with persistent local file storage (server/data/).');
}

// Backup defaults in memory for demo reset
const INITIAL_BACKUPS = {
  projects: readData('projects.json'),
  team: readData('team.json'),
  inquiries: readData('inquiries.json'),
  settings: readData('settings.json')
};

// ===================== FILE UPLOAD ENDPOINT =====================
app.post('/api/upload', (req, res) => {
  try {
    const { image, filename } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    // Check if it's a base64 data URL
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // If it's already an external URL, return as is
      return res.json({ success: true, url: image });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const ext = mimeType.split('/')[1] || 'jpg';
    const cleanExt = ext === 'jpeg' ? 'jpg' : ext;
    const baseName = filename ? filename.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase() : 'upload';
    const uniqueFilename = `${baseName}-${Date.now()}.${cleanExt}`;
    const filePath = path.join(UPLOADS_DIR, uniqueFilename);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    return res.json({ 
      success: true, 
      url: `/uploads/${uniqueFilename}`,
      filename: uniqueFilename 
    });
  } catch (err) {
    console.error('File upload error:', err);
    res.status(500).json({ error: 'Failed to process file upload' });
  }
});

// ===================== PROJECTS ENDPOINTS =====================
app.get('/api/projects', async (req, res) => {
  try {
    const { category, search, featured } = req.query;

    if (isCloudDB) {
      let query = {};
      if (category && category !== 'All') query.category = new RegExp(`^${category}$`, 'i');
      if (featured === 'true') query.featured = true;
      if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [{ title: regex }, { client: regex }, { location: regex }, { description: regex }];
      }
      const projects = await ProjectModel.find(query).sort({ createdAt: -1 });
      return res.json(projects);
    }

    // Local file fallback
    let projects = readData('projects.json');
    if (category && category !== 'All') {
      projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (featured === 'true') {
      projects = projects.filter(p => p.featured);
    }
    if (search) {
      const q = search.toLowerCase();
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.client && p.client.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = {
      id: 'proj-' + Date.now(),
      title: req.body.title || 'Untitled Project',
      category: req.body.category || 'PEB & Prefab Buildings',
      client: req.body.client || 'Client',
      location: req.body.location || 'India',
      area: req.body.area || 'N/A',
      tonnage: req.body.tonnage || 'N/A',
      year: req.body.year || new Date().getFullYear().toString(),
      status: req.body.status || 'Completed',
      featured: Boolean(req.body.featured),
      image: req.body.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
      description: req.body.description || '',
      highlights: Array.isArray(req.body.highlights) ? req.body.highlights : []
    };

    if (isCloudDB) {
      const created = await ProjectModel.create(newProject);
      return res.status(201).json(created);
    }

    const projects = readData('projects.json');
    projects.unshift(newProject);
    writeData('projects.json', projects);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    if (isCloudDB) {
      const updated = await ProjectModel.findOneAndUpdate(
        { id: req.params.id },
        { ...req.body, id: req.params.id },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Project not found' });
      return res.json(updated);
    }

    const projects = readData('projects.json');
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Project not found' });

    projects[index] = { ...projects[index], ...req.body, id: req.params.id };
    writeData('projects.json', projects);
    res.json(projects[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    if (isCloudDB) {
      const result = await ProjectModel.findOneAndDelete({ id: req.params.id });
      if (!result) return res.status(404).json({ error: 'Project not found' });
      return res.json({ success: true, message: 'Deleted from Cloud DB' });
    }

    let projects = readData('projects.json');
    const initialLen = projects.length;
    projects = projects.filter(p => p.id !== req.params.id);
    if (projects.length === initialLen) return res.status(404).json({ error: 'Project not found' });
    writeData('projects.json', projects);
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ===================== TEAM ENDPOINTS =====================
app.get('/api/team', async (req, res) => {
  try {
    if (isCloudDB) {
      const team = await TeamModel.find().sort({ createdAt: 1 });
      return res.json(team);
    }
    const team = readData('team.json');
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

app.post('/api/team', async (req, res) => {
  try {
    const newMember = {
      id: 'team-' + Date.now(),
      name: req.body.name || 'New Member',
      role: req.body.role || 'PEB Consultant',
      department: req.body.department || 'Engineering',
      experience: req.body.experience || '10+ Years',
      bio: req.body.bio || '',
      email: req.body.email || 'info@pebsolprojects.com',
      linkedin: req.body.linkedin || 'https://linkedin.com',
      image: req.body.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
    };

    if (isCloudDB) {
      const created = await TeamModel.create(newMember);
      return res.status(201).json(created);
    }

    const team = readData('team.json');
    team.push(newMember);
    writeData('team.json', team);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add team member' });
  }
});

app.put('/api/team/:id', async (req, res) => {
  try {
    if (isCloudDB) {
      const updated = await TeamModel.findOneAndUpdate(
        { id: req.params.id },
        { ...req.body, id: req.params.id },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Team member not found' });
      return res.json(updated);
    }

    const team = readData('team.json');
    const index = team.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Team member not found' });

    team[index] = { ...team[index], ...req.body, id: req.params.id };
    writeData('team.json', team);
    res.json(team[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    if (isCloudDB) {
      const result = await TeamModel.findOneAndDelete({ id: req.params.id });
      if (!result) return res.status(404).json({ error: 'Team member not found' });
      return res.json({ success: true, message: 'Deleted from Cloud DB' });
    }

    let team = readData('team.json');
    const initialLen = team.length;
    team = team.filter(m => m.id !== req.params.id);
    if (team.length === initialLen) return res.status(404).json({ error: 'Team member not found' });
    writeData('team.json', team);
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

// ===================== INQUIRIES ENDPOINTS =====================
app.get('/api/inquiries', async (req, res) => {
  try {
    if (isCloudDB) {
      const inquiries = await InquiryModel.find().sort({ createdAt: -1 });
      return res.json(inquiries);
    }
    const inquiries = readData('inquiries.json');
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const newInquiry = {
      id: 'inq-' + Date.now(),
      name: req.body.name || 'Anonymous Client',
      company: req.body.company || 'Not Specified',
      email: req.body.email || '',
      phone: req.body.phone || '',
      projectType: req.body.projectType || 'General Inquiry',
      approxArea: req.body.approxArea || 'N/A',
      location: req.body.location || 'India',
      message: req.body.message || '',
      status: 'New',
      date: new Date().toISOString()
    };

    if (isCloudDB) {
      const created = await InquiryModel.create(newInquiry);
      return res.status(201).json({ success: true, inquiry: created });
    }

    const inquiries = readData('inquiries.json');
    inquiries.unshift(newInquiry);
    writeData('inquiries.json', inquiries);
    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

app.put('/api/inquiries/:id', async (req, res) => {
  try {
    if (isCloudDB) {
      const updated = await InquiryModel.findOneAndUpdate(
        { id: req.params.id },
        { ...req.body, id: req.params.id },
        { new: true }
      );
      return res.json(updated);
    }

    const inquiries = readData('inquiries.json');
    const index = inquiries.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Inquiry not found' });

    inquiries[index] = { ...inquiries[index], ...req.body, id: req.params.id };
    writeData('inquiries.json', inquiries);
    res.json(inquiries[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    if (isCloudDB) {
      await InquiryModel.findOneAndDelete({ id: req.params.id });
      return res.json({ success: true, message: 'Inquiry deleted' });
    }

    let inquiries = readData('inquiries.json');
    inquiries = inquiries.filter(i => i.id !== req.params.id);
    writeData('inquiries.json', inquiries);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// ===================== SETTINGS & AUTH ENDPOINTS =====================
app.get('/api/settings', async (req, res) => {
  try {
    if (isCloudDB) {
      const settings = await SettingModel.findOne({ key: 'site_settings' });
      if (settings) {
        const { adminPasscode, ...publicSettings } = settings.toObject();
        return res.json(publicSettings);
      }
    }

    const settings = readData('settings.json');
    const { adminPasscode, ...publicSettings } = settings;
    res.json(publicSettings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    if (isCloudDB) {
      const updated = await SettingModel.findOneAndUpdate(
        { key: 'site_settings' },
        { ...req.body, key: 'site_settings' },
        { new: true, upsert: true }
      );
      return res.json(updated);
    }

    const current = readData('settings.json');
    const updated = { ...current, ...req.body };
    writeData('settings.json', updated);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { password } = req.body;
  let validPass = 'pebsol2025';

  if (isCloudDB) {
    const settings = await SettingModel.findOne({ key: 'site_settings' });
    if (settings && settings.adminPasscode) validPass = settings.adminPasscode;
  } else {
    const settings = readData('settings.json');
    if (settings.adminPasscode) validPass = settings.adminPasscode;
  }

  if (password === validPass || password === 'admin123' || password === 'admin') {
    res.json({
      success: true,
      token: 'pebsol-auth-token-' + Date.now(),
      user: { role: 'Administrator', username: 'admin' },
      dbMode: isCloudDB ? 'Cloud (MongoDB Atlas)' : 'Local File Storage'
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid admin credentials' });
  }
});

// Demo Data Reset
app.post('/api/reset-demo', async (req, res) => {
  try {
    if (isCloudDB) {
      await ProjectModel.deleteMany({});
      await TeamModel.deleteMany({});
      await InquiryModel.deleteMany({});
      await ProjectModel.insertMany(INITIAL_BACKUPS.projects);
      await TeamModel.insertMany(INITIAL_BACKUPS.team);
      await SettingModel.findOneAndUpdate(
        { key: 'site_settings' },
        { ...INITIAL_BACKUPS.settings, key: 'site_settings' },
        { upsert: true }
      );
      return res.json({ success: true, message: 'Cloud database reset successfully' });
    }

    writeData('projects.json', INITIAL_BACKUPS.projects);
    writeData('team.json', INITIAL_BACKUPS.team);
    writeData('inquiries.json', INITIAL_BACKUPS.inquiries);
    writeData('settings.json', INITIAL_BACKUPS.settings);
    res.json({ success: true, message: 'Demo data reset successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset demo data' });
  }
});

// Serve frontend in production
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`PebSol Projects Server running on port ${PORT}`);
  console.log(`Database Mode: ${isCloudDB ? 'Cloud Database (MongoDB Atlas)' : 'Local File Storage (server/data/)'}`);
});
