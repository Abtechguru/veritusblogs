import { useEffect } from 'react';
import { useGamificationStore } from '../../store/gamificationStore';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

export const StreakIndicator = () => {
    const { streak, updateStreak } = useGamificationStore();

    useEffect(() => {
        updateStreak();
    }, [updateStreak]);

    if (streak === 0) return null;

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-900 shadow-sm cursor-help transition-all"
        >
            <div className="relative">
                <Flame className={`h-5 w-5 ${streak > 0 ? 'text-amber-500 streak-active' : 'text-gray-400'}`} />
                {streak >= 7 && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -inset-1 bg-amber-500/20 rounded-full blur-sm"
                    />
                )}
            </div>
            <span className="text-sm font-black text-amber-700 dark:text-amber-400">
                {streak}
            </span>
        </motion.div>
    );
};
