import { supabase } from '../lib/supabase';

export const supportService = {
    async getTickets() {
        const { data, error } = await supabase
            .from('support_tickets')
            .select(`
        *,
        profiles:user_id (name, email)
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async updateTicketStatus(id: string, status: string) {
        const { data, error } = await supabase
            .from('support_tickets')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
