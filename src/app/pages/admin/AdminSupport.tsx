import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { LifeBuoy, Loader2, CheckCircle, Search, Filter, MessageCircle, AlertCircle, Clock, ShieldCheck, Mail, ChevronRight } from 'lucide-react';
import { supportService } from '../../services/supportService';
import { toast } from 'sonner';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

export const AdminSupport = () => {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const data = await supportService.getTickets();
            setTickets(data || []);
        } catch (error) {
            toast.error('Failed to load support tickets');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await supportService.updateTicketStatus(id, status);
            toast.success(`Ticket marked as ${status}`);
            fetchTickets();
        } catch (error) {
            toast.error('Failed to update ticket');
        }
    };

    const getStatusBadge = (status: string) => {
        const s = status?.toLowerCase();
        switch (s) {
            case 'resolved':
                return <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-none font-bold text-[10px] tracking-widest px-2.5 h-5">RESOLVED</Badge>;
            case 'closed':
                return <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-none font-bold text-[10px] tracking-widest px-2.5 h-5">CLOSED</Badge>;
            case 'in-progress':
                return <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-none font-bold text-[10px] tracking-widest px-2.5 h-5">ACTIVE</Badge>;
            default:
                return <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-none font-bold text-[10px] tracking-widest px-2.5 h-5 animate-pulse">PENDING</Badge>;
        }
    };

    const getPriorityColor = (priority: string) => {
        const p = priority?.toLowerCase();
        if (p === 'high' || p === 'urgent') return 'text-rose-600 bg-rose-50 dark:bg-rose-950/30';
        if (p === 'medium') return 'text-amber-600 bg-amber-50 dark:bg-amber-950/30';
        return 'text-slate-500 bg-slate-50 dark:bg-slate-800/50';
    };

    const filteredTickets = tickets.filter(t =>
        (t.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (t.profiles?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <LifeBuoy className="text-indigo-600 h-8 w-8" />
                        Command Center Support
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Resolve user disputes, technical issues, and platform inquiries</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <Avatar key={i} className="h-9 w-9 border-4 border-white dark:border-slate-950 ring-2 ring-indigo-500/20">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Support${i}`} />
                            </Avatar>
                        ))}
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Agents Online</p>
                        <p className="text-sm font-black text-emerald-600 tracking-tight flex items-center justify-end gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Active Duty
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Unresolved', count: tickets.filter(t => t.status !== 'resolved').length, icon: <AlertCircle size={18} />, color: 'text-amber-600' },
                    { label: 'Avg Resolution', count: '4.2h', icon: <Clock size={18} />, color: 'text-indigo-600' },
                    { label: 'Total Tickets', value: tickets.length, icon: <MessageCircle size={18} />, color: 'text-slate-600' },
                    { label: 'User Satisfaction', count: '98%', icon: <ShieldCheck size={18} />, color: 'text-emerald-600' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-md bg-white dark:bg-slate-900">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.count || stat.value}</p>
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
                            <CardTitle className="text-xl">Support Pipeline</CardTitle>
                            <CardDescription>Live stream of incoming help requests</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-max">
                            <div className="relative flex-1 lg:w-72">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by subject or user..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-10 shadow-sm"
                                />
                            </div>
                            <Button variant="outline" className="rounded-xl border-slate-200 h-10 font-bold text-xs uppercase tracking-widest text-slate-500">
                                <Filter className="h-4 w-4 mr-2" /> All Channels
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                                <TableRow className="border-none">
                                    <TableHead className="pl-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest py-4">Requestor Profile</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Inquiry Details</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Urgency</TableHead>
                                    <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Status</TableHead>
                                    <TableHead className="text-right pr-6 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Resolution</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <Loader2 className="h-10 w-10 animate-spin mx-auto text-indigo-600 opacity-30" />
                                            <p className="text-xs font-black text-slate-400 mt-4 uppercase tracking-widest italic">Decrypting Encrypted Feedback...</p>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredTickets.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-64 text-center text-slate-400 italic font-medium px-8">
                                            Platform is stable. No active support requests detected.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredTickets.map((ticket) => (
                                        <TableRow key={ticket.id} className="group hover:bg-slate-50/10 dark:hover:bg-slate-800/50 transition-colors border-slate-50 dark:border-slate-800/50">
                                            <TableCell className="pl-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-slate-800 shadow-sm border border-slate-100 dark:border-slate-800">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${ticket.profiles?.id}`} />
                                                        <AvatarFallback className="bg-slate-100 text-slate-700 font-bold text-xs">{ticket.profiles?.name?.[0] || '?'}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{ticket.profiles?.name || 'Anonymous User'}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                                                            <Mail size={10} /> {ticket.profiles?.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-5 max-w-[300px]">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-slate-900 dark:text-white line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">{ticket.subject}</span>
                                                    <p className="text-xs text-slate-500 font-medium line-clamp-1 italic">"{ticket.message}"</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center py-5">
                                                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[1px] ${getPriorityColor(ticket.priority)}`}>
                                                    {ticket.priority || 'NORMAL'} PRIORITY
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-5">{getStatusBadge(ticket.status)}</TableCell>
                                            <TableCell className="text-right pr-6 py-5">
                                                <div className="flex items-center justify-end gap-2 outline-none">
                                                    {ticket.status !== 'resolved' && (
                                                        <Button
                                                            onClick={() => handleStatusUpdate(ticket.id, 'resolved')}
                                                            className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
                                                        >
                                                            <CheckCircle className="h-3.5 w-3.5 mr-2" />
                                                            Close Ticket
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-all"
                                                    >
                                                        <ChevronRight size={18} />
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
                <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white overflow-hidden rounded-2xl relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <AlertCircle size={100} />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-indigo-200 text-[10px] font-black uppercase tracking-[4px]">System Integrity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-black mb-2">Zero Critical Outages</p>
                        <p className="text-indigo-100/70 text-sm leading-relaxed max-w-xs font-medium italic">Our current uptime is 99.98%. Support load is within nominal parameters for this cycle.</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-white dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center p-8 rounded-2xl">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700 shadow-sm">
                            <ShieldCheck className="text-indigo-600" />
                        </div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Staff Portal Access</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1 italic">Verified administrative clearance required</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
