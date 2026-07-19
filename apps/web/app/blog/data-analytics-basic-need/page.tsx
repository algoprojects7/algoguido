'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion as originalMotion } from 'framer-motion';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Clock,
  ExternalLink,
  TrendingUp,
  Database,
  Users,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@algoguido/ui';

const motion = originalMotion as any;

export default function DataAnalyticsBlogPage() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(284);
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
                    title: 'Data Analytics Is Becoming a Basic Human Skill',
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
          {/* Metadata Header with Logo */}
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
                <span>January 1, 2025</span>
                <span className="mx-1">•</span>
                <Clock className="h-3 w-3" />
                <span>4 min read</span>
              </div>
            </div>

            {/* Main Header Title */}
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-widest text-[#0052cc] dark:text-blue-400 uppercase">INSIGHT-DRIVEN ARTICLES</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl md:text-5xl text-slate-950 dark:text-white leading-tight tracking-tight">
                Data Analytics Is Becoming a Basic Human Skill - Are We Prepared?
              </h1>
              <p className="text-base md:text-lg text-slate-655 dark:text-slate-350 leading-relaxed font-medium italic border-l-4 border-blue-500 pl-4 mt-2">
                A future warning, a responsibility, and a roadmap — grounded in 18+ years of academic, research, and industry experience.
              </p>
            </div>
          </motion.div>

          {/* Section 1: The Trajectory of Necessity */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              In every era of human progress, certain capabilities quietly transform from competitive advantages into basic necessities. Electricity, the internet, digital payments — each once seemed optional, even futuristic. Today, life pauses without them.
            </p>

            <div className="bg-[#0052cc]/5 dark:bg-blue-950/20 border-l-4 border-[#0052cc] rounded-r-2xl p-5 my-4">
              <p className="text-lg font-extrabold italic text-[#0052cc] dark:text-blue-400 text-center leading-relaxed">
                "Data Analytics is now on the same trajectory."
              </p>
            </div>

            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              In the next one to two years, data analytics will no longer remain a specialized capability. It will become a <strong>basic operational requirement</strong> across education, healthcare, agriculture, governance, startups, and enterprises.
            </p>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              Organizations that fail to adopt analytics will not simply slow down — they will lose decision-making clarity. In the modern economy, decisions without data are guesses, and guesswork no longer scales.
            </p>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              After nearly two decades of collective engagement across academia, industry, applied research, and technology-driven ecosystems, the Editorial Board of Algoguido Technologies believes it is no longer optional — but a professional and social responsibility — to caution society about the transformation that lies ahead. This perspective is speculative no more. It is grounded in recurring patterns we have observed across sectors, now accelerating at an unprecedented pace in the era of artificial intelligence.
            </p>
          </motion.div>

          {/* Section 2: A Silent Crisis */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" /> A Silent Crisis in the Making
            </h2>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              Data generation is growing exponentially, but trained analytical manpower is not. This imbalance is creating a silent but systemic crisis. Within the next two years, many sectors will face a reality where work exists, but trained analysts do not.
            </p>

            <div className="bg-red-500/5 dark:bg-red-950/10 border border-red-500/10 rounded-2xl p-5 text-center my-2">
              <p className="text-base md:text-lg font-bold text-red-600 dark:text-red-400 italic">
                “No data. No insight. No decision. No future.”
              </p>
            </div>
          </motion.div>

          {/* Section 3: Foundational Skill Pillars */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white flex items-center gap-2">
              <Database className="h-5 w-5 text-[#0052cc]" /> Data Analytics as a Foundational Skill
            </h2>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              Just as literacy and digital skills became mandatory in earlier decades, analytics is now emerging as a foundational human competency across every core societal function:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {[
                {
                  title: "Healthcare Delivery",
                  desc: "Depends directly on predictive analytics for patient outcomes, resource optimization, and diagnostic validation."
                },
                {
                  title: "Modern Agriculture",
                  desc: "Relies on yield forecasting, soil health patterns, and disease detection analytics to ensure food security."
                },
                {
                  title: "Academic & Education",
                  desc: "Requires outcome-driven, student-centric learning analytics to guide curriculum development and student retention."
                },
                {
                  title: "Business Sustainability",
                  desc: "Depends completely on real-time data pipelines to navigate volatile markets, inflation, and customer retention."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-white dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 rounded-2xl flex items-start gap-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 4: Responsibility */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" /> Algoguido Technologies’ Responsibility
            </h2>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              The digital AI revolution is redefining what is considered a basic resource. Data analytics is rapidly joining that category. The question is not whether this change will come — but who will be ready when it does.
            </p>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              At <strong>Algoguido Technologies</strong>, our mission extends beyond training. We choose preparedness over panic, foresight over reaction, and responsibility over delay. We aim to prepare society for an analytics-driven future through disciplined, mentorship-led programs and applied research.
            </p>

            <div className="bg-[#0019CF]/5 border border-[#0019CF]/10 dark:border-blue-900/20 rounded-2xl p-5 text-center mt-2">
              <p className="text-base font-extrabold text-[#0019CF] dark:text-blue-400">
                Data will define the future. Action today decides relevance tomorrow.
              </p>
            </div>
          </motion.div>

          {/* Call To Action box */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-10 text-center text-white shadow-xl flex flex-col gap-5 items-center">
            <h3 className="font-display font-extrabold text-xl md:text-3xl leading-tight max-w-lg">
              Prepare for the Analytics-Driven Future
            </h3>
            <p className="text-xs md:text-base text-blue-100 max-w-md">
              Explore structured courses, one-on-one mentorship, and professional career guidance from industry veterans.
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              <Link href="/#research">
                <Button className="font-bold text-xs uppercase tracking-wider bg-white text-blue-700 hover:bg-blue-50 px-6 h-11 rounded-xl shadow-md">
                  Explore Programs
                </Button>
              </Link>
              <Link href="/#contact">
                <Button variant="outline" className="font-bold text-xs uppercase tracking-wider border-white text-white hover:bg-white/10 px-6 h-11 rounded-xl">
                  Get Career Guidance
                </Button>
              </Link>
            </div>
            <p className="text-[10px] text-blue-200/70 italic mt-2">
              *Learning outcomes may vary based on individual effort, prior background, and professional objectives.
            </p>
          </motion.div>

          {/* Social Feedback / Like button */}
          <motion.div variants={itemVariants} className="flex justify-between items-center bg-white dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 rounded-2xl px-6 py-4 mt-2">
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
                <span>8 Comments</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="text-xs font-bold gap-2"
              onClick={() => {
                const cleanUrl = window.location.href.split('?')[0];
                const shareUrl = `${cleanUrl}?v=2`;
                const shareData = {
                  title: 'Why Data Analytics is a Basic Need \u2014 Algoguido',
                  text: 'Discover why data literacy is the essential skill of the modern era.',
                  url: shareUrl,
                };
                if (navigator.share) {
                  navigator.share(shareData);
                } else {
                  navigator.clipboard.writeText(shareUrl).then(() => {
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
                'DataAnalytics',
                'BasicSkill',
                'AppliedResearch',
                'HealthcareData',
                'AgriTechData',
                'AlgoguidoPrep',
                'Foresight',
                'FutureLiteracy'
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
                <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-tight">Explore More Insights</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Review our course calendars and learn how we empower the next generation of analysts.
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
