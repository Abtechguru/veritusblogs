import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Trash2, Loader2, User, MessageSquare, ExternalLink, Calendar, Search, Filter } from 'lucide-react';
import { commentService } from '../../services/commentService';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';

export const AdminComments = () => {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const data = await commentService.getComments();
            setComments(data || []);
        } catch (error) {
            toast.error('Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;
        try {
            await commentService.deleteComment(id);
            toast.success('Comment deleted');
            fetchComments();
        } catch (error) {
            toast.error('Failed to delete comment');
        }
    };

    const filteredComments = comments.filter(c =>
        (c.content?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (c.profiles?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <MessageSquare className="text-indigo-600 h-8 w-8" />
                        Engagement Moderation
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Monitor and manage user discussion across the platform</p>
                </div>
            </div>

            <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden rounded-2xl">
                <CardHeader className="bg-slate-50/30 dark:bg-slate-800/20 border-b border-slate-50 dark:border-slate-800">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">Platform Comments</CardTitle>
                            <CardDescription>Live feed of audience reactions</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-max">
                            <div className="relative flex-1 lg:w-72">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search content or users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-10 shadow-sm"
                                />
                            </div>
                            <Button variant="outline" className="rounded-xl border-slate-200 h-10 font-bold text-xs uppercase tracking-widest text-slate-500">
                                <Filter className="h-4 w-4 mr-2" /> Recent First
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                                <TableRow className="border-none">
                                    <TableHead className="pl-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest py-4 w-[220px]">Audience Member</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Comment Narrative</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest py-4">Article Reference</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Time Stamp</TableHead>
                                    <TableHead className="text-right pr-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <Loader2 className="h-10 w-10 animate-spin mx-auto text-indigo-600 opacity-30" />
                                            <p className="text-xs font-black text-slate-400 mt-4 uppercase tracking-widest italic">Syncing Discussions...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredComments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center text-slate-400 italic font-medium">
                                            No discourse detected in this view.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredComments.map((comment, idx) => (
                                        <TableRow key={comment.id} className="group hover:bg-rose-50/10 dark:hover:bg-rose-950/10 transition-colors border-slate-50 dark:border-slate-800/50">
                                            <TableCell className="pl-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 ring-2 ring-white dark:ring-slate-800 shadow-sm transition-transform group-hover:scale-110">
                                                        <AvatarImage src={comment.profiles?.avatar_url} />
                                                        <AvatarFallback className="bg-slate-100 text-slate-700 font-bold text-xs">{comment.profiles?.name?.[0] || '?'}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1 line-clamp-1">{comment.profiles?.name || 'Anonymous User'}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Contributor</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-md py-4">
                                                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors capitalize">
                                                    {comment.content}
                                                </p>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 line-clamp-1 italic max-w-[200px]">
                                                        {comment.articles?.title || 'System Broadcast'}
                                                    </span>
                                                    <div className="flex items-center text-[9px] text-slate-400 font-black uppercase tracking-tighter cursor-pointer hover:text-indigo-600">
                                                        View Page <ExternalLink size={10} className="ml-1" />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                                        <Calendar size={12} className="text-slate-300" />
                                                        {new Date(comment.created_at).toLocaleDateString()}
                                                    </span>
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter ml-4.5">Digital Entry</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-6 py-4">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(comment.id)}
                                                    className="h-9 w-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all shadow-sm"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
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
