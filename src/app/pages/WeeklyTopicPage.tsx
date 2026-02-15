import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageSquare, TrendingUp, Award, Send, Heart, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Avatar } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { useGamification, XP_REWARDS } from '../contexts/GamificationContext';
import { toast } from 'sonner';
import { SERVER_URL } from '../lib/supabase';
import { publicAnonKey } from '/utils/supabase/info';

interface WeeklyTopic {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  isActive: boolean;
}

interface Contribution {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: number;
  views: number;
  createdAt: string;
  hasLiked?: boolean;
}

export function WeeklyTopicPage() {
  const { user, accessToken } = useAuth();
  const { addActivity, weeklyLeaderboard } = useGamification();
  const [currentTopic, setCurrentTopic] = useState<WeeklyTopic | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [newContribution, setNewContribution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCurrentTopic();
    fetchContributions();
  }, []);

  const fetchCurrentTopic = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/weekly-topic/current`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentTopic(data.topic);
      }
    } catch (error) {
      console.error('Error fetching topic:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContributions = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/weekly-topic/contributions`, {
        headers: {
          'Authorization': `Bearer ${accessToken || publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContributions(data.contributions || []);
      }
    } catch (error) {
      console.error('Error fetching contributions:', error);
    }
  };

  const handleSubmitContribution = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to contribute');
      return;
    }

    if (!newContribution.trim()) {
      toast.error('Please write something');
      return;
    }

    if (newContribution.length < 50) {
      toast.error('Contribution must be at least 50 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${SERVER_URL}/weekly-topic/contribute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          topicId: currentTopic?.id,
          content: newContribution,
        }),
      });

      if (response.ok) {
        toast.success(`Contribution submitted! +${XP_REWARDS.CONTRIBUTE_TOPIC} XP earned!`);
        setNewContribution('');
        await fetchContributions();
        await addActivity('contribute_topic', `Contributed to: ${currentTopic?.title}`, XP_REWARDS.CONTRIBUTE_TOPIC);
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to submit contribution');
      }
    } catch (error) {
      console.error('Error submitting contribution:', error);
      toast.error('Failed to submit contribution');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (contributionId: string) => {
    if (!user) {
      toast.error('Please login to like');
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/weekly-topic/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ contributionId }),
      });

      if (response.ok) {
        await fetchContributions();
        await addActivity('reaction', 'Liked a contribution', XP_REWARDS.REACTION);
      }
    } catch (error) {
      console.error('Error liking contribution:', error);
    }
  };

  const getTimeRemaining = () => {
    if (!currentTopic) return '';
    const end = new Date(currentTopic.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h remaining`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!currentTopic) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Active Topic</h2>
          <p className="text-gray-600 dark:text-gray-400">Check back soon for the next weekly topic!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="bg-white/20 text-white mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              {getTimeRemaining()}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {currentTopic.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6">
              {currentTopic.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>{contributions.length} Contributions</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>+{XP_REWARDS.CONTRIBUTE_TOPIC} XP per contribution</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contribution Form */}
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Share Your Thoughts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitContribution} className="space-y-4">
                    <Textarea
                      placeholder="Write your contribution (minimum 50 characters)..."
                      value={newContribution}
                      onChange={(e) => setNewContribution(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {newContribution.length}/50 minimum
                      </span>
                      <Button
                        type="submit"
                        disabled={isSubmitting || newContribution.length < 50}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {!user && (
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6 text-center">
                  <p className="mb-4">Login to share your thoughts and earn XP!</p>
                  <Button asChild>
                    <a href="/login">Login to Contribute</a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Contributions */}
            <Tabs defaultValue="popular" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
                <TabsTrigger value="recent">Most Recent</TabsTrigger>
              </TabsList>

              <TabsContent value="popular" className="space-y-4 mt-6">
                {contributions
                  .sort((a, b) => b.likes - a.likes)
                  .map((contribution, index) => (
                    <ContributionCard
                      key={contribution.id}
                      contribution={contribution}
                      rank={index + 1}
                      onLike={handleLike}
                    />
                  ))}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4 mt-6">
                {contributions
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((contribution, index) => (
                    <ContributionCard
                      key={contribution.id}
                      contribution={contribution}
                      rank={index + 1}
                      onLike={handleLike}
                    />
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Weekly Leaderboard */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-yellow-600" />
                  Top Readers This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyLeaderboard.slice(0, 10).map((leader, index) => (
                  <div key={leader.userId} className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {index < 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-400 text-yellow-900' :
                          index === 1 ? 'bg-gray-400 text-gray-900' :
                          'bg-orange-400 text-orange-900'
                        }`}>
                          {index + 1}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <Avatar className="h-10 w-10">
                      <img
                        src={leader.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.userId}`}
                        alt={leader.userName}
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{leader.userName}</p>
                      <p className="text-xs text-gray-500">Level {leader.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        {leader.weeklyXP} XP
                      </p>
                    </div>
                  </div>
                ))}

                {weeklyLeaderboard.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No activity yet this week
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContributionCard({ 
  contribution, 
  rank, 
  onLike 
}: { 
  contribution: Contribution; 
  rank: number; 
  onLike: (id: string) => void;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {rank <= 3 && (
              <Badge className={`${
                rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                rank === 2 ? 'bg-gray-400 text-gray-900' :
                'bg-orange-400 text-orange-900'
              }`}>
                #{rank}
              </Badge>
            )}
          </div>
          <Avatar className="h-12 w-12">
            <img
              src={contribution.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contribution.userId}`}
              alt={contribution.userName}
            />
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{contribution.userName}</h4>
              <span className="text-xs text-gray-500">
                {new Date(contribution.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
              {contribution.content}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <button
                onClick={() => onLike(contribution.id)}
                className={`flex items-center gap-1 hover:text-red-600 transition-colors ${
                  contribution.hasLiked ? 'text-red-600' : ''
                }`}
              >
                <Heart className={`h-4 w-4 ${contribution.hasLiked ? 'fill-current' : ''}`} />
                <span>{contribution.likes}</span>
              </button>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{contribution.views}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
