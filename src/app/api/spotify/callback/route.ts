import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL + '/api/spotify/callback';

// GET /api/spotify/callback - Handle the OAuth callback
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const cookieStore = await cookies();
  const storedState = cookieStore.get('spotify_auth_state')?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return new NextResponse('Invalid state parameter', { status: 400 });
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
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
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

    return responseObj;
  } catch (error) {
    console.error('Error during token exchange:', error);
    return new NextResponse('Failed to authenticate with Spotify', { status: 500 });
  }
} 