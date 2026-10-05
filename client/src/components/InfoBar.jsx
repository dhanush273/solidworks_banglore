import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import FadeIn from './FadeIn';

export default function InfoBar({ info }) {
  const {
    dates = "November 5, 2026",
    time = "09:00 AM – 05:30 PM",
    venueName = "Taj Yeshwantpur, Bengaluru",
    venueAddress = "2275, Tumkur Main Road, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022",
    mode = "In-Person Event"
  } = info || {};

  return (
    <FadeIn direction="none" delay={200} className="relative -mt-12 sm:-mt-14 lg:-mt-14 max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      {/* Branded Red Pill Bar matching flyer with compact, balanced proportions */}
      <div className="bg-[#ef2722] text-white rounded-[22px] sm:rounded-[26px] shadow-2xl shadow-red-600/35 border-2 border-red-500/80 px-5 py-3.5 sm:px-8 sm:py-4">
        
        {/* Bar Heading */}
        <div className="text-center mb-2.5 sm:mb-3">
          <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.1em] text-white">
            Save Your Spot
          </h3>
        </div>

        {/* 3 Icon + Label Groups: Weighted Grid to allocate space efficiently and show full address */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 md:gap-0 items-center">
          
          {/* 1. Event Date (3 cols) */}
          <div className="md:col-span-3 flex items-center gap-3 justify-start md:pr-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#ef2722] flex items-center justify-center shadow-md flex-shrink-0">
              <Calendar className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold text-red-100 uppercase tracking-wider">
                Event Date
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight uppercase whitespace-nowrap">
                {dates}
              </div>
            </div>
          </div>

          {/* 2. Event Time (4 cols) */}
          <div className="md:col-span-4 flex items-center gap-3 justify-start md:px-5 md:border-l border-white/20">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#ef2722] flex items-center justify-center shadow-md flex-shrink-0">
              <Clock className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold text-red-100 uppercase tracking-wider">
                Event Time
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight uppercase whitespace-nowrap">
                {time}
              </div>
            </div>
          </div>

          {/* 3. Location & Full Address (5 cols) */}
          <div className="md:col-span-5 flex items-center gap-3 justify-start md:pl-5 md:border-l border-white/20">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#ef2722] flex items-center justify-center shadow-md flex-shrink-0">
              <MapPin className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-bold text-red-100 uppercase tracking-wider">
                Location
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white tracking-tight uppercase">
                {venueName.trim()}
              </div>
              <div className="text-[10px] sm:text-[11px] font-medium text-red-100 leading-snug mt-0.5">
                {venueAddress.trim()}
              </div>
            </div>
          </div>

        </div>

      </div>
    </FadeIn>
  );
}
