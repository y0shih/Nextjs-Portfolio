import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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

interface SpotifyTrack {
  track: {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    duration_ms: number;
    uri: string;
  };
}

export async function GET(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('spotify_access_token')?.value;

  if (!accessToken) {
    return addCorsHeaders(new NextResponse('No access token', { status: 401 }), request);
  }

  try {
    // Fetch liked songs from Spotify
    const response = await fetch('https://api.spotify.com/v1/me/tracks?limit=50', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch liked songs');
    }

    const data = await response.json();
    
    // Transform the data to match our Song interface
    const songs = data.items.map((item: SpotifyTrack) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map(artist => artist.name).join(', '),
      duration: Math.floor(item.track.duration_ms / 1000),
      url: item.track.uri,
      coverUrl: item.track.album.images[0]?.url
    }));

    return addCorsHeaders(NextResponse.json({ songs }), request);
  } catch (error) {
    console.error('Error fetching liked songs:', error);
    return addCorsHeaders(new NextResponse('Failed to fetch liked songs', { status: 500 }), request);
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: Request) {
  return addCorsHeaders(new NextResponse(null, { status: 204 }), request);
} 