import React from 'react';
import { Users, CheckCircle, Clock, UserCheck, Mail } from 'lucide-react';

const CARDS = [
  { key: 'total',      label: 'Total Registrations', icon: Users,       bg: 'bg-slate-100',   color: 'text-slate-700',  val: 'text-slate-900',  sub: 'All registered candidates' },
  { key: 'confirmed',  label: 'Confirmed',          icon: CheckCircle, bg: 'bg-emerald-50',  color: 'text-emerald-600',val: 'text-emerald-600',sub: 'Confirmed seats' },
  { key: 'emailsSent', label: 'QR Passes Sent',     icon: Mail,        bg: 'bg-red-50',      color: 'text-brand-red',   val: 'text-brand-red',   sub: 'Sent with personalized QR' },
  { key: 'pending',    label: 'Pending',            icon: Clock,       bg: 'bg-amber-50',    color: 'text-amber-600',  val: 'text-amber-600',  sub: 'Awaiting confirmation' },
  { key: 'attended',   label: 'Attended',           icon: UserCheck,   bg: 'bg-blue-50',     color: 'text-blue-600',   val: 'text-blue-600',   sub: 'Scanned & checked-in' },
];

export default function StatsCards({ stats, fallbackTotal }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {CARDS.map(({ key, label, icon: Icon, bg, color, val, sub }) => (
        <div key={key} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${color}`}>{label}</span>
            <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className={`text-2xl sm:text-3xl font-black ${val}`}>
              {stats?.[key] ?? (key === 'total' ? fallbackTotal : 0)}
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">{sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
