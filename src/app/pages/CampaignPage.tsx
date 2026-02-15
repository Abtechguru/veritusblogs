import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  Target,
  Heart,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Megaphone,
  Shield,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { getArticlesByTag } from '../data/mockData';
import { formatDate } from '../lib/utils';

export const CampaignPage = () => {
  const latestNews = getArticlesByTag('Ombugadu').slice(0, 3);

  const keyPolicies = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Education Revolution',
      description: 'Transforming Nasarawa into a knowledge hub with modern infrastructure, teacher training, and scholarship programs.',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Healthcare for All',
      description: 'Continuing the legacy of free NHIS enrollment and expanding accessible, quality healthcare facilities to every ward.',
      color: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Economic Renaissance',
      description: 'Unlocking the potential of agriculture and solid minerals to create sustainable jobs and wealth for our youth.',
      color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security & Peace',
      description: 'Fostering unity and deploying community-based security solutions to ensure the safety of lives and property.',
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400'
    },
  ];



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src="/david portrat.jpg"
            alt="David Ombugadu"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/40 to-transparent opacity-90"></div>
        </div>

        <div className="container mx-auto px-4 pb-20 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none py-1.5 px-4 text-sm backdrop-blur-md">
              The People's Choice 2027
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight drop-shadow-lg">
              DAVID <br /> <span className="text-green-400">OMBUGADU</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              "Leadership is about service, not position. Join me in building a sustainable and inclusive future for Nasarawa."
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white border-none rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-green-500/30 transition-all">
                Join the Movement
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-green-800 rounded-full px-8 py-6 text-lg">
                Read the Manifesto
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-green-800 text-white py-8 relative z-20 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-green-700/50">
            {[
              { label: 'Communities Visited', value: '500+' },
              { label: 'Lives Impacted', value: '50k+' },
              { label: 'Projects Initiated', value: '100+' },
              { label: 'Vision for', value: '2027' },
            ].map((stat, i) => (
              <div key={i} className="p-2">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-green-200 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* ... (existing About content) ... */}
      </section>

      {/* Eggon Nation Section */}
      <section className="py-20 bg-emerald-50 dark:bg-emerald-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 mb-4 hover:bg-emerald-200 border-none">
              Cultural Heritage
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">The Eggon Nation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A diverse but culturally homogenous people, proud of their rich history, independence, and the resilient spirit that defines them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <Card className="border-none shadow-md bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">People & Location</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    The Eggon (pronounced "EH-gone") are an ethnic group mostly based in North Central Nigeria, specifically Nasarawa and Plateau states. Numbering around 200,000+ (2016 est.), they have existed as a decentralized and deeply independent society.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Their name "Eggon" derives from the hill where they lived before migrating to lower plains, roughly translating to "a good sense of hearing or perception ability".
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Clans & Identity</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Historically, the Eggon identified effectively through 3 major clans: <strong>Anzo, Eholo, and Anro</strong>. While sometimes referred to as "Hill Mada" by colonial literature, they are distinct from the Mada people, though sharing cultural similarities.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-none shadow-md bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600">
                      <Megaphone className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Language & Dialects</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                    Eggon is conventionally divided into 25 mutually comprehensible dialects, plus Madantara (Alogani).
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    The earliest written material dates back to 1937. Despite displacement by Hausa in some areas, there is a resurgence in interest, with new publications and a push for literary development despite the lack of a standardized writing system.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-600">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Roots</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    The Eggon language belongs to the Niger-Congo family (Benue-Congo group). Its classification has been a subject of scholarly debate—initially grouped as Plateau 5 by Greenberg, later argued as Benue by Shimizu, and re-evaluated by Gerhardt. This rich complexity highlights the deep and unique roots of the Eggon people.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Pillars */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-4 hover:bg-green-200 border-none">
              Our Pillars
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">A Roadmap for Transformation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We have developed a comprehensive strategy to address the critical challenges facing Nasarawa State, focusing on four key pillars of development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPolicies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${policy.color}`}>
                      {policy.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{policy.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                      {policy.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Political Journey Timeline */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 mb-4 hover:bg-purple-200 border-none">
              Milestones
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Political Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From the youngest parliamentarian to a visionary leader transforming Nasarawa State.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-300 via-green-500 to-green-300 rounded-full hidden md:block"></div>

            {[
              {
                period: 'JUNE 2011- MAY 2015',
                title: 'Youngest Parliamentarian',
                description: 'Member of the House of Representatives as the youngest Member of the 7th National Assembly. Served in various committees in the House of Representatives.',
                icon: <Users className="w-5 h-5" />
              },
              {
                period: 'JUNE 2015-MAY 2019',
                title: 'Committee Chairman',
                description: 'Member of the House of Representatives and Chairman House Committee on Aids, Tuberculosis and Malaria Control of the 8th National Assembly.',
                icon: <Shield className="w-5 h-5" />
              },
              {
                period: 'OCTOBER 1ST 2018',
                title: '2019 Gubernatorial Bearer',
                description: 'Ombugadu contested and won the primary election of the Peoples Democratic Party -PDP and became their flag bearer in the Gubernatorial election in Nasarawa State in the 2019 governorship election.',
                icon: <Target className="w-5 h-5" />
              },
              {
                period: 'MAY 2019 - JANUARY 2020',
                title: 'NHIS Sponsorship',
                description: 'Provided Free NHIS as an individual sponsor, with over 12,000 rural people enrolled under him.',
                icon: <Heart className="w-5 h-5" />
              },
              {
                period: 'JUNE 19, 2023',
                title: '2023 Gubernatorial Bearer',
                description: 'Again, Ombugadu contested and won the primary election of the Peoples Democratic Party -PDP and became their flag bearer in the Gubernatorial election in Nasarawa State in the 2023 governorship election.',
                icon: <Megaphone className="w-5 h-5" />
              },
              {
                period: 'DECEMBER, 2023',
                title: 'Healthcare Champion',
                description: 'In December 2023, he is judged as the highest NHIS as its biggest individual sponsor, with over 12,000 rural people enrolled under him. This impact in the healthcare sector touched so many lives in Nasarawa State and beyond.',
                icon: <TrendingUp className="w-5 h-5" />
              },
              {
                period: 'MARCH, 2024',
                title: 'Expanding Impact',
                description: 'In March 2024, he lunched a continuation of the programme to enrol 13,000 additional beneficiaries, 1,000 each from the 13 LGAs of Nasarawa State. He has the enviable record of introducing the private sponsorship of NHIS to his colleagues in the National Assembly.',
                icon: <CheckCircle2 className="w-5 h-5" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className={`relative flex items-center justify-between md:justify-normal mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Timeline Node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 bg-green-500 text-white items-center justify-center shadow-lg z-10 hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] p-1 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 hover:from-green-500/40 hover:to-blue-500/40 transition-colors duration-500`}>
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl h-full shadow-md hover:shadow-xl transition-shadow relative">
                    {/* Mobile Timeline Node */}
                    <div className="md:hidden absolute -left-3 top-6 w-6 h-6 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 box-content z-10"></div>

                    <div className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold mb-3 tracking-widest border border-green-200 dark:border-green-800">
                      {item.period}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4 hover:bg-blue-200 border-none">
              Impact in Action
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Ongoing Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Delivering continuous development and support to the people of Nasarawa State.
            </p>
          </div>

          <div className="space-y-24">
            {/* Project 1: WATER FOR ALL */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1541944743827-e952992278eb?q=80&w=1000&auto=format&fit=crop"
                    alt="Water for All Project"
                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white uppercase">WATER FOR ALL</h3>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  The “Water for All” project in Nasarawa State where he singlehandedly drilled and installed 1,500 boreholes in rural communities across the state including mosques, Churches and public squares.
                </p>
              </div>
            </div>

            {/* Project 2: SCHOLARSHIP AWARDS */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1577896335477-76bc256673a1?q=80&w=1000&auto=format&fit=crop"
                    alt="Educational Scholarship"
                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl text-yellow-600">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white uppercase">SCHOLARSHIP AWARDS</h3>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  He has touched the lives of thousands of families, widows, orphans and less privileged through his philanthropy schemes including scholarships support scheme, empowerment program, and food intervention.
                </p>
              </div>
            </div>

            {/* Project 3: NHIS ACROSS THE STATE */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
                    alt="NHIS Enrolment"
                    className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white uppercase">NHIS ACROSS THE STATE</h3>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Over 12,000 rural people enrolled under him. In March 2024, he lunched a continuation of the programme to enrol 13,000 additional beneficiaries, 1,000 each from the 13 LGAs of Nasarawa State.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-20 bg-white dark:bg-gray-950/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Campaign News</h2>
            <Link to="/category/politics" className="text-green-600 font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <Link key={article.id} to={`/articles/${article.id}`} className="group">
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                        {formatDate(article.publishedAt)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-green-600 font-medium font-mono">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Movement / Footer CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-900">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 text-green-600 font-bold mb-4 uppercase tracking-widest text-sm">
                <Megaphone className="h-4 w-4" />
                Get Involved
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Your Voice Matters. <br /> Join Us Today.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                We are building a movement of dedicated citizens ready to take back our state. Sign up to volunteer, receive updates, or donate to the cause.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Volunteer</h4>
                    <p className="text-sm text-gray-500">Join our grassroots team in your ward.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Donate</h4>
                    <p className="text-sm text-gray-500">Support the campaign financially.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 w-full bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Join the Newsletter</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                    <Input placeholder="John" className="bg-white dark:bg-gray-900" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                    <Input placeholder="Doe" className="bg-white dark:bg-gray-900" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <Input type="email" placeholder="john@example.com" className="bg-white dark:bg-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message (Optional)</label>
                  <Textarea placeholder="I want to help with..." className="bg-white dark:bg-gray-900 min-h-[100px]" />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg shadow-lg">
                  Sign Me Up
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <div className="text-green-400">📍</div>
                </div>
                <h3 className="font-bold mb-2">Campaign Office</h3>
                <p className="text-gray-300">14 Dubai Cres., Suncity, FCT</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <div className="text-green-400">📞</div>
                </div>
                <h3 className="font-bold mb-2">Phone</h3>
                <p className="text-gray-300">+234 703 223 2386</p>
                <p className="text-gray-300">+234 803 967 0824</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <div className="text-green-400">✉️</div>
                </div>
                <h3 className="font-bold mb-2">Email</h3>
                <a href="mailto:info@ombugadu.com" className="text-gray-300 hover:text-green-400">info@ombugadu.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
