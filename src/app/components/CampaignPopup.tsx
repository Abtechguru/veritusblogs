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
      <DialogContent className="max-w-md sm:max-w-xl p-0 overflow-hidden border-none shadow-premium-xl bg-transparent">
        <VisuallyHidden>
          <DialogTitle>{campaign.title} Campaign</DialogTitle>
          <DialogDescription>{campaign.description}</DialogDescription>
        </VisuallyHidden>

        <DialogClose
          className="absolute right-4 top-4 z-50 rounded-2xl bg-white/10 hover:bg-white/20 p-2.5 backdrop-blur-xl border border-white/20 transition-all focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-white" />
        </DialogClose>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative bg-primary-950 rounded-[40px] overflow-hidden"
        >
          {/* Animated Background Layer */}
          <div className={`absolute inset-0 bg-gradient-to-br ${campaign.gradient} opacity-40`} />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

          <div className="relative p-8 sm:p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-10"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-black text-primary-200 uppercase tracking-[0.3em] mb-6">
                Editorial Spotlight
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tighter font-heading uppercase">
                {campaign.title}
              </h2>
              <p className="text-lg text-primary-100/80 font-bold max-w-sm mx-auto leading-tight italic">
                "{campaign.subtitle}"
              </p>
            </motion.div>

            <div className="space-y-8">
              <p className="text-sm sm:text-base text-primary-50/70 text-center leading-relaxed font-bold">
                {campaign.description}
              </p>

              <div className="grid grid-cols-3 gap-4">
                {campaign.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="group relative px-2 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center transition-all hover:bg-white/10 hover:border-white/30"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary-400 rounded-full group-hover:w-8 transition-all" />
                    <span className="text-[10px] font-black text-primary-200 uppercase tracking-widest leading-tight block">
                      {pillar.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <Button
                  asChild
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-xs tracking-[0.2em] h-16 shadow-premium-md uppercase"
                >
                  <Link to={campaign.link} onClick={handleClose}>
                    {campaign.buttonText}
                  </Link>
                </Button>
                <button
                  onClick={handleClose}
                  className="w-full text-white/40 hover:text-white/80 transition-colors text-[10px] font-black tracking-[0.1em] uppercase"
                >
                  Return to reading
                </button>
              </div>
            </div>
          </div>

          {/* Bottom highlight bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}