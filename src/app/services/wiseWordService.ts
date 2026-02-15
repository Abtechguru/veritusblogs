import { supabase } from '../lib/supabase';

export interface WiseWord {
    id: string;
    quote: string;
    author: string;
    category: string;
    likes: number;
    published_at?: string;
    created_at?: string;
}

export const wiseWordService = {
    async getWiseWords() {
        const { data, error } = await supabase
            .from('wise_words')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as WiseWord[];
    },

    async createWiseWord(word: Partial<WiseWord>) {
        const { data, error } = await supabase
            .from('wise_words')
            .insert([{
                quote: word.quote,
                author: word.author,
                category: word.category || 'general',
                likes: 0
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateWiseWord(id: string, updates: Partial<WiseWord>) {
        const { data, error } = await supabase
            .from('wise_words')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteWiseWord(id: string) {
        const { error } = await supabase
            .from('wise_words')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
