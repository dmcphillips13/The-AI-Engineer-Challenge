import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

/**
 * Next.js API route that handles chat requests directly
 * This integrates the backend functionality into the Next.js app
 * so everything deploys as one unified application
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

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const client = new OpenAI({ apiKey });

    // Call OpenAI API directly (same logic as FastAPI backend)
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini', // Using gpt-4o-mini instead of gpt-5 (which doesn't exist)
      messages: [
        { role: 'system', content: 'You are a supportive mental coach.' },
        { role: 'user', content: message },
      ],
    });

    const reply = response.choices[0]?.message?.content;
    if (!reply) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Error calling OpenAI API: ${error.message}`
            : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
