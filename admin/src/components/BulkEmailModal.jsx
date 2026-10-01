import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, AlertCircle, RefreshCw, Eye, Users } from 'lucide-react';
import { api } from '../services/api';

export default function BulkEmailModal({ registrations = [], onClose, onSuccess, onPreviewEmail }) {
  const confirmedAttendees = registrations.filter(
    r => r.status === 'Confirmed' || r.status === 'Attended'
  );
  const unsentConfirmed = confirmedAttendees.filter(r => !r.emailSent);
  const alreadySentCount = confirmedAttendees.length - unsentConfirmed.length;

  const [mode, setMode] = useState('unsent'); // 'unsent' | 'all'
  const [selectedIds, setSelectedIds] = useState(() =>
    new Set(unsentConfirmed.map(r => r._id || r.id))
  );

  const [sending, setSending] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [resultSummary, setResultSummary] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const targetList = mode === 'unsent' ? unsentConfirmed : confirmedAttendees;

  // Toggle mode
  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'unsent') {
      setSelectedIds(new Set(unsentConfirmed.map(r => r._id || r.id)));
    } else {
      setSelectedIds(new Set(confirmedAttendees.map(r => r._id || r.id)));
    }
  };

  // Toggle selection
  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(targetList.map(r => r._id || r.id)));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  // Execute Bulk Send
  const handleSend = async () => {
    const idsToSend = Array.from(selectedIds);
    if (idsToSend.length === 0) {
      alert('Please select at least one attendee to send the QR pass email.');
      return;
    }

    if (!window.confirm(`Are you sure you want to send personalized QR pass emails to ${idsToSend.length} confirmed attendee(s)?`)) {
      return;
    }

    try {
      setSending(true);
      setErrorMsg('');
      setProgressMsg(`Sending QR pass emails to ${idsToSend.length} candidate(s)...`);

      const res = await api.sendBulkEmails({
        ids: idsToSend,
        forceAll: mode === 'all'
      });

      setResultSummary(res);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Bulk send error:', err);
      setErrorMsg(err.message || 'Failed to dispatch bulk emails');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Send Bulk QR Pass Emails
              </h3>
              <p className="text-xs text-slate-500">
                Personalized emails with candidate name, designation, company &amp; auto-attendance QR code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Result Banner if already sent */}
          {resultSummary && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Bulk Email Dispatch Completed!</span>
              </div>
              <p>
                Successfully processed <strong>{resultSummary.results?.sent || 0}</strong> attendee email(s).
                {resultSummary.results?.failed > 0 && ` (${resultSummary.results.failed} failed)`}
              </p>
              {resultSummary.results?.details?.[0]?.simulated && (
                <div className="p-3 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 mt-2 font-medium">
                  ℹ️ <strong>Test/Simulation Mode:</strong> No SMTP credentials found in <code className="font-mono">server/.env</code>. Passes and QR check-in URLs were simulated and recorded in the database. Add <code className="font-mono">SMTP_USER</code> &amp; <code className="font-mono">SMTP_PASS</code> in <code className="font-mono">server/.env</code> to send live emails to actual inboxes.
                </div>
              )}
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Confirmed</span>
              <div className="text-xl font-black text-slate-900 mt-1">{confirmedAttendees.length}</div>
              <span className="text-[11px] text-slate-500">Eligible registered delegates</span>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Pass Already Sent</span>
              <div className="text-xl font-black text-emerald-700 mt-1">{alreadySentCount}</div>
              <span className="text-[11px] text-emerald-600/80">Received QR code pass</span>
            </div>
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4">
              <span className="text-[11px] font-bold text-brand-red uppercase tracking-wider">Awaiting Pass</span>
              <div className="text-xl font-black text-brand-red mt-1">{unsentConfirmed.length}</div>
              <span className="text-[11px] text-red-600/80">Pending email delivery</span>
            </div>
          </div>

          {/* Send Criteria Radio */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recipient Targeting</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${mode === 'unsent' ? 'border-brand-red bg-red-50/30' : 'border-slate-200 hover:bg-slate-50'}`}>
                <input
                  type="radio"
                  name="sendMode"
                  value="unsent"
                  checked={mode === 'unsent'}
                  onChange={() => handleModeChange('unsent')}
                  className="mt-0.5 text-brand-red focus:ring-brand-red"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Unsent Only ({unsentConfirmed.length})</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Send only to confirmed attendees who haven't received their QR pass yet (Recommended).</div>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${mode === 'all' ? 'border-brand-red bg-red-50/30' : 'border-slate-200 hover:bg-slate-50'}`}>
                <input
                  type="radio"
                  name="sendMode"
                  value="all"
                  checked={mode === 'all'}
                  onChange={() => handleModeChange('all')}
                  className="mt-0.5 text-brand-red focus:ring-brand-red"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">All Confirmed ({confirmedAttendees.length})</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Force re-send or send to all confirmed delegates regardless of prior delivery.</div>
                </div>
              </label>
            </div>
          </div>

          {/* Attendees Selection Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3">
                <span>Recipients ({selectedIds.size} of {targetList.length} selected)</span>
                <div className="space-x-2 text-[11px] font-semibold text-brand-red">
                  <button onClick={selectAll} className="hover:underline">Select All</button>
                  <span>•</span>
                  <button onClick={deselectAll} className="hover:underline">Deselect All</button>
                </div>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 text-xs">
              {targetList.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="font-bold text-slate-700">No attendees match this filter</p>
                  <p className="text-[11px]">All confirmed delegates have already received their passes.</p>
                </div>
              ) : targetList.map(cand => {
                const id = cand._id || cand.id;
                const isSelected = selectedIds.has(id);
                return (
                  <div
                    key={id}
                    className={`px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isSelected ? 'bg-slate-50/40' : 'opacity-60'}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(id)}
                        className="rounded text-brand-red focus:ring-brand-red"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{cand.fullName}</span>
                          <span className="text-[11px] text-brand-red font-semibold bg-red-50 px-2 py-0.5 rounded">
                            {cand.jobRole}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-mono">{cand.workEmail}</span>
                          <span>•</span>
                          <span className="font-medium text-slate-700">{cand.companyName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {cand.emailSent ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          <CheckCircle2 className="w-3 h-3" />
                          Sent
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                          Pending
                        </span>
                      )}

                      <button
                        onClick={() => onPreviewEmail && onPreviewEmail(cand)}
                        title="Preview personalized email"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            {sending ? (
              <span className="flex items-center gap-2 text-brand-red font-bold animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                {progressMsg}
              </span>
            ) : (
              <span>Ready to send to <strong>{selectedIds.size}</strong> candidate(s)</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={sending}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              {resultSummary ? 'Done' : 'Cancel'}
            </button>

            <button
              onClick={handleSend}
              disabled={sending || selectedIds.size === 0}
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-brand-red hover:bg-brand-redHover transition-colors flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {sending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send {selectedIds.size} QR Passes
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
