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
  media JSONB DEFAULT '{"heroSlide1": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1920", "heroSlide2": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920", "heroSlide3": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1920", "aboutPlant": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200", "aboutLegacy": "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&q=80&w=1200", "servicePeb": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200", "serviceSolarGround": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1200", "serviceSolarRooftop": "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200", "serviceCommercial": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200", "serviceCarport": "https://images.unsplash.com/photo-1558441719-aa34bef57312?auto=format&fit=crop&q=80&w=1200", "serviceWarehouse": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200"}'::jsonb,
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
  'Jeedimetla, Hyderabad',
  '65,000 sq.ft',
  '620 MT',
  '2023',
  'Completed',
  true,
  'https://pebsol.in/wp-content/uploads/2025/07/15-2.jpg',
  'An end-to-end turnkey project, including civil works, executed in just 48 days while adhering to strict company norms. A true showcase of PEBSOL’s speed and structural precision for aerospace manufacturing.',
  '["Complete turnkey solution from foundation to finish delivered in just 48 days", "Expedited timeline with zero compromise on precision and structural quality", "Adherence to strict industrial safety standards and aerospace tolerances", "Custom engineering solutions for specialized heavy manufacturing machinery"]'::jsonb
),
(
  'proj-2',
  'Shri Raj Udyog Integrated Steel Manufacturing Plant',
  'PEB & Prefab Buildings',
  'Shri Raj Udyog Pvt Ltd',
  'Cherkurda, Hyderabad',
  '250,000 sq.ft',
  '2,100 MT',
  '2024',
  'Completed',
  true,
  'https://pebsol.in/wp-content/uploads/2025/07/SRI-RAJ-IRON-STEEL-PRODUCTS-PRIVATE-LIMITEDjpg-scaled.jpg',
  'A massive, fully integrated steel manufacturing facility spread over 2.5 lakh sq. ft. Built to accommodate high-capacity industrial cranes, heavy machinery, and seamless production logistics.',
  '["Engineered for heavy industrial use, including provisions for high-capacity cranes", "Designed for future scalability with modular expansion options across 2.5L sq.ft", "Integrated high-precision fabrication to support continuous steel processing", "Efficient project management ensured on-time delivery despite massive industrial scale"]'::jsonb
),
(
  'proj-3',
  'Geekay Wires Heavy Industrial Wire Plant',
  'PEB & Prefab Buildings',
  'Geekay Wires Limited',
  'Wadiram, Telangana',
  '95,000 sq.ft',
  '840 MT',
  '2024',
  'Completed',
  true,
  'https://pebsol.in/wp-content/uploads/2025/07/GEEKAY-WIRES-LIMITED-15-scaled.jpg',
  'A high-precision turnkey industrial structure delivered for one of India’s leading manufacturers of galvanized steel wires, with integrated crane gantry beams and material handling.',
  '["Engineered to support specialized machinery for galvanized steel wire production", "Designed to handle dynamic and static crane loads typical of steel wire manufacturing", "Included civil works, structural fabrication, and rapid on-site installation", "Smart layout design for streamlined production flow and future scalability"]'::jsonb
),
(
  'proj-4',
  'Reliance Retail Commercial Hypermarket',
  'Commercial & Convention Centers',
  'Reliance Retail',
  'Adjacent to Tirupati Temple, Tirupati',
  '45,000 sq.ft',
  '380 MT',
  '2024',
  'Completed',
  true,
  'https://pebsol.in/wp-content/uploads/2025/07/12.jpg',
  'Working exclusively at night in a bustling market zone adjacent to Tirupati Temple, PEBSOL completed this high-profile commercial facility in 2.5 months without disrupting pilgrims or daily commerce.',
  '["Successfully managed night-only construction to minimize disruption in a sensitive zone", "Executed in tight site conditions with precise planning and coordination in 2.5 months", "Integrated modular construction techniques for faster column-free commercial assembly", "Delivered a commercial-grade structure built for durability and high customer footfall"]'::jsonb
),
(
  'proj-5',
  'Ananda Convention & Grand Event Center',
  'Commercial & Convention Centers',
  'Ananda Convention Center',
  'Hyderabad, Telangana',
  '70,000 sq.ft',
  '560 MT',
  '2023',
  'Completed',
  true,
  'https://pebsol.in/wp-content/uploads/2025/07/9.jpg',
  'A complete structural solution delivered for a premium convention facility, combining column-free functionality with aesthetic architectural design for large-scale events.',
  '["Designed for high load-bearing capacity to support large gatherings and grand setups", "Architectural wide-span steel framework providing unobstructed interior hall views", "Integrated customized ventilation and thermal insulation for occupant comfort", "Delivered within tight schedule to meet client commercial event launch dates"]'::jsonb
),
(
  'proj-6',
  'Vivala Amrit Beverage Facility (Parle Agro Bailley)',
  'PEB & Prefab Buildings',
  'Parle Agro / Vivala Amrit',
  'Hyderabad, Telangana',
  '85,000 sq.ft',
  '680 MT',
  '2023',
  'Completed',
  false,
  'https://pebsol.in/wp-content/uploads/2025/07/VIVALA-AMRIT-PRIVATE-LIMITED-5-scaled.jpg',
  'A high-performance industrial facility built for Parle Agro’s Bailley beverage division, adhering to food-grade hygienic norms and 24/7 continuous operations.',
  '["Built to meet strict hygienic and operational standards required in the beverage industry", "Layout and design customized for seamless production, bottling, and logistics", "Engineered for long-term performance in demanding 24/7 industrial environments", "Designed to accommodate future capacity expansion as distribution expands"]'::jsonb
),
(
  'proj-7',
  'Devi AC Convention Hall',
  'Commercial & Convention Centers',
  'Devi Function Hall',
  'Shankarpally, Hyderabad',
  '70,000 sq.ft',
  '520 MT',
  '2023',
  'Completed',
  false,
  'https://pebsol.in/wp-content/uploads/2025/07/Devi-AC-Convention-Hall-6-scaled.jpg',
  'Spacious and fully customized multi-purpose convention structure tailored for high-traffic public events, weddings, and exhibitions with aesthetic steel arches.',
  '["Tailored clear-span layout for optimal crowd movement and space utilization", "Premium-grade structural steel ensuring longevity and robust safety", "Integrated design elements for multi-purpose use — weddings, events, exhibitions", "Delivered with rapid turnaround and cost efficiency without compromising aesthetics"]'::jsonb
),
(
  'proj-8',
  '50 MW Utility-Scale Ground-Mount Solar MMS',
  'Solar Mounting Solutions',
  'Renewable Power Corporation',
  'Telangana / Rajasthan Solar Corridor',
  '250 Acres (50 MW)',
  '2,400 MT Galv Steel',
  '2024',
  'Completed',
  false,
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1200',
  'Engineered fixed-tilt Solar Module Mounting Structures (MMS) manufactured with high-strength structural steel and 80-micron hot-dip galvanizing, tested for 175 km/h cyclonic winds.',
  '["Engineered to withstand extreme 175 km/h cyclonic winds", "80-micron hot-dip galvanizing ensuring 25+ year corrosion protection", "Rapid ramming post design enabling concrete-free foundation installation", "Full delivery and commissioning completed 2 weeks ahead of target"]'::jsonb
),
(
  'proj-9',
  '12 MW Industrial Rooftop Solar on PEB Sheds',
  'Solar Mounting Solutions',
  'Textile & Spinning Mill Consortium',
  'Warangal Mega Textile Park, Telangana',
  '12 MW (90,000 sq.m Roof)',
  '480 MT Aluminum & Steel',
  '2024',
  'Completed',
  false,
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200',
  'Custom non-penetrating solar module mounting system installed on industrial standing seam PEB roofs, protecting roof warranties while generating 18 million units of clean solar electricity annually.',
  '["Zero roof penetration using patented leak-proof seam clamps", "Lightweight aerodynamic aluminum mounting rails minimize dead load", "Generates 18 GWh green power annually, cutting carbon emissions by 14,000 tons", "Thermal shade effect reduces plant indoor temperature by 3°C"]'::jsonb
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
