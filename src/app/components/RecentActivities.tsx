import React from 'react';
import { motion } from 'motion/react';
import { Activity as ActivityIcon, BookOpen, MessageSquare, Share2, Heart, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { useGamification, Activity } from '../contexts/GamificationContext';
import { formatDistanceToNow } from 'date-fns';

export function RecentActivities({ limit = 10 }: { limit?: number }) {
  const { recentActivities, isLoading } = useGamification();

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'read_article':
        return <BookOpen className="h-4 w-4" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4" />;
      case 'contribute_topic':
        return <Trophy className="h-4 w-4" />;
      case 'share':
        return <Share2 className="h-4 w-4" />;
      case 'reaction':
        return <Heart className="h-4 w-4" />;
      default:
        return <ActivityIcon className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'read_article':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
      case 'comment':
        return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300';
      case 'contribute_topic':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300';
      case 'share':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300';
      case 'reaction':
        return 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ActivityIcon className="h-5 w-5" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const displayActivities = recentActivities.slice(0, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ActivityIcon className="h-5 w-5" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No recent activities</p>
          ) : (
            displayActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <img
                    src={activity.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.userId}`}
                    alt={activity.userName}
                  />
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{activity.userName}</span>
                    <Badge variant="secondary" className={`${getActivityColor(activity.type)} text-xs`}>
                      {getActivityIcon(activity.type)}
                      <span className="ml-1">+{activity.xpEarned} XP</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
