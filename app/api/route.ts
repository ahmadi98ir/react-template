import { NextResponse } from 'next/server';

interface ApiError {
  response?: {
    data: any;
    status: number;
  };
  message?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    const apiUrl = `${process.env.API_URL}/${path}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);

    // Type guard to check if error matches our ApiError interface
    const isApiError = (err: unknown): err is ApiError => {
      return typeof err === 'object' && err !== null && 'response' in err;
    };

    if (isApiError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status
      });
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    const body = await request.json();
    const apiUrl = `${process.env.API_URL}/${path}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);

    const isApiError = (err: unknown): err is ApiError => {
      return typeof err === 'object' && err !== null && 'response' in err;
    };

    if (isApiError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status
      });
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    const body = await request.json();
    const apiUrl = `${process.env.API_URL}/${path}`;
    
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);

    const isApiError = (err: unknown): err is ApiError => {
      return typeof err === 'object' && err !== null && 'response' in err;
    };

    if (isApiError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status
      });
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    const apiUrl = `${process.env.API_URL}/${path}`;
    
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);

    const isApiError = (err: unknown): err is ApiError => {
      return typeof err === 'object' && err !== null && 'response' in err;
    };

    if (isApiError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status
      });
    }

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}