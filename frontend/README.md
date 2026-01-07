# Frontend - Mental Coach Application

A modern Next.js frontend for the Mental Coach AI application, featuring a clean chat interface with a blue color scheme.

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- The backend API running on `http://localhost:8000` (or configure `NEXT_PUBLIC_API_URL`)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure API URL (optional):**
   
   If your backend is running on a different URL, create a `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
   
   For production/Vercel deployment, set this as an environment variable in your Vercel project settings.

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
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles with Tailwind
├── components/            # React components
│   └── ChatInterface.tsx  # Main chat UI component
├── lib/                   # Utility functions
│   └── api.ts            # API client for backend communication
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

The frontend communicates with the FastAPI backend at `/api/chat` endpoint:

- **POST** `/api/chat` - Sends a chat message and receives the AI coach's response
- **GET** `/` - Health check endpoint

Make sure your backend is running before starting the frontend!

## Deployment

This frontend is configured to work with Vercel. To deploy:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the `NEXT_PUBLIC_API_URL` environment variable to your backend API URL
4. Deploy!

The frontend will automatically proxy API requests to your backend using the configured URL.
