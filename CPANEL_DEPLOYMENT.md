# 🚀 Tally Bank PDF Demo - Complete cPanel Deployment Guide

**Project:** Tally Bank PDF Demo  
**Status:** ✅ Production Ready  
**Deployment:** cPanel Hosting  
**Total Time:** 30-45 minutes

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Production Build](#production-build)
4. [cPanel Deployment](#cpanel-deployment)
5. [Post-Deployment](#post-deployment)
6. [Troubleshooting](#troubleshooting)
7. [Future Updates](#future-updates)
8. [Git Workflow](#git-workflow)

---

## 📖 OVERVIEW

### What You Have

- ✅ **Source Code:** React components in `src/` folder
- ✅ **Production Build:** Optimized files in `build/` folder (7.57 MB)
- ✅ **27 Demo Steps:** Fully configured and tested
- ✅ **GitHub Repository:** Code backed up and versioned

### What Will Happen

1. You'll create production build locally
2. Upload files to cPanel server
3. Configure `.htaccess` for React routing
4. Demo goes live on your domain

### Technology Stack

- **Frontend:** React 18.2.0
- **Build Tool:** Create React App
- **Server:** Apache (cPanel)
- **Type:** Single Page Application (SPA)

---

## ✅ PREREQUISITES

### You Need

- [ ] cPanel access (username & password)
- [ ] FTP/SFTP client (FileZilla, WinSCP, or Cyberduck)
- [ ] Domain name pointing to cPanel
- [ ] Node.js 14+ (already installed for local development)

### Check cPanel Access

1. Go to `https://your-domain.com:2083` (or similar)
2. Enter cPanel username & password
3. You should see cPanel dashboard

### Check SFTP Access

1. Your hosting provider should have given you:
   - Host/Server: `your-domain.com`
   - Username: Same as cPanel username
   - Password: Same as cPanel password
   - Port: 22 (SFTP) or 21 (FTP)

---

## 🔨 PRODUCTION BUILD

### Step 1: Verify Build Exists

Check if `build/` folder already exists:

```powershell
# Navigate to project
cd C:\tally-demo-option1

# Check if build exists
ls build/
```

If `build/` folder exists with `index.html`, skip to [cPanel Deployment](#cpanel-deployment).

### Step 2: Create Production Build (If Needed)

```powershell
# Navigate to project
cd C:\tally-demo-option1

# Create production build
npm run build
```

**Expected Output:**

```
Creating an optimized production build...
Compiled with warnings.
...
The build folder is ready to be deployed.
```

### Step 3: Verify Build Contents

```powershell
# List build folder
ls build/

# Check size
dir build/ | Measure-Object -Property Length -Sum
```

**Expected Contents:**

```
build/
├── index.html              ← Main file
├── favicon.ico
├── static/
│   ├── js/                 ← JavaScript
│   ├── css/                ← Stylesheets
│   └── media/              ← Assets
├── asset-manifest.json
└── 30+ screenshot images
```

**Expected Size:** 7.57 MB total

---

## 🌐 CPANEL DEPLOYMENT

### Step 1: Connect via SFTP

**Using FileZilla:**

1. Open FileZilla
2. **File** → **Site Manager** → **New Site**
3. Enter:
   - **Protocol:** SFTP (or FTP if SFTP not available)
   - **Host:** `your-domain.com` (or IP address)
   - **Port:** `22` (SFTP) or `21` (FTP)
   - **Logon Type:** Normal
   - **User:** Your cPanel username
   - **Password:** Your cPanel password
4. Click **Connect**

**Using WinSCP:**

1. Open WinSCP
2. Enter:
   - **Host:** `your-domain.com`
   - **Port:** 22
   - **Username:** Your cPanel username
   - **Password:** Your cPanel password
3. Click **Login**

### Step 2: Navigate to public_html

In your SFTP client:

1. Navigate to `public_html/` folder

   - This is your website root
   - Where your domain files live

2. **BACKUP FIRST:**
   - If there are existing files, copy them somewhere safe
   - You're about to replace everything

### Step 3: Delete Existing Files (If Any)

In `public_html/`:

1. Select all files and folders
2. **Delete** them
3. Confirm deletion

**Why?** Ensures clean deployment, no old files interfering

### Step 4: Upload build/ Contents

**IMPORTANT:** Upload the **contents** of `build/` folder, NOT the folder itself

**Steps:**

1. On your computer, open `C:\tally-demo-option1\build\` folder
2. Select **ALL** files and folders inside:
   ```
   index.html
   favicon.ico
   static/
   asset-manifest.json
   [all screenshot images]
   ```
3. Drag & drop into `public_html/` in SFTP client
4. **Wait** for upload to complete (should show 100%)

**Expected Result:**

```
public_html/
├── index.html
├── favicon.ico
├── static/
├── asset-manifest.json
└── [images]
```

### Step 5: Create .htaccess File

**Critical Step:** React routing requires `.htaccess` configuration

1. **Create new file** in SFTP client

   - In FileZilla: **File** → **Create new file** → name it `.htaccess`
   - In WinSCP: **New** → **File** → name it `.htaccess`

2. **Edit the file** with this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

3. **Save** the file

**Why?** Routes all requests to `index.html` so React can handle routing

### Step 6: Enable GZIP Compression (Optional but Recommended)

Add to `.htaccess` after the rewrite rules:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE text/javascript application/javascript application/x-javascript
</IfModule>
```

**Why?** Reduces file sizes, faster loading

---

## ✅ POST-DEPLOYMENT

### Step 1: Test Website Loads

1. Open browser
2. Go to `https://your-domain.com`
3. **Expected:** Demo loads with all content visible

### Step 2: Test All 27 Steps

1. **Navigation:**

   - Click **Previous** (←) button
   - Click **Next** (→) button
   - Steps should change

2. **Keyboard Shortcuts:**

   - Press **Left Arrow** key
   - Press **Right Arrow** key
   - Steps should navigate

3. **Visual Check:**
   - All screenshots should display
   - Animations should be smooth
   - Tooltips should appear
   - No blank areas

### Step 3: Test on Mobile

1. Open on phone/tablet
2. Demo should be responsive
3. Touch navigation should work
4. Should display correctly on smaller screens

### Step 4: Check Browser Console

1. Press **F12** (Developer Tools)
2. Click **Console** tab
3. Should see **NO errors** (warnings are okay)

### Step 5: Run Through Complete Demo

1. Start at Step 1
2. Click **Next** through all 27 steps
3. Complete final step
4. Should see **Completion Banner** with celebration animation
5. Should see redirect/message

---

## 🔧 TROUBLESHOOTING

### Issue 1: Blank White Page

**Problem:** Website shows completely blank

**Causes & Solutions:**

1. `.htaccess` not found or misconfigured

   - Solution: Verify `.htaccess` file exists in `public_html/`
   - Re-add with exact content from Step 5 above

2. Not all files uploaded

   - Solution: Verify all files from `build/` in `public_html/`
   - Re-upload entire `build/` contents

3. Browser cache issue
   - Solution: Hard refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Issue 2: "404 Page Not Found" When Clicking Navigation

**Problem:** Navigation buttons work initially but subsequent navigation fails

**Cause:** `.htaccess` not working

**Solution:**

1. Verify `.htaccess` file exists in `public_html/`
2. Check file permissions: Should be readable
3. Try with exact content from Step 5
4. If still fails, contact hosting provider to enable mod_rewrite

### Issue 3: Images Not Displaying

**Problem:** Screenshots/images not showing

**Causes & Solutions:**

1. Image files not uploaded

   - Solution: Verify all `.png` files in `public_html/`
   - Re-upload `static/media/` folder contents

2. Path issues
   - Solution: Clear browser cache
   - Hard refresh: `Ctrl+Shift+R`

### Issue 4: Slow Loading

**Problem:** Takes too long to load

**Solutions:**

1. Enable GZIP compression (see Step 6 in Deployment)
2. Ask hosting provider to enable:
   - HTTP/2
   - Browser caching
   - CDN (if available)

### Issue 5: "Cannot GET /step2" or Similar Route Errors

**Problem:** Direct navigation to routes shows 404

**Solution:** `.htaccess` missing or incorrect

1. Verify `.htaccess` exists
2. Check exact content from Step 5
3. Contact hosting provider about mod_rewrite

### How to Debug

**Check browser console (F12 → Console):**

- JavaScript errors appear here
- Network errors shown in Network tab
- Should see NO red errors

**Common errors & fixes:**

```
Error: "Cannot find module"
→ Files not uploaded

Error: "XMLHttpRequest failed"
→ CORS issue (shouldn't happen with static files)

Error: "Unexpected token"
→ JavaScript file corrupted, re-upload build/
```

---

## 🔄 FUTURE UPDATES

### When You Need to Update Demo

**Example:** Update demo steps to show new features

### Workflow:

**Step 1: Make Changes Locally**

```powershell
# Edit demo steps
# Open: src/data/demoSteps.js
# Make your changes
# Add new screenshots to src/assets/screens/
```

**Step 2: Test Locally**

```powershell
# Start dev server
npm start

# Verify changes in browser at http://localhost:3000
# Test all affected steps
# Stop server (Ctrl+C)
```

**Step 3: Create Production Build**

```powershell
cd C:\tally-demo-option1
npm run build
```

**Step 4: Upload to cPanel**
Same process as initial deployment:

1. Connect via SFTP
2. Go to `public_html/`
3. Delete all old files
4. Upload new `build/` contents
5. Verify `.htaccess` exists
6. Test in browser

**Step 5: Clear Browser Cache**

- Hard refresh: `Ctrl+Shift+R` (Chrome/Firefox)
- Users might need to do the same

**Total Time:** ~15-20 minutes per update

---

## 📝 GIT WORKFLOW

### Why Use Git?

- Track all changes
- Easy to revert if needed
- Team collaboration
- Professional approach

### Setup (Already Done)

```powershell
cd C:\tally-demo-option1

# Initialize
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Tally Bank PDF Demo - 27 steps, production ready"

# Connect to GitHub
git remote add origin https://github.com/spidy03/Bank-pdf-demo.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Future: After You Make Changes

```powershell
# Navigate to project
cd C:\tally-demo-option1

# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "feat: update demo steps for new features"

# Push to GitHub
git push

# Then deploy:
# npm run build
# Upload to cPanel
```

### Commit Message Format

```
feat: add new feature
fix: fix bug
docs: update documentation
style: improve styling
refactor: refactor code
```

---

## 📊 QUICK REFERENCE

### Essential Commands

**Local Development:**

```powershell
npm start          # Start dev server
npm run build      # Create production build
npm test           # Run tests
```

**Git:**

```powershell
git status         # See changes
git add .          # Stage changes
git commit -m "msg" # Save changes
git push           # Upload to GitHub
```

**cPanel:**

- Host: `your-domain.com` or IP address
- Port: 22 (SFTP) or 21 (FTP)
- Files go to: `public_html/`
- Config: `.htaccess` file

### Important Files

```
build/index.html           ← Main file
build/static/js/           ← JavaScript
build/static/css/          ← Styles
build/static/media/        ← Assets
public_html/.htaccess      ← Routing config
```

---

## 🎯 COMPLETE DEPLOYMENT CHECKLIST

**Before Deployment:**

- [ ] Local testing done (`npm start` works)
- [ ] All 27 steps verified working
- [ ] Production build created (`npm run build`)
- [ ] `build/` folder has all files
- [ ] GitHub pushed and up to date

**During Deployment:**

- [ ] Connected to cPanel via SFTP
- [ ] Navigated to `public_html/`
- [ ] Backed up existing files (if any)
- [ ] Deleted old files
- [ ] Uploaded `build/` contents
- [ ] Created `.htaccess` file
- [ ] Verified file permissions

**After Deployment:**

- [ ] Website loads at domain
- [ ] Demo displays correctly
- [ ] Navigation buttons work
- [ ] Keyboard shortcuts work (arrow keys)
- [ ] All images display
- [ ] No console errors (F12)
- [ ] Mobile responsive
- [ ] Completion banner works

---

## 💡 TIPS & BEST PRACTICES

1. **Always test locally first**

   - Use `npm start` before deploying
   - Test all changes

2. **Backup before updating**

   - Download current `public_html/` contents
   - Easy rollback if needed

3. **Use meaningful commit messages**

   - "Update steps" ← Bad
   - "feat: update bank PDF demo steps for new features" ← Good

4. **Monitor after deployment**

   - Check that users can access
   - Collect feedback
   - Monitor for errors

5. **Version your deployments**
   - Use Git tags: `git tag v1.0`, `git tag v1.1`
   - Easy to know which version is live

---

## 📞 SUPPORT

### If Something Goes Wrong

1. **Check .htaccess:**

   - Most issues caused by missing/wrong `.htaccess`
   - Verify exact content

2. **Check files uploaded:**

   - Verify all files in `public_html/`
   - Re-upload if needed

3. **Check console (F12):**

   - Look for JavaScript errors
   - Check Network tab for failed requests

4. **Contact hosting provider:**
   - Ask if mod_rewrite is enabled
   - Ask for help with GZIP compression
   - Ask about HTTP/2, caching, CDN

### Information to Provide

```
Project: Tally Bank PDF Demo
Technology: React SPA
Build size: 7.57 MB
Requirements:
  - Apache with mod_rewrite
  - Static file serving
  - GZIP compression (optional)
No backend/database needed
```

---

## ✨ SUMMARY

### What You Have

✅ Production-ready React demo (27 steps)  
✅ Optimized build (7.57 MB)  
✅ GitHub backup  
✅ Complete documentation

### What You Do

1. Create production build locally
2. Upload to cPanel via SFTP
3. Add `.htaccess` file
4. Test on live website

### Time Required

- **Your work:** 15 minutes (build + upload)
- **Hosting provider:** 0 minutes (manual upload)
- **Total:** ~30-45 minutes

### Result

Your demo is **LIVE** on your domain! 🎉

---

## 🚀 NEXT STEPS

1. **Prepare cPanel Access**

   - Verify you can login
   - Get SFTP credentials

2. **Create Production Build**

   ```powershell
   cd C:\tally-demo-option1
   npm run build
   ```

3. **Deploy to cPanel**

   - Connect via SFTP
   - Upload `build/` contents
   - Add `.htaccess`

4. **Test Live Website**

   - Visit your domain
   - Test all 27 steps
   - Verify on mobile

5. **Monitor & Update**
   - Collect user feedback
   - Update as needed
   - Use Git to track changes

---

**Status:** ✅ Ready to Deploy  
**Last Updated:** November 24, 2025  
**Questions?** Refer to Troubleshooting section above

Good luck! 🚀
