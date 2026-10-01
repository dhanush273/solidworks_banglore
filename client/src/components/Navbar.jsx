import React from 'react';
import { handleImageFallback } from '../utils/assetHelper';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#00589a] text-white backdrop-blur-md border-b border-[#00487e] shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Brand: Conceptia KONNECT White Logo */}
          <a href="#overview" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <img
              src="/Logos/conceptia-konnect-white-logo.png"
              alt="Conceptia KONNECT - Your Trusted Digital Solutions Partner"
              className="h-18 sm:h-20 w-auto object-contain"
              onError={(e) => handleImageFallback(e, '/Logos/conceptia-konnect-logo.png')}
            />
          </a>

          {/* Navigation Links for Public View */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-white">
            <a href="#overview" className="hover:text-white/80 transition-colors">Overview</a>
            <a href="#what-to-expect" className="hover:text-white/80 transition-colors">What to Expect</a>
            <a href="#agenda" className="hover:text-white/80 transition-colors">Agenda</a>
            <a href="#venue" className="hover:text-white/80 transition-colors">Venue</a>
            <a href="#speakers" className="hover:text-white/80 transition-colors">Speakers</a>
          </nav>

          {/* Right Brand: Dassault Systèmes SOLIDWORKS White Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="h-7 w-px bg-white/20 hidden sm:block"></div>
            <img
              src="/Logos/solidworks-white-logo.png"
              alt="3DS SOLIDWORKS"
              className="h-28 sm:h-20 w-auto object-contain"
              onError={(e) => handleImageFallback(e, '/Logos/solidworks-logo.png')}
            />
          </div>

        </div>
      </div>
    </header>
  );
}
