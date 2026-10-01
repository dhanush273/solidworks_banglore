import express from 'express';
import { dataService } from '../services/dataService.js';
import { defaultEventData } from '../storage.js';

const router = express.Router();

// GET /api/event - Fetch current event content
router.get('/', async (req, res) => {
  try {
    const data = await dataService.getEventContent();
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error fetching event content:', err);
    res.status(500).json({ success: false, message: 'Server error retrieving event data' });
  }
});

// PUT /api/event - Update event content (Admin)
router.put('/', async (req, res) => {
  try {
    const updated = await dataService.updateEventContent(req.body);
    res.json({ success: true, message: 'Event content updated successfully', data: updated });
  } catch (err) {
    console.error('Error updating event content:', err);
    res.status(500).json({ success: false, message: 'Server error updating event data' });
  }
});

// POST /api/event/reset - Reset to default flyer content
router.post('/reset', async (req, res) => {
  try {
    const resetData = await dataService.updateEventContent(defaultEventData);
    res.json({ success: true, message: 'Event content reset to default flyer layout', data: resetData });
  } catch (err) {
    console.error('Error resetting event content:', err);
    res.status(500).json({ success: false, message: 'Server error resetting event data' });
  }
});

export default router;
