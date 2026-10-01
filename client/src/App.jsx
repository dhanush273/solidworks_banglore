import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import { defaultEventConfig } from './config/eventData';
import { api } from './services/api';

export default function App() {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEventContent()
      .then(res => {
        if (res && res.success && res.data) {
          setEventData(res.data);
        } else {
          setEventData(defaultEventConfig);
        }
      })
      .catch(err => {
        console.warn('Failed to load event data from API, using default:', err);
        setEventData(defaultEventConfig);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00589a] flex flex-col items-center justify-center text-white space-y-4 font-sans">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#00487e] border-t-red-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-white">3DS</div>
        </div>
        <p className="text-blue-100 font-medium text-sm animate-pulse tracking-wide">
          Loading SOLIDWORKS Innovation Day...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans animate-fade-in">
      <Navbar eventData={eventData} />
      <LandingPage eventData={eventData} />
    </div>
  );
}
