import { supabase } from '../lib/supabase';
import { Article } from '../data/mockData';

export const articleService = {
    // Fetch all articles
    async getArticles() {
        const { data, error } = await supabase
            .from('articles')
            .select(`
        *,
        profiles:author_id (name, avatar_url)
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Fetch single article by ID
    async getArticleById(id: string) {
        const { data, error } = await supabase
            .from('articles')
            .select(`
        *,
        profiles:author_id (name, avatar_url)
      `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    // Create new article
    async createArticle(article: any, userId: string) {
        const { data, error } = await supabase
            .from('articles')
            .insert([
                {
                    title: article.title,
                    excerpt: article.excerpt,
                    content: article.content,
                    cover_image: article.coverImage,
                    category: article.categories?.[0], // Fallback for legacy
                    categories: article.categories,
                    tags: article.tags,
                    author_id: userId,
                    status: article.status || 'pending',
                    published: article.status === 'published',
                    featured: article.featured || false,
                },
            ])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Update article
    async updateArticle(id: string, updates: Partial<Article>) {
        const { data, error } = await supabase
            .from('articles')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete article
    async deleteArticle(id: string) {
        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
