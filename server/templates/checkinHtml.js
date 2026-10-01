/**
 * Generates mobile-friendly responsive HTML for the check-in confirmation page
 */
export function renderCheckinPage({ attendee, alreadyAttended = false, error = null }) {
  if (error || !attendee) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Badge Invalid - SOLIDWORKS Innovation Day</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 min-h-screen flex items-center justify-center p-4 font-sans text-slate-800">
  <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-rose-100 text-center">
    <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
      ✕
    </div>
    <h1 class="text-xl font-black text-slate-900 mb-2">Invalid or Expired Badge</h1>
    <p class="text-slate-500 text-sm mb-6">${error || 'The scanned QR code does not correspond to an active registration record.'}</p>
    <div class="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 mb-6">
      Please contact the registration helpdesk at the venue entrance.
    </div>
    <a href="/" class="inline-block px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition">
      Return to Home
    </a>
  </div>
</body>
</html>`;
  }

  const checkinTime = attendee.attendedAt
    ? new Date(attendee.attendedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const checkinDate = attendee.attendedAt
    ? new Date(attendee.attendedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${alreadyAttended ? 'Already Checked-in' : 'Attendance Confirmed'} - SOLIDWORKS Innovation Day 2026</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes checkmark {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-check {
      animation: checkmark 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
  </style>
</head>
<body class="bg-gradient-to-br from-slate-900 via-slate-800 to-[#002b49] min-h-screen flex items-center justify-center p-4 font-sans text-slate-800">
  <div class="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
    
    <!-- Top Event Header -->
    <div class="bg-[#002b49] p-6 text-center text-white relative">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
        <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        SOLIDWORKS Innovation Day 2026
      </div>
      <h2 class="text-xs uppercase tracking-widest text-slate-300 font-semibold">Attendee Verification</h2>
    </div>

    <!-- Status Badge & Icon -->
    <div class="p-8 text-center">
      ${
        alreadyAttended
          ? `
          <div class="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black shadow-inner">
            ✓
          </div>
          <span class="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Already Checked In
          </span>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">Pass Already Verified</h1>
          <p class="text-slate-500 text-xs mt-1">This badge was verified at ${checkinTime} on ${checkinDate}.</p>
          `
          : `
          <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black shadow-inner animate-check">
            ✓
          </div>
          <span class="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Attendance Marked
          </span>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">Welcome to the Event!</h1>
          <p class="text-slate-500 text-xs mt-1">Your attendance has been recorded successfully.</p>
          `
      }

      <!-- Attendee Pass Info Card -->
      <div class="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3">
        <div class="flex items-center justify-between border-b border-slate-200/60 pb-3">
          <span class="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Candidate</span>
          <span class="text-emerald-700 font-bold text-[11px] bg-emerald-100 px-2 py-0.5 rounded">Checked In</span>
        </div>

        <div>
          <h3 class="text-lg font-black text-slate-900">${attendee.fullName}</h3>
          <p class="text-xs font-bold text-red-600">${attendee.jobRole}</p>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
          <div>
            <span class="text-slate-400 font-bold block text-[10px] uppercase">Company</span>
            <span class="font-bold text-slate-800">${attendee.companyName}</span>
          </div>
          <div>
            <span class="text-slate-400 font-bold block text-[10px] uppercase">Work Email</span>
            <span class="font-mono text-slate-700 text-[11px] truncate block">${attendee.workEmail}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
          <div>
            <span class="text-slate-400 font-bold block text-[10px] uppercase">Check-in Time</span>
            <span class="font-mono text-slate-800 font-semibold">${checkinTime}</span>
          </div>
          <div>
            <span class="text-slate-400 font-bold block text-[10px] uppercase">Location</span>
            <span class="text-slate-700">Hablis Hotel, Guindy</span>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="mt-6 text-xs text-slate-600 bg-blue-50/60 p-4 rounded-xl border border-blue-100">
        <p class="font-bold text-blue-900 mb-1">🎉 You are all set!</p>
        <p class="text-[11px] text-blue-800">Please collect your delegate kit at the reception counter and head to the main auditorium.</p>
      </div>

      <div class="mt-6 text-center">
        <p class="text-[11px] text-slate-400">Conceptia KONNECT • SOLIDWORKS Innovation Day 2026</p>
      </div>
    </div>

  </div>
</body>
</html>`;
}
