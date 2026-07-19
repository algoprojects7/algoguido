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
  Cpu,
  Brain,
  Database,
  Lock,
  TrendingUp
} from 'lucide-react';
import { Card, Button } from '@algoguido/ui';

const motion = originalMotion as any;

export default function AIEnterpriseBlogPage() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(512);
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
            <ArrowLeft className="h-4 w-5 text-slate-500 group-hover:-translate-x-1 transition-transform" />
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
                    title: 'The Future of AI in Enterprise Development',
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
                <span>May 20, 2025</span>
                <span className="mx-1">•</span>
                <Clock className="h-3 w-3" />
                <span>7 min read</span>
              </div>
            </div>
            
            {/* Main Header Title */}
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-widest text-[#0052cc] dark:text-blue-400 uppercase">INSIGHT-DRIVEN ARTICLES</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl md:text-5xl text-slate-950 dark:text-white leading-tight tracking-tight">
                The Future of AI in Enterprise:<br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">From Simple Prompts to Hyper-Specialized Agents</span>
              </h1>
              <p className="text-base md:text-lg text-slate-655 dark:text-slate-350 leading-relaxed font-medium italic border-l-4 border-blue-500 pl-4 mt-2">
                General-purpose LLMs are hitting a ceiling in corporate utility. The future of enterprise AI lies in secure, hyper-specialized multi-agent systems integrated deeply with private databases.
              </p>
            </div>
          </motion.div>

          {/* Section 1: The Death of the Generic Chatbot */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#0052cc]" /> 1. The Paradigm Shift: From Chatbots to Agentic Workflows
            </h2>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              When ChatGPT took the world by storm in late 2022, organizations rushed to integrate general-purpose API wrappers into their interfaces. Today, the novelty has faded, and enterprises are realizing a stark truth: <strong>generic chatbots do not solve complex business workflows.</strong>
            </p>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              Real business processes are multi-step, require context, and demand deterministic outcomes. The industry is rapidly transitioning to <strong>Agentic AI</strong> — autonomous systems that don't just answer questions, but plan, execute, and verify tasks.
            </p>

            {/* Fact Showcase Card */}
            <Card className="bg-white/60 dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 p-6 rounded-2xl mt-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" /> Key Fact: Gartner Research on Agentic AI
              </h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                According to recent Gartner reports, by 2026, over 75% of new enterprise applications will incorporate autonomous AI agents, up from less than 5% in 2023. This shift is projected to reduce workflow handling times by up to 60% across standard customer service, sales, and database operations.
              </p>
            </Card>
          </motion.div>

          {/* Section 2: Multi-Agent Orchestration in Action */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-purple-600" /> 2. Multi-Agent Systems: How Collaboration Wins
            </h2>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              Single-agent configurations suffer from high error rates when task complexity escalates. The solution? <strong>Multi-agent orchestration</strong>, where multiple specialized agents cooperate to solve complex operations, akin to an internal team of humans.
            </p>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              At Algoguido Technologies, we have pioneered this paradigm with our <strong>AI Workforce for Business</strong>. Rather than using one broad model, this platform orchestrates <strong>6 specialized AI agents</strong> working in harmony:
            </p>

            {/* 6 Agents Process Flow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {[
                { name: '1. Discovery Agent', desc: 'Scours public domains and signals to identify high-quality business leads.' },
                { name: '2. Qualification Agent', desc: 'Scores lead relevance based on historic enterprise CRM conversion data.' },
                { name: '3. Personalization Agent', desc: 'Crafts tailored value propositions based on lead pain points and firmographics.' },
                { name: '4. Outreach Agent', desc: 'Automates context-aware, secure sequence deliveries across corporate channels.' },
                { name: '5. Negotiation Agent', desc: 'Handles initial FAQs, scheduling bookings, and addressing pricing objections.' },
                { name: '6. Analyst Agent', desc: 'Generates end-to-end performance reports and optimizes pipeline metrics.' }
              ].map((ag, i) => (
                <div key={i} className="p-4 bg-slate-100/50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 rounded-xl flex flex-col gap-1.5 hover:border-[#0052cc]/30 dark:hover:border-white/10 transition-all">
                  <span className="text-xs font-bold text-[#0052cc] dark:text-blue-400">{ag.name}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{ag.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed mt-2">
              This structured delegation ensures each model performs a micro-task it is finely optimized for, reducing hallucinations and operational context leakage.
            </p>
          </motion.div>

          {/* Section 3: Semantic Data Integration & RAG */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-600" /> 3. Semantic Scoring & Secure RAG Architectures
            </h2>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              Generic models lack access to proprietary enterprise data. Integrating this data securely requires a combination of <strong>Retrieval-Augmented Generation (RAG)</strong> and secure local database embeddings.
            </p>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              A key application of semantic intelligence is in recruitment. For instance, our proprietary recruitment engine, <strong>Apply4Jobs</strong>, utilizes semantic applicant scoring to read, parse, and match CVs against complex job descriptions. Rather than searching for exact keywords (e.g., "React Developer"), the system understands semantic intent, scoring candidates based on related concepts, projects, and execution depth.
            </p>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              Similarly, our <strong>eduAI365 ERP</strong> applies RAG pipelines to manage university resource planning, allowing administrators to query student records, financial trends, and scheduling bottlenecks using natural language queries that hit secure PostgreSQL tables with sub-millisecond latencies.
            </p>
          </motion.div>

          {/* Section 4: Security and Compliance */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-slate-950 dark:text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-500" /> 4. Security Boundaries: The True Enterprise Battlefield
            </h2>
            <p className="text-sm md:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
              No enterprise will risk sending proprietary customer data or sensitive intellectual property to open public APIs. The major battlefield of the next decade is <strong>security and localization</strong>.
            </p>
            
            <ul className="flex flex-col gap-3 my-2">
              {[
                { title: 'Local/Hybrid Embeddings', desc: 'Vector databases (such as pgvector) deployed within secure VPCs, ensuring no data ever exits the organizational perimeter.' },
                { title: 'Open-Source Fine-Tuning', desc: 'Leveraging highly competent open-weights models (like Llama-3 or Mistral) fine-tuned for specific tasks on local Kubernetes clusters.' },
                { title: 'Guardrails & Sanitization', desc: 'Intermediate middleware layers that automatically strip personally identifiable information (PII) before queries hit remote models.' }
              ].map((boundary, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#0052cc] shrink-0 mt-2" />
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block">{boundary.title}</span>
                    <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">{boundary.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-950/10 dark:to-purple-950/10 border border-slate-200/50 dark:border-white/5 rounded-2xl p-5 mt-2">
              <h4 className="font-bold text-[#0052cc] dark:text-blue-400 text-sm mb-1">Our Commitment at Algoguido</h4>
              <p className="text-xs md:text-sm text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
                At Algoguido Technologies, we specialize in constructing private, high-availability microservice backends (utilizing NestJS, Redis caching, and PostgreSQL) coupled with custom LLM checkpoints that guarantee absolute data sovereignty and SOC2 compliance.
              </p>
            </div>
          </motion.div>

          {/* Social Feedback / Like button */}
          <motion.div variants={itemVariants} className="flex justify-between items-center bg-white dark:bg-slate-900/30 border border-slate-200/50 dark:border-white/5 rounded-2xl px-6 py-4 mt-4">
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
                  title: 'The Future of AI in Enterprise \u2014 Algoguido',
                  text: 'Explore how Enterprise AI is reshaping business operations worldwide.',
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
                'EnterpriseAI',
                'AgenticWorkflows',
                'MultiAgentAI',
                'RAGArchitecture',
                'DataSovereignty',
                'Apply4Jobs',
                'eduAI365',
                'AIWorkforce'
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
                <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-tight">Ready to Automate Your Business workflows?</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Connect with our technical architects in Guwahati to design your secure multi-agent workspace.
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
