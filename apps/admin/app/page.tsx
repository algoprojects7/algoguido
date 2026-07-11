'use client';

import React, { useState, useEffect } from 'react';
import DynamicBackground from '../components/DynamicBackground';
import LoginScreen from '../components/LoginScreen';
import AdminDashboard from '../components/AdminDashboard';
import { ShieldCheck } from 'lucide-react';
import { motion as originalMotion, AnimatePresence } from 'framer-motion';
const motion = originalMotion as any;

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userRole, setUserRole] = useState<string>('ADMIN');

  // Check auth session state on initial mount
  useEffect(() => {
    try {
      const authState = sessionStorage.getItem('algoguido_admin_session');
      if (authState === 'authenticated') {
        setIsLoggedIn(true);
        const role = sessionStorage.getItem('algoguido_admin_role');
        if (role) setUserRole(role);
      }
    } catch (e) {
      console.error('Session storage check failed:', e);
    }
    // Subtle delay to feel like authentic telemetry checks
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = () => {
    try {
      sessionStorage.setItem('algoguido_admin_session', 'authenticated');
      const role = sessionStorage.getItem('algoguido_admin_role');
      if (role) setUserRole(role);
    } catch (e) {
      console.error('Session storage save failed:', e);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('algoguido_admin_session');
      sessionStorage.removeItem('algoguido_admin_role');
      sessionStorage.removeItem('algoguido_admin_name');
    } catch (e) {
      console.error('Session storage remove failed:', e);
    }
    setIsLoggedIn(false);
  };

  // Telemetry node checking loader
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-mesh">
        <DynamicBackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            {/* Spinning glowing border */}
            <div className="absolute h-16 w-16 rounded-2xl border-2 border-brand-500/20 border-t-brand-500 animate-spin" />
            <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-glow">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-display font-extrabold text-sm text-slate-800 tracking-wider uppercase">
              Checking Telemetry...
            </h3>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest mt-1 uppercase">
              Securing connection nodes
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col bg-transparent">
      {/* Shared Interactive Animated Particle Background */}
      <DynamicBackground />

      {/* Screen Render with Framer Motion transitions */}
      <div className="flex-grow flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {isLoggedIn ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow flex flex-col"
            >
              <AdminDashboard onLogout={handleLogout} userRole={userRole} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-grow flex flex-col"
            >
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
