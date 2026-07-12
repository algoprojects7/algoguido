'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion as originalMotion, AnimatePresence } from 'framer-motion';
const motion = originalMotion as any;
import {
  Navigation,
  ZoomIn,
  ZoomOut,
  Map as MapIcon,
  Search,
  Share2,
  Phone,
  Globe,
  Volume2,
  VolumeX,
  Play,
  Square,
  Compass as CompassIcon,
  Info,
  Route,
  Activity,
  Star
} from 'lucide-react';

// Define TS interfaces for our Map component
interface Point {
  x: number;
  y: number;
}

interface Step {
  text: string;
  distance: string;
  icon: string;
  triggerProgress: number; // Progress at which this instruction activates (0-1)
}

interface Landmark {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  description: string;
  rating?: number;
  reviews?: number;
}

export default function AppleMapsView() {
  // Map display settings
  const [mapStyle, setMapStyle] = useState<'standard' | 'satellite' | 'hybrid'>('standard');
  const [zoom, setZoom] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 });
  const [trafficActive, setTrafficActive] = useState<boolean>(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Routing and Navigation state
  const [activeRoute, setActiveRoute] = useState<'drive' | 'walk' | 'cycle'>('drive');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [navProgress, setNavProgress] = useState<number>(0);
  const [locatorPos, setLocatorPos] = useState<Point>({ x: 75, y: 40 });
  const [locatorAngle, setLocatorAngle] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>({
    id: 'algoguido',
    name: 'Algoguido Technologies Private Limited',
    type: 'AI-Driven Enterprise Technology Company',
    x: 600,
    y: 180,
    description: 'Corporate Headquarters. Custom AI platforms, enterprise software, and secure cloud operations.',
    rating: 4.8,
    reviews: 128
  });

  // References
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Define route paths coordinates
  // Drive route (Jalukbari bridge (End) -> AEC Road -> Sundarbari Chowk -> Govt Ayurvedic College -> Left Turn (Opposite Road) -> Pub Nizarapur Path -> Priyadarshini Hostel -> Majankari Tent House -> Left Turn -> Algoguido)
  const drivePathD = "M 75 40 L 70 160 L 70 260 L 70 280 L 240 280 L 350 280 L 480 280 L 480 180 L 600 180";
  
  // Walk route
  const walkPathD = "M 75 40 L 70 160 L 70 260 L 70 280 L 240 280 L 350 280 L 480 280 L 480 180 L 600 180";

  // Cycle route
  const cyclePathD = "M 75 40 L 70 160 L 70 260 L 70 280 L 240 280 L 350 280 L 480 280 L 480 180 L 600 180";

  // Select path string based on active route mode
  const getActivePathD = () => {
    if (activeRoute === 'walk') return walkPathD;
    if (activeRoute === 'cycle') return cyclePathD;
    return drivePathD;
  };

  // Define step directions
  const driveSteps: Step[] = [
    { text: "Start at the end of Jalukbari Bridge, head South on AEC Road", distance: "100m", icon: "straight", triggerProgress: 0 },
    { text: "Pass through Sundarbari Chowk (Kalpana Restaurant)", distance: "200m", icon: "straight", triggerProgress: 0.15 },
    { text: "Reaching Govt Ayurvedic College, take left turn that is the opposite road against Govt Ayurvedic College", distance: "150m", icon: "left", triggerProgress: 0.38 },
    { text: "Come straight towards Pub-Nizarapur Path and pass Priyadarshini Girls Hostel", distance: "220m", icon: "straight", triggerProgress: 0.58 },
    { text: "Take a left turn when you reach Majankari Tent House", distance: "80m", icon: "left", triggerProgress: 0.78 },
    { text: "Come straight to arrive at Algoguido Technologies Private Limited", distance: "0m", icon: "arrive", triggerProgress: 0.95 }
  ];

  const walkSteps: Step[] = [
    { text: "Walk South on AEC Road from Jalukbari Bridge End", distance: "100m", icon: "straight", triggerProgress: 0 },
    { text: "Pass through Sundarbari Chowk (Kalpana Restaurant)", distance: "200m", icon: "straight", triggerProgress: 0.15 },
    { text: "Turn left at the opposite road against Govt Ayurvedic College", distance: "150m", icon: "left", triggerProgress: 0.38 },
    { text: "Walk down Pub-Nizarapur Path past Priyadarshini Girls Hostel", distance: "220m", icon: "straight", triggerProgress: 0.58 },
    { text: "Turn left at Majankari Tent House and walk to Algoguido", distance: "0m", icon: "arrive", triggerProgress: 0.95 }
  ];

  const cycleSteps: Step[] = [
    { text: "Ride South from Jalukbari Bridge End on AEC Road", distance: "100m", icon: "straight", triggerProgress: 0 },
    { text: "Pass through Sundarbari Chowk (Kalpana Restaurant)", distance: "200m", icon: "straight", triggerProgress: 0.15 },
    { text: "At Govt Ayurvedic College, turn left onto the opposite road", distance: "150m", icon: "left", triggerProgress: 0.38 },
    { text: "Ride straight on Pub-Nizarapur Path past Priyadarshini Girls Hostel", distance: "220m", icon: "straight", triggerProgress: 0.58 },
    { text: "Turn left at Majankari Tent House", distance: "80m", icon: "left", triggerProgress: 0.78 },
    { text: "Arrive at Algoguido Technologies Private Limited", distance: "0m", icon: "arrive", triggerProgress: 0.95 }
  ];

  const getActiveSteps = (): Step[] => {
    if (activeRoute === 'walk') return walkSteps;
    if (activeRoute === 'cycle') return cycleSteps;
    return driveSteps;
  };

  // Get currently active step index based on progress
  const getCurrentStepIndex = () => {
    const steps = getActiveSteps();
    let activeIdx = 0;
    for (let i = 0; i < steps.length; i++) {
      if (navProgress >= steps[i].triggerProgress) {
        activeIdx = i;
      }
    }
    return activeIdx;
  };

  // Autocomplete Suggestions
  const landmarks: Landmark[] = [
    {
      id: 'algoguido',
      name: 'Algoguido Technologies Private Limited',
      type: 'AI-Driven Enterprise Technology Company',
      x: 600,
      y: 180,
      description: 'Corporate Headquarters. Custom AI platforms, enterprise software, and secure cloud operations.',
      rating: 4.8,
      reviews: 128
    },
    {
      id: 'jalukbari_bridge',
      name: 'Jalukbari Bridge (End)',
      type: 'Transit Node / Bridge',
      x: 75,
      y: 40,
      description: 'The end point of the Jalukbari Bridge, a primary entry highway junction connecting Guwahati.'
    },
    {
      id: 'sundarbari_chowk',
      name: 'Sundarbari Chowk (Kalpana Restaurant)',
      type: 'Local Chowk / Food Landmark',
      x: 70,
      y: 160,
      description: 'Busy local chowk intersection, famous for Kalpana Restaurant serving traditional Assamese cuisine.'
    },
    {
      id: 'govt_ayurvedic_college',
      name: 'Govt Ayurvedic College & Hospital',
      type: 'Educational Institution',
      x: 70,
      y: 260,
      description: 'Premier government Ayurvedic research institute and healthcare facility on AEC Road.'
    },
    {
      id: 'priyadarshini_hostel',
      name: 'Priyadarshini Girls Hostel',
      type: 'Student Residence',
      x: 350,
      y: 280,
      description: 'A prominent local student hostel located on Pub-Nizarapur Path.'
    },
    {
      id: 'majankari_tent_house',
      name: 'Majankari Tent House',
      type: 'Local Business / Chowk',
      x: 480,
      y: 280,
      description: 'Well-known local event supply service provider, marking the key turn towards our office.'
    },
    {
      id: 'sundarbari_park',
      name: 'Sundarbari Park & Lake',
      type: 'Recreational Park',
      x: 320,
      y: 330,
      description: 'Lush neighborhood park featuring walking trails, dense canopy, and a tranquil central pond.'
    }
  ];

  // Handle zooming
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // SVG Mouse handlers for dragging/panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isNavigating) return; // Disable pan during navigation
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isNavigating) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Run simulated navigation along the SVG path
  useEffect(() => {
    if (isNavigating) {
      const duration = activeRoute === 'walk' ? 12000 : activeRoute === 'cycle' ? 9000 : 7000; // ms
      let startTime: number | null = null;

      const animateLocator = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setNavProgress(progress);

        if (routePathRef.current) {
          const path = routePathRef.current;
          const totalLength = path.getTotalLength();
          const currentDist = progress * totalLength;
          
          // Get current point
          const pt = path.getPointAtLength(currentDist);
          setLocatorPos({ x: pt.x, y: pt.y });

          // Calculate angle/heading based on a slightly ahead point
          const nextDist = Math.min(currentDist + 2, totalLength);
          const nextPt = path.getPointAtLength(nextDist);
          
          if (nextDist > currentDist) {
            const angleRad = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x);
            const angleDeg = angleRad * (180 / Math.PI);
            setLocatorAngle(angleDeg);
          }
        }

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animateLocator);
        } else {
          setIsNavigating(false);
        }
      };

      animationFrameId.current = requestAnimationFrame(animateLocator);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      setNavProgress(0);
      // Reset locator back to start of active route
      if (routePathRef.current) {
        const pt = routePathRef.current.getPointAtLength(0);
        setLocatorPos({ x: pt.x, y: pt.y });
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isNavigating, activeRoute]);

  // Sync initial locator placement on route changes
  useEffect(() => {
    if (routePathRef.current && !isNavigating) {
      setTimeout(() => {
        if (routePathRef.current) {
          const pt = routePathRef.current.getPointAtLength(0);
          setLocatorPos({ x: pt.x, y: pt.y });
          
          const nextPt = routePathRef.current.getPointAtLength(3);
          const angleRad = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x);
          setLocatorAngle(angleRad * (180 / Math.PI));
        }
      }, 50);
    }
  }, [activeRoute]);

  // Handle typing search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setShowSearchDropdown(val.length > 0);
  };

  const selectLandmark = (lm: Landmark) => {
    setSelectedLandmark(lm);
    setSearchQuery(lm.name);
    setShowSearchDropdown(false);

    // Smoothly pan and zoom to the landmark position
    setZoom(1.5);
    setPanOffset({
      x: 400 - lm.x * 1.5,
      y: 250 - lm.y * 1.5
    });
  };

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6 h-auto min-h-[580px] text-slate-800 dark:text-slate-100 font-sans">
      
      {/* LEFT COLUMN: Floating Apple Maps Controls & Detail Cards */}
      <div className="w-full xl:w-[380px] shrink-0 flex flex-col gap-5">
        
        {/* Apple Maps glass search card */}
        <div className="relative bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl p-4 shadow-lg transition-all">
          <div className="flex items-center gap-3 bg-slate-100/70 dark:bg-navy-950/60 rounded-xl px-3.5 py-2.5 border border-slate-200/20 dark:border-white/5 shadow-inner">
            <Search className="h-4.5 w-4.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search for a place or address..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length > 0 && setShowSearchDropdown(true)}
              className="bg-transparent border-none outline-none w-full text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setShowSearchDropdown(false); }}
                className="text-[10px] font-bold bg-slate-200 dark:bg-navy-800 rounded-full h-5 w-5 flex items-center justify-center text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showSearchDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-xl shadow-2xl z-30 overflow-hidden max-h-[220px] overflow-y-auto"
              >
                {landmarks
                  .filter(lm => lm.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(lm => (
                    <button
                      key={lm.id}
                      onClick={() => selectLandmark(lm)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-navy-800/60 border-b border-slate-100 dark:border-white/5 flex items-start gap-3 transition-colors"
                    >
                      <MapIcon className="h-4 w-4 text-[#007aff] mt-0.5 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{lm.name}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{lm.type}</span>
                      </div>
                    </button>
                  ))}
                {landmarks.filter(lm => lm.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <div className="p-4 text-center text-xs text-slate-500">No results found</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected Landmark Details Card */}
        <AnimatePresence mode="wait">
          {selectedLandmark && (
            <motion.div
              key={selectedLandmark.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/85 dark:bg-navy-900/85 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-5 shadow-xl flex flex-col gap-4.5"
            >
              {/* Card Header */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#007aff] uppercase tracking-wider">{selectedLandmark.type}</span>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-[16px] leading-snug tracking-tight">{selectedLandmark.name}</h4>
                {selectedLandmark.rating && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-500" />
                      <span className="font-bold text-slate-800 dark:text-slate-200 ml-1">{selectedLandmark.rating}</span>
                    </div>
                    <span>•</span>
                    <span>({selectedLandmark.reviews} reviews)</span>
                  </div>
                )}
              </div>



              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {selectedLandmark.description}
              </p>

              {/* Navigation Action Panel */}
              <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => {
                    // Force map center, activate drive route, open steps
                    selectLandmark(landmarks[0]);
                  }}
                  className="flex flex-col items-center gap-1.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-800/50 transition-colors group"
                >
                  <div className="h-9 w-9 rounded-full bg-[#007aff] text-white flex items-center justify-center shadow-md shadow-[#007aff]/35 group-hover:scale-105 transition-transform">
                    <Navigation className="h-4.5 w-4.5 fill-white rotate-45" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-300">Directions</span>
                </button>

                <a
                  href="tel:+919876543210"
                  className="flex flex-col items-center gap-1.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-800/50 transition-colors group"
                >
                  <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-navy-800 text-[#007aff] dark:text-[#0a84ff] flex items-center justify-center border border-slate-200/50 dark:border-white/5 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-300">Call Us</span>
                </a>

                <a
                  href="https://algoguido.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-800/50 transition-colors group"
                >
                  <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-navy-800 text-[#007aff] dark:text-[#0a84ff] flex items-center justify-center border border-slate-200/50 dark:border-white/5 shadow-sm group-hover:scale-105 transition-transform">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-300">Website</span>
                </a>

                <button
                  onClick={() => alert('Address details copied to clipboard!')}
                  className="flex flex-col items-center gap-1.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-800/50 transition-colors group"
                >
                  <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-navy-800 text-[#007aff] dark:text-[#0a84ff] flex items-center justify-center border border-slate-200/50 dark:border-white/5 shadow-sm group-hover:scale-105 transition-transform">
                    <Share2 className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 dark:text-slate-300">Copy</span>
                </button>
              </div>

              {/* Route Direction steps */}
              <div className="flex flex-col gap-3.5 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Route className="h-4 w-4 text-[#30d158]" /> Suggested Routes
                  </span>
                  
                  {/* Traffic Switcher */}
                  <button
                    onClick={() => setTrafficActive(!trafficActive)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-wide uppercase transition-all ${
                      trafficActive 
                        ? 'bg-red-500/15 border border-red-500/30 text-red-500' 
                        : 'bg-slate-100 dark:bg-navy-800 border border-slate-200/50 dark:border-white/5 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Activity className="h-3 w-3" /> Live Traffic
                  </button>
                </div>

                {/* Transportation Tab selectors */}
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100/70 dark:bg-navy-950/60 p-1.5 rounded-2xl border border-slate-200/30 dark:border-white/5 shadow-inner">
                  <button
                    onClick={() => { setActiveRoute('drive'); if (isNavigating) setIsNavigating(false); }}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all ${
                      activeRoute === 'drive'
                        ? 'bg-white dark:bg-navy-800 shadow-md text-[#007aff] font-bold'
                        : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700'
                    }`}
                  >
                    <span className="text-[14px]">🚗</span>
                    <span className="text-[10px] mt-1 leading-none">Drive • 2m</span>
                  </button>
                  <button
                    onClick={() => { setActiveRoute('walk'); if (isNavigating) setIsNavigating(false); }}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all ${
                      activeRoute === 'walk'
                        ? 'bg-white dark:bg-navy-800 shadow-md text-[#30d158] font-bold'
                        : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700'
                    }`}
                  >
                    <span className="text-[14px]">🚶</span>
                    <span className="text-[10px] mt-1 leading-none">Walk • 5m</span>
                  </button>
                  <button
                    onClick={() => { setActiveRoute('cycle'); if (isNavigating) setIsNavigating(false); }}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all ${
                      activeRoute === 'cycle'
                        ? 'bg-white dark:bg-navy-800 shadow-md text-[#bf5af2] font-bold'
                        : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700'
                    }`}
                  >
                    <span className="text-[14px]">🚲</span>
                    <span className="text-[10px] mt-1 leading-none">Cycle • 3m</span>
                  </button>
                </div>

                {/* Step List wrapper */}
                <div className="max-h-[160px] overflow-y-auto pr-1 flex flex-col gap-2.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-navy-800">
                  {getActiveSteps().map((step, idx) => {
                    const isStepActive = isNavigating && getCurrentStepIndex() === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-start gap-3 p-2 rounded-xl transition-all ${
                          isStepActive 
                            ? 'bg-[#007aff]/10 border-l-[3px] border-[#007aff] dark:border-l-[3px]' 
                            : 'border-l-[3px] border-transparent hover:bg-slate-50 dark:hover:bg-navy-800/30'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-navy-800 border border-slate-200/50 dark:border-white/5 flex items-center justify-center shrink-0 mt-0.5">
                          {step.icon === 'right' && <span className="text-[9px]">↪️</span>}
                          {step.icon === 'left' && <span className="text-[9px]">↩️</span>}
                          {step.icon === 'straight' && <span className="text-[9px]">⬆️</span>}
                          {step.icon === 'arrive' && <span className="text-[9px]">📍</span>}
                        </div>
                        <div className="flex flex-col gap-0.5 w-full">
                          <span className={`text-[11px] leading-relaxed ${isStepActive ? 'font-bold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                            {step.text}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">{step.distance}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation simulation play button */}
                <button
                  onClick={() => setIsNavigating(!isNavigating)}
                  className={`w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider shadow-lg transition-all ${
                    isNavigating
                      ? 'bg-red-500 text-white shadow-red-500/20 hover:bg-red-600'
                      : 'bg-[#30d158] hover:bg-[#28b54c] text-white shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99]'
                  }`}
                >
                  {isNavigating ? (
                    <>
                      <Square className="h-3.5 w-3.5 fill-white" /> Stop Navigation
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-white" /> Start Navigation
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT COLUMN: The Interactive Apple Vector Map Container */}
      <div 
        ref={mapContainerRef}
        className="flex-1 h-[450px] xl:h-auto xl:min-h-[580px] rounded-3xl overflow-hidden border border-slate-200/70 dark:border-white/10 shadow-2xl relative bg-[#f4f3f0] dark:bg-[#1a1c1e] select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Dynamic Map Layers (Framer Motion scale/pan) */}
        <motion.div
          onMouseDown={handleMouseDown}
          animate={{
            scale: zoom,
            x: panOffset.x,
            y: panOffset.y
          }}
          transition={isDragging ? { type: 'just' } : { type: 'spring', damping: 20, stiffness: 120 }}
          className="absolute inset-0 origin-center cursor-grab active:cursor-grabbing w-full h-full"
          style={{ width: '800px', height: '600px' }} // fixed logical size inside container
        >
          {/* MOCK SATELLITE IMAGE LAYERS */}
          {mapStyle !== 'standard' && (
            <svg width="800" height="600" className="absolute inset-0 z-0">
              <defs>
                <pattern id="satelliteGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 122, 255, 0.04)" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="satelliteVignette" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="transparent" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
                </radialGradient>
              </defs>
              {/* Dark Earth Base */}
              <rect width="100%" height="100%" fill="#0a0c10" />
              
              {/* Scan grid */}
              <rect width="100%" height="100%" fill="url(#satelliteGrid)" />
              
              {/* Simulated visual features for satellite (canopy blobs, agricultural zones) */}
              {/* Park canopy */}
              <rect x="220" y="260" width="220" height="120" rx="20" fill="#1b2a1a" filter="blur(8px)" opacity="0.8" />
              {/* Secondary green zones */}
              <circle cx="680" cy="120" r="80" fill="#1c2b18" filter="blur(15px)" opacity="0.6" />
              <rect x="420" y="440" width="280" height="150" rx="30" fill="#1a2516" filter="blur(10px)" opacity="0.7" />
              
              {/* Vignette overlay */}
              <rect width="100%" height="100%" fill="url(#satelliteVignette)" />
            </svg>
          )}

          {/* MAIN VECTOR MAP SVG */}
          <svg
            viewBox="0 0 800 600"
            width="100%"
            height="100%"
            className="absolute inset-0 z-10"
          >
            <defs>
              {/* Standard Road Dropshadow filter */}
              <filter id="roadShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.04" />
              </filter>
              {/* Active Route Glow filter */}
              <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* LANDSCAPE LAYER (only in Standard Map) */}
            {mapStyle === 'standard' && (
              <>
                {/* Landmass base */}
                <rect width="800" height="600" fill="#f4f3f0" className="dark:fill-[#1e2022]" />

                {/* Parks / Forest areas */}
                <g opacity="0.9">
                  {/* Sundarbari Park */}
                  <rect x="220" y="260" width="220" height="120" rx="20" fill="#e2ecd3" className="dark:fill-[#212f20]" />
                  {/* North-East Green Buffer */}
                  <rect x="620" y="40" width="150" height="120" rx="20" fill="#e2ecd3" className="dark:fill-[#212f20]" />
                  {/* South Residential Green Belt */}
                  <rect x="450" y="450" width="300" height="130" rx="30" fill="#e2ecd3" className="dark:fill-[#212f20]" />
                </g>
              </>
            )}

            {/* WATER LAYER */}
            <g opacity={mapStyle === 'standard' ? 0.95 : 0.7}>
              {/* Park Central Lake */}
              <path
                d="M 280 320 C 300 310, 330 315, 350 330 C 370 345, 360 365, 340 370 C 310 375, 290 350, 280 320 Z"
                fill={mapStyle === 'standard' ? '#a5c9eb' : '#142a42'}
                className="dark:fill-[#142a42]"
              />
              {/* Winding river/drainage path crossing north-west corner */}
              <path
                d="M -50 40 Q 150 70, 320 -20"
                fill="none"
                stroke={mapStyle === 'standard' ? '#a5c9eb' : '#142a42'}
                strokeWidth="14"
                strokeLinecap="round"
                className="dark:stroke-[#142a42]"
              />
            </g>

            {/* BUILDING FOOTPRINTS */}
            <g opacity={mapStyle === 'standard' ? 0.8 : 0.55}>
              {/* Local Residences */}
              <rect x="120" y="110" width="55" height="35" rx="6" fill="#e9e8e3" stroke="#dfded8" strokeWidth="1" className="dark:fill-[#2d3035] dark:stroke-navy-800" />
              <rect x="340" y="100" width="60" height="40" rx="6" fill="#e9e8e3" stroke="#dfded8" strokeWidth="1" className="dark:fill-[#2d3035] dark:stroke-navy-800" />
              
              {/* Cafe Building */}
              <rect x="250" y="145" width="45" height="35" rx="6" fill="#e9e8e3" stroke="#dfded8" strokeWidth="1" className="dark:fill-[#2d3035] dark:stroke-navy-800" />
              
              {/* Hostel 4 */}
              <rect x="180" y="80" width="30" height="45" rx="4" fill="#e9e8e3" stroke="#dfded8" strokeWidth="1" className="dark:fill-[#2d3035] dark:stroke-navy-800" />
              
              {/* South-east Residential Block */}
              <rect x="520" y="440" width="70" height="45" rx="8" fill="#e9e8e3" stroke="#dfded8" strokeWidth="1" className="dark:fill-[#2d3035] dark:stroke-navy-800" />
              <rect x="620" y="430" width="65" height="55" rx="8" fill="#e9e8e3" stroke="#dfded8" strokeWidth="1" className="dark:fill-[#2d3035] dark:stroke-navy-800" />
            </g>

            {/* DENSE ROAD BASE (For standard/hybrid map styling) */}
            <g filter="url(#roadShadow)">
              {/* Sundarbari Path Loop */}
              <path
                d="M 60 480 C 100 500, 180 520, 240 515 C 310 510, 360 490, 380 480 C 400 440, 410 380, 420 350 C 450 280, 500 245, 600 245"
                fill="none"
                stroke={mapStyle === 'standard' ? '#e4e2dd' : '#2d333b'}
                strokeWidth="18"
                className="dark:stroke-[#25282c]"
              />

              {/* Nizarapur Path */}
              <path
                d="M 75 285 C 130 265, 180 255, 240 245 C 310 235, 380 225, 450 215 C 490 225, 520 230, 540 235 L 750 285"
                fill="none"
                stroke={mapStyle === 'standard' ? '#e4e2dd' : '#2d333b'}
                strokeWidth="18"
                className="dark:stroke-[#25282c]"
              />

              {/* AEC Road (Main vertical road) */}
              <path
                d="M 75 -20 C 70 80, 75 180, 70 280 C 65 340, 60 420, 50 620"
                fill="none"
                stroke={mapStyle === 'standard' ? '#e4e2dd' : '#2d333b'}
                strokeWidth="24"
                className="dark:stroke-[#25282c]"
              />
            </g>

            {/* ROAD FILLS */}
            <g>
              {/* Sundarbari Path Fill */}
              <path
                d="M 60 480 C 100 500, 180 520, 240 515 C 310 510, 360 490, 380 480 C 400 440, 410 380, 420 350 C 450 280, 500 245, 600 245"
                fill="none"
                stroke={mapStyle === 'standard' ? '#ffffff' : '#3e444d'}
                strokeWidth="14"
                strokeLinecap="round"
                className="dark:stroke-[#30343a]"
              />

              {/* Nizarapur Path Fill */}
              <path
                d="M 75 285 C 130 265, 180 255, 240 245 C 310 235, 380 225, 450 215 C 490 225, 520 230, 540 235 L 750 285"
                fill="none"
                stroke={mapStyle === 'standard' ? '#ffffff' : '#3e444d'}
                strokeWidth="14"
                strokeLinecap="round"
                className="dark:stroke-[#30343a]"
              />

              {/* AEC Road Fill */}
              <path
                d="M 75 -20 C 70 80, 75 180, 70 280 C 65 340, 60 420, 50 620"
                fill="none"
                stroke={mapStyle === 'standard' ? '#ffffff' : '#3e444d'}
                strokeWidth="20"
                className="dark:stroke-[#30343a]"
              />
            </g>

            {/* ROAD LABELS */}
            {mapStyle === 'standard' && (
              <g className="fill-slate-400 dark:fill-slate-500 font-bold text-[9px] pointer-events-none select-none tracking-wide uppercase">
                <text transform="rotate(84 68 180)" x="68" y="185">AEC ROAD</text>
                <text transform="rotate(-6 310 238)" x="310" y="238">Nizarapur Path</text>
                <text transform="rotate(-3 160 514)" x="160" y="514">Sundarbari Path</text>
              </g>
            )}

            {/* LIVE TRAFFIC LAYER (IF ACTIVE) */}
            <AnimatePresence>
              {trafficActive && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none"
                >
                  {/* AEC Road - Heavy (Red) near intersection */}
                  <path
                    d="M 70 240 C 70 260, 68 300, 65 330"
                    fill="none"
                    stroke="#ff3b30"
                    strokeWidth="3.5"
                    strokeDasharray="6, 5"
                    strokeLinecap="round"
                    className="animate-[dash_10s_linear_infinite]"
                  />
                  {/* AEC Road - Light (Green) elsewhere */}
                  <path
                    d="M 75 -20 C 70 80, 75 180, 72 230"
                    fill="none"
                    stroke="#34c759"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 64 340 C 60 420, 50 620"
                    fill="none"
                    stroke="#34c759"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  
                  {/* Nizarapur Path - Moderate (Orange) */}
                  <path
                    d="M 75 285 C 130 265, 180 255, 240 245"
                    fill="none"
                    stroke="#ff9500"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Nizarapur Path - Light (Green) */}
                  <path
                    d="M 240 245 C 310 235, 380 225, 450 215 C 490 225, 520 230, 540 235 L 750 285"
                    fill="none"
                    stroke="#34c759"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* ROUTE LINE (UNDERLAY FOR PATH LENGTH CAPTURING) */}
            <path
              ref={routePathRef}
              d={getActivePathD()}
              fill="none"
              stroke="transparent"
              strokeWidth="14"
            />

            {/* ROUTE PATH DISPLAY LAYER */}
            <g filter="url(#routeGlow)">
              <motion.path
                key={activeRoute}
                d={getActivePathD()}
                fill="none"
                stroke={activeRoute === 'walk' ? '#30d158' : activeRoute === 'cycle' ? '#bf5af2' : '#007aff'}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={activeRoute === 'walk' ? '1, 10' : 'none'}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </g>

            {/* ALGOGUIDO OFFICE BUILDING ISOMETRIC MODEL */}
            <g
              transform="translate(585, 140)"
              className="cursor-pointer"
              onClick={() => selectLandmark(landmarks[0])}
            >
              {/* Base shadow */}
              <ellipse cx="25" cy="40" rx="30" ry="12" fill="rgba(0,0,0,0.15)" filter="blur(3px)" />

              {/* Building Blocks */}
              {/* Back Block */}
              <path d="M 10 30 L 30 20 L 50 30 L 30 40 Z" fill="#b0b5c0" className="dark:fill-[#4d515a]" />
              <path d="M 10 30 L 10 50 L 30 60 L 30 40 Z" fill="#8d929f" className="dark:fill-[#3b3e46]" />
              <path d="M 30 40 L 30 60 L 50 50 L 50 30 Z" fill="#757985" className="dark:fill-[#2d2f36]" />

              {/* High Glass Tower Front */}
              <motion.g
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* 3D Glass block */}
                <path d="M 20 15 L 45 3 L 70 15 L 45 27 Z" fill="rgba(0, 122, 255, 0.4)" stroke="#007aff" strokeWidth="1" />
                <path d="M 20 15 L 20 40 L 45 52 L 45 27 Z" fill="rgba(0, 122, 255, 0.6)" stroke="#007aff" strokeWidth="1" />
                <path d="M 45 27 L 45 52 L 70 40 L 70 15 Z" fill="rgba(0, 80, 200, 0.5)" stroke="#007aff" strokeWidth="1" />
                
                {/* Accent glow line */}
                <line x1="45" y1="27" x2="45" y2="52" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
                
                {/* Brand small logo mock */}
                <circle cx="45" cy="20" r="3" fill="#ffffff" className="animate-pulse" />
              </motion.g>
            </g>

            {/* LANDMARKS INTERACTIVE PINS */}
            {landmarks.map(lm => {
              const isSelected = selectedLandmark?.id === lm.id;
              // Skip office rendering as it uses custom 3D model above
              if (lm.id === 'algoguido') return null;

              return (
                <g
                  key={lm.id}
                  transform={`translate(${lm.x}, ${lm.y})`}
                  className="cursor-pointer"
                  onClick={() => selectLandmark(lm)}
                >
                  {/* Subtle indicator ring */}
                  <circle cx="0" cy="0" r="12" fill={isSelected ? "rgba(0,122,255,0.15)" : "transparent"} className="animate-ping" />
                  
                  {/* Marker Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r="5"
                    fill={isSelected ? '#007aff' : '#8e8e93'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="shadow-md transition-colors"
                  />

                  {/* Tiny text label */}
                  <text
                    x="8"
                    y="3"
                    className="fill-slate-700 dark:fill-slate-350 text-[7.5px] font-bold select-none tracking-tight"
                    opacity={isSelected ? 1 : 0.6}
                  >
                    {lm.name.split(' ')[0]} {/* first word only for cleanliness */}
                  </text>
                </g>
              );
            })}

            {/* PRIMARY ALGOGUIDO PIN MARKER */}
            <g
              transform="translate(610, 160)"
              className="cursor-pointer"
              onClick={() => selectLandmark(landmarks[0])}
            >
              {/* Dynamic pulse glow ring */}
              <circle cx="0" cy="0" r="18" fill="rgba(255,59,48,0.2)" className="animate-pulse" />
              
              {/* Apple Bouncing pin */}
              <motion.g
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* SVG Pin design */}
                <path
                  d="M 0 0 C -9 -9, -12 -18, -12 -28 C -12 -38, -5 -40, 0 -40 C 5 -40, 12 -38, 12 -28 C 12 -18, 9 -9, 0 0 Z"
                  fill="#ff3b30"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="shadow-xl"
                />
                
                {/* Pin center white circle */}
                <circle cx="0" cy="-28" r="5.5" fill="#ffffff" />
                {/* Building/Briefcase dot inside Pin */}
                <circle cx="0" cy="-28" r="3.2" fill="#ff3b30" />
              </motion.g>

              {/* Floating glass label card above pin */}
              <g transform="translate(0, -56)">
                {/* Glass label background */}
                <rect x="-65" y="-12" width="130" height="24" rx="8" fill="rgba(25, 28, 36, 0.85)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" className="backdrop-blur-md" />
                {/* Building indicator dot */}
                <circle cx="-52" cy="0" r="3" fill="#30d158" className="animate-pulse" />
                <text
                  x="-42"
                  y="3.5"
                  className="fill-white text-[8px] font-black tracking-wide"
                >
                  ALGOGUIDO HQ
                </text>
              </g>
            </g>

            {/* CARPLAY LOCATOR DOT / NAVIGATION VEHICLE */}
            <g transform={`translate(${locatorPos.x}, ${locatorPos.y})`}>
              {/* Pulse ring */}
              <circle cx="0" cy="0" r="14" fill="rgba(0,122,255,0.25)" className="animate-ping" />
              
              {/* Locator direction arrow wrapper */}
              <g transform={`rotate(${locatorAngle})`}>
                {/* Direction light beam triangle */}
                <path d="M 0 0 L 15 -10 L 15 10 Z" fill="rgba(0,122,255,0.18)" />
                
                {/* Vector circular puck */}
                <circle cx="0" cy="0" r="6.5" fill="#007aff" stroke="#ffffff" strokeWidth="2" className="shadow-lg" />
                {/* Arrow indicator inside */}
                <polygon points="2,0 -3,-3 -1,0 -3,3" fill="#ffffff" />
              </g>
            </g>
          </svg>
        </motion.div>

        {/* COMPASS COMPONENT (Floating Map UI, top right) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Compass button */}
          <button
            onClick={handleReset}
            title="Reset direction/panning"
            className="h-10 w-10 bg-white/70 dark:bg-navy-950/70 border border-slate-200/50 dark:border-white/10 backdrop-blur-md hover:bg-white dark:hover:bg-navy-950 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-250 shadow-md transition-all hover:scale-105 active:scale-95 text-xs font-bold pointer-events-auto"
          >
            <CompassIcon className="h-5 w-5 rotate-45 text-[#ff3b30]" />
          </button>
          
          {/* Info Card toggle */}
          <button
            onClick={() => selectLandmark(landmarks[0])}
            title="Office Location Details"
            className="h-10 w-10 bg-white/70 dark:bg-navy-950/70 border border-slate-200/50 dark:border-white/10 backdrop-blur-md hover:bg-white dark:hover:bg-navy-950 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-250 shadow-md transition-all hover:scale-105 active:scale-95 text-xs font-bold pointer-events-auto"
          >
            <Info className="h-5 w-5 text-[#007aff]" />
          </button>
        </div>

        {/* BOTTOM RIGHT: Zoom and Layout Toggles */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2.5 pointer-events-auto">
          {/* Zoom controls */}
          <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-md">
            <button
              onClick={handleZoomIn}
              className="h-10 w-10 bg-white/75 dark:bg-navy-950/75 backdrop-blur-md hover:bg-white dark:hover:bg-navy-950 text-slate-700 dark:text-slate-350 flex items-center justify-center border-b border-slate-200/40 dark:border-white/5 transition-colors"
            >
              <ZoomIn className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="h-10 w-10 bg-white/75 dark:bg-navy-950/75 backdrop-blur-md hover:bg-white dark:hover:bg-navy-950 text-slate-700 dark:text-slate-350 flex items-center justify-center transition-colors"
            >
              <ZoomOut className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Style toggles */}
          <div className="flex bg-white/70 dark:bg-navy-950/70 border border-slate-200/50 dark:border-white/10 backdrop-blur-md p-1 rounded-2xl shadow-lg gap-0.5">
            <button
              onClick={() => setMapStyle('standard')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                mapStyle === 'standard'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                mapStyle === 'satellite'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sat
            </button>
            <button
              onClick={() => setMapStyle('hybrid')}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                mapStyle === 'hybrid'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Hyb
            </button>
          </div>
        </div>

        {/* BOTTOM LEFT: Scale overlay */}
        <div className="absolute bottom-4 left-4 z-20 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-bold text-white/90 border border-white/10 tracking-wide">
          <span>{Math.round(100 / zoom)} m</span>
          <div className="w-10 h-0.5 bg-white mt-1 rounded-full"></div>
        </div>

        {/* FULL SCREEN CARPLAY NAVIGATION HUD OVERLAY */}
        <AnimatePresence>
          {isNavigating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-transparent pointer-events-none z-20 flex flex-col justify-between p-4"
            >
              {/* TOP CARPLAY BANNER */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="w-full bg-[#1b7a30]/95 backdrop-blur-md border border-emerald-500/20 text-white rounded-3xl p-5 shadow-2xl flex items-center justify-between pointer-events-auto"
              >
                <div className="flex items-center gap-4">
                  {/* Next Action direction arrow display */}
                  <div className="h-12 w-12 rounded-2xl bg-white/15 border border-white/10 flex items-center justify-center shadow-inner text-white font-bold text-xl">
                    {getActiveSteps()[getCurrentStepIndex()].icon === 'right' && "↪️"}
                    {getActiveSteps()[getCurrentStepIndex()].icon === 'left' && "↩️"}
                    {getActiveSteps()[getCurrentStepIndex()].icon === 'straight' && "⬆️"}
                    {getActiveSteps()[getCurrentStepIndex()].icon === 'arrive' && "📍"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-emerald-350 tracking-wider">NEXT DIRECTIVE</span>
                    <span className="text-[13px] font-extrabold leading-tight mt-0.5">
                      {getActiveSteps()[getCurrentStepIndex()].text}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-250 mt-0.5">
                      Distance remaining: {getActiveSteps()[getCurrentStepIndex()].distance}
                    </span>
                  </div>
                </div>
                
                {/* Duration indicator */}
                <div className="flex flex-col items-end border-l border-emerald-600/40 pl-5">
                  <span className="text-xl font-black leading-none">
                    {Math.max(1, Math.round((1 - navProgress) * (activeRoute === 'walk' ? 5 : activeRoute === 'cycle' ? 3 : 2)))}
                  </span>
                  <span className="text-[8px] font-bold text-emerald-250 uppercase tracking-widest mt-1">MIN LEFT</span>
                </div>
              </motion.div>

              {/* BOTTOM VOICE/SPEECH NOTIFICATION WAVE */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="self-center w-full max-w-[450px] bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 shadow-2xl flex items-center justify-between gap-4 pointer-events-auto"
              >
                <div className="flex items-center gap-3">
                  {/* Siri voice waves */}
                  <div className="flex gap-0.5 h-4.5 items-center shrink-0">
                    <div className="w-0.5 h-2.5 bg-blue-500 rounded-full animate-[pulse_1.2s_infinite_200ms]"></div>
                    <div className="w-0.5 h-4.5 bg-purple-500 rounded-full animate-[pulse_1.2s_infinite]"></div>
                    <div className="w-0.5 h-3 bg-pink-500 rounded-full animate-[pulse_1.2s_infinite_400ms]"></div>
                    <div className="w-0.5 h-1 bg-cyan-400 rounded-full"></div>
                  </div>
                  
                  {/* Spoken subtitle text */}
                  <span className="text-[10.5px] font-bold text-slate-200 line-clamp-1 italic">
                    {!isMuted ? (
                      getCurrentStepIndex() === 0 ? "Narrator: Head toward Nizarapur Path route." :
                      getCurrentStepIndex() === 4 ? "Narrator: You have arrived at your destination." :
                      `Narrator: ${getActiveSteps()[getCurrentStepIndex()].text}`
                    ) : "Audio Guidance Muted"}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Mute toggle */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-8 w-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  {/* Stop button */}
                  <button
                    onClick={() => setIsNavigating(false)}
                    className="px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    End
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
