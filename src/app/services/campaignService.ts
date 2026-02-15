import { supabase } from '../lib/supabase';

export interface Donator {
    id: string;
    name: string;
    amount: number;
    message?: string;
    timestamp: string;
    campaign_id?: string;
}

export interface Volunteer {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    message?: string;
    type: 'volunteer' | 'supporter';
    campaign_id?: string;
}

export const campaignService = {
    /**
     * Fetch all donations from Supabase
     * @param campaignId - Optional campaign ID to filter donations
     */
    async getDonators(campaignId?: string): Promise<Donator[]> {
        try {
            let query = supabase
                .from('campaign_donations')
                .select('*')
                .order('timestamp', { ascending: false });

            if (campaignId) {
                query = query.eq('campaign_id', campaignId);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching donations:', error);
                throw new Error('Failed to fetch donations');
            }

            return data || [];
        } catch (error) {
            console.error('Error in getDonators:', error);
            return [];
        }
    },

    /**
     * Get total donation amount
     * @param campaignId - Optional campaign ID to filter donations
     */
    async getTotalDonations(campaignId?: string): Promise<number> {
        try {
            const donators = await this.getDonators(campaignId);
            return donators.reduce((sum, d) => sum + d.amount, 0);
        } catch (error) {
            console.error('Error calculating total donations:', error);
            return 0;
        }
    },

    /**
     * Add a new donation to the database
     * @param donation - Donation data without id and timestamp
     */
    async addDonation(donation: Omit<Donator, 'id' | 'timestamp'>): Promise<Donator> {
        try {
            const newDonation = {
                ...donation,
                timestamp: new Date().toISOString(),
                campaign_id: donation.campaign_id || 'david-ombugadu-2027'
            };

            const { data, error } = await supabase
                .from('campaign_donations')
                .insert([newDonation])
                .select()
                .single();

            if (error) {
                console.error('Error adding donation:', error);
                throw new Error('Failed to add donation');
            }

            return data;
        } catch (error) {
            console.error('Error in addDonation:', error);
            throw error;
        }
    },

    /**
     * Sign up a volunteer or supporter
     * @param data - Volunteer data without id
     */
    async signUpVolunteer(data: Omit<Volunteer, 'id'>): Promise<void> {
        try {
            const signupData = {
                ...data,
                campaign_id: data.campaign_id || 'david-ombugadu-2027',
                created_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('campaign_signups')
                .insert([signupData]);

            if (error) {
                console.error('Error signing up volunteer:', error);
                throw new Error('Failed to sign up volunteer');
            }
        } catch (error) {
            console.error('Error in signUpVolunteer:', error);
            throw error;
        }
    },

    /**
     * Get recent donations count
     * @param campaignId - Optional campaign ID
     * @param limit - Number of recent donations to fetch
     */
    async getRecentDonationsCount(campaignId?: string, limit: number = 10): Promise<number> {
        try {
            let query = supabase
                .from('campaign_donations')
                .select('id', { count: 'exact', head: true })
                .limit(limit);

            if (campaignId) {
                query = query.eq('campaign_id', campaignId);
            }

            const { count, error } = await query;

            if (error) {
                console.error('Error fetching donations count:', error);
                return 0;
            }

            return count || 0;
        } catch (error) {
            console.error('Error in getRecentDonationsCount:', error);
            return 0;
        }
    }
};
