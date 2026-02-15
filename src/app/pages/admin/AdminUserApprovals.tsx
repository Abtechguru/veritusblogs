import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircle, XCircle, Clock, Loader2, ShieldCheck, Mail, Calendar, UserPlus, Filter, Search } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { userService } from '../../services/userService';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';

export const AdminUserApprovals = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [pendingAuthors, setPendingAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || !isAdmin) {
      if (!loading) navigate('/');
      return;
    }
    fetchPendingAuthors();
  }, [user, isAdmin, navigate]);

  const fetchPendingAuthors = async () => {
    setLoading(true);
    try {
      // Trying both roles just in case there's a discrepancy in naming
      const data = await userService.getProfilesByRole('pending-author');
      const dataUnderscore = await userService.getProfilesByRole('pending_author');

      const combined = [...(data || []), ...(dataUnderscore || [])];
      // Remove duplicates by ID
      const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());

      const mapped = unique.map((p: any) => ({
        userId: p.id,
        name: p.name || 'Unknown Identity',
        email: p.email,
        requestedAt: p.updated_at || p.created_at,
        avatar: p.avatar_url,
        bio: p.bio || 'No bio provided'
      })) || [];

      setPendingAuthors(mapped);
    } catch (error) {
      console.error('Fetch pending authors error:', error);
      toast.error('Failed to sync validation queue');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      await userService.updateUserRole(selectedUser.userId, 'author');
      toast.success(`${selectedUser.name} authorized as Platform Creator`);
      fetchPendingAuthors();
    } catch (error) {
      toast.error('Authorization failed');
    } finally {
      setSelectedUser(null);
      setAction(null);
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      await userService.updateUserRole(selectedUser.userId, 'reader');
      toast.success(`${selectedUser.name}'s request dismissed`);
      fetchPendingAuthors();
    } catch (error) {
      toast.error('Dismissal failed');
    } finally {
      setSelectedUser(null);
      setAction(null);
      setLoading(false);
    }
  };

  const filteredApprovals = pendingAuthors.filter(a =>
    (a.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (a.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="text-indigo-600 h-8 w-8" />
            Validation Queue
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">High-fidelity review of prospective platform contributors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-md bg-white dark:bg-slate-900 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <UserPlus size={80} />
          </div>
          <CardContent className="p-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Pending Clearances</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{pendingAuthors.length}</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded w-fit">
              <Clock size={12} /> Priority Evaluation
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-indigo-600 text-white overflow-hidden relative">
          <CardContent className="p-6">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest leading-none mb-2">Growth Vector</p>
            <p className="text-3xl font-black text-white">+12%</p>
            <p className="text-[10px] text-indigo-100 mt-4 font-medium italic">Weekly increase in creators</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-slate-900 text-white border-dashed border-2 border-slate-700 flex items-center justify-center">
          <Button variant="ghost" onClick={fetchPendingAuthors} className="text-indigo-400 hover:text-indigo-300 font-black text-[10px] uppercase tracking-widest">
            <Loader2 className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Sync Archives
          </Button>
        </Card>
      </div>

      <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden rounded-3xl">
        <CardHeader className="bg-slate-50/30 dark:bg-slate-800/20 border-b border-slate-50 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Identity Pipeline</CardTitle>
              <CardDescription>Reviewing candidates for platform-wide editorial access</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-max">
              <div className="relative flex-1 lg:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by identity or liaison..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-10 shadow-sm"
                />
              </div>
              <Button variant="outline" className="rounded-xl border-slate-200 h-10 font-bold text-xs uppercase tracking-widest text-slate-500">
                <Filter className="h-4 w-4 mr-2" /> Unvalidated Only
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-800/40">
                <TableRow className="border-none">
                  <TableHead className="pl-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest py-4">Prospective Creator</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Digital Liaison</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Entry Node</TableHead>
                  <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Status</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Clearance Matrix</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && pendingAuthors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center">
                      <Loader2 className="h-10 w-10 animate-spin mx-auto text-indigo-600 opacity-30" />
                      <p className="text-xs font-black text-slate-400 mt-4 uppercase tracking-widest italic">Decrypting Identities...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredApprovals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center text-slate-400 italic font-medium px-8">
                      <div className="flex flex-col items-center gap-4">
                        <ShieldCheck size={48} className="text-slate-200" />
                        <p>No identities currently awaiting validation in this sector.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApprovals.map((author) => (
                    <TableRow key={author.userId} className="group hover:bg-indigo-50/10 dark:hover:bg-indigo-950/10 transition-colors border-slate-50 dark:border-slate-800/50">
                      <TableCell className="pl-8 py-5">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 ring-4 ring-white dark:ring-slate-800 shadow-lg transition-transform group-hover:scale-110">
                            <AvatarImage src={author.avatar} />
                            <AvatarFallback className="bg-indigo-600 text-white font-black">{author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{author.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic max-w-[150px] truncate">{author.bio}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
                          <Mail className="h-3.5 w-3.5 text-indigo-500" />
                          {author.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-5">
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-black text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                            <Calendar size={12} className="text-slate-300" />
                            {new Date(author.requestedAt).toLocaleDateString()}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">Application Date</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-none font-black text-[10px] tracking-widest px-2 h-5">
                          <Clock className="h-3 w-3 mr-1.5 animate-pulse" />
                          PENDING
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8 py-5">
                        <div className="flex justify-end gap-3">
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedUser(author);
                              setAction('approve');
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-9 px-5 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Verify
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(author);
                              setAction('reject');
                            }}
                            className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl font-black text-[10px] uppercase tracking-widest h-9 px-5 transition-all"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Dismiss
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Approval Confirmation Dialog */}
      <AlertDialog open={action === 'approve'} onOpenChange={() => setAction(null)}>
        <AlertDialogContent className="border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
          <div className="p-8">
            <AlertDialogHeader>
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <AlertDialogTitle className="text-2xl font-black">Elevate Credentials?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 font-medium leading-relaxed mt-2 pt-2 border-t border-slate-100">
                You are about to grant <strong className="text-slate-900">{selectedUser?.name}</strong> editorial clearance. They will be authorized to publish master-tier content to the platform.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-8 pt-6 border-t border-slate-50 flex gap-3">
              <AlertDialogCancel onClick={() => setSelectedUser(null)} className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-12 px-6 border-slate-200">Abort</AlertDialogCancel>
              <AlertDialogAction onClick={handleApprove} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-8 shadow-xl shadow-emerald-600/20">Authorize Account</AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rejection Confirmation Dialog */}
      <AlertDialog open={action === 'reject'} onOpenChange={() => setAction(null)}>
        <AlertDialogContent className="border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
          <div className="p-8">
            <AlertDialogHeader>
              <div className="h-16 w-16 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mb-6">
                <XCircle size={32} />
              </div>
              <AlertDialogTitle className="text-2xl font-black text-rose-600">Dismiss Application?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 font-medium leading-relaxed mt-2 pt-2 border-t border-slate-100">
                <strong className="text-slate-900">{selectedUser?.name}</strong> will be reverted to standard reader protocols. This action is logged in the security audit.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-8 pt-6 border-t border-slate-50 flex gap-3">
              <AlertDialogCancel onClick={() => setSelectedUser(null)} className="rounded-xl font-bold uppercase tracking-widest text-[10px] h-12 px-6">Abort</AlertDialogCancel>
              <AlertDialogAction onClick={handleReject} className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest h-12 px-8 shadow-xl shadow-rose-600/20">Confirm Dismissal</AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
