# Vercel Frontend Deployment Guide

## Issues Fixed

### 1. **NPM Optional Dependencies**
- **Problem**: Root `.npmrc` had `optional=false`, preventing Rollup's native bindings from installing
- **Solution**: Changed to `optional=true` in both root and client `.npmrc` files

### 2. **Workspace Configuration Conflicts**
- **Problem**: Monorepo workspace setup was causing module resolution issues during Vercel builds
- **Solution**: Simplified `vercel.json` to use default npm behavior

### 3. **Vercel Configuration**
- **Problem**: Custom install commands were interfering with dependency installation
- **Solution**: Removed custom install commands, letting Vercel handle it automatically

## Vercel Project Settings

When deploying to Vercel, use these settings:

### Framework Preset
- **Framework**: Vite

### Build & Development Settings
- **Root Directory**: `client` (IMPORTANT!)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: Leave empty (use default)

### Environment Variables
Add these environment variables in Vercel dashboard:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url.onrender.com` with your actual Render backend URL.

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to client directory
cd client

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: (select your account)
# - Link to existing project: N
# - Project name: (enter name or press enter)
# - In which directory is your code located: ./
# - Want to override settings: Y
# - Build Command: npm run build
# - Output Directory: dist
# - Development Command: npm run dev
```

### Option 3: Deploy Production

```bash
cd client
vercel --prod
```

## Troubleshooting

### Login Issues ("Invalid email or password")

If you're getting "Invalid email or password" errors in production:

1. **Check Environment Variables in Vercel**:
   - Go to your Vercel project → Settings → Environment Variables
   - Ensure `VITE_API_URL` is set to your Render backend URL
   - Example: `https://ai-portfolio-backend.onrender.com`
   - **Important**: Redeploy after adding/changing environment variables

2. **Check Environment Variables in Render**:
   - Go to your Render service → Environment
   - Ensure `CLIENT_URL` includes your Vercel URL
   - Example: `https://your-app.vercel.app,http://localhost:5173`
   - Multiple URLs should be comma-separated

3. **Check Browser Console**:
   - Open browser DevTools (F12) → Console tab
   - Look for the API endpoint being called
   - If it shows `http://localhost:5000`, the `VITE_API_URL` isn't set correctly

4. **Check Render Logs**:
   - Go to your Render service → Logs
   - Look for login attempt messages with emoji indicators (🔐, 📧, etc.)
   - Check if requests are reaching the backend
   - Verify CORS origin is being allowed

5. **Verify Credentials**:
   - Email: `admin@portfolio.com`
   - Password: `OFFICIAL0487`
   - Ensure no extra spaces when typing

6. **Check CORS Errors**:
   - Look for CORS errors in browser console
   - If you see CORS errors, verify `CLIENT_URL` in Render includes your Vercel URL

### If build still fails with MODULE_NOT_FOUND:

1. **Clear Vercel cache**:
   - Go to Project Settings → General
   - Scroll to "Build & Development Settings"
   - Click "Clear Cache"
   - Redeploy

2. **Check Node.js version**:
   - Add environment variable: `NODE_VERSION=20.x`
   - Vercel will use Node.js 20.x which has better compatibility

3. **Verify .npmrc is committed**:
   ```bash
   git add client/.npmrc
   git commit -m "Add client .npmrc for Vercel deployment"
   git push
   ```

## Post-Deployment

After successful deployment:

1. **Update CORS settings** in your backend (`server/index.js`):
   ```javascript
   const corsOptions = {
       origin: [
           'http://localhost:5173',
           'https://your-vercel-app.vercel.app'  // Add your Vercel URL
       ],
       credentials: true
   };
   ```

2. **Test the deployment**:
   - Visit your Vercel URL
   - Check browser console for any API errors
   - Verify all features work correctly

3. **Set up custom domain** (optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Files Modified

- [`client/.npmrc`](file:///c:/Users/ALTHAF/Desktop/AI%20PORTFOLIO/client/.npmrc) - Created to allow optional dependencies
- [`client/vercel.json`](file:///c:/Users/ALTHAF/Desktop/AI%20PORTFOLIO/client/vercel.json) - Simplified configuration
- [`.npmrc`](file:///c:/Users/ALTHAF/Desktop/AI%20PORTFOLIO/.npmrc) - Changed `optional=false` to `optional=true`
