import { useEffect } from 'react';
import { useGamificationStore } from '../../store/gamificationStore';
import { toast } from 'sonner';
import { Trophy, Zap } from 'lucide-react';

export const GamificationHandler = () => {
    const { xp, level, awardXP } = useGamificationStore();

    // Check for level ups
    useEffect(() => {
        // This is a simple logic for demo
        const currentLevel = Math.floor(xp / 1000) + 1;
        if (currentLevel > level) {
            // In a real app, you'd call an action to actually update the level in the store
            // For now, we just show a toast for the "wow" effect
            toast.success(`LEVEL UP! You are now Level ${currentLevel}`, {
                icon: <Trophy className="h-5 w-5 text-amber-500" />,
                description: "You've unlocked new rewards and features.",
                duration: 5000,
            });
        }
    }, [xp, level]);

    // Initial welcome reward if XP is 0
    useEffect(() => {
        if (xp === 0) {
            const timer = setTimeout(() => {
                awardXP(50, 'Welcome Bonus');
                toast("Welcome to Veritus!", {
                    description: "You've earned 50 XP to start your journey.",
                    icon: <Zap className="h-5 w-5 text-teal-500" />,
                });
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    return null;
};
