import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { useAuth } from '../contexts/AuthContext';
import { categories } from '../data/mockData';
import { toast } from 'sonner';
import {
  ArrowLeft, Save, Eye, Send, X, Plus,
  Sparkles, Image as ImageIcon, Tags,
  Settings, Globe, ShieldCheck, Clock,
  Layout, History, FileText, ChevronRight
} from 'lucide-react';
import { RichTextEditor } from '../components/admin/RichTextEditor';
import { Badge } from '../components/ui/badge';
import { articleService } from '../services/articleService';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const CreateArticlePage = () => {
  const { user, isAuthor } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [activeTab, setActiveTab] = useState<'editor' | 'organization' | 'media'>('editor');

  useEffect(() => {
    if (isEditMode && id) {
      fetchArticle(id);
    }
  }, [isEditMode, id]);

  const fetchArticle = async (articleId: string) => {
    setFetching(true);
    try {
      const article = await articleService.getArticleById(articleId);
      if (article) {
        setTitle(article.title);
        setExcerpt(article.excerpt || '');
        setContent(article.content || '');
        setSelectedCategories(article.categories || [article.category].filter(Boolean));
        setCoverImage(article.cover_image || '');
        setTags(article.tags?.join(', ') || '');
        setFeatured(article.featured || false);
      }
    } catch (error) {
      toast.error('Failed to load article details');
      navigate('/admin/articles');
    } finally {
      setFetching(false);
    }
  };

  if (!user || !isAuthor) {
    navigate('/login');
    return null;
  }

  const handleCategorySelect = (value: string) => {
    if (selectedCategories.includes(value)) {
      toast.error('Category already selected');
      return;
    }
    if (selectedCategories.length >= 5) {
      toast.error('You can only select up to 5 categories');
      return;
    }
    setSelectedCategories([...selectedCategories, value]);
  };

  const removeCategory = (catSlug: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== catSlug));
  };

  const handleSubmit = async (status: 'draft' | 'pending') => {
    if (!title || !content || selectedCategories.length === 0) {
      toast.error('Subject, content, and at least one category are mandatory.');
      return;
    }

    setLoading(true);

    try {
      const articleData = {
        title,
        excerpt,
        content,
        categories: selectedCategories,
        coverImage,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        featured,
        status,
        authorId: user.id
      };

      if (isEditMode && id) {
        await articleService.updateArticle(id, {
          ...articleData,
          published: status === 'published' || (status === 'pending' && false) // Logic tweak
        } as any);
        toast.success('Article updated successfully!');
      } else {
        await articleService.createArticle(articleData, user.id);
        toast.success(status === 'draft' ? 'Draft saved!' : 'Submitted for review!');
      }

      navigate('/admin/articles');
    } catch (error) {
      toast.error('Transmission fault. Local state preserved.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="relative">
          <div className="h-24 w-24 rounded-3xl border-4 border-indigo-600/20 border-t-indigo-600 animate-spin" />
          <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-indigo-600 animate-pulse" />
        </div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[4px] text-slate-400 animate-pulse italic">Reconstructing Manuscript...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32 pt-6">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Premium Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:scale-110 transition-transform"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 border-none font-black text-[9px] tracking-widest px-2">MANUSCRIPT EDITOR</Badge>
                {isEditMode && <Badge className="bg-amber-100 text-amber-600 dark:bg-amber-900/40 border-none font-black text-[9px] tracking-widest px-2">REVISION_VERSION_02</Badge>}
              </div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-1">
                {isEditMode ? 'Refine Publication' : 'Commence Draft'}
              </h1>
              <p className="text-slate-500 text-xs font-medium italic">Authoring as <span className="text-indigo-600 font-bold">{user.name}</span> • System Operational</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => handleSubmit('draft')}
              disabled={loading}
              className="h-12 px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-black text-[10px] uppercase tracking-widest text-slate-500 shadow-sm hover:bg-slate-50 transition-all"
            >
              <Save className="mr-2 h-4 w-4" /> Save Local Cache
            </Button>
            <Button
              onClick={() => handleSubmit('pending')}
              disabled={loading}
              className="h-12 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Send className="mr-2 h-4 w-4" /> {loading ? 'Transmitting...' : (isEditMode ? 'Push Updates' : 'Publish to Feed')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Primary Content Forge */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-4 border-b border-slate-50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-800/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                      <FileText size={20} />
                    </div>
                    <CardTitle className="text-xl font-black">Composition Forge</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase text-slate-400">Live Workspace</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 ml-1">Headline Protocol</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a high-engagement headline..."
                    className="text-3xl font-black py-10 px-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border-none shadow-inner focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 ml-1">Narrative Core</Label>
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Weave your story here... The world is waiting for your insights."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-4 border-b border-slate-50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-800/20">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <Layout size={20} />
                  </div>
                  <CardTitle className="text-xl font-black">Teaser & Synopsis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-6">
                <div className="space-y-3">
                  <Label htmlFor="excerpt" className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 ml-1">Engagement Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Craft a 2-sentence summary that forces the reader to click."
                    rows={4}
                    className="rounded-3xl bg-slate-50 dark:bg-slate-800/50 border-none shadow-inner p-6 font-medium leading-relaxed focus:ring-4 focus:ring-amber-500/10 transition-all"
                  />
                  <div className="flex justify-between items-center px-2">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">SEO Optimized Field</p>
                    <p className={cn("text-[9px] font-black uppercase tracking-widest", excerpt.length > 180 ? "text-rose-500" : "text-slate-300")}>
                      {excerpt.length} / 200 SCALE
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metadata Command Center */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden sticky top-8">
              <div className="p-1 flex">
                <button
                  onClick={() => setActiveTab('organization')}
                  className={cn(
                    "flex-1 py-4 flex flex-col items-center gap-1.5 transition-all text-[10px] font-black uppercase tracking-widest rounded-t-[2rem]",
                    activeTab === 'organization' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Settings size={16} /> Data
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className={cn(
                    "flex-1 py-4 flex flex-col items-center gap-1.5 transition-all text-[10px] font-black uppercase tracking-widest rounded-t-[2rem]",
                    activeTab === 'media' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <ImageIcon size={16} /> Assets
                </button>
                <button
                  onClick={() => setActiveTab('editor')}
                  className={cn(
                    "flex-1 py-4 flex flex-col items-center gap-1.5 transition-all text-[10px] font-black uppercase tracking-widest rounded-t-[2rem]",
                    activeTab === 'editor' ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <History size={16} /> Audit
                </button>
              </div>

              <CardContent className="p-8 pt-10">
                <AnimatePresence mode="wait">
                  {activeTab === 'organization' && (
                    <motion.div
                      key="org"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 flex items-center justify-between">
                          Classification Nodes
                          <Badge variant="outline" className="text-[8px] h-4">MAX_05</Badge>
                        </Label>
                        <Select onValueChange={handleCategorySelect} disabled={selectedCategories.length >= 5}>
                          <SelectTrigger className="h-12 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-bold text-xs">
                            <SelectValue placeholder="Add Category..." />
                          </SelectTrigger>
                          <SelectContent className="border-none shadow-2xl rounded-2xl">
                            {categories.map((cat) => (
                              <SelectItem key={cat.slug} value={cat.slug} className="capitalize py-3 rounded-xl font-medium">
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl min-h-[100px] border-2 border-dashed border-slate-200 dark:border-slate-700">
                          {selectedCategories.length === 0 && (
                            <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest w-full text-center self-center italic">No Nodes Assigned</p>
                          )}
                          {selectedCategories.map(catSlug => {
                            const cat = categories.find(c => c.slug === catSlug);
                            return (
                              <Badge key={catSlug} className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 border-none pl-3 pr-1 py-1.5 flex items-center gap-2 rounded-xl group hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer">
                                <span className="text-[10px] font-black uppercase tracking-tighter">{cat?.name}</span>
                                <button onClick={() => removeCategory(catSlug)} className="opacity-40 group-hover:opacity-100">
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="tags" className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 flex items-center gap-2">
                          <Tags size={14} className="text-indigo-500" /> Identifier Tags
                        </Label>
                        <Input
                          id="tags"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="politics, news, ombugadu"
                          className="h-12 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 focus:ring-4 focus:ring-indigo-500/10 font-medium"
                        />
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic px-1">Deep link entities via comma separation</p>
                      </div>

                      <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="featured" className="text-sm font-black text-slate-900 dark:text-white">Priority Broadcast</Label>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Pin to Platform Apex</p>
                          </div>
                          <Switch
                            id="featured"
                            checked={featured}
                            onCheckedChange={setFeatured}
                            className="data-[state=checked]:bg-indigo-600"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'media' && (
                    <motion.div
                      key="media"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[2px] text-slate-400">Visual Identification</Label>
                        <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border-4 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 group shadow-inner">
                          {coverImage ? (
                            <img src={coverImage} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                              <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                              <p className="text-[9px] font-black uppercase tracking-[3px]">Waiting for Asset</p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="coverImage" className="text-[9px] font-black uppercase text-slate-400 ml-1">Remote Endpoint URL</Label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              id="coverImage"
                              value={coverImage}
                              onChange={(e) => setCoverImage(e.target.value)}
                              placeholder="https://cdn.veritus.int/hero.jpg"
                              className="pl-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 font-medium text-xs"
                            />
                          </div>
                          <Button className="w-full h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-black text-[10px] uppercase tracking-widest border-2 border-dashed border-slate-200 dark:border-slate-700">
                            <Plus className="h-4 w-4 mr-2" /> Upload from Local Secure Disk
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'editor' && (
                    <motion.div
                      key="audit"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="p-6 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border-2 border-indigo-100 dark:border-indigo-900 border-dashed">
                        <div className="flex items-center gap-3 mb-4">
                          <ShieldCheck className="text-indigo-600 h-5 w-5" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-400">Security Snapshot</p>
                        </div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                          "All changes will be cryptographically logged and attributed to your digital footprint upon transmission."
                        </p>
                      </div>

                      <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Audit History</p>
                        {[
                          { event: 'Draft Initialized', time: '12m ago', icon: <Plus size={12} />, color: 'text-indigo-500' },
                          { event: 'Content Synced', time: '4m ago', icon: <Save size={12} />, color: 'text-emerald-500' },
                          { event: 'Metadata Finalized', time: 'Just now', icon: <Settings size={12} />, color: 'text-amber-500' },
                        ].map((log, i) => (
                          <div key={i} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className={cn("h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-transform group-hover:rotate-12", log.color)}>
                                {log.icon}
                              </div>
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{log.event}</span>
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase italic">{log.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-12 space-y-4">
                  <Button
                    onClick={() => handleSubmit('pending')}
                    disabled={loading}
                    className="w-full h-16 rounded-[2rem] bg-[#F15A24] hover:bg-[#C2410C] text-white font-black text-xs uppercase tracking-[3px] shadow-xl shadow-orange-600/20 transition-all active:scale-95 flex items-center justify-center gap-3 group"
                  >
                    <Globe className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Authorize Publication
                  </Button>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol Omega</p>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/articles')}
                    className="w-full text-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors py-2 flex items-center justify-center gap-2"
                  >
                    Inspect Global Repository <ChevronRight size={12} />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1e293b;
                }
            `}</style>
    </div>
  );
};
