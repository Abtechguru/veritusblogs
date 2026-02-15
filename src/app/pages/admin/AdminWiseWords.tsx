import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Search, Trash2, Edit, Plus, Loader2, Quote, Lightbulb, Library, Sparkles, Filter, MoreVertical, Heart, Hash } from 'lucide-react';
import { toast } from 'sonner';
import { wiseWordService, WiseWord } from '../../services/wiseWordService';
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
import { Badge } from '../../components/ui/badge';

export const AdminWiseWords = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [words, setWords] = useState<WiseWord[]>([]);
    const [loading, setLoading] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newWord, setNewWord] = useState({
        quote: '',
        author: '',
        category: 'Wisdom'
    });

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        setLoading(true);
        try {
            const data = await wiseWordService.getWiseWords();
            setWords(data || []);
        } catch (error) {
            console.error('Failed to fetch wise words:', error);
            toast.error('Failed to load platform quotes');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            setLoading(true);
            await wiseWordService.createWiseWord(newWord);
            toast.success('Proverb recorded in archives!');
            setIsCreateOpen(false);
            setNewWord({ quote: '', author: '', category: 'Wisdom' });
            fetchWords();
        } catch (error) {
            toast.error('Failed to record wisdom');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this piece of wisdom?')) return;
        try {
            await wiseWordService.deleteWiseWord(id);
            toast.success('Quote removed from rotation');
            fetchWords();
        } catch (error) {
            toast.error('Failed to delete quote');
        }
    };

    const filteredWords = words.filter((word) =>
        (word.quote?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (word.author?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <Quote className="text-amber-500 h-8 w-8 fill-amber-500" />
                        Africa Wise Words
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Curate ancestral proverbs, daily wisdom and influential quotes</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-6 shadow-lg shadow-amber-500/20 transition-all active:scale-95 border-none">
                            <Plus className="mr-2 h-4 w-4" />
                            Record New Wisdom
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-2xl p-0 overflow-hidden">
                        <DialogHeader className="p-6 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                            <DialogTitle className="text-xl font-black flex items-center gap-2">
                                <Library size={20} className="text-amber-500" /> Wisdom Registry
                            </DialogTitle>
                            <DialogDescription className="font-medium italic">Document a new proverb or influential narrative</DialogDescription>
                        </DialogHeader>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="quote" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Narrative Insight (Quote)</Label>
                                    <Textarea
                                        id="quote"
                                        placeholder="Enter the profound narrative insight..."
                                        value={newWord.quote}
                                        onChange={e => setNewWord({ ...newWord, quote: e.target.value })}
                                        className="rounded-xl min-h-[120px] border-slate-200 dark:border-slate-700 font-serif text-lg leading-relaxed italic"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="author" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity Origin</Label>
                                        <Input
                                            id="author"
                                            placeholder="e.g. Igbo Proverb"
                                            value={newWord.author}
                                            onChange={e => setNewWord({ ...newWord, author: e.target.value })}
                                            className="rounded-xl h-11 border-slate-200 dark:border-slate-700 font-semibold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Taxonomy (Category)</Label>
                                        <Input
                                            id="category"
                                            placeholder="e.g. Leadership"
                                            value={newWord.category}
                                            onChange={e => setNewWord({ ...newWord, category: e.target.value })}
                                            className="rounded-xl h-11 border-slate-200 dark:border-slate-700 font-semibold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="p-6 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
                            <Button variant="ghost" onClick={() => setIsCreateOpen(false)} className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-11 px-6 text-slate-400">Abort</Button>
                            <Button onClick={handleCreate} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-11 px-8 shadow-xl shadow-amber-500/20">
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Commit to Archive'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Archived Proberbs', count: words.length, icon: <Library size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Platform Enlightenment', count: words.reduce((acc, w) => acc + (w.likes || 0), 0), icon: <Sparkles size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Categorized Themes', count: new Set(words.map(w => w.category)).size, icon: <Hash size={18} />, color: 'text-slate-600', bg: 'bg-slate-50' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-md bg-white dark:bg-slate-900 overflow-hidden relative">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${stat.color.replace('text', 'bg')}`} />
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`h-11 w-11 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{stat.count}</p>
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
                            <CardTitle className="text-xl">Wisdom Repository</CardTitle>
                            <CardDescription>Comprehensive log of platform-wide insights</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-max">
                            <div className="relative flex-1 lg:w-72">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by quote or author..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-10 shadow-sm"
                                />
                            </div>
                            <Button variant="outline" className="rounded-xl border-slate-200 h-10 font-bold text-xs uppercase tracking-widest text-slate-500">
                                <Filter className="h-4 w-4 mr-2" /> Recent Insights
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                                <TableRow className="border-none">
                                    <TableHead className="pl-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest py-4">Narrative Insight</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Origin Source</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Taxonomy</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Affinity</TableHead>
                                    <TableHead className="text-right pr-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading && words.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <Loader2 className="h-10 w-10 animate-spin mx-auto text-amber-500 opacity-30" />
                                            <p className="text-xs font-black text-slate-400 mt-4 uppercase tracking-widest italic">Decrypting Archives...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredWords.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center text-slate-400 italic font-medium px-8">
                                            The archive is currently silent for your search criteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredWords.map((word) => (
                                        <TableRow key={word.id} className="group hover:bg-amber-50/10 dark:hover:bg-amber-950/10 transition-colors border-slate-50 dark:border-slate-800/50">
                                            <TableCell className="pl-6 py-5 max-w-md">
                                                <div className="relative">
                                                    <Quote className="absolute -left-5 -top-2 h-4 w-4 text-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic animate-in fade-in slide-in-from-left-2 duration-300">
                                                        "{word.quote}"
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
                                                        <Lightbulb size={12} className="text-amber-500" />
                                                    </div>
                                                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-tight">{word.author || 'Anonymous'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-5">
                                                <Badge variant="outline" className="border-slate-200 dark:border-slate-700 text-[9px] font-black uppercase tracking-wider text-slate-500 bg-white dark:bg-slate-900 group-hover:border-amber-500/30 transition-colors">
                                                    {word.category || 'General'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center py-5">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center gap-1.5 text-xs font-black text-rose-500">
                                                        <Heart size={12} className="fill-rose-500" /> {word.likes || 0}
                                                    </div>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Affinity Nodes</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-6 py-5">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-amber-600 transition-all shadow-sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(word.id)} className="h-9 w-9 rounded-full bg-rose-50 text-rose-400 hover:text-rose-600 hover:bg-rose-100 transition-all">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
                <Card className="border-none shadow-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white overflow-hidden rounded-2xl relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform rotate-12">
                        <Quote size={120} />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-amber-200 text-[10px] font-black uppercase tracking-[4px]">Daily Reflection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-black mb-2 font-serif italic">"Smooth seas do not make skillful sailors."</p>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="h-px w-8 bg-amber-200" />
                            <p className="text-amber-100/70 text-xs font-black uppercase tracking-widest">African Proverb</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-slate-900 border-dashed border-2 border-slate-700 flex items-center justify-center p-8 rounded-2xl">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-sm">
                            <Sparkles className="text-amber-500" />
                        </div>
                        <p className="text-sm font-black text-white uppercase tracking-widest">Wisdom Analytics</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1 italic">Engagement peak: 08:00 UTC - 10:00 UTC</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
