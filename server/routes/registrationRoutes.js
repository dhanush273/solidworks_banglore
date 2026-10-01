import express from 'express';
import { dataService } from '../services/dataService.js';
import { emailService } from '../services/emailService.js';
import { qrService } from '../services/qrService.js';
import { renderCheckinPage } from '../templates/checkinHtml.js';

const router = express.Router();

function getBaseUrl(req) {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/+$/, '');
  if (process.env.BASE_URL) return process.env.BASE_URL.replace(/\/+$/, '');
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.get('host');
  return `${protocol}://${host}`;
}

// POST /api/registrations - Register / nominate
router.post('/', async (req, res) => {
  try {
    const { fullName, workEmail, phoneNumber, companyName, jobRole, city } = req.body;

    if (!fullName || !workEmail || !phoneNumber || !companyName || !jobRole) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: Full Name, Work Email, Phone Number, Company Name, and Designation.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid work email address.'
      });
    }

    const newRecord = await dataService.createRegistration({
      fullName: fullName.trim(),
      workEmail: workEmail.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      companyName: companyName.trim(),
      city: (city || '').trim(),
      jobRole: jobRole.trim(),
      status: 'Confirmed'
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! See you at SOLIDWORKS Innovation Day 2026.',
      data: newRecord
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Internal server error while processing registration.' });
  }
});

// GET /api/registrations - List with search, filter, pagination
router.get('/', async (req, res) => {
  try {
    const { search = '', status = '', role = '' } = req.query;
    let registrations = await dataService.getAllRegistrations();

    if (search) {
      const q = search.toLowerCase();
      registrations = registrations.filter(
        r =>
          (r.fullName && r.fullName.toLowerCase().includes(q)) ||
          (r.workEmail && r.workEmail.toLowerCase().includes(q)) ||
          (r.companyName && r.companyName.toLowerCase().includes(q)) ||
          (r.city && r.city.toLowerCase().includes(q)) ||
          (r.phoneNumber && r.phoneNumber.includes(q))
      );
    }

    if (status && status !== 'All') {
      registrations = registrations.filter(r => r.status === status);
    }

    if (role && role !== 'All') {
      registrations = registrations.filter(r => r.jobRole === role);
    }

    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (err) {
    console.error('Error fetching registrations:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve registrations' });
  }
});

// GET /api/registrations/stats - KPI Summary & Breakdown
router.get('/stats', async (req, res) => {
  try {
    const registrations = await dataService.getAllRegistrations();
    const total = registrations.length;
    const confirmed = registrations.filter(r => r.status === 'Confirmed').length;
    const pending = registrations.filter(r => r.status === 'Pending').length;
    const attended = registrations.filter(r => r.status === 'Attended').length;

    // Breakdown by role
    const roleMap = {};
    registrations.forEach(r => {
      const role = r.jobRole || 'Other';
      roleMap[role] = (roleMap[role] || 0) + 1;
    });

    // Breakdown by top companies
    const companyMap = {};
    registrations.forEach(r => {
      const comp = r.companyName || 'Unknown';
      companyMap[comp] = (companyMap[comp] || 0) + 1;
    });

    const emailsSent = registrations.filter(r => r.emailSent).length;
    const emailsPending = registrations.filter(r => (r.status === 'Confirmed' || r.status === 'Attended') && !r.emailSent).length;

    res.json({
      success: true,
      stats: {
        total,
        confirmed,
        pending,
        attended,
        emailsSent,
        emailsPending,
        roleBreakdown: roleMap,
        companyBreakdown: companyMap
      }
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve stats' });
  }
});

// PATCH /api/registrations/:id/status - Update nomination status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Confirmed', 'Pending', 'Attended', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const updated = await dataService.updateRegistrationStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Registration record not found' });
    }

    res.json({ success: true, message: 'Status updated', data: updated });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

// DELETE /api/registrations/:id - Delete nomination
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await dataService.deleteRegistration(id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    res.json({ success: true, message: 'Registration deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete registration' });
  }
});

// GET /api/registrations/checkin/:id - QR code scan check-in
router.get('/checkin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await dataService.getRegistrationById(id);

    const wantsJson = req.query.format === 'json' || (req.headers.accept && req.headers.accept.includes('application/json'));

    if (!attendee) {
      if (wantsJson) {
        return res.status(404).json({ success: false, message: 'Invalid or expired QR code badge.' });
      }
      return res.status(404).send(renderCheckinPage({ error: 'Badge not found in registration database.' }));
    }

    const alreadyAttended = attendee.status === 'Attended';

    let updatedAttendee = attendee;
    if (!alreadyAttended) {
      updatedAttendee = await dataService.markAttended(id);
    }

    if (wantsJson) {
      return res.json({
        success: true,
        alreadyAttended,
        message: alreadyAttended ? 'Attendee was already checked in.' : 'Attendance confirmed successfully!',
        data: updatedAttendee
      });
    }

    res.send(renderCheckinPage({ attendee: updatedAttendee, alreadyAttended }));
  } catch (err) {
    console.error('Check-in error:', err);
    res.status(500).send(renderCheckinPage({ error: 'Server error processing check-in.' }));
  }
});

