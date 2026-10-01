import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import InfoBar from '../components/InfoBar';
import RegistrationForm from '../components/RegistrationForm';
import AgendaSection from '../components/AgendaSection';
import SpeakersSection from '../components/SpeakersSection';
import VenueSection from '../components/VenueSection';
import WhatToExpectSection from '../components/WhatToExpectSection';
import PartnersFooter from '../components/PartnersFooter';
import RegistrationSuccessModal from '../components/RegistrationSuccessModal';
import FadeIn from '../components/FadeIn';

export default function LandingPage({ eventData, onRegistrationSuccess }) {
  const [confirmedAttendee, setConfirmedAttendee] = useState(null);

  const handleRegisterClick = () => {
    const el = document.getElementById('register-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add subtle highlight animation to the card
      el.classList.add('ring-4', 'ring-red-400');
      setTimeout(() => el.classList.remove('ring-4', 'ring-red-400'), 1500);
    }
  };

  const handleSuccess = (attendee) => {
    setConfirmedAttendee(attendee);
    if (onRegistrationSuccess) onRegistrationSuccess(attendee);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-brand-red selection:text-white">
      {/* 1. Hero Section */}
      <HeroSection 
        hero={eventData?.hero} 
        onRegisterClick={handleRegisterClick} 
      />

      {/* 2. Floating Info Bar (Dates, Venue, Mode) */}
      <InfoBar info={eventData?.info} />

      {/* 3. Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 sm:pb-8 space-y-14">
        
        {/* Independent What to Expect Section with 6 Bulletpoints */}
        <WhatToExpectSection />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column (lg: 7 cols): Agenda & Venue */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Agenda Timeline */}
            <AgendaSection agenda={eventData?.agenda} />

            {/* Separator */}
            <div className="h-px bg-slate-200"></div>

            {/* Venue & Directions */}
            <VenueSection venue={eventData?.venue} />

          </div>

          {/* Right Column (lg: 5 cols): Register Form Card, Speakers, Highlights */}
          <div className="lg:col-span-5 space-y-16">
            
            {/* Prominent Floating Registration Card */}
            <RegistrationForm 
              registrationForm={eventData?.registrationForm}
              onRegistrationSuccess={handleSuccess}
            />

            {/* Speakers Showcase */}
            <SpeakersSection speakers={eventData?.speakers} />

          </div>

        </div>
      </main>

      {/* 4. Footer & Partners */}
      <PartnersFooter 
        partners={eventData?.partners} 
        branding={eventData?.branding} 
      />

      {/* 5. Success Modal Confirmation */}
      {confirmedAttendee && (
        <RegistrationSuccessModal
          registration={confirmedAttendee}
          eventInfo={eventData?.info}
          onClose={() => setConfirmedAttendee(null)}
        />
      )}
    </div>
  );
}
