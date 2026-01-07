import { NextResponse } from 'next/server';

/**
 * Health check endpoint that proxies to the backend
 */
export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8000';

    const response = await fetch(`${backendUrl}/`, {
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', backend: 'unreachable' },
        { status: 503 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ ...data, backend: 'reachable' });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', backend: 'unreachable' },
      { status: 503 }
    );
  }
}
