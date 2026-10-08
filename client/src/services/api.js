const getDefaultApiUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/api';
  }
  return 'https://solidworks-banglore.onrender.com/api';
};

const RAW_URL = getDefaultApiUrl();
const CLEAN_URL = RAW_URL.replace(/\/+$/, '');
const BASE_URL = CLEAN_URL.endsWith('/api') ? CLEAN_URL : `${CLEAN_URL}/api`;

export const api = {
  // Event Content
  async getEventContent() {
    const res = await fetch(`${BASE_URL}/event`);
    if (!res.ok) throw new Error('Failed to fetch event content');
    return res.json();
  },

  async updateEventContent(content) {
    const res = await fetch(`${BASE_URL}/event`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
    if (!res.ok) throw new Error('Failed to update event content');
    return res.json();
  },

  async resetEventContent() {
    const res = await fetch(`${BASE_URL}/event/reset`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset event content');
    return res.json();
  },

  // Nominations / Registrations
  async register(registrationData) {
    const res = await fetch(`${BASE_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async getRegistrations(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);
    if (params.role) query.append('role', params.role);

    const url = `${BASE_URL}/registrations${query.toString() ? '?' + query.toString() : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch registrations');
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${BASE_URL}/registrations/stats`);
    if (!res.ok) throw new Error('Failed to fetch statistics');
    return res.json();
  },

  async updateStatus(id, status) {
    const res = await fetch(`${BASE_URL}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update nomination status');
    return res.json();
  },

  async deleteRegistration(id, deletedBy = 'Admin') {
    const res = await fetch(`${BASE_URL}/registrations/${id}?deletedBy=${encodeURIComponent(deletedBy)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-user': deletedBy
      },
      body: JSON.stringify({ deletedBy })
    });
    if (!res.ok) throw new Error('Failed to delete nomination');
    return res.json();
  },

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload image');
    return res.json();
  },

  getExportCsvUrl() {
    return `${BASE_URL}/registrations/export/csv`;
  }
};
