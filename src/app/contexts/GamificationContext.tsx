import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { SERVER_URL } from '../lib/supabase';
import { publicAnonKey } from '/utils/supabase/info';

export interface UserXP {
  userId: string;
  userName: string;
  avatar?: string;
  totalXP: number;
  level: number;
  weeklyXP: number;
  weeklyRank?: number;
  achievements: string[];
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  type: 'read_article' | 'comment' | 'contribute_topic' | 'share' | 'reaction';
  description: string;
  xpEarned: number;
  timestamp: string;
}

interface GamificationContextType {
  userXP: UserXP | null;
  weeklyLeaderboard: UserXP[];
  allTimeLeaderboard: UserXP[];
  recentActivities: Activity[];
  addActivity: (type: Activity['type'], description: string, xpAmount: number) => Promise<void>;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

// XP rewards for different activities
export const XP_REWARDS = {
  READ_ARTICLE: 5,
  COMMENT: 10,
  CONTRIBUTE_TOPIC: 25,
  SHARE: 15,
  REACTION: 2,
  DAILY_LOGIN: 10,
};

// Level thresholds
const getLevelFromXP = (xp: number): number => {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 1000) return 4;
  if (xp < 2000) return 5;
  if (xp < 3500) return 6;
  if (xp < 5500) return 7;
  if (xp < 8000) return 8;
  if (xp < 12000) return 9;
  return 10;
};

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, accessToken } = useAuth();
  const [userXP, setUserXP] = useState<UserXP | null>(null);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<UserXP[]>([]);
  const [allTimeLeaderboard, setAllTimeLeaderboard] = useState<UserXP[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user]);

  const refreshData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch user XP
      const userXPResponse = await fetch(`${SERVER_URL}/gamification/user-xp`, {
        headers: {
          'Authorization': `Bearer ${accessToken || publicAnonKey}`,
        },
      });

      if (userXPResponse.ok) {
        const data = await userXPResponse.json();
        setUserXP(data.userXP);
      }

      // Fetch leaderboards
      const leaderboardResponse = await fetch(`${SERVER_URL}/gamification/leaderboard`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (leaderboardResponse.ok) {
        const data = await leaderboardResponse.json();
        setWeeklyLeaderboard(data.weekly || []);
        setAllTimeLeaderboard(data.allTime || []);
      }

      // Fetch recent activities
      const activitiesResponse = await fetch(`${SERVER_URL}/gamification/activities`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (activitiesResponse.ok) {
        const data = await activitiesResponse.json();
        setRecentActivities(data.activities || []);
      }
    } catch (error) {
      console.error('Error fetching gamification data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addActivity = async (type: Activity['type'], description: string, xpAmount: number) => {
    if (!user || !accessToken) return;

    try {
      const response = await fetch(`${SERVER_URL}/gamification/add-activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          type,
          description,
          xpAmount,
        }),
      });

      if (response.ok) {
        await refreshData();
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  const value: GamificationContextType = {
    userXP,
    weeklyLeaderboard,
    allTimeLeaderboard,
    recentActivities,
    addActivity,
    refreshData,
    isLoading,
  };

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
