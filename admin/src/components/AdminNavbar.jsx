import React from 'react';
import { Download, RefreshCw, Mail } from 'lucide-react';
import { api } from '../services/api';

export default function AdminNavbar({ loading, onRefresh, onOpenBulkEmail }) {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white">
              SOLIDWORKS Innovation Day&nbsp;
            </span>
            <span className="text-brand-red font-extrabold">2026</span>
            <span className="ml-2 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenBulkEmail}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide shadow-md transition-all hover:scale-[1.02]"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send QR Passes</span>
          </button>

          <a
            href={api.getExportCsvUrl()}
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold uppercase tracking-wider shadow transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </a>

          <button
            onClick={onRefresh}
            title="Refresh"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </div>
    </header>
  );
}
