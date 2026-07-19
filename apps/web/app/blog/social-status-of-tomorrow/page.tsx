'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion as originalMotion } from 'framer-motion';
import {
  Heart,
  ShieldCheck,
  Users,
  Globe,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Card, Button } from '@algoguido/ui';

const motion = originalMotion as any;

export default function BlogPostPage() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(342);
  const [bookmarked, setBookmarked] = useState(false);
  const footerRef = React.useRef<HTMLDivElement>(null);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-[#070b19] transition-colors duration-300 font-sans text-slate-800 dark:text-slate-200">

      {/* Decorative Blur Background Highlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.03] dark:bg-blue-500/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] right-1/4 w-[400px] h-[400px] bg-purple-500/[0.03] dark:bg-purple-500/[0.015] rounded-full blur-[120px] pointer-events-none" />

      {/* Header Strip */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/#blog" className="flex items-center gap-2 group">
            <ArrowLeft className="h-4 w-4 text-slate-500 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Back to Blog Page
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'The Social Status of Tomorrow',
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share Article"
            >
              <Share2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Bookmark Article"
            >
              <Bookmark className={`h-4 w-4 transition-colors ${bookmarked ? 'fill-blue-500 text-blue-500' : 'text-slate-500 dark:text-slate-400'}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-10"
        >
          {/* Metadata Card resembling LinkedIn source but styled premium */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-200/50 dark:border-white/5 bg-white shrink-0 shadow-sm flex items-center justify-center">
                  <Image src="/logo.png" alt="Algoguido Logo" width={32} height={32} className="object-contain" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-950 dark:text-white text-sm">Dr. Mostaque Hassan, PhD, GAU</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Founder cum Director, Algoguido Technologies Pvt. Ltd., Guwahati</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar className="h-3 w-3" />
                <span>July 19, 2026</span>
                <span className="mx-1">•</span>
                <Clock className="h-3 w-3" />
                <span>5 min read</span>
              </div>
            </div>

            {/* Main Header Title */}
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-widest text-[#0052cc] dark:text-blue-400 uppercase">INSIGHT-DRIVEN ARTICLES</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl md:text-5xl text-slate-950 dark:text-white leading-tight tracking-tight">
                The Social Status of Tomorrow:<br />
                <span className="bg-gradient-to-r from-[#0052cc] to-purple-600 bg-clip-text text-transparent">3 Transformations That Will Redefine Our World</span>
              </h1>
              <p className="text-base md:text-lg text-slate-655 dark:text-slate-350 leading-relaxed font-medium italic border-l-4 border-purple-500/50 pl-4 mt-2">
                As technology evolves and societies transform, the definition of family, love, and responsibility is being rewritten. Are we ready for a new social revolution?
              </p>
            </div>
          </motion.div>

          {/* Transformation 1 */}
          <motion.div variants={itemVariants} className="w-full">
            <Card className="overflow-hidden border border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl hover:shadow-2xl transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 items-center">
                <div className="md:col-span-7 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-500 text-white font-bold text-sm shadow-sm shadow-blue-500/20">1</span>
                    <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white leading-tight">
                      Love Beyond Biology: Humans & Robots
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    In the coming decades, advanced AI and robotics will not just assist humans - they will connect, understand, and become life partners.
                  </p>
                  <ul className="flex flex-col gap-3">
                    {[
                      "Individuals will choose robots as life partners based on gender identity of their choice.",
                      "Love and companionship will be redefined beyond biological limitations.",
                      "Privacy, emotions, and AI-powered psychology will make robot partners more human-like than ever."
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/20 rounded-2xl p-4 mt-2">
                    <p className="text-sm font-semibold italic text-[#0052cc] dark:text-blue-400 leading-relaxed text-center">
                      "Love is not about what you are, it's about how you make me feel."
                    </p>
                  </div>
                </div>
                <div className="md:col-span-5 relative w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/blog/humans_and_robots.png"
                    alt="Love Beyond Biology: Humans and Robots"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Transformation 2 */}
          <motion.div variants={itemVariants} className="w-full">
            <Card className="overflow-hidden border border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl hover:shadow-2xl transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 items-center">
                <div className="md:col-span-5 order-2 md:order-1 relative w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/blog/ending_dowry_violence.png"
                    alt="Ending Dowry & Violence"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="md:col-span-7 order-1 md:order-2 flex flex-col gap-5 relative">
                  {/* Purple Ribbon SVG */}
                  <div className="absolute top-0 right-0 w-12 h-12 text-purple-500/80 hover:scale-110 transition-transform cursor-pointer" title="Zero Tolerance Movement">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 8.5 8.7 10.3 10.3 11.2L5.8 21.3C5.5 22 6 22.8 6.8 22.8H8.8C9.3 22.8 9.7 22.5 10 22L12 17.5L14 22C14.3 22.5 14.7 22.8 15.2 22.8H17.2C18 22.8 18.5 22 18.2 21.3L13.7 11.2C15.3 10.3 16.5 8.5 16.5 6.5C16.5 4 14.5 2 12 2ZM12 4C13.4 4 14.5 5.1 14.5 6.5C14.5 7.9 13.4 9 12 9C10.6 9 9.5 7.9 9.5 6.5C9.5 5.1 10.6 4 12 4Z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-purple-600 text-white font-bold text-sm shadow-sm shadow-purple-500/20">2</span>
                    <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white leading-tight pr-10">
                      Ending Dowry & Violence: A Social Awakening
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    Dowry and social violence continue to destroy lives and families. The future demands a zero-tolerance society.
                  </p>
                  <ul className="flex flex-col gap-3">
                    {[
                      "Strict global laws and AI-driven monitoring will curb dowry crimes.",
                      "Collective social movements will shame and eliminate such practices.",
                      "True progress is measured by how we treat our women, not by wealth or status."
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-purple-50/50 dark:bg-purple-950/10 border border-purple-100/50 dark:border-purple-900/20 rounded-2xl p-4 mt-2">
                    <p className="text-sm font-semibold italic text-purple-700 dark:text-purple-400 leading-relaxed text-center">
                      "A society is advanced when it respects women, not when it demands dowry."
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Transformation 3 */}
          <motion.div variants={itemVariants} className="w-full">
            <Card className="overflow-hidden border border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl hover:shadow-2xl transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 items-center">
                <div className="md:col-span-7 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-sm shadow-emerald-500/20">3</span>
                    <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white leading-tight">
                      Adoption & Sperm Donation: A Global Responsibility
                    </h2>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    Loneliness and declining birth rates will lead to a new wave of global responsibility.
                  </p>
                  <ul className="flex flex-col gap-3">
                    {[
                      "Adoption from underdeveloped countries will be seen as a noble social trend.",
                      "Sperm donation will become normalized and celebrated as a way to sustain humanity.",
                      "Supporting life is the highest form of humanity and legacy."
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/20 rounded-2xl p-4 mt-2">
                    <p className="text-sm font-semibold italic text-emerald-700 dark:text-emerald-400 leading-relaxed text-center">
                      "It's not about your bloodline, it's about your impact on the human race."
                    </p>
                  </div>
                </div>
                <div className="md:col-span-5 relative w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/blog/adoption_sperm_donation.png"
                    alt="Adoption and Sperm Donation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Pillars Section: The Future Belongs to Responsible Humans */}
          <motion.div variants={itemVariants} className="w-full text-center flex flex-col gap-8 py-10 border-t border-b border-slate-200/50 dark:border-white/5">
            <div className="flex flex-col gap-3 max-w-2xl mx-auto">
              <h2 className="font-display font-extrabold text-2xl md:text-3.5xl text-slate-950 dark:text-white leading-tight">
                The Future Belongs to Responsible Humans
              </h2>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Technology will change how we live, but our responsibility will define how humanity survives and thrives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  color: 'text-red-500 bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/20',
                  title: 'Love Without Limits',
                  desc: 'Choose your partner with freedom and respect.'
                },
                {
                  icon: ShieldCheck,
                  color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/20',
                  title: 'Zero Tolerance Society',
                  desc: 'Stand against dowry and violence together.'
                },
                {
                  icon: Users,
                  color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/20',
                  title: 'Global Parenthood',
                  desc: 'Adopt. Donate. Support. Sustain the future.'
                },
                {
                  icon: Globe,
                  color: 'text-[#0052cc] bg-[#0052cc]/5 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/20',
                  title: 'Humanity First',
                  desc: 'Our choices today shape the world of tomorrow.'
                }
              ].map((pillar, index) => (
                <Card key={index} className="flex flex-col items-center text-center gap-4 p-5 hover:-translate-y-1.5 transition-transform duration-300 bg-white/50 dark:bg-slate-900/20 border border-slate-200/50 dark:border-white/5 rounded-2xl animate-fade-in">
                  <div className={`p-3 rounded-full border ${pillar.color}`}>
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">{pillar.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{pillar.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Large Bottom Banner */}
          <motion.div variants={itemVariants} className="w-full relative rounded-3xl overflow-hidden shadow-xl aspect-[21/9] md:aspect-[3/1] group flex items-center justify-center">
            <Image
              src="/blog/future_humanity_banner.png"
              alt="Let's build a future where love is inclusive"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Rich styling overlay to ensure readable text */}
            <div className="absolute inset-0 bg-slate-950/50 dark:bg-slate-950/65 backdrop-blur-[2px] transition-all flex flex-col justify-center items-center text-center p-6 md:p-10 gap-3 md:gap-4">
              <h2 className="text-lg md:text-3xl font-display font-extrabold text-white leading-tight max-w-2xl">
                Let's build a future where love is inclusive, society is just, and humanity is our true legacy.
              </h2>
              <p className="text-xs md:text-base font-extrabold tracking-wider text-yellow-500 dark:text-yellow-400 uppercase">
                Be part of the change. The future is in our hands.
              </p>
            </div>
          </motion.div>

          {/* Social Feedback / Like button */}
          <motion.div variants={itemVariants} className="flex justify-between items-center bg-white dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 rounded-2xl px-6 py-4">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 group text-sm font-semibold transition-colors"
              >
                <ThumbsUp className={`h-5 w-5 transition-transform group-hover:scale-110 ${liked ? 'text-[#0052cc] fill-[#0052cc]' : 'text-slate-500'}`} />
                <span className={liked ? 'text-[#0052cc]' : 'text-slate-655 dark:text-slate-400'}>
                  {likeCount} Likes
                </span>
              </button>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-655 dark:text-slate-400">
                <MessageSquare className="h-5 w-5 text-slate-500" />
                <span>12 Comments</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="text-xs font-bold gap-2"
              onClick={() => {
                const shareData = {
                  title: 'The Social Status of Tomorrow — Algoguido',
                  text: 'A thought-provoking read on humanity, AI, and our social future.',
                  url: window.location.href,
                };
                if (navigator.share) {
                  navigator.share(shareData);
                } else {
                  navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard!');
                  });
                }
              }}
            >
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </motion.div>

          {/* Hashtags Footer */}
          <motion.div ref={footerRef} variants={itemVariants} id="blog-footer" className="flex flex-col gap-6 pt-6 border-t border-slate-200/60 dark:border-white/5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Related Topics & Discussions</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'FutureOfSociety',
                'AlandHumanity',
                'SocialResponsibility',
                'LoveBeyondLimits',
                'EndDowry',
                'AdoptionMatters',
                'HumanityFirst',
                'BuildABetterTomorrow'
              ].map(tag => (
                <Link
                  key={tag}
                  href={`/sitemap?q=${tag.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200/50 dark:border-white/5"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Publish Blog CTA - text only, no button */}
            <div className="mt-6 p-5 rounded-2xl border border-slate-200/50 dark:border-white/5 bg-white/30 dark:bg-slate-900/10">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                <span className="font-bold text-slate-700 dark:text-slate-300">Publish Your Article on Our Platform — </span>
                Would you like to share your expertise? Send your technology or business drafts in Word, PDF, or image format to{' '}
                <a href="mailto:info@algoguido.com" className="text-[#0052cc] dark:text-blue-400 font-semibold hover:underline">info@algoguido.com</a>{' '}for editorial review.
              </p>
            </div>

            {/* Back Home CTA Footer */}
            <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-950/10 dark:to-purple-950/10 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
              <div className="flex flex-col gap-1 text-center md:text-left">
                <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-tight">Explore More Innovations</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Discover how Algoguido Technologies is engineering enterprise systems and agentic workflows.
                </p>
              </div>
              <Link href="/">
                <Button className="font-bold gap-2 text-xs uppercase tracking-wider h-11 px-6 rounded-xl bg-gradient-brand hover:scale-[1.02] text-white">
                  VISIT ALGOGUIDO CORPORATE SITE <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.article>
      </main>
    </div>
  );
}
