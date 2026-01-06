# Deployment Guide

## Backend Deployment (Railway/Recommended)

1. **Create Railway account** at railway.app
2. **Connect your GitHub repository**
3. **Set environment variables** in Railway dashboard:
   - `DEEPSEEK_API_KEY`: Your API key
   - `PORT`: 3001 (or leave default)
   - `NODE_ENV`: production
4. **Set build command**: `npm install` (in backend directory)
5. **Set start command**: `node server.mjs`
6. **Deploy**

## Backend Deployment (Render)

1. **Create Render account** at render.com
2. **New Web Service** → Connect GitHub
3. **Configure**:
   - Build Command: `npm install`
   - Start Command: `node server.mjs`
   - Environment: Node
4. **Add Environment Variables** in dashboard
5. **Deploy**

## Frontend Deployment (Vercel/Netlify)

### Vercel:
1. Connect GitHub repository
2. Framework Preset: Vite
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add Environment Variable: `VITE_API_URL` = your backend URL

### Netlify:
1. Connect GitHub repository
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Add environment variables

## Environment Variables

### Backend (.env):

