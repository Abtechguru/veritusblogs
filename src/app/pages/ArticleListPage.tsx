import { Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Clock, Eye, Search, TrendingUp, Calendar } from 'lucide-react';
import { mockArticles, categories } from '../data/mockData';
import { useState } from 'react';
import { motion } from 'motion/react';

export const ArticleListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#F15A24] to-[#C2410C] bg-clip-text text-transparent drop-shadow-md">
            All Articles
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Explore our collection of {mockArticles.length} insightful articles across various topics
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 sm:mb-12"
        >
          <Card className="glass-card shadow-lg border-none bg-white/50 dark:bg-black/30 backdrop-blur-md">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search articles by title or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base bg-white/80 dark:bg-black/40 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-[#F15A24]/50 rounded-xl"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[220px] h-12 text-base bg-white/80 dark:bg-black/40 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-base">
                      All Categories
                    </SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.slug} value={cat.slug} className="capitalize text-base">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-semibold bg-white/60 dark:bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            Showing <span className="text-[#F15A24] font-bold">{filteredArticles.length}</span> {filteredArticles.length === 1 ? 'article' : 'articles'}
          </p>
          {featuredArticles.length > 0 && (
            <Badge className="bg-[#F15A24] text-white border-none shadow-md">
              <TrendingUp className="h-4 w-4 mr-1" />
              {featuredArticles.length} Featured
            </Badge>
          )}
        </motion.div>

        {/* Featured Articles Section */}
        {featuredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center text-gray-800 dark:text-gray-100">
              <TrendingUp className="h-7 w-7 mr-3 text-[#F15A24]" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Link to={`/articles/${article.id}`}>
                    <Card className="glass-card overflow-hidden h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden group">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                          <p className="text-white text-sm line-clamp-2 font-medium drop-shadow-md">
                            {article.excerpt}
                          </p>
                        </div>

                        <Badge className="absolute top-4 left-4 bg-[#F15A24]/90 hover:bg-[#F15A24] text-white border-none capitalize shadow-sm backdrop-blur-sm">
                          {article.category.replace('-', ' ')}
                        </Badge>
                        <Badge className="absolute top-4 right-4 bg-yellow-500/90 hover:bg-yellow-500 text-black font-bold border-none shadow-sm backdrop-blur-sm">
                          ⭐ Featured
                        </Badge>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 relative z-10">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight line-clamp-2 text-gray-900 dark:text-white group-hover:text-[#F15A24] transition-colors">
                          {article.title}
                        </h3>

                        {/* Author & Date */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700/50">
                          <img
                            src={article.authorAvatar}
                            alt={article.authorName}
                            className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-700 shadow-sm"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{article.authorName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 font-medium">
                          <span className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                            <Clock className="h-4 w-4 mr-1.5 text-[#F15A24]" />
                            {article.readTime} min read
                          </span>
                          <span className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                            <Eye className="h-4 w-4 mr-1.5 text-blue-500" />
                            {article.views.toLocaleString()} views
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Articles Section */}
        {regularArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {featuredArticles.length > 0 && (
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                More Articles
              </h2>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regularArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Link to={`/articles/${article.id}`}>
                    <Card className="glass-card overflow-hidden h-full border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden group">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <Badge className="absolute top-3 left-3 capitalize bg-black/60 text-white border-none backdrop-blur-sm shadow-sm hover:bg-black/80 transition-colors">
                          {article.category.replace('-', ' ')}
                        </Badge>
                      </div>

                      {/* Content */}
                      <CardContent className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white group-hover:text-[#F15A24] transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed flex-1">
                          {article.excerpt}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 mb-4 mt-auto">
                          <img
                            src={article.authorAvatar}
                            alt={article.authorName}
                            className="w-8 h-8 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate text-gray-800 dark:text-gray-200">{article.authorName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {article.readTime} min
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            {article.views.toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 sm:py-24"
          >
            <div className="max-w-md mx-auto bg-white/50 dark:bg-black/40 p-8 rounded-2xl backdrop-blur-sm shadow-lg">
              <Search className="h-20 w-20 mx-auto mb-6 text-gray-300 dark:text-gray-600" />
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-[#F15A24] hover:text-[#C2410C] font-semibold text-lg transition-colors"
                aria-label="Clear all filters"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

