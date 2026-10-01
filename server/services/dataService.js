import { isMongoActive } from '../db.js';
import Registration from '../models/Registration.js';
import EventContent from '../models/EventContent.js';
import { localStore, defaultEventData } from '../storage.js';

export const dataService = {
  async getEventContent() {
    if (isMongoActive()) {
      try {
        let content = await EventContent.findOne({ key: 'main_event' });
        if (!content) {
          content = await EventContent.create({ key: 'main_event', data: defaultEventData });
        }
        return content.data;
      } catch (err) {
        console.error('MongoDB getEventContent error, falling back:', err.message);
      }
    }
    return localStore.getEventData();
  },

  async updateEventContent(newData) {
    if (isMongoActive()) {
      try {
        const updated = await EventContent.findOneAndUpdate(
          { key: 'main_event' },
          { data: newData },
          { new: true, upsert: true }
        );
        return updated.data;
      } catch (err) {
        console.error('MongoDB updateEventContent error, falling back:', err.message);
      }
    }
    return localStore.saveEventData(newData);
  },

  async createRegistration(regData) {
    if (isMongoActive()) {
      try {
        const record = await Registration.create(regData);
        return record.toObject();
      } catch (err) {
        console.error('MongoDB createRegistration error, falling back:', err.message);
      }
    }
    return localStore.addRegistration(regData);
  },

  async getAllRegistrations() {
    if (isMongoActive()) {
      try {
        const records = await Registration.find().sort({ createdAt: -1 }).lean();
        return records;
      } catch (err) {
        console.error('MongoDB getAllRegistrations error, falling back:', err.message);
      }
    }
    return localStore.getRegistrations();
  },

  async updateRegistrationStatus(id, status) {
    if (isMongoActive()) {
      try {
        const record = await Registration.findByIdAndUpdate(id, { status }, { new: true }).lean();
        if (record) return record;
      } catch (err) {
        console.error('MongoDB updateRegistrationStatus error, falling back:', err.message);
      }
    }
    return localStore.updateRegistrationStatus(id, status);
  },

  async getRegistrationById(id) {
    if (isMongoActive()) {
      try {
        let record = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          record = await Registration.findById(id).lean();
        }
        if (!record) {
          record = await Registration.findOne({ qrCodeToken: id }).lean();
        }
        if (record) return record;
      } catch (err) {
        console.error('MongoDB getRegistrationById error, falling back:', err.message);
      }
    }
    return localStore.getRegistrationById(id);
  },

  async updateRegistration(id, updateData) {
    if (isMongoActive()) {
      try {
        let record = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          record = await Registration.findByIdAndUpdate(id, updateData, { new: true }).lean();
        } else {
          record = await Registration.findOneAndUpdate({ qrCodeToken: id }, updateData, { new: true }).lean();
        }
        if (record) return record;
      } catch (err) {
        console.error('MongoDB updateRegistration error, falling back:', err.message);
      }
    }
    return localStore.updateRegistration(id, updateData);
  },

  async markAttended(id) {
    const now = new Date().toISOString();
    return this.updateRegistration(id, {
      status: 'Attended',
      attendedAt: now
    });
  },

  async markEmailSent(id) {
    const now = new Date().toISOString();
    return this.updateRegistration(id, {
      emailSent: true,
      emailSentAt: now
    });
  },

  async deleteRegistration(id) {
    if (isMongoActive()) {
      try {
        let res = null;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          res = await Registration.findByIdAndDelete(id);
        } else {
          res = await Registration.findOneAndDelete({ qrCodeToken: id });
        }
        return !!res;
      } catch (err) {
        console.error('MongoDB deleteRegistration error, falling back:', err.message);
      }
    }
    return localStore.deleteRegistration(id);
  }
};
