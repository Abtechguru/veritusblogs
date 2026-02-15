import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
    id: string;
    name: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedAt: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    progress: number;
    target: number;
    unlocked: boolean;
}

interface GamificationState {
    xp: number;
    level: number;
    streak: number;
    lastLoginDate: string | null;
    badges: Badge[];
    achievements: Achievement[];
    rank: number;
    awardXP: (amount: number, source: string) => void;
    updateStreak: () => void;
    unlockBadge: (badge: Badge) => void;
    updateAchievement: (id: string, progress: number) => void;
}

export const useGamificationStore = create<GamificationState>()(
    persist(
        (set, get) => ({
            xp: 0,
            level: 1,
            streak: 0,
            lastLoginDate: null,
            badges: [],
            achievements: [
                { id: 'first-read', name: 'First Read', description: 'Complete your first article', progress: 0, target: 1, unlocked: false },
                { id: 'voice-heard', name: 'Voice Heard', description: 'Post your first comment', progress: 0, target: 1, unlocked: false },
                { id: 'scholar', name: 'Scholar', description: 'Read 50 articles', progress: 0, target: 50, unlocked: false },
            ],
            rank: 1250, // Default mock rank

            awardXP: (amount, source) => {
                const currentXP = get().xp + amount;
                const newLevel = Math.floor(currentXP / 1000) + 1; // 1000 XP per level for simplicity

                set((state) => ({
                    xp: currentXP,
                    level: newLevel > state.level ? newLevel : state.level,
                }));

                // Notification logic or side effects could go here
                console.log(`Earned ${amount} XP from ${source}!`);
            },

            updateStreak: () => {
                const today = new Date().toISOString().split('T')[0];
                const lastLogin = get().lastLoginDate;

                if (lastLogin === today) return;

                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (lastLogin === yesterdayStr) {
                    set((state) => ({
                        streak: state.streak + 1,
                        lastLoginDate: today,
                    }));
                } else {
                    set({
                        streak: 1,
                        lastLoginDate: today,
                    });
                }
            },

            unlockBadge: (badge) => {
                if (get().badges.find((b) => b.id === badge.id)) return;
                set((state) => ({
                    badges: [...state.badges, badge],
                }));
            },

            updateAchievement: (id, progress) => {
                set((state) => ({
                    achievements: state.achievements.map((ach) => {
                        if (ach.id === id) {
                            const newProgress = ach.progress + progress;
                            const unlocked = newProgress >= ach.target;
                            return { ...ach, progress: newProgress, unlocked: ach.unlocked || unlocked };
                        }
                        return ach;
                    }),
                }));
            },
        }),
        {
            name: 'veritus-gamification',
        }
    )
);
