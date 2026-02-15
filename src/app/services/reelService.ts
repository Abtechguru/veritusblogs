import { supabase } from '../lib/supabase';
import { Reel } from '../data/mockReels';

export const reelService = {
    // Fetch all reels
    async getReels() {
        const { data, error } = await supabase
            .from('reels')
            .select(`
        *,
        user:user_id (name, avatar_url)
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Create new reel
    async createReel(reel: Partial<Reel>, userId: string) {
        const { data, error } = await supabase
            .from('reels')
            .insert([
                {
                    video_url: reel.videoUrl,
                    thumbnail_url: reel.thumbnailUrl,
                    caption: reel.caption,
                    user_id: userId,
                    category: reel.category || 'general',
                    likes: 0,
                    views: 0
                },
            ])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Delete reel
    async deleteReel(id: string) {
        const { error } = await supabase
            .from('reels')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
