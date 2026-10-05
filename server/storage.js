import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');
const EVENT_FILE = path.join(DATA_DIR, 'event.json');

export const defaultEventData = {
  hero: {
    invitationTag: "YOU'RE INVITED TO",
    titlePrefix: "EXPLORE SOLIDWORKS 2027",
    titleHighlight: "at SOLIDWORKS Innovation Day 2026",
    tagline: "AI is transforming engineering. Are you ready?",
    description: "Discover the latest **AI-powered SOLIDWORKS innovations** across design, manufacturing, simulation, and data management.",
    ctaText: "SAVE YOUR SPOT",
    heroImage: "/assets/robotic-arm.png"
  },
  info: {
    dates: "November 5, 2026",
    time: "09:00 AM – 05:30 PM",
    venueName: "Taj Yeshwantpur, Bengaluru",
    venueAddress: " 2275, Tumkur Main Road, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022",
    mode: "In-Person Event"
  },
  registrationForm: {
    title: "Save Your Spot",
    subtitle: "Secure your spot for this exclusive event.",
    buttonText: "Save Your Spot",
    roles: [
      "CEO/Director/MD",
      "Design Engineer",
      "CAD / Mechanical Engineer",
      "R&D Manager / Lead",
      "Engineering Director",
      "Manufacturing Specialist",
      "Academic / Student",
      "Other"
    ]
  },
  agenda: [
    {
      id: "ag-1",
      time: "09:00 AM",
      title: " Opening Video",
      icon: "user",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-2",
      time: "10:03 AM – 11:10 AM",
      title: "Introduction & Welcome Note",
      icon: "monitor",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-3",
      time: "10:10 AM – 10:35 AM",
      title: "Growth Mindset in the Age of AI",
      icon: "ai",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-4",
      time: "10:35 AM – 11:00 AM",
      title: "AI in SOLIDWORKS: Powering Next era of Engineering",
      icon: "ai",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-5",
      time: "11:00 AM – 11:30 AM",
      title: "What's New in SOLIDWORKS 2027 – Part 1 (CAD, SIM, PDM)",
      icon: "monitor",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-6",
      time: "11:30 AM – 12:00 PM",
      title: "Tea / Coffee Break",
      icon: "utensils",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-7",
      time: "12:00 PM – 12:40 PM",
      title: "What's New in SOLIDWORKS 2027 – Part 2 (Collaboration, Cloud Services)", 
      icon: "monitor",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-8",
      time: "12:40 PM – 01:00 PM",
      title: "Sponsor Presentation/ Customer Case Study: 1",
      icon: "settings",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-9",
      time: "01:00 PM – 02:00 PM",
      title: "Lunch Break",
      icon: "utensils",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-10",
      time: "02:00 PM – 02:45 PM",
      title: "Panel Discussion",
      icon: "monitor",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-11",
      time: "02:45 PM – 03:45 PM",
      title: "Mainstream Innovation with 3DEXPERIENCE (Design / SIM / Governance)",
      icon: "monitor",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-12",
      time: "03:45 PM – 04:15 PM",
      title: "Tea / Coffee Break",
      icon: "utensils",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-13",
      time: "04:15 PM – 04:45 PM",
      title: "Elevate to Next-Gen Technical Communication Solutions (Composer, Visualize, DraftSight)",
      icon: "settings",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-14",
      time: "04:45 PM – 05:05 PM",
      title: "Customer Case Study: 2",
      icon: "settings",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-15",
      time: "05:05 PM – 05:15 PM",
      title: "Conclusion & Wrap-Up",
      icon: "users",
      badgeColor: "bg-red-500"
    }
  ],
  speakers: [
     {
      id: "sp-1",
      name: "Arun Stevenson ",
      designation: "Sr. Partner Sales Manager,  Dassault Systemes",
      photoUrl: "/people/Arun Stevenson.jpg"
    },
     {
      id: "sp-2",
      name: "Divakar G M ",
      designation: "Industry Consultant Manager, Dassault Systemes",
      photoUrl: "/people/Divakar G M.jpg"
    },
    {
      id: "sp-3",
      name: "Sangeetram K R ",
      designation: "Lead – Presales,  Conceptia Konnect",
      photoUrl: "/people/Sangeetram K R.jpg"
    },
     {
      id: "sp-4",
      name: "Amit S Neeralagi ",
      designation: "Solution Specialist,  Conceptia Konnect",
      photoUrl: "/people/Amit S Neeralagi.jpg"
    },
     {
      id: "sp-5",
      name: "Mahendra H",
      designation: "PSr. Partner Sales Manager, Dassault Systemes",
      photoUrl: "/people/mahendra-h.jpg"
    },
    {
      id: "sp-6",
      name: "Dr. Sushma Shankarappa ",
      designation: "Solution Specialist - CST, Conceptia Konnect",
      photoUrl: "/people/Dr. Sushma Shankarappa.jpg"
    },
    {
      id: "sp-7",
      name: "Satish Varadharaj",
      designation: "Team Lead,  Conceptia Konnect",
      photoUrl: "/people/satish-varadharaj.jpg"
    },
    {
      id: "sp-8",
      name: "Ashok Kumar B ",
      designation: "Country Technical Head,  SolidCAM",
      photoUrl: "/people/Ashok Kumar B.jpg"
    },
   
  ],
  venue: {
    name: "Taj Yeshwantpur, Bengaluru",
    address: " 2275, Tumkur Main Road, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022",
    directionsUrl: "https://maps.app.goo.gl/Cz3v7Vz3eQxamHB16",
    imageUrl: "https://pix8.agoda.net/hotelImages/178012/0/cb61a94db44b027d08f067b8d67997da.jpg?ce=2&s=1024x768"
  },
  highlights: [
    {
      id: "hl-1",
      title: "AI-powered design tools",
      icon: "sparkles",
      description: "Enhance your everyday workflow with intelligent AI assistance."
    },
    {
      id: "hl-2",
      title: "Latest SOLIDWORKS 2027 features",
      icon: "presentation",
      description: "Test-drive the newest tools and capabilities."
    },
    {
      id: "hl-3",
      title: "Best practices & expert tips",
      icon: "award",
      description: "Learn from SOLIDWORKS professionals."
    },
    {
      id: "hl-4",
      title: "Connect with peers",
      icon: "users",
      description: "Network with engineers and professionals in your area."
    },
    {
      id: "hl-5",
      title: "AI Virtual Companions",
      icon: "bot",
      description: "Get intelligent assistance throughout your work."
    },
    {
      id: "hl-6",
      title: "Work smarter & faster",
      icon: "zap",
      description: "Discover how AI can accelerate your design process."
    }
  ],
  partners: {
    eventPartner: {
      name: "SolidCAM",
      tagline: "The Leaders in Integrated CAM",
      logo: "/uploads/SOLIDCAM White Logo-01.png"
    },
    ecosystemBrands: [
      { name: "SOLIDWORKS", logo: "/uploads/solidworks-logo.png" },
      { name: "3DEXPERIENCE", logo: "/uploads/3DEXPERIENCE Logo.png" },
      { name: "SIMULIA", logo: "/uploads/Simulia Abaqus logo.png" },
      { name: "CST Studio Suite", logo: "/uploads/JB_CST-Studio_LOGO.png" },
      { name: "SOLIDWORKS PDM", logo: "/uploads/SOLIDWORKS PDM Logo.png" },
      { name: "SOLIDWORKS Plastics", logo: "/uploads/SOLIDWORKS Plastics.png" },
      { name: "DriveWorks", logo: "/uploads/DriveWorks Logo-02.png" },
      { name: "BOM Creator", logo: "/uploads/BOM-Creator.png" }
    ]
  },
  branding: {
    companyName: "Conceptia KONNECT",
    companyTagline: "Your Trusted Digital Solutions Partner",
    primaryColor: "#dc2626",
    secondaryColor: "#111827"
  }
};

