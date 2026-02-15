import { useParams, Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { mockArticles } from '../data/mockData';
import { Mail, Calendar, Eye, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const AuthorPage = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const authorArticles = mockArticles.filter(article => article.authorId === authorId);
  const author = authorArticles[0];

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white">
        <div className="text-center glass-card p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Author not found</h2>
          <Button asChild className="bg-[#F15A24] hover:bg-[#C2410C] text-white">
            <Link to="/articles">Browse Articles</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 pb-16">
      {/* Author Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-blue-600/20 backdrop-blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F15A24] to-blue-600 rounded-full blur opacity-75 animate-pulse"></div>
              <img
                src={author.authorAvatar}
                alt={author.authorName}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white text-shadow-strong">{author.authorName}</h1>
              <p className="text-xl text-white/90 mb-6 font-medium text-shadow">Contributing Author at VERITUS INTERNATIONAL</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Badge variant="secondary" className="px-4 py-1.5 text-sm bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md">
                  {authorArticles.length} Articles
                </Badge>
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Author
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Articles */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold mb-8 flex items-center gap-2"
          >
            <span className="w-1.5 h-8 bg-[#F15A24] rounded-full mr-2"></span>
            Articles by {author.authorName}
          </motion.h2>

          <div className="space-y-6">
            {authorArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/articles/${article.id}`}>
                  <Card className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-none bg-white/50 dark:bg-black/40 group">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-64 lg:w-80 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-[#F15A24] text-white border-none shadow-md capitalize">
                              {article.category.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col justify-center flex-1 min-w-0">
                          <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white group-hover:text-[#F15A24] transition-colors leading-tight">
                            {article.title}
                          </h3>
                          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {article.readTime} min read
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Eye className="h-3.5 w-3.5" />
                              {article.views.toLocaleString()} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
