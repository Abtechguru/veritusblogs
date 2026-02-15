import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Heart, MessageCircle, Flame, Search as SearchIcon, Clock } from 'lucide-react';
import { mockArticles } from '../data/mockData';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { campaignService } from '../services/campaignService';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useGamificationStore } from '../store/gamificationStore';
import { Trophy, Star, Zap } from 'lucide-react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import AmbientBackground from '../components/AmbientBackground';

export const HomePage = () => {
  const { xp } = useGamificationStore();
  const [totalDonations, setTotalDonations] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  useEffect(() => {
    // Fetch real donation data for David Ombugadu campaign
    campaignService.getTotalDonations('david-ombugadu-2027').then(setTotalDonations);

    // Refresh every 30 seconds to show live updates
    const interval = setInterval(() => {
      campaignService.getTotalDonations('david-ombugadu-2027').then(setTotalDonations);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const dailyGoal = 100;
  const dailyProgress = Math.min((xp % 1000) / 10, 100); // Mock daily progress based on level XP

  return (
    <>
      <AmbientBackground variant="default" />

      <div className="min-h-screen text-gray-900 dark:text-gray-100 relative z-10">
        {/* Hero Section - Keep the bold header but make it blend better or stand out */}
        <section className="relative overflow-hidden">
          {/* Background is handled by the global animated background, but we can add a subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 py-16 sm:py-20 md:py-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-5xl mx-auto text-center"
            >
              {/* Responsive Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight drop-shadow-lg">
                Welcome to{' '}
                <span className="block sm:inline bg-gradient-to-r from-[#F15A24] to-[#C2410C] bg-clip-text text-transparent">
                  VERITUS INTERNATIONAL
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-200/90 max-w-3xl mx-auto px-4 leading-relaxed font-medium drop-shadow-md">
                Your premier destination for quality journalism, cultural insights, and breaking news across Africa and beyond.
              </p>

              {/* Responsive Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 max-w-md sm:max-w-none mx-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#F15A24] hover:bg-[#C2410C] text-white font-bold shadow-lg hover:shadow-[#F15A24]/40 transition-all hover:-translate-y-1 text-lg py-6 px-8 rounded-full"
                  asChild
                >
                  <Link to="/articles">
                    Read Latest
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/40 text-white backdrop-blur-md shadow-lg transition-all hover:-translate-y-1 text-lg py-6 px-8 rounded-full"
                  asChild
                >
                  <Link to="/register">
                    Subscribe Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gamification Strip */}
        <section className="bg-white/40 dark:bg-black/40 backdrop-blur-xl border-y border-gray-200/50 dark:border-gray-800/50 sticky top-[72px] lg:top-[96px] z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Daily XP Goal</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 sm:w-48 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${dailyProgress}%` }}
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-400"
                      />
                    </div>
                    <span className="text-xs font-black text-teal-600 dark:text-teal-400">{Math.round(dailyProgress)}%</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 border-l border-gray-200 dark:border-gray-800 pl-6">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase leading-none">Global Rank</p>
                    <p className="text-sm font-black text-gray-900 dark:text-white">#1,254</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar-hide whitespace-nowrap">
                {[
                  { label: 'Reading Streak', icon: <Flame className="h-3 w-3" />, color: 'bg-amber-500' },
                  { label: 'Politics Master', icon: <Star className="h-3 w-3" />, color: 'bg-purple-500' },
                  { label: 'Mega Donor', icon: <Heart className="h-3 w-3" />, color: 'bg-red-500' },
                ].map((challenge) => (
                  <div key={challenge.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    <span className={`${challenge.color} text-white p-1 rounded-sm`}>{challenge.icon}</span>
                    {challenge.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Billboard */}
        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative group billboard-mask max-w-7xl mx-auto overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {/* David Ombugadu Billboard */}
                <div className="flex-[0_0_100%] min-w-0 px-2 md:px-8">
                  <Link to="/campaign/david-ombugadu-2027">
                    <Card className="relative h-[400px] md:h-[500px] border-none overflow-hidden rounded-[2.5rem] shadow-2xl group/billboard hover-scale bg-navy-900">
                      <div className="absolute inset-0">
                        <img
                          src="/david portrat.jpg"
                          alt="David Ombugadu"
                          className="w-full h-full object-cover object-top group-hover/billboard:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent"></div>
                      </div>
                      <CardContent className="relative h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl text-white">
                        <Badge className="w-fit mb-6 bg-amber-500 text-white border-none px-4 py-1.5 font-black uppercase tracking-widest text-xs">
                          LIVE CAMPAIGN
                        </Badge>
                        <h3 className="text-4xl md:text-6xl font-black mb-4 leading-tight font-heading">
                          David <span className="text-amber-500">Ombugadu</span>
                        </h3>
                        <p className="text-xl text-gray-200 mb-8 leading-relaxed line-clamp-2">
                          Transforming Nasarawa with innovation and leadership for a brighter 2027.
                        </p>
                        <div className="flex items-center gap-6">
                          <Button className="w-fit bg-amber-500 hover:bg-amber-600 border-none text-navy-900 px-10 h-14 rounded-2xl font-black uppercase tracking-[3px] text-xs shadow-xl shadow-amber-500/30 transition-all">
                            SUPPORT NOW <Zap className="ml-2 h-4 w-4 fill-current" />
                          </Button>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contributions</span>
                            <span className="text-2xl font-black text-white">${totalDonations.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>

                {/* Ambode Billboard */}
                <div className="flex-[0_0_100%] min-w-0 px-2 md:px-8">
                  <Link to="/campaign/ambode-2027">
                    <Card className="relative h-[400px] md:h-[500px] border-none overflow-hidden rounded-[2.5rem] shadow-2xl group/billboard hover-scale bg-navy-900">
                      <div className="absolute inset-0">
                        <img
                          src="https://placehold.co/1200x600/0B172A/FFFFFF/png?text=Akinwunmi+Ambode"
                          alt="Ambode"
                          className="w-full h-full object-cover group-hover/billboard:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent"></div>
                      </div>
                      <CardContent className="relative h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl text-white">
                        <Badge className="w-fit mb-6 bg-teal-500 text-white border-none px-4 py-1.5 font-black uppercase tracking-widest text-xs">
                          FEATURED CAUSE
                        </Badge>
                        <h3 className="text-4xl md:text-6xl font-black mb-4 leading-tight font-heading">
                          Akinwunmi <span className="text-teal-400">Ambode</span>
                        </h3>
                        <p className="text-xl text-gray-200 mb-8 leading-relaxed line-clamp-2">
                          Redefining urban excellence for a future of Lagos that works for all.
                        </p>
                        <Button className="w-fit bg-teal-500 hover:bg-teal-600 border-none text-white px-10 h-14 rounded-2xl font-black uppercase tracking-[3px] text-xs shadow-xl shadow-teal-500/30">
                          LEARN MORE <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📊 Gamification Strip - Premium Indigo */}
        <div className="sticky top-20 sm:top-24 lg:top-28 z-40 px-4 py-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto"
          >
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl px-6 py-4 rounded-3xl border border-primary-100/20 dark:border-primary-800/20 shadow-premium-lg flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Current XP</div>
                    <div className="text-lg font-black text-primary-600 leading-none">{xp.toLocaleString()}</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-primary-100 dark:bg-primary-800" />
                <div className="flex-1 min-w-[150px]">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Daily Progress</span>
                    <span className="text-xs font-bold text-primary-600">{dailyGoal} XP left</span>
                  </div>
                  <div className="h-2 bg-primary-50 dark:bg-primary-900/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${dailyProgress}%` }}
                      className="h-full bg-gradient-to-r from-primary-500 to-indigo-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 px-4 py-1.5 rounded-2xl font-bold flex gap-2">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  Reading Streak: 5 Days
                </Badge>
                <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold px-6 shadow-premium-md">
                  Claim Rewards
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <main className="container mx-auto px-4 py-12">
          {/* 🎫 Dynamic Tab Navigation */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div className="flex items-center gap-2 bg-primary-50/50 dark:bg-primary-900/20 p-2 rounded-3xl border border-primary-100/20">
              {['all', 'politics', 'sports', 'culture'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-500 capitalize ${activeTab === tab
                    ? 'bg-white dark:bg-primary-800 text-primary-600 shadow-premium-sm scale-105'
                    : 'text-text-secondary hover:text-primary-500'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative group w-full md:w-auto">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-300 group-hover:text-primary-500 transition-colors" />
              <input
                type="text"
                placeholder="Search premium stories..."
                className="w-full md:w-96 pl-14 pr-6 py-4 rounded-3xl bg-white/50 dark:bg-gray-900/50 border border-primary-100/20 focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 transition-all outline-none text-text-primary"
              />
            </div>
          </div>

          {/* 📰 Masonry Feed - Premium Cards */}
          <div className="relative">
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1100: 3 }}>
              <Masonry gutter="32px">
                {mockArticles
                  .filter(article => activeTab === 'all' || article.category === activeTab)
                  .map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link to={`/articles/${article.id}`} className="block group">
                        <div className="premium-card overflow-hidden h-full flex flex-col bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={article.coverImage}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-at-bottom from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-primary-600/90 text-white backdrop-blur-md border-none px-4 py-1.5 rounded-xl font-bold">
                                {article.category}
                              </Badge>
                            </div>
                            <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                              <div className="bg-white/90 dark:bg-black/90 p-2 rounded-xl shadow-premium-lg flex items-center gap-1.5 px-3">
                                <Zap className="h-4 w-4 text-amber-500" />
                                <span className="text-xs font-black text-amber-600">+10 XP</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-8 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-4">
                              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {article.readTime} min</span>
                              <span className="w-1 h-1 rounded-full bg-primary-200" />
                              <span>Premium Entry</span>
                            </div>

                            <h3 className="text-2xl font-black text-text-primary mb-3 leading-tight group-hover:text-primary-600 transition-colors">
                              {article.title}
                            </h3>

                            <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                              {article.excerpt}
                            </p>

                            <div className="mt-auto pt-6 border-t border-primary-100/10 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary-100" />
                                <span className="text-xs font-bold text-text-primary">Journalist Name</span>
                              </div>
                              <div className="flex items-center gap-3 text-text-tertiary">
                                <div className="flex items-center gap-1"><Heart className="h-4 w-4" /> <span className="text-[10px] font-bold">1.2k</span></div>
                                <div className="flex items-center gap-1"><MessageCircle className="h-4 w-4" /> <span className="text-[10px] font-bold">48</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </main>
      </div>

      {/* Theme Switcher - Floating Action Button */}
      <ThemeSwitcher />
    </>
  );
};