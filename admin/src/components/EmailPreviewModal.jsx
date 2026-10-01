import React from 'react';
import { X, ExternalLink, Mail, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function EmailPreviewModal({ attendee, onClose, onSend }) {
  if (!attendee) return null;
  const id = attendee._id || attendee.id;
  const previewUrl = api.getEmailPreviewUrl(id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Pass Preview: {attendee.fullName}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                  {attendee.jobRole}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">To: {attendee.workEmail}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              title="Open full page preview"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Email Preview Frame */}
        <div className="flex-1 bg-slate-100 p-2 sm:p-4 overflow-hidden">
          <div className="w-full h-full bg-white rounded-2xl shadow-inner border border-slate-200 overflow-hidden">
            <iframe
              src={previewUrl}
              title="Email Pass Preview"
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {attendee.emailSent ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Already sent on {new Date(attendee.emailSentAt).toLocaleDateString()}
              </span>
            ) : (
              <span className="text-amber-600 font-medium">QR Pass not yet sent</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            {onSend && (
              <button
                onClick={() => onSend(id)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-red hover:bg-brand-redHover transition-colors flex items-center gap-2 shadow"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Pass to {attendee.fullName.split(' ')[0]}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
