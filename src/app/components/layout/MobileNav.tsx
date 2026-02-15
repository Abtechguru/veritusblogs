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
        <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 pb-safe shadow-[0_-8px_30px_rgb(0,0,0,0.08)]">
            <div className="flex justify-around items-center h-16 sm:h-20 px-4">
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center space-y-1 transition-all duration-300 w-full h-full relative group",
                                active ? "text-[#F15A24]" : "text-gray-500 dark:text-gray-400"
                            )}
                        >
                            {/* Active Indicator Bar */}
                            {active && (
                                <div className="absolute top-0 w-8 h-1 bg-gradient-to-r from-[#F15A24] to-[#C2410C] rounded-full shadow-[0_4px_12px_rgba(241,90,36,0.4)]" />
                            )}

                            <div className={cn(
                                "p-1.5 rounded-xl transition-all duration-300",
                                active ? "bg-orange-50 dark:bg-orange-900/10 scale-110" : "group-hover:bg-gray-100 dark:group-hover:bg-gray-800"
                            )}>
                                <Icon className={cn(
                                    "h-6 w-6 transition-transform duration-300",
                                    active ? "stroke-[2.5px]" : "stroke-[2px]"
                                )} />
                            </div>

                            <span className={cn(
                                "text-[10px] sm:text-xs font-bold leading-none tracking-tight transition-all pb-1",
                                active ? "opacity-100" : "opacity-80"
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
