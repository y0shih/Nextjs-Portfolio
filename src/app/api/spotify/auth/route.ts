import { NextResponse } from 'next/server';

// These should be in your .env.local file
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
// const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL + '/api/spotify/callback';

// Add CORS headers to response
const addCorsHeaders = (response: NextResponse, request: Request) => {
  // Get the origin from the request headers
  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  // List of allowed origins
  const allowedOrigins = [
    'http://localhost:3000',
    'https://nextjs-portfolio-u735.vercel.app',
    process.env.NEXT_PUBLIC_BASE_URL
  ].filter(Boolean); // Remove any undefined values

  // Check if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
};

// Generate a random string for state parameter
const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// GET /api/spotify/auth - Start the OAuth flow
export async function GET(request: Request) {
  if (!SPOTIFY_CLIENT_ID) {
    return addCorsHeaders(new NextResponse('Spotify client ID not configured', { status: 500 }), request);
  }

  const state = generateRandomString(16);
  console.log('[Auth Route] Generated state:', state);
  console.log('[Auth Route] NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
  
  const scope = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-read',
    'app-remote-control'
  ].join(' ');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    state: state,
  });

  // Store state in a cookie for verification
  const response = NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
  console.log('[Auth Route] Setting cookie with state:', state);
  console.log('[Auth Route] Cookie settings:', {
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined,
    path: '/',
    secure: true,
    sameSite: 'lax'
  });
  
  response.cookies.set('spotify_auth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60, // 1 hour
    // Remove domain restriction to test if that's the issue
    // domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
  });

  // Log the actual cookie that was set
  const setCookieHeader = response.headers.get('set-cookie');
  console.log('[Auth Route] Set-Cookie header:', setCookieHeader);

  return addCorsHeaders(response, request);
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: Request) {
  return addCorsHeaders(new NextResponse(null, { status: 204 }), request);
} 