import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Bookmark, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Clock,
  Sparkles,
  User,
  Mail
} from 'lucide-react';
import { motion } from 'motion/react';
import { articleAPI } from '../../../lib/api';
import { toast } from 'sonner';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author_id: string;
  cover_image: string | null;
  published_at: string;
  views: number;
  read_time: number;
}

export const ReaderDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const allArticles = await articleAPI.getAll({ status: 'published' });
      
      // Get recent articles (latest 5)
      const recent = [...allArticles]
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
        .slice(0, 5);
      
      // Get popular articles (top 5 by views)
      const popular = [...allArticles]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);
      
      setRecentArticles(recent);
      setPopularArticles(popular);
    } catch (error: any) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Sports', slug: 'sports', color: 'bg-blue-500', icon: '⚽' },
    { name: 'Cultures', slug: 'cultures', color: 'bg-purple-500', icon: '🎨' },
    { name: 'Politics', slug: 'politics', color: 'bg-red-500', icon: '🏛️' },
    { name: 'Weather', slug: 'weather', color: 'bg-green-500', icon: '🌤️' },
    { name: 'Celebrity Gist', slug: 'celebrity-gist', color: 'bg-pink-500', icon: '⭐' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover the latest news and stories
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Reading Streak
                </CardTitle>
                <Sparkles className="w-5 h-5 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">7 Days</div>
              <p className="text-sm text-gray-500 mt-1">Keep it up!</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Articles Read
                </CardTitle>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">42</div>
              <p className="text-sm text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Saved Articles
                </CardTitle>
                <Bookmark className="w-5 h-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">15</div>
              <p className="text-sm text-gray-500 mt-1">In your library</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Categories */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Browse by Category</CardTitle>
          <CardDescription>Explore content that interests you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/category/${category.slug}`}>
                  <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-3`}>
                        {category.icon}
                      </div>
                      <h3 className="font-semibold">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Articles */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Latest Articles</CardTitle>
                <CardDescription>Fresh content just for you</CardDescription>
              </div>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/articles/${article.id}`}>
                      <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        {article.cover_image && (
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold line-clamp-2 mb-1">{article.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <Badge variant="secondary" className="capitalize">
                              {article.category}
                            </Badge>
                            <span>{article.read_time} min read</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/articles">View All Articles</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Popular Articles */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Trending Now</CardTitle>
                <CardDescription>Most popular articles</CardDescription>
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/articles/${article.id}`}>
                      <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                        <div className="text-2xl font-bold text-gray-300 dark:text-gray-700 w-8 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold line-clamp-2 mb-1">{article.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <Badge variant="secondary" className="capitalize">
                              {article.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {article.views || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/articles">Explore More</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/profile')}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">My Profile</CardTitle>
                <CardDescription>Update your information</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Bookmark className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Saved Articles</CardTitle>
                <CardDescription>Your reading list</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">My Comments</CardTitle>
                <CardDescription>See your discussions</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
