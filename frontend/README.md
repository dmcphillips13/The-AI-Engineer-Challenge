# Frontend - Mental Coach Application

A modern Next.js frontend for the Mental Coach AI application, featuring a clean chat interface with a blue color scheme.

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- OpenAI API key (set as `OPENAI_API_KEY` environment variable)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Set OpenAI API Key:**

   Create a `.env.local` file in the frontend directory:
   ```bash
   OPENAI_API_KEY=sk-your-key-here
   ```
   
   For production/Vercel deployment, set `OPENAI_API_KEY` as an environment variable in your Vercel project settings.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Start the development server (runs on port 3000)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server (after building)
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
frontend/
├── app/                    # Next.js App Router directory
│   ├── api/               # Next.js API routes (proxies to backend)
│   │   ├── chat/          # Chat endpoint proxy
│   │   └── health/        # Health check proxy
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles with Tailwind
├── components/            # React components
│   └── ChatInterface.tsx  # Main chat UI component
├── lib/                   # Utility functions
│   └── api.ts            # API client (uses Next.js API routes)
├── package.json           # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Features

- **Modern Chat Interface**: Clean, responsive chat UI with message history
- **Real-time Communication**: Integrates with FastAPI backend via REST API
- **Loading States**: Visual feedback during API requests
- **Error Handling**: User-friendly error messages
- **Auto-scroll**: Automatically scrolls to latest messages
- **Keyboard Shortcuts**: Press Enter to send, Shift+Enter for new line
- **Blue Color Scheme**: Consistent blue theme throughout the UI
- **Responsive Design**: Works on desktop and mobile devices

## Architecture

This is a **unified Next.js application** that includes both frontend and backend functionality:

- **Frontend**: React components with Next.js App Router
- **Backend**: Next.js API routes that directly call OpenAI
- **Single Deployment**: Everything deploys as one app on Vercel

The Next.js API routes handle all backend logic:
- **POST** `/api/chat` - Handles chat requests and calls OpenAI directly
- **GET** `/api/health` - Health check endpoint

No separate backend server needed! Everything runs in one Next.js application.

## Deployment to Vercel

### Deploy Everything as One App

This application deploys as a **single unified app** - no separate backend needed!

1. **Deploy from the `frontend` directory:**
   ```bash
   cd frontend
   vercel
   ```
   
   Or connect your GitHub repo in Vercel and set the **Root Directory** to `frontend` in project settings.

2. **Set Environment Variable in Vercel:**
   
   Go to your Vercel project settings → Environment Variables and add:
   - `OPENAI_API_KEY` - Your OpenAI API key (e.g., `sk-...`)
   
   Make sure to add it for **Production**, **Preview**, and **Development** environments.

3. **Deploy:**
   
   ```bash
   vercel --prod
   ```
   
   Or trigger a new deployment from the Vercel dashboard.

### Troubleshooting

- **500 Error on Vercel:** Make sure you've set the `OPENAI_API_KEY` environment variable
- **"OPENAI_API_KEY not configured" error:** Verify the environment variable is set correctly in Vercel
- **Build errors:** Make sure you're deploying from the `frontend` directory and that all dependencies are installed
