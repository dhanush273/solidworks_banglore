import React, { useState, useEffect } from 'react';
import { Phone, Mail, X } from 'lucide-react';

const ECOSYSTEM_LOGOS = [
  {
    id: 'solidworks',
    name: '3DS SOLIDWORKS',
    render: () => (
     <img
      src="/Logos/solidworks-logo.png"
      alt="3DS SOLIDWORKS"
      className="h-12 sm:h-13 md:h-12 w-auto object-contain flex-shrink-0"
    />
    )
  },
  {
    id: '3dexperience',
    name: '3DEXPERIENCE',
    render: () => (
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <img
          src="/Logos/3DEXPERIENCE circle logo.png"
          alt="3DEXPERIENCE Compass"
          className="h-7 sm:h-8 md:h-8.5 w-auto object-contain flex-shrink-0"
        />
        <img
          src="/Logos/3DEXPERIENCE Logo (2).png"
          alt="3DEXPERIENCE"
          className="h-4 sm:h-4.5 md:h-5 w-auto object-contain"
        />
      </div>
    )
  },
  {
    id: 'bom-creator',
    name: 'BOM Creator',
    render: () => (
      <img
        src="/Logos/BOM-Creator.png"
        alt="BOM Creator"
        className="h-12 sm:h-13 md:h-12 w-auto object-contain flex-shrink-0"
      />
    )
  },
  {
    id: 'cst-studio',
    name: 'CST STUDIO SUITE',
    render: () => (
     <img
      src="/Logos/JB_CST-Studio_LOGO.png"
      alt="CST STUDIO SUITE"
      className="h-12 sm:h-13 md:h-12 w-auto object-contain flex-shrink-0"
    />
    )
  },
  {
    id: 'solidworks-pdm',
    name: 'SOLIDWORKS PDM',
    render: () => (
      <img
        src="/Logos/SOLIDWORKS PDM Logo.png"
        alt="SOLIDWORKS PDM"
        className="h-6 sm:h-7 md:h-8 w-auto object-contain flex-shrink-0"
      />
    )
  },
  {
    id: 'driveworks',
    name: 'DriveWorks',
    render: () => (
      <img
        src="/Logos/DriveWorks Logo-01.png"
        alt="DriveWorks"
        className="h-8 sm:h-9 md:h-10 w-auto object-contain flex-shrink-0"
      />
    )
  },
  {
    id: 'solidworks-plastics',
    name: 'SOLIDWORKS Plastics',
    render: () => (
        <img
          src="/Logos/SOLIDWORKS Plastics.png"
          alt="SOLIDWORKS Plastics"
          className="h-14 sm:h-15 md:h-12 w-auto object-contain flex-shrink-0"
        />
    )
  },
  {
    id: 'simulia',
    name: '3DS SIMULIA',
    render: () => (
      <img
        src="/Logos/Simulia Abaqus logo.png"
        alt="3DS SIMULIA"
        className="h-9 sm:h-10 md:h-8.5 w-auto object-contain flex-shrink-0"
      />
    )
  },
];

