import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { userService } from '../../services/userService';
import {
    UserCheck,
    UserX,
    Search,
    MoreVertical,
    Loader2,
    Mail,
    Shield,
    Filter,
    ArrowUpRight,
    Sparkles,
    Zap,
    TrendingUp,
    Bookmark
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
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminAuthors = () => {
    const { user: currentUser, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [allAuthors, setAllAuthors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!currentUser || !isAdmin) {
            if (!loading) navigate('/');
            return;
        }
        fetchData();
    }, [currentUser, isAdmin, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const authors = await userService.getProfilesByRole('author');
            setAllAuthors(authors || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            toast.error('Identity fetch protocol failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to revoke editorial privileges for "${name}"?`)) return;
        try {
            await userService.updateUserRole(id, 'reader');
            toast.success(`${name} has been reverted to standard node status`);
            fetchData();
        } catch (error) {
            toast.error('Privilege revocation failed');
        }
    };

    const filteredAuthors = allAuthors.filter(a =>
        (a.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (a.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Staff Premium Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-2xl shadow-indigo-600/30 group hover:rotate-6 transition-transform">
                        <Sparkles className="text-white h-10 w-10 animate-pulse" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 border-none font-black text-[9px] tracking-[2px]">STAFF DIRECTORY</Badge>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic font-serif">Verified Personnel</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2">
                            Editorial <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Roster.</span>
                        </h1>
                        <p className="text-slate-500 font-medium italic">Managing <span className="text-indigo-600 font-bold">{allAuthors.length} verified creators</span> across the platform.</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={() => navigate('/admin/approvals')}
                        size="lg"
                        className="h-14 px-10 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[11px] uppercase tracking-[3px] shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 group"
                    >
                        <UserCheck className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Validation Queue
                    </Button>
                </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Verified Staff', value: allAuthors.length, icon: <Shield className="h-5 w-5" />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    { label: 'Active Today', value: '84%', icon: <Zap className="h-5 w-5" />, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Growth Vector', value: '+12%', icon: <TrendingUp className="h-5 w-5" />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl shadow-indigo-600/5 bg-white dark:bg-slate-900 overflow-hidden group hover:scale-[1.03] transition-all duration-500">
                        <CardContent className="p-8 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">{stat.label}</p>
                                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stat.value}</p>
                            </div>
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform ${stat.bg} ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Current Authors Ledger */}
            <Card className="border-none shadow-3xl bg-white dark:bg-slate-900 overflow-hidden rounded-[2.5rem]">
                <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <CardTitle className="text-3xl font-black tracking-tight">Staff Archives</CardTitle>
                        <CardDescription className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-1 italic">Verified editorial personnel with platform clearance</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-max">
                        <div className="relative flex-1 lg:w-80">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by identity or liaison..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 rounded-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-14 shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all font-semibold"
                            />
                        </div>
                        <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 font-black text-[10px] uppercase tracking-widest text-slate-500 bg-white dark:bg-slate-800">
                            <Filter className="h-4 w-4 mr-2" /> Tier 1 Priority
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                                <TableRow className="border-none">
                                    <TableHead className="pl-10 font-black text-slate-400 uppercase text-[10px] tracking-widest py-6">Digital Identity</TableHead>
                                    <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Protocol Rank</TableHead>
                                    <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest text-center">Operational Status</TableHead>
                                    <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Temporal Log</TableHead>
                                    <TableHead className="text-right pr-10 font-black text-slate-400 uppercase text-[10px] tracking-widest">Management</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-80 text-center">
                                            <Loader2 className="h-12 w-12 animate-spin mx-auto text-indigo-600 opacity-20" />
                                            <p className="mt-4 text-[11px] font-black text-slate-400 uppercase tracking-[5px] italic animate-pulse">Syncing Personnel Data...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredAuthors.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-80 text-center text-slate-400 italic font-medium px-10 text-lg">
                                            The staff directory remains silent for this identity query.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <AnimatePresence>
                                        {filteredAuthors.map((author, index) => (
                                            <motion.tr
                                                key={author.id}
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.04 }}
                                                className="border-b border-slate-50 dark:border-slate-800/50 group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all cursor-default"
                                            >
                                                <TableCell className="pl-10 py-8">
                                                    <div className="flex items-center gap-5">
                                                        <Avatar className="h-14 w-14 ring-4 ring-white dark:ring-slate-800 shadow-xl transition-transform group-hover:scale-110">
                                                            <AvatarImage src={author.avatar_url} />
                                                            <AvatarFallback className="bg-indigo-600 text-white font-black text-lg">{author.name?.[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1.5 tracking-tight group-hover:text-indigo-600 transition-colors uppercase">{author.name}</span>
                                                            <div className="flex items-center gap-2">
                                                                <Mail size={12} className="text-indigo-400" />
                                                                <span className="text-xs font-bold text-slate-400 italic">{author.email}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border-none font-black text-[10px] tracking-[2px] px-3 h-6">
                                                        STAFF_UNIT_01
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex flex-col items-center">
                                                        <div className="flex items-center gap-2 text-[11px] font-black text-emerald-600 uppercase tracking-widest">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                            Operational
                                                        </div>
                                                        <span className="text-[9px] text-slate-400 font-bold mt-1 uppercase">Node Active</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-slate-600 dark:text-slate-400">
                                                            {new Date(author.created_at).toLocaleDateString()}
                                                        </span>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Verified Entry</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right pr-10 py-8">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-all shadow-sm border border-slate-100 dark:border-slate-700">
                                                                <MoreVertical size={20} />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-64 border-none shadow-3xl p-3 rounded-2xl bg-white dark:bg-slate-900">
                                                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 py-4 px-4">Identity Ops</DropdownMenuLabel>
                                                            <DropdownMenuItem className="rounded-xl py-4 px-4 focus:bg-indigo-50 dark:focus:bg-indigo-900/40 cursor-pointer">
                                                                <Bookmark size={16} className="mr-3 text-indigo-500" />
                                                                <div className="flex flex-col">
                                                                    <span className="font-bold text-sm">Staff Evaluation</span>
                                                                    <span className="text-[10px] text-slate-400 font-medium">Review contribution history</span>
                                                                </div>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-slate-50 dark:bg-slate-800 my-2 mx-1" />
                                                            <DropdownMenuItem
                                                                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/40 rounded-xl py-4 px-4 cursor-pointer"
                                                                onClick={() => handleRemove(author.id, author.name)}
                                                            >
                                                                <UserX size={16} className="mr-3" />
                                                                <div className="flex flex-col">
                                                                    <span className="font-bold text-sm">Revoke Staff Role</span>
                                                                    <span className="text-[10px] text-rose-400 font-medium italic">Revert to standard node</span>
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

            {/* Platform Engagement Context */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                <Card className="lg:col-span-2 border-none shadow-2xl bg-slate-900 text-white rounded-[2.5rem] overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                        <Shield size={160} />
                    </div>
                    <CardContent className="p-12 relative z-10">
                        <Badge className="bg-indigo-600 text-white border-none font-black text-[9px] tracking-[2px] mb-6">STAFF_ADVISORY</Badge>
                        <h2 className="text-4xl font-black tracking-tighter leading-tight mb-6">
                            Verified editorial personnel maintain the highest standards of platform integrity.
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {allAuthors.slice(0, 5).map((a, i) => (
                                    <Avatar key={i} className="h-10 w-10 ring-4 ring-slate-900">
                                        <AvatarImage src={a.avatar_url} />
                                        <AvatarFallback className="bg-indigo-600 text-white text-[10px]">{a.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[2px] text-indigo-400">Genesis Staff Network</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-slate-100 dark:border-slate-800">
                    <div className="h-16 w-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <ArrowUpRight className="text-slate-400" />
                    </div>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none mb-2">Network Expansion</p>
                    <p className="text-[11px] text-slate-400 font-medium italic">Monitor global reach and editorial impact metrics from the analytics node.</p>
                </Card>
            </div>
        </div>
    );
};
