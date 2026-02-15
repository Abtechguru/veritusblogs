import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
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
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  Search,
  MoreVertical,
  Mail,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Trash2,
  UserCheck,
  ArrowUpRight,
  Fingerprint,
  Activity,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { userService } from '../../services/userService';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '../../components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';

export const AdminUsers = () => {
  const { user: currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    if (!currentUser || !isAdmin) {
      if (!loading) navigate('/');
      return;
    }
    fetchUsers();
  }, [currentUser, isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllProfiles();
      setUsers(data || []);
    } catch (error) {
      console.error('Failed to fetch identities:', error);
      toast.error('Identity fetch protocol failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      await userService.updateUserRole(userId, newRole);
      toast.success(`Identity permissions escalated to ${newRole.toUpperCase()}`);
      fetchUsers();
    } catch (error) {
      toast.error('Privilege escalation failed');
    }
  };

  const handleDeleteUser = async (userId: string, name: string) => {
    if (!confirm(`Are you sure you want to redact "${name}" from the network?`)) return;
    try {
      await userService.deleteUser(userId);
      toast.success('Identity purged from archives');
      fetchUsers();
    } catch (error) {
      toast.error('Redaction protocol failed');
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = (u.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const r = role?.toLowerCase();
    switch (r) {
      case 'admin':
        return (
          <Badge className="bg-rose-500 text-white border-none font-black text-[10px] tracking-widest px-2 h-5 shadow-lg shadow-rose-500/20">
            <ShieldAlert className="h-3 w-3 mr-1" /> ADMIN_ROOT
          </Badge>
        );
      case 'author':
        return (
          <Badge className="bg-indigo-600 text-white border-none font-black text-[10px] tracking-widest px-2 h-5 shadow-lg shadow-indigo-600/20">
            <ShieldCheck className="h-3 w-3 mr-1" /> CREATOR
          </Badge>
        );
      case 'pending-author':
      case 'pending_author':
        return (
          <Badge className="bg-amber-500 text-white border-none font-black text-[10px] tracking-widest px-2 h-5 shadow-lg shadow-amber-500/20">
            <Activity className="h-3 w-3 mr-1 animate-pulse" /> PENDING_STAFF
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-500 font-black text-[10px] tracking-widest px-2 h-5 uppercase">
            READER_NODE
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/30 group">
            <Users className="h-7 w-7 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tighter">
              Identity Registry
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium italic leading-relaxed">Platform-wide user protocol management</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-indigo-100 dark:border-indigo-800 shadow-sm leading-none h-fit w-fit">
          <Fingerprint size={12} className="mr-2" /> ENCRYPTED NODE ACCESS
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Total Nodes', count: users.length, icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Root Admins', count: users.filter(u => u.role === 'admin').length, icon: <ShieldAlert />, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Platform Creators', count: users.filter(u => u.role === 'author').length, icon: <Zap />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Operational Health', count: '99.9%', icon: <Activity />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-indigo-600/5 bg-white dark:bg-slate-900 overflow-hidden group hover:scale-[1.03] transition-all duration-500">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stat.count}</p>
              </div>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Identity Ledger Card */}
      <Card className="border-none shadow-3xl bg-white dark:bg-slate-900 overflow-hidden rounded-[2rem]">
        <CardHeader className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <CardTitle className="text-2xl font-black tracking-tight">Identity Ledger</CardTitle>
              <CardDescription className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-1 italic">Reviewing digital signatures and access levels</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-max">
              <div className="relative flex-1 lg:w-72">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by identity or liaison..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 rounded-2xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-12 shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all font-semibold"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-xs uppercase tracking-widest text-slate-500">
                  <SelectValue placeholder="Protocol Rank" />
                </SelectTrigger>
                <SelectContent className="border-none shadow-2xl rounded-xl">
                  <SelectItem value="all" className="font-bold">ALL PROTOCOLS</SelectItem>
                  <SelectItem value="admin" className="font-bold text-rose-600">ROOT_ADMIN</SelectItem>
                  <SelectItem value="author" className="font-bold text-indigo-600">CREATOR</SelectItem>
                  <SelectItem value="reader" className="font-bold text-slate-500">READER_NODE</SelectItem>
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
                  <TableHead className="pl-8 font-black text-slate-400 uppercase text-[10px] tracking-widest py-5">Digital Identity</TableHead>
                  <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Digital Liaison</TableHead>
                  <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Protocol Rank</TableHead>
                  <TableHead className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Entry Date</TableHead>
                  <TableHead className="text-right pr-8 font-black text-slate-400 uppercase text-[10px] tracking-widest">Redaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center">
                      <Loader2 className="h-10 w-10 animate-spin mx-auto text-indigo-600 opacity-20" />
                      <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[4px] italic animate-pulse">Syncing User Archives...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center text-slate-400 italic font-medium">
                      No identities detected matching this protocol.
                    </TableCell>
                  </TableRow>
                ) : (
                  <AnimatePresence>
                    {filteredUsers.map((u, index) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-slate-50 dark:border-slate-800/50 group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all cursor-default"
                      >
                        <TableCell className="pl-8 py-6">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 ring-4 ring-white dark:ring-slate-800 shadow-lg transition-transform group-hover:scale-110">
                              <AvatarImage src={u.avatar_url} />
                              <AvatarFallback className="bg-indigo-600 text-white font-black">{u.name?.[0] || '?'}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-base font-black text-slate-900 dark:text-white leading-none mb-1.5 tracking-tight">{u.name || 'Anonymous Node'}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic leading-none">Node_{u.id.slice(0, 8).toUpperCase()}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                              <Mail size={12} className="text-indigo-400" />
                              {u.email}
                            </span>
                            <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter mt-1 italic">Verified Liaison Email</span>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(u.role)}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-600 dark:text-slate-400">
                              {new Date(u.created_at).toLocaleDateString()}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Initial Genesis</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <div className="flex items-center justify-end gap-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all group/btn">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-64 border-none shadow-3xl p-3 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
                                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 py-4 px-4">Protocol Overrides</DropdownMenuLabel>

                                <DropdownMenuItem
                                  className="rounded-xl py-3 px-4 focus:bg-indigo-50 dark:focus:bg-indigo-900/40 group/item cursor-pointer"
                                  onClick={() => handleUpdateRole(u.id, u.role === 'admin' ? 'reader' : 'admin')}
                                >
                                  <Shield className={`mr-3 h-4 w-4 ${u.role === 'admin' ? 'text-slate-400' : 'text-rose-500'}`} />
                                  <div className="flex flex-col">
                                    <span className="font-bold text-sm">{u.role === 'admin' ? 'Demote from Root' : 'Escalate to Root'}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">Administrator privileges</span>
                                  </div>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  className="rounded-xl py-3 px-4 focus:bg-indigo-50 dark:focus:bg-indigo-900/40 group/item cursor-pointer"
                                  onClick={() => handleUpdateRole(u.id, u.role === 'author' ? 'reader' : 'author')}
                                >
                                  <UserCheck className={`mr-3 h-4 w-4 ${u.role === 'author' ? 'text-slate-400' : 'text-indigo-600'}`} />
                                  <div className="flex flex-col">
                                    <span className="font-bold text-sm">{u.role === 'author' ? 'Demote from Creator' : 'Escalate to Creator'}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">Editorial clearance granted</span>
                                  </div>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-slate-50 dark:bg-slate-800 my-2 mx-1" />

                                <DropdownMenuItem
                                  className="rounded-xl py-3 px-4 focus:bg-rose-50 dark:focus:bg-rose-950/40 text-rose-600 dark:text-rose-400 group/item cursor-pointer"
                                  onClick={() => handleDeleteUser(u.id, u.name)}
                                >
                                  <Trash2 className="mr-3 h-4 w-4 group-hover/item:scale-110 transition-transform" />
                                  <div className="flex flex-col">
                                    <span className="font-bold text-sm">Purge Identity</span>
                                    <span className="text-[10px] text-rose-400 font-medium italic">Permanent redaction</span>
                                  </div>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="p-6 bg-slate-50/30 dark:bg-slate-800/20 border-t border-slate-50 dark:border-slate-800 flex justify-center">
            <Button variant="ghost" className="text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-[4px] h-10 group">
              Full Archival Records <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Insight Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-[2.5rem] overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-150 transition-transform duration-1000 rotate-12">
            <Activity size={140} />
          </div>
          <CardContent className="p-10 relative z-10">
            <Badge className="bg-white/20 text-white border-none font-black text-[9px] tracking-[2px] mb-6">SECURITY ADVISORY</Badge>
            <h3 className="text-2xl font-black tracking-tight leading-tight mb-4 italic">"Root access must be periodically audited to maintain 100% network integrity."</h3>
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-10 bg-white/30" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Genesis Protocol v4.0</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl bg-slate-900 border border-slate-800 flex items-center justify-center p-8 rounded-[2.5rem]">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-2xl">
              <Activity className="text-emerald-500 animate-pulse" />
            </div>
            <p className="text-lg font-black text-white tracking-tight">Identity Nexus Online</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[3px] mt-2 italic">Monitoring 42 active node connections</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
