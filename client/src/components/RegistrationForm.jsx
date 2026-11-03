import React from 'react';
import { AlertCircle, Lock } from 'lucide-react';
import FadeIn from './FadeIn';

export default function RegistrationForm({ registrationForm }) {
  const {
    title = "Registration Status",
    closedMessage = "Thank you for your interest! Registrations for this event are now officially closed."
  } = registrationForm || {};

  return (
    <FadeIn direction="up" delay={100}>
      <div id="register-card" className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 md:p-8 transition-all">
        <div className="mb-6 text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Registrations Closed
          </h3>
          <p className="text-sm font-medium text-slate-500 mt-2">
            {closedMessage}
          </p>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center justify-center gap-2.5 text-xs text-amber-800 font-medium text-center">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
          <span>If you have already registered, check your email for confirmation details.</span>
        </div>
      </div>
    </FadeIn>
  );
}
