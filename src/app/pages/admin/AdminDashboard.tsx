import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { analyticsService } from '../../services/analyticsService';
import { userService } from '../../services/userService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  FileText,
  Eye,
  MessageSquare,
  TrendingUp,
  Video,
  Loader2,
  Clock,
  ShieldAlert,
  Zap,
  Activity,
  ChevronRight,
  Sparkles,
  Command,
  UserCheck
} from 'lucide-react';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const displayUser = user || { name: 'System Admin', role: 'admin' };

  const [stats, setStats] = useState({
    users: 0,
    articles: 0,
    totalViews: 0,
    reels: 0,
    comments: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [pendingAuthors, setPendingAuthors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [overview, activity, pending] = await Promise.all([
          analyticsService.getOverviewStats(),
          analyticsService.getRecentActivityFeed(),
          userService.getProfilesByRole('pending-author')
        ]);
        setStats(overview);
        setRecentActivity(activity);
        setPendingAuthors(pending?.length || 0);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const statCards = [
    {
      title: 'Net Users',
      value: loading ? '...' : stats.users.toLocaleString(),
      change: '+12.5%',
      icon: <Users className="h-5 w-5" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50/50 dark:bg-indigo-900/20',
      path: '/admin/users'
    },
    {
      title: 'Publications',
      value: loading ? '...' : stats.articles.toLocaleString(),
      change: '+8.2%',
      icon: <FileText className="h-5 w-5" />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50/50 dark:bg-emerald-900/20',
      path: '/admin/articles'
    },
    {
      title: 'Platform Impressions',
      value: loading ? '...' : stats.totalViews.toLocaleString(),
      change: '+23.1%',
      icon: <Eye className="h-5 w-5" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50/50 dark:bg-amber-900/20',
      path: '/admin/analytics'
    },
    {
      title: 'Cinematic Units',
      value: loading ? '...' : (stats as any).reels?.toLocaleString() || '0',
      change: '+15.4%',
      icon: <Video className="h-5 w-5" />,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50/50 dark:bg-rose-900/20',
      path: '/admin/reels'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow-xl shadow-indigo-600/20 rotate-3 group hover:rotate-0 transition-transform cursor-pointer shrink-0">
            <Command className="text-white h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">Command Hub</h1>
            <p className="text-[11px] sm:text-sm text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed">
              Logged as <span className="text-indigo-600 font-black uppercase tracking-tighter">{displayUser.name}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {pendingAuthors > 0 && (
            <Link to="/admin/approvals">
              <Button className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white border-none h-11 px-5 shadow-lg shadow-amber-500/20 transition-all font-black text-[10px] uppercase tracking-widest w-full sm:w-auto">
                <UserCheck className="h-4 w-4 mr-2" /> {pendingAuthors} Pending Validations
              </Button>
            </Link>
          )}
          <div className="hidden sm:flex flex-col items-end mr-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Sync</p>
            <p className="text-xs font-bold text-slate-900 dark:text-white">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-11 px-5 shadow-sm hover:shadow-md transition-all font-black text-[10px] uppercase tracking-widest text-slate-500 w-full sm:w-auto">
            <Activity className="h-4 w-4 mr-2 text-indigo-500" /> Infrastructure Live
          </Button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, index) => (
          <Link key={index} to={stat.path}>
            <Card className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900 overflow-hidden group hover:scale-[1.03] active:scale-95 transition-all duration-500 relative cursor-pointer">
              <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:scale-125 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className={`h-10 w-10 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center shadow-sm`}>
                    {stat.icon}
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 border-none font-black text-[10px] tracking-tighter shadow-sm h-6">
                    <TrendingUp className="h-3 w-3 mr-1" /> {stat.change}
                  </Badge>
                </div>
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[2px] mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Center Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Activity Stream */}
        <Card className="lg:col-span-2 border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden rounded-3xl">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-50 dark:border-slate-800 flex flex-row items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600">
                <Zap size={20} className="fill-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-black">Neural Pipeline</CardTitle>
                <CardDescription className="text-xs font-medium italic">Latest operational events from users and editorial staff</CardDescription>
              </div>
            </div>
            <Link to="/admin/analytics">
              <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 font-black text-[10px] uppercase tracking-widest h-9 px-4 rounded-xl">
                Deep Inspection <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50/50 dark:divide-slate-800/50">
              {loading ? (
                <div className="p-20 text-center">
                  <Loader2 className="h-10 w-10 animate-spin mx-auto text-indigo-600 opacity-30" />
                  <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-[3px] italic animate-pulse">Scanning Bio-Metrics...</p>
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="p-20 text-center text-slate-400 italic font-medium">The pipeline is currently silent.</div>
              ) : (
                recentActivity.map((item) => (
                  <div key={item.id} className="group p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-default">
                    <div className="flex items-center gap-4">
                      <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${item.type === 'article' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                        {item.type === 'article' ? <FileText size={18} /> : <MessageSquare size={18} />}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors tracking-tight">
                          {item.title}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1.5 mt-0.5">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback className="text-[6px] bg-slate-200 dark:bg-slate-700 font-black uppercase">{item.user[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-slate-600 dark:text-slate-300">{item.user}</span>
                          <span className="opacity-40">•</span>
                          {item.type === 'article' ? 'Asset Published' : 'Reaction Received'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:flex flex-col items-end">
                      <div className="flex items-center gap-1 text-[9px] font-black text-slate-300 uppercase italic">
                        <Clock size={10} /> {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <Badge variant="outline" className="text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">NODE_{item.id.slice(0, 4)}</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 bg-slate-50/30 dark:bg-slate-800/10 border-t border-slate-50 dark:border-slate-800 flex justify-center">
              <Button variant="ghost" className="text-slate-400 hover:text-indigo-600 text-[10px] font-black uppercase tracking-widest h-8">
                Archive Access Request
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="space-y-8">
          <Card className="border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden rounded-3xl">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 py-6">
              <div className="flex items-center gap-3">
                <Activity className="text-rose-500 h-5 w-5" />
                <CardTitle className="text-xl font-black">Vital Signs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-7">
              {[
                { label: 'Neural Capacity', value: 'Nominal', percent: 12, color: 'bg-indigo-500', text: 'text-indigo-500', icon: <Sparkles size={12} /> },
                { label: 'DB Resilience', value: 'High', percent: 84, color: 'bg-emerald-500', text: 'text-emerald-500', icon: <Activity size={12} /> },
                { label: 'Cache Velocity', value: 'Peak', percent: 96, color: 'bg-amber-500', text: 'text-amber-500', icon: <Zap size={12} /> },
                { label: 'Anomaly Rate', value: '0.04%', percent: 6, color: 'bg-rose-500', text: 'text-rose-500', icon: <ShieldAlert size={12} /> },
              ].map((sys, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      {sys.icon} {sys.label}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800 shadow-sm ${sys.text}`}>{sys.value}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner p-[1px]">
                    <div className={`h-full ${sys.color} rounded-full transition-all duration-1500 ease-in-out shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:brightness-125`} style={{ width: `${sys.percent}%` }} />
                  </div>
                </div>
              ))}

              <div className="pt-4 mt-6 border-t border-slate-50 dark:border-slate-800">
                <Button variant="outline" className="w-full rounded-2xl border-slate-200 dark:border-slate-800 border-2 bg-white dark:bg-slate-900 hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-[3px] text-slate-400 h-12 shadow-sm group">
                  <ShieldAlert className="h-4 w-4 mr-2 group-hover:text-rose-500 transition-colors" /> Perform Full Diagnostics
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white overflow-hidden rounded-3xl relative group">
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
              <Activity size={180} />
            </div>
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-white/20 text-white border-none font-black text-[9px] tracking-widest px-2 backdrop-blur-md">INTELLIGENCE REPORT</Badge>
              </div>
              <p className="text-xl font-black mb-3 leading-tight tracking-tight italic">"Audience sentiment has spiked by 18% following the recent cinematic reel deployments."</p>
              <div className="flex items-center gap-2 mt-6">
                <div className="h-px w-8 bg-indigo-300" />
                <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest">Platform Insights</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};