# Complete Deployment & Supabase Cloud Database Guide
### PebSol Projects (`pebsolprojects.com`) — Vercel / Netlify & Supabase

This guide walks you step-by-step through:
1. Setting up **Supabase** (Free cloud PostgreSQL database)
2. Deploying to **Vercel** or **Netlify** (Free global CDN hosting with automatic HTTPS)
3. Connecting your custom domain **`pebsolprojects.com`** from GoDaddy

---

## ⚡ Why This Architecture is the Best Choice
- **Zero Server Costs**: Both Supabase and Vercel/Netlify have generous perpetual free tiers.
- **No Node.js Server to Maintain**: The site runs serverless as a lightning-fast Single Page Application (SPA).
- **Global CDN**: Your website loads in milliseconds anywhere in India and worldwide.
- **Admin Anywhere**: Any changes you make in the Admin Panel from your laptop or phone save directly to Supabase and update on `pebsolprojects.com` in real time.

---

## 🛠️ Step 1: Create Your Supabase Cloud Database (3 Minutes)

1. Go to **[https://supabase.com](https://supabase.com)** and click **"Start your project"** (Sign in with GitHub or email).
2. Click **"New Project"**:
   - **Name**: `pebsol-projects`
   - **Database Password**: Enter a secure password (store it safely).
   - **Region**: Select **`South Asia (Mumbai) [ap-south-1]`** for maximum speed across India.
   - Click **"Create new project"** (takes ~1 minute to initialize).

3. Run the Database Schema & Seed Data:
   - In the left sidebar of your Supabase dashboard, click **"SQL Editor"** (terminal icon).
   - Click **"New query"**.
   - Open the file `supabase_schema.sql` located in this project, copy the entire contents, and paste it into the Supabase SQL editor.
   - Click the green **"Run"** button.
   - *Result: All 4 tables (`projects`, `team`, `inquiries`, `settings`) are created with security policies and pre-seeded with all 8 PebSol Projects, 4 leadership team members, and official contact details.*

4. Get Your API Credentials:
   - In the left sidebar, click the **Settings gear icon (⚙️)** -> **API** (or **Project Settings** -> **Data API**).
   - Copy two values:
     1. **Project URL**: e.g., `https://xyzcompany.supabase.co`
     2. **Project API Keys**: Copy the **`anon` / `public`** key (starts with `eyJhbGciOi...`).

---

## 🚀 Step 2: Deploy to Vercel (Recommended)

### Option A: Via GitHub (Best Practice)
1. Push your project codebase to a repository on **GitHub**.
2. Go to **[https://vercel.com](https://vercel.com)** and sign in.
3. Click **"Add New..."** -> **"Project"**.
4. Select your GitHub repository and click **"Import"**.
5. In the configuration screen:
   - **Framework Preset**: Vite (automatically detected)
   - **Root Directory**: `./` (leave default)
   - Expand **"Environment Variables"** and add:
     - Key: `VITE_SUPABASE_URL` | Value: *Your Supabase Project URL*
     - Key: `VITE_SUPABASE_ANON_KEY` | Value: *Your Supabase anon key*
6. Click **"Deploy"**.
7. Vercel will build and deploy your site in ~30 seconds with a free `.vercel.app` URL.

---

### Option B: Deploy to Netlify (Alternative)
1. Go to **[https://app.netlify.com](https://app.netlify.com)** and sign in.
2. Click **"Add new site"** -> **"Import an existing project"** -> Connect GitHub.
3. Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Under **"Environment variables"**, add:
   - `VITE_SUPABASE_URL` = *Your Supabase Project URL*
   - `VITE_SUPABASE_ANON_KEY` = *Your Supabase anon key*
5. Click **"Deploy site"**.

*(Note: Both `vercel.json` and `netlify.toml` are already pre-configured in the repository to ensure subpages like `/projects`, `/team`, and `/admin` reload seamlessly without 404 errors).*

---

## 🌐 Step 3: Connect GoDaddy Domain (`pebsolprojects.com`)

### If using Vercel:
1. In your Vercel project dashboard, go to **Settings** -> **Domains**.
2. Enter **`pebsolprojects.com`** and click **Add**.
3. Choose the option to also add **`www.pebsolprojects.com`** (redirect to `pebsolprojects.com`).
4. Vercel will show you the exact DNS records needed:
   - **A Record**:
     - Name: `@`
     - Value: `76.76.21.21`
   - **CNAME Record**:
     - Name: `www`
     - Value: `cname.vercel-dns.com`

### If using Netlify:
1. In your Netlify dashboard, go to **Site configuration** -> **Domain management** -> **Add custom domain**.
2. Enter `pebsolprojects.com` and click **Verify** -> **Add domain**.
3. Netlify will show the DNS records:
   - **A Record**: Name: `@`, Value: `75.2.60.5`
   - **CNAME Record**: Name: `www`, Value: `<your-site-name>.netlify.app`

---

### Configure DNS in GoDaddy:
1. Log in to your **[GoDaddy Account](https://www.godaddy.com)**.
2. Go to **My Products** -> find `pebsolprojects.com` -> click **DNS** (or **Manage DNS**).
3. Under the **DNS Records** table:
   - **Edit or Add the `A` record**:
     - **Type**: `A`
     - **Name**: `@`
     - **Value**: `76.76.21.21` (for Vercel)
     - **TTL**: `1/2 Hour` (or default)
   - **Edit or Add the `CNAME` record**:
     - **Type**: `CNAME`
     - **Name**: `www`
     - **Value**: `cname.vercel-dns.com` (for Vercel)
     - **TTL**: `1/2 Hour` (or default)
4. Save the records.
5. Within 5–15 minutes, GoDaddy will propagate the DNS, Vercel/Netlify will verify the domain, and an **automatic free SSL (HTTPS) certificate** will be activated!

---

## 💻 Step 4: Testing Supabase Locally (Optional)

If you want to test Supabase directly on your computer:
1. Create a `.env` file in the root folder with:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
2. Run:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173/admin`:
   - You will see the badge: **`⚡ Supabase Cloud DB`**.
   - Any project or team member you add or edit will immediately save to your Supabase PostgreSQL cloud database!

---

## 🔒 Security & Admin Details
- **Admin Password**: `pebsol2025` (or `admin123`).
- **Changing Passcode**: You can change your admin passcode anytime from the Admin Panel under **Settings** or directly in the Supabase `settings` table.
- **Image Uploads**: Images uploaded from device storage in the Admin Panel are automatically compressed to ~80-120KB and stored as data URLs or file paths directly in Supabase, meaning you never have to configure complex S3 storage buckets!
