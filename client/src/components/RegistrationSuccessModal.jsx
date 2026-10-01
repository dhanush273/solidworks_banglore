import React from 'react';
import { CheckCircle2, Calendar, MapPin, Download, X, UserCheck } from 'lucide-react';

export default function RegistrationSuccessModal({ registration, eventInfo, onClose }) {
  if (!registration) return null;

  const downloadCalendarFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Conceptia KONNECT//SOLIDWORKS Innovation Day 2026//EN',
      'BEGIN:VEVENT',
      `SUMMARY:SOLIDWORKS Innovation Day 2026`,
      `DESCRIPTION:Join Conceptia KONNECT and Dassault Systèmes for SOLIDWORKS Innovation Day 2026. Smarter Design. Faster Innovation.`,
      `LOCATION:${eventInfo?.venueName || 'Taj Yeshwantpur, Bengaluru'}, ${eventInfo?.venueAddress || ' 2275, Tumkur Main Road, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022'}`,
      'DTSTART:20261023T033000Z',
      'DTEND:20261023T083000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'SOLIDWORKS_Innovation_Day_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Thank you for registering for SOLIDWORKS Innovation Day 2026!
          </h3>
          <p className="text-sm font-medium text-slate-500 mt-1.5">
            Your registration has been received. A confirmation email with the event details will be sent to you shortly.
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-3 text-xs mb-6">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Attendee Name</span>
            <span className="font-bold text-slate-900">{registration.fullName}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Work Email</span>
            <span className="font-bold text-slate-900">{registration.workEmail}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
            <span className="text-slate-500">Company & Designation</span>
            <span className="font-bold text-slate-900">{registration.companyName} • {registration.jobRole}</span>
          </div>
          {registration.city && (
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
              <span className="text-slate-500">City</span>
              <span className="font-bold text-slate-900">{registration.city}</span>
            </div>
          )}
          <div className="flex items-start gap-2 pt-1 text-slate-600">
            <Calendar className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
            <span>{eventInfo?.dates || 'November 5, 2026'} | {eventInfo?.time || '09:00 AM – 02:00 PM'}</span>
          </div>
          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
            <span>{eventInfo?.venueName || 'Taj Yeshwantpur, Bengaluru'}, {eventInfo?.venueAddress || ' 2275, Tumkur Main Road, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022'}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
