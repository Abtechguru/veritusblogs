import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Trash2, Film, Loader2, User, Eye, Image as ImageIcon, Flame, Clock, Filter, Search, PlayCircle, MoreHorizontal } from 'lucide-react';
import { storyService } from '../../services/storyService';
import { toast } from 'sonner';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

export const AdminStories = () => {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            setLoading(true);
            const data = await storyService.getStories();
            setStories(data || []);
        } catch (error) {
            toast.error('Failed to load stories');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this story?')) return;
        try {
            await storyService.deleteStory(id);
            toast.success('Story removed from platform');
            fetchStories();
        } catch (error) {
            toast.error('Failed to remove story');
        }
    };

    const filteredStories = stories.filter(s =>
        (s.profiles?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <Flame className="text-rose-600 h-8 w-8 fill-rose-600" />
                        Ephemeral Story Hub
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Moderate and curate brief moments shared by the community</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Fragments', count: stories.length, icon: <Flame size={18} />, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Avg Exposure', count: '18h', icon: <Clock size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Staff Curated', count: stories.filter(s => s.is_featured).length, icon: <PlayCircle size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-md bg-white dark:bg-slate-900">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`h-11 w-11 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.count}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden rounded-2xl">
                <CardHeader className="bg-slate-50/30 dark:bg-slate-800/20 border-b border-slate-50 dark:border-slate-800">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">Content Pipeline</CardTitle>
                            <CardDescription>Visual feed of all active ephemeral content</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-max">
                            <div className="relative flex-1 lg:w-72">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by author identity..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-10 shadow-sm"
                                />
                            </div>
                            <Button variant="outline" className="rounded-xl border-slate-200 h-10 font-bold text-xs uppercase tracking-widest text-slate-500">
                                <Filter className="h-4 w-4 mr-2" /> Live Only
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                                <TableRow className="border-none">
                                    <TableHead className="pl-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest py-4">Origin Identity</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Type</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Visual Preview</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Expiry Timer</TableHead>
                                    <TableHead className="text-right pr-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Control</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <Loader2 className="h-10 w-10 animate-spin mx-auto text-indigo-600 opacity-30" />
                                            <p className="text-xs font-black text-slate-400 mt-4 uppercase tracking-widest italic">Streaming Fragments...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredStories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center text-slate-400 italic font-medium">
                                            The story feed is currently empty.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredStories.map((story) => (
                                        <TableRow key={story.id} className="group hover:bg-slate-50/10 dark:hover:bg-slate-800/50 transition-colors border-slate-50 dark:border-slate-800/50">
                                            <TableCell className="pl-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-slate-800 shadow-sm group-hover:scale-110 transition-transform">
                                                        <AvatarImage src={story.profiles?.avatar_url} />
                                                        <AvatarFallback className="bg-slate-100 text-slate-700 font-bold text-xs">{story.profiles?.name?.[0] || '?'}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{story.profiles?.name || 'Unknown'}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Contributor</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-6 w-6 rounded-lg flex items-center justify-center ${story.type === 'video' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                                                        {story.type === 'video' ? <Film size={12} /> : <ImageIcon size={12} />}
                                                    </div>
                                                    <span className="capitalize text-[10px] font-black uppercase tracking-wider text-slate-500">{story.type}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className="h-14 w-24 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative group/preview cursor-pointer shadow-sm border border-slate-200 dark:border-slate-700"
                                                    onClick={() => window.open(story.content_url, '_blank')}
                                                >
                                                    <img src={story.content_url} className="w-full h-full object-cover opacity-90 group-hover/preview:opacity-100 transition-opacity" alt="Preview" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Eye className="h-5 w-5 text-white" />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center">
                                                    <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-none font-black text-[10px] tracking-tighter mb-1 px-2 h-5">
                                                        {new Date(story.expires_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </Badge>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic">Remaining</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-9 w-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-all"
                                                    >
                                                        <MoreHorizontal size={18} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(story.id)}
                                                        className="h-9 w-9 rounded-full bg-rose-50 text-rose-400 hover:text-rose-600 hover:bg-rose-100 transition-all"
                                                    >
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
