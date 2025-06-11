import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// POST /api/spotify/refresh - Refresh the access token
export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('spotify_refresh_token')?.value;

  if (!refreshToken) {
    return new NextResponse('No refresh token found', { status: 401 });
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_description || 'Failed to refresh token');
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
    };

    const responseObj = NextResponse.json({ success: true });
    
    // Update access token
    responseObj.cookies.set('spotify_access_token', data.access_token, {
      ...cookieOptions,
      maxAge: data.expires_in,
    });

    // If a new refresh token was provided, update it
    if (data.refresh_token) {
      responseObj.cookies.set('spotify_refresh_token', data.refresh_token, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60, // 1 year
      });
    }

    return responseObj;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return new NextResponse('Failed to refresh token', { status: 500 });
  }
} 