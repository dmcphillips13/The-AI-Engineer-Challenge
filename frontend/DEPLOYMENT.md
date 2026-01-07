# Vercel Deployment Guide

## The Problem

If you're getting a "500: INTERNAL_SERVER_ERROR" or "Serverless Function has crashed" error on Vercel, it's likely because:

1. The root `vercel.json` is routing all requests to the Python backend
2. Vercel is trying to run the Python backend as a serverless function, which may fail due to missing dependencies or configuration

## Solution: Deploy Frontend Separately

### Option 1: Deploy from Frontend Directory (Recommended)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel
   ```

3. **Set Environment Variable:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add: `BACKEND_API_URL` = `https://your-backend-url.vercel.app` (or wherever your backend is deployed)

   If your backend isn't deployed yet, you'll need to deploy it separately first.

4. **Redeploy** after setting the environment variable

### Option 2: Configure Vercel Project Settings

If deploying from the repository root:

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Under "Build & Development Settings"
   - Set **Root Directory** to `frontend`
   - Set **Framework Preset** to `Next.js`

2. **Set Environment Variable:**
   - Add `BACKEND_API_URL` pointing to your backend

3. **Redeploy**

## Deploying the Backend

The FastAPI backend needs to be deployed separately. You have a few options:

### Option A: Deploy Backend as Separate Vercel Project

1. Create a new Vercel project for the backend
2. Set the root directory to the project root (where `api/` folder is)
3. Configure Python runtime and dependencies
4. Set `OPENAI_API_KEY` environment variable
5. Use the backend's deployment URL as `BACKEND_API_URL` in your frontend project

### Option B: Use Vercel Serverless Functions for Backend

You can convert the FastAPI backend to Vercel serverless functions, but this requires more setup. The current architecture assumes separate deployments.

## Quick Fix for Current Deployment

If you've already deployed and it's failing:

1. **Go to Vercel Dashboard** → Your Project → Settings
2. **Set Root Directory** to `frontend`
3. **Add Environment Variable:** `BACKEND_API_URL` = `http://localhost:8000` (for testing) or your actual backend URL
4. **Redeploy**

## Testing Locally

Make sure everything works locally first:

1. **Start the backend:**
   ```bash
   # From project root
   export OPENAI_API_KEY=sk-...
   uv run uvicorn api.index:app --reload
   ```

2. **Start the frontend:**
   ```bash
   # From frontend directory
   npm install
   npm run dev
   ```

3. **Test the chat interface** at http://localhost:3000

If it works locally, it should work on Vercel once properly configured!
