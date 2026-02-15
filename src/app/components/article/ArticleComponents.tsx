import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Twitter, Facebook, Linkedin, Link2, Check, Heart, Bookmark, Reply, MoreHorizontal, Clock, Eye, List, ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Article, Comment, mockArticles, getCommentsByArticleId } from '../../data/mockData';
import { formatDate, formatDistanceToNow } from '../../lib/utils';
import { Card, CardContent } from '../ui/card';

// --- ReadingProgress ---
export function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-indigo-400 origin-left z-[60]"
                style={{ scaleX }}
            />
            <motion.div
                className="fixed bottom-6 right-6 premium-card px-6 py-3 text-xs z-40 hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <div className="flex items-center gap-4">
                    <span className="font-black text-primary-600 uppercase tracking-widest">Progress</span>
                    <div className="w-24 h-1.5 bg-primary-50 dark:bg-primary-900/40 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary-500"
                            style={{ scaleX: scrollYProgress, originX: 0 }}
                        />
                    </div>
                </div>
            </motion.div>
        </>
    );
}

// --- TableOfContents ---
interface Heading {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents({ content, mobile = false }: { content: string; mobile?: boolean }) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const headingElements = doc.querySelectorAll('h2, h3');

        const extractedHeadings: Heading[] = Array.from(headingElements).map((el, index) => ({
            id: `heading-${index}`,
            text: el.textContent || '',
            level: el.tagName === 'H2' ? 2 : 3,
        }));

