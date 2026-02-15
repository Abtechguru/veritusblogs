import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowRight, TrendingUp, Clock, Eye, Heart, MessageCircle, Megaphone } from 'lucide-react';
import { mockArticles, categories, getFeaturedArticles } from '../data/mockData';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import { campaignService } from '../services/campaignService';

export const HomePage = () => {
  const featuredArticles = getFeaturedArticles();
  const latestArticles = mockArticles.slice(0, 6);
  const [totalDonations, setTotalDonations] = useState(0);

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  useEffect(() => {
    campaignService.getTotalDonations().then(setTotalDonations);
  }, []);

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
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

      {/* Campaign Ads Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-blue-50/50 dark:from-orange-900/10 dark:to-blue-900/10 -z-10" />
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#F15A24]/10 text-[#F15A24] px-4 py-1.5 rounded-full mb-4 font-semibold text-sm">
              <Megaphone className="h-4 w-4" />
              <span>Election 2027</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
              Meet Our Candidates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Current total contributions: <span className="text-[#F15A24] font-black">${totalDonations.toLocaleString()}</span>
            </p>
          </motion.div>

          {/* Campaign Billboard Slider */}
          <div className="relative group billboard-mask max-w-7xl mx-auto overflow-hidden" ref={emblaRef}>
            {/* Scroll Container */}
            <div className="flex">
              {/* David Ombugadu Billboard */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-[0_0_100%] min-w-0 px-4 md:px-24"
              >
                <Link to="/campaign/david-ombugadu-2027">
                  <Card className="relative h-[450px] md:h-[500px] border-none overflow-hidden rounded-[2rem] shadow-2xl group/billboard hover:scale-[1.01] transition-all duration-700 bg-white dark:bg-gray-900">
                    <div className="absolute inset-0">
                      <img
                        src="/david portrat.jpg"
                        alt="David Ombugadu"
                        className="w-full h-full object-cover object-top group-hover/billboard:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-900/40 to-transparent"></div>
                    </div>

                    <CardContent className="relative h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl text-white">
                      <Badge className="w-fit mb-6 bg-green-500/20 backdrop-blur-md text-green-300 border-none px-4 py-1.5 font-black uppercase tracking-widest text-xs">
                        Sponsored Campaign
                      </Badge>
                      <h3 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                        David <span className="text-green-400">Ombugadu</span>
                      </h3>
                      <p className="text-xl text-gray-200 mb-8 leading-relaxed line-clamp-3">
                        "Unlocking Nasarawa's potential through innovation and selfless leadership. Building a future where every voice matters."
                      </p>
                      <div className="flex flex-wrap gap-3 mb-10">
                        {['Health Revolution', 'Tech Nasarawa', 'Agro-Economy'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button className="w-fit bg-green-600 hover:bg-green-700 text-white px-10 h-14 rounded-2xl font-black uppercase tracking-[3px] text-xs shadow-xl shadow-green-600/30">
                        Join the Movement <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>

              {/* Ambode Billboard */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-[0_0_100%] min-w-0 px-4 md:px-24"
              >
                <Link to="/campaign/ambode-2027">
                  <Card className="relative h-[450px] md:h-[500px] border-none overflow-hidden rounded-[2rem] shadow-2xl group/billboard hover:scale-[1.01] transition-all duration-700 bg-white dark:bg-gray-900">
                    <div className="absolute inset-0">
                      <img
                        src="https://placehold.co/1200x600/2563EB/FFFFFF/png?text=Akinwunmi+Ambode"
                        alt="Ambode"
                        className="w-full h-full object-cover group-hover/billboard:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent"></div>
                    </div>

                    <CardContent className="relative h-full flex flex-col justify-center p-8 md:p-16 max-w-2xl text-white">
                      <Badge className="w-fit mb-6 bg-blue-500/20 backdrop-blur-md text-blue-300 border-none px-4 py-1.5 font-black uppercase tracking-widest text-xs">
                        Sponsored Campaign
                      </Badge>
                      <h3 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                        Akinwunmi <span className="text-blue-400">Ambode</span>
                      </h3>
                      <p className="text-xl text-gray-200 mb-8 leading-relaxed line-clamp-3">
                        "A legacy of progress, a future of excellence. Together, let's redefine the standard of governance in 2027."
                      </p>
                      <div className="flex flex-wrap gap-3 mb-10">
                        {['Urban Reform', 'Economic Growth', 'Unified Vision'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button className="w-fit bg-blue-600 hover:bg-blue-700 text-white px-10 h-14 rounded-2xl font-black uppercase tracking-[3px] text-xs shadow-xl shadow-blue-600/30">
                        Support the Vision <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>

            {/* Scroll Indicator Hint */}
            <div className="flex justify-center gap-2 mt-8 pb-12">
              <div className="h-1.5 w-12 bg-[#F15A24] rounded-full" />
              <div className="h-1.5 w-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div className="h-1.5 w-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-gray-900 dark:text-white drop-shadow-sm">Featured Stories</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
              Top picks from our editorial team
            </p>
          </div>
          <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-[#F15A24] drop-shadow-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Link to={`/articles/${article.id}`}>
                <Card className="glass-card overflow-hidden h-full border-none shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 left-4 capitalize bg-[#F15A24] text-white border-none shadow-md">
                      {article.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1 bg-white/70 dark:bg-black/50 backdrop-blur-lg">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#F15A24] transition-colors leading-tight text-gray-900 dark:text-white">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-auto border-t border-gray-200 dark:border-gray-700/50 pt-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1.5 text-[#F15A24]" />
                          {article.readTime} min
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1.5 text-blue-500" />
                          {article.views.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1.5 text-red-500" />
                          {article.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1.5 text-[#F15A24]" />
                          {article.commentsCount}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-20 relative">
        <div className="absolute inset-0 bg-white/30 dark:bg-black/20 backdrop-blur-md -z-10" />
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-white drop-shadow-sm">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group"
              >
                <Card className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-full border-none bg-white/50 dark:bg-black/40 hover:bg-white/80 dark:hover:bg-black/60 group-hover:-translate-y-2">
                  <CardContent className="p-6 text-center touch-target flex flex-col items-center justify-center h-full">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#F15A24] to-[#C2410C] flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform">
                      {/* Placeholder icons based on slug, generic star for now */}
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#F15A24] transition-colors text-gray-900 dark:text-gray-100">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 text-gray-900 dark:text-white">Latest Articles</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Stay updated with our newest content
            </p>
          </div>
          <Button variant="outline" asChild className="hover:border-[#F15A24] hover:text-[#F15A24] hover:bg-white/10 backdrop-blur-sm border-gray-400 dark:border-gray-600">
            <Link to="/articles">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestArticles.map((article, index) => (
            <Link key={article.id} to={`/articles/${article.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer h-full group border-none bg-white/40 dark:bg-black/30 overflow-hidden flex flex-col">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <Badge variant="secondary" className="mb-3 capitalize text-xs w-fit shadow-sm">
                      {article.category.replace('-', ' ')}
                    </Badge>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#F15A24] transition-colors text-gray-900 dark:text-white leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto border-t border-gray-200 dark:border-gray-700/50 pt-3">
                      <span className="truncate mr-2 font-medium">{article.authorName}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {article.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {article.commentsCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F15A24] via-[#C2410C] to-[#000000] opacity-90 z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white drop-shadow-lg">
              Join Our Growing Community
            </h2>
            <p className="text-xl sm:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed px-4 font-medium drop-shadow-md">
              Get exclusive access to premium content, engage with our community, and never miss an important story.
            </p>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-[#F15A24] hover:bg-gray-100 font-bold shadow-2xl hover:shadow-white/50 transition-all hover:-translate-y-1 text-lg py-6 px-10 rounded-full"
              asChild
            >
              <Link to="/register">
                Create Your Free Account
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};