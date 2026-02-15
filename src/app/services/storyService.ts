import { supabase } from '../lib/supabase';

export const storyService = {
    async getStories() {
        const { data, error } = await supabase
            .from('stories')
            .select(`
        *,
        profiles:user_id (name, avatar_url)
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async createStory(story: { content_url: string, type: string, caption?: string }, userId: string) {
        const { data, error } = await supabase
            .from('stories')
            .insert([{
                user_id: userId,
                content_url: story.content_url,
                type: story.type,
                caption: story.caption
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteStory(id: string) {
        const { error } = await supabase
            .from('stories')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
