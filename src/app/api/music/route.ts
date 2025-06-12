import { NextResponse } from 'next/server';
import songsData from '@/data/songs.json';

// Define the type for our song metadata
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
  coverUrl?: string;
}

// GET /api/music - Get the songs from our JSON file
export async function GET() {
  try {
    return NextResponse.json({ playlist: songsData.songs });
  } catch (error) {
    console.error('Error loading songs:', error);
    return new NextResponse('Failed to load songs', { status: 500 });
  }
} 