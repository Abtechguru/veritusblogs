import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SERVER_URL } from '../lib/supabase';
import { publicAnonKey } from '/utils/supabase/info';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  createdAt: string;
  expiresAt: string;
  views: number;
}

interface StoryGroup {
  userId: string;
  userName: string;
  userAvatar: string;
  stories: Story[];
  hasViewed: boolean;
}

export function Stories() {
  const { user, accessToken } = useAuth();
  const [storyGroups, setStoryGroups] = useState<StoryGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<StoryGroup | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (selectedGroup && isPlaying) {
      const duration = 5000; // 5 seconds per story
      const interval = 50;
      const increment = (interval / duration) * 100;

      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + increment;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [selectedGroup, currentStoryIndex, isPlaying]);

  const fetchStories = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/stories`, {
        headers: {
          'Authorization': `Bearer ${accessToken || publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStoryGroups(data.storyGroups || []);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const handleStoryClick = (group: StoryGroup) => {
    setSelectedGroup(group);
    setCurrentStoryIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleClose = () => {
    setSelectedGroup(null);
    setCurrentStoryIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!selectedGroup) return;

    if (currentStoryIndex < selectedGroup.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      // Move to next group if available
      const currentGroupIndex = storyGroups.findIndex(g => g.userId === selectedGroup.userId);
      if (currentGroupIndex < storyGroups.length - 1) {
        setSelectedGroup(storyGroups[currentGroupIndex + 1]);
        setCurrentStoryIndex(0);
        setProgress(0);
      } else {
        handleClose();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else {
      // Move to previous group if available
      const currentGroupIndex = storyGroups.findIndex(g => g.userId === selectedGroup?.userId);
      if (currentGroupIndex > 0) {
        const prevGroup = storyGroups[currentGroupIndex - 1];
        setSelectedGroup(prevGroup);
        setCurrentStoryIndex(prevGroup.stories.length - 1);
        setProgress(0);
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Stories Bar */}
      <div className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-purple-200/30 dark:border-purple-800/30 overflow-x-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4 items-start">
            {/* Add Story Button */}
            {user && (
              <div className="flex-shrink-0 text-center">
                <button
                  className="story-ring w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-110 transition-transform"
                  onClick={() => {/* Open create story modal */}}
                >
                  <div className="w-[74px] h-[74px] rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-purple-600" />
                  </div>
                </button>
                <p className="text-xs mt-2 font-medium">Your Story</p>
              </div>
            )}

            {/* Story Groups */}
            {storyGroups.map(group => (
              <div
                key={group.userId}
                className="flex-shrink-0 text-center cursor-pointer group"
                onClick={() => handleStoryClick(group)}
              >
                <div className={`${!group.hasViewed ? 'story-ring' : 'p-[3px] bg-gray-300 dark:bg-gray-700 rounded-full'} w-20 h-20 rounded-full hover:scale-110 transition-transform`}>
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-900">
                    <ImageWithFallback
                      src={group.userAvatar}
                      alt={group.userName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs mt-2 font-medium truncate w-20 group-hover:text-purple-600 transition-colors">
                  {group.userName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Viewer */}
      <AnimatePresence>
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={handleClose}
          >
            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
              {selectedGroup.stories.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all"
                    style={{
                      width: index < currentStoryIndex ? '100%' : index === currentStoryIndex ? `${progress}%` : '0%'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={selectedGroup.userAvatar}
                  alt={selectedGroup.userName}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div>
                  <p className="text-white font-semibold">{selectedGroup.userName}</p>
                  <p className="text-white/80 text-sm">
                    {new Date(selectedGroup.stories[currentStoryIndex].createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button
                  onClick={handleClose}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 p-3 rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Story Content */}
            <div
              className="relative w-full max-w-md h-full max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedGroup.stories[currentStoryIndex].mediaType === 'image' ? (
                <ImageWithFallback
                  src={selectedGroup.stories[currentStoryIndex].mediaUrl}
                  alt="Story"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <video
                  src={selectedGroup.stories[currentStoryIndex].mediaUrl}
                  className="w-full h-full object-contain rounded-lg"
                  autoPlay
                  muted
                  playsInline
                />
              )}

              {/* Caption */}
              {selectedGroup.stories[currentStoryIndex].caption && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-white">
                    {selectedGroup.stories[currentStoryIndex].caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}