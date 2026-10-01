import React from 'react';
import { Search } from 'lucide-react';

const ROLES = [
  'Design Engineer', 'CAD / Mechanical Engineer', 'R&D Manager / Lead',
  'Engineering Director', 'Manufacturing Specialist', 'Academic / Student', 'Other'
];

export default function FiltersBar({ search, onSearch, statusFilter, onStatus, roleFilter, onRole }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      
      {/* Search */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search name, email, company..."
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Status</span>
          <select
            value={statusFilter}
            onChange={e => onStatus(e.target.value)}
            className="text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Attended">Attended</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Role</span>
          <select
            value={roleFilter}
            onChange={e => onRole(e.target.value)}
            className="text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 cursor-pointer max-w-[180px]"
          >
            <option value="All">All Roles</option>
            {ROLES.map((r, i) => <option key={i} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

    </div>
  );
}
