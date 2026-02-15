import { useParams, Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Clock, Eye, ArrowLeft, Tag } from 'lucide-react';
import { getArticlesByTag } from '../data/mockData';
import { motion } from 'motion/react';

export const TagPage = () => {
    const { tag } = useParams<{ tag: string }>();
    // Decode tag since it might be URL encoded
    const decodedTag = tag ? decodeURIComponent(tag) : '';
    const articles = decodedTag ? getArticlesByTag(decodedTag) : [];

    if (!decodedTag) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white">
                <div className="text-center glass-card p-12 rounded-2xl">
                    <h2 className="text-3xl font-bold mb-4">Tag not found</h2>
                    <Button asChild className="bg-[#F15A24] hover:bg-[#C2410C] text-white">
                        <Link to="/">Go Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-gray-900 dark:text-gray-100 pb-16">
            {/* Header */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-600/20 backdrop-blur-3xl" />
                <div className="container mx-auto px-4 relative z-10">
                    <Button variant="ghost" className="text-white hover:bg-white/20 mb-8" asChild>
                        <Link to="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-3 mb-4 text-[#F15A24]">
                            <Tag className="h-8 w-8" />
                            <span className="text-xl font-bold uppercase tracking-wider">Tag</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white text-shadow-strong capitalize">{decodedTag}</h1>
                        <p className="mt-4 text-white/80 font-medium">{articles.length} articles found</p>
                    </motion.div>
                </div>
            </div>

            {/* Articles */}
            <div className="container mx-auto px-4 py-12">
                {articles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link to={`/articles/${article.id}`}>
                                    <Card className="glass-card hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-none overflow-hidden bg-white/50 dark:bg-black/40 group">
                                        <div className="aspect-video relative overflow-hidden">
                                            <img
                                                src={article.coverImage}
                                                alt={article.title}
                                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                                            {article.featured && (
                                                <Badge className="absolute top-4 left-4 bg-[#F15A24] text-white border-none shadow-lg">Featured</Badge>
                                            )}
                                        </div>
                                        <CardContent className="p-6">
                                            <div className="flex items-center space-x-2 mb-4">
                                                <img
                                                    src={article.authorAvatar}
                                                    alt={article.authorName}
                                                    className="w-8 h-8 rounded-full border border-white/20"
                                                />
                                                <div>
                                                    <p className="text-xs font-bold text-gray-900 dark:text-white">{article.authorName}</p>
                                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                                        {new Date(article.publishedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white group-hover:text-[#F15A24] transition-colors leading-tight">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                                                {article.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700/50 pt-4">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {article.readTime} min read
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Eye className="h-3.5 w-3.5" />
                                                    {article.views.toLocaleString()}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="glass-card max-w-md mx-auto p-12 rounded-2xl bg-white/30 dark:bg-black/30">
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                                No articles found with this tag.
                            </p>
                            <Button asChild size="lg" className="bg-[#F15A24] hover:bg-[#C2410C] text-white">
                                <Link to="/articles">Browse All Articles</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
