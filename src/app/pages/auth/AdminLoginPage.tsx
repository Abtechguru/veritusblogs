import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import {
    ShieldCheck,
    Lock,
    Mail,
    Command,
    Fingerprint,
    Activity,
    ChevronRight,
    Zap,
    ShieldAlert,
    Loader2
} from 'lucide-react';
import { activityService } from '../../services/activityService';

export const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [protocolActive, setProtocolActive] = useState(false);
    const { login, isAuthenticated, isAdmin, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already an admin
    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            navigate('/admin');
        }
    }, [isAuthenticated, isAdmin, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setProtocolActive(true);

        try {
            await login(email, password);

            // Log the success attempt
            await activityService.logActivity('ADMIN_LOGIN_SUCCESS', {
                email,
                timestamp: new Date().toISOString(),
                client: navigator.userAgent
            });

            toast.success('Access Granted. Welcome to Command Hub.');
            navigate('/admin');
        } catch (error) {
            // Log the failed attempt
            await activityService.logActivity('ADMIN_LOGIN_FAILURE', {
                email,
                reason: 'Invalid Credentials',
                timestamp: new Date().toISOString()
            });

            toast.error('Identity Verification Failed. Access Denied.');
            setProtocolActive(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-violet-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[440px] relative z-10"
            >
                {/* Branding */}
                <div className="text-center mb-10 group">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 shadow-2xl shadow-indigo-600/40 mb-6 cursor-pointer"
                    >
                        <Command className="text-white h-10 w-10" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-2 italic uppercase">
                        Command <span className="text-indigo-500">Nexus</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                        <span className="h-px w-8 bg-slate-800" />
                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[4px]">Secure Admin Protocol</p>
                        <span className="h-px w-8 bg-slate-800" />
                    </div>
                </div>

                <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-[2.5rem] border-t-indigo-500/20">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                    <CardHeader className="space-y-1 text-center pt-10 px-8">
                        <CardTitle className="text-2xl font-black text-white tracking-tight">Identity Validation</CardTitle>
                        <CardDescription className="text-slate-400 font-medium italic text-xs">
                            Provide credentials to establish encrypted session
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Liaison Identity</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@veritus.network"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-slate-950/50 border-slate-800 h-14 pl-12 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between ml-1">
                                    <Label htmlFor="password" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Key</Label>
                                    <Link to="#" className="text-[9px] font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-400 transition-colors">Key Recovery?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-slate-950/50 border-slate-800 h-14 pl-12 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white font-medium"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[11px] uppercase tracking-[3px] shadow-xl shadow-indigo-600/20 transition-all active:scale-95 group relative overflow-hidden"
                                    disabled={loading}
                                >
                                    <AnimatePresence mode="wait">
                                        {loading ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-3"
                                            >
                                                <Loader2 className="h-4 w-4 animate-spin" /> Verifying Signatures...
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="normal"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2"
                                            >
                                                Establish Connection <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </div>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-800/50 flex flex-col items-center gap-4">
                            <div className="flex items-center gap-6 justify-center">
                                <Activity className="text-emerald-500 h-4 w-4 animate-pulse" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nexus Core Online</span>
                                <div className="h-1 w-1 rounded-full bg-slate-800" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SSL Enabled</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer Disclaimer */}
                <div className="mt-8 text-center px-4">
                    <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[2px] leading-relaxed">
                        Authorized Personnel Only. All access attempts are
                        <span className="text-rose-500 mx-1">logged and monitored</span>
                        by the Veritus Security Protocol.
                    </p>
                </div>
            </motion.div>

            {/* Bottom Left Badge */}
            <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-3 bg-slate-900/50 backdrop-blur-lg border border-slate-800 py-3 px-5 rounded-2xl">
                <div className="h-8 w-8 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                    <Fingerprint size={16} />
                </div>
                <div>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Node Status</p>
                    <p className="text-[10px] font-bold text-white uppercase tracking-tighter">Operational_Alpha_v4</p>
                </div>
            </div>
        </div>
    );
};
