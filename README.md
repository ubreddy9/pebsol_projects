# PebSol Projects — Pre-Engineered Buildings & Solar Mounting Solutions

A high-performance corporate website and admin content management system for **PebSol Projects** ([pebprojects.com](https://pebprojects.com)), specializing in **Pre-Engineered Steel Buildings (PEB)** and **Solar Module Mounting Solutions (MMS)**.

Designed with modern minimalist corporate aesthetics (clean white, deep corporate navy `#0f2b48`, and solar renewable green `#16a34a`), inspired by `pebsol.in`.

---

## ⚡ Tech Stack & Architecture

- **Frontend**: React 18, Vite 5, Tailwind CSS, Lucide Icons
- **Cloud Database**: **Supabase** (PostgreSQL) with real-time REST API & Row Level Security (RLS)
- **Local Fallback**: Express.js REST API with file-based JSON storage
- **Hosting Targets**: **Vercel** / **Netlify** with automatic global CDN & free SSL
- **Custom Domain**: Configured for `pebprojects.com` (GoDaddy)

---

## 🏢 Company Profile & Details

- **Company Name**: **PebSol Projects**
- **Address**: 301, 3rd Floor, Cyber Elite suites service apartments, near HITEX EXHIBITION CENTER, Shilpa Layout, Izzathnagar, Hyderabad, Telangana 500084
- **Phone**: +91 98858 61555
- **Email**: info@pebsolprojects.com
- **Plant Facility**: 80,000 sq.ft state-of-the-art manufacturing plant in Medchal, Hyderabad

---

## ✨ Features

1. **Solar & PEB Projects Showcase**:
   - 8 pre-loaded flagship projects (Azad Engineering, 50 MW Rajasthan Solar MMS, Reliance Retail, 12 MW Industrial Rooftop Solar, Ananda Convention Center, Geekay Wires, Shri Raj Udyog, Commercial Solar Carport).
   - Filtering by category (PEB, Solar MMS, Commercial, Industrial).
   - Full CRUD capability (Add, Edit, Delete) in the Admin Panel.

2. **Executive Leadership Team**:
   - 4 core leadership profiles (Managing Director & Founder, VP & Head of Solar Structures, Chief PEB Structural Architect, Head of Manufacturing & QA).
   - Full CRUD capability in the Admin Panel.

3. **Admin Panel (`/admin`)**:
   - Secure login with passcode (`pebsol2025` or `admin123`).
   - **Device Storage Photo Upload**: Direct file picker and drag-and-drop area with client-side canvas compression (optimizes images to ~80-120KB for fast loading).
   - External URL input & curated presets.
   - Quote Inquiries tracker with status management (`New`, `In Review`, `Quoted`, `Resolved`).
   - Company contact information editor.

4. **1-Click Supabase Integration**:
   - `supabase_schema.sql` creates all tables (`projects`, `team`, `inquiries`, `settings`), enables RLS, and seeds initial data in 1 click.

5. **Production Deployment Ready**:
   - Pre-configured `vercel.json`, `netlify.toml`, and `public/_redirects` for Single Page Application routing.

---

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/ubreddy9/pebsol_projects.git
cd pebsol_projects

# Install dependencies
npm install

# Start Vite frontend & Express backend concurrently
npm start

# Open http://localhost:5173 (or http://localhost:5000)
```

---

## ☁️ Deploying to Vercel / Netlify

1. Push this repository to GitHub: `https://github.com/ubreddy9/pebsol_projects`.
2. Connect the repo on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Set the Environment Variables:
   - `VITE_SUPABASE_URL` = *Your Supabase Project URL*
   - `VITE_SUPABASE_ANON_KEY` = *Your Supabase Anon Key*
4. Click **Deploy**.
5. Connect your GoDaddy domain `pebprojects.com` by adding the provided `A` and `CNAME` records in GoDaddy DNS.

*Full instructions available in [SUPABASE_AND_VERCEL_NETLIFY_GUIDE.md](./SUPABASE_AND_VERCEL_NETLIFY_GUIDE.md).*

---

## 🔑 Admin Credentials
- **URL**: Navigate to `/admin` or click "Admin Login" in topbar/footer
- **Passcode**: `pebsol2025` *(or `admin123`)*
