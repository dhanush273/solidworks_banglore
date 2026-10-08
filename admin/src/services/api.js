const getDefaultApiUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/api';
  }
  return 'https://solidworks-banglore.onrender.com/api';
};

const RAW_URL = getDefaultApiUrl();
const CLEAN_URL = RAW_URL.replace(/\/+$/, '');
const BASE = CLEAN_URL.endsWith('/api') ? CLEAN_URL : `${CLEAN_URL}/api`;

export const api = {
  async getRegistrations({ search = '', status = '', role = '' } = {}) {
    const q = new URLSearchParams();
    if (search) q.append('search', search);
    if (status && status !== 'All') q.append('status', status);
    if (role   && role   !== 'All') q.append('role',   role);
    const res = await fetch(`${BASE}/registrations${q.toString() ? '?' + q : ''}`);
    if (!res.ok) throw new Error('Failed to fetch registrations');
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${BASE}/registrations/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  async updateStatus(id, status) {
    const res = await fetch(`${BASE}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  async deleteRegistration(id, deletedBy = 'Admin') {
    const res = await fetch(`${BASE}/registrations/${id}?deletedBy=${encodeURIComponent(deletedBy)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-user': deletedBy
      },
      body: JSON.stringify({ deletedBy })
    });
    if (!res.ok) throw new Error('Failed to delete registration');
    return res.json();
  },

  async sendSingleEmail(id) {
    const res = await fetch(`${BASE}/registrations/send-email/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send QR pass email');
    return data;
  },

  async sendBulkEmails({ filter = 'confirmed-unsent', ids = null, forceAll = false } = {}) {
    const res = await fetch(`${BASE}/registrations/send-bulk-emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filter, ids, forceAll })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send bulk emails');
    return data;
  },

  async checkinAttendee(id) {
    const res = await fetch(`${BASE}/registrations/checkin/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to mark check-in');
    return data;
  },

  getCheckinUrl(id) {
    return `${BASE}/registrations/checkin/${id}`;
  },

  getEmailPreviewUrl(id) {
    return `${BASE}/registrations/preview-email/${id}`;
  },

  getExportCsvUrl() {
    return `${BASE}/registrations/export/csv`;
  },

  getEmailInviteUrl() {
    const root = BASE.replace(/\/api\/?$/, '');
    return `${root}/email-invite.html`;
  }
};
