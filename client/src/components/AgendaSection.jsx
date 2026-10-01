import React from 'react';
import { User, Monitor, Settings, Users, Utensils, Clock,Bot, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';

export default function AgendaSection({ agenda }) {
  const getIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'user':
        return <User className="w-5 h-5 text-white" />;
      case 'monitor':
      case 'presentation':
        return <Monitor className="w-5 h-5 text-white" />;
      case 'settings':
      case 'cog':
        return <Settings className="w-5 h-5 text-white" />;
      case 'users':
        return <Users className="w-5 h-5 text-white" />;
      case 'utensils':
      case 'food':
        return <Utensils className="w-5 h-5 text-white" />;
      case 'ai':
      case 'artificial intelligence':
      case 'bot':
        return <Bot className="w-5 h-5 text-white" />;
      default:
        return <Clock className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div id="agenda" className="space-y-6">
      {/* Section Header */}
      <FadeIn direction="up">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-1 bg-brand-red rounded-full"></span>
            <span className="text-xs font-black uppercase tracking-widest text-brand-red">
              AGENDA
            </span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Event Schedule
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            A full schedule of expert sessions, live test-drives, and networking.
          </p>
        </div>
      </FadeIn>

      {/* Timeline Items */}
      <div className="relative space-y-4 pt-2">
        {/* Subtle timeline track */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 hidden sm:block"></div>

        {agenda && agenda.map((item, idx) => (
          <FadeIn key={item.id || idx} direction="up" delay={idx * 60}>
            <div
              className="group relative flex items-start gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-100 hover:border-red-200 hover:shadow-md transition-all duration-200"
            >
              {/* Circular Red Icon Badge */}
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-red to-red-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                {getIcon(item.icon)}
              </div>

              {/* Time and Title Details */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-red" />
                  <span>{item.time}</span>
                </div>
                <h4 className="text-base font-bold text-slate-800 mt-1 tracking-tight group-hover:text-brand-red transition-colors">
                  {item.title}
                </h4>
              </div>

            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
