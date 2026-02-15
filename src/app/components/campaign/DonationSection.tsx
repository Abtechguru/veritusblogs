import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, DollarSign, Users, ArrowRight, Info } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { campaignService, Donator } from '../../services/campaignService';
import { toast } from 'sonner';

export const DonationSection = () => {
    const [donators, setDonators] = useState<Donator[]>([]);
    const [total, setTotal] = useState(0);
    const [showPaypal, setShowPaypal] = useState(false);
    const [customAmount, setCustomAmount] = useState('');

    useEffect(() => {
        fetchDonations();
        // Simulate real-time updates
        const interval = setInterval(fetchDonations, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchDonations = async () => {
        try {
            const [allDonators, totalAmount] = await Promise.all([
                campaignService.getDonators(),
                campaignService.getTotalDonations()
            ]);
            setDonators(allDonators);
            setTotal(totalAmount);
        } catch (error) {
            console.error('Failed to fetch donations:', error);
        }
    };

    const handleDonate = () => {
        if (!customAmount || parseFloat(customAmount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        setShowPaypal(true);
    };

    const simulateSuccess = async () => {
        try {
            await campaignService.addDonation({
                name: 'Anonymous Supporter',
                amount: parseFloat(customAmount),
                message: 'Supporting the vision!'
            });
            toast.success('Thank you for your donation!');
            setShowPaypal(false);
            setCustomAmount('');
            fetchDonations();
        } catch (error) {
            toast.error('Processing failed');
        }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left: Donation Info */}
                        <div className="space-y-8">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6"
                                >
                                    <DollarSign className="h-4 w-4" /> Support the Vision
                                </motion.div>
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                                    Fuel the Change with Your <span className="text-rose-600 italic">Contribution.</span>
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Your support ensures we can reach every corner of the state, providing healthcare, education, and economic relief to those who need it most.
                                </p>
                            </div>

                            {/* Total Bold Display */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
                                    <Heart className="h-32 w-32 text-rose-600" />
                                </div>
                                <p className="text-sm font-black text-gray-400 uppercase tracking-[4px] mb-2">Total Contributed So Far</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
                                        ${total.toLocaleString()}
                                    </span>
                                    <span className="text-rose-600 font-bold text-xl uppercase tracking-widest animate-pulse">Live</span>
                                </div>
                            </div>

                            {/* Donation Instructions */}
                            <Card className="border-none bg-blue-50 dark:bg-blue-900/20 rounded-3xl">
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center shrink-0">
                                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">How to Donate via PayPal</h4>
                                            <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-decimal list-inside">
                                                <li>Enter your desired amount in the field below.</li>
                                                <li>Click "Proceed to PayPal" to log in to your account.</li>
                                                <li>Confirm the payment details and your contribution will be live!</li>
                                                <li>Donations are secure and tax-deductible.</li>
                                            </ol>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Donation Input */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="number"
                                        placeholder="Enter amount (USD)"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        className="h-16 pl-10 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-rose-600 text-xl font-bold"
                                    />
                                </div>
                                {!showPaypal ? (
                                    <Button
                                        onClick={handleDonate}
                                        className="h-16 px-10 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-[11px] uppercase tracking-[2px] shadow-xl shadow-rose-600/20 transition-all"
                                    >
                                        Proceed to PayPal
                                    </Button>
                                ) : (
                                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                                        <Button
                                            onClick={simulateSuccess}
                                            className="h-16 px-10 rounded-2xl bg-[#0070ba] hover:bg-[#003087] text-white font-black shadow-xl transition-all flex items-center gap-2"
                                        >
                                            <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-4" />
                                            Complete Payment
                                        </Button>
                                        <Button variant="ghost" className="text-xs" onClick={() => setShowPaypal(false)}>Cancel</Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Live Donators Feed */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Recent Contributions</h3>
                                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest">
                                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                                    Live Feed
                                </div>
                            </div>

                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                <AnimatePresence mode="popLayout">
                                    {donators.map((donator) => (
                                        <motion.div
                                            key={donator.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            layout
                                        >
                                            <Card className="border-none bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
                                                <CardContent className="p-5 flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4 min-w-0">
                                                        <div className="h-12 w-12 rounded-full bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 shrink-0">
                                                            <Users className="h-6 w-6" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h4 className="font-black text-gray-900 dark:text-white truncate">
                                                                {donator.name}
                                                            </h4>
                                                            {donator.message && (
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate italic">
                                                                    "{donator.message}"
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <p className="text-xl font-black text-rose-600">
                                                            +${donator.amount.toLocaleString()}
                                                        </p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                                                            Just now
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <Button variant="ghost" className="w-full text-gray-400 hover:text-rose-600 font-black text-[10px] uppercase tracking-[4px] h-12">
                                View All Supporters <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
