import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const result = await request.json();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}