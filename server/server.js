import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { dataService } from './services/dataService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving & MIME configuration
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static assets from both public and uploads with explicit mime types
const staticOptions = {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.jfif')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
  }
};

app.use(express.static(publicDir, staticOptions));
app.use('/assets', express.static(path.join(publicDir, 'assets'), staticOptions));
app.use('/assets', express.static(publicDir, staticOptions));
app.use('/Logos', express.static(path.join(publicDir, 'Logos'), staticOptions));
app.use('/logos', express.static(path.join(publicDir, 'logos'), staticOptions));
app.use('/people', express.static(path.join(publicDir, 'people'), staticOptions));
app.use('/uploads', express.static(uploadsDir, staticOptions));
app.use('/uploads', express.static(path.join(publicDir, 'uploads'), staticOptions));

// API Routes
app.use('/api/event', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/upload', uploadRoutes);

// Serve built frontend if client/dist exists (for unified full-stack deployments)
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (
      req.path.startsWith('/api') ||
      req.path.startsWith('/uploads') ||
      req.path.startsWith('/assets') ||
      req.path.startsWith('/Logos') ||
      req.path.startsWith('/logos') ||
      req.path.startsWith('/people')
    ) {
      return next();
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'SOLIDWORKS Innovation Day API'
  });
});

// Seed initial sample registrations if empty
async function seedInitialRegistrations() {
  const existing = await dataService.getAllRegistrations();
  if (existing.length === 0) {
    const samples = [
      {
        fullName: 'Rahul Varma',
        workEmail: 'rahul.varma@tcs.com',
        phoneNumber: '+91 98451 23456',
        companyName: 'Tata Consultancy Services',
        jobRole: 'CAD / Mechanical Engineer',
        status: 'Confirmed'
      },
      {
        fullName: 'Ananya Deshmukh',
        workEmail: 'ananya.d@mahindra.com',
        phoneNumber: '+91 97123 45678',
        companyName: 'Mahindra R&D',
        jobRole: 'R&D Manager / Lead',
        status: 'Confirmed'
      },
      {
        fullName: 'Vipin George',
        workEmail: 'vipin.george@lnttech.com',
        phoneNumber: '+91 94471 89012',
        companyName: 'L&T Technology Services',
        jobRole: 'Design Engineer',
        status: 'Pending'
      }
    ];

    for (const sample of samples) {
      await dataService.createRegistration(sample);
    }
    console.log('[Seed] Added sample nominations for demonstration.');
  }
}

// Start Server
async function startServer() {
  await connectDB();
  await seedInitialRegistrations();

  app.listen(PORT, () => {
    console.log(`🚀 SOLIDWORKS Innovation Day API is running at http://localhost:${PORT}`);
  });
}

startServer();
