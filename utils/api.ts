export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function handleApiResponse(response: Response) {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    let errorData;

    try {
      errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // If parsing fails, use status text
      errorMessage = response.statusText;
    }

    throw new ApiError(response.status, errorMessage, errorData);
  }

  return response.json();
}

export function getApiUrl(path: string): string {
  // Always use relative path for API calls
  return `/api/proxy/${path.replace(/^\//, '')}`;
}

export function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

export async function fetchApi<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(path);
  const headers = {
    ...getHeaders(),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'same-origin',
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}