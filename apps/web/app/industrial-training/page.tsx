'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion as originalMotion } from 'framer-motion';
import { 
  GraduationCap, 
  Monitor, 
  Database, 
  Brain, 
  ArrowRight, 
  CheckCircle, 
  Code, 
  Award, 
  Sparkles, 
  Coins, 
  ChevronRight,
  TrendingUp,
  FileCheck,
  Send,
  Loader2,
  Lock,
  ChevronDown
} from 'lucide-react';

const motion = originalMotion as any;

export default function IndustrialTrainingPage() {
  // Tabs for interactive programs
  const [selectedProgram, setSelectedProgram] = useState<'internship' | 'professional' | 'industrial'>('internship');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    status: 'Final Year Student',
    program: 'Paid Internship',
    track: 'AI & Machine Learning',
    profileLink: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Eligibility & Stipend Calculator state
  const [calcStatus, setCalcStatus] = useState('Final Year Student');
  const [calcTrack, setCalcTrack] = useState('AI & Machine Learning');
  const [calcExperience, setCalcExperience] = useState('Intermediate (Built minor projects)');

  const getCalculatorResult = () => {
    let result = {
      program: 'Industry Internship Pathway',
      stipend: '₹8,000 – ₹15,000 (one-time)',
      stipendLabel: 'Program Fee',
      duration: '3 to 6 Months',
      recommendation: 'Full-Stack Engineering or AI Agents Track'
    };

    if (calcStatus === 'Recent Graduate' || calcStatus === 'Working Professional') {
      result.stipend = '₹10,000 – ₹15,000 (one-time)';
    }

    if (calcTrack === 'AI & Machine Learning') {
      result.recommendation = 'AI Research & Intelligent Systems Track (LLMs, RAG, PyTorch)';
    } else if (calcTrack === 'Data Science & Analytics') {
      result.recommendation = 'Data Science & Analytics Track (BigQuery, Spark, BI)';
    } else if (calcTrack === 'Cloud & DevOps') {
      result.recommendation = 'Cloud & Infrastructure Track (GCP, Docker, Terraform)';
    }

    if (calcExperience === 'Beginner (Familiar with syntax)') {
      result.program = 'Professional Training & Project Guidance';
      result.stipend = '₹5,000 – ₹8,000 (one-time)';
      result.stipendLabel = 'Program Fee';
      result.duration = '8 to 12 Weeks';
    }

    return result;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setFormStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, Phone).');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const messageContent = `
=== Industrial/Professional Training & Internship Application ===
Program: ${formData.program}
Preferred Track: ${formData.track}
Current Status: ${formData.status}
Organization/Institution: ${formData.organization}
GitHub/LinkedIn/Portfolio: ${formData.profileLink || 'Not provided'}
Details/Notes: ${formData.message || 'None'}
      `.trim();

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: 'INDUSTRIAL_PORTAL',
        message: messageContent
      };

      const apiUrl = '/api';
      const res = await fetch(`${apiUrl}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to submit application. Please try again.');
      }

      setFormStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        status: 'Final Year Student',
        program: 'Paid Internship',
        track: 'AI & Machine Learning',
        profileLink: '',
        message: ''
      });
    } catch (err: any) {
      setFormStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  // Program-specific details
  const programDetails = {
    internship: {
      tag: 'INDUSTRY INTERNSHIP PROGRAM',
      title: 'Industry Internship (Fee-Based)',
      description: 'A structured, fee-based industry internship where you work on real production codebases, enterprise SaaS modules, and client platforms. Students invest in their career growth — Algoguido provides the professional environment, mentorship, and verifiable certification.',
      features: [
        'Program fee: ₹8,000 – ₹15,000 one-time (based on track & duration).',
        'Production contributions: Write code, design databases, deploy services to Google Cloud.',
        'Mentorship: Daily virtual standups and pull-request code reviews with senior engineers.',
        'Placement support: Letter of Recommendation + LinkedIn endorsement from Algoguido.'
      ],
      icon: Coins,
      accent: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    professional: {
      tag: 'INDUSTRY CERTIFICATION',
      title: 'Professional Training & Certifications',
      description: 'Accelerate your career with guided learning models focusing on advanced AI integration, cloud engineering, enterprise data workflows, and modern web application pipelines.',
      features: [
        'Structured modules: Live lectures, interactive labs, and deep dive workshops.',
        'Industry projects: Build portfolio-grade applications (not standard CRUD tasks).',
        'Expert guidance: Interactive instruction by industry professionals.',
        'Credentials: Verifiable blockchain-secured certification on completion.'
      ],
      icon: Award,
      accent: 'text-[#0052cc] bg-[#0052cc]/10 border-[#0052cc]/20'
    },
    industrial: {
      tag: 'UNIVERSITY ALIGNED',
      title: 'Industrial Project Training',
      description: 'Specifically curated for engineering and tech students (B.Tech, M.Tech, MCA, BCA) requiring formal university project submissions, thesis guidance, or structural internships.',
      features: [
        'Formal approval: Receive custom invitation letter, synopsis, and certificate.',
        'Advanced guidance: Assistance with architecture design, sequence flow, and databases.',
        'Project reviews: Regular reviews ensuring high marks during university evaluation.',
        'Verifiable certificate issued upon successful completion of the training module.'
      ],
      icon: GraduationCap,
      accent: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    }
  };

  const faqData = [
    {
      q: "What is the program fee structure?",
      a: "Industry Internship: ₹8,000 – ₹15,000 (one-time, based on track & duration). Professional Training: ₹5,000 – ₹10,000. Industrial/University Training: ₹3,000 – ₹6,000. All fees are paid to Algoguido before the program begins. No hidden charges."
    },
    {
      q: "Why is the internship fee-based (students pay Algoguido)?",
      a: "Algoguido provides access to live production environments, mentorship from senior engineers, dedicated code reviews, real project ownership, and verifiable certificates. This is a professional training investment in your career — not a job placement. You are paying for industry-grade skill development."
    },
    {
      q: "Are the programs fully online?",
      a: "Yes. All our programs are conducted 100% online in remote mode, featuring daily virtual syncs, online code reviews, and remote pair programming sessions. No commute required."
    },
    {
      q: "How do I pay the program fee?",
      a: "After your application is reviewed and you receive the selection confirmation, you can pay online via our secure Razorpay payment link. UPI, debit/credit cards, and net banking are all supported."
    },
    {
      q: "Will I receive code reviews and mentorship?",
      a: "Absolutely. Every enrolled student receives daily virtual standups, thorough pull request reviews from tech leads, and a dedicated mentor throughout the program duration."
    }
  ];

  const calcResult = getCalculatorResult();



  return (
    <div className="min-h-screen bg-[#070b19] text-white transition-colors duration-300 font-sans overflow-x-hidden relative">
      
      {/* Premium Apple Blur Graphics */}
      <div className="absolute top-[-100px] left-1/4 w-[600px] h-[600px] bg-blue-500/[0.08] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-purple-500/[0.05] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-100px] w-[450px] h-[450px] bg-teal-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Premium Navbar */}
      <header className="sticky top-0 z-50 bg-[#070b19]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-base font-extrabold tracking-tight text-white group-hover:opacity-80 transition-opacity">
              Algoguido <span className="text-blue-500 font-normal">Academy</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors hidden sm:block">
              Home
            </Link>
            <a href="#calculator" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors hidden sm:block">
              Eligibility
            </a>
            <a href="#apply" className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm">
              Apply Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section (Hooks within 1 second) */}
      <section className="relative z-10 pt-16 md:pt-24 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 flex flex-col items-center text-center gap-6">
        
        {/* Active Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-extrabold text-blue-400 uppercase tracking-widest"
        >
          <Sparkles className="h-3 w-3 animate-pulse" /> 100% Online · Fee-Based Industry Training · Summer & Monsoon 2026 Open
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-5.5xl md:text-7.5xl tracking-tight leading-[1.05] max-w-4xl text-white"
        >
          Don&apos;t Just Learn Tech.<br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Build Real Production Code.
          </span>
        </motion.h1>

        {/* 1-Sec Hook Value Proposition */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mt-2"
        >
          Skip the standard tutorials. Invest in real industry experience — work on production codebases, earn verifiable certificates, and get daily code reviews from senior engineers. 100% online, fee-based programs starting from ₹3,000.
        </motion.p>

        {/* Dual Actions CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
        >
          <a 
            href="#apply"
            className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
          >
            Apply & Enroll Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="https://razorpay.me/@algoguidotechnologiesprivatel"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-8 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Coins className="h-4 w-4" /> Pay Fee Now
          </a>
        </motion.div>

        {/* Tech Stack Slider Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-col items-center gap-4 w-full max-w-2xl"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">PRODUCTION WORKFLOW & TOOLS STACK</p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 opacity-60 text-xs font-semibold text-slate-400">
            <span>Next.js 15</span>
            <span>·</span>
            <span>NestJS</span>
            <span>·</span>
            <span>PostgreSQL</span>
            <span>·</span>
            <span>Prisma</span>
            <span>·</span>
            <span>Google Cloud (GCP)</span>
            <span>·</span>
            <span>LLMs & LangChain</span>
            <span>·</span>
            <span>Docker</span>
          </div>
        </motion.div>

      </section>

      {/* Program Selector & Detail Display */}
      <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-t border-white/5 bg-slate-950/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full w-fit mx-auto">
              SELECT YOUR PATHWAY
            </span>
            <h2 className="text-2.5xl sm:text-4xl font-extrabold text-white tracking-tight">
              Fee-Based Industry Programs Built for Real Careers
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Students invest in their professional growth. Algoguido provides the production environment, senior mentors, and verifiable certification for three structured pathways.
            </p>
          </div>

          {/* Interactive Toggle Pill Selector */}
          <div className="flex justify-center">
            <div className="p-1 bg-white/5 border border-white/10 rounded-2xl flex flex-col sm:flex-row gap-1 w-full max-w-lg">
              <button
                onClick={() => setSelectedProgram('internship')}
                className={`py-3 px-6 rounded-xl font-bold text-xs transition-all w-full ${
                  selectedProgram === 'internship' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Industry Internship
              </button>
              <button
                onClick={() => setSelectedProgram('professional')}
                className={`py-3 px-6 rounded-xl font-bold text-xs transition-all w-full ${
                  selectedProgram === 'professional' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Professional Training
              </button>
              <button
                onClick={() => setSelectedProgram('industrial')}
                className={`py-3 px-6 rounded-xl font-bold text-xs transition-all w-full ${
                  selectedProgram === 'industrial' 
                    ? 'bg-blue-600 text-white shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Industrial Training
              </button>
            </div>
          </div>

          {/* Selected Program Showcase Card */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-start">
              
              {/* Left text area */}
              <div className="flex-1 flex flex-col gap-5">
                <span className={`text-[10px] font-extrabold tracking-widest uppercase border px-2.5 py-0.5 rounded w-fit ${programDetails[selectedProgram].accent}`}>
                  {programDetails[selectedProgram].tag}
                </span>
                <h3 className="text-xl md:text-2.5xl font-extrabold text-white leading-tight">
                  {programDetails[selectedProgram].title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {programDetails[selectedProgram].description}
                </p>
                <div className="border-t border-white/5 my-2" />
                <div className="flex items-center gap-4">
                  <a href="#apply" className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    Apply for this track <ChevronRight className="h-3 w-3" />
                  </a>
                  <a href="https://razorpay.me/@algoguidotechnologiesprivatel" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                    <Coins className="h-3 w-3" /> Pay Program Fee
                  </a>
                </div>
              </div>

              {/* Right bullet list */}
              <div className="flex-1 flex flex-col gap-4">
                <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">KEY HIGHLIGHTS</p>
                <div className="flex flex-col gap-3">
                  {programDetails[selectedProgram].features.map((feat, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-slate-300 text-xs leading-relaxed">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Core Tracks & Curriculum Section */}
      <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full w-fit mx-auto">
              CURRICULUM SPECIFICATIONS
            </span>
            <h2 className="text-2.5xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pick Your Engineering Track
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We specialize in modern engineering stacks. Our curriculums are continually updated with production tools and patterns.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Track 1 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-4 group hover:bg-white/[0.04] transition-all">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">AI & Intelligent Systems</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Large Language Models (LLMs), LangChain, vector databases (Pinecone, pgvector), RAG architecture, agent systems, and model integration.
              </p>
              <span className="text-[10px] font-bold text-blue-400 mt-auto">Python / PyTorch / LangChain</span>
            </div>

            {/* Track 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-4 group hover:bg-white/[0.04] transition-all">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Full-Stack Engineering</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Modern Next.js 15, React 19, NestJS REST/GraphQL backend APIs, Prisma ORM, PostgreSQL database schemas, monorepos, and state managers.
              </p>
              <span className="text-[10px] font-bold text-purple-400 mt-auto">TypeScript / Next.js / PostgreSQL</span>
            </div>

            {/* Track 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-4 group hover:bg-white/[0.04] transition-all">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Data Science & Analytics</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                ETL data pipelines, Google Cloud BigQuery warehousing, PySpark, Apache Dataflow, analytical modeling, and business intelligence dashboards.
              </p>
              <span className="text-[10px] font-bold text-teal-400 mt-auto">Python / BigQuery / Spark</span>
            </div>

            {/* Track 4 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-4 group hover:bg-white/[0.04] transition-all">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Monitor className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Cloud & Infrastructure</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Docker containerization, Google Cloud (GCP) IAM policies, Docker, Terraform IaC, GitHub Actions CI/CD pipelines, and high availability systems.
              </p>
              <span className="text-[10px] font-bold text-amber-400 mt-auto">Docker / GCP / Terraform</span>
            </div>

          </div>

        </div>
      </section>

      {/* Gamification Section: Interactive Eligibility & Stipend Calculator */}
      <section id="calculator" className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 bg-slate-950/30 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full w-fit mx-auto">
              PROGRAM FEE CALCULATOR
            </span>
            <h2 className="text-2.5xl sm:text-4xl font-extrabold text-white tracking-tight">
              Find Your Right Program & Fee
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Answer three quick questions to see which program pathway fits you best and what the one-time enrollment fee will be.
            </p>
          </div>

          <div className="max-w-4xl mx-auto w-full grid md:grid-cols-5 gap-8 items-stretch">
            
            {/* Input Selection Block */}
            <div className="md:col-span-3 p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col gap-6">
              
              {/* Question 1 */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400">1. What is your current educational/professional status?</label>
                <select
                  value={calcStatus}
                  onChange={(e) => setCalcStatus(e.target.value)}
                  className="h-11 px-4 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Final Year Student">Final Year Student (Tech/Engineering)</option>
                  <option value="Pre-final Year Student">Pre-final Year Student</option>
                  <option value="Recent Graduate">Recent Graduate (Last 12 months)</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Other">Other / Non-traditional Student</option>
                </select>
              </div>

              {/* Question 2 */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400">2. Which tech stack/domain interests you most?</label>
                <select
                  value={calcTrack}
                  onChange={(e) => setCalcTrack(e.target.value)}
                  className="h-11 px-4 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="AI & Machine Learning">AI & Machine Learning (LLMs, RAG, PyTorch)</option>
                  <option value="Full-Stack Web Engineering">Full-Stack Development (Next.js, NestJS)</option>
                  <option value="Data Science & Analytics">Data Science & Big Data (BigQuery, Spark)</option>
                  <option value="Cloud & DevOps">Cloud & Infrastructure (Docker, GCP)</option>
                </select>
              </div>

              {/* Question 3 */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400">3. What is your current coding/experience level?</label>
                <select
                  value={calcExperience}
                  onChange={(e) => setCalcExperience(e.target.value)}
                  className="h-11 px-4 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Intermediate (Built minor projects)">Intermediate (Knows syntax, built minor projects)</option>
                  <option value="Beginner (Familiar with syntax)">Beginner (Still studying, limited hands-on coding)</option>
                  <option value="Advanced (Built production apps)">Advanced (Built clean web applications or databases)</option>
                </select>
              </div>

            </div>

            {/* Output Results Block */}
            <div className="md:col-span-2 p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex flex-col gap-5 justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-400 uppercase tracking-widest">
                  <TrendingUp className="h-4 w-4" /> Program Match
                </div>
                <div className="border-t border-white/10 my-1" />
                
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Recommended Pathway</p>
                  <p className="text-base font-bold text-white mt-0.5">{calcResult.program}</p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Program Fee (One-Time)</p>
                  <p className="text-xl font-extrabold text-emerald-400 mt-0.5">{calcResult.stipend}</p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Suggested Track</p>
                  <p className="text-xs text-slate-350 mt-1 leading-relaxed">{calcResult.recommendation}</p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Standard Duration</p>
                  <p className="text-xs text-slate-300 mt-0.5 font-semibold">{calcResult.duration}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <a 
                  href="#apply"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      program: calcResult.program.includes('Internship') ? 'Industry Internship' : 'Professional Certification',
                      status: calcStatus,
                      track: calcTrack
                    }));
                  }}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-white shadow"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://razorpay.me/@algoguidotechnologiesprivatel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-emerald-400"
                >
                  <Coins className="h-3.5 w-3.5" /> Pay Program Fee via Razorpay
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 relative z-10">
        <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 relative">
          
          <div className="flex flex-col items-center text-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <FileCheck className="h-5.5 w-5.5" />
            </div>
            <h2 className="text-xl md:text-2.5xl font-extrabold text-white tracking-tight">Enroll for Intake 2026</h2>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Submit your application below. Once reviewed and shortlisted, you will receive payment instructions via email/WhatsApp within 48 hours. Enrollment is confirmed only after fee payment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input Row 1 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="h-11 px-4 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. john@university.edu"
                  className="h-11 px-4 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            {/* Input Row 2 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">WhatsApp / Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 98765 43210"
                  className="h-11 px-4 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">College / Institution / Company</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="e.g. NIT Guwahati"
                  className="h-11 px-4 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Selector Row 3 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">Program Type</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  className="h-11 px-4 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Industry Internship">Industry Internship (Fee-Based)</option>
                  <option value="Professional Certification">Professional Training & Certification</option>
                  <option value="Industrial/Summer Project">Industrial / University Training</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">Preferred Engineering Track</label>
                <select
                  name="track"
                  value={formData.track}
                  onChange={handleInputChange}
                  className="h-11 px-4 bg-slate-900 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Full-Stack Web Engineering">Full-Stack Web Engineering</option>
                  <option value="Data Science & Analytics">Data Science & Analytics</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                </select>
              </div>
            </div>

            {/* Profile Link Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">GitHub / LinkedIn / Portfolio URL</label>
              <input
                type="url"
                name="profileLink"
                value={formData.profileLink}
                onChange={handleInputChange}
                placeholder="e.g. https://github.com/your-username"
                className="h-11 px-4 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-650"
              />
            </div>

            {/* Notes Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-extrabold text-slate-450 uppercase tracking-wider">Brief Proposal / Learning Objectives</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="Mention any programming languages, frameworks, or database modules you are comfortable with..."
                className="p-4 bg-slate-900/50 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none"
              />
            </div>

            {/* Submission Alerts */}
            {formStatus === 'success' && (
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center gap-3 text-center">
                <p className="text-emerald-400 text-xs font-bold">🎉 Application submitted! Our team will contact you within 48 hours with enrollment details.</p>
                <p className="text-slate-400 text-[10px]">To secure your spot, complete the program fee payment via Razorpay:</p>
                <a
                  href="https://razorpay.me/@algoguidotechnologiesprivatel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow"
                >
                  <Coins className="h-3.5 w-3.5" /> Pay Program Fee via Razorpay
                </a>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow disabled:opacity-50"
            >
              {formStatus === 'submitting' ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" /> Submitting Application...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Submit Application
                </>
              )}
            </button>

            {formStatus !== 'success' && (
              <div className="mt-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-2 text-center">
                <p className="text-[10px] text-slate-500">Already received enrollment confirmation?</p>
                <a
                  href="https://razorpay.me/@algoguidotechnologiesprivatel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                >
                  <Coins className="h-3.5 w-3.5" /> Pay Program Fee via Razorpay →
                </a>
              </div>
            )}

            <div className="flex justify-center items-center gap-1.5 text-[10px] text-slate-500 mt-2">
              <Lock className="h-3 w-3" /> Secure SSL connection. We do not sell your data.
            </div>

          </form>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 bg-slate-950/20 border-t border-white/5 relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col gap-4">
            <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full w-fit mx-auto">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2.5xl sm:text-4xl font-extrabold text-white tracking-tight">
              Answers to common queries
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqData.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-white/5 rounded-2xl bg-white/[0.01] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-white/[0.01]"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-xs text-slate-450 leading-relaxed border-t border-white/[0.02] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="bg-[#0a0f1e] border-t border-white/5 py-8 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 flex flex-col items-center gap-5">
          <a
            href="https://razorpay.me/@algoguidotechnologiesprivatel"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Coins className="h-3.5 w-3.5" /> Pay Program Fee via Razorpay
          </a>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
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
              <Link href="/sitemap" className="text-[11px] text-slate-400 hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
