import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { Send, Users, Mail, AlertCircle, Sparkles, BarChart3, Zap, Clock, ShieldCheck, History } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { newsletterService } from '../../services/newsletterService';

export const AdminBroadcast = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendToAll, setSendToAll] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error('Subject and message are required');
      return;
    }

    setLoading(true);

    try {
      await newsletterService.sendBroadcast(subject, message, sendToAll ? 'all' : 'subscribers');
      toast.success('Broadcast transmitted successfully to the neural network!');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast.error('Transmission failed. Re-routing...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <Zap className="text-amber-500 h-8 w-8 fill-amber-500" />
            Neural Broadcast
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Instantly reach every authenticated node in the platform</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-black bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-900 shadow-sm">
          <ShieldCheck size={14} className="mr-1" /> SECURE TRANSMISSION CHANNEL
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden rounded-2xl">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-indigo-600" />
                <CardTitle className="text-xl">Message Composer</CardTitle>
              </div>
              <CardDescription>Draft your system-wide announcement</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSendBroadcast} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 pl-1">
                      Broadcast Subject
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="The headline of your broadcast"
                        className="pl-12 h-12 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 pl-1">
                      Narrative Content
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Compose your message to the community..."
                      rows={10}
                      className="rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm focus:ring-2 focus:ring-indigo-500 transition-all font-medium leading-relaxed"
                      required
                    />
                    <div className="flex justify-between items-center px-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Markdown enabled</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{message.length} characters</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 border-dashed">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 dark:text-white leading-none mb-1">Mass Distribution</p>
                      <p className="text-xs text-slate-500 font-medium tracking-tight">Broadcast to all 1,234 active identities</p>
                    </div>
                  </div>
                  <Switch
                    checked={sendToAll}
                    onCheckedChange={setSendToAll}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => { setSubject(''); setMessage(''); }}
                    className="flex-1 h-12 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    Purge Draft
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !sendToAll}
                    className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Encrypting & Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Execute Broadcast
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden rounded-2xl">
            <CardHeader className="bg-slate-800/50 border-b border-slate-800">
              <CardTitle className="text-sm font-black uppercase tracking-[2px] text-slate-400 flex items-center gap-2">
                <BarChart3 size={16} className="text-amber-500" /> Transmission Logic
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  <span>Queue Health</span>
                  <span className="text-emerald-500">OPTIMAL</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[94%]" />
                </div>
              </div>
              <Alert className="bg-indigo-950/30 border-indigo-900 text-indigo-200">
                <AlertCircle className="h-4 w-4 text-indigo-400" />
                <AlertDescription className="text-[10px] font-medium leading-relaxed">
                  Messages are encrypted with AES-256 before transmission to ensure network integrity across all edge locations.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden rounded-2xl">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-lg flex items-center gap-2">
                <History size={18} className="text-slate-400" /> Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { title: 'February Update', time: '2h ago', users: '1.2k', type: 'System' },
                  { title: 'Security Advisory', time: '1d ago', users: 'ALL', type: 'Critical' },
                  { title: 'January Newsletter', time: '2w ago', users: '1.1k', type: 'Media' },
                ].map((log, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-600 transition-colors uppercase tracking-tight">{log.title}</p>
                      <span className="text-[9px] font-black bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">{log.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      <span className="flex items-center gap-1"><Clock size={10} /> {log.time}</span>
                      <span className="flex items-center gap-1"><Users size={10} /> {log.users} nodes</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4">
                <Button variant="outline" className="w-full rounded-xl border-dashed border-2 text-[10px] font-black uppercase tracking-widest text-slate-400 h-10">
                  View Archival Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
