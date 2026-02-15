import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { newsletterService } from '../../services/newsletterService';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        await newsletterService.subscribe(email);
        toast.success('Successfully subscribed to newsletter!');
        setEmail('');
      } catch (error: any) {
        toast.error(error.message || 'Failed to subscribe. Please try again.');
      }
    }
  };

  return (
    <footer className="relative bg-primary-950 text-white overflow-hidden pt-24 pb-12">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="inline-block group">
              <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-2xl border border-white/10 group-hover:border-primary-500/30 transition-all duration-500 backdrop-blur-md">
                <span className="text-2xl font-black tracking-tighter text-white group-hover:text-primary-400 transition-colors font-heading">
                  VERITUS
                </span>
                <span className="text-[10px] font-bold text-primary-200 tracking-widest uppercase border-l border-white/20 pl-3">
                  INTL
                </span>
              </div>
            </Link>
            <p className="text-primary-100/60 text-sm leading-relaxed font-bold max-w-xs">
              Redefining journalism for the digital age. A premium hub for stories that matter, powered by engagement and narrative excellence.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Facebook, Linkedin, Instagram].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary-600 hover:scale-110 transition-all duration-300 border border-white/5">
                  <Icon className="h-4 w-4 text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/articles" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/category/sports" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/category/politics" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Politics
                </Link>
              </li>
              <li>
                <Link to="/category/cultures" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Cultures
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">More Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/weather" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Weather
                </Link>
              </li>
              <li>
                <Link to="/category/celebrity-gist" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Celebrity Gist
                </Link>
              </li>
              <li>
                <Link to="/campaign/david-ombugadu-2027" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Ombugadu 2027
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <h4 className="text-sm font-black text-primary-400 uppercase tracking-[0.2em]">The Insight Feed</h4>
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Mail className="h-12 w-12 text-primary-400" />
              </div>
              <p className="text-xs font-bold text-primary-100/80 mb-6 leading-relaxed">
                Join 50k+ readers receiving weekly curated narratives.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="name@nexus.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button onClick={handleNewsletterSubmit} className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black text-xs tracking-widest h-14 shadow-premium-md">
                  ACCESS NEWSROOM
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-bold text-primary-100/40">
            © 2026 VERITUS INTERNATIONAL. CRAFTED FOR THE DISCERNING READER.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-xs font-bold text-primary-100/40 hover:text-primary-400 transition-colors uppercase tracking-widest">Privacy Protocol</Link>
            <Link to="/terms" className="text-xs font-bold text-primary-100/40 hover:text-primary-400 transition-colors uppercase tracking-widest">Global Terms</Link>
            <Link to="/ethics" className="text-xs font-bold text-primary-100/40 hover:text-primary-400 transition-colors uppercase tracking-widest">Journalistic Ethics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
