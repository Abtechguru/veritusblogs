import { supabase } from '../lib/supabase';

export const analyticsService = {
    // Get overview stats
    async getOverviewStats() {
        const [
            { count: usersCount },
            { count: articlesCount },
            { count: reelsCount },
            { count: commentsCount },
            { count: ticketsCount },
            { count: storiesCount },
            { data: articles }
        ] = await Promise.all([
            supabase.from('profiles').select('*', { count: 'exact', head: true }),
            supabase.from('articles').select('*', { count: 'exact', head: true }),
            supabase.from('reels').select('*', { count: 'exact', head: true }),
            supabase.from('comments').select('*', { count: 'exact', head: true }),
            supabase.from('support_tickets').select('*', { count: 'exact', head: true }),
            supabase.from('stories').select('*', { count: 'exact', head: true }),
            supabase.from('articles').select('views')
        ]);

        const totalViews = articles?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;

        return {
            users: usersCount || 0,
            articles: articlesCount || 0,
            reels: reelsCount || 0,
            comments: commentsCount || 0,
            tickets: ticketsCount || 0,
            stories: storiesCount || 0,
            totalViews
        };
    },

    // Get content distribution by category
    async getCategoryDistribution() {
        const { data, error } = await supabase
            .from('articles')
            .select('category');

        if (error) throw error;

        const distribution: Record<string, number> = {};
        data?.forEach(article => {
            const cat = article.category || 'Uncategorized';
            distribution[cat] = (distribution[cat] || 0) + 1;
        });

        return Object.entries(distribution).map(([name, value]) => ({ name, value }));
    },

    // Get daily content creation activity (last 7 days)
    async getContentActivity() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data: articles } = await supabase
            .from('articles')
            .select('created_at')
            .gte('created_at', sevenDaysAgo.toISOString());

        const { data: comments } = await supabase
            .from('comments')
            .select('created_at')
            .gte('created_at', sevenDaysAgo.toISOString());

        // Aggregate by day
        const activityMap: Record<string, { articles: number, comments: number }> = {};

        // Initialize last 7 days
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            activityMap[dateStr] = { articles: 0, comments: 0 };
        }

        articles?.forEach(a => {
            const dateStr = a.created_at.split('T')[0];
            if (activityMap[dateStr]) activityMap[dateStr].articles++;
        });

        comments?.forEach(c => {
            const dateStr = c.created_at.split('T')[0];
            if (activityMap[dateStr]) activityMap[dateStr].comments++;
        });

        return Object.entries(activityMap)
            .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
            .map(([date, counts]) => ({
                date: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                articles: counts.articles,
                comments: counts.comments
            }));
    },

    // Get recent activity feed (latest 5 items)
    async getRecentActivityFeed() {
        const { data: articles } = await supabase
            .from('articles')
            .select('id, title, created_at, profiles(name)')
            .order('created_at', { ascending: false })
            .limit(5);

        const { data: comments } = await supabase
            .from('comments')
            .select('id, content, created_at, profiles(name), article_id')
            .order('created_at', { ascending: false })
            .limit(5);

        const feed = [
            ...(articles?.map((a: any) => ({
                id: a.id,
                type: 'article',
                title: a.title,
                user: a.profiles?.name || 'Unknown',
                time: a.created_at
            })) || []),
            ...(comments?.map((c: any) => ({
                id: c.id,
                type: 'comment',
                title: c.content,
                user: c.profiles?.name || 'Unknown',
                time: c.created_at
            })) || [])
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
            .slice(0, 5);

        return feed;
    }
};
