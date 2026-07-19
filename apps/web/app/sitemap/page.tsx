'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion as originalMotion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Users, 
  Monitor, 
  Brain, 
  Database, 
  GraduationCap,
  Briefcase, 
  Cpu, 
  Search,
  ArrowRight,
  Shield,
  FileText,
  HelpCircle,
  Hash,
  Coins
} from 'lucide-react';

const motion = originalMotion as any;

interface SitemapItem {
  name: string;
  href: string;
  description: string;
  icon: any;
}

interface SitemapCategory {
  title: string;
  description: string;
  color: string;
  items: SitemapItem[];
}

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories: SitemapCategory[] = [
    {
      title: 'Core Navigation',
      description: 'Main sections of our digital headquarters.',
      color: 'from-blue-500 to-indigo-600',
      items: [
        { name: 'Home Landing Page', href: '/', description: 'Overview of Algoguido, CTA gateways, and central hub.', icon: Home },
        { name: 'About Algoguido', href: '/#about', description: 'Our history, foundational values, and technical expertise.', icon: HelpCircle },
        { name: 'Why Algoguido', href: '/#why', description: 'Our unique value proposition and industry-aligned model.', icon: Cpu },
        { name: 'Success Stories & Projects', href: '/#projects', description: 'A showcase of our successfully delivered projects.', icon: Briefcase },
        { name: 'Blog & Insights', href: '/#blog', description: 'Latest research publications, tech articles, and updates.', icon: BookOpen },
        { name: 'Interactive Location Maps', href: '/#contact', description: 'CarPlay simulation guiding to Guwahati headquarters.', icon: Hash }
      ]
    },
    {
      title: 'Products Portfolio',
      description: 'Our proprietary AI-powered digital products.',
      color: 'from-purple-500 to-pink-600',
      items: [
        { name: 'eduAI365 ERP', href: '/#products', description: 'Next-generation educational enterprise management software.', icon: GraduationCap },
        { name: 'Apply4Jobs', href: '/#products', description: 'Advanced AI recruitment, resume analysis, and applicant matching.', icon: Briefcase },
        { name: 'LeadGrowAI', href: '/#products', description: 'AI-driven business growth, CRM, and growth automation.', icon: Cpu },
        { name: 'TheHirings', href: '/#products', description: 'AI-driven developer staffing and talent sourcing.', icon: Users },
        { name: 'AI Workforce for Business', href: '/#products', description: 'Leads management platform run by 6 collaborating AI agents.', icon: Brain }
      ]
    },
    {
      title: 'Enterprise Solutions',
      description: 'Tailored technology integrations for businesses.',
      color: 'from-cyan-500 to-blue-600',
      items: [
        { name: 'ERP Platforms', href: '/#services', description: 'Integrated databases, inventory tracking, and workflows.', icon: Database },
        { name: 'CRM & Growth Systems', href: '/#services', description: 'Pipeline analytics, campaigns, and lead conversions.', icon: Users },
        { name: 'AI Automation & Agents', href: '/#services', description: 'Large Language Models (LLMs) and custom automated workflows.', icon: Brain },
        { name: 'Cloud & Infrastructure', href: '/#services', description: 'Hybrid hosting solutions, high availability, and databases.', icon: Monitor }
      ]
    },
    {
      title: 'Research & Education',
      description: 'Bridging academic learning and industrial needs.',
      color: 'from-amber-500 to-orange-600',
      items: [
        { name: 'Industry Internships', href: '/industrial-training', description: 'Hands-on live project training for student developers.', icon: GraduationCap },
        { name: 'Professional & Industry Training', href: '/industrial-training', description: 'Certifications in AI, data analytics, and cloud.', icon: Monitor },
        { name: 'Data Science & Analytics', href: '/industrial-training', description: 'Training on visualization, business intelligence, and modeling.', icon: Database },
        { name: 'Research Collaboration', href: '/#research', description: 'Joint academic-industry research on Machine Learning.', icon: BookOpen },
        { name: 'Faculty Development Programs', href: '/#research', description: 'Empowering teachers with modern software and tools.', icon: Users },
        { name: 'AI Research & Innovation', href: '/#research', description: 'Generative AI, vector embeddings, and RAG architectures.', icon: Brain }
      ]
    },
    {
      title: 'Legal & Compliance',
      description: 'Terms, conditions, policies, and contacts.',
      color: 'from-slate-600 to-slate-800',
      items: [
        { name: 'Privacy Policy', href: '/privacy-policy', description: 'Rules governing your personal data, safety, and options.', icon: Shield },
        { name: 'Terms of Service', href: '/terms-of-service', description: 'Guwahati court jurisdiction, usage terms, and billing rules.', icon: FileText },
        { name: 'Payment Portal', href: 'https://razorpay.me/@algoguidotechnologiesprivatel', description: 'Make secure online payments directly via our verified Razorpay gateway.', icon: Coins }
      ]
    }
  ];

  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#070b19] transition-colors duration-300 font-sans">
      
      {/* Decorative Blur Background Highlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.03] dark:bg-blue-500/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[30%] right-1/4 w-[400px] h-[400px] bg-purple-500/[0.03] dark:bg-purple-500/[0.015] rounded-full blur-[120px] pointer-events-none" />

      {/* Header Strip */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              Algoguido
            </span>
          </Link>
          <Link href="/" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-[#0052cc] dark:hover:text-blue-400 transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Header Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 pt-16 pb-12 flex flex-col items-center text-center gap-4 relative z-10">
        <span className="text-xs font-extrabold text-[#0052cc] dark:text-blue-400 uppercase tracking-widest bg-[#0052cc]/5 dark:bg-blue-500/10 px-3 py-1 rounded-full w-fit">
          Navigation Portal
        </span>
        <h1 className="font-display font-extrabold text-3.5xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl">
          Visual Website Sitemap
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
          Navigate through our products, enterprise solutions, research programs, legal disclosures, and interactive CarPlay direction guides.
        </p>

        {/* Sitemap Search Bar */}
        <div className="w-full max-w-md mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for pages, keywords, or products..."
            className="w-full h-12 pl-12 pr-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Visual Bento Grid Directory */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 pb-24 relative z-10">
        {filteredCategories.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-12"
          >
            {filteredCategories.map((category) => (
              <motion.section 
                key={category.title}
                variants={itemVariants}
                className="flex flex-col gap-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className={`h-4.5 w-1 rounded-full bg-gradient-to-b ${category.color}`} />
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">{category.title}</h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{category.description}</p>
                  </div>
                </div>

                {/* Grid Links List */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link 
                        key={item.name}
                        href={item.href}
                        className="p-5 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl hover:border-slate-300 dark:hover:border-white/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3 group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-center">
                          <div className="h-9 w-9 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[#0052cc] dark:text-blue-400 flex items-center justify-center border border-slate-100 dark:border-white/[0.04] group-hover:scale-105 transition-transform duration-300">
                            <IconComponent className="h-4.5 w-4.5" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 group-hover:text-[#0052cc] dark:group-hover:text-blue-400 transition-colors leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </motion.div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-white/5 rounded-3xl p-8 max-w-md mx-auto">
            <span className="text-2xl">🔍</span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-base">No Links Found</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">We couldn&apos;t find any pages matching &quot;{searchQuery}&quot;. Please try another search.</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer strip */}
      <footer className="bg-[#0a0f1e] border-t border-white/5 py-8 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-slate-400">
            {'\u00A9'} {new Date().getFullYear()} Algoguido Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-[11px] text-slate-400 hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600 text-[10px]" aria-hidden="true">·</span>
            <Link href="/privacy-policy" className="text-[11px] text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-600 text-[10px]" aria-hidden="true">·</span>
            <Link href="/terms-of-service" className="text-[11px] text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
            <span className="text-slate-600 text-[10px]" aria-hidden="true">·</span>
            <a href="https://razorpay.me/@algoguidotechnologiesprivatel" target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-400 hover:text-white transition-colors">Pay Online</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
