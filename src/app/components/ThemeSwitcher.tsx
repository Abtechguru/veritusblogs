import { useState, useEffect } from 'react';
import { Sun, Moon, BookOpen, Contrast } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'light' | 'dark' | 'sepia' | 'high-contrast';

interface ThemeOption {
    value: Theme;
    label: string;
    icon: React.ReactNode;
    emoji: string;
    description: string;
}

const themes: ThemeOption[] = [
    {
        value: 'light',
        label: 'Dawn',
        icon: <Sun className="w-5 h-5" />,
        emoji: '☀️',
        description: 'Bright and vibrant'
    },
    {
        value: 'dark',
        label: 'Midnight',
        icon: <Moon className="w-5 h-5" />,
        emoji: '🌙',
        description: 'Easy on the eyes'
    },
    {
        value: 'sepia',
        label: 'Vintage',
        icon: <BookOpen className="w-5 h-5" />,
        emoji: '📜',
        description: 'Classic reading'
    },
    {
        value: 'high-contrast',
        label: 'Accessible',
        icon: <Contrast className="w-5 h-5" />,
        emoji: '🔆',
        description: 'Maximum contrast'
    }
];

export default function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState<Theme>('light');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // Auto-detect based on time of day
            const hour = new Date().getHours();
            const suggestedTheme = getTimeBasedTheme(hour);
            applyTheme(suggestedTheme);
        }
    }, []);

    const getTimeBasedTheme = (hour: number): Theme => {
        if (hour < 6) return 'dark';      // Late night
        if (hour < 10) return 'sepia';    // Morning reading
        if (hour < 20) return 'light';    // Daylight
        return 'dark';                     // Night
    };

    const applyTheme = (theme: Theme) => {
        setCurrentTheme(theme);

        // Remove all theme classes
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');

        // Apply new theme
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (theme !== 'light') {
            document.documentElement.setAttribute('data-theme', theme);
        }

        // Save to localStorage
        localStorage.setItem('theme', theme);
    };

    const handleThemeChange = (theme: Theme) => {
        applyTheme(theme);
        setIsOpen(false);
    };

    const currentThemeData = themes.find(t => t.value === currentTheme) || themes[0];

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-20 right-0 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Choose Theme
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Select your reading experience
                            </p>
                        </div>

                        <div className="p-2">
                            {themes.map((theme) => (
                                <button
                                    key={theme.value}
                                    onClick={() => handleThemeChange(theme.value)}
                                    className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${currentTheme === theme.value
                                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                        }
                  `}
                                >
                                    <span className="text-2xl">{theme.emoji}</span>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium">{theme.label}</div>
                                        <div className={`text-xs ${currentTheme === theme.value
                                                ? 'text-white/80'
                                                : 'text-gray-500 dark:text-gray-400'
                                            }`}>
                                            {theme.description}
                                        </div>
                                    </div>
                                    {currentTheme === theme.value && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 rounded-full bg-white"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                Theme auto-adjusts based on time of day
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="
          w-14 h-14 rounded-full
          bg-gradient-to-br from-primary-500 to-accent-500
          text-white shadow-xl shadow-primary-500/30
          hover:shadow-2xl hover:shadow-primary-500/40
          transition-all duration-300
          flex items-center justify-center
          text-2xl
          relative overflow-hidden
        "
            >
                {/* Animated background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent-500 to-primary-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <span className="relative z-10">{currentThemeData.emoji}</span>

                {/* Pulse effect */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{
                        scale: [0, 1.5],
                        opacity: [0.5, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none"
                    >
                        {currentThemeData.label} Mode
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
