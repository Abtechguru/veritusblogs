import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Loader2, TrendingUp, TrendingDown, Users, FileText, Video, Eye, Calendar, Filter, Share2, Download } from 'lucide-react';
import { analyticsService } from '../../services/analyticsService';
import { Button } from '../../components/ui/button';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';

export const AdminAnalytics = () => {
  const [stats, setStats] = useState({ users: 0, articles: 0, reels: 0, totalViews: 0 });
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [overview, categories, activity] = await Promise.all([
        analyticsService.getOverviewStats(),
        analyticsService.getCategoryDistribution(),
        analyticsService.getContentActivity()
      ]);
      setStats(overview);
      setCategoryData(categories);
      setActivityData(activity);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981'];

  const metricCards = [
    { label: 'Total Users', value: stats.users, icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+5.2%', positive: true },
    { label: 'Published Articles', value: stats.articles, icon: <FileText />, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12.5%', positive: true },
    { label: 'Creator Reels', value: stats.reels, icon: <Video />, color: 'text-rose-600', bg: 'bg-rose-50', trend: '+8.1%', positive: true },
    { label: 'Reader Views', value: stats.totalViews, icon: <Eye />, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '-2.4%', positive: false },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <TrendingUp className="text-indigo-600 h-8 w-8" />
            Insight Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time platform performance and growth metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-full px-4 border-slate-200 bg-white shadow-sm font-bold text-xs uppercase tracking-wider text-slate-500">
            <Download className="h-3 w-3 mr-2" /> Export PDF
          </Button>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-inner">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1 rounded-full text-xs font-bold uppercase transition-all ${timeRange === range ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, i) => (
          <Card key={i} className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${metric.bg} ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center text-[10px] font-black px-2 py-0.5 rounded-full ${metric.positive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                  {metric.positive ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                  {metric.trend}
                </div>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{metric.label}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{metric.value.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Engagement Trends */}
        <Card className="md:col-span-2 border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="border-b border-slate-50 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Engagement Trends</CardTitle>
                <CardDescription>Article vs Comment frequency</CardDescription>
              </div>
              <Share2 size={16} className="text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors" />
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorArt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCom" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                  />
                  <Legend iconType="circle" />
                  <Area type="monotone" dataKey="articles" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorArt)" name="New Articles" />
                  <Area type="monotone" dataKey="comments" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorCom)" name="User Comments" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Content Distribution */}
        <Card className="border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-lg">Category Split</CardTitle>
            <CardDescription>Content volume per niche</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="h-[300px] w-full relative">
              {categoryData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">{categoryData.reduce((acc, curr) => acc + curr.value, 0)}</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 px-8 text-center balance italic text-sm">
                  Waiting for distribution data...
                </div>
              )}
            </div>

            <div className="mt-8 space-y-3 px-2">
              {categoryData.slice(0, 4).map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{cat.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white">{cat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
        <Card className="border-none shadow-xl bg-indigo-600 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp size={120} />
          </div>
          <CardHeader>
            <CardTitle className="text-indigo-200 text-xs font-black uppercase tracking-[4px]">Growth Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black mb-2">Impressive +18% Retention</p>
            <p className="text-indigo-100/70 text-sm leading-relaxed max-w-xs">User engagement and return rates have increased significantly since the last content update cycle.</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-white dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-700">
              <Plus className="text-slate-400" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Connect External Tool</p>
            <p className="text-xs text-slate-400 mt-1 italic">Google Search Console, FB Pixel, etc.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
