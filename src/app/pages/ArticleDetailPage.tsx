import { useParams } from 'react-router';
import { Link } from 'react-router';
import { Calendar, Clock, Eye, ChevronLeft } from 'lucide-react';
import { getArticleById } from '../data/mockData';
import { formatDate } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  ArticleContent,
  ShareBar,
  AuthorBio,
  CommentSection,
  RelatedArticles,
  TableOfContents,
  ReadingProgress
} from '../components/article/ArticleComponents';
import { motion } from 'motion/react';

export const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? getArticleById(id) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 glass-card rounded-2xl max-w-md mx-4"
        >
          <h2 className="text-3xl font-bold mb-4">Article not found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/articles">
            <Button size="lg" className="bg-[#F15A24] hover:bg-[#C2410C] text-white">
              Browse Articles
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Get category color based on article category
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      politics: 'bg-orange-600 text-white',
      sports: 'bg-blue-600 text-white',
      cultures: 'bg-purple-600 text-white',
      weather: 'bg-cyan-600 text-white',
      'celebrity-gist': 'bg-pink-600 text-white',
    };
    return colors[category] || 'bg-gray-600 text-white';
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 selection:bg-orange-500/30">
      <ReadingProgress />

      {/* Back to Home Button */}
      <div className="fixed top-24 left-4 z-40 hidden xl:block">
        <Link to="/">
          <Button variant="outline" size="sm" className="gap-2 bg-white/50 dark:bg-black/50 backdrop-blur-md border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-black text-gray-800 dark:text-gray-200">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* Title & Meta Card - Overlapping the Hero */}
      <div className="relative z-20 -mt-24 md:-mt-32 px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card p-6 md:p-10 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-xl shadow-2xl border-t border-white/20 dark:border-gray-700/50">
            {/* Category Badge */}
            <div className="flex justify-center md:justify-start mb-6">
              <Badge className={`${getCategoryColor(article.category)} text-sm px-4 py-1.5 border-none uppercase tracking-wide font-bold shadow-lg`}>
                {article.category.replace('-', ' ')}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900 dark:text-white mb-6 text-center md:text-left">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm md:text-base text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700/50 pt-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-white dark:border-gray-800 shadow-sm">
                  <AvatarImage src={article.authorAvatar} alt={article.authorName} />
                  <AvatarFallback>{article.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 dark:text-white">{article.authorName}</span>
                  <span className="text-xs">Author</span>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#F15A24]" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#F15A24]" />
                <span>{article.readTime} min read</span>
              </div>

              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#F15A24]" />
                <span>{article.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Table of Contents - Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-32 glass-card rounded-xl p-6 border-none shadow-lg bg-white/40 dark:bg-black/40">
              <TableOfContents content={article.content} />
            </div>
          </aside>

          {/* Article Content Column */}
          <main className="flex-1 min-w-0">
            {/* Mobile Table of Contents */}
            <div className="lg:hidden mb-8">
              <TableOfContents content={article.content} mobile />
            </div>

            {/* Article Body - Container with Glass Effect for readability */}
            <div className="glass-card p-6 md:p-10 rounded-2xl bg-white/80 dark:bg-black/60 shadow-xl border-none backdrop-blur-xl">
              <ArticleContent content={article.content} />
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/50">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tag/${tag.toLowerCase()}`}
                      className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:border-[#F15A24] hover:text-[#F15A24] transition-colors duration-300 shadow-sm"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Bar - Mobile */}
            <div className="lg:hidden mt-8 pt-8 border-t border-gray-200 dark:border-gray-700/50">
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Share this article</h3>
              <ShareBar article={article} />
            </div>

            {/* Author Bio */}
            <div className="mt-16">
              <AuthorBio authorName={article.authorName} authorAvatar={article.authorAvatar} />
            </div>

            {/* Comments Section */}
            <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700/50">
              <CommentSection articleId={article.id} />
            </div>
          </main>
        </div>
      </div>

      {/* Share Bar - Desktop (Sticky Fixed Left) */}
      <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="glass-card p-4 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-lg border-none">
          <ShareBar article={article} vertical />
        </div>
      </div>

      {/* Related Articles */}
      <section className="bg-white/30 dark:bg-black/30 border-t border-gray-200 dark:border-gray-800 py-16 md:py-24 mt-0 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">You might also like</h2>
            <Link to="/articles" className="text-[#F15A24] hover:text-[#C2410C] text-sm font-semibold transition-colors">
              View all articles
            </Link>
          </div>
          <RelatedArticles currentArticleId={article.id} category={article.category} tags={article.tags} />
        </div>
      </section>
    </div>
  );
};
