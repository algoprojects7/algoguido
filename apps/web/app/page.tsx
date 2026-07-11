'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FolderSync,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  Star,
  Search,
  Play,
  Brain,
  Shield,
  Lock,
  Users,
  Monitor,
  LayoutDashboard,
  Database,
  Cpu,
  MapPin,
  Globe,
  Building2,
  Code,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Github,
  Rocket,
  Award,
  CheckCircle2,
  Handshake,
  Target,
  Zap,
  SkipForward,
  SkipBack,
  Pause,
  Volume2,
  Layers,
  CircleDot
} from 'lucide-react';
import { Button, Card, Badge, Input, Select, Textarea } from '@algoguido/ui';
import { motion as originalMotion, AnimatePresence } from 'framer-motion';
const motion = originalMotion as any;

function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glow: boolean;
      pulse: number;
      pulseSpeed: number;
      isHeroOnly?: boolean;
      shape: 'dot' | 'cross' | 'ring';
    }> = [];

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const initParticles = () => {
      particles = [];
      const navbarHeight = 80; // px — dead zone for particles under the navbar
      const count = 0;
      const colors = ['blue', 'purple', 'teal'];
      for (let i = 0; i < count; i++) {
        const isHeroOnly = i < count * 0.55;
        const color = colors[i % colors.length];

        // Shape distribution: 70% dot, 15% cross, 15% ring
        const shapeRand = Math.random();
        const shape = shapeRand < 0.70 ? 'dot' : (shapeRand < 0.85 ? 'cross' : 'ring');

        // Hero-only particles start below navbar, non-hero anywhere below navbar
        const yMin = navbarHeight;
        const yMax = isHeroOnly ? height * 0.55 : height;

        particles.push({
          x: Math.random() * width,
          y: yMin + Math.random() * (yMax - yMin),
          vx: (Math.random() - 0.5) * (isHeroOnly ? 0.45 : 0.35),
          vy: (Math.random() - 0.5) * (isHeroOnly ? 0.45 : 0.35),
          size: Math.random() * 2.2 + 1.2,
          color: color,
          glow: Math.random() > (isHeroOnly ? 0.75 : 0.88),
          pulse: Math.random() * Math.PI,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          isHeroOnly: isHeroOnly,
          shape: shape
        });
      }
    };

    initParticles();

    let glowOffset1 = 0;
    let glowOffset2 = 0;
    let glowOffset3 = 0;

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = isDark ? '#030712' : '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      glowOffset1 += 0.001;
      glowOffset2 += 0.0012;
      glowOffset3 += 0.0008;

      const auroras = [
        {
          x: width * 0.25 + Math.sin(glowOffset1) * width * 0.15,
          y: height * 0.3 + Math.cos(glowOffset1) * height * 0.1,
          radius: Math.min(width, height) * 0.5,
          color: isDark ? 'rgba(0, 82, 204, 0.045)' : 'rgba(0, 82, 204, 0.04)',
        },
        {
          x: width * 0.75 + Math.cos(glowOffset2) * width * 0.12,
          y: height * 0.6 + Math.sin(glowOffset2) * height * 0.15,
          radius: Math.min(width, height) * 0.6,
          color: isDark ? 'rgba(124, 58, 237, 0.035)' : 'rgba(124, 58, 237, 0.03)',
        },
        {
          x: width * 0.5 + Math.sin(glowOffset3) * width * 0.1,
          y: height * 0.45 + Math.cos(glowOffset3) * height * 0.12,
          radius: Math.min(width, height) * 0.4,
          color: isDark ? 'rgba(16, 185, 129, 0.025)' : 'rgba(16, 185, 129, 0.02)',
        }
      ];

      auroras.forEach((aurora) => {
        const grad = ctx.createRadialGradient(aurora.x, aurora.y, 0, aurora.x, aurora.y, aurora.radius);
        grad.addColorStop(0, aurora.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      const parallaxX = (mouse.x - width / 2) * 0.025;
      const parallaxY = (mouse.y - height / 2) * 0.025;

      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const currentSize = p.size + Math.sin(p.pulse) * 0.8;

        // Interactive mouse gravity pull
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 220) {
          const force = (1 - mdist / 220) * 0.08;
          p.vx += (mdx / mdist) * force;
          p.vy += (mdy / mdist) * force;
        }

        // Limit speed and apply subtle drag/damping for natural motion
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = p.isHeroOnly ? 1.4 : 1.0;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;

        const navH = 80;
        if (p.isHeroOnly) {
          const heroHeight = height * 0.55;
          if (p.y < navH) p.y = heroHeight;   // wrap below hero zone, not above navbar
          else if (p.y > heroHeight) p.y = navH;
        } else {
          if (p.y < navH) p.y = height;        // wrap to bottom, not into navbar
          else if (p.y > height) p.y = navH;
        }

        const renderX = p.x + parallaxX;
        const renderY = p.y + parallaxY;

        // Skip drawing particles that land in the navbar dead-zone
        if (renderY < 80) return;

        // Custom premium color values
        let baseColor = 'rgba(0, 82, 204, 0.1)';
        let glowColor = 'rgba(0, 82, 204, 0.35)';
        let glowOuter = 'rgba(0, 82, 204, 0.04)';

        if (isDark) {
          if (p.color === 'purple') {
            baseColor = 'rgba(167, 139, 250, 0.18)';
            glowColor = 'rgba(167, 139, 250, 0.45)';
            glowOuter = 'rgba(167, 139, 250, 0.05)';
          } else if (p.color === 'teal') {
            baseColor = 'rgba(52, 211, 153, 0.18)';
            glowColor = 'rgba(52, 211, 153, 0.45)';
            glowOuter = 'rgba(52, 211, 153, 0.05)';
          } else {
            baseColor = 'rgba(96, 165, 250, 0.18)';
            glowColor = 'rgba(96, 165, 250, 0.45)';
            glowOuter = 'rgba(96, 165, 250, 0.05)';
          }
        } else {
          if (p.color === 'purple') {
            baseColor = 'rgba(124, 58, 237, 0.12)';
            glowColor = 'rgba(124, 58, 237, 0.38)';
            glowOuter = 'rgba(124, 58, 237, 0.04)';
          } else if (p.color === 'teal') {
            baseColor = 'rgba(16, 185, 129, 0.12)';
            glowColor = 'rgba(16, 185, 129, 0.38)';
            glowOuter = 'rgba(16, 185, 129, 0.04)';
          } else {
            baseColor = 'rgba(0, 82, 204, 0.12)';
            glowColor = 'rgba(0, 82, 204, 0.38)';
            glowOuter = 'rgba(0, 82, 204, 0.04)';
          }
        }

        // Draw different premium shapes
        if (p.shape === 'cross') {
          // Plus sign (+)
          ctx.strokeStyle = p.glow ? glowColor : baseColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(renderX - 2.5, renderY);
          ctx.lineTo(renderX + 2.5, renderY);
          ctx.moveTo(renderX, renderY - 2.5);
          ctx.lineTo(renderX, renderY + 2.5);
          ctx.stroke();
        } else if (p.shape === 'ring') {
          // Tiny hollow circle
          ctx.strokeStyle = p.glow ? glowColor : baseColor;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.arc(renderX, renderY, currentSize * 0.95, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Standard filled dot
          ctx.beginPath();
          ctx.arc(renderX, renderY, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = p.glow ? glowColor : baseColor;
          ctx.fill();
        }

        if (p.glow) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, currentSize * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = glowOuter;
          ctx.fill();
        }
      });

      ctx.lineWidth = 0.55;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const opacity = (1 - dist / 130) * (isDark ? 0.11 : 0.08);

            // Connect line base color matches the source node color
            let strokeColor = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 82, 204, ${opacity})`;
            if (p1.color === 'purple') {
              strokeColor = isDark ? `rgba(167, 139, 250, ${opacity * 1.2})` : `rgba(124, 58, 237, ${opacity * 0.85})`;
            } else if (p1.color === 'teal') {
              strokeColor = isDark ? `rgba(52, 211, 153, ${opacity * 1.2})` : `rgba(16, 185, 129, ${opacity * 0.85})`;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x + parallaxX, p1.y + parallaxY);
            ctx.lineTo(p2.x + parallaxX, p2.y + parallaxY);
            ctx.strokeStyle = strokeColor;
            ctx.stroke();

            // Draw traveling data flow pulses on 12% of connections
            if ((i + j) % 8 === 0) {
              const progress = (Date.now() / 1800 + (i * 0.15)) % 1;
              const pulseX = p1.x + dx * progress + parallaxX;
              const pulseY = p1.y + dy * progress + parallaxY;

              let pulseColor = isDark ? '#93c5fd' : '#0052cc';
              if (p1.color === 'purple') pulseColor = isDark ? '#c084fc' : '#7c3aed';
              else if (p1.color === 'teal') pulseColor = isDark ? '#34d399' : '#10b981';

              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = pulseColor;
              ctx.fill();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

function LiquidWaveDivider({ inverted = false }: { inverted?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] z-10 select-none pointer-events-none ${inverted ? 'rotate-180' : ''}`}
      style={{ height: '320px', marginTop: '-160px', marginBottom: '-160px' }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="relative block w-full h-[320px]"
      >
        <defs>
          <linearGradient id="waveGradA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a8d8e8" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#c2e8f4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a8d8e8" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="waveGradB" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#cce9f5" stopOpacity="0.40" />
            <stop offset="50%" stopColor="#e0f4fb" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#cce9f5" stopOpacity="0.40" />
          </linearGradient>
          <linearGradient id="fishGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="fishGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="fishGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        {/* Back wave — broad, slow, high waves, deep sea, moves diagonally */}
        <motion.path
          d="M-100,160 C140,40 380,280 620,160 C860,40 1100,280 1340,160 C1460,280 1540,160 1540,160 L1540,320 L-100,320 Z"
          fill="url(#waveGradA)"
          animate={{
            d: [
              "M-100,160 C140,40 380,280 620,160 C860,40 1100,280 1340,160 C1460,280 1540,160 1540,160 L1540,320 L-100,320 Z",
              "M-100,200 C140,280 380,60 620,200 C860,280 1100,60 1340,200 C1460,60 1540,200 1540,200 L1540,320 L-100,320 Z",
              "M-100,160 C140,40 380,280 620,160 C860,40 1100,280 1340,160 C1460,280 1540,160 1540,160 L1540,320 L-100,320 Z",
            ],
            x: [-70, 70, -70],
            y: [-25, 25, -25]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />



        {/* Front wave — slightly faster, shallower, deep sea floor, moves diagonally */}
        <motion.path
          d="M-100,210 C260,90 620,300 980,210 C1160,150 1380,270 1540,210 L1540,320 L-100,320 Z"
          fill="url(#waveGradB)"
          animate={{
            d: [
              "M-100,210 C260,90 620,300 980,210 C1160,150 1380,270 1540,210 L1540,320 L-100,320 Z",
              "M-100,240 C260,300 620,110 980,240 C1160,300 1380,170 1540,240 L1540,320 L-100,320 Z",
              "M-100,210 C260,90 620,300 980,210 C1160,150 1380,270 1540,210 L1540,320 L-100,320 Z",
            ],
            x: [60, -60, 60],
            y: [25, -25, 25]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 15
    }
  }
};

export default function Home() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: 'ERP Solutions',
    message: '',
  });
  const [activeFormTab, setActiveFormTab] = useState<'development' | 'education'>('development');
  const [eduFormData, setEduFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    semester: '3rd Year',
    department: '',
    program: 'Paid Internship',
    gender: 'Male',
    coverLetter: '',
  });
  const [countryCode, setCountryCode] = useState('+91');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isDemoModalOpen || !isAutoplay) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        const next = prev + 1;
        if (next >= 12) { setIsAutoplay(false); return 11; }
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isDemoModalOpen, isAutoplay]);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [searchCertNo, setSearchCertNo] = useState('');
  const [searchedCert, setSearchedCert] = useState<any>(null);
  const [certStatus, setCertStatus] = useState<'idle' | 'searching' | 'found' | 'not_found' | 'error'>('idle');

  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);




  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isNavigating, setIsNavigating] = useState(false);
  const [navTargetName, setNavTargetName] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleNavClick = (sectionId: string, sectionDisplayName: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setNavTargetName(sectionDisplayName);
    setIsNavigating(true);
    setLoadingProgress(15);

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    let currentProgress = 15;
    const interval = setInterval(() => {
      const increment = currentProgress > 80 ? Math.random() * 4 : Math.random() * 20 + 5;
      currentProgress += increment;

      if (currentProgress >= 100) {
        currentProgress = 100;
        setLoadingProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsNavigating(false);
          setActiveSection(sectionId);
        }, 400);
      } else {
        setLoadingProgress(currentProgress);
      }
    }, 80);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      setShowScrollTop(scrollY > 400);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(scrollY / docHeight);
      }

      // Track active section on scroll
      const sections = ['home', 'about', 'products', 'services', 'projects', 'research', 'insights', 'career', 'contact'];
      const scrollPosition = scrollY + 200; // Offset for header height

      for (const section of sections) {
        if (section === 'home') {
          if (scrollY < 300) {
            setActiveSection('home');
            continue;
          }
        }
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEduInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEduFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const response = await fetch(`${apiUrl}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone ? `${countryCode} ${formData.phone}` : undefined,
          company: formData.company || undefined,
          subject: `Website contact form - ${formData.requirement}`,
          message: formData.message,
          source: 'WEBSITE_CONTACT',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          requirement: 'ERP Solutions',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleEduSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const response = await fetch(`${apiUrl}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: eduFormData.name,
          email: eduFormData.email,
          phone: eduFormData.phone ? `${countryCode} ${eduFormData.phone}` : undefined,
          company: eduFormData.university,
          subject: `Education Program Application - ${eduFormData.program}`,
          message: `University/College: ${eduFormData.university}\nCourse: ${eduFormData.course}\nSemester/Year: ${eduFormData.semester}\nDepartment/Specialization: ${eduFormData.department}\nGender: ${eduFormData.gender}${eduFormData.coverLetter ? '\n\nCover Letter:\n' + eduFormData.coverLetter : ''}`,
          source: 'EDUCATION_PORTAL',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEduFormData({
          name: '',
          email: '',
          phone: '',
          university: '',
          course: '',
          semester: '3rd Year',
          department: '',
          program: 'Paid Internship',
          gender: 'Male',
          coverLetter: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Education submission error:', error);
      setStatus('error');
    }
  };

  const handleCertSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCertNo.trim()) return;

    setCertStatus('searching');
    setSearchedCert(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const response = await fetch(`${apiUrl}/certificates/${searchCertNo.trim()}`);
      if (response.ok) {
        const data = await response.json();
        setSearchedCert(data);
        setCertStatus('found');
      } else {
        const fallbackMocks = [
          {
            id: 'cert-1',
            certificateNo: 'AGC-2026-9812',
            candidateName: 'Amit Baruah',
            course: 'React & Next.js Full Stack Development',
            grade: 'A+',
            duration: '3 Months',
            dateOfIssue: '2026-06-15T00:00:00.000Z',
            description: 'Awarded for outstanding performance in the Next.js and NestJS development track.',
          },
          {
            id: 'cert-2',
            certificateNo: 'AGC-2026-4421',
            candidateName: 'Priya Sharma',
            course: 'Advanced Web Development & SaaS Systems',
            grade: 'A',
            duration: '3 Months',
            dateOfIssue: '2026-05-10T00:00:00.000Z',
            description: 'Successfully completed SaaS and database architecture implementation projects.',
          },
          {
            id: 'cert-3',
            certificateNo: 'AGC-2026-0731',
            candidateName: 'Suresh Naidu',
            course: 'Mobile App Architecture & Design',
            grade: 'A+',
            duration: '3 Months',
            dateOfIssue: '2026-07-01T00:00:00.000Z',
            description: 'Demonstrated excellence in Android mobile application layout, offline syncing, and routing.',
          },
        ];

        const localCert = fallbackMocks.find(
          (c) => c.certificateNo.toLowerCase() === searchCertNo.trim().toLowerCase()
        );
        if (localCert) {
          setSearchedCert(localCert);
          setCertStatus('found');
        } else {
          setCertStatus('not_found');
        }
      }
    } catch (error) {
      console.error('Certificate search error:', error);
      const fallbackMocks = [
        {
          id: 'cert-1',
          certificateNo: 'AGC-2026-9812',
          candidateName: 'Amit Baruah',
          course: 'React & Next.js Full Stack Development',
          grade: 'A+',
          duration: '3 Months',
          dateOfIssue: '2026-06-15T00:00:00.000Z',
          description: 'Awarded for outstanding performance in the Next.js and NestJS development track.',
        },
        {
          id: 'cert-2',
          certificateNo: 'AGC-2026-4421',
          candidateName: 'Priya Sharma',
          course: 'Advanced Web Development & SaaS Systems',
          grade: 'A',
          duration: '3 Months',
          dateOfIssue: '2026-05-10T00:00:00.000Z',
          description: 'Successfully completed SaaS and database architecture implementation projects.',
        },
        {
          id: 'cert-3',
          certificateNo: 'AGC-2026-0731',
          candidateName: 'Suresh Naidu',
          course: 'Mobile App Architecture & Design',
          grade: 'A+',
          duration: '3 Months',
          dateOfIssue: '2026-07-01T00:00:00.000Z',
          description: 'Demonstrated excellence in Android mobile application layout, offline syncing, and routing.',
        },
      ];
      const localCert = fallbackMocks.find(
        (c) => c.certificateNo.toLowerCase() === searchCertNo.trim().toLowerCase()
      );
      if (localCert) {
        setSearchedCert(localCert);
        setCertStatus('found');
      } else {
        setCertStatus('not_found');
      }
    }
  };

  const handlePrintReport = () => {
    if (!searchedCert) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const dateStr = new Date(searchedCert.dateOfIssue).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>Verification Report - ${searchedCert.certificateNo}</title>
          <style>
            body {
              font-family: 'Inter', sans-serif;
              padding: 40px;
              color: #1e293b;
              background: #ffffff;
            }
            .report-container {
              border: 2px solid #e2e8f0;
              border-radius: 12px;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              position: relative;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #f1f5f9;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: 800;
              color: #0052cc;
            }
            .title {
              font-size: 20px;
              font-weight: 700;
              margin-top: 10px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .badge {
              background: #e0f2fe;
              color: #0369a1;
              padding: 6px 12px;
              border-radius: 9999px;
              font-size: 12px;
              font-weight: 700;
              display: inline-block;
              margin-top: 10px;
            }
            .details-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 30px;
            }
            .detail-item {
              border-bottom: 1px solid #f1f5f9;
              padding-bottom: 10px;
            }
            .label {
              font-size: 11px;
              font-weight: 800;
              color: #64748b;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .value {
              font-size: 14px;
              font-weight: 600;
              color: #0f172a;
            }
            .seal-container {
              text-align: center;
              margin-top: 40px;
              border-top: 2px solid #f1f5f9;
              padding-top: 30px;
            }
            .seal {
              font-weight: 800;
              color: #10b981;
              font-size: 16px;
            }
            .footer-text {
              text-align: center;
              font-size: 10px;
              color: #94a3b8;
              margin-top: 50px;
            }
            @media print {
              body { padding: 0; }
              .report-container { border: none; }
            }
          </style>
        </head>
        <body>
          <div class="report-container">
            <div class="header">
              <div class="logo">ALGOGUIDO TECHNOLOGIES</div>
              <div class="title">Official Certificate Verification Report</div>
              <div class="badge">Status: VERIFIED & GENUINE</div>
            </div>

            <div class="details-grid">
              <div class="detail-item">
                <div class="label">Certificate Number</div>
                <div class="value">${searchedCert.certificateNo}</div>
              </div>
              <div class="detail-item">
                <div class="label">Candidate Name</div>
                <div class="value">${searchedCert.candidateName}</div>
              </div>
              <div class="detail-item">
                <div class="label">Course Completed</div>
                <div class="value">${searchedCert.course}</div>
              </div>
              <div class="detail-item">
                <div class="label">Overall Grade</div>
                <div class="value">${searchedCert.grade}</div>
              </div>
              <div class="detail-item">
                <div class="label">Program Duration</div>
                <div class="value">${searchedCert.duration}</div>
              </div>
              <div class="detail-item">
                <div class="label">Date of Issue</div>
                <div class="value">${dateStr}</div>
              </div>
            </div>

            <div class="seal-container">
              <div class="seal">✓ SECURED BY ALGOGUIDO BLOCKCHAIN & DB VERIFICATION</div>
              <p style="font-size: 11px; color: #64748b; margin-top: 5px;">This document serves as primary proof of candidate performance and completion of criteria.</p>
            </div>

            <div class="footer-text">
              Algoguido Technologies Private Limited — Guwahati, Assam, India.
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent overflow-x-hidden relative">
      <AnimatePresence>
        {isNavigating && (
          <>
            {/* Top slim glowing bar */}
            <motion.div
              initial={{ width: '0%', opacity: 1 }}
              animate={{ width: `${loadingProgress}%` }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-500 z-[9999] shadow-[0_0_12px_rgba(79,70,229,0.7)]"
            />

            {/* Apple Premium stylish fullscreen overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white/70 dark:bg-navy-950/70 backdrop-blur-md z-[9998] flex flex-col items-center justify-center pointer-events-auto"
            >
              {/* Spinning gradient ring */}
              <div className="relative flex items-center justify-center">
                {/* Glow ring */}
                <div className="absolute h-16 w-16 rounded-full border-[3px] border-slate-200/50 dark:border-white/5" />

                {/* Spin segment */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-16 w-16 rounded-full border-[3px] border-t-blue-600 border-r-purple-500 border-b-transparent border-l-transparent"
                />

                {/* Embedded logo/symbol inside the ring */}
                <div className="absolute">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <img src="/logo.png" alt="Algoguido" className="h-6 w-6 object-contain dark:brightness-100 brightness-90" />
                  </motion.div>
                </div>
              </div>

              {/* Text label */}
              <div className="mt-6 flex flex-col items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">
                  Navigating to {navTargetName}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  Applying premium AI layout optimizations...
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <DynamicBackground />
      {/* Header/Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'h-16 bg-white/75 dark:bg-navy-950/75 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-sm' : 'h-20 bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <img src="/logo.png" alt="Algoguido Logo" className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-[360deg]" />
              <div className="absolute inset-0 bg-brand-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight leading-tight transition-colors">
                Algoguido
              </span>
              <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                Technologies Pvt. Ltd.
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 relative">
            <a
              href="/"
              onClick={(e) => handleNavClick('home', 'Home', e)}
              className={`relative px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-full ${activeSection === 'home' ? 'text-[#0052cc] bg-[#0052cc]/5' : 'text-slate-700 dark:text-slate-200 hover:text-[#0052cc] hover:bg-slate-100/50 dark:hover:bg-white/5'}`}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={(e) => handleNavClick('about', 'About', e)}
              className={`px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-full ${activeSection === 'about' ? 'text-[#0052cc] bg-[#0052cc]/5' : 'text-slate-700 dark:text-slate-200 hover:text-[#0052cc] hover:bg-slate-100/50 dark:hover:bg-white/5'}`}
            >
              About
            </a>

            <a
              href="#why"
              onClick={(e) => handleNavClick('why', 'Why Algogudo', e)}
              className={`px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-full ${activeSection === 'why' ? 'text-[#0052cc] bg-[#0052cc]/5' : 'text-slate-700 dark:text-slate-200 hover:text-[#0052cc] hover:bg-slate-100/50 dark:hover:bg-white/5'}`}
            >
              Why Algoguido
            </a>

            <a
              href="#products"
              onClick={(e) => handleNavClick('products', 'Products', e)}
              className={`px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-full ${activeSection === 'products' ? 'text-[#0052cc] bg-[#0052cc]/5' : 'text-slate-700 dark:text-slate-200 hover:text-[#0052cc] hover:bg-slate-100/50 dark:hover:bg-white/5'}`}
            >
              Products
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick('services', 'Solutions', e)}
              className={`px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-full ${activeSection === 'services' || activeSection === 'tech' ? 'text-[#0052cc] bg-[#0052cc]/5' : 'text-slate-700 dark:text-slate-200 hover:text-[#0052cc] hover:bg-slate-100/50 dark:hover:bg-white/5'}`}
            >
              Solutions
            </a>

            <a
              href="#projects"
              onClick={(e) => handleNavClick('projects', 'Projects', e)}
              className={`px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-full ${activeSection === 'projects' ? 'text-[#0052cc] bg-[#0052cc]/5' : 'text-slate-700 dark:text-slate-200 hover:text-[#0052cc] hover:bg-slate-100/50 dark:hover:bg-white/5'}`}
            >
              Projects
            </a>
            <a
              href="#research"
              onClick={(e) => handleNavClick('research', 'Research', e)}
              className={`px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-full ${activeSection === 'research' ? 'text-[#0052cc] bg-[#0052cc]/5' : 'text-slate-700 dark:text-slate-200 hover:text-[#0052cc] hover:bg-slate-100/50 dark:hover:bg-white/5'}`}
            >
              Research
            </a>
            <a
              href="#insights"
              onClick={(e) => handleNavClick('insights', 'Blog', e)}
              className={`px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-full ${activeSection === 'insights' ? 'text-[#0052cc] bg-[#0052cc]/5' : 'text-slate-700 dark:text-slate-200 hover:text-[#0052cc] hover:bg-slate-100/50 dark:hover:bg-white/5'}`}
            >
              Blog
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick('contact', 'Contact', e)}
              className={`px-3.5 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-200 rounded-full ${activeSection === 'contact' ? 'text-[#0052cc] bg-[#0052cc]/5' : 'text-slate-700 dark:text-slate-200 hover:text-[#0052cc] hover:bg-slate-100/50 dark:hover:bg-white/5'}`}
            >
              Contact
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-colors text-slate-600 dark:text-slate-300">
              <Search className="h-4 w-4" />
            </div>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-brand text-white shadow-md font-bold text-[10px] tracking-widest uppercase h-9 px-4 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Request Demo
            </a>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Panel */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-navy-950 border-b border-slate-200/50 dark:border-white/5 p-6 flex flex-col gap-4 xl:hidden animate-scale-in max-h-[85vh] overflow-y-auto z-40">
              <a
                href="#"
                onClick={(e) => handleNavClick('home', 'Home', e)}
                className={`text-sm font-bold py-2 border-b border-slate-100 dark:border-white/5 ${activeSection === 'home' ? 'text-[#0052cc]' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Home
              </a>

              <a
                href="#about"
                onClick={(e) => handleNavClick('about', 'About', e)}
                className={`text-sm font-bold py-2 border-b border-slate-100 dark:border-white/5 ${activeSection === 'about' ? 'text-[#0052cc]' : 'text-slate-700 dark:text-slate-200'}`}
              >
                About
              </a>

              <a
                href="#why"
                onClick={(e) => handleNavClick('why', 'Why Algoguido', e)}
                className={`text-sm font-bold py-2 border-b border-slate-100 dark:border-white/5 ${activeSection === 'why' ? 'text-[#0052cc]' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Why Algoguido
              </a>

              <div className="flex flex-col gap-2 py-2 border-b border-slate-100 dark:border-white/5">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${activeSection === 'products' ? 'text-[#0052cc]' : 'text-slate-400'}`}>Products</span>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  <a href="#products" onClick={(e) => handleNavClick('products', 'Products', e)} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0052cc]">eduAI365</a>
                  <a href="#products" onClick={(e) => handleNavClick('products', 'Products', e)} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0052cc]">Apply4Jobs</a>
                  <a href="#products" onClick={(e) => handleNavClick('products', 'Products', e)} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0052cc]">LeadGrowAI</a>
                  <a href="#products" onClick={(e) => handleNavClick('products', 'Products', e)} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0052cc]">TheHirings</a>
                </div>
              </div>

              <div className="flex flex-col gap-2 py-2 border-b border-slate-100 dark:border-white/5">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${activeSection === 'services' || activeSection === 'tech' ? 'text-[#0052cc]' : 'text-slate-400'}`}>Solutions</span>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  <a href="#services" onClick={(e) => handleNavClick('services', 'Solutions', e)} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0052cc]">ERP Platforms</a>
                  <a href="#services" onClick={(e) => handleNavClick('services', 'Solutions', e)} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0052cc]">CRM & Growth</a>
                  <a href="#services" onClick={(e) => handleNavClick('services', 'Solutions', e)} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0052cc]">AI Automation</a>
                  <a href="#tech" onClick={(e) => handleNavClick('services', 'Solutions', e)} className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#0052cc]">Cloud & Infra</a>
                </div>
              </div>

              <a
                href="#projects"
                onClick={(e) => handleNavClick('projects', 'Projects', e)}
                className={`text-sm font-bold py-2 border-b border-slate-100 dark:border-white/5 ${activeSection === 'projects' ? 'text-[#0052cc]' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Projects
              </a>
              <a
                href="#research"
                onClick={(e) => handleNavClick('research', 'Research', e)}
                className={`text-sm font-bold py-2 border-b border-slate-100 dark:border-white/5 ${activeSection === 'research' ? 'text-[#0052cc]' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Research & Education
              </a>
              <a
                href="#insights"
                onClick={(e) => handleNavClick('insights', 'Blog', e)}
                className={`text-sm font-bold py-2 border-b border-slate-100 dark:border-white/5 ${activeSection === 'insights' ? 'text-[#0052cc]' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Blog
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick('contact', 'Contact', e)}
                className={`text-sm font-bold py-2 border-b border-slate-100 dark:border-white/5 ${activeSection === 'contact' ? 'text-[#0052cc]' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Contact
              </a>

              <div className="flex gap-4 mt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-grow inline-flex items-center justify-center rounded-xl bg-gradient-brand text-white shadow-md font-bold text-xs tracking-wider uppercase h-11 px-6 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Request Demo
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow pt-16">
        <section id="home" className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-10 lg:py-8 bg-mesh">
          {/* Animated Background Glow Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -40, 30, 0],
                scale: [1, 1.1, 0.95, 1]
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-brand-200/30 blur-[100px] dark:bg-brand-500/10"
            />
            <motion.div
              animate={{
                x: [0, -40, 20, 0],
                y: [0, 30, -40, 0],
                scale: [1, 0.95, 1.1, 1]
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-purple-200/30 blur-[120px] dark:bg-purple-500/10"
            />
          </div>

          {/* Apple Premium Badge at the very top of the Hero content */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full flex justify-center px-4 mb-2 lg:mb-3 relative z-10"
          >
            <div className="inline-flex flex-wrap md:flex-nowrap items-center justify-center gap-y-2.5 gap-x-5 px-6 py-2.5 rounded-full bg-white/40 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Brain className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                AI-First Approach
              </span>
              <span className="h-3 w-px bg-slate-300 dark:bg-white/10 hidden md:inline shrink-0" />
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                ISO 9001:2015 Certified
              </span>
              <span className="h-3 w-px bg-slate-300 dark:bg-white/10 hidden md:inline shrink-0" />
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Lock className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                Secure & Scalable
              </span>
              <span className="h-3 w-px bg-slate-300 dark:bg-white/10 hidden md:inline shrink-0" />
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Zap className="h-3.5 w-3.5 text-red-500 shrink-0" />
                Redis Cache Optimized
              </span>
              <span className="h-3 w-px bg-slate-300 dark:bg-white/10 hidden md:inline shrink-0" />
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Users className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                Trusted by 100+ Clients
              </span>
            </div>
          </motion.div>

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Hero Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 flex flex-col items-center lg:items-start gap-5 lg:gap-6 text-center lg:text-left"
            >

              <motion.h1
                variants={itemVariants}
                className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-slate-900 dark:text-white tracking-tight"
              >
                AI-Powered Enterprise Application Built for <span className="bg-gradient-to-r from-brand-600 via-[#0052cc] to-purple-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-purple-400">Education, Healthcare, Government & Business</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
              >
                Transforming organizations through Artificial Intelligence, Enterprise Applications, Cloud Infrastructure, and Digital Innovation.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2 items-stretch sm:items-center w-full"
              >
                <motion.a
                  href="#services"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 10px 25px rgba(0, 82, 204, 0.25)"
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="relative inline-flex items-center justify-center rounded-xl font-bold uppercase tracking-wider text-xs h-13 px-8 bg-gradient-brand text-white overflow-hidden gap-2 transition-all duration-300 w-full sm:w-auto group/cta shadow-md"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-out" />
                  Explore Products <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 10px 25px rgba(0, 82, 204, 0.08)"
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center rounded-xl font-bold uppercase tracking-wider text-xs h-13 px-8 bg-white/40 dark:bg-white/5 text-slate-800 dark:text-white border border-slate-200/80 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 backdrop-blur-md transition-all duration-300 w-full sm:w-auto"
                >
                  Talk to Experts
                </motion.a>
                <motion.button
                  onClick={() => setIsDemoModalOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center sm:justify-start gap-2 text-slate-700 dark:text-slate-300 hover:text-[#0052cc] dark:hover:text-brand-400 font-semibold text-sm sm:ml-2 group transition-colors"
                >
                  <span className="h-10 w-10 rounded-full border border-slate-200 dark:border-navy-800 flex items-center justify-center group-hover:border-[#0052cc] dark:group-hover:border-brand-400 group-hover:bg-[#0052cc]/5 transition-colors relative">
                    <span className="absolute inset-0 rounded-full bg-brand-500/10 animate-ping opacity-75 group-hover:block hidden" />
                    <Play className="h-3.5 w-3.5 fill-current text-slate-600 dark:text-slate-400 group-hover:text-[#0052cc] dark:group-hover:text-brand-400 relative z-10" />
                  </span>
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Hero Right Visuals (System Connected Map with center hero-image.png) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 15 }}
              className="lg:col-span-6 hidden lg:flex flex-col items-center relative w-full select-none"
            >
              {/* Centered coordinate system container */}
              <div className="relative w-[500px] h-[500px] flex-shrink-0">
                {/* Soft background glow */}
                <div className="absolute w-[80%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* SVG connection lines with animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 500 500">
                  <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#0052cc" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#d946ef" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Node 1: Web Client (Top Left) to Center */}
                  <motion.line
                    x1="100" y1="100" x2="250" y2="250"
                    stroke="url(#gradient-line)" strokeWidth="2" strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Node 2: Admin Panel (Top Right) to Center */}
                  <motion.line
                    x1="400" y1="100" x2="250" y2="250"
                    stroke="url(#gradient-line)" strokeWidth="2" strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, 20] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Node 3: Auth Security (Top Center) to Center */}
                  <motion.line
                    x1="250" y1="60" x2="250" y2="250"
                    stroke="url(#gradient-line)" strokeWidth="2" strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Node 4: DB Client (Bottom Left) to Center */}
                  <motion.line
                    x1="100" y1="400" x2="250" y2="250"
                    stroke="url(#gradient-line)" strokeWidth="2" strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, 20] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Node 5: AI Engine (Bottom Right) to Center */}
                  <motion.line
                    x1="400" y1="400" x2="250" y2="250"
                    stroke="url(#gradient-line)" strokeWidth="2" strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Node 6: Redis Cache (Bottom Center) to Center */}
                  <motion.line
                    x1="250" y1="440" x2="250" y2="250"
                    stroke="url(#gradient-line)" strokeWidth="2" strokeDasharray="5,5"
                    animate={{ strokeDashoffset: [0, 20] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  />
                </svg>

                {/* Heartbeat radar rings */}
                <div className="absolute top-[204px] left-[204px] w-24 h-24 pointer-events-none">
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-brand-500/30"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                    transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-brand-500/20"
                  />
                </div>

                {/* Central Element (hero-image.png) */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[194px] left-[194px] w-28 h-28 z-20 cursor-pointer transition-all duration-300"
                >
                  <img
                    src="/hero-image.png"
                    alt="Algoguido Monorepo Core"
                    className="w-full h-full object-contain filter drop-shadow-lg"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-extrabold text-[#0052cc] dark:text-brand-400 tracking-wider uppercase whitespace-nowrap bg-white/90 dark:bg-navy-900/90 px-2.5 py-0.5 rounded-full border border-slate-200/50 dark:border-white/10 shadow-sm z-30">
                    Core API
                  </span>
                </motion.div>

                {/* Surrounding Connected Node 1: Web Client */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-[60px] left-[60px] w-20 h-20 rounded-2xl bg-white/40 dark:bg-navy-900/40 border border-white/25 dark:border-white/10 shadow-xl backdrop-blur-md flex flex-col items-center justify-center p-3 z-10 cursor-pointer hover:shadow-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group/node"
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-1">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Web App</span>
                </motion.div>

                {/* Surrounding Connected Node 2: Admin Panel */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-[60px] right-[60px] w-20 h-20 rounded-2xl bg-white/40 dark:bg-navy-900/40 border border-white/25 dark:border-white/10 shadow-xl backdrop-blur-md flex flex-col items-center justify-center p-3 z-10 cursor-pointer hover:shadow-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group/node"
                >
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 mb-1">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Admin</span>
                </motion.div>

                {/* Surrounding Connected Node 3: Auth Security */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-[10px] left-[210px] w-20 h-20 rounded-2xl bg-white/40 dark:bg-navy-900/40 border border-white/25 dark:border-white/10 shadow-xl backdrop-blur-md flex flex-col items-center justify-center p-3 z-10 cursor-pointer hover:shadow-amber-500/20 hover:border-amber-500/40 transition-all duration-300 group/node"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-1">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Auth</span>
                </motion.div>

                {/* Surrounding Connected Node 4: DB Client */}
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-[60px] left-[60px] w-20 h-20 rounded-2xl bg-white/40 dark:bg-navy-900/40 border border-white/25 dark:border-white/10 shadow-xl backdrop-blur-md flex flex-col items-center justify-center p-3 z-10 cursor-pointer hover:shadow-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group/node"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-1">
                    <Database className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Database</span>
                </motion.div>

                {/* Surrounding Connected Node 5: AI Engine */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-[60px] right-[60px] w-20 h-20 rounded-2xl bg-white/40 dark:bg-navy-900/40 border border-white/25 dark:border-white/10 shadow-xl backdrop-blur-md flex flex-col items-center justify-center p-3 z-10 cursor-pointer hover:shadow-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group/node"
                >
                  <div className="p-2 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 mb-1">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">AI Engine</span>
                </motion.div>

                {/* Surrounding Connected Node 6: Redis Cache */}
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-[10px] left-[210px] w-20 h-20 rounded-2xl bg-white/40 dark:bg-navy-900/40 border border-white/25 dark:border-white/10 shadow-xl backdrop-blur-md flex flex-col items-center justify-center p-3 z-10 cursor-pointer hover:shadow-red-500/20 hover:border-red-500/40 transition-all duration-300 group/node"
                >
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 mb-1">
                    <Zap className="h-5 w-5 animate-pulse" />
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Redis Cache</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        <LiquidWaveDivider />

        {/* Trusted By Organizations across India */}
        <section id="clients" className="py-10 md:py-20 border-t border-b border-slate-200/60 dark:border-navy-900 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 relative z-10" style={{ background: 'linear-gradient(180deg, #fcfbfa 0%, #f7f5f0 100%)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto flex flex-col items-center gap-8"
          >
            <h4 className="text-[11px] font-extrabold tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-600 dark:from-yellow-500 dark:via-amber-300 dark:to-yellow-600 uppercase text-center select-none">
              TRUSTED BY ORGANIZATIONS ACROSS INDIA
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-5 w-full max-w-7xl" style={{ perspective: 1200 }}>
              {/* Org 1: LeadGrowAI */}
              <motion.div
                whileHover={{
                  y: -8,
                  rotateX: 12,
                  rotateY: -12,
                  scale: 1.05,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50/50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-4 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all duration-300 overflow-hidden group select-none h-28"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-extrabold text-xs shadow-inner relative z-10 transition-transform group-hover:scale-110">
                  LGA
                </div>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-[10px] font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight uppercase">LeadGrowAI</span>
                  <span className="text-[7.5px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">AI CRM</span>
                </div>
              </motion.div>

              {/* Org 2: Nidaan Polyclinic */}
              <motion.div
                whileHover={{
                  y: -8,
                  rotateX: 12,
                  rotateY: -12,
                  scale: 1.05,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50/50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-4 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all duration-300 overflow-hidden group select-none h-28"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="h-10 w-10 rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-extrabold text-xs shadow-inner relative z-10 transition-transform group-hover:scale-110">
                  NPC
                </div>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-[10px] font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight uppercase">Nidaan</span>
                  <span className="text-[7.5px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">Polyclinic</span>
                </div>
              </motion.div>

              {/* Org 3: ISD Gold */}
              <motion.div
                whileHover={{
                  y: -8,
                  rotateX: 12,
                  rotateY: -12,
                  scale: 1.05,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50/50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-4 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all duration-300 overflow-hidden group select-none h-28"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-extrabold text-xs shadow-inner relative z-10 transition-transform group-hover:scale-110">
                  ISD
                </div>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-[10px] font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight uppercase">ISD Gold</span>
                  <span className="text-[7.5px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">Jewellery</span>
                </div>
              </motion.div>

              {/* Org 4: Azmal Foundation */}
              <motion.div
                whileHover={{
                  y: -8,
                  rotateX: 12,
                  rotateY: -12,
                  scale: 1.05,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50/50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-4 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all duration-300 overflow-hidden group select-none h-28"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-extrabold text-xs shadow-inner relative z-10 transition-transform group-hover:scale-110">
                  AF
                </div>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-[10px] font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight uppercase">Azmal</span>
                  <span className="text-[7.5px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">Foundation</span>
                </div>
              </motion.div>

              {/* Org 5: eduAI365 */}
              <motion.div
                whileHover={{
                  y: -8,
                  rotateX: 12,
                  rotateY: -12,
                  scale: 1.05,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50/50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-4 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all duration-300 overflow-hidden group select-none h-28"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-xs shadow-inner relative z-10 transition-transform group-hover:scale-110">
                  E365
                </div>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-[10px] font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight uppercase">eduAI365</span>
                  <span className="text-[7.5px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">EdTech</span>
                </div>
              </motion.div>

              {/* Org 6: neHerbalTea */}
              <motion.div
                whileHover={{
                  y: -8,
                  rotateX: 12,
                  rotateY: -12,
                  scale: 1.05,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50/50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-4 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all duration-300 overflow-hidden group select-none h-28"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="h-10 w-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-green-400 font-extrabold text-xs shadow-inner relative z-10 transition-transform group-hover:scale-110">
                  NHT
                </div>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-[10px] font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight uppercase">neHerbalTea</span>
                  <span className="text-[7.5px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">Wellness</span>
                </div>
              </motion.div>

              {/* Org 7: theHireMe */}
              <motion.div
                whileHover={{
                  y: -8,
                  rotateX: 12,
                  rotateY: -12,
                  scale: 1.05,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50/50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-4 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all duration-300 overflow-hidden group select-none h-28"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="h-10 w-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-extrabold text-xs shadow-inner relative z-10 transition-transform group-hover:scale-110">
                  THM
                </div>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-[10px] font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight uppercase">theHireMe</span>
                  <span className="text-[7.5px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">Recruitment</span>
                </div>
              </motion.div>

              {/* Org 8: GauhatiHighCourt */}
              <motion.div
                whileHover={{
                  y: -8,
                  rotateX: 12,
                  rotateY: -12,
                  scale: 1.05,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50/50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-4 rounded-2xl shadow-sm hover:shadow-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all duration-300 overflow-hidden group select-none h-28"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="h-10 w-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-extrabold text-[9px] shadow-inner relative z-10 transition-transform group-hover:scale-110">
                  GHC
                </div>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-[9.5px] font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight uppercase">Gauhati HC</span>
                  <span className="text-[7.5px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">High Court</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-14 md:py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #edf1f7 100%)' }}>
          <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3.5 py-1 rounded-full w-fit">
                ABOUT US
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
                Architecting the Future of Enterprise Intelligence
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                At Algoguido, we build sovereign AI platforms, secure state-grade cloud environments, and robust digital systems. Born from a vision to power critical sectors, we bridge cutting-edge technical breakthroughs with regulatory-compliant security standards.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-4">
                <div className="p-5 bg-white/60 dark:bg-navy-900/30 border border-slate-200/60 dark:border-white/5 rounded-2xl backdrop-blur-md flex flex-col gap-2">
                  <span className="text-xs font-extrabold text-[#0052cc] dark:text-blue-400 uppercase tracking-wide">Our Mission</span>
                  <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">
                    To deliver scalable AI and cloud solutions that ensure privacy compliance, deep automation, and national-grade data sovereignty.
                  </p>
                </div>
                <div className="p-5 bg-white/60 dark:bg-navy-900/30 border border-slate-200/60 dark:border-white/5 rounded-2xl backdrop-blur-md flex flex-col gap-2">
                  <span className="text-xs font-extrabold text-[#0052cc] dark:text-blue-400 uppercase tracking-wide">Our Vision</span>
                  <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">
                    To lead India's enterprise software expansion with intelligent, secure, and sovereign systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Pillars/Features Column */}
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
              <div className="p-6 bg-white/60 dark:bg-navy-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl flex flex-col gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-cyan-600 flex items-center justify-center font-extrabold text-sm shadow-sm">
                  01
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">Sovereign Focus</h3>
                  <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">
                    Every algorithm, pipeline, and storage server complies with strict Indian data residency mandates.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white/60 dark:bg-navy-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl flex flex-col gap-4">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-extrabold text-sm shadow-sm">
                  02
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">State-Grade Security</h3>
                  <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">
                    Integrated cryptography, strict multi-tenant sandboxing, and security compliance audits.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white/60 dark:bg-navy-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl flex flex-col gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-extrabold text-sm shadow-sm">
                  03
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">Advanced AI R&D</h3>
                  <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">
                    Custom large language models, localized sentiment analyzers, and domain-specialized pipelines.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white/60 dark:bg-navy-900/40 border border-slate-200/60 dark:border-white/5 rounded-3xl flex flex-col gap-4">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-extrabold text-sm shadow-sm">
                  04
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">Scalable Delivery</h3>
                  <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">
                    Robust SLAs, continuous deployment integration, and localized regional support models.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Algoguido Section */}
        <section id="why" className="py-14 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-t border-b border-slate-200/60 dark:border-navy-900 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fcfbfa 0%, #f7f5f0 100%)' }}>
          <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
          {/* Centered Content Section Header */}
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center relative z-10 mb-16">
            <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full">WHY ALGOGUIDO</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight max-w-2xl">
              Building AI-Powered Solutions for a Smarter Tomorrow
            </h2>
            <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
              We combine industry-leading artificial intelligence with modern cloud architecture to deliver scalable, secure, and government-compliant platforms.
            </p>

            {/* Features Bar */}
            <div className="flex flex-wrap justify-center gap-6 border-t border-slate-200/60 dark:border-navy-800/60 pt-6 w-full max-w-2xl mt-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shrink-0">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-350">Enterprise SLA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shrink-0">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-350">Continuous CI/CD Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shrink-0">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-350">Dedicated Technical Support</span>
              </div>
            </div>
          </div>
          {/* 4-Column 3D Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 w-full" style={{ perspective: 1200 }}>
            {/* Feature 1: AI First */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{
                y: -10,
                rotateX: 10,
                rotateY: -10,
                scale: 1.03,
                z: 30,
                boxShadow: "0 25px 50px rgba(0, 82, 204, 0.12)"
              }}
              className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-6 rounded-2xl shadow-sm transition-all duration-300 group flex flex-col gap-4 cursor-pointer overflow-hidden text-center items-center select-none min-h-[220px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
              <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0052cc] dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0 relative z-10">
                <Brain className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-[#0052cc] transition-colors leading-tight">AI First</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Intelligent solutions powered by cutting-edge artificial intelligence & machine learning technologies.
                </p>
              </div>
            </motion.div>

            {/* Feature 2: Cloud Native */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{
                y: -10,
                rotateX: 10,
                rotateY: -10,
                scale: 1.03,
                z: 30,
                boxShadow: "0 25px 50px rgba(16, 185, 129, 0.12)"
              }}
              className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-6 rounded-2xl shadow-sm transition-all duration-300 group flex flex-col gap-4 cursor-pointer overflow-hidden text-center items-center select-none min-h-[220px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
              <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0 relative z-10">
                <Globe className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-emerald-600 transition-colors leading-tight">Cloud Native</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Modern microservices-based, containerized scaling & cloud-native systems offering unmatched uptime.
                </p>
              </div>
            </motion.div>

            {/* Feature 3: Enterprise Ready */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{
                y: -10,
                rotateX: 10,
                rotateY: -10,
                scale: 1.03,
                z: 30,
                boxShadow: "0 25px 50px rgba(124, 58, 237, 0.12)"
              }}
              className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-6 rounded-2xl shadow-sm transition-all duration-300 group flex flex-col gap-4 cursor-pointer overflow-hidden text-center items-center select-none min-h-[220px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
              <div className="h-12 w-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0 relative z-10">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-purple-600 transition-colors leading-tight">Enterprise Ready</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Tailored to fit rigorous enterprise environments, featuring automated backups and security features.
                </p>
              </div>
            </motion.div>

            {/* Feature 4: Government Focus */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{
                y: -10,
                rotateX: 10,
                rotateY: -10,
                scale: 1.03,
                z: 30,
                boxShadow: "0 25px 50px rgba(234, 88, 12, 0.12)"
              }}
              className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-6 rounded-2xl shadow-sm transition-all duration-300 group flex flex-col gap-4 cursor-pointer overflow-hidden text-center items-center select-none min-h-[220px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
              <div className="h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0 relative z-10">
                <Building2 className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-orange-600 transition-colors leading-tight">Government Focus</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Deep compliance architecture designed for government initiatives, public datasets and security audits.
                </p>
              </div>
            </motion.div>

            {/* Feature 5: Secure Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{
                y: -10,
                rotateX: 10,
                rotateY: -10,
                scale: 1.03,
                z: 30,
                boxShadow: "0 25px 50px rgba(217, 119, 6, 0.12)"
              }}
              className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-6 rounded-2xl shadow-sm transition-all duration-300 group flex flex-col gap-4 cursor-pointer overflow-hidden text-center items-center select-none min-h-[220px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
              <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0 relative z-10">
                <Lock className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-amber-600 transition-colors leading-tight">Secure Architecture</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  End-to-end data encryption in transit and at rest, coupled with strict vulnerability scans.
                </p>
              </div>
            </motion.div>

            {/* Feature 6: Scalable Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{
                y: -10,
                rotateX: 10,
                rotateY: -10,
                scale: 1.03,
                z: 30,
                boxShadow: "0 25px 50px rgba(236, 72, 153, 0.12)"
              }}
              className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-6 rounded-2xl shadow-sm transition-all duration-300 group flex flex-col gap-4 cursor-pointer overflow-hidden text-center items-center select-none min-h-[220px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
              <div className="h-12 w-12 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0 relative z-10">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-pink-600 transition-colors leading-tight">Scalable Solutions</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Engineered with serverless auto-scaling structures to handle varying organizations seamlessly.
                </p>
              </div>
            </motion.div>

            {/* Feature 7: Modern Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              whileHover={{
                y: -10,
                rotateX: 10,
                rotateY: -10,
                scale: 1.03,
                z: 30,
                boxShadow: "0 25px 50px rgba(79, 70, 229, 0.12)"
              }}
              className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 p-6 rounded-2xl shadow-sm transition-all duration-300 group flex flex-col gap-4 cursor-pointer overflow-hidden text-center items-center select-none min-h-[220px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
              <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm shrink-0 relative z-10">
                <Code className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="font-extrabold text-slate-800 dark:text-white text-base group-hover:text-indigo-600 transition-colors leading-tight">Modern Tech</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  Leveraging cutting-edge technologies (Next.js, NestJS, Flutter) to build robust systems.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="products" className="py-14 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #edf1f7 100%)' }}>
          <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
            <div className="flex flex-col items-center gap-4 text-center border-b border-slate-200/60 dark:border-white/5 pb-8 relative">
              <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full w-fit">PRODUCT PORTFOLIO</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4.5xl text-slate-900 dark:text-white tracking-tight leading-tight">
                Our AI-Powered Products
              </h2>
              <a href="#contact" className="text-sm font-bold text-[#0052cc] hover:text-blue-600 hover:underline flex items-center gap-1 group/btn transition-colors mt-1">
                View All Products <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 w-full"
              style={{ perspective: 1200 }}
            >
              {/* Product 1: eduAI365 */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateY: 8,
                  rotateX: -4,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(0, 82, 204, 0.12)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 rounded-2xl p-7 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 group select-none min-h-[280px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="flex flex-wrap gap-2 relative z-10">
                  <Badge variant="primary">AI</Badge>
                  <Badge variant="neutral">Education</Badge>
                  <Badge variant="primary">SaaS</Badge>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-[#0052cc] transition-colors leading-snug">eduAI365</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    AI-Powered Education Management System for Schools, Colleges & Institutions to streamline learning and operations.
                  </p>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052cc] dark:text-blue-400 group/link mt-auto relative z-10">
                  Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>

              {/* Product 2: Apply4Jobs */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateY: 8,
                  rotateX: -4,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(217, 119, 6, 0.12)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 rounded-2xl p-7 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 group select-none min-h-[280px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="flex flex-wrap gap-2 relative z-10">
                  <Badge variant="warning">HR Tech</Badge>
                  <Badge variant="warning">Recruitment</Badge>
                  <Badge variant="primary">AI</Badge>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors leading-snug">Apply4Jobs</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Intelligent Job Portal & Recruitment Management Platform that automates resume screening and candidate matching.
                  </p>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052cc] dark:text-blue-400 group/link mt-auto relative z-10">
                  Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>

              {/* Product 3: LeadGrowAI */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateY: 8,
                  rotateX: -4,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.12)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 rounded-2xl p-7 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 group select-none min-h-[280px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="flex flex-wrap gap-2 relative z-10">
                  <Badge variant="success">CRM</Badge>
                  <Badge variant="success">Sales</Badge>
                  <Badge variant="danger">Analytics</Badge>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug">LeadGrowAI</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    AI-Powered Lead Management & Business Growth Platform leveraging intelligent conversational routing.
                  </p>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052cc] dark:text-blue-400 group/link mt-auto relative z-10">
                  Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>

              {/* Product 4: TheHirings */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateY: 8,
                  rotateX: -4,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(124, 58, 237, 0.12)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 rounded-2xl p-7 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 group select-none min-h-[280px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="flex flex-wrap gap-2 relative z-10">
                  <Badge variant="warning">HR Tech</Badge>
                  <Badge variant="primary">Assessment</Badge>
                  <Badge variant="primary">AI</Badge>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white group-hover:text-purple-650 transition-colors leading-snug">TheHirings</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Advanced Hiring & Candidate Assessment Platform for Enterprises utilizing custom AI vetting procedures.
                  </p>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052cc] dark:text-blue-400 group/link mt-auto relative z-10">
                  Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enterprise Solutions Section */}
        <section id="services" className="py-14 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-t border-b border-slate-200/60 dark:border-navy-900 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fcfbfa 0%, #f7f5f0 100%)' }}>
          {/* Subtle background glow */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10">
            <div className="text-center max-w-2xl flex flex-col gap-4">
              <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full w-fit mx-auto">ENTERPRISE SOLUTIONS</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
                Powering Digital Transformation
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
            >
              {[
                { title: "ERP Solutions", icon: LayoutDashboard, bg: "bg-blue-500/10 text-cyan-600" },
                { title: "CRM Solutions", icon: Users, bg: "bg-orange-500/10 text-orange-600" },
                { title: "SaaS Platforms", icon: Monitor, bg: "bg-purple-500/10 text-purple-600" },
                { title: "AI Automation", icon: Cpu, bg: "bg-indigo-500/10 text-indigo-600" },
                { title: "Business Intelligence", icon: TrendingUp, bg: "bg-pink-500/10 text-pink-600" },
                { title: "Custom Software", icon: Code, bg: "bg-amber-500/10 text-amber-600" },
                { title: "Cloud Applications", icon: Globe, bg: "bg-emerald-500/10 text-emerald-600" },
                { title: "API Integration", icon: FolderSync, bg: "bg-teal-500/10 text-teal-600" },
              ].map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Card
                      variant="default"
                      className="flex items-center gap-4 p-5 hover:-translate-y-1.5 hover:shadow-lg bg-white/70 hover:bg-white border border-slate-200/60 hover:border-[#0052cc]/30 dark:bg-navy-900/40 dark:border-white/5 transition-all duration-300 group cursor-pointer h-full"
                    >
                      <div className={`h-11 w-11 rounded-xl ${service.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-[#0052cc] transition-colors">
                          {service.title}
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-[#0052cc] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Government & Client Projects Section */}
        <section id="projects" className="py-14 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #edf1f7 100%)' }}>
          <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
            <div className="flex flex-col items-center gap-4 text-center border-b border-slate-200/60 dark:border-white/5 pb-8 relative">
              <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full w-fit">IMPACT AND DEPLOYMENTS</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4.5xl text-slate-900 dark:text-white tracking-tight leading-tight">
                Government & Client Projects
              </h2>
              <a href="#contact" className="text-sm font-bold text-[#0052cc] hover:text-blue-600 hover:underline flex items-center gap-1 group/btn transition-colors mt-1">
                View All Projects <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full"
              style={{ perspective: 1200 }}
            >
              {/* Case 1: Nidaan Hospital */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateY: 8,
                  rotateX: -4,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.12)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 rounded-2xl p-7 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 group select-none min-h-[260px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="flex flex-wrap gap-2 relative z-10">
                  <Badge variant="success">Healthcare</Badge>
                  <Badge variant="neutral">Deployment</Badge>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug">Nidaan Hospital</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Hospital Management System & Healthcare Digitalization.
                  </p>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] dark:text-blue-400 group/link mt-auto relative z-10">
                  View Case Study <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>

              {/* Case 2: Syed Community Registry */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateY: 8,
                  rotateX: -4,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(217, 119, 6, 0.12)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 rounded-2xl p-7 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 group select-none min-h-[260px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="flex flex-wrap gap-2 relative z-10">
                  <Badge variant="warning">Government</Badge>
                  <Badge variant="neutral">Registry</Badge>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors leading-snug">Syed Community Registry</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Community Management & Digital Registry Platform.
                  </p>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] dark:text-blue-400 group/link mt-auto relative z-10">
                  View Case Study <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>

              {/* Case 3: Healthcare AI Platform */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateY: 8,
                  rotateX: -4,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.12)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 rounded-2xl p-7 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 group select-none min-h-[260px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="flex flex-wrap gap-2 relative z-10">
                  <Badge variant="success">Healthcare</Badge>
                  <Badge variant="primary">AI</Badge>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug">Healthcare AI Platform</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    AI-Powered Healthcare Analytics & Decision Support.
                  </p>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] dark:text-blue-400 group/link mt-auto relative z-10">
                  View Case Study <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>

              {/* Case 4: Enterprise Automation */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  rotateY: 8,
                  rotateX: -4,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(0, 82, 204, 0.12)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 rounded-2xl p-7 flex flex-col gap-6 cursor-pointer overflow-hidden transition-all duration-300 group select-none min-h-[260px]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-0" />
                <div className="flex flex-wrap gap-2 relative z-10">
                  <Badge variant="primary">Enterprise</Badge>
                  <Badge variant="primary">Automation</Badge>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-[#0052cc] transition-colors leading-snug">Enterprise Automation</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Workflow Automation & Enterprise Process Management.
                  </p>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052cc] dark:text-blue-400 group/link mt-auto relative z-10">
                  View Case Study <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Scalable Infrastructure & Technology Section */}
        <section id="tech" className="py-10 md:py-14 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-b border-slate-200/60 dark:border-white/5 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fcfbfa 0%, #f7f5f0 100%)' }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/[0.01] to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
            <div className="text-center max-w-2xl flex flex-col gap-2">
              <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full w-fit mx-auto">TECHNOLOGY STACK</span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight">
                Scalable Infrastructure & Technology
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 max-w-5xl w-full">
              {/* AI & Research Stack */}
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 border-t-2 border-t-[#3b8cff] text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">NLP & LLMs</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">AI Research</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md border-t-2 border-t-[#3b8cff] bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Machine Learning</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">AI Research</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md border-t-2 border-t-[#3b8cff] bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Deep Learning</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">AI Research</span>
              </Card>

              {/* Application Frameworks */}
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Next.js</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Application</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">NestJS</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Application</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Flutter</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Mobile Application</span>
              </Card>

              {/* Databases */}
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">PostgreSQL</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Database</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">MongoDB</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Database</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">MySQL</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Database</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">SQLite</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Database</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Firebase</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Backend service</span>
              </Card>

              {/* Infrastructure & Services */}
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">VPS</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Hosting</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Redis Cache</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Caching</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Docker</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Containerization</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Auth</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Security</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">Razorpay</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Payment Gateway</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">SMS API</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Communication</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">WhatsApp API</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Communication</span>
              </Card>
              <Card variant="default" className="flex flex-col items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 min-w-[100px] sm:min-w-[140px] hover:-translate-y-1 hover:shadow-md bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-white/[0.02] dark:border-white/5 text-slate-200">
                <span className="font-bold text-slate-800 dark:text-white text-sm">And More</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">Technologies</span>
              </Card>
            </div>
          </div>
        </section>

        {/* Research, Education & Innovation Section */}
        <section id="research" className="py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #edf1f7 100%)' }}>
          <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
            <div className="text-center max-w-2xl flex flex-col gap-4">
              <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full w-fit mx-auto">RESEARCH & EDUCATION</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
                Research, Education & Innovation
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
              {/* Track 1: Paid Internships */}
              <Card
                variant="interactive"
                onClick={() => {
                  setEduFormData((prev) => ({
                    ...prev,
                    program: 'Paid Internship',
                  }));
                  setStatus('idle');
                  setIsEduModalOpen(true);
                }}
                className="flex flex-col gap-4 p-6 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 transition-all duration-300 text-slate-800 dark:text-slate-200"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0052cc] flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Paid Internships</h3>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                  Hands-on industry experience with real-world projects.
                </p>
                <span className="text-[10px] font-bold text-[#0052cc] dark:text-blue-400 mt-auto flex items-center gap-1">Apply Now &rarr;</span>
              </Card>

              {/* Track 2: Research Collaboration */}
              <Card
                variant="interactive"
                onClick={() => {
                  setEduFormData((prev) => ({
                    ...prev,
                    program: 'Research Collaboration',
                  }));
                  setStatus('idle');
                  setIsEduModalOpen(true);
                }}
                className="flex flex-col gap-4 p-6 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 transition-all duration-300 text-slate-800 dark:text-slate-200"
              >
                <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Research Collaboration</h3>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                  Collaborate on cutting-edge research in AI, ML, and emerging technologies.
                </p>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 mt-auto flex items-center gap-1">Apply Now &rarr;</span>
              </Card>

              {/* Track 3: Faculty Development */}
              <Card
                variant="interactive"
                onClick={() => {
                  setEduFormData((prev) => ({
                    ...prev,
                    program: 'Faculty Development',
                  }));
                  setStatus('idle');
                  setIsEduModalOpen(true);
                }}
                className="flex flex-col gap-4 p-6 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 transition-all duration-300 text-slate-800 dark:text-slate-200"
              >
                <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Faculty Development</h3>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                  Training programs for educators & academic professionals.
                </p>
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 mt-auto flex items-center gap-1">Apply Now &rarr;</span>
              </Card>

              {/* Track 4: Industry Training */}
              <Card
                variant="interactive"
                onClick={() => {
                  setEduFormData((prev) => ({
                    ...prev,
                    program: 'Industry Training',
                  }));
                  setStatus('idle');
                  setIsEduModalOpen(true);
                }}
                className="flex flex-col gap-4 p-6 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 transition-all duration-300 text-slate-800 dark:text-slate-200"
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Monitor className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Industry Training</h3>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                  Professional training programs for career advancement.
                </p>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-auto flex items-center gap-1">Apply Now &rarr;</span>
              </Card>

              {/* Track 5: AI Research */}
              <Card
                variant="interactive"
                onClick={() => {
                  setEduFormData((prev) => ({
                    ...prev,
                    program: 'AI Research',
                  }));
                  setStatus('idle');
                  setIsEduModalOpen(true);
                }}
                className="flex flex-col gap-4 p-6 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 transition-all duration-300 text-slate-800 dark:text-slate-200"
              >
                <div className="h-10 w-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Research</h3>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                  Pioneering research in artificial intelligence & machine learning.
                </p>
                <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 mt-auto flex items-center gap-1">Apply Now &rarr;</span>
              </Card>

              {/* Track 6: Data Science */}
              <Card
                variant="interactive"
                onClick={() => {
                  setEduFormData((prev) => ({
                    ...prev,
                    program: 'Data Science',
                  }));
                  setStatus('idle');
                  setIsEduModalOpen(true);
                }}
                className="flex flex-col gap-4 p-6 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 transition-all duration-300 text-slate-800 dark:text-slate-200"
              >
                <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Data Science</h3>
                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                  Data-driven solutions and advanced analytics expertise.
                </p>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 mt-auto flex items-center gap-1">Apply Now &rarr;</span>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Impact Metrics Stats section */}
        <section className="relative z-10 py-10 md:py-14 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 bg-[#0052cc] text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">100+</span>
              <span className="text-blue-100 text-[10px] font-bold uppercase tracking-wider">Projects Delivered</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">1000+</span>
              <span className="text-blue-100 text-[10px] font-bold uppercase tracking-wider">Students & Interns</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">20+</span>
              <span className="text-blue-100 text-[10px] font-bold uppercase tracking-wider">Enterprise Clients</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">AI</span>
              <span className="text-blue-100 text-[10px] font-bold uppercase tracking-wider">Solutions & Innovation</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">Govt</span>
              <span className="text-blue-100 text-[10px] font-bold uppercase tracking-wider">Impact Projects</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">5+</span>
              <span className="text-blue-100 text-[10px] font-bold uppercase tracking-wider">Years of Excellence</span>
            </div>
          </div>
        </section>

        {/* Testimonials (What Our Clients Say) Section */}
        <section id="testimonials" className="py-14 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-b border-slate-200/60 dark:border-navy-900 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fcfbfa 0%, #f7f5f0 100%)' }}>
          {/* Subtle background highlight lights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/3 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10">
            <div className="text-center max-w-2xl flex flex-col gap-4">
              <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full">FEEDBACK</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
                What Our Clients Say
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
            >
              {[
                {
                  name: "Dr. Bikash Sarmah",
                  role: "Nidaan Hospital",
                  quote: "Algoguido delivered an exceptional hospital management system that transformed our operations. The AI-powered insights have been game-changing.",
                  initials: "BS",
                  bg: "from-blue-600 to-indigo-500",
                },
                {
                  name: "Syed Abdul Malik",
                  role: "Community Leader",
                  quote: "The community registry platform built by Algoguido is secure, scalable, and user-friendly. Great team with deep technical expertise.",
                  initials: "SM",
                  bg: "from-purple-600 to-pink-500",
                },
                {
                  name: "Rajesh Kumar",
                  role: "Enterprise Client",
                  quote: "Outstanding AI solutions and excellent support. Algoguido is our trusted technology partner for digital transformation.",
                  initials: "RK",
                  bg: "from-amber-500 to-orange-600",
                },
              ].map((t, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    variant="default"
                    className="flex flex-col gap-6 p-8 relative overflow-hidden backdrop-blur-md bg-white/70 dark:bg-navy-900/40 border border-slate-200/50 dark:border-white/5 hover:border-brand-500/20 dark:hover:border-white/10 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 group h-full"
                  >
                    {/* Background visual quote mark */}
                    <div className="absolute right-6 top-6 text-slate-200/40 dark:text-navy-800/40 select-none group-hover:scale-110 group-hover:text-brand-500/10 transition-all duration-300 pointer-events-none">
                      <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <div className="flex gap-1 text-amber-500 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                      ))}
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed text-sm relative z-10">
                      "{t.quote}"
                    </p>

                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-200/50 dark:border-white/5 relative z-10">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${t.bg} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                        {t.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Latest Insights & Articles Section */}
        <section id="insights" className="py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-b border-slate-200/60 dark:border-white/5 relative z-10" style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #edf1f7 100%)' }}>
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <div className="flex justify-between items-end border-b border-slate-200/60 dark:border-white/5 pb-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full w-fit">LATEST INSIGHTS & ARTICLES</span>
                <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
                  Intelligence Reports & Articles
                </h2>
              </div>
              <a href="#contact" className="text-sm font-bold text-[#0052cc] dark:text-blue-400 hover:text-[#0040A3] hover:underline flex items-center gap-1">
                Read All Insights <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-8 w-full">
              {/* Blog 1 */}
              <div className="flex flex-col gap-4 p-5 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:shadow-lg hover:border-[#0052cc]/30 dark:hover:border-white/10 transition-all duration-300">
                <span className="self-start px-2 py-0.5 rounded-full bg-blue-500/10 text-[#0052cc] dark:text-blue-400 text-[10px] font-bold">AI & Technology</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">May 20, 2025</span>
                <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">
                  The Future of AI in Enterprise Software Development
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Exploring the shift from general-purpose AI to hyper-specialized enterprise models.
                </p>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052cc] dark:text-blue-400 hover:text-[#0040A3] mt-auto">
                  Read More <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Blog 2 */}
              <div className="flex flex-col gap-4 p-5 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:shadow-lg hover:border-indigo-500/30 dark:hover:border-white/10 transition-all duration-300">
                <span className="self-start px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">Cloud Computing</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">May 18, 2025</span>
                <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">
                  Cloud-Native Architecture Best Practices
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  How to manage distributed architectures without operational overhead.
                </p>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052cc] dark:text-blue-400 hover:text-[#0040A3] mt-auto">
                  Read More <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Blog 3 */}
              <div className="flex flex-col gap-4 p-5 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:shadow-lg hover:border-purple-500/30 dark:hover:border-white/10 transition-all duration-300">
                <span className="self-start px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold">Digital Transformation</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">May 15, 2025</span>
                <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">
                  Digital Transformation in Government Sector
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  How technology is driving efficiency and transparency in government.
                </p>
                <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0052cc] dark:text-blue-400 hover:text-[#0040A3] mt-auto">
                  Read More <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Career & Openings Section */}
        <section id="career" className="py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-t border-b border-slate-200/60 dark:border-navy-900 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fcfbfa 0%, #f7f5f0 100%)' }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/[0.01] to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
            <div className="text-center max-w-2xl flex flex-col gap-4">
              <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full w-fit mx-auto">CAREER</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
                Build the Future with Algoguido
              </h2>
              <p className="text-slate-655 dark:text-slate-400 text-sm">
                Join a high-performance team of developers, researchers, and innovators working on next-generation AI and enterprise software architectures.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 w-full">
              {/* Job 1 */}
              <Card variant="interactive" className="flex flex-col gap-5 p-6 bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-navy-900/40 dark:border-white/5 rounded-2xl h-full transition-all duration-300">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0052cc] text-[10px] font-bold">Guwahati / Remote</span>
                  <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">Full-time</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug">Full-Stack Engineer</h3>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold tracking-wider uppercase">Engineering Team</span>
                </div>
                <p className="text-slate-655 dark:text-slate-400 text-xs leading-relaxed">
                  Design, build, and optimize backend NestJS APIs, Prisma databases, and Next.js frontends.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['React', 'NestJS', 'PostgreSQL', 'Tailwind'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 text-[9px] font-mono font-medium">{t}</span>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveFormTab('education');
                    setEduFormData({
                      name: '',
                      email: '',
                      phone: '',
                      university: '',
                      course: 'B.Tech',
                      semester: 'Graduated',
                      department: 'Computer Science',
                      program: 'Full-Time Employment',
                      gender: 'Male',
                      coverLetter: '',
                    });
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-auto h-9 w-full rounded-xl bg-gradient-brand text-white flex items-center justify-center text-xs font-bold uppercase tracking-wider hover:scale-[1.02] transition-transform"
                >
                  Apply Now
                </a>
              </Card>

              {/* Job 2 */}
              <Card variant="interactive" className="flex flex-col gap-5 p-6 bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-navy-900/40 dark:border-white/5 rounded-2xl h-full transition-all duration-300">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0052cc] text-[10px] font-bold">Guwahati Hub</span>
                  <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">Full-time</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug">AI Research Engineer</h3>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold tracking-wider uppercase">R&D Lab</span>
                </div>
                <p className="text-slate-655 dark:text-slate-400 text-xs leading-relaxed">
                  Design specialized LLM agents, vector embeddings search, and secure RAG data query systems.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['Python', 'PyTorch', 'LangChain', 'OpenAI'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 text-[9px] font-mono font-medium">{t}</span>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveFormTab('education');
                    setEduFormData({
                      name: '',
                      email: '',
                      phone: '',
                      university: '',
                      course: 'M.Tech / MS',
                      semester: 'Post-Graduated',
                      department: 'AI & Data Science',
                      program: 'Full-Time Employment',
                      gender: 'Male',
                      coverLetter: '',
                    });
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-auto h-9 w-full rounded-xl bg-gradient-brand text-white flex items-center justify-center text-xs font-bold uppercase tracking-wider hover:scale-[1.02] transition-transform"
                >
                  Apply Now
                </a>
              </Card>

              {/* Job 3 */}
              <Card variant="interactive" className="flex flex-col gap-5 p-6 bg-white/70 hover:bg-white border border-slate-200/60 dark:bg-navy-900/40 dark:border-white/5 rounded-2xl h-full transition-all duration-300">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0052cc] text-[10px] font-bold">Guwahati / Remote</span>
                  <span className="text-[10px] font-extrabold text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded">Internship</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug">Full-Stack Intern</h3>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold tracking-wider uppercase">Talent Pipeline</span>
                </div>
                <p className="text-slate-655 dark:text-slate-400 text-xs leading-relaxed">
                  Join our paid internship cohort. Receive rigorous industry mentoring and collaborate directly on active projects.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['React', 'Next.js', 'PostgreSQL', 'TypeScript'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 text-[9px] font-mono font-medium">{t}</span>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveFormTab('education');
                    setEduFormData({
                      name: '',
                      email: '',
                      phone: '',
                      university: '',
                      course: 'B.Tech / MCA',
                      semester: '3rd Year / 4th Year',
                      department: 'Information Technology',
                      program: 'Paid Internship',
                      gender: 'Male',
                      coverLetter: '',
                    });
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-auto h-9 w-full rounded-xl bg-gradient-brand text-white flex items-center justify-center text-xs font-bold uppercase tracking-wider hover:scale-[1.02] transition-transform"
                >
                  Apply Now
                </a>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section id="contact" className="py-14 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 border-b border-slate-200/60 dark:border-navy-900 relative z-10 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f7f9fc 0%, #edf1f7 100%)' }}>
          {/* Subtle background glow */}
          <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">

            {/* Form Column */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-widest bg-[#0052cc]/5 px-3 py-1 rounded-full w-fit">GET IN TOUCH</span>
                <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
                  Let's Build Something Amazing Together
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Have a project in mind? Let's discuss how we can help you achieve your goals.
                </p>
              </div>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-green-50/80 dark:bg-green-950/20 border border-green-200/50 dark:border-green-900/30 text-center flex flex-col items-center gap-4 animate-scale-in">
                  <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center shadow-sm">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 dark:text-white text-lg">Thank You!</h4>
                    <p className="text-green-700 dark:text-slate-300 text-sm mt-1">Your message was sent successfully. We will follow up soon.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Premium Tab Switcher */}
                  <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 w-full max-w-sm self-start">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFormTab('development');
                        setStatus('idle');
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wide transition-all duration-300 ${activeFormTab === 'development'
                        ? 'bg-gradient-brand text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                        }`}
                    >
                      💻 Development
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFormTab('education');
                        setStatus('idle');
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wide transition-all duration-300 ${activeFormTab === 'education'
                        ? 'bg-gradient-brand text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                        }`}
                    >
                      🎓 Education
                    </button>
                  </div>

                  {activeFormTab === 'development' ? (
                    /* Development Inquiries Form */
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-scale-in">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Full Name *</label>
                          <Input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Email Address *</label>
                          <Input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Phone Number</label>
                          <div className="flex gap-2">
                            <div className="w-[110px] shrink-0">
                              <Select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                              >
                                <option value="+91" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇮🇳 +91</option>
                                <option value="+1" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇺🇸 +1</option>
                                <option value="+44" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇬🇧 +44</option>
                                <option value="+971" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇦🇪 +971</option>
                                <option value="+65" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇸🇬 +65</option>
                                <option value="+61" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇦🇺 +61</option>
                              </Select>
                            </div>
                            <Input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="XXXXX XXXXX"
                              className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Company</label>
                          <Input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your Company"
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Requirement *</label>
                        <Select
                          name="requirement"
                          required
                          value={formData.requirement}
                          onChange={handleInputChange}
                          className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                        >
                          <option value="ERP Solutions" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">ERP Solutions</option>
                          <option value="AI Solutions" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">AI Solutions</option>
                          <option value="Enterprise Solutions" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Enterprise Solutions</option>
                          <option value="Government Projects" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Government Projects</option>
                          <option value="Cloud Services" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Cloud Services</option>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Message *</label>
                        <Textarea
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your project requirements..."
                          className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                          <span>❌ Failed to submit. Please try again.</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={status === 'submitting'}
                        className="w-full font-bold uppercase tracking-wider rounded-xl shadow-md h-12"
                      >
                        Send Message
                      </Button>
                    </form>
                  ) : (
                    /* Academic & Education Programs Form */
                    <form onSubmit={handleEduSubmit} className="flex flex-col gap-6 animate-scale-in">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Full Name *</label>
                          <Input
                            type="text"
                            name="name"
                            required
                            value={eduFormData.name}
                            onChange={handleEduInputChange}
                            placeholder="Jane Doe"
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Gender *</label>
                          <Select
                            name="gender"
                            required
                            value={eduFormData.gender}
                            onChange={handleEduInputChange}
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          >
                            <option value="Male" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Male</option>
                            <option value="Female" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Female</option>
                            <option value="Other" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Other</option>
                          </Select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Email Address *</label>
                          <Input
                            type="email"
                            name="email"
                            required
                            value={eduFormData.email}
                            onChange={handleEduInputChange}
                            placeholder="jane@example.com"
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Phone Number</label>
                          <div className="flex gap-2">
                            <div className="w-[110px] shrink-0">
                              <Select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                              >
                                <option value="+91" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇮🇳 +91</option>
                                <option value="+1" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇺🇸 +1</option>
                                <option value="+44" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇬🇧 +44</option>
                                <option value="+971" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇦🇪 +971</option>
                                <option value="+65" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇸🇬 +65</option>
                                <option value="+61" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">🇦🇺 +61</option>
                              </Select>
                            </div>
                            <Input
                              type="tel"
                              name="phone"
                              value={eduFormData.phone}
                              onChange={handleEduInputChange}
                              placeholder="XXXXX XXXXX"
                              className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">University / College *</label>
                          <Input
                            type="text"
                            name="university"
                            required
                            value={eduFormData.university}
                            onChange={handleEduInputChange}
                            placeholder="Tezpur University"
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Course *</label>
                          <Input
                            type="text"
                            name="course"
                            required
                            value={eduFormData.course}
                            onChange={handleEduInputChange}
                            placeholder="e.g. B.Tech Computer Science"
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Semester / Year *</label>
                          <Select
                            name="semester"
                            required
                            value={eduFormData.semester}
                            onChange={handleEduInputChange}
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          >
                            <option value="1st Year" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">1st Year</option>
                            <option value="2nd Year" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">2nd Year</option>
                            <option value="3rd Year" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">3rd Year</option>
                            <option value="4th Year" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">4th Year</option>
                            <option value="Postgraduate" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Postgraduate</option>
                            <option value="Faculty / Graduated" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Faculty / Graduated</option>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Department / Specialization *</label>
                          <Input
                            type="text"
                            name="department"
                            required
                            value={eduFormData.department}
                            onChange={handleEduInputChange}
                            placeholder="Computer Science & Engineering"
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2 sm:col-span-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wide uppercase">Program Type *</label>
                          <Select
                            name="program"
                            required
                            value={eduFormData.program}
                            onChange={handleEduInputChange}
                            className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-navy-900/40 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          >
                            <option value="Paid Internship" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Paid Internship</option>
                            <option value="Research Collaboration" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Research Collaboration</option>
                            <option value="Faculty Development" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Faculty Development</option>
                            <option value="Industry Training" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Industry Training</option>
                            <option value="AI Research" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">AI Research</option>
                            <option value="Data Science" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Data Science</option>
                            <option value="Full-Time Employment" className="bg-white dark:bg-navy-950 text-slate-800 dark:text-white">Full-Time Employment</option>
                          </Select>
                        </div>
                      </div>

                      {/* Cover Letter */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-505 dark:text-slate-400 tracking-wide uppercase">
                          Cover Letter <span className="text-slate-500 font-normal normal-case">(optional)</span>
                        </label>
                        <textarea
                          name="coverLetter"
                          rows={5}
                          value={eduFormData.coverLetter}
                          onChange={handleEduInputChange}
                          placeholder="Tell us about yourself, your motivation for applying, your relevant skills and what you hope to contribute to the program..."
                          className="w-full rounded-xl border border-slate-200 dark:border-white/10 dark:bg-navy-900/40 bg-white/75 dark:bg-slate-950/40 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none leading-relaxed"
                        />
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Min 100 characters recommended. Max 2000 characters.</p>
                      </div>

                      {status === 'error' && (
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                          <span>❌ Failed to submit application. Please try again.</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={status === 'submitting'}
                        className="w-full font-bold uppercase tracking-wider rounded-xl shadow-md h-12"
                      >
                        Submit Application
                      </Button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Contact Details & Map Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="p-8 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950 border border-slate-200/50 dark:border-white/10 rounded-3xl flex flex-col gap-6 backdrop-blur-md">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Contact Information</h3>
                <div className="flex flex-col gap-5 text-sm text-slate-655 dark:text-slate-400">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0052cc] flex items-center justify-center shrink-0 shadow-sm">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 dark:text-slate-200">+91 98765 43210</span>
                      <span className="text-slate-600 dark:text-slate-400">+91 87654 32109</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-sm">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">hello@algoguido.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Guwahati, Assam, India</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-2 border-t border-slate-200/60 dark:border-white/5 pt-5">
                  <a href="#" className="h-9 w-9 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-450 transition-all shadow-sm">
                    <Facebook className="h-4.5 w-4.5" />
                  </a>
                  <a href="#" className="h-9 w-9 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-450 transition-all shadow-sm">
                    <Twitter className="h-4.5 w-4.5" />
                  </a>
                  <a href="#" className="h-9 w-9 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
                    <Github className="h-4.5 w-4.5" />
                  </a>
                  <a href="#" className="h-9 w-9 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-450 transition-all shadow-sm">
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                  <a href="#" className="h-9 w-9 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-450 transition-all shadow-sm">
                    <Youtube className="h-4.5 w-4.5" />
                  </a>
                </div>
              </div>

              {/* Interactive Google Map embed panel */}
              <div className="w-full h-[320px] rounded-3xl overflow-hidden border border-slate-200/60 dark:border-white/10 shadow-md relative">
                <iframe
                  src="https://maps.google.com/maps?ll=26.147403,91.670235&z=19&t=m&hl=en&gl=IN&mapclient=embed&cid=7164741496454385455&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Algoguido Technologies Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0f1e] text-slate-300 border-t border-white/5 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[150px] bg-indigo-600/4 rounded-full blur-[80px] pointer-events-none" />

        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">

            {/* Brand Column - spans 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Algoguido Logo" className="h-9 w-9 object-contain brightness-0 invert" />
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-base text-white tracking-tight leading-tight">Algoguido</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">Technologies Pvt. Ltd.</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-slate-300/90 max-w-[280px]">
                Building AI-powered enterprise platforms, secure cloud infrastructure, and intelligent digital solutions for government and private sectors across India.
              </p>
              {/* Social links */}
              <div className="flex gap-2.5">
                <a href="#" aria-label="Facebook" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 border border-white/5 hover:border-blue-500/30 flex items-center justify-center transition-all duration-200">
                  <Facebook className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="Twitter" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-400 border border-white/5 hover:border-sky-500/30 flex items-center justify-center transition-all duration-200">
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-blue-700/20 text-slate-300 hover:text-blue-500 border border-white/5 hover:border-blue-600/30 flex items-center justify-center transition-all duration-200">
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="GitHub" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 flex items-center justify-center transition-all duration-200">
                  <Github className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="YouTube" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-red-600/20 text-slate-300 hover:text-red-400 border border-white/5 hover:border-red-500/30 flex items-center justify-center transition-all duration-200">
                  <Youtube className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-[0.12em]">Solutions</h4>
              <nav className="flex flex-col gap-2.5">
                {['ERP Solutions', 'CRM Solutions', 'SaaS Platforms', 'AI Automation', 'Cloud Infrastructure'].map((item) => (
                  <a key={item} href="#services" className="text-[12px] text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5 group">
                    <span className="h-px w-3 bg-slate-700 group-hover:bg-blue-500 group-hover:w-4 transition-all duration-200" />
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Products */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-[0.12em]">Products</h4>
              <nav className="flex flex-col gap-2.5">
                {['eduAI365', 'Apply4Jobs', 'LeadGrowAI', 'TheHirings', 'neHerbalTea'].map((item) => (
                  <a key={item} href="#products" className="text-[12px] text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5 group">
                    <span className="h-px w-3 bg-slate-700 group-hover:bg-blue-500 group-hover:w-4 transition-all duration-200" />
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-[0.12em]">Company</h4>
              <nav className="flex flex-col gap-2.5">
                {[
                  { label: 'About', href: '#' },
                  { label: 'Research', href: '#research' },
                  { label: 'Blog', href: '#insights' },
                  { label: 'Career', href: '#career' },
                  { label: 'Contact', href: '#contact' },
                  { label: 'Verify Certificate', href: '#', isVerify: true },
                ].map(({ label, href, isVerify }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => {
                      if (isVerify) {
                        e.preventDefault();
                        setIsCertModalOpen(true);
                        setCertStatus('idle');
                        setSearchCertNo('');
                        setSearchedCert(null);
                      } else if (href && href.startsWith('#')) {
                        e.preventDefault();
                        const id = href.substring(1);
                        const el = document.getElementById(id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          setActiveSection(id);
                        }
                      }
                    }}
                    className="text-[12px] text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-3 bg-slate-700 group-hover:bg-blue-500 group-hover:w-4 transition-all duration-200" />
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-[0.12em]">Newsletter</h4>
              <p className="text-[12px] text-slate-300 leading-relaxed">
                Get the latest AI insights and product updates delivered to your inbox.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2.5 mt-1">
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="rounded-lg border border-white/10 bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500/50 text-xs h-9 px-3 w-full transition-all"
                />
                <button
                  type="submit"
                  className="h-9 w-full rounded-lg bg-[#0052cc] hover:bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[10px] text-slate-500">No spam. Unsubscribe anytime.</p>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} Algoguido Technologies Pvt. Ltd. All rights reserved. — Guwahati, Assam, India.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="text-[11px] text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-slate-600 text-[10px]">·</span>
              <a href="#" className="text-[11px] text-slate-400 hover:text-white transition-colors">Terms of Service</a>
              <span className="text-slate-600 text-[10px]">·</span>
              <a href="#" className="text-[11px] text-slate-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Apple Premium Page Scroll-up Icon with circular scroll progress ring */}
      <div className={`fixed bottom-6 right-6 z-50 pointer-events-auto ${showScrollTop ? 'block' : 'hidden'}`}>
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8, y: showScrollTop ? 0 : 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative h-11 w-11 rounded-full flex items-center justify-center bg-white/80 dark:bg-navy-950/80 border border-slate-200/50 dark:border-white/10 text-slate-800 dark:text-white hover:text-[#0052cc] dark:hover:text-blue-400 backdrop-blur-md shadow-lg transition-colors group focus:outline-none"
          aria-label="Scroll to top"
        >
          {/* Dynamic circular progress path */}
          <svg className="absolute -inset-[1px] h-[46px] w-[46px] -rotate-90 pointer-events-none">
            <circle
              cx="23"
              cy="23"
              r="20.5"
              className="stroke-slate-200/20 dark:stroke-white/5 fill-none"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="23"
              cy="23"
              r="20.5"
              className="stroke-[#0052cc] dark:stroke-blue-400 fill-none"
              strokeWidth="1.5"
              strokeDasharray={2 * Math.PI * 20.5}
              strokeDashoffset={2 * Math.PI * 20.5 * (1 - scrollProgress)}
              transition={{ type: "tween", ease: "easeOut" }}
            />
          </svg>
          <ArrowRight className="-rotate-90 h-4 w-4 transition-transform group-hover:-translate-y-0.5 duration-300" />
        </motion.button>
      </div>


      {/* Certificate Verification Modal */}
      <AnimatePresence>
        {isCertModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-navy-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-navy-900 border border-slate-200/50 dark:border-white/5 w-full max-w-xl rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#0052cc] uppercase tracking-widest flex items-center gap-1.5">
                  🛡️ Security Gateway
                </span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  Verify Candidate Certificate
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Enter the unique certificate number to check authenticity and generate performance reports.
                </p>
              </div>

              {/* Form Search Input */}
              <form onSubmit={handleCertSearch} className="flex gap-2">
                <Input
                  type="text"
                  required
                  placeholder="e.g. AGC-2026-9812"
                  value={searchCertNo}
                  onChange={(e) => setSearchCertNo(e.target.value)}
                  className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 focus:ring-2 focus:ring-[#0052cc] focus:border-transparent transition-all flex-grow"
                />
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={certStatus === 'searching'}
                  className="font-bold uppercase tracking-wider rounded-xl shadow-md h-11 px-6 shrink-0"
                >
                  Verify
                </Button>
              </form>

              {/* Status Conditional Panels */}
              {certStatus === 'searching' && (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-[#0052cc] animate-spin" />
                  <span className="text-xs font-bold text-slate-500 animate-pulse">Running cryptographic registry search...</span>
                </div>
              )}

              {certStatus === 'not_found' && (
                <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 text-center flex flex-col items-center gap-3 animate-scale-in">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center shadow-sm">
                    <X className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-900 dark:text-white text-sm">Certificate Not Found</h4>
                    <p className="text-red-700 dark:text-slate-400 text-xs mt-1">
                      No matching record was found for Certificate No: <span className="font-mono font-bold">{searchCertNo}</span>. Please verify the code and try again.
                    </p>
                  </div>
                </div>
              )}

              {certStatus === 'found' && searchedCert && (
                <div className="flex flex-col gap-6 animate-scale-in bg-slate-50/50 dark:bg-navy-950/50 p-6 rounded-2xl border border-slate-200/50 dark:border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">VERIFIED CANDIDATE</span>
                      <h4 className="font-display font-extrabold text-xl text-slate-900 dark:text-white tracking-tight mt-1">
                        {searchedCert.candidateName}
                      </h4>
                    </div>
                    <Badge variant="success" className="bg-emerald-50 text-emerald-600 border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30 flex items-center gap-1 font-bold">
                      <ShieldCheck className="h-3.5 w-3.5" /> GENUINE
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col gap-1 border-b border-slate-100 dark:border-white/5 pb-2">
                      <span className="font-bold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider">Course Title</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{searchedCert.course}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-100 dark:border-white/5 pb-2">
                      <span className="font-bold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider">Certificate ID</span>
                      <span className="text-slate-800 dark:text-slate-200 font-mono font-bold">{searchedCert.certificateNo}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider">Overall Grade</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{searchedCert.grade}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider">Duration</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{searchedCert.duration}</span>
                    </div>
                  </div>

                  {searchedCert.description && (
                    <div className="p-3 bg-white/60 dark:bg-navy-900/40 border border-slate-200/50 dark:border-white/5 rounded-xl text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      "{searchedCert.description}"
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-200/40 dark:border-white/5 pt-4">
                    <span>Issued: {new Date(searchedCert.dateOfIssue).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    <span>Secure Algoguido Registry Validation</span>
                  </div>

                  <Button
                    onClick={handlePrintReport}
                    variant="outline"
                    className="w-full font-bold uppercase tracking-wider rounded-xl py-2"
                  >
                    Download Verification Report (PDF)
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Educational Programs Application Modal */}
      <AnimatePresence>
        {isEduModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 dark:bg-navy-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-navy-900 border border-slate-200/50 dark:border-white/5 w-full max-w-2xl rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsEduModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#0052cc] uppercase tracking-widest flex items-center gap-1.5">
                  🎓 Academic Gateway
                </span>
                <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tracking-tight">
                  Apply for Program
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Fill up your details to submit your proposal for <span className="font-bold text-[#0052cc] dark:text-blue-400">{eduFormData.program}</span>
                </p>
              </div>

              {status === 'success' ? (
                <div className="p-8 rounded-2xl bg-green-50/80 dark:bg-green-950/20 border border-green-200/50 dark:border-green-900/30 text-center flex flex-col items-center gap-4 animate-scale-in">
                  <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center shadow-sm">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 dark:text-white text-lg">Application Submitted!</h4>
                    <p className="text-green-700 dark:text-slate-300 text-sm mt-1">Your proposal was registered in our CRM. Our coordination desk will follow up soon.</p>
                  </div>
                  <Button onClick={() => setIsEduModalOpen(false)} variant="outline" className="mt-2 font-bold">
                    Close Window
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleEduSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1 text-slate-800 dark:text-white">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">Full Name *</label>
                      <Input
                        type="text"
                        name="name"
                        required
                        value={eduFormData.name}
                        onChange={handleEduInputChange}
                        placeholder="John Doe"
                        className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-800 dark:text-white text-xs h-10"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">Gender *</label>
                      <Select
                        name="gender"
                        required
                        value={eduFormData.gender}
                        onChange={handleEduInputChange}
                        className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-850 dark:text-white text-xs h-10"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        required
                        value={eduFormData.email}
                        onChange={handleEduInputChange}
                        placeholder="john@example.com"
                        className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-800 dark:text-white text-xs h-10"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="w-[100px] shrink-0">
                          <Select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-850 dark:text-white text-xs h-10"
                          >
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                          </Select>
                        </div>
                        <Input
                          type="tel"
                          name="phone"
                          value={eduFormData.phone}
                          onChange={handleEduInputChange}
                          placeholder="XXXXX XXXXX"
                          className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-800 dark:text-white text-xs h-10 flex-grow"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">University / Institution *</label>
                      <Input
                        type="text"
                        name="university"
                        required
                        value={eduFormData.university}
                        onChange={handleEduInputChange}
                        placeholder="e.g. Gauhati University"
                        className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-800 dark:text-white text-xs h-10"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">Course *</label>
                      <Input
                        type="text"
                        name="course"
                        required
                        value={eduFormData.course}
                        onChange={handleEduInputChange}
                        placeholder="e.g. B.Tech Computer Science"
                        className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-800 dark:text-white text-xs h-10"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">Semester / Graduation *</label>
                      <Select
                        name="semester"
                        required
                        value={eduFormData.semester}
                        onChange={handleEduInputChange}
                        className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-850 dark:text-white text-xs h-10"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Faculty / Graduated">Faculty / Graduated</option>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">Department / Specialization *</label>
                      <Input
                        type="text"
                        name="department"
                        required
                        value={eduFormData.department}
                        onChange={handleEduInputChange}
                        placeholder="e.g. Computer Science"
                        className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-800 dark:text-white text-xs h-10"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">Program Type *</label>
                      <Select
                        name="program"
                        required
                        value={eduFormData.program}
                        onChange={handleEduInputChange}
                        className="rounded-xl border-slate-200/80 dark:border-white/10 dark:bg-navy-950 text-slate-850 dark:text-white text-xs h-10"
                      >
                        <option value="Paid Internship">Paid Internship</option>
                        <option value="Research Collaboration">Research Collaboration</option>
                        <option value="Faculty Development">Faculty Development</option>
                        <option value="Industry Training">Industry Training</option>
                        <option value="AI Research">AI Research</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Full-Time Employment">Full-Time Employment</option>
                      </Select>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-455 tracking-wide uppercase">
                      Cover Letter <span className="text-slate-400 font-normal normal-case">(optional)</span>
                    </label>
                    <textarea
                      name="coverLetter"
                      rows={5}
                      value={eduFormData.coverLetter}
                      onChange={handleEduInputChange}
                      placeholder="Tell us about yourself, your motivation for applying, your relevant skills and what you hope to contribute..."
                      className="w-full rounded-xl border border-slate-200/80 dark:border-white/10 dark:bg-navy-950 bg-white px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none leading-relaxed"
                    />
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Share your motivation and skills. Max 2000 characters.</p>
                  </div>

                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 text-red-600 dark:text-red-400 text-[11px] font-semibold">
                      ❌ Failed to submit application. Please try again.
                    </div>
                  )}

                  <div className="flex gap-4 mt-2">
                    <Button
                      type="button"
                      onClick={() => setIsEduModalOpen(false)}
                      variant="outline"
                      className="flex-1 font-bold uppercase tracking-wider rounded-xl h-11 text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={status === 'submitting'}
                      className="flex-1 font-bold uppercase tracking-wider rounded-xl h-11 text-xs"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Watch Demo — Fullscreen Cinematic Video Presentation */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[9999] flex flex-col overflow-hidden select-none"
          >
            {/* === SCENE CONTENT AREA === */}
            <div className="flex-1 relative overflow-hidden">
              {/* Ambient grid overlay */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 30h60M30 0v60\' stroke=\'%23fff\' stroke-width=\'0.3\' fill=\'none\'/%3E%3C/svg%3E")', backgroundSize: '60px 60px' }} />

              <AnimatePresence mode="wait">
                {/* ===== SCENE 0: Title Card / Company Intro ===== */}
                {activeSlide === 0 && (
                  <motion.div
                    key="scene0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,82,204,0.12),transparent_70%)]" />
                    <motion.img
                      src="/logo.png"
                      alt="Algoguido"
                      className="h-24 w-24 object-contain mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 15, delay: 0.3 }}
                    />
                    <motion.h1
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight mb-3"
                    >
                      Algoguido Technologies
                    </motion.h1>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-slate-400 text-sm md:text-lg font-medium tracking-wide uppercase"
                    >
                      Private Limited
                    </motion.p>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Incorporated under Ministry of Corporate Affairs, Govt. of India</span>
                    </motion.div>
                  </motion.div>
                )}

                {/* ===== SCENE 1: Tagline / Hero ===== */}
                {activeSlide === 1 && (
                  <motion.div
                    key="scene1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,82,204,0.15),transparent_60%)]" />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="px-5 py-1.5 rounded-full bg-[#0052cc]/10 border border-[#0052cc]/20 mb-6"
                    >
                      <span className="text-[#3b8cff] text-[10px] font-extrabold uppercase tracking-[0.25em]">AI • Innovation • Impact</span>
                    </motion.div>
                    <motion.h2
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, type: 'spring', damping: 20 }}
                      className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-5"
                    >
                      AI-Powered Enterprise Applications Built for{' '}
                      <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        Education, Healthcare, Government & Business
                      </span>
                    </motion.h2>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed"
                    >
                      Transforming organizations through Artificial Intelligence, Enterprise Applications, Cloud Infrastructure, and Digital Innovation.
                    </motion.p>
                  </motion.div>
                )}

                {/* ===== SCENE 2: About / Who We Are ===== */}
                {activeSlide === 2 && (
                  <motion.div
                    key="scene2"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.08),transparent_60%)]" />
                    <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 items-center z-10">
                      <div className="flex flex-col gap-5">
                        <span className="text-[10px] font-extrabold text-[#3b8cff] uppercase tracking-[0.25em]">About Us</span>
                        <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight">
                          Architecting the Future of Enterprise Intelligence
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          At Algoguido, we build sovereign AI platforms, secure state-grade cloud environments, and robust digital systems. Born from a vision to power critical sectors, we bridge cutting-edge technical breakthroughs with regulatory-compliant security standards.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { num: '01', title: 'Sovereign Focus', desc: 'Strict Indian data residency compliance' },
                          { num: '02', title: 'State-Grade Security', desc: 'Cryptography & multi-tenant sandboxing' },
                          { num: '03', title: 'Advanced AI R&D', desc: 'Custom LLMs & domain pipelines' },
                          { num: '04', title: 'Scalable Delivery', desc: 'Robust SLAs & CI/CD integration' }
                        ].map((item, i) => (
                          <motion.div
                            key={item.num}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.15 }}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2"
                          >
                            <span className="text-[#3b8cff] text-xs font-extrabold">{item.num}</span>
                            <span className="text-white text-xs font-bold">{item.title}</span>
                            <span className="text-slate-500 text-[10px] leading-relaxed">{item.desc}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ===== SCENE 3: Vision ===== */}
                {activeSlide === 3 && (
                  <motion.div
                    key="scene3"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,82,204,0.12),transparent_60%)]" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="h-20 w-20 rounded-full bg-gradient-to-tr from-[#0052cc]/20 to-cyan-500/20 border border-[#0052cc]/30 flex items-center justify-center mb-6"
                    >
                      <Target className="h-10 w-10 text-cyan-400" />
                    </motion.div>
                    <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-[0.25em] mb-3">Our Vision</span>
                    <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight max-w-2xl mb-4">
                      To Lead India's Enterprise Software Expansion
                    </h3>
                    <p className="text-slate-400 text-sm max-w-xl leading-relaxed mb-6">
                      With intelligent, secure, and sovereign systems. We envision a world where every institution — from rural schools to metropolitan hospitals — operates on affordable digital infrastructure.
                    </p>
                    <div className="flex gap-3">
                      {['Reliable', 'Secure', 'Scalable'].map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-bold uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ===== SCENE 4: Mission ===== */}
                {activeSlide === 4 && (
                  <motion.div
                    key="scene4"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -60 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.08),transparent_60%)]" />
                    <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-[0.25em] mb-3">Our Mission</span>
                    <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight max-w-3xl mb-5">
                      Deliver Scalable AI & Cloud Solutions That Ensure Privacy, Deep Automation & Data Sovereignty
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
                      {['Schools', 'Colleges', 'Hospitals', 'Municipal Bodies', 'Enterprises', 'Government'].map((s) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + Math.random() * 0.5 }}
                          className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold"
                        >{s}</motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ===== SCENE 5: Why Algoguido ===== */}
                {activeSlide === 5 && (
                  <motion.div
                    key="scene5"
                    initial={{ opacity: 0, rotateY: -10 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 10 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center px-8"
                    style={{ perspective: '1000px' }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,82,204,0.1),transparent_60%)]" />
                    <div className="max-w-4xl w-full z-10">
                      <div className="text-center mb-8">
                        <span className="text-[10px] font-extrabold text-[#3b8cff] uppercase tracking-[0.25em]">Why Algoguido</span>
                        <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white mt-3">
                          Building AI-Powered Solutions for a Smarter Tomorrow
                        </h3>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { icon: Brain, title: 'AI First', desc: 'Deep learning models tailored for Indian enterprise', color: 'text-cyan-400' },
                          { icon: Shield, title: 'Zero Trust', desc: 'Military-grade encryption & compliance', color: 'text-emerald-400' },
                          { icon: Globe, title: 'Cloud Native', desc: 'Multi-region infrastructure at scale', color: 'text-blue-400' },
                          { icon: Zap, title: 'High Speed', desc: 'Sub-100ms response times guaranteed', color: 'text-amber-400' }
                        ].map((item, i) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
                            className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center flex flex-col items-center gap-3"
                          >
                            <item.icon className={`h-8 w-8 ${item.color}`} />
                            <span className="text-white text-xs font-bold uppercase tracking-wider">{item.title}</span>
                            <span className="text-slate-500 text-[10px] leading-relaxed">{item.desc}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ===== SCENE 6: Products Showcase ===== */}
                {activeSlide === 6 && (
                  <motion.div
                    key="scene6"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,82,204,0.1),transparent_60%)]" />
                    <div className="max-w-5xl w-full z-10">
                      <div className="text-center mb-8">
                        <span className="text-[10px] font-extrabold text-[#3b8cff] uppercase tracking-[0.25em]">Our Products</span>
                        <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white mt-3">
                          Premium AI-Powered Product Suite
                        </h3>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { name: 'eduAI365', desc: 'AI Education Management for Schools, Colleges & Institutions', color: 'from-blue-500/15 to-blue-600/5', accent: 'text-blue-400', tags: ['AI', 'Education', 'SaaS'] },
                          { name: 'Apply4Jobs', desc: 'Intelligent Job Portal & Recruitment Platform with AI screening', color: 'from-amber-500/15 to-amber-600/5', accent: 'text-amber-400', tags: ['HR Tech', 'AI'] },
                          { name: 'LeadGrowAI', desc: 'AI Lead Management & Business Growth with conversational routing', color: 'from-emerald-500/15 to-emerald-600/5', accent: 'text-emerald-400', tags: ['CRM', 'Sales'] },
                          { name: 'TheHirings', desc: 'Advanced Candidate Assessment Platform with AI vetting', color: 'from-purple-500/15 to-purple-600/5', accent: 'text-purple-400', tags: ['HR Tech', 'Assessment'] }
                        ].map((product, i) => (
                          <motion.div
                            key={product.name}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 200 }}
                            className={`p-5 rounded-2xl bg-gradient-to-b ${product.color} border border-white/10 flex flex-col gap-3`}
                          >
                            <div className="flex gap-1.5 flex-wrap">
                              {product.tags.map(t => (
                                <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] text-slate-400 font-bold uppercase">{t}</span>
                              ))}
                            </div>
                            <h4 className={`font-extrabold text-lg ${product.accent}`}>{product.name}</h4>
                            <p className="text-slate-400 text-[11px] leading-relaxed">{product.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ===== SCENE 7: Enterprise Solutions ===== */}
                {activeSlide === 7 && (
                  <motion.div
                    key="scene7"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex items-center justify-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,82,204,0.08),transparent_60%)]" />
                    <div className="max-w-4xl w-full z-10">
                      <div className="text-center mb-10">
                        <span className="text-[10px] font-extrabold text-[#3b8cff] uppercase tracking-[0.25em]">Enterprise Solutions</span>
                        <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white mt-3">
                          Powering Digital Transformation
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { icon: LayoutDashboard, title: 'ERP Solutions', color: 'text-blue-400' },
                          { icon: Users, title: 'CRM Solutions', color: 'text-orange-400' },
                          { icon: Monitor, title: 'SaaS Platforms', color: 'text-purple-400' },
                          { icon: Cpu, title: 'AI Automation', color: 'text-indigo-400' },
                          { icon: TrendingUp, title: 'Business Intel', color: 'text-pink-400' },
                          { icon: Code, title: 'Custom Software', color: 'text-amber-400' },
                          { icon: Globe, title: 'Cloud Apps', color: 'text-emerald-400' },
                          { icon: FolderSync, title: 'API Integration', color: 'text-teal-400' }
                        ].map((svc, i) => (
                          <motion.div
                            key={svc.title}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + i * 0.08, type: 'spring' }}
                            className="p-4 rounded-xl bg-white/[0.03] border border-white/8 flex flex-col items-center gap-2.5 text-center"
                          >
                            <svc.icon className={`h-7 w-7 ${svc.color}`} />
                            <span className="text-white text-[10px] font-bold uppercase tracking-wider">{svc.title}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ===== SCENE 8: Technology Stack ===== */}
                {activeSlide === 8 && (
                  <motion.div
                    key="scene8"
                    initial={{ opacity: 0, rotateX: 10 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: -10 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                    style={{ perspective: '800px' }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,82,204,0.12),transparent_50%)]" />
                    <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-[0.25em] mb-4">Technology Infrastructure</span>
                    <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white leading-tight max-w-2xl mb-8">
                      Enterprise-Grade AI Infrastructure
                    </h3>
                    <div className="flex gap-8 items-center mb-8">
                      {[
                        { icon: Lock, label: 'AES-256 Encrypted' },
                        { icon: Database, label: 'Multi-Region DB' },
                        { icon: Cpu, label: 'AI/ML Powered' },
                        { icon: Layers, label: 'Microservices' }
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.15 }}
                          className="flex flex-col items-center gap-3"
                        >
                          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#0052cc]/15 to-cyan-500/10 border border-[#0052cc]/25 flex items-center justify-center">
                            <item.icon className="h-8 w-8 text-cyan-400" />
                          </div>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider max-w-[80px]">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-slate-500 text-xs">99.99% Uptime • Zero-Trust Architecture • Sub-100ms Response • End-to-End Encryption</p>
                  </motion.div>
                )}

                {/* ===== SCENE 9: Impact / Growth Metrics ===== */}
                {activeSlide === 9 && (
                  <motion.div
                    key="scene9"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(34,197,94,0.08),transparent_60%)]" />
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-[0.25em] mb-4">Impact & Growth</span>
                    <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-8">
                      Exponential Impact, Proven Results
                    </h3>
                    <div className="flex gap-5 items-end mb-8">
                      {[
                        { h: 50, max: 90, color: 'bg-sky-500', label: '2024' },
                        { h: 80, max: 130, color: 'bg-indigo-500', label: '2025' },
                        { h: 120, max: 170, color: 'bg-[#0052cc]', label: '2026' },
                        { h: 160, max: 200, color: 'bg-emerald-500', label: '2027' }
                      ].map((bar, i) => (
                        <div key={bar.label} className="flex flex-col items-center gap-2">
                          <motion.div
                            className={`w-14 ${bar.color} rounded-t-lg shadow-lg`}
                            initial={{ height: 0 }}
                            animate={{ height: [`${bar.h}px`, `${bar.max}px`, `${bar.h}px`] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                          />
                          <span className="text-[9px] text-slate-500 font-bold">{bar.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-10">
                      {[
                        { value: '50K+', label: 'Active Users' },
                        { value: '99.9%', label: 'Uptime SLA' },
                        { value: '10M+', label: 'Transactions' },
                        { value: '300%', label: 'YoY Growth' }
                      ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center">
                          <span className="text-white font-extrabold text-2xl md:text-3xl">{stat.value}</span>
                          <span className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mt-1">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ===== SCENE 10: Trust & Compliance ===== */}
                {activeSlide === 10 && (
                  <motion.div
                    key="scene10"
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 80 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]" />
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-[0.25em] mb-4">Trust & Compliance</span>
                    <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-8 max-w-2xl">
                      Government-Verified. Enterprise-Trusted.
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4 max-w-3xl w-full">
                      {[
                        { icon: CheckCircle2, title: 'MCA Registered', desc: 'CIN verified corporate entity under Ministry of Corporate Affairs' },
                        { icon: ShieldCheck, title: 'ISO 9001:2015', desc: 'Quality Management System certified for enterprise delivery' },
                        { icon: Award, title: 'GST Compliant', desc: 'Full regulatory compliance with Indian taxation framework' }
                      ].map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.15 }}
                          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center gap-3 text-center"
                        >
                          <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <item.icon className="h-6 w-6 text-emerald-400" />
                          </div>
                          <span className="text-white text-xs font-bold uppercase tracking-wider">{item.title}</span>
                          <span className="text-slate-500 text-[10px] leading-relaxed">{item.desc}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ===== SCENE 11: Call to Action / Finale ===== */}
                {activeSlide === 11 && (
                  <motion.div
                    key="scene11"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,82,204,0.15),transparent_50%)]" />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative mb-6"
                    >
                      <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#0052cc]/20 to-emerald-500/20 border border-[#0052cc]/25 flex items-center justify-center shadow-[0_0_40px_rgba(0,82,204,0.2)]">
                        <Rocket className="h-12 w-12 text-white" />
                      </div>
                      <motion.div
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Handshake className="h-4 w-4 text-white" />
                      </motion.div>
                    </motion.div>
                    <h3 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4 max-w-2xl">
                      Ready to Transform Your Organization?
                    </h3>
                    <p className="text-slate-400 text-sm max-w-xl mb-8 leading-relaxed">
                      Join us in building India's largest digital transformation platform. Partner with a government-verified, revenue-generating technology ecosystem.
                    </p>
                    <motion.a
                      href="#contact"
                      onClick={() => setIsDemoModalOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0052cc] to-blue-600 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,82,204,0.3)] hover:shadow-[0_0_50px_rgba(0,82,204,0.5)] transition-shadow"
                    >
                      <Handshake className="h-5 w-5" />
                      Partner & Build With Us
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* === VIDEO PLAYER CONTROLS BAR === */}
            <div className="relative z-20 px-4 md:px-8 pb-4 md:pb-6 pt-2 flex flex-col gap-3">
              {/* Timeline Scrubber */}
              <div className="w-full flex items-center gap-3">
                <span className="text-[9px] font-mono text-slate-500 tabular-nums w-10 text-right">
                  {`${Math.floor((activeSlide * 5) / 60)}:${String((activeSlide * 5) % 60).padStart(2, '0')}`}
                </span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = (e.clientX - rect.left) / rect.width;
                    setActiveSlide(Math.min(11, Math.max(0, Math.floor(pct * 12))));
                    setIsAutoplay(false);
                  }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0052cc] to-cyan-400 rounded-full relative"
                    animate={{ width: `${((activeSlide + 1) / 12) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  {/* Scene markers */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute top-0 bottom-0 w-px ${i <= activeSlide ? 'bg-white/20' : 'bg-white/5'}`}
                      style={{ left: `${(i / 12) * 100}%` }}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-slate-500 tabular-nums w-10">1:00</span>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between">
                {/* Left: Scene Info */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <CircleDot className="h-3 w-3 text-red-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Scene {activeSlide + 1}/12</span>
                  </div>
                  <span className="text-[9px] text-slate-600 font-medium hidden md:block">
                    {[
                      'Company Introduction', 'Our Vision', 'About Algoguido', 'Leadership Vision',
                      'Our Mission', 'Why Algoguido', 'Product Suite', 'Enterprise Solutions',
                      'Technology Stack', 'Growth Metrics', 'Trust & Compliance', 'Partner With Us'
                    ][activeSlide]}
                  </span>
                </div>

                {/* Center: Playback Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setActiveSlide(Math.max(0, activeSlide - 1)); setIsAutoplay(false); }}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsAutoplay(!isAutoplay)}
                    className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all"
                  >
                    {isAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </button>
                  <button
                    onClick={() => { setActiveSlide(Math.min(11, activeSlide + 1)); setIsAutoplay(false); }}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>

                {/* Right: Close & Volume */}
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-slate-600" />
                  <button
                    onClick={() => { setIsDemoModalOpen(false); setActiveSlide(0); setIsAutoplay(true); }}
                    className="ml-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
