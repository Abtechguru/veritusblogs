import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toaster } from '../ui/sonner';
import { CampaignPopup } from '../CampaignPopup';
import { AfricaWiseWords } from '../AfricaWiseWords';
import { Stories } from '../Stories';
import { useLocation } from 'react-router';

import { FloatingReelsButton } from '../FloatingReelsButton';
import { MobileNav } from './MobileNav';

export const Root = () => {
  const location = useLocation();
  const isReelsPage = location.pathname === '/reels';
  const hideStories = isReelsPage || location.pathname.includes('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-background animated-bg pb-16 sm:pb-20 xl:pb-0">
      <Header />
      {!hideStories && <Stories />}
      <main className="flex-1">
        <Outlet />
      </main>
      <MobileNav />
      {!isReelsPage && <Footer />}
      <Toaster />
      <CampaignPopup interval={300000} />
      <AfricaWiseWords />
      {!isReelsPage && (
        <div className="hidden xl:block">
          <FloatingReelsButton />
        </div>
      )}
    </div>
  );
};