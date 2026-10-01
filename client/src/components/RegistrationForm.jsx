import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import FadeIn from './FadeIn';

export default function RegistrationForm({ registrationForm, onRegistrationSuccess }) {
  const {
    title = "Register Now",
    subtitle = "Secure your spot for this exclusive event.",
    buttonText = "Register Now",
    roles: defaultRoles = [
      "CEO/Director/MD",
      "Design Engineer",
      "CAD / Mechanical Engineer",
      "R&D Manager / Lead",
      "Engineering Director",
      "Manufacturing Specialist",
      "Academic / Student",
      "Other"
    ]
  } = registrationForm || {};

  // Ensure CEO/Director/MD is always available even if backend returned an older roles array
  const roles = defaultRoles?.includes("CEO/Director/MD")
    ? defaultRoles
    : ["CEO/Director/MD", ...(defaultRoles || [])];

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    city: '',
    jobRole: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.phoneNumber || !formData.companyName || !formData.city || !formData.jobRole) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.register(formData);
      if (response.success) {
        // Reset form
        setFormData({
          fullName: '',
          workEmail: '',
          phoneNumber: '',
          companyName: '',
          city: '',
          jobRole: ''
        });
        if (onRegistrationSuccess) {
          onRegistrationSuccess(response.data);
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred while submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeIn direction="up" delay={100}>
      <div id="register-card" className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 md:p-8 transition-all hover:shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-sm font-medium text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rahul Varma"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Work Email */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Work Email <span className="text-brand-red">*</span>
          </label>
          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="e.g. rahul@company.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-brand-red">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Company Name & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Company Name <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. TechCorp Innovations"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              City <span className="text-brand-red">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Bengaluru"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 text-sm outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Designation Dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Designation <span className="text-brand-red">*</span>
          </label>
          <select
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-red focus:ring-2 focus:ring-red-100 text-sm outline-none transition-all bg-white font-medium text-slate-700 cursor-pointer"
          >
            <option value="" disabled>Select your designation</option>
            {roles.map((role, idx) => (
              <option key={idx} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-brand-red hover:bg-brand-redHover active:bg-brand-darkRed text-white font-bold text-sm tracking-wide shadow-lg shadow-red-500/30 hover:shadow-red-500/50 flex items-center justify-center gap-2 transition-all disabled:opacity-75 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Reservation...</span>
              </>
            ) : (
              <>
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        
      </form>
    </div>
    </FadeIn>
  );
}
