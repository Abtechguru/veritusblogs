import { Link, useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Menu,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  PenSquare,
  UserCircle,
  Search
} from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '../ui/sheet';
import { VisuallyHidden } from '../ui/visually-hidden';
import { XPProgress } from '../gamification/XPProgress';
import { StreakIndicator } from '../gamification/StreakIndicator';

export const Header = () => {
  const { user, logout, isAdmin, isAuthor } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Articles', path: '/articles' },
    { label: 'Sports', path: '/category/sports' },
    { label: 'Cultures', path: '/category/cultures' },
    { label: 'Politics', path: '/category/politics' },
    { label: 'Weather', path: '/category/weather' },
    { label: 'Celebrity', path: '/category/celebrity-gist' },
    { label: 'Weekly Topic', path: '/weekly-topic' },
  ];

  const specialLinks = [
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Ombugadu 2027', path: '/campaign/david-ombugadu-2027', highlight: true },
    { label: 'Ambode 2027', path: '/campaign/ambode-2027', highlight: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary-100/10 dark:border-primary-800/20 bg-white/72 dark:bg-bg-primary-dark/80 backdrop-blur-xl shadow-premium-sm transition-all duration-500">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex h-16 sm:h-20 lg:h-24 items-center justify-between">
          {/* Logo - Premium Indigo Transformation */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-4 group relative flex-shrink-0">
            <div className="absolute -inset-2 sm:-inset-4 bg-primary-500/10 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />
            <div className="relative flex items-center bg-white/50 dark:bg-gray-900/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-primary-100/20 group-hover:border-primary-500/30 transition-all shadow-sm backdrop-blur-md">
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tighter bg-gradient-to-br from-primary-600 via-primary-500 to-indigo-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500 drop-shadow-sm font-heading">
                VERITUS
              </span>
              <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs lg:text-sm font-bold text-text-secondary hidden xs:inline tracking-[0.2em] uppercase border-l border-primary-100/50 dark:border-primary-800/50 pl-2 sm:pl-3">
                INTERNATIONAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6 bg-white/40 dark:bg-black/40 px-6 py-2 rounded-2xl border border-primary-100/10 dark:border-primary-800/20 backdrop-blur-xl shadow-inner mx-4">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-3 text-sm font-bold transition-all duration-500 rounded-xl text-text-secondary hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Separator */}
            <div className="h-8 w-px bg-primary-100 dark:bg-primary-800/50 mx-2" />

            {/* Special Links */}
            <div className="flex items-center space-x-2">
              {specialLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 text-sm font-black transition-all duration-500 rounded-xl transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap border ${link.highlight
                    ? 'bg-amber-500 text-white border-amber-600 shadow-amber-500/20 hover:shadow-amber-500/40'
                    : 'text-text-primary border-transparent hover:bg-primary-50 dark:hover:bg-primary-900/30'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Gamification Indicators */}
            <StreakIndicator />
            <XPProgress />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:inline-flex hover:bg-gray-100 dark:hover:bg-gray-800 touch-target"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-300" />
              )}
            </Button>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-2xl px-4 py-6 transition-all duration-300"
                  >
                    <img
                      src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                      alt={user.name}
                      className="w-10 h-10 rounded-full ring-2 ring-primary-100 dark:ring-primary-800"
                    />
                    <span className="hidden lg:inline-block font-bold text-text-primary">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl border-primary-100 dark:border-primary-800 shadow-premium-lg">
                  <DropdownMenuItem
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer py-3"
                  >
                    <UserCircle className="mr-3 h-5 w-5 text-primary-500" />
                    Profile
                  </DropdownMenuItem>
                  {isAuthor && (
                    <DropdownMenuItem
                      onClick={() => navigate('/create-article')}
                      className="cursor-pointer py-3"
                    >
                      <PenSquare className="mr-3 h-5 w-5 text-primary-500" />
                      Write Article
                    </DropdownMenuItem>
                  )}
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => navigate('/admin')}
                      className="cursor-pointer py-3"
                    >
                      <LayoutDashboard className="mr-3 h-5 w-5 text-primary-500" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-primary-50 dark:bg-primary-900" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer py-3 text-red-600 dark:text-red-400 font-bold"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="font-bold text-text-secondary hover:text-primary-600"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-primary-600 hover:bg-primary-700 text-white shadow-premium-md rounded-2xl px-8 font-bold"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden touch-target hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-80 overflow-y-auto">
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Main navigation menu for the site</SheetDescription>
                </VisuallyHidden>

                <div className="flex flex-col space-y-6 mt-6">
                  {/* Quick Search */}
                  <div className="px-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#F15A24]/50 transition-all"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            navigate(`/articles?search=${(e.target as HTMLInputElement).value}`);
                            setMobileMenuOpen(false);
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Menu</h3>
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors touch-target text-gray-700 dark:text-gray-300"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="px-4 text-xs font-semibold text-[#F15A24] uppercase tracking-wider mb-2">Campaigns & Specials</h3>
                    {specialLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-base font-bold hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors touch-target text-gray-900 dark:text-gray-100"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* User Section */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center touch-target transition-colors"
                        >
                          <UserCircle className="mr-2 h-5 w-5" />
                          Profile
                        </Link>
                        {isAuthor && (
                          <Link
                            to="/create-article"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center touch-target transition-colors"
                          >
                            <PenSquare className="mr-2 h-5 w-5" />
                            Write Article
                          </Link>
                        )}
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center touch-target transition-colors"
                          >
                            <LayoutDashboard className="mr-2 h-5 w-5" />
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center touch-target transition-colors"
                        >
                          <LogOut className="mr-2 h-5 w-5" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start mb-2 touch-target"
                          onClick={() => {
                            navigate('/login');
                            setMobileMenuOpen(false);
                          }}
                        >
                          Login
                        </Button>
                        <Button
                          className="w-full bg-[#F15A24] hover:bg-[#C2410C] text-white shadow-md touch-target"
                          onClick={() => {
                            navigate('/register');
                            setMobileMenuOpen(false);
                          }}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Theme Toggle for Mobile */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="w-full touch-target mt-2"
                  >
                    {theme === 'light' ? (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Light Mode
                      </>
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};