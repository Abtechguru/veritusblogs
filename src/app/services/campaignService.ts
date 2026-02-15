import { supabase } from '../lib/supabase';

export interface Donator {
    id: string;
    name: string;
    amount: number;
    message?: string;
    timestamp: string;
}

export interface Volunteer {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    message?: string;
    type: 'volunteer' | 'supporter';
}

const MOCK_DONATORS: Donator[] = [
    { id: '1', name: 'John Doe', amount: 500, message: 'Keep up the good work!', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
    { id: '2', name: 'Sarah Smith', amount: 1000, message: 'For a better Nasarawa!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
    { id: '3', name: 'Alhaji Musa', amount: 2500, message: 'Support from Keffi.', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
    { id: '4', name: 'Chioma Okoro', amount: 150, message: 'Every bit helps.', timestamp: new Date(Date.now() - 1000 * 30).toISOString() },
];

export const campaignService = {
    async getDonators(): Promise<Donator[]> {
        // In a real app, we would fetch from 'donations' table
        // For now, we return mock data combined with any local storage data
        const localDonations = JSON.parse(localStorage.getItem('campaign_donations') || '[]');
        return [...localDonations, ...MOCK_DONATORS].sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
    },

    async getTotalDonations(): Promise<number> {
        const donators = await this.getDonators();
        return donators.reduce((sum, d) => sum + d.amount, 0);
    },

    async addDonation(donation: Omit<Donator, 'id' | 'timestamp'>): Promise<Donator> {
        const newDonation: Donator = {
            ...donation,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString()
        };

        const localDonations = JSON.parse(localStorage.getItem('campaign_donations') || '[]');
        localStorage.setItem('campaign_donations', JSON.stringify([newDonation, ...localDonations]));

        return newDonation;
    },

    async signUpVolunteer(data: Omit<Volunteer, 'id'>): Promise<void> {
        const { error } = await supabase
            .from('campaign_signups')
            .insert([data]);

        if (error) {
            console.warn('Supabase insert failed, falling back to local storage:', error);
            const signups = JSON.parse(localStorage.getItem('campaign_signups') || '[]');
            localStorage.setItem('campaign_signups', JSON.stringify([...signups, data]));
        }
    }
};
