import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Reel } from '../../data/mockReels';
import { reelService } from '../../services/reelService';
import { Search, Trash2, Loader2, Plus, Film, Video, Play, TrendingUp, Filter, Share2, MoreHorizontal, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

export const AdminReels = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [reels, setReels] = useState<Reel[]>([]);
    const [loading, setLoading] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newReel, setNewReel] = useState({
        videoUrl: '',
        thumbnailUrl: '',
        caption: '',
        category: 'general'
    });

    useEffect(() => {
        fetchReels();
    }, []);

    const fetchReels = async () => {
        setLoading(true);
        try {
            const data = await reelService.getReels();
            if (data) {
                const mappedReels: Reel[] = data.map((item: any) => ({
                    id: item.id,
                    videoUrl: item.video_url,
                    caption: item.caption,
                    likes: item.likes || 0,
                    comments: 0,
                    shares: 0,
                    views: item.views || 0,
                    category: item.category,
                    createdAt: item.created_at,
                    userId: item.user_id,
                    userName: item.user?.name || 'Unknown',
                    userAvatar: item.user?.avatar_url || '',
                    hasLiked: false,
                    isSaved: false,
                    thumbnailUrl: item.thumbnail_url
                }));
                setReels(mappedReels);
            }
        } catch (error) {
            console.error('Failed to fetch reels:', error);
            const { mockReels } = await import('../../data/mockReels');
            setReels(mockReels);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, caption: string) => {
        if (!confirm(`Are you sure you want to remove "${caption.substring(0, 20)}..."?`)) return;
        try {
            await reelService.deleteReel(id);
            toast.success('Reel removed from platform');
            fetchReels();
        } catch (error) {
            const updated = reels.filter(r => r.id !== id);
            setReels(updated);
            toast.success('Reel deleted (local update)');
        }
    };

    const handleCreateReel = async () => {
        if (!user) return;
        try {
            setLoading(true);
            await reelService.createReel(newReel, user.id);
            toast.success('Cinematic reel published!');
            setIsCreateOpen(false);
            setNewReel({ videoUrl: '', thumbnailUrl: '', caption: '', category: 'general' });
            fetchReels();
        } catch (error) {
            toast.error('Failed to publish reel');
        } finally {
            setLoading(false);
        }
    };

    const filteredReels = reels.filter((reel) =>
        (reel.caption?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (reel.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <Video className="text-indigo-600 h-8 w-8" />
                        Reels Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Monitor short-form cinematic content and engagement rates</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
                            <Plus className="mr-2 h-4 w-4" />
                            Upload Visual Content
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-2xl p-0 overflow-hidden">
                        <DialogHeader className="p-6 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                            <DialogTitle className="text-xl font-black flex items-center gap-2">
                                <Film size={20} className="text-indigo-600" /> New Visual Asset
                            </DialogTitle>
                            <DialogDescription className="font-medium italic">Configure a new short-form vertical video</DialogDescription>
                        </DialogHeader>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="video-url" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Master Video endpoint (URL)</Label>
                                    <Input
                                        id="video-url"
                                        placeholder="https://cdn.veritus.com/assets/video_049.mp4"
                                        value={newReel.videoUrl}
                                        onChange={e => setNewReel({ ...newReel, videoUrl: e.target.value })}
                                        className="rounded-xl h-11 border-slate-200 dark:border-slate-700 font-semibold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="thumb-url" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Static Thumbnail endpoint</Label>
                                    <Input
                                        id="thumb-url"
                                        placeholder="https://cdn.veritus.com/assets/thumb_049.jpg"
                                        value={newReel.thumbnailUrl}
                                        onChange={e => setNewReel({ ...newReel, thumbnailUrl: e.target.value })}
                                        className="rounded-xl h-11 border-slate-200 dark:border-slate-700 font-semibold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="caption" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Narrative Caption</Label>
                                    <Textarea
                                        id="caption"
                                        placeholder="Describe the cinematic moment..."
                                        value={newReel.caption}
                                        onChange={e => setNewReel({ ...newReel, caption: e.target.value })}
                                        className="rounded-xl min-h-[100px] border-slate-200 dark:border-slate-700 font-medium leading-relaxed"
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="p-6 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
                            <Button variant="ghost" onClick={() => setIsCreateOpen(false)} className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-11 px-6 text-slate-400">Abort</Button>
                            <Button onClick={handleCreateReel} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-11 px-8 shadow-xl shadow-indigo-600/20">
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Publish Reel'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Reel Count', count: reels.length, icon: <Film size={18} />, color: 'text-indigo-600' },
                    { label: 'Platform Views', count: reels.reduce((acc, r) => acc + (r.views || 0), 0).toLocaleString(), icon: <Play size={18} />, color: 'text-rose-600' },
                    { label: 'Net Likes', count: reels.reduce((acc, r) => acc + (r.likes || 0), 0).toLocaleString(), icon: <TrendingUp size={18} />, color: 'text-emerald-600' },
                    { label: 'Est. Shares', count: '~420', icon: <Share2 size={18} />, color: 'text-blue-600' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-md bg-white dark:bg-slate-900 border-b-4 border-indigo-500/30">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{stat.count}</p>
                            </div>
                            <div className={`${stat.color} opacity-20`}>{stat.icon}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden rounded-2xl">
                <CardHeader className="bg-slate-50/30 dark:bg-slate-800/20 border-b border-slate-50 dark:border-slate-800">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">Visual Repository</CardTitle>
                            <CardDescription>Comprehensive log of all cinematic assets</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-max">
                            <div className="relative flex-1 lg:w-72">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by caption or artist..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-10 shadow-sm"
                                />
                            </div>
                            <Button variant="outline" className="rounded-xl border-slate-200 h-10 font-bold text-xs uppercase tracking-widest text-slate-500">
                                <Filter className="h-4 w-4 mr-2" /> All Verticals
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                                <TableRow className="border-none">
                                    <TableHead className="pl-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest py-4">Cinematic Preview</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Artist Source</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Engagement Metrics</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Upload Date</TableHead>
                                    <TableHead className="text-right pr-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Control</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading && reels.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <Loader2 className="h-10 w-10 animate-spin mx-auto text-indigo-600 opacity-30" />
                                            <p className="text-xs font-black text-slate-400 mt-4 uppercase tracking-widest italic">Decrypting Data Stream...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredReels.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center text-slate-400 italic font-medium">
                                            No vertical assets detected matching filters.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredReels.map((reel) => (
                                        <TableRow key={reel.id} className="group hover:bg-slate-50/10 dark:hover:bg-slate-800/50 transition-colors border-slate-50 dark:border-slate-800/50">
                                            <TableCell className="pl-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-20 w-14 rounded-xl bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group/thumb cursor-pointer" onClick={() => window.open(reel.videoUrl, '_blank')}>
                                                        <img src={reel.thumbnailUrl || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop'} className="h-full w-full object-cover opacity-80" alt="Reel Thumb" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Play className="h-6 w-6 text-white fill-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col max-w-[200px]">
                                                        <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                                                            {reel.caption || "No Narrative Description"}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1 italic">
                                                            Category: {reel.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-slate-800 shadow-sm transition-transform group-hover:scale-110">
                                                        <AvatarImage src={reel.userAvatar} />
                                                        <AvatarFallback className="bg-slate-100 text-indigo-600 font-bold text-[10px]">{reel.userName?.[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{reel.userName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-xs font-black text-slate-900 dark:text-white">{(reel.views || 0).toLocaleString()}</span>
                                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Views</span>
                                                        </div>
                                                        <div className="w-px h-6 bg-slate-100 dark:bg-slate-800" />
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-xs font-black text-slate-900 dark:text-white">{(reel.likes || 0).toLocaleString()}</span>
                                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Likes</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                                        <Calendar size={12} className="text-slate-300" />
                                                        {new Date(reel.createdAt).toLocaleDateString()}
                                                    </span>
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter ml-4.5">Verified Entry</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-all">
                                                        <MoreHorizontal size={18} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(reel.id, reel.caption)} className="h-9 w-9 rounded-full bg-rose-50 text-rose-400 hover:text-rose-600 hover:bg-rose-100 transition-all">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
