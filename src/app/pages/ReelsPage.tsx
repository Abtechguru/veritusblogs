import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Bookmark, Play, Volume2, VolumeX, MoreVertical } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification, XP_REWARDS } from '../contexts/GamificationContext';
import { SERVER_URL } from '../lib/supabase';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

interface Reel {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  videoUrl: string;
  thumbnailUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  category?: string;
  createdAt: string;
  hasLiked?: boolean;
  hasSaved?: boolean;
}

export function ReelsPage() {
  const { user, accessToken } = useAuth();
  const { addActivity } = useGamification();
  const [reels, setReels] = useState<Reel[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    // Play/pause videos based on current index
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex && isPlaying) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    // Handle scroll to snap to videos
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = containerRef.current.scrollTop;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / videoHeight);

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        // Track view
        if (reels[newIndex]) {
          trackView(reels[newIndex].id);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex, reels]);

  const fetchReels = async () => {
    setIsLoading(true);
    try {
      // Force loading mock reels for campaign candidates
      const { getMockReels } = await import('../data/mockReels');
      setReels(getMockReels());

      // Backend fetch disabled to show specific campaign candidates
      /*
      const response = await fetch(`${SERVER_URL}/reels`, {
        headers: {
          'Authorization': `Bearer ${accessToken || ''}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReels(data.reels || []);
      }
      */
    } catch (error) {
      console.error('Error fetching reels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackView = async (reelId: string) => {
    try {
      await fetch(`${SERVER_URL}/reels/${reelId}/view`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken || ''}`,
        },
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const handleLike = async (reelId: string) => {
    if (!user) {
      toast.error('Please login to like reels');
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/reels/${reelId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        await fetchReels();
        await addActivity('reaction', 'Liked a reel', XP_REWARDS.REACTION);
      }
    } catch (error) {
      console.error('Error liking reel:', error);
    }
  };

  const handleSave = async (reelId: string) => {
    if (!user) {
      toast.error('Please login to save reels');
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/reels/${reelId}/save`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        await fetchReels();
        toast.success('Reel saved!');
      }
    } catch (error) {
      console.error('Error saving reel:', error);
    }
  };

  const handleShare = async (reel: Reel) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${reel.userName}'s Reel`,
          text: reel.caption,
          url: window.location.href,
        });
        await addActivity('share', 'Shared a reel', XP_REWARDS.SHARE);
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
      await addActivity('share', 'Shared a reel', XP_REWARDS.SHARE);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach(video => {
      if (video) {
        video.muted = !isMuted;
      }
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
          <p className="text-white">Loading Reels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black overflow-hidden">
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className="relative h-screen snap-start snap-always flex items-center justify-center"
          >
            {/* Video */}
            <video
              ref={el => { if (el) videoRefs.current[index] = el; }}
              src={reel.videoUrl}
              poster={reel.thumbnailUrl}
              className="w-full h-full object-cover"
              loop
              playsInline
              muted={isMuted}
              onClick={togglePlayPause}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* Top Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">
              <button
                onClick={toggleMute}
                className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>

            {/* User Info & Caption */}
            <div className="absolute bottom-20 left-4 right-20 z-10">
              <div className="flex items-center gap-3 mb-3">
                <ImageWithFallback
                  src={reel.userAvatar}
                  alt={reel.userName}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div className="flex-1">
                  <p className="text-white font-bold">{reel.userName}</p>
                  {reel.category && (
                    <p className="text-white/80 text-sm capitalize">#{reel.category}</p>
                  )}
                </div>
                {user && user.id !== reel.userId && (
                  <button className="px-6 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-transform">
                    Follow
                  </button>
                )}
              </div>

              <p className="text-white text-sm line-clamp-2">
                {reel.caption}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-20 right-4 z-10 flex flex-col gap-6">
              {/* Like */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLike(reel.id)}
                className="flex flex-col items-center gap-1"
              >
                <div className={`w-14 h-14 rounded-full ${reel.hasLiked ? 'bg-gradient-to-br from-red-500 to-pink-500' : 'bg-black/50 backdrop-blur-sm'} flex items-center justify-center hover:scale-110 transition-transform`}>
                  <Heart
                    className={`w-7 h-7 ${reel.hasLiked ? 'text-white fill-white' : 'text-white'}`}
                  />
                </div>
                <span className="text-white text-xs font-semibold">
                  {reel.likes > 999 ? `${(reel.likes / 1000).toFixed(1)}K` : reel.likes}
                </span>
              </motion.button>

              {/* Comment */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <span className="text-white text-xs font-semibold">
                  {reel.comments > 999 ? `${(reel.comments / 1000).toFixed(1)}K` : reel.comments}
                </span>
              </motion.button>

              {/* Share */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleShare(reel)}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                  <Share2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-white text-xs font-semibold">
                  {reel.shares > 999 ? `${(reel.shares / 1000).toFixed(1)}K` : reel.shares}
                </span>
              </motion.button>

              {/* Save */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSave(reel.id)}
                className="flex flex-col items-center gap-1"
              >
                <div className={`w-14 h-14 rounded-full ${reel.hasSaved ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : 'bg-black/50 backdrop-blur-sm'} flex items-center justify-center hover:scale-110 transition-transform`}>
                  <Bookmark
                    className={`w-7 h-7 ${reel.hasSaved ? 'text-white fill-white' : 'text-white'}`}
                  />
                </div>
              </motion.button>

              {/* More Options */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                  <MoreVertical className="w-7 h-7 text-white" />
                </div>
              </motion.button>
            </div>

            {/* Play/Pause Indicator */}
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            )}
          </div>
        ))}

        {reels.length === 0 && (
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-xl mb-2">No Reels Available</p>
              <p className="text-white/60">Check back soon for exciting content!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}