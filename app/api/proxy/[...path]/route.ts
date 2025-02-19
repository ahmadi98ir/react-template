import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  try {
    const path = params.path.join('/');
    const response = await fetch(`${process.env.API_URL}/${path}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: { params: { path: string[] } }) {
  try {
    const path = params.path.join('/');
    const body = await request.json();
    
    const response = await fetch(`${process.env.API_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { path: string[] } }) {
  try {
    const path = params.path.join('/');
    const body = await request.json();
    
    const response = await fetch(`${process.env.API_URL}/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { path: string[] } }) {
  try {
    const path = params.path.join('/');
    
    const response = await fetch(`${process.env.API_URL}/${path}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}