import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Heart,
  Lightbulb,
  Building2,
  GraduationCap,
  Stethoscope,
  Leaf,
  Shield,
  TrendingUp,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Megaphone,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import { SERVER_URL } from '../lib/supabase';
import { publicAnonKey } from '../../../utils/supabase/info';
import { DonationSection } from '../components/campaign/DonationSection';
import { VolunteerForm } from '../components/campaign/VolunteerForm';

export function AmbodeCampaignPage() {
  const donationRef = useRef<HTMLDivElement>(null);
  const volunteerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubscribing(true);
    try {
      const response = await fetch(`${SERVER_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Subscribed to campaign updates!');
        setEmail('');
      } else {
        toast.error('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const pillars = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Education Reform',
      description: 'Transforming education through modern infrastructure, teacher empowerment, and accessible learning for all.',
      color: 'blue',
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: 'Healthcare Access',
      description: 'Universal healthcare coverage with state-of-the-art facilities and community health programs.',
      color: 'green',
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'Infrastructure Development',
      description: 'Building roads, bridges, and modern amenities to connect communities and drive economic growth.',
      color: 'orange',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Economic Empowerment',
      description: 'Creating jobs, supporting SMEs, and fostering innovation for sustainable economic prosperity.',
      color: 'purple',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security & Safety',
      description: 'Ensuring peace and security through modern policing, community engagement, and crime prevention.',
      color: 'red',
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Environmental Sustainability',
      description: 'Protecting our environment through green initiatives, renewable energy, and conservation programs.',
      color: 'emerald',
    },
  ];

  const achievements = [
    'Successfully led infrastructure modernization projects',
    'Improved education access for over 500,000 students',
    'Launched youth empowerment programs creating 50,000+ jobs',
    'Implemented healthcare initiatives reducing infant mortality by 30%',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <p className="text-sm font-semibold uppercase tracking-wide">Campaign 2027</p>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              AMBODE 2027
            </h1>

            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              A Vision for Progress, Prosperity, and People
            </p>

            <p className="text-lg md:text-xl mb-8 text-blue-200 max-w-2xl mx-auto">
              Together, we can build a future where every citizen has access to quality education, healthcare, and opportunities for growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollTo(volunteerRef)}
                className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-white/10"
              >
                <Users className="mr-2 h-5 w-5" />
                Join the Movement
              </Button>
              <Button
                size="lg"
                onClick={() => scrollTo(donationRef)}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 font-black uppercase tracking-widest rounded-2xl"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 fill-gray-50 dark:fill-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Lightbulb className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              To create a society where every citizen, regardless of background, has equal access to opportunities,
              quality services, and a platform to achieve their dreams. We envision a future built on transparency,
              accountability, and inclusive development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500K+</div>
                <div className="text-gray-600 dark:text-gray-400">Students Empowered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">Jobs Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">200+</div>
                <div className="text-gray-600 dark:text-gray-400">Infrastructure Projects</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Pillars */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Policy Pillars
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Six key areas of focus that will transform our society and create lasting positive change.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-${pillar.color}-100 dark:bg-${pillar.color}-900 text-${pillar.color}-600 dark:text-${pillar.color}-300 mb-4`}>
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-gray-900 dark:text-white leading-tight">
              A Legacy of <span className="text-blue-600 italic">Excellence.</span>
            </h2>
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-6 p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/20">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 pt-1 text-lg leading-relaxed font-medium">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real-time Donation Tracking */}
      <div ref={donationRef}>
        <DonationSection />
      </div>

      {/* Join the Movement / Volunteer Section */}
      <section ref={volunteerRef} className="py-32 relative overflow-hidden bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black mb-6 uppercase tracking-[4px] text-xs">
                  <Megaphone className="h-4 w-4" />
                  Become a Partner in Progress
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-gray-900 dark:text-white leading-tight">
                  Your Leadership <span className="text-blue-600 italic">Counts.</span> <br /> Join the Frontline.
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-10 text-xl leading-relaxed">
                  The journey to 2027 requires every hand on deck. Join our network of dedicated citizens working to build a more prosperous and inclusive society.
                </p>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-widest mb-1">Volunteer</h4>
                      <p className="text-sm text-gray-500">Mobilize voters and educate communities.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800">
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-widest mb-1">Supporter</h4>
                      <p className="text-sm text-gray-500">Contribute expertise and digital presence.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <VolunteerForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Connected
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of supporters and receive updates on our campaign, upcoming events, and ways to get involved.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                <Mail className="mr-2 h-4 w-4" />
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>

            <Separator className="my-8 bg-white/20" />

            <div className="flex justify-center gap-6">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10">
                <Facebook className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10">
                <Twitter className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10">
                <Instagram className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-white/10">
                <Youtube className="h-6 w-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
