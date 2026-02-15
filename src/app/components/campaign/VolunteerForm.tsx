import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Heart, Send, CheckCircle2, Megaphone, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { campaignService } from '../../services/campaignService';
import { toast } from 'sonner';

export const VolunteerForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        message: '',
        type: 'volunteer' as 'volunteer' | 'supporter'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.first_name || !formData.email) {
            toast.error('Please fill in required fields');
            return;
        }

        setIsSubmitting(true);
        try {
            await campaignService.signUpVolunteer(formData);
            setIsSuccess(true);
            toast.success('Thank you for joining the movement!');
        } catch (error) {
            toast.error('Signup failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-900 p-12 rounded-[2.5rem] shadow-2xl text-center border-2 border-green-500/20"
            >
                <div className="h-20 w-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Registration Successful!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                    Welcome on board! Our mobilization team will reach out to you within 24-48 hours with the next steps.
                </p>
                <Button
                    onClick={() => setIsSuccess(false)}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-10 h-14 font-bold"
                >
                    Close
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 relative z-10 overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 h-48 w-48 bg-green-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 bg-blue-500/5 rounded-full blur-3xl" />

            <div className="relative">
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button
                        onClick={() => setFormData({ ...formData, type: 'volunteer' })}
                        className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${formData.type === 'volunteer'
                            ? 'border-green-600 bg-green-50 dark:bg-green-900/30'
                            : 'border-gray-100 dark:border-gray-800 hover:border-green-200'
                            }`}
                    >
                        <Users className={`h-8 w-8 ${formData.type === 'volunteer' ? 'text-green-600' : 'text-gray-400'}`} />
                        <div className="text-center">
                            <span className={`block font-black uppercase text-[10px] tracking-widest ${formData.type === 'volunteer' ? 'text-green-600' : 'text-gray-400'}`}>Option 01</span>
                            <span className="font-bold text-gray-900 dark:text-white">Be a Volunteer</span>
                        </div>
                    </button>

                    <button
                        onClick={() => setFormData({ ...formData, type: 'supporter' })}
                        className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${formData.type === 'supporter'
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-gray-100 dark:border-gray-800 hover:border-blue-200'
                            }`}
                    >
                        <Heart className={`h-8 w-8 ${formData.type === 'supporter' ? 'text-blue-600' : 'text-gray-400'}`} />
                        <div className="text-center">
                            <span className={`block font-black uppercase text-[10px] tracking-widest ${formData.type === 'supporter' ? 'text-blue-600' : 'text-gray-400'}`}>Option 02</span>
                            <span className="font-bold text-gray-900 dark:text-white">Become a Supporter</span>
                        </div>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">First Identity</label>
                            <Input
                                placeholder="Ex. John"
                                value={formData.first_name}
                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                className="h-14 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-600"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Last Identity</label>
                            <Input
                                placeholder="Ex. Doe"
                                value={formData.last_name}
                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                className="h-14 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-600"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Digital Liaison (Email)</label>
                        <Input
                            type="email"
                            placeholder="john@movement.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-14 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-600"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Motivation / Roles</label>
                        <Textarea
                            placeholder="How would you like to contribute? (Digital mobilization, grassroots organizing, etc.)"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="min-h-[120px] rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                        <ShieldCheck className="h-5 w-5 text-gray-400 shrink-0" />
                        <p className="text-[10px] text-gray-500 font-medium">
                            By joining, you agree to receive digital communications from our campaign headquarters. Your data is encrypted and will never be shared with Third-Party Nodes.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full h-16 rounded-2xl font-black text-xs uppercase tracking-[3px] shadow-2xl transition-all active:scale-95 ${formData.type === 'volunteer'
                            ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white animate-bounce" />
                                <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                                <span className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                            </span>
                        ) : (
                            <>
                                <Megaphone className="mr-3 h-5 w-5" />
                                Commit to the Mission
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};
