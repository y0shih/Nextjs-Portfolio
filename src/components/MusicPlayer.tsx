"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface SpotifyPlayerConfig {
  name: string;
  getOAuthToken: (callback: (token: string) => void) => void;
  volume: number;
}

interface SpotifyPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: <T extends SpotifyEventType>(
    event: T,
    callback: (state: SpotifyEventPayload[T]) => void
  ) => void;
  removeListener: (event: SpotifyEventType) => void;
  getCurrentState: () => Promise<SpotifyPlaybackState | null>;
  setName: (name: string) => Promise<void>;
  getVolume: () => Promise<number>;
  setVolume: (volume: number) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
}

interface SpotifyPlaybackState {
  context: {
    uri: string;
    metadata: Record<string, unknown>;
  };
  disallows: {
    pausing: boolean;
    peeking_next: boolean;
    peeking_prev: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
  };
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  shuffle: boolean;
  track_window: {
    current_track: SpotifyTrack;
    previous_tracks: SpotifyTrack[];
    next_tracks: SpotifyTrack[];
  };
}

declare global {
  interface Window {
    Spotify: {
      Player: new (config: SpotifyPlayerConfig) => SpotifyPlayer;
    };
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

interface SpotifyTrack {
  uri: string;
  name: string;
  artists: Array<{ name: string }>;
  duration_ms: number;
  album: {
    images: Array<{ url: string }>;
  };
}

type SpotifyEventType = 
  | 'initialization_error'
  | 'authentication_error'
  | 'account_error'
  | 'playback_error'
  | 'player_state_changed'
  | 'ready'
  | 'not_ready';

interface SpotifyEventPayload {
  initialization_error: { message: string };
  authentication_error: { message: string };
  account_error: { message: string };
  playback_error: { message: string };
  player_state_changed: SpotifyPlaybackState;
  ready: { device_id: string };
  not_ready: { device_id: string };
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const playerRef = useRef<SpotifyPlayer | null>(null);
  const deviceIdRef = useRef<string | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  // Initialize Spotify Web Playback SDK
  useEffect(() => {
    const initializePlayer = () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('spotify_access_token='))
        ?.split('=')[1];

      if (!token) {
        setIsLoading(false);
        return;
      }

      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (callback: (token: string) => void) => callback(token),
        volume: volume / 100
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize:', message);
        setIsLoading(false);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate:', message);
        setIsAuthenticated(false);
        setIsLoading(false);
      });

      player.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account:', message);
        setIsLoading(false);
      });

      // Playback status updates
      player.addListener('player_state_changed', (state) => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setIsPlaying(!state.paused);
        setCurrentTime(state.position);
        setDuration(state.duration);
        setProgress((state.position / state.duration) * 100);
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        deviceIdRef.current = device_id;
        setIsAuthenticated(true);
        setIsLoading(false);

        // Transfer playback to this device
        fetch('https://api.spotify.com/v1/me/player', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: false
          })
        });
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player
      player.connect();
      playerRef.current = player;

      return () => {
        player.disconnect();
      };
    };

    window.onSpotifyWebPlaybackSDKReady = initializePlayer;

    // Load the Spotify Web Playback SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Update progress every second
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current) {
          playerRef.current.getCurrentState().then((state: any) => {
            if (state) {
              setCurrentTime(state.position);
              setProgress((state.position / state.duration) * 100);
            }
          });
        }
      }, 1000);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = async () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }

    if (!playerRef.current) return;

    if (isPlaying) {
      await playerRef.current.pause();
    } else {
      await playerRef.current.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    if (playerRef.current) {
      const newTime = (newProgress / 100) * duration;
      await playerRef.current.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      await playerRef.current.setVolume(newVolume / 100);
    }
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleSkipBack = async () => {
    if (playerRef.current) {
      await playerRef.current.previousTrack();
    }
  };

  const handleSkipForward = async () => {
    if (playerRef.current) {
      await playerRef.current.nextTrack();
    }
  };

  const handleLogin = () => {
    window.location.href = '/api/spotify/auth';
  };

  const formatTime = (timeInMs: number) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-card rounded-full p-6 bg-primary/20">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <button 
          onClick={handleLogin}
          className="glass-card glass-hover rounded-full px-6 py-3 transition-all duration-500 hover:scale-110 bg-primary/20"
        >
          <span className="text-sm font-medium text-primary">Connect Spotify</span>
        </button>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <button 
          onClick={handlePlayPause}
          className="glass-card glass-hover rounded-full p-6 transition-all duration-500 hover:scale-110 bg-primary/20"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-primary" />
          ) : (
            <Play className="w-4 h-4 text-primary" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-scale-in">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 mx-auto max-w-md w-full shadow-lg shadow-black/30 glass-card">
        {/* Close button */}
        <div className="flex justify-end mb-2">
          <button 
            onClick={handleCollapse}
            className="text-muted-foreground hover:text-foreground transition-colors text-xs"
          >
            ✕
          </button>
        </div>

        {/* Song Info */}
        <div className="text-center mb-3">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {currentTrack?.name || 'No track playing'}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {currentTrack?.artists.map(artist => artist.name).join(', ') || 'Unknown artist'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-muted/50 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}%, hsl(var(--muted)) 100%)`
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-3">
          <button 
            onClick={handleSkipBack}
            className="glass-card glass-hover rounded-xl p-2 transition-all"
          >
            <SkipBack className="w-4 h-4 text-foreground" />
          </button>
          
          <button 
            onClick={handlePlayPause}
            className="glass-card glass-hover rounded-xl p-3 transition-all bg-primary/20"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-primary" />
            ) : (
              <Play className="w-6 h-6 text-primary" />
            )}
          </button>
          
          <button 
            onClick={handleSkipForward}
            className="glass-card glass-hover rounded-xl p-2 transition-all"
          >
            <SkipForward className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-muted/50 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume}%, hsl(var(--muted)) ${volume}%, hsl(var(--muted)) 100%)`
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-8 text-right">
            {volume}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;