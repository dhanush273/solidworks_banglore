import React, { useState } from 'react';
import { X, Mail, CheckCircle2, QrCode, ExternalLink, Copy, Check, Clock, UserCheck } from 'lucide-react';
import { api } from '../services/api';

const STATUS_COLOR = {
  Confirmed: 'text-emerald-600',
  Pending:   'text-amber-600',
  Attended:  'text-blue-600',
  Cancelled: 'text-rose-600',
};

export default function AttendeeModal({ attendee, onClose, onSendEmail, onPreviewEmail, onCheckin }) {
  if (!attendee) return null;
  const id = attendee._id || attendee.id;
  const checkinUrl = api.getCheckinUrl(id);
  const [copied, setCopied] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const copyCheckinUrl = () => {
    navigator.clipboard.writeText(checkinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = async () => {
    try {
      setSendingEmail(true);
      if (onSendEmail) {
        await onSendEmail(attendee);
      }
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-5">
          <div>
            <h3 className="text-lg font-black text-slate-900">Delegate Pass &amp; Details</h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              ID: {id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Attendee Info Card */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Full Name</label>
            <p className="text-base font-bold text-slate-900 mt-0.5">{attendee.fullName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Work Email</label>
              <p className="font-mono text-slate-800 mt-0.5 break-all">{attendee.workEmail}</p>
            </div>
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Phone</label>
              <p className="font-mono text-slate-800 mt-0.5">{attendee.phoneNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Company</label>
              <p className="font-bold text-slate-800 mt-0.5">{attendee.companyName}</p>
            </div>
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">City</label>
              <p className="font-bold text-slate-800 mt-0.5">{attendee.city || '—'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Designation</label>
              <p className="font-bold text-slate-800 mt-0.5">{attendee.jobRole}</p>
            </div>
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Status</label>
              <p className={`font-bold mt-0.5 ${STATUS_COLOR[attendee.status] || 'text-slate-700'}`}>
                {attendee.status}
              </p>
            </div>
          </div>

          {/* QR Code & Attendance Check-in Section */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                <QrCode className="w-4 h-4 text-brand-red" />
                Attendance QR Pass
              </span>
              {attendee.status === 'Attended' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  <UserCheck className="w-3.5 h-3.5" />
                  Checked In
                </span>
              ) : (
                <span className="text-[11px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                  Not Scanned
                </span>
              )}
            </div>

            {attendee.attendedAt && (
              <p className="text-[11px] text-blue-700">
                Attendance marked at: <strong>{new Date(attendee.attendedAt).toLocaleString()}</strong>
              </p>
            )}

            {/* Checkin URL Bar */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={checkinUrl}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] font-mono text-slate-600 select-all"
              />
              <button
                onClick={copyCheckinUrl}
                className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition"
                title="Copy Check-in URL"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={checkinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition"
                title="Open Check-in Page"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Email Status Details */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
              <span className="text-slate-500">QR Pass Email:</span>
              {attendee.emailSent ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Sent {attendee.emailSentAt ? `on ${new Date(attendee.emailSentAt).toLocaleDateString()}` : ''}
                </span>
              ) : (
                <span className="text-amber-700 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-500" />
                  Not Sent Yet
                </span>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            Registered On: {new Date(attendee.createdAt).toLocaleString()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {onPreviewEmail && (
              <button
                onClick={() => onPreviewEmail(attendee)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Preview Email
              </button>
            )}

            {attendee.status !== 'Attended' && onCheckin && (
              <button
                onClick={() => onCheckin(id)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
              >
                Mark Attended
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onSendEmail && (
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail}
                className="px-4 py-2 rounded-xl bg-brand-red hover:bg-brand-redHover text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow disabled:opacity-50"
              >
                <Mail className="w-3.5 h-3.5" />
                {sendingEmail ? 'Sending...' : (attendee.emailSent ? 'Resend Pass' : 'Send QR Pass')}
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
