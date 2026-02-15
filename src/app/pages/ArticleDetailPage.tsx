import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router';
import { Calendar, Clock, ChevronLeft, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { getArticleById } from '../data/mockData';
import { formatDate } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  TableOfContents,
  ReadingProgress,
  ArticleDetailHeader
} from '../components/article/ArticleComponents';
import { motion, useScroll, useSpring } from 'motion/react';
import { useGamificationStore } from '../store/gamificationStore';
import { useEffect, useState } from 'react';
import { Trophy, Zap, Share2, Bookmark, CheckCircle2 } from 'lucide-react';

export const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = id ? getArticleById(id) : undefined;
  const { awardXP, updateAchievement } = useGamificationStore();
  const [hasAwardedXP, setHasAwardedXP] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const checkScroll = () => {
      if (scrollYProgress.get() > 0.9 && !hasAwardedXP && article) {
        awardXP(10, 'Article Read');
        updateAchievement('first-read', 1);
        setHasAwardedXP(true);
      }
    };

    return scrollYProgress.onChange(checkScroll);
  }, [scrollYProgress, hasAwardedXP, article, awardXP, updateAchievement]);

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
    <div className="min-h-screen animated-bg reading-container selection:bg-primary-500/30">
      {/* 📖 Reading Progress Bar - Premium Indigo */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-400 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-all mb-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-primary-100/20 shadow-premium-sm"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">Return to Feed</span>
        </button>

        <article className="relative">
          {/* 🎭 Cinematic Hero Section */}
          <div className="relative h-[60vh] sm:h-[70vh] rounded-[40px] overflow-hidden shadow-premium-xl mb-12 group">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center gap-4 mb-8"
                >
                  <Badge className="bg-amber-500 text-white border-none px-6 py-2 rounded-xl font-bold shadow-premium-md uppercase tracking-widest text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-4 text-white/80 text-sm font-bold">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {formatDate(article.publishedAt)}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {article.readTime} Min Read</span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter font-heading"
                >
                  {article.title}
                </motion.h1>

                {/* Author Mini Bio in Hero */}
                <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarImage src={article.authorAvatar} alt={article.authorName} />
                    <AvatarFallback>{article.authorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-white">
                    <div className="text-sm font-black uppercase tracking-widest">{article.authorName}</div>
                    <div className="text-xs text-white/60 font-bold">Respected Journalist & Storyteller</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              {/* Table of Contents - Sticky Left */}
              <aside className="hidden lg:block lg:w-72 flex-shrink-0">
                <div className="sticky top-40 bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-primary-100/10 shadow-premium-sm">
                  <TableOfContents content={article.content} />
                </div>
              </aside>

              {/* Main Reading Area */}
              <main className="flex-1 min-w-0">
                <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-md p-8 sm:p-12 lg:p-16 rounded-[40px] border border-primary-100/10 shadow-premium-lg">
                  <ArticleContent content={article.content} />
                </div>

                {/* Engagement & Gamification Zone */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-20 p-12 rounded-[40px] bg-gradient-to-br from-primary-900 to-indigo-950 text-white shadow-premium-xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Trophy className="h-64 w-64" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-amber-500 p-3 rounded-2xl shadow-premium-md">
                        <Zap className="h-8 w-8 text-white fill-current" />
                      </div>
                      <h2 className="text-3xl font-black uppercase tracking-tighter font-heading text-white">Engagement Rewards</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className={`p-8 rounded-3xl border ${hasAwardedXP ? 'bg-primary-500/10 border-primary-400' : 'bg-white/5 border-white/10'} backdrop-blur-lg`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-black uppercase tracking-widest text-primary-200">Finish Read</span>
                          {hasAwardedXP ? <CheckCircle2 className="h-6 w-6 text-primary-400" /> : <Badge className="bg-primary-500 text-white border-none font-black text-xs px-4">+10 XP</Badge>}
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed font-bold">Automatically awarded once you complete this premium story.</p>
                      </div>

                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg opacity-40">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-black uppercase tracking-widest text-primary-200">Comprehension Quiz</span>
                          <Badge className="bg-primary-500/20 text-primary-300 border-none font-black text-xs px-4">+20 XP</Badge>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed font-bold">Unlocked for established "Category Masters". Reach level 5 to participate.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Comments & Discussion */}
                <div className="mt-24 pt-24 border-t border-primary-100/10">
                  <CommentSection articleId={article.id} />
                </div>
              </main>
            </div>
          </div>
        </article>

        {/* 🚀 Floating Smart Action Bar */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl p-4 rounded-[32px] shadow-premium-xl border border-primary-100/20 flex items-center justify-between px-10"
          >
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2.5 hover:text-red-500 transition-all font-black text-text-primary group">
                <Heart className="h-6 w-6 group-hover:scale-125 transition-transform" />
                <span className="text-sm">{article.likes.toLocaleString()}</span>
              </button>
              <button className="flex items-center gap-2.5 hover:text-primary-600 transition-all font-black text-text-primary group">
                <MessageCircle className="h-6 w-6 group-hover:scale-125 transition-transform" />
                <span className="text-sm">{article.commentsCount}</span>
              </button>
            </div>
            <div className="h-8 w-px bg-primary-100/30" />
            <div className="flex items-center gap-8">
              <button className="hover:text-amber-500 transition-all text-text-primary group"><Bookmark className="h-6 w-6 group-hover:scale-110" /></button>
              <button className="hover:text-primary-600 transition-all text-text-primary group"><Share2 className="h-6 w-6 group-hover:scale-110" /></button>
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black text-xs tracking-widest px-8 shadow-premium-md">
                SUPPORT REPORTER
              </Button>
            </div>
          </motion.div>
        </div>

        {/* 📚 Related Content */}
        <section className="bg-primary-50/30 dark:bg-primary-950/20 border-t border-primary-100/10 py-24 mt-20 rounded-[80px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-text-primary tracking-tighter font-heading">You Might Also Like</h2>
              <Link to="/articles" className="text-primary-600 hover:text-primary-700 font-bold flex items-center gap-2 group">
                Explore Newsroom <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <RelatedArticles currentArticleId={article.id} category={article.category} tags={article.tags} />
          </div>
        </section>
      </div>
    </div>
  );
};