// Helpers for file persistence
function readJSON(file, fallback) {
  try {
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
  }
  return fallback;
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing to ${file}:`, err);
  }
}

// In-file store
export const localStore = {
  getEventData() {
    return readJSON(EVENT_FILE, defaultEventData);
  },
  saveEventData(data) {
    writeJSON(EVENT_FILE, data);
    return data;
  },
  getRegistrations() {
    const list = readJSON(REGISTRATIONS_FILE, []);
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getRegistrationById(id) {
    const list = readJSON(REGISTRATIONS_FILE, []);
    return list.find(r => r._id === id || r.id === id || r.qrCodeToken === id) || null;
  },
  addRegistration(record) {
    const list = readJSON(REGISTRATIONS_FILE, []);
    const id = 'reg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const newRecord = {
      _id: id,
      ...record,
      status: record.status || 'Confirmed',
      emailSent: record.emailSent || false,
      emailSentAt: record.emailSentAt || null,
      attendedAt: record.attendedAt || null,
      qrCodeToken: record.qrCodeToken || id,
      createdAt: new Date().toISOString()
    };
    list.unshift(newRecord);
    writeJSON(REGISTRATIONS_FILE, list);
    return newRecord;
  },
  updateRegistration(id, updateData) {
    const list = readJSON(REGISTRATIONS_FILE, []);
    const index = list.findIndex(r => r._id === id || r.id === id || r.qrCodeToken === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updateData };
      writeJSON(REGISTRATIONS_FILE, list);
      return list[index];
    }
    return null;
  },
  updateRegistrationStatus(id, status) {
    const list = readJSON(REGISTRATIONS_FILE, []);
    const index = list.findIndex(r => r._id === id || r.id === id || r.qrCodeToken === id);
    if (index !== -1) {
      list[index].status = status;
      if (status === 'Attended' && !list[index].attendedAt) {
        list[index].attendedAt = new Date().toISOString();
      }
      writeJSON(REGISTRATIONS_FILE, list);
      return list[index];
    }
    return null;
  },
  deleteRegistration(id) {
    let list = readJSON(REGISTRATIONS_FILE, []);
    const initialLen = list.length;
    list = list.filter(r => r._id !== id && r.id !== id && r.qrCodeToken !== id);
    writeJSON(REGISTRATIONS_FILE, list);
    return list.length < initialLen;
  }
};
