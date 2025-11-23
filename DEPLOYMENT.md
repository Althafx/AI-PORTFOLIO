# Deployment Guide

Follow the comprehensive deployment guide in the artifacts section.

## Quick Start

### 1. Deploy Backend (Render)
- Sign up at [render.com](https://render.com)
- Create new Web Service
- Connect GitHub repository
- Set root directory to `server`
- Add environment variables (see deployment guide)

### 2. Deploy Frontend (Vercel)
- Sign up at [vercel.com](https://vercel.com)
- Import GitHub repository
- Set root directory to `client`
- Add `VITE_API_URL` environment variable

### 3. Configure
- Update backend `CLIENT_URL` with Vercel URL
- Test all functionality

See `deployment_guide.md` artifact for detailed instructions.
