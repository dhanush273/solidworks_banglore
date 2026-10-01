import nodemailer from 'nodemailer';
import { qrService } from './qrService.js';
import { dataService } from './dataService.js';

class EmailService {
  constructor() {
    this.transporter = null;
    this.initTransporter();
  }

  initTransporter() {
    const user = process.env.SMTP_USER || process.env.EMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
        tls: { rejectUnauthorized: false }
      });
      console.log(`[Email Service] SMTP Transporter configured (${host}:${port}, user: ${user})`);
    } else {
      this.transporter = null;
      console.log('[Email Service] No SMTP credentials provided. Running in Preview/Simulation mode.');
    }
  }

  isConfigured() {
    return !!(this.transporter && (process.env.SMTP_USER || process.env.EMAIL_USER));
  }

  getFromAddress() {
    return process.env.EMAIL_FROM || process.env.SMTP_FROM || '"SOLIDWORKS Innovation Day 2026" <events@conceptia.in>';
  }

  /**
   * Generates the personalized HTML email template with embedded QR code pass
   */
  generateEmailHtml(attendee, checkinUrl, qrImageSrc = 'cid:entry_pass_qr') {
    const id = attendee._id || attendee.id || 'N/A';
    const fullName = attendee.fullName || 'Valued Attendee';
    const jobRole = attendee.jobRole || 'Engineering Professional';
    const companyName = attendee.companyName || 'Corporate Delegate';
    const city = attendee.city ? ` (${attendee.city})` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Pass for SOLIDWORKS Innovation Day 2026</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:'Segoe UI', Arial, sans-serif; color:#1e293b; -webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f1f5f9" style="padding:24px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:600px; width:100%; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08); border:1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td bgcolor="#002b49" style="padding:28px 32px; background:linear-gradient(135deg, #00172e 0%, #003865 100%); text-align:center;">
              <p style="margin:0 0 6px 0; font-size:12px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#ef4444;">
                OFFICIAL ENTRY PASS
              </p>
              <h1 style="margin:0; font-size:24px; font-weight:900; color:#ffffff; letter-spacing:-0.5px; line-height:1.2;">
                SOLIDWORKS INNOVATION DAY <span style="color:#ef2722;">2026</span>
              </h1>
              <p style="margin:8px 0 0 0; font-size:13px; color:#cbd5e1;">
                AI-Powered Engineering • Design • Simulation • Collaboration
              </p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding:28px 32px 16px;">
              <p style="margin:0 0 10px 0; font-size:18px; font-weight:700; color:#0f172a;">
                Dear ${fullName},
              </p>
              <p style="margin:0 0 16px 0; font-size:14px; line-height:1.6; color:#475569;">
                Your seat for <strong>SOLIDWORKS Innovation Day 2026</strong> has been confirmed! Please find your personalized Digital Badge and Express Check-in QR Code below.
              </p>
            </td>
          </tr>

          <!-- PASS / QR BADGE CONTAINER -->
          <tr>
            <td align="center" style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8fafc" style="border:2px dashed #cbd5e1; border-radius:18px; padding:24px; text-align:center;">
                <tr>
                  <td align="center">
                    
                    <!-- Candidate Details Badge -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
                      <tr>
                        <td align="center">
                          <span style="display:inline-block; padding:4px 12px; background:#e0f2fe; color:#0369a1; border-radius:999px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">
                            Verified Attendee
                          </span>
                          <h2 style="margin:0; font-size:20px; font-weight:800; color:#0f172a;">
                            ${fullName}
                          </h2>
                          <p style="margin:4px 0 0 0; font-size:14px; font-weight:600; color:#ef2722;">
                            ${jobRole}
                          </p>
                          <p style="margin:2px 0 0 0; font-size:13px; color:#64748b;">
                            <strong>${companyName}</strong>${city}
                          </p>
                          <p style="margin:6px 0 0 0; font-family:monospace; font-size:11px; color:#94a3b8;">
                            Reg ID: ${id}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- QR CODE IMAGE -->
                    <div style="background:#ffffff; display:inline-block; padding:14px; border-radius:14px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.04); margin-bottom:16px;">
                      <img src="${qrImageSrc}" alt="Your Attendance QR Code" width="200" height="200" style="display:block; border:0; width:200px; height:200px; margin:0 auto;" />
                    </div>

                    <!-- Scan Instructions -->
                    <p style="margin:0 0 14px 0; font-size:13px; font-weight:600; color:#0f172a;">
                      📲 Scan this QR code upon arrival to instantly mark your attendance!
                    </p>
                    <p style="margin:0 0 18px 0; font-size:12px; color:#64748b; line-height:1.5; max-width:440px;">
                      Present this badge at the reception desk at Hablis Hotel, or scan it with your smartphone camera to self-verify your check-in.
                    </p>

                    <!-- Direct Check-in / View Pass CTA -->
                    <a href="${checkinUrl}" target="_blank" style="display:inline-block; background-color:#ef2722; color:#ffffff; font-size:13px; font-weight:700; text-decoration:none; padding:11px 26px; border-radius:10px; box-shadow:0 4px 10px rgba(239,39,34,0.3);">
                      Open Digital Pass & Check-In
                    </a>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- EVENT DETAILS SCHEDULE CARD -->
          <tr>
            <td style="padding:0 32px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#002b49" style="border-radius:16px; padding:20px; color:#ffffff;">
                <tr>
                  <td width="33%" align="center" style="padding:6px; border-right:1px solid rgba(255,255,255,0.15);">
                    <p style="margin:0; font-size:11px; text-transform:uppercase; color:#93c5fd; font-weight:700;">DATE</p>
                    <p style="margin:4px 0 0 0; font-size:13px; font-weight:800; color:#ffffff;">November 5, 2026</p>
                  </td>
                  <td width="33%" align="center" style="padding:6px; border-right:1px solid rgba(255,255,255,0.15);">
                    <p style="margin:0; font-size:11px; text-transform:uppercase; color:#93c5fd; font-weight:700;">TIME</p>
                    <p style="margin:4px 0 0 0; font-size:13px; font-weight:800; color:#ffffff;">10:00 AM – 05:30 PM</p>
                  </td>
                  <td width="33%" align="center" style="padding:6px;">
                    <p style="margin:0; font-size:11px; text-transform:uppercase; color:#93c5fd; font-weight:700;">VENUE</p>
                    <p style="margin:4px 0 0 0; font-size:12px; font-weight:800; color:#ffffff; line-height:1.2;">Taj Yeshwantpur, Bengaluru</p>
                  </td>
                </tr>
              </table>

              <div style="margin-top:14px; text-align:center;">
                <a href="https://maps.app.goo.gl/mUu2i567Ca8FwLG78" target="_blank" style="color:#0284c7; font-size:12px; font-weight:700; text-decoration:none;">
                  📍 View Location on Google Maps &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Agenda Quick Highlights -->
          <tr>
            <td style="padding:0 32px 24px;">
              <div style="background-color:#f8fafc; border-radius:14px; padding:18px 22px; border:1px solid #e2e8f0;">
                <p style="margin:0 0 10px 0; font-size:13px; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:0.5px;">
                  Quick Schedule
                </p>
                <ul style="margin:0; padding-left:18px; font-size:12px; line-height:1.8; color:#475569;">
                  <li><strong>09:00 AM – 10:00 AM:</strong> Registration, Welcome Breakfast &amp; Networking</li>
                  <li><strong>10:00 AM – 11:15 AM:</strong> Test-Drive SOLIDWORKS 2027 &amp; AI Features</li>
                  <li><strong>11:15 AM – 12:15 PM:</strong> AI Virtual Companions &amp; Real-World Case Studies</li>
                  <li><strong>12:15 PM – 01:00 PM:</strong> Interactive CAD, Expert Q&amp;A &amp; Live Demos</li>
                  <li><strong>01:00 PM – 02:00 PM:</strong> Networking Lunch &amp; Wrap-Up</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#0f172a" style="padding:24px 32px; text-align:center; color:#94a3b8; font-size:12px;">
              <p style="margin:0 0 6px 0; font-weight:700; color:#ffffff; font-size:13px;">
                Conceptia KONNECT
              </p>
              <p style="margin:0 0 12px 0; line-height:1.4;">
                Authorized Dassault Systèmes Reseller &amp; Digital Engineering Partner<br>
                For any questions regarding your registration, contact <a href="mailto:info@conceptia.in" style="color:#ef4444; text-decoration:none;">info@conceptia.in</a>
              </p>
              <p style="margin:0; font-size:11px; color:#64748b;">
                &copy; 2026 Conceptia Software Technologies Pvt. Ltd. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  /**
   * Send single personalized attendance QR pass email
   */
  async sendAttendanceEmail(attendee, baseUrl) {
    if (!attendee || !attendee.workEmail) {
      throw new Error('Attendee email is required');
    }

    const { checkinUrl, buffer, dataUrl } = await qrService.generateAttendeeQr(attendee, baseUrl);
    const html = this.generateEmailHtml(attendee, checkinUrl, 'cid:entry_pass_qr');

    if (!this.isConfigured()) {
      // Simulation / Preview Mode
      console.log(`[Email Simulation] Pass email generated for: ${attendee.fullName} <${attendee.workEmail}>`);
      console.log(`[Email Simulation] Checkin URL: ${checkinUrl}`);

      // Still mark email sent in database so workflow succeeds
      await dataService.markEmailSent(attendee._id || attendee.id);

      return {
        success: true,
        simulated: true,
        recipient: attendee.workEmail,
        fullName: attendee.fullName,
        jobRole: attendee.jobRole,
        checkinUrl,
        message: 'Email simulated successfully (SMTP not configured in server/.env). Attendance record updated.'
      };
    }

    // Real SMTP Send
    const mailOptions = {
      from: this.getFromAddress(),
      to: attendee.workEmail,
      subject: `Your Entry Pass & QR Code: SOLIDWORKS Innovation Day 2026 - ${attendee.fullName}`,
      html,
      attachments: [
        {
          filename: `pass-${attendee._id || attendee.id}.png`,
          content: buffer,
          cid: 'entry_pass_qr'
        }
      ]
    };

    const info = await this.transporter.sendMail(mailOptions);
    await dataService.markEmailSent(attendee._id || attendee.id);

    return {
      success: true,
      simulated: false,
      messageId: info.messageId,
      recipient: attendee.workEmail,
      checkinUrl
    };
  }

  /**
   * Send bulk attendance QR pass emails with throttling
   */
  async sendBulkAttendanceEmails(attendees, baseUrl, onProgress) {
    const results = {
      total: attendees.length,
      sent: 0,
      failed: 0,
      errors: [],
      details: []
    };

    for (let i = 0; i < attendees.length; i++) {
      const attendee = attendees[i];
      try {
        const res = await this.sendAttendanceEmail(attendee, baseUrl);
        results.sent++;
        results.details.push({
          id: attendee._id || attendee.id,
          name: attendee.fullName,
          email: attendee.workEmail,
          role: attendee.jobRole,
          status: 'success',
          simulated: res.simulated || false
        });
      } catch (err) {
        console.error(`Failed to send email to ${attendee.workEmail}:`, err);
        results.failed++;
        results.errors.push({
          email: attendee.workEmail,
          name: attendee.fullName,
          error: err.message
        });
        results.details.push({
          id: attendee._id || attendee.id,
          name: attendee.fullName,
          email: attendee.workEmail,
          status: 'error',
          error: err.message
        });
      }

      if (onProgress) {
        onProgress(i + 1, attendees.length);
      }

      // Small throttle to be courteous to SMTP servers
      if (i < attendees.length - 1) {
        await new Promise(r => setTimeout(r, 200));
      }
    }

    return results;
  }
}

export const emailService = new EmailService();