export default function PartnersFooter({ partners, branding }) {
  const [showSupport, setShowSupport] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Close modals on Escape key & handle body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSupport(false);
        setShowPrivacy(false);
      }
    };
    if (showSupport || showPrivacy) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showSupport, showPrivacy]);

  return (
    <footer>
      {/* 1. Upper Section: Partners & Marquee Logos (PURE WHITE BACKGROUND, COMPACT) */}
      <div className="bg-white border-t border-slate-200 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            
            {/* Left: Our Event Partner SolidCAM (CONSTANT / STATIC) */}
            <div className="flex flex-col items-center lg:items-start gap-1 flex-shrink-0 z-10">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#00589a]">
                Our Event Partner
              </span>
              
              {/* SolidCAM Logo */}
              <div className="flex items-center group transition-transform duration-200 hover:scale-[1.02]">
                <div className="relative flex items-center">
                  <img
                    src="/Logos/SOLIDCAM Png Logo (Red Color).png"
                    alt="SolidCAM - The Leaders in Integrated CAM"
                    className="h-16 sm:h-18 md:h-16 w-auto max-w-[240px] sm:max-w-[260px] object-contain drop-shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Vertical Divider separating SolidCAM from marquee */}
            <div className="hidden lg:block w-px h-10 bg-slate-200 mx-2 lg:mx-4 flex-shrink-0 self-center"></div>

            {/* Right: Infinite Marquee for Ecosystem Logos on White Background */}
            <div className="flex-1 w-full min-w-0 overflow-hidden relative py-1">
              
              {/* Edge Fade Gradients for white background */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none hidden sm:block"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none hidden sm:block"></div>

              {/* Marquee Track */}
              <div className="animate-marquee flex items-center gap-7 sm:gap-9 lg:gap-11">
                {[0, 1].map((setIndex) => (
                  <div 
                    key={`marquee-set-${setIndex}`}
                    className="flex items-center gap-7 sm:gap-9 lg:gap-11 flex-shrink-0"
                    aria-hidden={setIndex === 1 ? 'true' : undefined}
                  >
                    {ECOSYSTEM_LOGOS.map((item) => (
                      <div 
                        key={`${item.id}-${setIndex}`}
                        className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0 cursor-pointer"
                      >
                        {item.render()}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Bottom Section: Copyright & Legal Strip with Contact Support (REFERENCE BLUE BACKGROUND) */}
      <div className="relative bg-[#00589a] text-white py-4 sm:py-5 border-t border-[#00487e] overflow-hidden">
        {/* Dynamic Angled Red Wing Accent matching the flyer */}
        <div 
          className="absolute top-0 right-0 h-full w-28 sm:w-40 md:w-56 bg-gradient-to-l from-red-600/90 to-brand-red pointer-events-none opacity-85 hidden sm:block"
          style={{ clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 0% 100%)' }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between text-xs text-blue-100/90 gap-4">
            <div>
              © 2026 {branding?.companyName || 'Conceptia KONNECT'}. All rights reserved. Authorized Reseller for Dassault Systèmes SOLIDWORKS.
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-5">
              {/* Privacy Policy Button (Opens modal on click) */}
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="hover:text-white cursor-pointer transition-colors focus:outline-none"
              >
                Privacy Policy
              </button>
              <span className="text-blue-300/40">•</span>
              {/* Contact Event Support Button (Opens modal on click) */}
              <button
                type="button"
                onClick={() => setShowSupport(true)}
                className="hover:text-white cursor-pointer transition-colors focus:outline-none"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Modal (Only visible when clicked) */}
      {showSupport && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowSupport(false)}
        >
          <div 
            className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>
                <h3 className="font-extrabold text-base text-slate-900">
                  Contact Support
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSupport(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2.5 mb-4">
              Have questions regarding registration, agenda, or venue? Reach out to our event support team:
            </p>

            {/* Contact Channels */}
            <div className="space-y-3">
              {/* Phone */}
              <a
                href="tel:+919590506408"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 hover:bg-red-50/70 border border-slate-100 hover:border-red-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 text-[#bb221a] flex items-center justify-center flex-shrink-0 group-hover:bg-[#bb221a] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4 fill-current" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#bb221a] transition-colors">
                    Call Support
                  </span>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-[#bb221a] transition-colors">
                    +91 9590 506 408
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:marketing@ckonnect.in"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 hover:bg-red-50/70 border border-slate-100 hover:border-red-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 text-[#bb221a] flex items-center justify-center flex-shrink-0 group-hover:bg-[#bb221a] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#bb221a] transition-colors">
                    Email Support
                  </span>
                  <span className="text-sm font-bold text-slate-900 group-hover:text-[#bb221a] transition-colors truncate">
                    marketing@ckonnect.in
                  </span>
                </div>
              </a>
            </div>

            {/* Footer note */}
            <div className="mt-5 pt-3 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400">
                {branding?.companyName || 'Conceptia KONNECT'} • Authorized SOLIDWORKS Reseller
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal (Only visible when clicked) */}
      {showPrivacy && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowPrivacy(false)}
        >
          <div 
            className="relative w-full max-w-2xl lg:max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-100 text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                    Privacy Policy
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    Conceptia Software Technologies Private Limited
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacy(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Policy Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-[calc(90vh-130px)]">
              <div className="space-y-2">
                <p>
                  Conceptia Software Technologies Limited (Conceptia) and its product sales division <strong>CONCEPTIA KONNECT (CKONNECT)</strong> would like to thank you for visiting our website. We know many visitors have questions regarding the privacy of their interactions with CKONNECT. We hope this privacy policy statement will answer any questions you may have, but if it does not, please feel free to contact us at the email address or postal address shown below.
                </p>
                <p>
                  We would like to bring to your notice that the products we sell are mainly engineering software applications and human interface devices for usage in product design and manufacturing environment and can be used only by trained design professionals. These products are not considered as general consumer products.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Personal Data</h4>
                <p>
                  Through our Websites and pages CKONNECT will not collect any personal data about you (e.g. your name, address, telephone number or e-mail address), unless you voluntarily choose to provide us with it (e.g. by registration for events seminars or webinars, request for information on products and services we offer, periodic survey, information provided for availing technical support), respectively.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Usage of Your Personal Information Provided to CKONNECT</h4>
                <p>
                  When you do provide us with personal data, we usually use it to respond to your inquiry, process your order or provide you access to specific information or offers. Also, to support our customer relationship with you we conduct periodic survey about the quality of services provided by us and also to understand any suggestions from the contact. Additionally CKONNECT may use the personal information thus gathered you provided us for a variety of purposes, including invitation for seminars and online events, conducting customer satisfaction surveys and other feedback surveys and or product and services marketing campaign. We may use the information to inform you of special offers, contests, upgrades, and other software products and services that may be of interest to you.
                </p>
                <p>
                  If you do not wish to receive further communications and information from CKONNECT please let us know by emailing <a href="mailto:events@ckonnect.in" className="text-[#00589a] font-medium underline hover:text-[#bb221a]">events@ckonnect.in</a> and we will respect your wishes. We also contain instructions as to how you can opt-out of future email communications in the communications we send to you.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Providing Information in the Website</h4>
                <p>
                  Occasionally you may be asked to give us more specific information about yourself, such as when you download software, request for a product demonstration, request for training of software or hardware, request for technical support, request for pricing information, viewing product videos, downloading brochures or data sheets or any product specific details, register for a seminar or any other event, respond to a survey, enter a contest from our website, and register at the customer portal. Supplying such information to us is optional, but you may be unable to complete certain transactions without giving such information.
                </p>
                <p>
                  CKONNECT provides various community activities to its users, including discussion forums and blogs. Participation in these activities is voluntary and it is very likely that personal information will be exposed to other members of the community if you participate. DS SolidWorks takes no responsibility for maintaining the privacy of any personal information you make available to members of any community identified as such on the website. Our website includes social media features, such as the Facebook Like button and widgets, such as the Share button or interactive mini-programs that run on our site including link to Youtube videos, Linkedin pages etc. You should be aware that any information you provide in these areas may be read, collected, and used by others who access them. These features may collect your IP address and which page you are visiting on our site, and may set a cookie to enable the feature to function properly. Social media features and widgets are either hosted by a third party or hosted directly on our site. Your interactions with these features are governed by the privacy policy of the company providing the features.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Use of Your Personal Information Provided to Other Websites</h4>
                <p>
                  On our websites, we may have links to other websites or you are referred to our website through a link from another website. As you can imagine, we cannot be responsible for the privacy policies and practices of other websites. Such content is subject to their terms of use and any additional guidelines and privacy information provided in relation to that use on their website.
                </p>
                <p>
                  We recommend that you check the policy of each website you visit to better understand your rights and obligations especially when you are submitting any type of content on those third party website. Please contact the owner or operator of such website if you have any concerns or questions.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Information Collected via Marketing Activities</h4>
                <p>
                  CKONNECT conducts many different marketing activities by which it may collect your personal information. For example, we collect contact information at trade shows, seminars, webinars, and we invite the public to watch videos or download product related information from our website in return for providing us contact information, we run contests for which participants may provide basic information about themselves, and we obtain addresses from publications that target the industries from which we hope to attract customers. CKONNECT will never share the data collected from our website including your personal information which you have disclosed to any of the third party either free or as a paid service except if required by law or if CKONNECT believes in good faith that such disclosure is reasonably necessary to comply with legal process (for example, a warrant, protect the rights, property, or personal safety of CKONNECT, our customers or the public).
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Visiting Our Websites</h4>
                <p>
                  In general, you can visit CKONNECT website without telling us who you are or revealing any personal information about yourself, such as your name, phone number, or postal or email address. We don’t track or intend to collect the identity of person accessing our website. Our web server collects IP addresses to obtain certain aggregate information concerning the use of our website. An IP address is a number that is automatically assigned to your computer whenever you’re surfing the web. We do not link IP addresses to any personally identifiable information. Therefore you can remain anonymous when you visit our website.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Security of Your Personal Data</h4>
                <p>
                  As we value your personal information, we will ensure an adequate level of protection. We have therefore implemented technology and policies with the objective of protecting your privacy from unauthorized access and improper use and will update these measures as new technology becomes available, as appropriate.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Questions or Concerns</h4>
                <p className="text-slate-600">
                  We hope this policy statement helps you understand CKONNECT practices with respect to your personal and business information. If you have any questions or concerns, please contact us at:
                </p>
                <div className="mt-2 text-slate-700 space-y-1">
                  <p className="font-medium">
                    Conceptia Konnect, #22, 100 Feet Ring Road, 6th Block, 3rd Phase, Banashankari 3rd Stage, Bangalore, 560085, India.
                  </p>
                  <p className="text-slate-500">
                    Kind Attn: Director Sales & Service
                  </p>
                  <p>
                    Email: <a href="mailto:events@ckonnect.in" className="text-[#bb221a] font-semibold underline hover:text-red-700">events@ckonnect.in</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-6 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-2xl flex-shrink-0">
              <span className="text-[11px] text-slate-400">
                {branding?.companyName || 'Conceptia KONNECT'} • Authorized SOLIDWORKS Reseller
              </span>
              <button
                type="button"
                onClick={() => setShowPrivacy(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}