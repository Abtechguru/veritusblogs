import { Outlet, NavLink, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Toaster } from '../ui/sonner';
import { useAuth } from '../../contexts/AuthContext';
import {
    LayoutDashboard,
    FileText,
    Users,
    UserCheck,
    MessageSquare,
    LifeBuoy,
    Video,
    Film,
    Quote,
    BarChart3,
    Send,
    DollarSign,
    Menu,
    X,
    LogOut,
    ChevronRight,
    Search,
    Bell,
    ShieldCheck
} from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const AdminLayout = () => {
    const { user, logout, isAdmin, isAuthenticated } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    // Enforce Admin Access
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
        } else if (!isAdmin) {
            navigate('/');
        }
    }, [isAuthenticated, isAdmin, navigate]);

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin', end: true },
        { icon: <FileText size={20} />, label: 'Articles', path: '/admin/articles' },
        { icon: <DollarSign size={20} />, label: 'Sponsored', path: '/admin/sponsored' },
        { icon: <UserCheck size={20} />, label: 'Authors', path: '/admin/authors' },
        { icon: <ShieldCheck size={20} />, label: 'Approvals', path: '/admin/approvals' },
        { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
        { icon: <MessageSquare size={20} />, label: 'Comments', path: '/admin/comments' },
        { icon: <LifeBuoy size={20} />, label: 'Support', path: '/admin/support' },
        { icon: <Video size={20} />, label: 'Reels', path: '/admin/reels' },
        { icon: <Film size={20} />, label: 'Stories', path: '/admin/stories' },
        { icon: <Quote size={20} />, label: 'Wise Words', path: '/admin/wise-words' },
        { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/admin/analytics' },
        { icon: <Send size={20} />, label: 'Broadcast', path: '/admin/broadcast' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 overflow-y-auto shadow-xl lg:shadow-none`}
            >
                <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <LayoutDashboard size={18} />
                        </div>
                        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                            AdminPanel
                        </span>
                    </div>
                    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                        <X size={20} />
                    </Button>
                </div>

                <nav className="mt-8 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) => `
                                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 ${isActive ? 'opacity-100' : ''}`} />
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 shrink-0 shadow-sm z-40 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={20} />
                        </Button>
                        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 w-80">
                            <Search size={16} className="text-slate-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </Button>

                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'Admin User'}</p>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Administrator</p>
                            </div>
                            <Avatar className="h-9 w-9 border-2 border-indigo-100 dark:border-indigo-900 shadow-sm">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="bg-indigo-600 text-white font-bold">{user?.name?.[0] || 'A'}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Toaster position="top-right" closeButton richColors />
        </div>
    );
};
