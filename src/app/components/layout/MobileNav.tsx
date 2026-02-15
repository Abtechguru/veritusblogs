import { Link, useLocation } from 'react-router';
import {
    Home,
    Video,
    Grid,
    User,
    PenSquare,
    Trophy
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const MobileNav = () => {
    const { user, isAuthor } = useAuth();
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Grid, label: 'Topics', path: '/articles' },
        { icon: Video, label: 'Reels', path: '/reels' },
        { icon: Trophy, label: 'Ranks', path: '/leaderboard' },
        {
            icon: user ? (isAuthor ? PenSquare : User) : User,
            label: user ? (isAuthor ? 'Post' : 'Profile') : 'Login',
            path: user ? (isAuthor ? '/create-article' : '/profile') : '/login'
        },
    ];

    return (
        <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur-2xl border-t border-primary-100/10 dark:border-primary-800/10 pb-safe shadow-premium-lg">
            <div className="flex justify-around items-center h-20 px-4">
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center space-y-1.5 transition-all duration-500 w-full h-full relative group",
                                active ? "text-primary-600" : "text-text-tertiary"
                            )}
                        >
                            {/* Cinematic Active Indicator Bar */}
                            {active && (
                                <motion.div
                                    layoutId="mobileNavActive"
                                    className="absolute -top-px w-12 h-1 bg-gradient-to-r from-primary-600 to-indigo-400 rounded-full shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
                                />
                            )}

                            <div className={cn(
                                "p-2 rounded-2xl transition-all duration-500 relative",
                                active ? "bg-primary-50 dark:bg-primary-900/20 scale-110 shadow-premium-sm" : "group-hover:bg-primary-50/50 dark:group-hover:bg-primary-900/10"
                            )}>
                                <Icon className={cn(
                                    "h-6 w-6 transition-all duration-500",
                                    active ? "stroke-[2.5px] drop-shadow-sm" : "stroke-[2px]"
                                )} />
                            </div>

                            <span className={cn(
                                "text-[10px] font-black leading-none tracking-[0.1em] uppercase transition-all duration-500",
                                active ? "opacity-100 translate-y-0" : "opacity-60 translate-y-0.5"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
