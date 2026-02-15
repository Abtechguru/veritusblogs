import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { useAuth } from '../../contexts/AuthContext';
import {
  PlusCircle,
  FileText,
  Eye,
  Clock,
  Edit,
  Trash2,
  Users,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { articleService } from '../../services/articleService';
import { cn } from '../../lib/utils';

export const AuthorDashboard: React.FC = () => {
  const { user, isAuthor } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user || !isAuthor) {
    navigate('/');
    return null;
  }

  useEffect(() => {
    fetchArticles();
  }, [user]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await articleService.getArticles();
      // Filter articles for current author
      const myArticles = (data || []).filter((a: any) => a.author_id === user.id);
      setArticles(myArticles);
    } catch (error: any) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to load your manuscripts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await articleService.deleteArticle(id);
      toast.success('Manuscript successfully redacted');
      fetchArticles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to redact manuscript');
    }
  };

  const stats = [
    { label: 'Publications', value: articles.filter(a => a.status === 'published').length, icon: <CheckCircle2 className="h-5 w-5" />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Impressions', value: articles.reduce((sum, a) => sum + (a.views || 0), 0).toLocaleString(), icon: <Eye className="h-5 w-5" />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Pending Review', value: articles.filter(a => a.status === 'pending').length, icon: <Clock className="h-5 w-5" />, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Total Assets', value: articles.length, icon: <FileText className="h-5 w-5" />, color: 'text-slate-500', bg: 'bg-slate-50' },
  ];

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'published':
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-none px-3 font-black text-[10px] tracking-widest">PUBLISHED</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-none px-3 font-black text-[10px] tracking-widest animate-pulse">PENDING</Badge>;
      case 'draft':
        return <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-none px-3 font-black text-[10px] tracking-widest">DRAFT</Badge>;
      default:
        return <Badge variant="outline" className="px-3 font-black text-[10px] tracking-widest">{status?.toUpperCase()}</Badge>;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20 pt-10">
      {/* Author Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-2xl shadow-indigo-600/30 group hover:rotate-6 transition-transform">
            <Sparkles className="text-white h-10 w-10 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 border-none font-black text-[9px] tracking-[2px]">CREATOR HUB</Badge>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic font-serif">Veritus Editorial Staff</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2">
              Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">{user.name.split(' ')[0]}</span>.
            </h1>
            <p className="text-slate-500 font-medium italic">Your narratives reach <span className="text-indigo-600 font-bold">{stats[1].value} identities</span> across the network.</p>
          </div>
        </div>
        <Button
          onClick={() => navigate('/create-article')}
          size="lg"
          className="h-14 px-10 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[11px] uppercase tracking-[3px] shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 group"
        >
          <PlusCircle className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform" />
          Compose New Manuscript
        </Button>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 overflow-hidden group hover:scale-[1.03] transition-all duration-500">
            <CardContent className="p-7 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stat.value}</p>
              </div>
              <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform", stat.bg, stat.color)}>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Asset Ledger */}
      <div className="grid lg:grid-cols-3 gap-10">
        <Card className="lg:col-span-2 border-none shadow-3xl bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black tracking-tight">Manuscript Ledger</CardTitle>
              <CardDescription className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-1 italic">Tracking digital assets & engagement</CardDescription>
            </div>
            <Button variant="ghost" className="text-indigo-600 font-black text-[10px] uppercase tracking-widest group">
              Full Analysis <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-24 text-center">
                <Zap className="h-10 w-10 animate-spin mx-auto text-indigo-600 opacity-20" />
                <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[4px] italic animate-pulse">Syncing Editorial State...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="py-24 text-center group cursor-pointer" onClick={() => navigate('/create-article')}>
                <FileText className="w-16 h-16 mx-auto text-slate-200 dark:text-slate-800 mb-6 group-hover:scale-110 transition-transform" />
                <p className="text-slate-500 font-black text-lg tracking-tight">The archives are silent.</p>
                <p className="text-slate-400 text-xs mt-2 italic">Commence your first publication today.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                    <TableRow className="border-none">
                      <TableHead className="pl-8 font-black text-slate-400 uppercase text-[10px] tracking-widest py-5">Intellectual Property</TableHead>
                      <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Protocol</TableHead>
                      <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest text-center">Engagement</TableHead>
                      <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Temporal Log</TableHead>
                      <TableHead className="text-right pr-8 font-black text-slate-400 uppercase text-[10px] tracking-widest">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {articles.map((article, index) => (
                        <motion.tr
                          key={article.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-slate-50 dark:border-slate-800/50 group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all cursor-default"
                        >
                          <TableCell className="pl-8 py-6">
                            <div className="flex flex-col max-w-sm">
                              <Link
                                to={`/articles/${article.id}`}
                                className="text-base font-black text-slate-800 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-all tracking-tight leading-none mb-1.5"
                              >
                                {article.title}
                              </Link>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[8px] font-black tracking-widest border-slate-200 dark:border-slate-800 uppercase px-1.5 py-0">{(article.categories?.[0] || 'General').toUpperCase()}</Badge>
                                <span className="text-[9px] text-slate-400 font-bold italic">Node_{article.id.slice(0, 6).toUpperCase()}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(article.status || 'draft')}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center">
                              <div className="flex items-center gap-1 font-black text-slate-900 dark:text-white text-sm tracking-tighter">
                                <Eye className="h-3.5 w-3.5 text-indigo-500" />
                                {article.views || 0}
                              </div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Reach</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-slate-600 dark:text-slate-400">
                                {new Date(article.published_at || article.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Verified Entry</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right pr-8">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="h-10 w-10 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm group/btn"
                              >
                                <Link to={`/edit-article/${article.id}`}>
                                  <Edit className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteArticle(article.id, article.title)}
                                className="h-10 w-10 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm group/btn"
                              >
                                <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="p-4 bg-slate-50/20 dark:bg-slate-800/10 border-t border-slate-50 dark:border-slate-800 flex justify-center">
              <Button variant="ghost" className="text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-[3px] h-10">
                Archival Records Inspection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vertical Sidebar Context */}
        <div className="space-y-10">
          <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-150 transition-transform duration-1000">
              <Zap size={140} />
            </div>
            <CardContent className="p-10 relative z-10">
              <Badge className="bg-white/20 text-white border-none font-black text-[9px] tracking-[2px] mb-6">EDITORIAL INSIGHT</Badge>
              <h3 className="text-2xl font-black tracking-tight leading-tight mb-4 italic">"Captivating headlines increase platform retention by upwards of 42%."</h3>
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-10 bg-white/30" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Zen Scribe Tip</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black tracking-tight">Quick Infrastructure</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              {[
                { label: 'Manuscript Forge', desc: 'Initialize new content', icon: <PlusCircle size={18} />, path: '/create-article', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Bio Registry', desc: 'Manage identity & bio', icon: <Users size={18} />, path: '/profile', color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Platform Feed', desc: 'View global publications', icon: <Globe size={18} />, path: '/articles', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  className="w-full p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-4 text-left group border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                >
                  <div className={cn("h-11 w-11 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform", action.bg, action.color)}>
                    {action.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{action.label}</span>
                    <span className="text-[10px] font-medium text-slate-400 capitalize">{action.desc}</span>
                  </div>
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="px-6 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[4px] leading-relaxed">
              Veritus Editorial Protocol v4.2.0 • System Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
