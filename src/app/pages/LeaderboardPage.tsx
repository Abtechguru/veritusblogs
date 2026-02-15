import React from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, Award, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useGamification } from '../contexts/GamificationContext';
import { RecentActivities } from '../components/RecentActivities';

export function LeaderboardPage() {
  const { weeklyLeaderboard, allTimeLeaderboard, userXP, isLoading } = useGamification();

  const getLevelBadge = (level: number) => {
    if (level >= 10) return { text: 'Legend', color: 'bg-purple-600 text-white' };
    if (level >= 7) return { text: 'Expert', color: 'bg-blue-600 text-white' };
    if (level >= 5) return { text: 'Advanced', color: 'bg-green-600 text-white' };
    if (level >= 3) return { text: 'Intermediate', color: 'bg-yellow-600 text-white' };
    return { text: 'Beginner', color: 'bg-gray-600 text-white' };
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
              <Trophy className="h-5 w-5" />
              <span className="font-semibold">Community Leaderboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Top Readers & Contributors
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Celebrate our most engaged community members
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats Card */}
        {userXP && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="h-20 w-20 border-4 border-white/20">
                    <img
                      src={userXP.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userXP.userId}`}
                      alt={userXP.userName}
                    />
                  </Avatar>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold mb-2">{userXP.userName}</h3>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <Badge className={getLevelBadge(userXP.level).color}>
                        <Star className="h-3 w-3 mr-1" />
                        Level {userXP.level} - {getLevelBadge(userXP.level).text}
                      </Badge>
                      {userXP.weeklyRank && userXP.weeklyRank <= 10 && (
                        <Badge className="bg-yellow-400 text-yellow-900">
                          <Trophy className="h-3 w-3 mr-1" />
                          #{userXP.weeklyRank} This Week
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold">{userXP.totalXP}</div>
                      <div className="text-sm text-white/80">Total XP</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{userXP.weeklyXP}</div>
                      <div className="text-sm text-white/80">This Week</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboards */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="weekly">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  This Week
                </TabsTrigger>
                <TabsTrigger value="alltime">
                  <Award className="h-4 w-4 mr-2" />
                  All Time
                </TabsTrigger>
              </TabsList>

              <TabsContent value="weekly">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Top 50</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weeklyLeaderboard.slice(0, 50).map((user, index) => (
                        <LeaderboardRow
                          key={user.userId}
                          rank={index + 1}
                          user={user}
                          showWeeklyXP
                        />
                      ))}
                      {weeklyLeaderboard.length === 0 && (
                        <p className="text-center text-gray-500 py-8">
                          No activity this week yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alltime">
                <Card>
                  <CardHeader>
                    <CardTitle>All-Time Top 50</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {allTimeLeaderboard.slice(0, 50).map((user, index) => (
                        <LeaderboardRow
                          key={user.userId}
                          rank={index + 1}
                          user={user}
                        />
                      ))}
                      {allTimeLeaderboard.length === 0 && (
                        <p className="text-center text-gray-500 py-8">
                          No data available
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* XP Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Earn XP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded">
                  <span className="text-sm">Read Article</span>
                  <Badge variant="secondary">+5 XP</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded">
                  <span className="text-sm">Post Comment</span>
                  <Badge variant="secondary">+10 XP</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950 rounded">
                  <span className="text-sm">Weekly Topic</span>
                  <Badge variant="secondary">+25 XP</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950 rounded">
                  <span className="text-sm">Share Article</span>
                  <Badge variant="secondary">+15 XP</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-pink-50 dark:bg-pink-950 rounded">
                  <span className="text-sm">Like/React</span>
                  <Badge variant="secondary">+2 XP</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <RecentActivities limit={5} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface LeaderboardRowProps {
  rank: number;
  user: {
    userId: string;
    userName: string;
    avatar?: string;
    totalXP: number;
    level: number;
    weeklyXP: number;
  };
  showWeeklyXP?: boolean;
}

function LeaderboardRow({ rank, user, showWeeklyXP }: LeaderboardRowProps) {
  const getRankDisplay = () => {
    if (rank === 1) {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold shadow-lg">
          <Trophy className="h-5 w-5" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold shadow-lg">
          <Trophy className="h-5 w-5" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
          <Trophy className="h-5 w-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center font-semibold text-gray-700 dark:text-gray-300">
        {rank}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.02 }}
      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
        rank <= 3 
          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-2 border-yellow-200 dark:border-yellow-800' 
          : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <div className="flex-shrink-0">
        {getRankDisplay()}
      </div>
      
      <Avatar className="h-12 w-12">
        <img
          src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userId}`}
          alt={user.userName}
        />
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold truncate">{user.userName}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Level {user.level}
        </p>
      </div>
      
      <div className="text-right">
        <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
          {showWeeklyXP ? user.weeklyXP : user.totalXP} XP
        </p>
        <p className="text-xs text-gray-500">
          {showWeeklyXP ? 'This week' : 'Total'}
        </p>
      </div>
    </motion.div>
  );
}
