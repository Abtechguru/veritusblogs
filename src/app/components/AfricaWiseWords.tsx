import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { getRandomWiseWord, WiseWord } from '../data/africaWiseWords';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function AfricaWiseWords() {
  const [currentWord, setCurrentWord] = useState<WiseWord | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);

  useEffect(() => {
    // Check if shown in this session
    const shownToday = sessionStorage.getItem('wise_word_shown');
    const lastShownDate = localStorage.getItem('wise_word_date');
    const today = new Date().toDateString();

    if (lastShownDate !== today) {
      // New day, show after 5 seconds
      const timer = setTimeout(() => {
        setCurrentWord(getRandomWiseWord());
        setIsVisible(true);
        setHasShownInitial(true);
        sessionStorage.setItem('wise_word_shown', 'true');
        localStorage.setItem('wise_word_date', today);
      }, 5000);

      return () => clearTimeout(timer);
    } else if (!shownToday) {
      // Same day but not shown in session
      const timer = setTimeout(() => {
        setCurrentWord(getRandomWiseWord());
        setIsVisible(true);
        setHasShownInitial(true);
        sessionStorage.setItem('wise_word_shown', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setHasShownInitial(true);
    }
  }, []);

  useEffect(() => {
    if (!hasShownInitial) return;

    // Show new wise word every 3 minutes
    const interval = setInterval(() => {
      setCurrentWord(getRandomWiseWord());
      setIsVisible(true);
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, [hasShownInitial]);

  // Auto-hide after 15 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, currentWord]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!currentWord) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-20 xl:bottom-4 right-4 z-50 max-w-[calc(100vw-32px)] sm:max-w-sm"
        >
          <Card className="relative overflow-hidden border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 shadow-2xl">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/80 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="relative bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                <h3 className="font-bold text-sm">Africa Wise Words</h3>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-4 space-y-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-base font-serif italic text-gray-800 dark:text-gray-200 leading-relaxed">
                  "{currentWord.text}"
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300"
              >
                <div className="h-1 w-8 bg-amber-600 rounded"></div>
                <span className="font-semibold">{currentWord.origin}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/60 dark:bg-black/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800"
              >
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Moral Lesson:
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {currentWord.moralLesson}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-between items-center pt-2"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setCurrentWord(getRandomWiseWord());
                  }}
                  className="text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
                >
                  Next Wisdom
                </Button>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {currentWord.category}
                </span>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
