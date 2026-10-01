# innovation-eventt
# SOLIDWORKS Innovation Day 2026 - MERN Architecture

This project is organized into **3 independent folders**:

```
d:\Innovation\
├── client\     # Public Event Landing Page (Vite + React + Tailwind) -> http://localhost:3000
├── admin\      # Standalone Admin Portal (Vite + React + Tailwind)     -> http://localhost:3001
└── server\     # Express & Mongoose API + Persistent Storage           -> http://localhost:5000
```

---

## 🚀 Live Access URLs

- **Public Event Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Standalone Admin Dashboard**: [http://localhost:3001](http://localhost:3001)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 🛠️ How to Run

### From the root folder (`d:\Innovation`):
```bash
# Start backend server (Port 5000)
npm run server

# Start public client (Port 3000)
npm run client

# Start admin dashboard (Port 3001)
npm run admin
```

### Or run individually:
```bash
# Terminal 1 - Server:
cd server
node server.js

# Terminal 2 - Public Client:
cd client
npm run dev

# Terminal 3 - Admin Portal:
cd admin
npm run dev
```

---

## 📁 Folder Responsibilities

1. **`client/`**:
   - Clean, 100% attendee-focused landing page matching the flyer.
   - Dynamic registration form, live submission, and calendar invite download.
   - Zero admin links or clutter.

2. **`admin/`**:
   - Independent dashboard dedicated to nomination tracking.
   - Real-time KPI summary (Total, Confirmed, Pending, Attended).
   - Search by name/email/company, filter by role/status.
   - Status updates, candidate profile view, and one-click CSV export.

3. **`server/`**:
   - REST API for `/api/event`, `/api/registrations`, `/api/upload`.
   - Mongoose database integration with automatic local persistent storage fallback.