// POST /api/registrations/checkin/:id - Explicit API check-in
router.post('/checkin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await dataService.getRegistrationById(id);

    if (!attendee) {
      return res.status(404).json({ success: false, message: 'Registration record not found.' });
    }

    const alreadyAttended = attendee.status === 'Attended';
    let updated = attendee;
    if (!alreadyAttended) {
      updated = await dataService.markAttended(id);
    }

    res.json({
      success: true,
      alreadyAttended,
      message: alreadyAttended ? 'Already checked in' : 'Attendance marked successfully',
      data: updated
    });
  } catch (err) {
    console.error('POST checkin error:', err);
    res.status(500).json({ success: false, message: 'Failed to record check-in' });
  }
});

// GET /api/registrations/preview-email/:id - Preview HTML email with live QR code
router.get('/preview-email/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await dataService.getRegistrationById(id);

    if (!attendee) {
      return res.status(404).send('<h1>Attendee not found</h1>');
    }

    const baseUrl = getBaseUrl(req);
    const { checkinUrl, dataUrl } = await qrService.generateAttendeeQr(attendee, baseUrl);
    const html = emailService.generateEmailHtml(attendee, checkinUrl, dataUrl);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Email preview error:', err);
    res.status(500).send(`<h1>Error generating preview</h1><p>${err.message}</p>`);
  }
});

// POST /api/registrations/send-email/:id - Send QR pass email to single candidate
router.post('/send-email/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await dataService.getRegistrationById(id);

    if (!attendee) {
      return res.status(404).json({ success: false, message: 'Attendee not found' });
    }

    const baseUrl = getBaseUrl(req);
    const result = await emailService.sendAttendanceEmail(attendee, baseUrl);

    res.json({
      success: true,
      message: result.simulated
        ? `Pass generated in simulation mode for ${attendee.fullName} (${attendee.workEmail})`
        : `QR Pass email successfully sent to ${attendee.workEmail}`,
      result
    });
  } catch (err) {
    console.error('Send email error:', err);
    res.status(500).json({ success: false, message: err.message || 'Failed to send email' });
  }
});

// POST /api/registrations/send-bulk-emails - Send QR pass emails in bulk to confirmed attendees
router.post('/send-bulk-emails', async (req, res) => {
  try {
    const { filter = 'confirmed-unsent', ids = null, forceAll = false } = req.body;
    let all = await dataService.getAllRegistrations();

    let targetAttendees = [];

    if (Array.isArray(ids) && ids.length > 0) {
      targetAttendees = all.filter(r => ids.includes(r._id || r.id));
    } else if (filter === 'confirmed-all' || forceAll) {
      targetAttendees = all.filter(r => r.status === 'Confirmed' || r.status === 'Attended');
    } else {
      // Default: confirmed and email not yet sent
      targetAttendees = all.filter(r => (r.status === 'Confirmed' || r.status === 'Attended') && !r.emailSent);
    }

    if (targetAttendees.length === 0) {
      return res.json({
        success: true,
        message: 'No pending confirmed attendees require email delivery.',
        count: 0,
        results: { total: 0, sent: 0, failed: 0, details: [] }
      });
    }

    const baseUrl = getBaseUrl(req);
    const results = await emailService.sendBulkAttendanceEmails(targetAttendees, baseUrl);

    res.json({
      success: true,
      message: `Processed bulk emails for ${results.sent} attendee(s).${results.failed > 0 ? ` (${results.failed} failed)` : ''}`,
      count: targetAttendees.length,
      results
    });
  } catch (err) {
    console.error('Bulk email error:', err);
    res.status(500).json({ success: false, message: 'Failed to process bulk emails: ' + err.message });
  }
});

// GET /api/registrations/export/csv - Download nominations CSV
router.get('/export/csv', async (req, res) => {
  try {
    const registrations = await dataService.getAllRegistrations();

    const headers = [
      'ID',
      'Full Name',
      'Work Email',
      'Phone Number',
      'Company Name',
      'City',
      'Designation',
      'Status',
      'Email Sent',
      'Email Sent Date',
      'Attended Date',
      'Registered Date'
    ];
    const rows = registrations.map(r => [
      `"${r._id || r.id || ''}"`,
      `"${(r.fullName || '').replace(/"/g, '""')}"`,
      `"${(r.workEmail || '').replace(/"/g, '""')}"`,
      `"${(r.phoneNumber || '').replace(/"/g, '""')}"`,
      `"${(r.companyName || '').replace(/"/g, '""')}"`,
      `"${(r.city || '').replace(/"/g, '""')}"`,
      `"${(r.jobRole || '').replace(/"/g, '""')}"`,
      `"${r.status || 'Confirmed'}"`,
      `"${r.emailSent ? 'Yes' : 'No'}"`,
      `"${r.emailSentAt ? new Date(r.emailSentAt).toLocaleString() : ''}"`,
      `"${r.attendedAt ? new Date(r.attendedAt).toLocaleString() : ''}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=solidworks_nominations_${Date.now()}.csv`);
    res.status(200).send(csvContent);
  } catch (err) {
    console.error('Export CSV error:', err);
    res.status(500).json({ success: false, message: 'Failed to generate CSV export' });
  }
});

export default router;
