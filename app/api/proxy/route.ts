import { NextResponse } from 'next/server';
import https from 'https';
import type { RequestInit } from 'node-fetch';

// Create a custom HTTPS agent that ignores SSL certificate errors (for development only)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

interface CustomRequestInit extends RequestInit {
  agent?: https.Agent;
}

async function proxyRequest(url: string, options: CustomRequestInit = {}) {
  try {
    const fetchOptions: CustomRequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add custom HTTPS agent for server-side requests
    if (typeof window === 'undefined') {
      fetchOptions.agent = httpsAgent;
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  return proxyRequest(url);
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  const body = await request.json();
  return proxyRequest(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  const body = await request.json();
  return proxyRequest(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  return proxyRequest(url, {
    method: 'DELETE',
  });
}