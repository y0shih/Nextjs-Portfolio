import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Add CORS headers to response
const addCorsHeaders = (response: NextResponse) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
};

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL + '/api/spotify/callback';

// GET /api/spotify/callback - Handle the OAuth callback
export async function GET(request: Request) {
  console.log('[Callback Route] Request URL:', request.url);
  console.log('[Callback Route] Request headers:', Object.fromEntries(request.headers.entries()));
  
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  console.log('[Callback Route] Raw cookie header:', request.headers.get('cookie'));
  const cookieStore = await cookies();
  console.log('[Callback Route] All available cookies:', cookieStore.getAll().map(c => ({
    name: c.name,
    value: c.value
  })));
  
  const storedState = cookieStore.get('spotify_auth_state')?.value;
  console.log('[Callback Route] State validation details:', {
    receivedState: state,
    storedState: storedState,
    hasCode: !!code,
    hasState: !!state,
    hasStoredState: !!storedState,
    statesMatch: state === storedState,
    cookieExists: !!cookieStore.get('spotify_auth_state')
  });

  if (!code || !state || !storedState || state !== storedState) {
    console.log('[Callback Route] State validation failed:', {
      hasCode: !!code,
      hasState: !!state,
      hasStoredState: !!storedState,
      statesMatch: state === storedState,
      cookieExists: !!cookieStore.get('spotify_auth_state')
    });
    return addCorsHeaders(new NextResponse('Invalid state parameter', { status: 400 }));
  }

  try {
    // Exchange code for tokens
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_description || 'Failed to get access token');
    }

    // Store tokens in cookies
    const cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    const responseObj = NextResponse.redirect(new URL('/', request.url));
    
    // Store access token (expires in 1 hour)
    responseObj.cookies.set('spotify_access_token', data.access_token, {
      ...cookieOptions,
      maxAge: data.expires_in,
    });

    // Store refresh token (expires in 1 year)
    responseObj.cookies.set('spotify_refresh_token', data.refresh_token, {
      ...cookieOptions,
      maxAge: 365 * 24 * 60 * 60,
    });

    // Clear the state cookie
    responseObj.cookies.delete('spotify_auth_state');

    console.log('[Callback Route] Setting cookies:', {
      accessToken: !!data.access_token,
      refreshToken: !!data.refresh_token,
      cookieOptions
    });

    return addCorsHeaders(responseObj);
  } catch (error) {
    console.error('Error during token exchange:', error);
    return addCorsHeaders(new NextResponse('Failed to authenticate with Spotify', { status: 500 }));
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return addCorsHeaders(new NextResponse(null, { status: 204 }));
} 