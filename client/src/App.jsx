import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import { defaultEventConfig } from './config/eventData';
import { api } from './services/api';

export default function App() {
  const [eventData, setEventData] = useState(defaultEventConfig);

  useEffect(() => {
    api.getEventContent()
      .then(res => {
        if (res && res.success && res.data) {
          setEventData(res.data);
        }
      })
      .catch(err => {
        console.warn('Failed to load event data from API, keeping default content:', err);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans animate-fade-in">
      <Navbar eventData={eventData} />
      <LandingPage eventData={eventData} />
    </div>
  );
}
