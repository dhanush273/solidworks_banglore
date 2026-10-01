import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, Calendar, Clock } from 'lucide-react';
import { getAssetUrl, handleImageFallback } from '../utils/assetHelper';

function calculateTimeLeft() {
  // Target: November 5, 2026, 09:00:00 IST (+05:30)
  const targetDate = new Date('2026-11-05T09:00:00+05:30');
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isLive: false
  };
}

function renderWithBold(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function HeroSection({ hero, onRegisterClick }) {
  const {
    invitationTag = "YOU'RE INVITED TO",
    titlePrefix = "EXPLORE SOLIDWORKS 2027",
    titleHighlight = "at SOLIDWORKS INNOVATION DAY 2026",
    tagline = "AI is transforming engineering. Are you ready?",
    description = "Discover the latest **AI-powered SOLIDWORKS innovations** across design, manufacturing, simulation, and data management.",
    ctaText = "SAVE YOUR SPOT",
    heroImage = "/assets/robotic-arm.png"
  } = hero || {};

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="overview" className="relative bg-[#fdeae9] text-slate-900 overflow-hidden pt-10 pb-24 lg:pt-14 lg:pb-32 border-b border-red-200/60">
      
      {/* Background Architectural Elements: Engineering CAD Grid & Slanted Light Red Band */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Engineering CAD Blueprint Crosshairs Grid */}
        <div className="absolute inset-0 opacity-[0.24]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-cad-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 24 20 L 24 28 M 20 24 L 28 24" stroke="#ef2722" strokeWidth="1" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-cad-grid)" />
          </svg>
        </div>

        {/* Ambient Warm Red Radial Glow */}
        <div className="absolute top-1/4 right-[12%] w-[520px] h-[520px] rounded-full bg-red-500/[0.04] blur-3xl" />

        {/* Premium Slanted Light Red Band (Angled ~-12deg matching reference flyer) */}
        <div className="absolute -top-20 -bottom-20 left-[42%] md:left-[48%] lg:left-[52%] xl:left-[55%] w-[260px] sm:w-[340px] lg:w-[440px] xl:w-[490px] -skew-x-12">
          {/* Main light red band body with subtle gradient and borders */}
          <div className="w-full h-full bg-gradient-to-b from-[#ef2722]/[0.12] via-[#ef2722]/[0.07] to-[#ef2722]/[0.02] border-l-2 border-[#ef2722]/30 border-r border-[#ef2722]/20 shadow-[0_0_60px_rgba(239,39,34,0.06)] relative overflow-hidden">
            {/* Subtle vertical hairline inside the band */}
            <div className="absolute top-0 bottom-0 left-6 sm:left-10 w-px bg-gradient-to-b from-transparent via-[#ef2722]/25 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/[0.06] via-transparent to-transparent" />
          </div>

          {/* Secondary parallel slim accent pinstripe */}
          <div className="absolute top-0 bottom-0 -left-5 sm:-left-7 w-1 sm:w-1.5 bg-gradient-to-b from-[#ef2722]/35 via-[#ef2722]/20 to-[#ef2722]/5 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
            
            {/* Invitation Tag */}
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-black tracking-widest text-[#ef2722] uppercase animate-fade-in-down">
              <span className="text-base font-bold leading-none">&#10095;</span>
              <span>{invitationTag}</span>
            </div>

            {/* Main Headline: EXPLORE SOLIDWORKS 2027 in a single straight line */}
            <div className="space-y-2 animate-fade-in-up [animation-delay:100ms]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[50px] font-black tracking-tight text-[#00589a] leading-tight whitespace-normal sm:whitespace-nowrap">
                EXPLORE <span className="text-[#ef2722]">SOLIDWORKS 2027</span>
              </h1>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#00589a] leading-tight">
                at <span className="text-[#00589a]">SOLIDWORKS</span> <span className="text-[#ef2722]">INNOVATION DAY 2026</span>
              </div>
              {/* Flyer Red Accent Underline Bar */}
              <div className="w-16 h-1.5 bg-[#ef2722] rounded-full mt-2"></div>
            </div>

            {/* Primary Subtext */}
            <p className="text-sm sm:text-base text-slate-700 max-w-xl font-normal leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              {renderWithBold(
                (description || "")
                  .replace(/Learn how SOLIDWORKS AI and Virtual Companions are transforming the way engineers design, validate, collaborate, and innovate\.?/gi, "")
                  .trim() || "Discover the latest **AI-powered SOLIDWORKS innovations** across design, manufacturing, simulation, and data management."
              )}
            </p>

            {/* AI Narrative Highlight Card */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-red-200/80 shadow-sm max-w-xl animate-fade-in-up [animation-delay:300ms]">
              <div className="flex items-center gap-2 text-[#ef2722] font-black text-xs sm:text-sm">
                <Bot className="w-4 h-4 text-[#ef2722] flex-shrink-0" />
                <span>AI is transforming engineering. Are you ready?</span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-700 mt-1 leading-relaxed">
                See how <strong className="font-bold text-slate-900">SOLIDWORKS AI and Virtual Companions</strong> help engineers work smarter and innovate faster.
              </p>
            </div>

            {/* CTA Register Button */}
            <div className="animate-fade-in-up [animation-delay:400ms]">
              <button
                onClick={onRegisterClick}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ef2722] text-white font-bold text-base shadow-xl shadow-red-600/30 hover:bg-red-700 hover:shadow-red-600/50 active:scale-95 transition-all duration-200"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Event Countdown Timer (November 5 - Bengaluru) */}
            <div className="max-w-xl animate-fade-in-up [animation-delay:500ms]">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-red-200/80 shadow-lg shadow-red-950/5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef2722] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ef2722]"></span>
                    </span>
                    <span className="text-xs font-black tracking-widest text-[#00589a] uppercase">
                      Bengaluru Event Countdown
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#ef2722]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>November 5, 2026</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  {/* Days */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl py-2 sm:py-2.5 px-1 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-black text-[#00589a] font-mono tracking-tight leading-none">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1.5">
                      Days
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl py-2 sm:py-2.5 px-1 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-black text-[#00589a] font-mono tracking-tight leading-none">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1.5">
                      Hours
                    </div>
                  </div>

                  {/* Minutes */}
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl py-2 sm:py-2.5 px-1 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-black text-[#00589a] font-mono tracking-tight leading-none">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1.5">
                      Minutes
                    </div>
                  </div>

                  {/* Seconds */}
                  <div className="bg-red-50/70 border border-[#ef2722]/40 rounded-xl py-2 sm:py-2.5 px-1 shadow-inner relative overflow-hidden">
                    <div className="text-2xl sm:text-3xl font-black text-[#ef2722] font-mono tracking-tight leading-none">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-red-600 mt-1.5">
                      Seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Large Robotic Arm Image shifted more right */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center animate-fade-in-left [animation-delay:300ms]">
            <img
              src={getAssetUrl(heroImage || '/assets/robotic-arm.png')}
              alt="SOLIDWORKS 2027 AI Robotic Workcell"
              className="w-full max-w-[650px] lg:max-w-none lg:w-[115%] xl:w-[122%] lg:translate-x-16 xl:translate-x-24 h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.13)] transition-transform duration-500 hover:scale-105"
              onError={(e) => handleImageFallback(e, 'http://localhost:5000/assets/robotic-arm.png')}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
