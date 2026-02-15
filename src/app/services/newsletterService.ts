import { supabase } from '../lib/supabase';

export const newsletterService = {
    // Subscribe to newsletter
    async subscribe(email: string) {
        const { data, error } = await supabase
            .from('subscribers')
            .insert([{ email }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') { // Unique constraint violation
                throw new Error('This email is already subscribed.');
            }
            throw error;
        }
        return data;
    },

    // Unsubscribe
    async unsubscribe(email: string) {
        const { error } = await supabase
            .from('subscribers')
            .update({ active: false })
            .eq('email', email);

        if (error) throw error;
        return true;
    },

    // Get all active subscribers
    async getSubscribers() {
        const { data, error } = await supabase
            .from('subscribers')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Mock function to send broadcast
    // In a real app, this would trigger a server-side function to send actual emails
    async sendBroadcast(subject: string, message: string, targets: 'all' | 'subscribers' | 'users' = 'all') {
        // Log the broadcast for audit
        console.log(`Sending broadcast: ${subject} to ${targets}`);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In a real implementation with Supabase Edge Functions:
        /*
        const { data, error } = await supabase.functions.invoke('send-broadcast', {
            body: { subject, message, targets }
        });
        if (error) throw error;
        return data;
        */

        return { success: true, timestamp: new Date().toISOString() };
    }
};
