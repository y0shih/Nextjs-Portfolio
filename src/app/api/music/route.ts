import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define the type for our song metadata
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
  coverUrl?: string;
}

// GET /api/music - Get the liked songs
export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('spotify_access_token')?.value;

  if (!accessToken) {
    return new NextResponse('No access token', { status: 401 });
  }

  try {
    // Fetch liked songs from our new endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/spotify/liked-songs`, {
      headers: {
        'Cookie': `spotify_access_token=${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch liked songs');
    }

    const data = await response.json();
    return NextResponse.json({ playlist: data.songs });
  } catch (error) {
    console.error('Error fetching liked songs:', error);
    return new NextResponse('Failed to fetch liked songs', { status: 500 });
  }
} 