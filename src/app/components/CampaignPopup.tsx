import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from './ui/dialog';
import { VisuallyHidden } from './ui/visually-hidden';
import { Button } from './ui/button';
import { Link } from 'react-router';
import { motion } from 'motion/react';

interface CampaignPopupProps {
  interval?: number; // Interval in milliseconds to show popup (default: 5 minutes)
}

type CampaignType = 'ambode' | 'ombugadu';

interface CampaignConfig {
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  link: string;
  pillars: Array<{ name: string; color: string }>;
  buttonText: string;
  buttonColor: string;
}

export function CampaignPopup({ interval = 300000 }: CampaignPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<CampaignType>('ambode');

  // Campaign configurations
  const campaigns: Record<CampaignType, CampaignConfig> = {
    ambode: {
      title: 'AMBODE 2027',
      subtitle: 'A Vision for Progress',
      description: 'Discover our vision for transformative leadership and sustainable development.',
      gradient: 'from-blue-600 via-blue-700 to-blue-900',
      link: '/campaign/ambode-2027',
      pillars: [
        { name: 'Education', color: 'blue' },
        { name: 'Healthcare', color: 'blue' },
        { name: 'Infrastructure', color: 'blue' },
      ],
      buttonText: 'Discover Ambode 2027',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    ombugadu: {
      title: 'DAVID OMBUGADU',
      subtitle: 'Leadership for Sustainable Growth',
      description: 'A dedicated public servant with a proven track record. Discover the vision for inclusive governance.',
      gradient: 'from-green-600 via-green-700 to-emerald-800',
      link: '/campaign/david-ombugadu-2027',
      pillars: [
        { name: 'Jobs', color: 'green' },
        { name: 'Education', color: 'green' },
        { name: 'Healthcare', color: 'green' },
      ],
      buttonText: 'Learn About Ombugadu 2027',
      buttonColor: 'bg-green-600 hover:bg-green-700',
    },
  };

  // Initial popup display (after 2 seconds)
  useEffect(() => {
    const popupShown = sessionStorage.getItem('campaign_popup_shown');
    const lastCampaign = sessionStorage.getItem('last_campaign') as CampaignType;

    // Determine which campaign to show (alternate from last shown)
    const nextCampaign: CampaignType = lastCampaign === 'ambode' ? 'ombugadu' : 'ambode';
    setCurrentCampaign(nextCampaign);

    if (!popupShown) {
      // Show popup after 2 seconds on initial load
      const initialTimer = setTimeout(() => {
        setIsOpen(true);
        setHasShownInitial(true);
        sessionStorage.setItem('campaign_popup_shown', 'true');
        sessionStorage.setItem('last_campaign', nextCampaign);
        sessionStorage.setItem('last_popup_time', Date.now().toString());
      }, 2000);

      return () => clearTimeout(initialTimer);
    } else {
      setHasShownInitial(true);
    }
  }, []);

  // Recurring popup display (every 5 minutes by default)
  useEffect(() => {
    if (!hasShownInitial) return;

    const intervalTimer = setInterval(() => {
      const lastCampaign = sessionStorage.getItem('last_campaign') as CampaignType;
      const nextCampaign: CampaignType = lastCampaign === 'ambode' ? 'ombugadu' : 'ambode';

      setCurrentCampaign(nextCampaign);
      sessionStorage.setItem('last_campaign', nextCampaign);
      sessionStorage.setItem('last_popup_time', Date.now().toString());
      setIsOpen(true);
    }, interval);

    return () => clearInterval(intervalTimer);
  }, [hasShownInitial, interval]);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Ensure type safety when accessing campaign
  const campaign: CampaignConfig = campaigns[currentCampaign];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden border-2 border-primary/50 shadow-2xl">
        {/* Accessible title and description (visually hidden) */}
        <VisuallyHidden>
          <DialogTitle>{campaign.title} Campaign</DialogTitle>
          <DialogDescription>
            {campaign.description}
          </DialogDescription>
        </VisuallyHidden>

        {/* Close button - optimized size */}
        <DialogClose
          className="absolute right-2 top-2 sm:right-3 sm:top-3 z-10 rounded-full bg-black/30 hover:bg-black/50 p-1.5 sm:p-2 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          aria-label="Close campaign popup"
        >
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative"
        >
          {/* Campaign Banner - Reduced height for mobile */}
          <div className={`relative h-36 sm:h-48 bg-gradient-to-br ${campaign.gradient}`}>
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Responsive title sizing */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                  {campaign.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium">
                  {campaign.subtitle}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Campaign Content - Optimized padding */}
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                Join the Movement
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {campaign.description}
              </p>

              {/* Pillars - Simplified for mobile */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {campaign.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className={`text-center p-2 sm:p-3 bg-${pillar.color}-50 dark:bg-${pillar.color}-950 rounded-lg transition-colors hover:bg-${pillar.color}-100 dark:hover:bg-${pillar.color}-900`}
                  >
                    <h4 className={`font-bold text-xs sm:text-sm text-${pillar.color}-900 dark:text-${pillar.color}-100`}>
                      {pillar.name}
                    </h4>
                  </div>
                ))}
              </div>

              {/* Action buttons - Responsive sizing */}
              <div className="flex flex-col sm:flex-row gap-2 pt-3">
                <Button
                  asChild
                  className={`flex-1 ${campaign.buttonColor} text-white shadow-md hover:shadow-lg transition-all touch-target`}
                  size="sm"
                >
                  <Link to={campaign.link} onClick={handleClose}>
                    {campaign.buttonText}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  size="sm"
                  className="flex-1 touch-target hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}