        setHeadings(extractedHeadings);
    }, [content]);

    useEffect(() => {
        if (!mobile) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                { rootMargin: '0% 0% -80% 0%' }
            );

            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) observer.observe(element);
            });

            return () => observer.disconnect();
        }
    }, [headings, mobile]);

    if (headings.length === 0) return null;

    if (mobile) {
        return (
            <div className="border border-primary-100/10 dark:border-primary-800/10 rounded-2xl overflow-hidden bg-white/50 dark:bg-black/40 backdrop-blur-xl">
                <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between p-6 h-auto hover:bg-primary-50 dark:hover:bg-primary-900/30"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="flex items-center gap-2 font-black text-text-primary uppercase tracking-widest text-xs">
                        <List className="h-4 w-4 text-primary-500" />
                        Table of Contents
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </Button>

                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="border-t border-primary-100/10 dark:border-primary-800/10"
                    >
                        <nav className="p-6">
                            <ul className="space-y-4">
                                {headings.map((heading) => (
                                    <li key={heading.id} style={{ marginLeft: heading.level === 3 ? '1rem' : 0 }}>
                                        <a
                                            href={`#${heading.id}`}
                                            className="text-sm font-bold text-text-secondary hover:text-primary-600 transition-colors block py-1"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {heading.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </div>
        );
    }

    return (
        <nav className="border-l border-primary-100 dark:border-primary-800/50 pl-6">
            <h4 className="text-[10px] font-black text-text-tertiary mb-6 uppercase tracking-[0.2em]">
                On this page
            </h4>
            <ul className="space-y-4">
                {headings.map((heading) => (
                    <motion.li
                        key={heading.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginLeft: heading.level === 3 ? '1rem' : 0 }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`text-sm transition-all duration-300 block py-1
                ${activeId === heading.id
                                    ? 'text-primary-600 font-bold border-l-2 border-primary-500 -ml-[1.6rem] pl-6'
                                    : 'text-text-secondary hover:text-primary-500'
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            {heading.text}
                        </a>
                    </motion.li>
                ))}
            </ul>
        </nav>
    );
}

// --- ArticleContent ---
export function ArticleContent({ content }: { content: string }) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const headings = contentRef.current.querySelectorAll('h2, h3');
            headings.forEach((heading, index) => {
                const id = `heading-${index}`;
                heading.id = id;
                heading.classList.add('scroll-mt-24');
            });
        }
    }, [content]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="article-content"
        >
            <div
                ref={contentRef}
                className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-black prose-headings:text-text-primary prose-headings:tracking-tighter
          prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
          prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-6
          prose-p:text-text-secondary prose-p:leading-[1.8] prose-p:text-lg
          prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-a:font-bold prose-a:underline-offset-4
          prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-8
          prose-blockquote:py-2 prose-blockquote:my-10
          prose-blockquote:italic prose-blockquote:text-text-primary prose-blockquote:bg-primary-50/30 dark:prose-blockquote:bg-primary-900/10
          prose-strong:text-text-primary prose-strong:font-black
          prose-ul:list-disc prose-ul:pl-8
          prose-ol:list-decimal prose-ol:pl-8
          prose-li:my-3
          prose-img:rounded-[32px] prose-img:shadow-premium-lg prose-img:mx-auto prose-img:w-full prose-img:max-h-[600px] prose-img:object-cover prose-img:my-12 prose-img:block
          prose-figure:my-12
          prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-text-tertiary prose-figcaption:font-bold prose-figcaption:mt-4
          prose-table:w-full prose-table:border-collapse
          prose-th:bg-primary-50 dark:prose-th:bg-primary-900/40 prose-th:p-4 prose-th:text-left
          prose-td:border prose-td:border-primary-100 dark:prose-td:border-primary-800 prose-td:p-4
        "
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </motion.div>
    );
}

// --- ShareBar ---
export function ShareBar({ article, vertical = false }: { article: Article; vertical?: boolean }) {
    const [copied, setCopied] = useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = article.title;

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const buttonClass = vertical
        ? "w-10 h-10 rounded-full bg-white dark:bg-black/50 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 transition-all hover:scale-110"
        : "p-2 rounded-full bg-white dark:bg-black/50 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 transition-all hover:scale-110";

    const iconSize = vertical ? 18 : 20;

    return (
        <TooltipProvider>
            <motion.div
                initial={{ opacity: 0, x: vertical ? -20 : 0, y: vertical ? 0 : 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className={vertical ? 'flex flex-col gap-3' : 'flex flex-row gap-2 justify-center lg:justify-start'}
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className={buttonClass} onClick={() => setLiked(!liked)}>
                            <Heart className={liked ? 'fill-red-500 text-red-500' : ''} size={iconSize} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side={vertical ? 'right' : 'top'}><p>{liked ? 'Unlike' : 'Like'}</p></TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className={buttonClass} onClick={() => setBookmarked(!bookmarked)}>
                            <Bookmark className={bookmarked ? 'fill-[#F15A24] text-[#F15A24]' : ''} size={iconSize} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side={vertical ? 'right' : 'top'}><p>{bookmarked ? 'Remove bookmark' : 'Save for later'}</p></TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className={buttonClass + ' flex items-center justify-center'}>
                            <Twitter className="text-[#1DA1F2]" size={iconSize} />
                        </a>
                    </TooltipTrigger>
                    <TooltipContent side={vertical ? 'right' : 'top'}><p>Share on Twitter</p></TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className={buttonClass + ' flex items-center justify-center'}>
                            <Facebook className="text-[#4267B2]" size={iconSize} />
                        </a>
                    </TooltipTrigger>
                    <TooltipContent side={vertical ? 'right' : 'top'}><p>Share on Facebook</p></TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className={buttonClass + ' flex items-center justify-center'}>
                            <Linkedin className="text-[#0077b5]" size={iconSize} />
                        </a>
                    </TooltipTrigger>
                    <TooltipContent side={vertical ? 'right' : 'top'}><p>Share on LinkedIn</p></TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className={buttonClass} onClick={copyToClipboard}>
                            {copied ? <Check className="text-green-500" size={iconSize} /> : <Link2 size={iconSize} />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side={vertical ? 'right' : 'top'}><p>{copied ? 'Copied!' : 'Copy link'}</p></TooltipContent>
                </Tooltip>
            </motion.div>
        </TooltipProvider>
    );
}

// --- AuthorBio ---
export function AuthorBio({ authorName, authorAvatar }: { authorName: string; authorAvatar: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 md:p-8 border-none bg-gradient-to-r from-orange-50/50 to-blue-50/50 dark:from-orange-900/20 dark:to-blue-900/20"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-4 border-white dark:border-gray-800 shadow-lg">
                    <AvatarImage src={authorAvatar} alt={authorName} />
                    <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{authorName}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Senior Political Correspondent at VERITUS INTERNATIONAL. Covering Nigerian politics, governance, and social issues with depth and integrity.
                    </p>
                    <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="gap-2 border-gray-300 dark:border-gray-600 hover:bg-[#F15A24]/10 hover:text-[#F15A24] hover:border-[#F15A24] rounded-full"><Twitter className="h-4 w-4" /> Follow</Button>
                        <Button size="sm" variant="outline" className="gap-2 border-gray-300 dark:border-gray-600 hover:bg-[#0077b5]/10 hover:text-[#0077b5] hover:border-[#0077b5] rounded-full"><Linkedin className="h-4 w-4" /> Connect</Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// --- CommentSection ---
export function CommentSection({ articleId }: { articleId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        setComments(getCommentsByArticleId(articleId));
    }, [articleId]);

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        const comment: Comment = {
            id: `c${Date.now()}`,
            articleId,
            userId: 'current-user',
            userName: 'Current User',
            userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Current',
            content: newComment,
            createdAt: new Date().toISOString(),
        };
        setComments([comment, ...comments]);
        setNewComment('');
    };

    const handleSubmitReply = (commentId: string) => {
        if (!replyText.trim()) return;
        const reply: Comment = {
            id: `r${Date.now()}`,
            articleId,
            userId: 'current-user',
            userName: 'Current User',
            userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Current',
            content: replyText,
            createdAt: new Date().toISOString(),
        };
        setComments(comments.map(c => c.id === commentId ? { ...c, replies: [...(c.replies || []), reply] } : c));
        setReplyingTo(null);
        setReplyText('');
    };

    const CommentComponent = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`${depth > 0 ? 'ml-8 md:ml-12 mt-4' : 'mt-6'}`}>
            <div className="flex gap-3">
                <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                    <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                    <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="glass-card rounded-2xl px-4 py-3 bg-white/50 dark:bg-black/40 border-none shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                            <div>
                                <span className="font-semibold text-sm md:text-base text-gray-900 dark:text-gray-100">{comment.userName}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{formatDistanceToNow(comment.createdAt)}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-4 w-4" /></Button>
                        </div>
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 ml-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs hover:text-red-500"><Heart className="h-3 w-3" /> Like</Button>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs hover:text-[#F15A24]" onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}><Reply className="h-3 w-3" /> Reply</Button>
                    </div>
                    <AnimatePresence>
                        {replyingTo === comment.id && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 ml-4">
                                <div className="flex gap-3">
                                    <Avatar className="h-8 w-8"><AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Current" /><AvatarFallback>U</AvatarFallback></Avatar>
                                    <div className="flex-1">
                                        <Textarea placeholder="Write a reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)} className="min-h-[80px] text-sm bg-white/50 dark:bg-black/30 rounded-xl border-gray-200 dark:border-gray-700" />
                                        <div className="flex justify-end gap-2 mt-2">
                                            <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>Cancel</Button>
                                            <Button size="sm" onClick={() => handleSubmitReply(comment.id)} className="bg-[#F15A24] hover:bg-[#C2410C] text-white">Reply</Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4">{comment.replies.map((reply) => <CommentComponent key={reply.id} comment={reply} depth={depth + 1} />)}</div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="glass-card rounded-2xl p-6 md:p-8 bg-white/60 dark:bg-black/50 border-none shadow-lg backdrop-blur-md">
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <MessageCircle className="h-5 w-5 text-[#F15A24]" /> Comments ({comments.length})
            </h3>
            <form onSubmit={handleSubmitComment} className="mb-8">
                <div className="flex gap-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10"><AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Current" /><AvatarFallback>U</AvatarFallback></Avatar>
                    <div className="flex-1">
                        <Textarea placeholder="Share your thoughts..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="min-h-[100px] bg-white/50 dark:bg-black/30 rounded-xl border-gray-200 dark:border-gray-700" />
                        <div className="flex justify-end mt-2"><Button type="submit" disabled={!newComment.trim()} className="bg-[#F15A24] hover:bg-[#C2410C] text-white">Post Comment</Button></div>
                    </div>
                </div>
            </form>
            <AnimatePresence>
                {comments.length > 0 ? (
                    <div className="space-y-6">{comments.map((comment) => <CommentComponent key={comment.id} comment={comment} />)}</div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">No comments yet. Be the first to share your thoughts!</p>
                )}
            </AnimatePresence>
        </motion.section>
    );
}

// --- RelatedArticles ---
export function RelatedArticles({ currentArticleId, category, tags }: { currentArticleId: string; category: string; tags: string[] }) {
    const related = mockArticles.filter(article => article.id !== currentArticleId).filter(article => article.category === category || article.tags.some(tag => tags.includes(tag))).slice(0, 3);
    if (related.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((article, index) => (
                <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group"
                >
                    <Link to={`/articles/${article.id}`} className="block">
                        <Card className="glass-card overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/50 dark:bg-black/40">
                            <div className="relative h-48 overflow-hidden">
                                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-2 right-2">
                                    <span className="px-3 py-1 bg-[#F15A24] text-white text-xs font-bold rounded-full shadow-md capitalize">{article.category.replace('-', ' ')}</span>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-[#F15A24] transition-colors leading-tight">{article.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{article.excerpt}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>{formatDate(article.publishedAt)}</span>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime} min</span>
                                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {article.views.toLocaleString()}</span>
                                        <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {article.likes.toLocaleString()}</span>
                                        <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" /> {article.commentsCount}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </motion.article>
            ))}
        </div>
    );
}
