import { NextResponse } from 'next/server';

/**
 * Health check endpoint
 * Returns the status of the application
 */
export async function GET() {
  const hasApiKey = !!process.env.OPENAI_API_KEY;
  return NextResponse.json({
    status: 'ok',
    openai_configured: hasApiKey,
  });
}
