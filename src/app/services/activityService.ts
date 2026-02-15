import { supabase } from '../lib/supabase';

export const activityService = {
    async logActivity(type: string, details: any, userId?: string) {
        try {
            const { error } = await supabase
                .from('activity_logs')
                .insert([
                    {
                        type,
                        details,
                        user_id: userId,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) {
                console.warn('Logging to activity_logs failed, likely table does not exist:', error.message);
                // Fallback: log to console or mock
                return false;
            }
            return true;
        } catch (err) {
            console.error('Activity logging error:', err);
            return false;
        }
    }
};
