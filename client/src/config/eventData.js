/**
 * Centralized Event Content Configuration
 * You can easily modify any texts, dates, speakers, and images here or via server/data/event.json
 */
export const defaultEventConfig = {
  hero: {
    invitationTag: "YOU'RE INVITED TO",
    titlePrefix: "SOLIDWORKS",
    titleHighlight: "Innovation Day 2026",
    tagline: "Smarter Design. Faster Innovation.",
    description: "Discover the latest **AI-powered SOLIDWORKS innovations** across design, manufacturing, simulation, and data management.",
    ctaText: "REGISTER NOW",
    heroImage: "/assets/robotic-arm.png"
  },
  info: {
    dates: "November 5, 2026",
    time: "10:00 AM – 05:30 PM",
    venueName: "Taj Yeshwantpur, Bengaluru",
    venueAddress: " 2275, Tumkur Main Road, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022",
    mode: "In-Person Event"
  },
  registrationForm: {
    title: "Register Now",
    subtitle: "Secure your spot for this exclusive event.",
    buttonText: "Register Now",
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
      time: "09:00 AM – 10:00 AM",
      title: "Registration & Networking",
      icon: "user"
    },
    {
      id: "ag-2",
      time: "10:00 AM – 11:15 AM",
      title: "SOLIDWORKS 2027 & AI Innovations – What's New",
      icon: "monitor"
    },
    {
      id: "ag-3",
      time: "11:15 AM – 12:15 PM",
      title: "AI Virtual Companions & Simulation Applications",
      icon: "settings"
    },
    {
      id: "ag-4",
      time: "12:15 PM – 01:00 PM",
      title: "Interactive CAD, Q&A & Customer Success Stories",
      icon: "users"
    },
    {
      id: "ag-5",
      time: "01:00 PM – 02:00 PM",
      title: "Networking Lunch & Wrap-Up",
      icon: "utensils"
    }
  ],
  speakers: [
    {
      id: "sp-1",
      name: "Vijay Karthik Dhanapal",
      designation: "Partner Sales Manager, Dassault Systemes",
      photoUrl: "/people/vijay-karthik-dhanapal.png"
    },
    {
      id: "sp-2",
      name: "Ramesh Aravind",
      designation: "Customer Success Specialist",
      photoUrl: "/people/ramesh-aravind.jpg"
    },
    {
      id: "sp-3",
      name: "Mohamed Riswan M",
      designation: "Solution Associate",
      photoUrl: "/people/mohamed-riswan-m.png"
    },
    {
      id: "sp-4",
      name: "Mahendra H",
      designation: "Product Manager, Simulation Solutions",
      photoUrl: "/people/mahendra-h.jpg"
    },
    {
      id: "sp-5",
      name: "Satish Varadharaj",
      designation: "Team Lead - Enterprise Products",
      photoUrl: "/people/satish-varadharaj.jpg"
    }
  ],
  venue: {
    name: "Taj Yeshwantpur, Bengaluru",
    address: " 2275, Tumkur Main Road, Yeshwanthpur Industrial Area, Phase 1, Yeswanthpur, Bengaluru, Karnataka 560022",
    directionsUrl: "https://maps.app.goo.gl/PSs1MH9sjYp7pZjN6",
    imageUrl: "https://pix8.agoda.net/hotelImages/178012/0/cb61a94db44b027d08f067b8d67997da.jpg?ce=2&s=1024x768"
  },
  highlights: [
    {
      id: "hl-1",
      title: "Latest Product Updates",
      icon: "calendar",
      description: "Get first-hand look at SOLIDWORKS 2026 features."
    },
    {
      id: "hl-2",
      title: "Live Demos & Real-World Use Cases",
      icon: "presentation",
      description: "Deep dive into real-world simulation and modeling."
    },
    {
      id: "hl-3",
      title: "Expert Networking",
      icon: "users",
      description: "Connect with 250+ top engineering professionals."
    },
    {
      id: "hl-4",
      title: "Exclusive Customer Stories",
      icon: "award",
      description: "Inspiring transformations from premier companies."
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
    companyTagline: "Your Trusted Digital Solutions Partner"
  }
};
