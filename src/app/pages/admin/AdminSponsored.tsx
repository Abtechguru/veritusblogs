import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { articleService } from '../../services/articleService';
import {
    DollarSign,
    Search,
    MoreVertical,
    Loader2,
    TrendingUp,
    ExternalLink,
    Plus,
    X,
    Filter,
    Calendar,
    Eye,
    Target,
    Zap,
    Briefcase,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from '../../components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export const AdminSponsored = () => {
    const [sponsoredArticles, setSponsoredArticles] = useState<any[]>([]);
    const [allArticles, setAllArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sponsoredBy, setSponsoredBy] = useState('');
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await articleService.getArticles();
            if (data) {
                setSponsoredArticles(data.filter((a: any) => a.is_sponsored));
                setAllArticles(data.filter((a: any) => !a.is_sponsored && a.status === 'published'));
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to sync sponsorship data');
        } finally {
            setLoading(false);
        }
    };

    const handleMakeSponsored = async () => {
        if (!selectedArticleId || !sponsoredBy) {
            toast.error('Selection and Sponsor metadata required');
            return;
        }
        try {
            setLoading(true);
            await articleService.updateArticle(selectedArticleId, {
                is_sponsored: true,
                sponsored_by: sponsoredBy
            } as any);
            toast.success('Monetization layer applied successfully');
            setIsAddOpen(false);
            setSponsoredBy('');
            setSelectedArticleId(null);
            fetchData();
        } catch (error) {
            toast.error('Failed to inject sponsorship layer');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveSponsored = async (id: string) => {
        if (!confirm('End this commercial partnership content?')) return;
        try {
            await articleService.updateArticle(id, {
                is_sponsored: false,
                sponsored_by: null
            } as any);
            toast.success('Sponsorship contract terminated');
            fetchData();
        } catch (error) {
            toast.error('Failed to update revenue status');
        }
    };

    const filteredSponsored = sponsoredArticles.filter(a =>
        (a.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (a.sponsored_by?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <DollarSign className="text-emerald-600 h-8 w-8" />
                        Commercial Inventory
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Monitor revenue-generating content and sponsorship partnerships</p>
                </div>

                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
                            <Plus className="h-4 w-4 mr-2" />
                            Provision New Sponsor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-2xl p-0 overflow-hidden">
                        <DialogHeader className="p-6 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
                            <DialogTitle className="text-xl font-black flex items-center gap-2">
                                <Zap size={20} className="text-amber-500 fill-amber-500" /> Monetization Entry
                            </DialogTitle>
                            <DialogDescription className="font-medium italic">Link a commercial entity to a live publication</DialogDescription>
                        </DialogHeader>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Live Asset</Label>
                                <select
                                    className="w-full h-11 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-semibold transition-all"
                                    value={selectedArticleId || ''}
                                    onChange={(e) => setSelectedArticleId(e.target.value)}
                                >
                                    <option value="">Choose an eligible article...</option>
                                    {allArticles.map(a => (
                                        <option key={a.id} value={a.id}>{a.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Sponsoring Entity (Brand)</Label>
                                <Input
                                    placeholder="e.g. Globacom, MTN, Zenith Bank..."
                                    value={sponsoredBy}
                                    onChange={(e) => setSponsoredBy(e.target.value)}
                                    className="rounded-xl h-11 border-slate-200 dark:border-slate-700 font-semibold shadow-sm"
                                />
                            </div>
                        </div>
                        <DialogFooter className="p-6 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
                            <Button variant="ghost" onClick={() => setIsAddOpen(false)} className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-11 px-6 text-slate-400">Abort</Button>
                            <Button onClick={handleMakeSponsored} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-11 px-8 shadow-xl shadow-emerald-600/20">
                                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Activate Sponsorship'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Campaigns', count: sponsoredArticles.length, icon: <Target size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Brand Partners', count: new Set(sponsoredArticles.map(a => a.sponsored_by)).size, icon: <Briefcase size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'CTR Index', count: '14.2%', icon: <ArrowUpRight size={18} />, color: 'text-rose-600', bg: 'bg-rose-50' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-md bg-white dark:bg-slate-900 border-l-4 border-emerald-500">
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
                            <CardTitle className="text-xl">Monetization Feed</CardTitle>
                            <CardDescription>Live tracking of all commercialized publications</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-max">
                            <div className="relative flex-1 lg:w-72">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search campaigns or partners..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-10 shadow-sm"
                                />
                            </div>
                            <Button variant="outline" className="rounded-xl border-slate-200 h-10 font-bold text-xs uppercase tracking-widest text-slate-500">
                                <Filter className="h-4 w-4 mr-2" /> Revenue Log
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                                <TableRow className="border-none">
                                    <TableHead className="pl-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest py-4">Commercial Asset</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Sponsoring Brand</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Engagement Efficiency</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Live Status</TableHead>
                                    <TableHead className="text-right pr-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading && sponsoredArticles.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <Loader2 className="h-10 w-10 animate-spin mx-auto text-emerald-600 opacity-30" />
                                            <p className="text-xs font-black text-slate-400 mt-4 uppercase tracking-widest italic">Syncing Revenue Nodes...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredSponsored.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center text-slate-400 italic font-medium">
                                            No active sponsorship campaigns detected in this view.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredSponsored.map((item) => (
                                        <TableRow key={item.id} className="group hover:bg-emerald-50/10 transition-colors border-slate-50 dark:border-slate-800/50">
                                            <TableCell className="pl-6 py-5">
                                                <div className="flex flex-col max-w-[320px]">
                                                    <p className="font-black text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 transition-colors truncate" title={item.title}>
                                                        {item.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <Calendar size={12} className="text-slate-300" />
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Campaign Start: {new Date(item.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 px-3 h-6 border-none font-black text-[10px] tracking-[1px] uppercase">
                                                    {item.sponsored_by}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-black text-slate-900 dark:text-white">{(item.views || 0).toLocaleString()} <span className="text-slate-400 font-medium">units</span></span>
                                                        <div className="flex items-center text-[10px] font-black text-emerald-500 gap-0.5">
                                                            <ArrowUpRight size={12} />
                                                            8%
                                                        </div>
                                                    </div>
                                                    <div className="w-32 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-emerald-500 w-[74%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active Duty</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-6 py-5">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-600 transition-all shadow-sm">
                                                        <ExternalLink size={16} />
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                                                                <MoreVertical size={18} />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-56 border-none shadow-2xl p-2 rounded-2xl">
                                                            <DropdownMenuLabel className="text-[10px] uppercase tracking-[2px] text-slate-400 py-3 px-3">Campaign Management</DropdownMenuLabel>
                                                            <DropdownMenuItem className="rounded-xl py-3 group">
                                                                <TrendingUp size={16} className="mr-3 text-indigo-500 group-hover:scale-110 transition-transform" />
                                                                <span className="font-bold text-sm">Audience Insights</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800 mx-2" />
                                                            <DropdownMenuItem
                                                                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30 rounded-xl py-3 group"
                                                                onClick={() => handleRemoveSponsored(item.id)}
                                                            >
                                                                <X size={16} className="mr-3 group-hover:scale-110 transition-transform" />
                                                                <div className="flex flex-col text-left">
                                                                    <span className="font-bold text-sm">Terminate Campaign</span>
                                                                    <span className="text-[10px] text-rose-400 font-medium">Remove sponsorship layer</span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
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
                <Card className="border-none shadow-xl bg-slate-900 border-emerald-500/20 border flex items-center p-8 rounded-3xl overflow-hidden relative">
                    <div className="absolute -right-12 -bottom-12 h-64 w-64 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="relative z-10 flex items-center gap-6 w-full">
                        <div className="h-16 w-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-emerald-500/20">
                            <TrendingUp size={32} />
                        </div>
                        <div>
                            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[3px] mb-1">Growth Forecast</p>
                            <p className="text-white text-xl font-black mb-1">+24% Commercial Projection</p>
                            <p className="text-slate-400 text-xs font-medium max-w-sm">Partnership inquiries have increased by 12% this week. Optimal window for new campaign provisioning remains open.</p>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-xl bg-white dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center p-8 rounded-3xl group cursor-pointer hover:border-indigo-500 transition-colors">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700 shadow-sm transition-transform group-hover:scale-110">
                            <Briefcase className="text-indigo-600" />
                        </div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Partner Relations</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1 italic flex items-center justify-center gap-1">
                            Access CRM Gateway <ChevronRight size={10} />
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
