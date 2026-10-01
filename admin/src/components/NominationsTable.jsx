import React from 'react';
import { Users, Building, Briefcase, Trash2, Mail, CheckCircle2, Clock, Eye, Send, UserCheck } from 'lucide-react';

const STATUS_CLS = {
  Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending:   'bg-amber-50  text-amber-700  border-amber-200',
  Attended:  'bg-blue-50   text-blue-700   border-blue-200',
  Cancelled: 'bg-rose-50   text-rose-700   border-rose-200',
};

export default function NominationsTable({
  registrations,
  onStatusChange,
  onDelete,
  onView,
  onSendEmail,
  onPreviewEmail
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-4 px-6">Candidate</th>
              <th className="py-4 px-6">Company &amp; Role</th>
              <th className="py-4 px-6">Phone</th>
              <th className="py-4 px-6">Attendance Status</th>
              <th className="py-4 px-6">QR Pass Email</th>
              <th className="py-4 px-6">Registered</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {registrations.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-14 text-center text-slate-400">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-25" />
                  <p className="font-bold text-slate-700 text-sm">No nominations found</p>
                  <p className="text-xs mt-1">Registrations from the landing page appear here instantly.</p>
                </td>
              </tr>
            ) : registrations.map(reg => {
              const id  = reg._id || reg.id;
              const cls = STATUS_CLS[reg.status] || STATUS_CLS.Confirmed;
              const isAttended = reg.status === 'Attended';
              const isConfirmed = reg.status === 'Confirmed' || isAttended;

              return (
                <tr key={id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Candidate */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{reg.fullName}</div>
                    <div className="font-mono text-slate-400 text-[11px] mt-0.5">{reg.workEmail}</div>
                  </td>

                  {/* Company & Role */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{reg.companyName}</span>
                      {reg.city && (
                        <span className="text-slate-400 text-xs font-normal">({reg.city})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{reg.jobRole}</span>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="py-4 px-6 font-mono text-slate-600">{reg.phoneNumber}</td>

                  {/* Status & Attendance */}
                  <td className="py-4 px-6">
                    <div className="space-y-1.5">
                      <select
                        value={reg.status || 'Confirmed'}
                        onChange={e => onStatusChange(id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer ${cls}`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Attended">Attended</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      {isAttended && reg.attendedAt && (
                        <div className="flex items-center gap-1 text-[10px] text-blue-600 font-semibold">
                          <UserCheck className="w-3 h-3" />
                          <span>Scanned {new Date(reg.attendedAt).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* QR Pass Email */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {reg.emailSent ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <Clock className="w-3 h-3 text-slate-400" />
                          Not Sent
                        </span>
                      )}

                      {/* Quick Send / Resend button */}
                      {onSendEmail && isConfirmed && (
                        <button
                          onClick={() => onSendEmail(reg)}
                          title={reg.emailSent ? 'Resend QR Pass' : 'Send QR Pass Email'}
                          className="p-1 rounded-lg text-slate-400 hover:text-brand-red hover:bg-red-50 transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    {reg.emailSentAt && (
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(reg.emailSentAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </td>

                  {/* Registered Date */}
                  <td className="py-4 px-6 text-slate-500 text-[11px]">
                    {new Date(reg.createdAt).toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' })}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right space-x-1.5">
                    {onPreviewEmail && (
                      <button
                        onClick={() => onPreviewEmail(reg)}
                        title="Preview personalized email & QR pass"
                        className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold transition-colors inline-flex items-center"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onView(reg)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onDelete(id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors inline-flex items-center"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
