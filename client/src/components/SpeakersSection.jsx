import React from 'react';
import FadeIn from './FadeIn';
import { getAssetUrl, handleImageFallback } from '../utils/assetHelper';

export default function SpeakersSection({ speakers }) {
  const visibleSpeakers = Array.isArray(speakers)
    ? speakers.filter((speaker) => speaker && (speaker.name || speaker.designation || speaker.photoUrl))
    : [];

  return (
    <div id="speakers" className="space-y-6">
      {/* Section Header */}
      <FadeIn direction="up">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-1 bg-brand-red rounded-full"></span>
            <span className="text-xs font-black uppercase tracking-widest text-brand-red">
              SPEAKERS
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Industry Experts. Real Insights.
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Gain valuable perspectives from SOLIDWORKS experts and industry leaders.
          </p>
        </div>
      </FadeIn>

      {/* Speaker Cards Grid */}
      {visibleSpeakers.length > 0 ? (
        <div className="grid grid-cols-6 gap-2.5 sm:gap-3.5 pt-2">
          {visibleSpeakers.map((speaker, idx) => {
            const isFourthOfFive = visibleSpeakers.length === 5 && idx === 3;
            return (
              <FadeIn
                key={speaker.id || idx}
                direction="up"
                delay={idx * 60}
                className={`col-span-2 ${isFourthOfFive ? 'col-start-2' : ''}`}
              >
                <div
                  className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300"
                >
              {/* Speaker Image Container */}
              <div className="relative aspect-[4/4.2] overflow-hidden bg-slate-100">
                <img
                  src={getAssetUrl(speaker.photoUrl) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={speaker.name || 'Event speaker'}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => handleImageFallback(e, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400')}
                />
              </div>

              {/* Info & Red Accent */}
              <div className="p-2.5 pb-3 flex flex-col items-center text-center flex-1 justify-between min-h-[86px]">
                <div>
                  <h4 className="font-extrabold text-xs sm:text-[13px] text-slate-900 tracking-tight leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                    {speaker.name || 'Event speaker'}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-1 line-clamp-2 leading-tight">
                    {speaker.designation || 'Industry expert'}
                  </p>
                </div>

                {/* Red Accent Dash under designation */}
                <div className="w-6 h-1 bg-brand-red rounded-full mt-2.5 mx-auto"></div>
              </div>
            </div>
          </FadeIn>
        );
      })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center text-sm text-slate-500">
          Speaker details will be announced soon.
        </div>
      )}
    </div>
  );
}
