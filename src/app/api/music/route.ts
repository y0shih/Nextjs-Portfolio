import { NextResponse } from 'next/server';

// Define the type for our song metadata
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
  coverUrl?: string;
}

// This would typically come from a database
const PLAYLIST: Song[] = [
  {
    id: '1',
    title: 'Sample Song 1',
    artist: 'Artist 1',
    duration: 180, // 3 minutes in seconds
    url: '/api/music/stream/1',
    coverUrl: '/images/covers/1.jpg'
  },
  {
    id: '2',
    title: 'Sample Song 2',
    artist: 'Artist 2',
    duration: 240, // 4 minutes in seconds
    url: '/api/music/stream/2',
    coverUrl: '/images/covers/2.jpg'
  }
];

// GET /api/music - Get the playlist
export async function GET() {
  return NextResponse.json({ playlist: PLAYLIST });
}

// GET /api/music/stream/[id] - Stream a specific song
export async function GET_STREAM(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const song = PLAYLIST.find(s => s.id === id);
  
  if (!song) {
    return new NextResponse('Song not found', { status: 404 });
  }

  // In a real application, you would:
  // 1. Get the actual audio file from your storage (e.g., S3, local filesystem)
  // 2. Stream it properly with proper headers for audio streaming
  // 3. Handle range requests for seeking
  
  // For now, we'll return a mock response
  return new NextResponse('Mock audio data', {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Length': '1000000', // Mock size
    },
  });
} 