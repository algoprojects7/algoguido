'use client';

import React from 'react';
import { motion as originalMotion } from 'framer-motion';
import { Brain, Users, TrendingUp, GraduationCap } from 'lucide-react';

const motion = originalMotion as any;

const productCards = [
  {
    id: 'leadgrow',
    badge: 'LIVE',
    badgeColor: 'text-emerald-600 bg-emerald-500/10',
    type: 'AI CRM',
    name: 'LeadGrowAI',
    desc: 'AI Sales Acceleration',
    icon: TrendingUp,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    floatClass: 'mobile-card-float-a',
    gradientFrom: 'from-emerald-500/5',
  },
  {
    id: 'eduai',
    badge: 'ACTIVE',
    badgeColor: 'text-blue-600 bg-blue-500/10',
    type: 'AI EDU',
    name: 'eduAI365',
    desc: 'Smart Learning ERP',
    icon: GraduationCap,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50 dark:bg-blue-950/30',
    floatClass: 'mobile-card-float-b',
    gradientFrom: 'from-blue-500/5',
  },
  {
    id: 'apply4jobs',
    badge: 'NEW',
    badgeColor: 'text-pink-600 bg-pink-500/10',
    type: 'HR TECH',
    name: 'Apply4Jobs',
    desc: 'AI Recruitment Engine',
    icon: Users,
    iconColor: 'text-pink-500',
    iconBg: 'bg-pink-50 dark:bg-pink-950/30',
    floatClass: 'mobile-card-float-c',
    gradientFrom: 'from-pink-500/5',
  },
  {
    id: 'ai-workforce',
    badge: 'BETA',
    badgeColor: 'text-purple-600 bg-purple-500/10',
    type: 'AI AGENTS',
    name: 'AI Workforce',
    desc: 'Multi-Agent Leads Mgmt',
    icon: Brain,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50 dark:bg-purple-950/30',
    floatClass: 'mobile-card-float-d',
    gradientFrom: 'from-purple-500/5',
  },
] as const;

export function MobileHeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 18 }}
      className="lg:hidden w-full mt-8 mb-2 px-1 select-none"
      aria-hidden="true"
    >
      {/* Central AI Badge */}
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex flex-col items-center"
        >
          {/* Core sphere */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#0052cc]/15 via-blue-400/10 to-purple-500/15 border border-white/60 dark:border-white/20 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center z-10">
            <Brain className="h-6 w-6 text-[#0052cc] dark:text-blue-400" />
            <span className="text-[5px] font-black text-[#0052cc]/70 dark:text-blue-400/70 uppercase tracking-widest mt-0.5">
              AI CORE
            </span>
          </div>

          <span className="mt-2 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Algoguido Engine
          </span>
        </motion.div>
      </div>

      {/* 2×2 Product Card Grid */}
      <div className="grid grid-cols-2 gap-3 max-w-[340px] mx-auto">
        {productCards.map((card) => (
          <div
            key={card.id}
            className={`${card.floatClass} relative rounded-2xl bg-white/70 dark:bg-navy-900/60 border border-slate-200/50 dark:border-white/10 backdrop-blur-xl shadow-lg p-3.5 flex flex-col gap-2.5 bg-gradient-to-b ${card.gradientFrom} to-transparent overflow-hidden`}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

            {/* Header row */}
            <div className="flex items-center justify-between gap-1">
              <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${card.badgeColor}`}>
                {card.badge}
              </span>
              <span className="text-[7px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                {card.type}
              </span>
            </div>

            {/* Icon + Name */}
            <div className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-lg ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                <card.icon className={`h-3.5 w-3.5 ${card.iconColor}`} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-black text-slate-800 dark:text-white tracking-tight leading-tight truncate">
                  {card.name}
                </span>
                <span className="text-[8px] text-slate-500 dark:text-slate-400 leading-snug truncate">
                  {card.desc}
                </span>
              </div>
            </div>

            {/* Status bar */}
            <div className="h-[3px] rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${card.iconColor.replace('text-', 'bg-')}`}
                initial={{ width: '0%' }}
                animate={{ width: '75%' }}
                transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Live Metrics Strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex justify-center gap-4 mt-4 pt-3 border-t border-slate-200/40 dark:border-white/5"
      >
        {[
          { value: '100+', label: 'Projects', color: 'text-blue-500' },
          { value: '10+', label: 'Products', color: 'text-purple-500' },
          { value: '99.9%', label: 'Uptime', color: 'text-emerald-500' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className={`text-sm font-black ${stat.color} leading-none`}>{stat.value}</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
