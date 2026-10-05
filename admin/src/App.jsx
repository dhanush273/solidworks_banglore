import React, { useState, useEffect } from 'react';
import AdminNavbar      from './components/AdminNavbar';
import StatsCards       from './components/StatsCards';
import FiltersBar       from './components/FiltersBar';
import NominationsTable from './components/NominationsTable';
import AttendeeModal    from './components/AttendeeModal';
import BulkEmailModal   from './components/BulkEmailModal';
import EmailPreviewModal from './components/EmailPreviewModal';
import { api } from './services/api';

export default function App() {
  const [registrations,    setRegistrations]    = useState([]);
  const [stats,            setStats]            = useState(null);
  const [loading,          setLoading]          = useState(true);
  const [search,           setSearch]           = useState('');
  const [statusFilter,     setStatusFilter]     = useState('All');
  const [roleFilter,       setRoleFilter]       = useState('All');
  
  // Modals state
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [previewAttendee,  setPreviewAttendee]  = useState(null);
  const [isBulkEmailOpen,  setIsBulkEmailOpen]  = useState(false);

  /* ── Load data ── */
  const loadData = async () => {
    try {
      setLoading(true);
      const [regRes, statsRes] = await Promise.all([
        api.getRegistrations({ search, status: statusFilter, role: roleFilter }),
        api.getStats()
      ]);
      setRegistrations(regRes.data   || []);
      setStats(statsRes.stats        || null);

      // Keep selected attendee updated if open
      if (selectedAttendee) {
        const found = (regRes.data || []).find(
          r => (r._id || r.id) === (selectedAttendee._id || selectedAttendee.id)
        );
        if (found) setSelectedAttendee(found);
      }
    } catch (err) {
      console.error('Admin load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [search, statusFilter, roleFilter]);

  /* ── Status update ── */
  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateStatus(id, newStatus);
      setRegistrations(prev =>
        prev.map(r => (r._id === id || r.id === id) ? { ...r, status: newStatus } : r)
      );
      const s = await api.getStats();
      setStats(s.stats);
    } catch (err) { alert('Update failed: ' + err.message); }
  };

  /* ── Single Email Dispatch ── */
  const handleSendSingleEmail = async (attendee) => {
    const id = attendee._id || attendee.id;
    try {
      const res = await api.sendSingleEmail(id);
      alert(`Success: ${res.message || 'QR Pass sent successfully!'}`);
      await loadData();
    } catch (err) {
      alert(`Error sending email: ${err.message}`);
    }
  };

  /* ── Mark Attended (Check-in) ── */
  const handleCheckin = async (id) => {
    try {
      await api.checkinAttendee(id);
      alert('Attendance confirmed successfully!');
      await loadData();
    } catch (err) {
      alert(`Check-in error: ${err.message}`);
    }
  };

  /* ── Delete ── */
  const handleDelete = async (id) => {
    if (!window.confirm('Remove this nomination permanently?')) return;
    try {
      await api.deleteRegistration(id);
      setRegistrations(prev => prev.filter(r => r._id !== id && r.id !== id));
      const s = await api.getStats();
      setStats(s.stats);
    } catch (err) { alert('Delete failed: ' + err.message); }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">

      <AdminNavbar
        loading={loading}
        onRefresh={loadData}
        onOpenBulkEmail={() => setIsBulkEmailOpen(true)}
      />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">

        <StatsCards stats={stats} fallbackTotal={registrations.length} />

        <FiltersBar
          search={search}           onSearch={setSearch}
          statusFilter={statusFilter} onStatus={setStatusFilter}
          roleFilter={roleFilter}     onRole={setRoleFilter}
        />

        <NominationsTable
          registrations={registrations}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onView={setSelectedAttendee}
          onSendEmail={handleSendSingleEmail}
          onPreviewEmail={setPreviewAttendee}
        />

      </main>

      {/* Attendee Details Modal */}
      <AttendeeModal
        attendee={selectedAttendee}
        onClose={() => setSelectedAttendee(null)}
        onSendEmail={handleSendSingleEmail}
        onPreviewEmail={setPreviewAttendee}
        onCheckin={handleCheckin}
      />

      {/* Bulk Email Modal */}
      {isBulkEmailOpen && (
        <BulkEmailModal
          registrations={registrations}
          onClose={() => setIsBulkEmailOpen(false)}
          onSuccess={loadData}
          onPreviewEmail={setPreviewAttendee}
        />
      )}

      {/* Email Preview Modal */}
      {previewAttendee && (
        <EmailPreviewModal
          attendee={previewAttendee}
          onClose={() => setPreviewAttendee(null)}
          onSend={(id) => {
            handleSendSingleEmail(previewAttendee);
            setPreviewAttendee(null);
          }}
        />
      )}

    </div>
  );
}
