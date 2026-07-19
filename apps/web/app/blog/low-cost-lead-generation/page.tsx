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
  Calendar,
  Clock,
  ExternalLink,
  Database,
  ArrowDown,
  Layers,
  Zap,
  PhoneCall,
  CreditCard,
  CheckSquare
} from 'lucide-react';
import { Button } from '@algoguido/ui';

const motion = originalMotion as any;

export default function LeadGenBlogPage() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(412);
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
                const cleanUrl = window.location.href.split('?')[0];
                const shareUrl = `${cleanUrl}?v=3`;
                if (navigator.share) {
                  navigator.share({
                    title: 'Designing a Low-Cost & Robust Lead Generation System',
                    url: shareUrl
                  });
                } else {
                  navigator.clipboard.writeText(shareUrl).then(() => {
                    alert('Link copied to clipboard!');
                  });
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
          {/* Metadata Header */}
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
                <span>May 18, 2025</span>
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
                Designing a Low-Cost & Robust Lead Generation System
              </h1>
              <p className="text-base md:text-lg text-slate-655 dark:text-slate-350 leading-relaxed font-medium italic border-l-4 border-purple-500 pl-4 mt-2">
                A practical architecture for controlled automation — blending n8n workflows, human validation, and event-driven Razorpay webhooks.
              </p>
            </div>
          </motion.div>

          {/* Section 1: The Design Philosophy */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              In modern digital systems, the challenge is no longer lead acquisition. It is lead control. Automation without governance produces volume, not value.
            </p>

            <div className="bg-slate-100 dark:bg-slate-900/30 border-l-4 border-purple-500 rounded-r-2xl p-5 my-3">
              <p className="text-lg font-extrabold italic text-purple-700 dark:text-purple-400 text-center leading-relaxed">
                “A system that converts blindly is not efficient — it is fragile.”
              </p>
            </div>

            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              This article documents a real-world lead generation architecture designed to remain cost-efficient, auditable, and scalable, while preserving human accountability at critical decision points.
            </p>
            
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-4">The Design Philosophy</h3>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              The system was built on a simple principle: automation should accelerate decisions, not replace judgment. Every phase exists to reduce noise, prevent misuse, and maintain clarity.
            </p>
          </motion.div>

          {/* Section 2: The Four-Phase Architecture */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#0052cc]" /> The Four-Phase Architecture
            </h2>

            <div className="flex flex-col gap-5">
              {[
                {
                  phase: "Phase 1",
                  title: "n8n Lead Intake, Normalization & Scoring",
                  icon: Database,
                  color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/20",
                  desc: "The system begins with n8n-driven lead intake, where incoming data from websites and APIs is normalized, validated, de-duplicated, and lightly scored to ensure quality and relevance. This phase acts as a safeguard, preventing noisy or malformed leads from entering downstream workflows."
                },
                {
                  phase: "Phase 2",
                  title: "Telecaller Validation (Human in the Loop)",
                  icon: PhoneCall,
                  color: "text-purple-500 bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/20",
                  desc: "Automation intentionally pauses. A telecaller confirms intent, context, and seriousness before any financial action is triggered. This human gate prevents unnecessary spam notifications and ensures resources are only allocated to qualified candidates."
                },
                {
                  phase: "Phase 3",
                  title: "n8n Payment Trigger & WhatsApp Alert",
                  icon: Zap,
                  color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/20",
                  desc: "Once validation is successful, automation resumes. n8n generates a secure Razorpay payment link and pushes it to the candidate via WhatsApp (ensuring higher open rates and faster response compared to emails). Simultaneously, notifications are sent to internal stakeholders."
                },
                {
                  phase: "Phase 4",
                  title: "Razorpay Webhook & Automatic Enrollment",
                  icon: CreditCard,
                  color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/20",
                  desc: "Payment confirmation is handled completely asynchronously through event-driven Razorpay webhooks. The webhook updates database statuses, confirms enrollments, and triggers onboarding workflows without any manual reconciliation or polling overhead."
                }
              ].map((ph, idx) => (
                <div key={idx} className="p-5 md:p-6 bg-white dark:bg-slate-900/25 border border-slate-200/50 dark:border-white/5 rounded-2xl flex flex-col md:flex-row gap-4 items-start hover:border-[#0052cc]/20 dark:hover:border-white/10 transition-all">
                  <div className={`p-3 rounded-xl border shrink-0 ${ph.color}`}>
                    <ph.icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{ph.phase}</span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-base md:text-lg tracking-tight">{ph.title}</h4>
                    <p className="text-xs md:text-sm text-slate-655 dark:text-slate-400 leading-relaxed font-medium">{ph.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 3: Flowchart Visualization (Stunning representation of ASCII diagram) */}
          <motion.div variants={itemVariants} className="w-full py-8 border-t border-b border-slate-200/50 dark:border-white/5 flex flex-col gap-6 text-center">
            <div className="flex flex-col gap-1 max-w-lg mx-auto">
              <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">Logical System Flow</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Asynchronous event-driven lifecycle of a lead</p>
            </div>

            <div className="flex flex-col items-center gap-4 max-w-md mx-auto w-full">
              {[
                { label: 'Website / Landing Pages', sub: 'Lead generated', bg: 'bg-[#FAF9F5] border-slate-200 dark:bg-slate-950 dark:border-white/5' },
                { label: 'Lead Database', sub: 'Data persists', bg: 'bg-[#FAF9F5] border-slate-200 dark:bg-slate-950 dark:border-white/5' },
                { label: 'Phase 1: n8n Intake', sub: 'Data normalized & scored', bg: 'bg-blue-50/50 border-blue-100 dark:bg-blue-950/10 dark:border-blue-900/20 text-[#0052cc] dark:text-blue-400' },
                { label: 'Phase 2: Telecaller Validation', sub: 'Intent & seriousness check', bg: 'bg-purple-50/50 border-purple-100 dark:bg-purple-950/10 dark:border-purple-900/20 text-purple-600 dark:text-purple-400' },
                { label: 'Phase 3: n8n Payment Trigger', sub: 'Razorpay link sent via WhatsApp', bg: 'bg-amber-50/50 border-amber-100 dark:bg-amber-950/10 dark:border-amber-900/20 text-amber-600 dark:text-amber-400' },
                { label: 'Phase 4: Razorpay Webhook', sub: 'Asynchronous payment event caught', bg: 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20 text-emerald-600 dark:text-emerald-400' },
                { label: 'Enrollment Confirmed', sub: 'Automation completes', bg: 'bg-gradient-brand text-white border-transparent' }
              ].map((step, i) => (
                <React.Fragment key={i}>
                  <div className={`w-full py-3.5 px-6 rounded-2xl border text-center flex flex-col gap-0.5 shadow-sm hover:scale-[1.01] transition-transform duration-300 ${step.bg}`}>
                    <span className="text-xs font-bold tracking-tight">{step.label}</span>
                    <span className={`text-[10px] ${i === 6 ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'} font-medium`}>{step.sub}</span>
                  </div>
                  {i < 6 && (
                    <div className="flex flex-col items-center">
                      {i === 3 ? (
                        <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-50 dark:bg-purple-950/20 px-2 py-0.5 rounded border border-purple-100 dark:border-purple-900/20 my-0.5">Interested</span>
                      ) : null}
                      <ArrowDown className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Section 4: Why This Model Works */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-emerald-600" /> Why This Model Works
            </h2>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              By using light-weight orchestration layers (like n8n) and decoupled webhooks, the stack maintains extremely low overhead compared to heavy CRM software suites. Additionally:
            </p>
            <ul className="flex flex-col gap-3 my-2">
              {[
                { title: 'Zero Vendor Lock-in', desc: 'Flows can be migrated from n8n to other orchestrators easily, and Razorpay interfaces are fully standardized.' },
                { title: 'Explainable Auditing', desc: 'Every phase creates database timestamps, allowing logs to be traced in detail in case of billing discrepancies.' },
                { title: 'High Intent Validation', desc: 'No automation runs without prior validation gates, optimizing stakeholder attention.' }
              ].map((boundary, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-600 shrink-0 mt-2" />
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">{boundary.title}</span>
                    <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">{boundary.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-[#0019CF]/5 border border-[#0019CF]/10 dark:border-blue-900/20 rounded-2xl p-5 text-center mt-4">
              <p className="text-base font-extrabold text-[#0019CF] dark:text-blue-400 italic">
                "Control is not the enemy of automation. It is the reason automation survives."
              </p>
            </div>
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
            </div>

            <Button
              variant="outline"
              className="text-xs font-bold gap-2"
              onClick={() => {
                const cleanUrl = window.location.href.split('?')[0];
                const shareUrl = `${cleanUrl}?v=3`;
                const shareData = {
                  title: 'Low Cost Lead Generation \u2014 Algoguido',
                  text: 'See how automated workflows can generate quality leads at minimal cost.',
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
                'WorkflowDesign',
                'n8nAutomation',
                'LeadGeneration',
                'RazorpayWebhooks',
                'HumanInTheLoop',
                'SystemArchitecture',
                'SaaSCode'
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
                <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-tight">Need Robust Automation Customizations?</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Connect with our systems architects in Guwahati to design secure, localized workflows.
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
