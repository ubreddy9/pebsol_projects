# PebSol Projects - Cloud Database & Live GoDaddy Deployment Guide

This guide walks you through setting up a **Free Cloud Database (MongoDB Atlas)**, deploying your **PebSol Projects** website online, and connecting your purchased GoDaddy domain (**`pebprojects.com`**).

---

## 💡 Why You Need a Cloud Database (Instead of Local Storage)

| Storage Type | How It Works | Why It's Not For Live Websites |
|---|---|---|
| **Local Storage** | Saved only in the user's specific web browser | If you add/edit a project on your laptop, clients visiting from mobile or other computers **will never see it**. |
| **Local JSON files** | Saved only on your local computer's hard disk | When deployed to cloud hosts (Vercel, Render, Railway), files get wiped on container restarts (ephemeral filesystem). |
| **Cloud Database (MongoDB Atlas)** | Hosted 24/7 in high-speed cloud servers (AWS/Azure/GCP) | **The Industry Standard**: When you add/edit a project on `pebprojects.com/admin`, it saves to the cloud database instantly. **Every visitor across the globe sees your updates immediately.** |

---

## 🛠️ Step 1: Create Your Free Cloud Database (MongoDB Atlas)

MongoDB Atlas gives you a **512 MB Free Forever cluster** (more than enough for thousands of projects and inquiries):

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and sign up for a free account.
2. Click **"Build a Database"** and select the **FREE Shared Tier (M0)**.
3. Choose Cloud Provider (AWS) and Region closest to you (e.g., **Mumbai - `ap-south-1`**).
4. Click **"Create Cluster"**.
5. **Security Quickstart**:
   - Set a **Username** (e.g. `pebsoladmin`) and **Password** (e.g. `PebSol2025Secure`). *Save this password!*
   - In **"Where would you like to connect from?"**, choose **"Allow Access from Anywhere"** (`0.0.0.0/0`) so your live website can access it.
6. Click **"Database"** -> **"Connect"** -> **"Drivers"** (Node.js).
7. Copy your Connection String. It looks like this:
   ```
   mongodb+srv://pebsoladmin:PebSol2025Secure@cluster0.abcde.mongodb.net/pebsol?retryWrites=true&w=majority
   ```

---

## 🚀 Step 2: Deploy Your Application Online

You can deploy the app to **Render.com** (Free / low-cost web service) or **Railway.app** or **Vercel**:

### Option A: Deploy on Render.com (Recommended for Node + React)
1. Push your code to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "PebSol Projects ready for live deployment"
   git remote add origin https://github.com/your-username/pebsol-projects.git
   git push -u origin main
   ```
2. Log into [Render.com](https://render.com/) (Sign in with GitHub).
3. Click **"New +"** -> **"Web Service"**.
4. Select your `pebsol-projects` GitHub repository.
5. Set:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run server`
6. Scroll down to **Environment Variables** and add:
   - Key: `MONGODB_URI`
   - Value: *(Paste your connection string from Step 1)*
   - Key: `PORT`
   - Value: `5000`
7. Click **"Create Web Service"**.
   - Render will build your site and give you a free live URL: `https://pebsol-projects.onrender.com`.
   - On the very first run, your server will **automatically seed your Cloud Database** with all 8 PEB & Solar projects and the 4 core team members!

---

## 🌐 Step 3: Connect Your GoDaddy Domain (`pebprojects.com`)

Now link your purchased GoDaddy domain to your live website:

### 1. In Your Host Dashboard (e.g. Render):
- Go to your Web Service settings -> **Custom Domains**.
- Click **"Add Custom Domain"** and enter:
  - `pebprojects.com`
  - `www.pebprojects.com`
- Render will display the DNS values you need to configure in GoDaddy:
  - An **A Record** (IP address, e.g., `216.24.57.1`)
  - A **CNAME Record** (e.g., `pebsol-projects.onrender.com`)

### 2. In GoDaddy:
1. Log into your [GoDaddy Account](https://www.godaddy.com/).
2. Go to **My Products** -> Click **DNS** next to `pebprojects.com`.
3. In the **DNS Records** table, add or edit the following:

| Type | Name | Value | TTL |
|---|---|---|---|
| **A** | `@` | `216.24.57.1` *(or the IP provided by your host)* | 1/2 Hour (Default) |
| **CNAME** | `www` | `your-app-name.onrender.com` | 1/2 Hour (Default) |

4. Save the changes.
5. DNS propagation usually takes **15 minutes to a couple of hours**.
6. Once propagated, your host will automatically issue a **Free SSL Certificate (HTTPS)** for `https://pebprojects.com`!

---

## 🎯 How Your Admin Panel Works in Production

Once live at `https://pebprojects.com`:
1. Navigate to: **`https://pebprojects.com/admin`**
2. Enter your password: **`pebsol2025`**
3. Whenever you:
   - **Add a new Project**: It gets written to MongoDB Atlas in the cloud.
   - **Edit an existing Project**: Real-time update in the cloud.
   - **Delete a Project**: Removed permanently.
   - **Add / Edit Team Members**: Instantly updates the Teams page for all visitors globally.
   - **Receive Quotes**: When visitors submit inquiries on the site, they are stored directly in your cloud database, visible under the Admin "Inquiries" tab.

No local files, no local storage dependency—100% cloud-managed, reliable, and professional!
