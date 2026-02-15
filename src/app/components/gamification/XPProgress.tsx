import { useGamificationStore } from '../../store/gamificationStore';
import { motion } from 'motion/react';

export const XPProgress = () => {
    const { xp, level } = useGamificationStore();

    // XP per level target (1000 for this demo)
    const targetXP = 1000;
    const currentLevelXP = xp % targetXP;
    const progress = (currentLevelXP / targetXP) * 100;

    return (
        <div className="flex items-center gap-3 bg-white/50 dark:bg-black/50 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm hover-scale cursor-pointer">
            <div className="relative w-8 h-8">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-800"
                    />
                    <motion.circle
                        cx="16"
                        cy="16"
                        r="14"
                        stroke="url(#xp-gradient)"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={88}
                        initial={{ strokeDashoffset: 88 }}
                        animate={{ strokeDashoffset: 88 - (88 * progress) / 100 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="xp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#14B8A6" />
                            <stop offset="100%" stopColor="#2dd4bf" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-black text-teal-600 dark:text-teal-400">
                        {level}
                    </span>
                </div>
            </div>
            <div className="hidden md:flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter leading-none">Level</span>
                <span className="text-xs font-black text-gray-900 dark:text-white leading-tight">{xp.toLocaleString()} XP</span>
            </div>
        </div>
    );
};
