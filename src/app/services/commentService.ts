import { supabase } from '../lib/supabase';

export const commentService = {
    async getComments() {
        const { data, error } = await supabase
            .from('comments')
            .select(`
        *,
        profiles:user_id (name, avatar_url),
        articles:article_id (title)
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async deleteComment(id: string) {
        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
