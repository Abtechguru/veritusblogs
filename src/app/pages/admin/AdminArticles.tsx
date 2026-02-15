import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  PlusCircle,
  Search,
  MoreVertical,
  FileText,
  Eye,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  TrendingUp,
  Globe,
  BookOpen,
  PieChart
} from 'lucide-react';
import { articleService } from '../../services/articleService';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '../../components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';

export const AdminArticles = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await articleService.getArticles();
      setArticles(data || []);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      toast.error('Content repository sync failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to redact "${title}" from the archives?`)) return;
    try {
      await articleService.deleteArticle(id);
      toast.success('Manuscript successfully redacted');
      fetchArticles();
    } catch (error) {
      toast.error('Redaction protocol failed');
    }
  };

  const filteredArticles = articles.filter(a => {
    const matchesSearch = (a.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (a.author_id?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'published':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-none font-black text-[9px] tracking-widest px-2 h-5">
            <CheckCircle className="h-3 w-3 mr-1" /> PUBLISHED
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none font-black text-[9px] tracking-widest px-2 h-5">
            <Clock className="h-3 w-3 mr-1" /> DRAFT
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-none font-black text-[9px] tracking-widest px-2 h-5 animate-pulse">
            <AlertCircle className="h-3 w-3 mr-1" /> PENDING_REVIEW
          </Badge>
        );
      default:
        return <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-10">
      {/* Articles Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-[2.5rem] bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/30 group">
            <BookOpen className="h-10 w-10 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 border-none font-black text-[9px] tracking-[2px]">CONTENT INFRASTRUCTURE</Badge>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic font-serif">Main Repository</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2">
              Manuscript <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Assets.</span>
            </h1>
            <p className="text-slate-500 font-medium italic">Managing <span className="text-indigo-600 font-bold">{articles.length} digital properties</span> across the network.</p>
          </div>
        </div>
        <Button
          onClick={() => navigate('/create-article')}
          size="lg"
          className="h-14 px-10 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[11px] uppercase tracking-[3px] shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 group"
        >
          <PlusCircle className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform" />
          Forge New Content
        </Button>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Platform Assets', value: articles.length, icon: <FileText />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Global Impressions', value: articles.reduce((acc, a) => acc + (a.views || 0), 0).toLocaleString(), icon: <Globe />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Operational Sync', value: '100%', icon: <TrendingUp />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Content Velocity', value: '+4.2', icon: <PieChart />, color: 'text-violet-600', bg: 'bg-violet-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-indigo-600/5 bg-white dark:bg-slate-900 overflow-hidden group hover:scale-[1.03] transition-all duration-500">
            <CardContent className="p-7 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Ledger Card */}
      <Card className="border-none shadow-3xl bg-white dark:bg-slate-900 overflow-hidden rounded-[2.5rem]">
        <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <CardTitle className="text-3xl font-black tracking-tight">Manuscript Ledger</CardTitle>
              <CardDescription className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-1 italic">Comprehensive archive of platform narratives and engagement data</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-max">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by title or identity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 rounded-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-14 shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all font-semibold"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px] h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-black text-[10px] uppercase tracking-widest text-slate-500">
                  <SelectValue placeholder="Content Protocol" />
                </SelectTrigger>
                <SelectContent className="border-none shadow-2xl rounded-2xl p-2">
                  <SelectItem value="all" className="font-bold py-3">ALL PROTOCOLS</SelectItem>
                  <SelectItem value="published" className="font-bold py-3 text-emerald-600">PUBLISHED_ONLY</SelectItem>
                  <SelectItem value="draft" className="font-bold py-3 text-slate-500">DRAFT_ONLY</SelectItem>
                  <SelectItem value="pending" className="font-bold py-3 text-amber-500">REVIEW_REQUIRED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                <TableRow className="border-none">
                  <TableHead className="pl-10 font-black text-slate-400 uppercase text-[10px] tracking-widest py-6">Digital Narrative</TableHead>
                  <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Creator Node</TableHead>
                  <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest text-center">Protocol</TableHead>
                  <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest text-center">Engagement</TableHead>
                  <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Entry Date</TableHead>
                  <TableHead className="text-right pr-10 font-black text-slate-400 uppercase text-[10px] tracking-widest">Redaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && articles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-80 text-center">
                      <Loader2 className="h-12 w-12 animate-spin mx-auto text-indigo-600 opacity-20" />
                      <p className="mt-4 text-[11px] font-black text-slate-400 uppercase tracking-[5px] italic animate-pulse">Syncing Content Streams...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredArticles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-80 text-center text-slate-400 italic font-medium px-10 text-lg">
                      The archive remains silent for this narrative query.
                    </TableCell>
                  </TableRow>
                ) : (
                  <AnimatePresence>
                    {filteredArticles.map((article, index) => (
                      <motion.tr
                        key={article.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-slate-50 dark:border-slate-800/50 group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all cursor-default"
                      >
                        <TableCell className="pl-10 py-8">
                          <div className="flex items-center gap-6">
                            <div className="h-16 w-16 min-w-[64px] rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative group/img">
                              <img
                                src={article.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop'}
                                className="h-full w-full object-cover opacity-80 group-hover/img:scale-110 transition-transform duration-500"
                                alt="Narrative Thumbnail"
                              />
                              <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex flex-col">
                              <Link
                                to={`/articles/${article.id}`}
                                className="text-lg font-black text-slate-900 dark:text-white leading-none mb-2 tracking-tight group-hover:text-indigo-600 transition-colors uppercase line-clamp-1"
                              >
                                {article.title}
                              </Link>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[8px] font-black tracking-widest uppercase px-1.5 py-0 border-slate-200 dark:border-slate-800">{article.category || 'GENERAL'}</Badge>
                                <span className="text-[9px] text-slate-400 font-bold italic leading-none">Node_{article.id.slice(0, 8).toUpperCase()}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-slate-800 shadow-lg">
                              <AvatarImage src={article.profiles?.avatar_url} />
                              <AvatarFallback className="bg-indigo-600 text-white font-black text-[10px]">{article.profiles?.name?.[0] || '?'}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{article.profiles?.name || 'Unknown Artist'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{getStatusBadge(article.status || 'draft')}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1.5 font-black text-indigo-600 text-sm tracking-tighter">
                              <Eye className="h-4 w-4" />
                              {(article.views || 0).toLocaleString()}
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Impressions</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-600 dark:text-slate-400">
                              {new Date(article.published_at || article.created_at).toLocaleDateString()}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">Verified Log</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-10">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100">
                                <MoreVertical className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 border-none shadow-3xl p-3 rounded-2xl bg-white dark:bg-slate-900">
                              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 py-4 px-4 font-serif italic">Manuscript Actions</DropdownMenuLabel>

                              <DropdownMenuItem
                                className="rounded-xl py-4 px-4 focus:bg-indigo-50 dark:focus:bg-indigo-900/40 group cursor-pointer"
                                onClick={() => navigate(`/edit-article/${article.id}`)}
                              >
                                <Edit className="mr-3 h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform" />
                                <div className="flex flex-col">
                                  <span className="font-bold text-sm text-slate-900 dark:text-white">Refine Manuscript</span>
                                  <span className="text-[10px] text-slate-400 font-medium">Re-entry to the writing forge</span>
                                </div>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="rounded-xl py-4 px-4 focus:bg-indigo-50 dark:focus:bg-indigo-900/40 group cursor-pointer"
                                onClick={() => navigate(`/articles/${article.id}`)}
                              >
                                <Eye className="mr-3 h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                                <div className="flex flex-col">
                                  <span className="font-bold text-sm text-slate-900 dark:text-white">Public Inspection</span>
                                  <span className="text-[10px] text-slate-400 font-medium">View live deployment</span>
                                </div>
                              </DropdownMenuItem>

                              <DropdownMenuSeparator className="bg-slate-50 dark:bg-slate-800 my-2 mx-1" />

                              <DropdownMenuItem
                                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/40 rounded-xl py-4 px-4 cursor-pointer"
                                onClick={() => handleDeleteArticle(article.id, article.title)}
                              >
                                <Trash2 className="mr-3 h-4 w-4 group-hover:rotate-12 transition-transform" />
                                <div className="flex flex-col">
                                  <span className="font-bold text-sm">Redact Permanently</span>
                                  <span className="text-[10px] text-rose-400 font-medium italic">Execute removal protocol</span>
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
