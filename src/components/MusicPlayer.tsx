"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronUp } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
  coverUrl?: string;
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load playlist and initialize audio
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const response = await fetch('/api/music');
        if (!response.ok) throw new Error('Failed to fetch playlist');
        const data = await response.json();
        setPlaylist(data.playlist);
        if (data.playlist.length > 0) {
          setCurrentTrack(data.playlist[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading playlist:', error);
        setIsLoading(false);
      }
    };

    loadPlaylist();
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (!currentTrack) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = currentTrack.url;
    audio.volume = volume / 100;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration * 1000); // Convert to milliseconds
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime * 1000); // Convert to milliseconds
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      // Auto-play next track
      if (currentIndex < playlist.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentTrack(playlist[currentIndex + 1]);
        // Auto play the next track
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(error => {
              console.error('Autoplay failed:', error);
              setIsPlaying(false);
            });
          }
        }, 100);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, volume, currentIndex, playlist]);

  // Update progress every second while playing
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          const audio = audioRef.current;
          setCurrentTime(audio.currentTime * 1000);
          setProgress((audio.currentTime / audio.duration) * 100);
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
    if (!audioRef.current || !currentTrack) return;

    if (!isExpanded) {
      setIsExpanded(true);
    }

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newProgress = Number(e.target.value);
    setProgress(newProgress);
    const newTime = (newProgress / 100) * duration;
    audioRef.current.currentTime = newTime / 1000; // Convert back to seconds
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleVolumeReset = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default button behavior
    e.stopPropagation(); // Stop event propagation
    const defaultVolume = 50;
    setVolume(defaultVolume);
    if (audioRef.current) {
      audioRef.current.volume = defaultVolume / 100;
    }
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleSkipBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentTrack(playlist[currentIndex - 1]);
      setIsPlaying(false);
    }
  };

  const handleSkipForward = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentTrack(playlist[currentIndex + 1]);
      setIsPlaying(false);
    }
  };

  const formatTime = (timeInMs: number) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-card p-6 bg-primary/20">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!currentTrack) {
    return (
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-card px-6 py-3 bg-primary/20">
          <span className="text-sm font-medium text-primary">No tracks available</span>
        </div>
      </div>
    );
  }

  if (!isExpanded && isPlaying) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <div className="glass-card glass-hover px-6 py-3 transition-all duration-500 hover:scale-105 bg-primary/10 min-w-[300px] max-w-[400px] w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePlayPause}
                  className="flex-shrink-0 glass-card glass-hover p-2 transition-all"
                >
                  <Pause className="w-3 h-3 text-primary" />
                </button>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-primary truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="relative h-1 bg-muted/50 overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full bg-primary transition-all duration-100 ${isPlaying ? 'progress-bar-beat' : ''}`}
                    style={{ width: `${progress}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsExpanded(true)}
              className="flex-shrink-0 glass-card glass-hover p-2 transition-all flex items-center justify-center w-6 h-6"
            >
              <ChevronUp className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button 
          onClick={handlePlayPause}
          className="glass-card glass-hover p-4 transition-all duration-500 hover:scale-105 bg-primary/10"
        >
          <Play className="w-4 h-4 text-primary" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-scale-in">
      <div className="glass-card glass-hover px-6 py-4 transition-all duration-500 bg-primary/20 min-w-[300px] max-w-[400px] w-full">
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
          <button 
            onClick={handleCollapse}
            className="flex-shrink-0 glass-card glass-hover p-2 transition-all flex items-center justify-center w-6 h-6"
          >
            <ChevronUp className="w-4 h-4 text-primary rotate-180" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="relative h-1 bg-muted/50 overflow-hidden">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button 
            onClick={handleSkipBack}
            disabled={currentIndex === 0}
            className="glass-card glass-hover p-2 transition-all disabled:opacity-50"
          >
            <SkipBack className="w-4 h-4 text-foreground" />
          </button>
          
          <button 
            onClick={handlePlayPause}
            className="glass-card glass-hover p-3 transition-all bg-primary/20"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-primary" />
            ) : (
              <Play className="w-6 h-6 text-primary" />
            )}
          </button>
          
          <button 
            onClick={handleSkipForward}
            disabled={currentIndex === playlist.length - 1}
            className="glass-card glass-hover p-2 transition-all disabled:opacity-50"
          >
            <SkipForward className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleVolumeReset}
            type="button"
            className="glass-card glass-hover p-2 transition-all"
          >
            <Volume2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1 relative h-1 bg-muted/50 overflow-hidden">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-100"
              style={{ width: `${volume}%` }}
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