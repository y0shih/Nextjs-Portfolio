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