import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Users, 
  Building2, 
  GraduationCap, 
  Hospital, 
  Shield,
  TrendingUp,
  CheckCircle,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { newsletterAPI } from '../../lib/api';

const pillars = [
  {
    icon: Building2,
    title: 'Infrastructure Development',
    description: 'Modernizing our cities with world-class infrastructure, efficient transportation systems, and sustainable urban planning.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: GraduationCap,
    title: 'Education Excellence',
    description: 'Investing in quality education, skills development, and creating opportunities for every child to reach their potential.',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Hospital,
    title: 'Healthcare Reform',
    description: 'Ensuring accessible, affordable, and quality healthcare for all citizens with modern medical facilities.',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: TrendingUp,
    title: 'Economic Growth',
    description: 'Creating jobs, supporting businesses, and building a robust economy that works for everyone.',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Shield,
    title: 'Security & Safety',
    description: 'Protecting our communities with advanced security systems and proactive safety measures.',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    icon: Users,
    title: 'Youth Empowerment',
    description: 'Empowering young people with skills, opportunities, and platforms to drive innovation and change.',
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
];

const achievements = [
  'Successfully transformed Lagos into a megacity with world-class infrastructure',
  'Launched innovative public transportation systems',
  'Improved healthcare delivery with new hospitals and medical centers',
  'Enhanced education through school renovation and teacher training programs',
  'Created thousands of jobs through economic initiatives',
  'Implemented modern security and emergency response systems',
];

export const Ambode2027Page: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await newsletterAPI.subscribe(email);
      toast.success('Thank you for your support! You\'re now subscribed to campaign updates.');
      setEmail('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to subscribe');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for reaching out! We\'ll get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600')] bg-cover bg-center" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                <Users className="w-16 h-16" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Ambode 2027
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold mb-4"
            >
              Excellence. Integrity. Development.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90"
            >
              Building on proven leadership and delivering transformative governance for sustainable development and prosperity.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-6 text-lg">
                Join Our Movement
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Vision Statement */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Our Vision for 2027</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              A nation where every citizen has access to quality education, healthcare, and economic opportunities. 
              Where infrastructure drives growth, security ensures peace, and innovation creates a prosperous future for all.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Key Pillars */}
      <div className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Six Pillars of Progress</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive strategies for transformative development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-xl ${pillar.bg} flex items-center justify-center mb-4`}>
                      <pillar.icon className={`w-8 h-8 ${pillar.color}`} />
                    </div>
                    <CardTitle className="text-2xl">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{pillar.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Track Record */}
      <div className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Proven Track Record</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Achievements that speak for themselves
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Stay Updated</CardTitle>
                  <CardDescription>
                    Subscribe to receive campaign updates and news
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Subscribing...' : 'Subscribe to Updates'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get In Touch</CardTitle>
                  <CardDescription>
                    Have questions? Send us a message
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContact} className="space-y-4">
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Textarea
                      placeholder="Your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                    />
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Mail className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="opacity-90">contact@ambode2027.org</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="opacity-90">+234 800 AMBODE 27</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="opacity-90">Campaign Headquarters, Lagos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-20 bg-gray-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Us in Building a Better Future
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Together, we can achieve excellence, uphold integrity, and drive sustainable development.
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 px-12 py-6 text-lg">
            <Heart className="w-5 h-5 mr-2" />
            Support Ambode 2027
          </Button>
        </div>
      </div>
    </div>
  );
};
