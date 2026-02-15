import { supabase } from '../lib/supabase';

export const userService = {
    // Get current user profile
    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // Not found
            throw error;
        }
        return data;
    },

    // Update profile
    async updateProfile(userId: string, updates: any) {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Create profile if not exists
    async createProfileIfNotExists(user: any) {
        const { data: existing } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();

        if (!existing) {
            const { data, error } = await supabase
                .from('profiles')
                .insert([{
                    id: user.id,
                    email: user.email,
                    name: user.user_metadata?.name || user.email?.split('@')[0],
                    avatar_url: user.user_metadata?.avatar_url,
                    role: 'reader'
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        }
        return existing;
    },

    async getProfilesByRole(role: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', role);

        if (error) throw error;
        return data;
    },

    async getAllProfiles() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async updateUserRole(id: string, role: string) {
        const { data, error } = await supabase
            .from('profiles')
            .update({ role })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteUser(id: string) {
        // Typically we'd call a server function to delete from auth.users too,
        // but for now we just remove the profile
        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }
};
