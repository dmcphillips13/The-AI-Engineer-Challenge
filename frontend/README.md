# Frontend - Mental Coach Application

A modern Next.js frontend for the Mental Coach AI application, featuring a clean chat interface with a blue color scheme.

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- The backend API running on `http://localhost:8000` (for local development)
- For production: Backend API URL configured via `BACKEND_API_URL` environment variable

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Backend API URL (for production):**

   For local development, the frontend will automatically use `http://localhost:8000`.

   For production/Vercel deployment, you need to set the `BACKEND_API_URL` environment variable in your Vercel project settings to point to your deployed backend API.

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

## Backend Integration

The frontend uses Next.js API routes (`/app/api/chat` and `/app/api/health`) that proxy requests to the FastAPI backend. This approach:

- Avoids CORS issues in production
- Works seamlessly in both local development and Vercel deployment
- Keeps API keys and backend URLs server-side

The Next.js API routes communicate with the FastAPI backend:
- **POST** `/api/chat` (Next.js route) → proxies to backend `/api/chat`
- **GET** `/api/health` (Next.js route) → proxies to backend `/`

Make sure your backend is running before starting the frontend!

## Deployment to Vercel

### Important: Deploy from the Frontend Directory

To deploy the frontend to Vercel:

1. **Deploy from the `frontend` directory:**
   ```bash
   cd frontend
   vercel
   ```

   Or connect your GitHub repo in Vercel and set the **Root Directory** to `frontend` in project settings.

2. **Set Environment Variables in Vercel:**

   Go to your Vercel project settings → Environment Variables and add:
   - `BACKEND_API_URL` - The URL of your deployed backend API (e.g., `https://your-backend.vercel.app` or your backend's URL)

   **Note:** If your backend is deployed separately on Vercel, you'll need its deployment URL. If it's on the same Vercel project, you may need to deploy it as a separate service or use serverless functions.

3. **Redeploy:**

   After setting environment variables, trigger a new deployment.

### Alternative: Deploy Backend as Serverless Functions

If you want everything in one Vercel deployment, you can deploy the FastAPI backend as serverless functions. However, the current setup assumes the backend is deployed separately.

### Troubleshooting

- **500 Error on Vercel:** Make sure you've set the `BACKEND_API_URL` environment variable
- **CORS Errors:** The Next.js API routes should handle this automatically
- **Backend Not Found:** Verify your `BACKEND_API_URL` is correct and the backend is deployed and accessible
