'use client';

import * as React from 'react';
import { cn } from '../utils';

const TELEMETRY_MESSAGES = [
  'INITIALIZING NEURAL LINK...',
  'SYNAPSE ENERGIZING...',
  'OPTIMIZING PAYLOAD...',
  'TRANSMITTING ENCRYPTED CORE...',
  'RESOLVING BACKEND COGNITION...',
  'FINALIZING AI INTEGRATION...'
];

export function AIProcessingLoader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [telemetryIndex, setTelemetryIndex] = React.useState(0);
  const [isFinishing, setIsFinishing] = React.useState(false);

  // Use refs to avoid closure stale state in async fetch handlers
  const activeFetchesRef = React.useRef(0);
  const progressIntervalRef = React.useRef<any>(null);
  const lastSubmitTimeRef = React.useRef(0);

  // Rotate telemetry text
  React.useEffect(() => {
    if (!isOpen || isFinishing) return;
    const interval = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % TELEMETRY_MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isOpen, isFinishing]);

  // Start progress simulation
  const startLoading = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    setIsFinishing(false);
    setIsOpen(true);
    setProgress(0);
    setTelemetryIndex(0);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 35) {
          return prev + (Math.random() * 3 + 1); // Fast 0-35%
        } else if (prev < 75) {
          return prev + (Math.random() * 1.5 + 0.5); // Medium 35-75%
        } else if (prev < 96) {
          return prev + (Math.random() * 0.3 + 0.1); // Slow 75-96%
        } else if (prev < 98.8) {
          return prev + 0.02; // Asymptotic 96-98.8%
        }
        return prev;
      });
    }, 40);
  };

  // Complete progress and fade out
  const stopLoading = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    setIsFinishing(true);

    // Fast-forward to 100%
    const finishInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(finishInterval);
          
          // Hold at 100% for a moment, then close
          setTimeout(() => {
            setIsOpen(false);
            // Small delay to allow fade animation before resetting progress
            setTimeout(() => {
              setProgress(0);
              setIsFinishing(false);
            }, 500);
          }, 600);
          
          return 100;
        }
        const remaining = 100 - prev;
        return prev + Math.max(remaining * 0.3, 1.5);
      });
    }, 20);
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Listen for form submit events to mark the submit time
    const handleSubmitEvent = () => {
      lastSubmitTimeRef.current = Date.now();
    };

    window.addEventListener('submit', handleSubmitEvent, { capture: true });

    // Intercept window.fetch
    const originalFetch = window.fetch;
    window.fetch = async function (input, init) {
      // Resolve request URL
      let url = '';
      if (typeof input === 'string') {
        url = input;
      } else if (input instanceof URL) {
        url = input.toString();
      } else if (input && typeof input === 'object' && 'url' in input) {
        url = (input as any).url;
      }

      // Resolve request method
      let method = 'GET';
      if (init && init.method) {
        method = init.method.toUpperCase();
      } else if (input && typeof input === 'object' && 'method' in input) {
        method = (input as any).method || 'GET';
        method = method.toUpperCase();
      }

      // Check if this matches our API endpoints of forms
      const isApi =
        url.includes('/api/leads') ||
        url.includes('/api/certificates') ||
        url.includes('/api/auth/login') ||
        url.includes('/api/products') ||
        url.includes('/api/enterprise-services') ||
        url.includes('/api/users');

      // Check if it is a write operation or a GET operation near a form submit event
      const isFormSubmit =
        isApi &&
        (method === 'POST' ||
          method === 'PUT' ||
          method === 'DELETE' ||
          (method === 'GET' && Date.now() - lastSubmitTimeRef.current < 500));

      if (isFormSubmit) {
        activeFetchesRef.current += 1;
        if (activeFetchesRef.current === 1) {
          startLoading();
        }
      }

      try {
        const response = await originalFetch.apply(this, [input, init]);
        return response;
      } finally {
        if (isFormSubmit) {
          activeFetchesRef.current = Math.max(0, activeFetchesRef.current - 1);
          if (activeFetchesRef.current === 0) {
            stopLoading();
          }
        }
      }
    };

    return () => {
      window.removeEventListener('submit', handleSubmitEvent, { capture: true });
      window.fetch = originalFetch;
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  // Calculate SVG circular stroke offset
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Styles containing the custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ai-energy-pulse {
          0%, 100% { opacity: 0.6; transform: scale(0.96); box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
          50% { opacity: 1; transform: scale(1.04); box-shadow: 0 0 40px rgba(16, 185, 129, 0.5); }
        }
        @keyframes ai-rotate-outer {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ai-rotate-inner {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ai-scan-line {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes ai-float-particle {
          0% { transform: translateY(80px) translateX(0) scale(0.8); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-120px) translateX(var(--drift-x, 15px)) scale(1.2); opacity: 0; }
        }
        .animate-ai-pulse {
          animation: ai-energy-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-ai-rotate-out {
          animation: ai-rotate-outer 8s linear infinite;
        }
        .animate-ai-rotate-in {
          animation: ai-rotate-inner 5s linear infinite;
        }
        .animate-ai-scan {
          animation: ai-scan-line 3s linear infinite;
        }
        .animate-ai-particle {
          animation: ai-float-particle 2.5s ease-in-out infinite;
        }
      `}} />

      {/* Cybernetic Container Widget */}
      <div className="relative w-[360px] p-8 rounded-2xl bg-slate-900/95 border border-emerald-500/30 shadow-[0_0_60px_rgba(16,185,129,0.2)] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Futuristic background scan line */}
        <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent animate-ai-scan pointer-events-none" />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

        {/* Ambient background glow inside the card */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Circular Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-6">
          {/* Animated Glowing Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 animate-ai-rotate-out" />
          <div className="absolute inset-2 rounded-full border border-dotted border-emerald-500/40 animate-ai-rotate-in" />
          
          {/* Rotating energy core */}
          <div className="absolute w-24 h-24 rounded-full bg-emerald-950/20 border border-emerald-500/10 animate-ai-pulse" />

          {/* SVG Circular Progress */}
          <svg className="w-32 h-32 transform -rotate-90 relative z-10">
            {/* Background path */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-slate-800"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Glowing progress stroke */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-emerald-400 transition-all duration-100 ease-out"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px rgba(52, 211, 153, 0.6))"
            />
          </svg>

          {/* Central Percentage Text */}
          <div className="absolute z-20 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tighter drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]">
              {Math.round(progress)}%
            </span>
            <span className="text-[9px] font-bold text-emerald-500/70 uppercase tracking-widest mt-0.5">
              {isFinishing ? 'READY' : 'ENERGY'}
            </span>
          </div>
        </div>

        {/* Floating energy sparks / particles */}
        <div className="absolute bottom-20 left-0 right-0 h-20 overflow-hidden pointer-events-none">
          <div className="absolute left-[20%] w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ai-particle" style={{ '--drift-x': '-20px', animationDelay: '0s' } as React.CSSProperties} />
          <div className="absolute left-[40%] w-1 h-1 bg-emerald-300 rounded-full animate-ai-particle" style={{ '--drift-x': '15px', animationDelay: '0.4s' } as React.CSSProperties} />
          <div className="absolute left-[55%] w-2 h-2 bg-emerald-500 rounded-full animate-ai-particle" style={{ '--drift-x': '-10px', animationDelay: '0.9s' } as React.CSSProperties} />
          <div className="absolute left-[75%] w-1 h-1 bg-emerald-400 rounded-full animate-ai-particle" style={{ '--drift-x': '25px', animationDelay: '1.5s' } as React.CSSProperties} />
        </div>

        {/* Horizontal Loader Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6 relative">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(16,185,129,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* System Telemetry Text */}
        <div className="h-6 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className={cn(
              "w-2 h-2 rounded-full",
              isFinishing ? "bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,1)]" : "bg-emerald-500 animate-ping"
            )} />
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.3)]">
              {isFinishing ? 'NEURAL RESPONSE COMMITTED' : TELEMETRY_MESSAGES[telemetryIndex]}
            </span>
          </div>
        </div>

        {/* Corner HUD markers for premium aesthetics */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-emerald-500/40" />
        <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-emerald-500/40" />
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-emerald-500/40" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-emerald-500/40" />
      </div>
    </div>
  );
}
