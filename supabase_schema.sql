-- ==============================================================================
-- PEBSOL PROJECTS - SUPABASE DATABASE INITIALIZATION SCRIPT
-- ==============================================================================
-- Run this entire script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query -> Run)
-- It will create all tables, configure permissions (RLS), and populate default data.

-- 1. DROP EXISTING TABLES IF NEEDED
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS settings CASCADE;

-- 2. CREATE PROJECTS TABLE
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT,
  location TEXT,
  area TEXT,
  tonnage TEXT,
  year TEXT,
  status TEXT DEFAULT 'Completed',
  featured BOOLEAN DEFAULT false,
  image TEXT,
  description TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CREATE TEAM MEMBERS TABLE
CREATE TABLE team (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  experience TEXT,
  bio TEXT,
  email TEXT,
  linkedin TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CREATE INQUIRIES & QUOTE REQUESTS TABLE
CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  approx_area TEXT,
  location TEXT,
  message TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CREATE SETTINGS TABLE
CREATE TABLE settings (
  key TEXT PRIMARY KEY DEFAULT 'site_settings',
  company_name TEXT DEFAULT 'PebSol Projects',
  tagline TEXT DEFAULT 'Engineering Progress. Empowering Growth. Prefab. Solar. Infra.',
  phone TEXT DEFAULT '+91 98858 61555',
  email TEXT DEFAULT 'info@pebsolprojects.com',
  sales_email TEXT DEFAULT 'sales@pebsolprojects.com',
  address TEXT DEFAULT '301, 3rd Floor, Cyber Elite suites service apartments, near HITEX EXHIBITION CENTER, Shilpa Layout, Izzathnagar, Hyderabad, Telangana 500084',
  hours TEXT DEFAULT 'Mon to Sat: 9:00 AM – 6:30 PM',
  admin_passcode TEXT DEFAULT 'pebsol2025',
  stats JSONB DEFAULT '{"pebAnnualSqFt": "1.2M+ sq.ft", "solarCapacityMW": "700 MW", "manufacturingSqFt": "80,000 sq.ft", "yearsExperience": 15, "globalCountries": "India, Tanzania, Vietnam, Canada"}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- 7. CREATE POLICIES (Allow public read, and allow anon client CRUD for easy website maintenance)
-- Projects policies
CREATE POLICY "Public projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert on projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on projects" ON projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on projects" ON projects FOR DELETE USING (true);

-- Team policies
CREATE POLICY "Public team is viewable by everyone" ON team FOR SELECT USING (true);
CREATE POLICY "Allow public insert on team" ON team FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on team" ON team FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on team" ON team FOR DELETE USING (true);

-- Inquiries policies
CREATE POLICY "Public inquiries are viewable by everyone" ON inquiries FOR SELECT USING (true);
CREATE POLICY "Allow public insert on inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on inquiries" ON inquiries FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on inquiries" ON inquiries FOR DELETE USING (true);

-- Settings policies
CREATE POLICY "Public settings are viewable by everyone" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow public insert on settings" ON settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on settings" ON settings FOR UPDATE USING (true);

-- 8. INSERT INITIAL SEED DATA FOR PEBSOL PROJECTS

-- Seed Projects
INSERT INTO projects (id, title, category, client, location, area, tonnage, year, status, featured, image, description, highlights)
VALUES
(
  'proj-1',
  'Azad Engineering Aerospace Manufacturing Facility',
  'PEB & Prefab Buildings',
  'Azad Engineering',
  'Hyderabad, Telangana',
  '65,000 sq.ft',
  '620 MT',
  '2023',
  'Completed',
  true,
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
  'Turnkey delivery of a 65,000 sq.ft precision aerospace manufacturing facility executed from civil foundation to complete PEB erection in a record 48 days, complying with strict aerospace tolerances.',
  '["Flawlessly executed and delivered in just 48 days", "Heavy overhead crane runway beams integrated into PEB frame", "Standing seam Galvalume roof with 25-year leak-proof warranty", "Rigid moment-resisting frame designed for zero micro-vibrations"]'::jsonb
),
(
  'proj-2',
  '50 MW Utility-Scale Ground-Mount Solar MMS',
  'Solar Mounting Solutions',
  'Renewable Power Corporation',
  'Bhadla Solar Park, Rajasthan',
  '250 Acres (50 MW)',
  '2,400 MT Galv Steel',
  '2024',
  'Completed',
  true,
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1200',
  'Engineered fixed-tilt and seasonal tilt Solar Module Mounting Structures (MMS) manufactured with high-strength structural steel and 80-micron hot-dip galvanizing, tested for 175 km/h cyclonic wind resistance.',
  '["Engineered to withstand extreme 175 km/h desert cyclonic winds", "80-micron hot-dip galvanizing ensuring 25+ year corrosion protection", "Rapid ramming post design enabling concrete-free foundation installation", "Full delivery and commissioning completed 2 weeks ahead of target"]'::jsonb
),
(
  'proj-3',
  'Reliance Retail Urban Commercial Superstore',
  'Commercial & Convention Centers',
  'Reliance Retail',
  'Secunderabad, Telangana',
  '35,000 sq.ft',
  '310 MT',
  '2024',
  'Completed',
  true,
  'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&q=80&w=1200',
  'Fast-track PEB commercial retail center executed adjacent to a temple in a high-density urban market under night-only construction constraints without disrupting surrounding commercial traffic.',
  '["Night-shift precision crane assembly adhering to strict noise constraints", "Aesthetic structural glass & composite panel facade integration", "Column-free retail space maximizing customer aisles and shelf layouts", "Zero disruption to temple visitors and surrounding daily commerce"]'::jsonb
),
(
  'proj-4',
  '12 MW Industrial Rooftop Solar on PEB Sheds',
  'Solar Mounting Solutions',
  'Textile & Spinning Mill Consortium',
  'Warangal Mega Textile Park, Telangana',
  '12 MW (90,000 sq.m Roof)',
  '480 MT Aluminum & Steel',
  '2023',
  'Completed',
  true,
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200',
  'Custom non-penetrating solar module mounting system installed on industrial standing seam PEB roofs, protecting roof warranties while generating 18 million units of clean solar electricity annually.',
  '["Zero roof penetration using patented leak-proof seam clamps", "Lightweight aerodynamic aluminum mounting rails minimize dead load", "Generates 18 GWh green power annually, cutting carbon emissions by 14,000 tons", "Thermal shade effect reduces plant indoor temperature by 3°C"]'::jsonb
),
(
  'proj-5',
  'Ananda Convention & Event Center',
  'Commercial & Convention Centers',
  'Ananda Conventions',
  'Kompally, Hyderabad',
  '55,000 sq.ft',
  '490 MT',
  '2023',
  'Completed',
  false,
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
  'Aesthetic wide-span steel building featuring a 48m clear span without interior pillars, engineered for luxury banquet, exhibition, and grand event hosting.',
  '["Massive 48m column-free clear span for unobstructed hall visibility", "Acoustically insulated sandwich roof panels preventing rain reverberation", "Grand structural steel portico canopy welcoming VIP arrivals", "Turnkey civil-to-finishing delivered strictly on time"]'::jsonb
),
(
  'proj-6',
  'Geekay Wires Heavy Manufacturing Facility',
  'PEB & Prefab Buildings',
  'Geekay Wires Limited',
  'Balanagar, Hyderabad',
  '85,000 sq.ft',
  '780 MT',
  '2024',
  'Completed',
  false,
  'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
  'Heavy industrial steel wire drawing and manufacturing shed equipped with 20T overhead crane runways, high-volume automated ridge ventilators, and integrated machinery pits.',
  '["Heavy crane gantry beams engineered for continuous 20T dynamic surge", "Integrated natural daylight polycarbonate panels saving 35% daytime lighting", "Two-storey administrative office mezzanine built into the main frame", "Delivered and commissioned ahead of scheduled timeline"]'::jsonb
),
(
  'proj-7',
  'Shri Raj Udyog Agro-Processing & Storage Hub',
  'Industrial Warehouses',
  'Shri Raj Udyog Pvt Ltd',
  'Nizamabad, Telangana',
  '115,000 sq.ft',
  '920 MT',
  '2024',
  'Completed',
  false,
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
  'Large-capacity agro-processing and grain storage warehouse with thermal break insulation, 12m clear height, and solar-ready roof purlins.',
  '["Engineered for heavy bulk agro storage with post-tensioned slab tie-in", "High-durability 25-year galvalume weather protection envelope", "Simultaneous 8-truck covered loading canopy dock system", "Erected and handed over in 90 days"]'::jsonb
),
(
  'proj-8',
  'Commercial Solar Carport & EV Charging Canopy',
  'Solar Mounting Solutions',
  'Tech City Enterprise Park',
  'HITEC City, Hyderabad',
  '3.5 MW (650 Car Bays)',
  '260 MT Structural Steel',
  '2024',
  'Ongoing',
  false,
  'https://images.unsplash.com/photo-1558441719-aa34bef57312?auto=format&fit=crop&q=80&w=1200',
  'Architectural waterproof solar carport structure covering 650 parking bays, providing green solar electricity for the corporate tech campus and direct EV charging stations.',
  '["Concealed rain guttering and cable tray management system", "High-durability hot-dip galvanized steel with polyurethane topcoat", "Powers 40 high-speed EV charging bays directly from solar power", "Clean modern architectural aesthetic complementing modern corporate campus"]'::jsonb
);

-- Seed Team Members (4 Core Members)
INSERT INTO team (id, name, role, department, experience, bio, email, linkedin, image)
VALUES
(
  'team-1',
  'K. Srinivas Rao',
  'Managing Director & Founder',
  'Executive Leadership',
  '16+ Years',
  'Founded PEBSOL in 2009 in Balanagar. Led strategic expansion into Solar MMS in 2014 and the 80,000 sq.ft Medchal plant, scaling company delivery to 1.2M sq.ft PEB and 700 MW solar capacity annually.',
  'srinivas@pebsol.in',
  'https://linkedin.com',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
),
(
  'team-2',
  'M. Venkat Reddy',
  'VP & Head of Solar Structures',
  'Solar Module Mounting Solutions',
  '14+ Years',
  'Pioneered PEBSOL''s Solar Module Mounting Structures (MMS) portfolio. Has engineered over 2.5 GW of utility-scale ground-mount, tracker, and industrial rooftop solar structures with 180 km/h wind resistance.',
  'venkat.reddy@pebsol.in',
  'https://linkedin.com',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800'
),
(
  'team-3',
  'Archana Nair',
  'Chief PEB Structural Architect',
  'Engineering & Tekla Detailing',
  '12+ Years',
  'Specialist in fast-track Pre-Engineered Building structural design, clear-span hangars, and light-gauge steel framing. Spearheaded the delivery of Azad Engineering''s 65,000 sq.ft facility in record 48 days.',
  'archana.nair@pebsol.in',
  'https://linkedin.com',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
),
(
  'team-4',
  'Rajeshwar Goud',
  'Head of Manufacturing & Quality Assurance',
  'Medchal Plant Operations',
  '15+ Years',
  'Oversees the state-of-the-art 80,000 sq.ft manufacturing facility in Medchal. Manages automated welding lines, continuous roll-forming purlin lines, and stringent ISO 9001:2015 quality standards.',
  'rajeshwar@pebsol.in',
  'https://linkedin.com',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800'
);

-- Seed Settings
INSERT INTO settings (key, company_name, phone, email, sales_email, address, hours, admin_passcode)
VALUES
(
  'site_settings',
  'PebSol Projects',
  '+91 98858 61555',
  'info@pebsolprojects.com',
  'sales@pebsolprojects.com',
  '301, 3rd Floor, Cyber Elite suites service apartments, near HITEX EXHIBITION CENTER, Shilpa Layout, Izzathnagar, Hyderabad, Telangana 500084',
  'Mon to Sat: 9:00 AM – 6:30 PM',
  'pebsol2025'
)
ON CONFLICT (key) DO UPDATE SET
  company_name = EXCLUDED.company_name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  address = EXCLUDED.address;
