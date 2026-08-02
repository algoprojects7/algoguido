'use client';

import React, { useRef } from 'react';
import { motion as originalMotion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Wrench, Phone, Menu } from 'lucide-react';

// Cast to any to avoid framer-motion version type issues (same pattern as page.tsx)
const motion = originalMotion as any;

interface MobileBottomNavProps {
  activeSection: string;
  onNavClick: (sectionId: string, sectionName: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMenuOpen: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'products', label: 'Products', icon: Layers, href: '/#products' },
  { id: 'services', label: 'Services', icon: Wrench, href: '/#services' },
  { id: 'contact', label: 'Contact', icon: Phone, href: '/#contact' },
] as const;

export function MobileBottomNav({ activeSection, onNavClick, onMenuOpen }: MobileBottomNavProps) {
  const menuRef = useRef<HTMLButtonElement>(null);

  const isActive = (id: string) => {
    if (id === 'home') return activeSection === 'home';
    if (id === 'services') return activeSection === 'services' || activeSection === 'tech';
    return activeSection === id;
  };

  return (
    <nav
      className="mobile-bottom-nav xl:hidden"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-stretch h-full px-1">
        {/* Regular nav items */}
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.id);
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => onNavClick(item.id, item.label, e)}
              className="mobile-bottom-nav-item"
              aria-current={active ? 'page' : undefined}
              aria-label={item.label}
            >
              {/* Active background pill */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    layoutId="bottom-nav-pill"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-x-2 top-1.5 h-8 rounded-xl bg-[#0052cc]/8 dark:bg-blue-400/10"
                  />
                )}
              </AnimatePresence>

              {/* Icon */}
              <motion.div
                animate={{
                  y: active ? -1 : 0,
                  scale: active ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="relative z-10"
              >
                <item.icon
                  className={`h-[18px] w-[18px] transition-colors duration-200 ${
                    active
                      ? 'text-[#0052cc] dark:text-blue-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                  strokeWidth={active ? 2.5 : 1.75}
                />
              </motion.div>

              {/* Label */}
              <span
                className={`transition-colors duration-200 ${
                  active
                    ? 'text-[#0052cc] dark:text-blue-400'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}

        {/* Menu button (opens top drawer for full nav) */}
        <button
          ref={menuRef}
          onClick={onMenuOpen}
          className="mobile-bottom-nav-item"
          aria-label="Open full menu"
        >
          <Menu
            className="h-[18px] w-[18px] text-slate-400 dark:text-slate-500"
            strokeWidth={1.75}
          />
          <span className="text-slate-400 dark:text-slate-500">Menu</span>
        </button>
      </div>
    </nav>
  );
}
