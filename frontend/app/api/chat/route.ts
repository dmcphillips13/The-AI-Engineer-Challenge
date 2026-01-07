import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js API route that proxies chat requests to the backend
 * This allows the frontend to make requests without CORS issues
 * and works in both local development and Vercel deployment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Get the backend URL from environment variable or use default
    // For local dev, this should be http://localhost:8000
    // For production, set BACKEND_API_URL in Vercel environment variables
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';

    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.detail || `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying chat request:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
