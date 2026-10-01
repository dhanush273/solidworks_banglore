import QRCode from 'qrcode';

export const qrService = {
  /**
   * Generates check-in URL for a registration record
   */
  getCheckinUrl(attendeeId, baseUrl = '') {
    const cleanBase = (baseUrl || '').replace(/\/+$/, '');
    return `${cleanBase}/api/registrations/checkin/${attendeeId}`;
  },

  /**
   * Generate QR Code as a Data URL (base64 PNG)
   */
  async generateDataUrl(text) {
    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a', // Deep slate for crisp scanning
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H'
      });
      return dataUrl;
    } catch (err) {
      console.error('QR code generation error (dataUrl):', err);
      throw err;
    }
  },

  /**
   * Generate QR Code as a PNG Buffer (ideal for inline email CID attachment)
   */
  async generateBuffer(text) {
    try {
      const buffer = await QRCode.toBuffer(text, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H'
      });
      return buffer;
    } catch (err) {
      console.error('QR code generation error (buffer):', err);
      throw err;
    }
  },

  /**
   * Generate complete check-in assets for an attendee
   */
  async generateAttendeeQr(attendee, baseUrl) {
    const id = attendee._id || attendee.id || attendee.qrCodeToken;
    const checkinUrl = this.getCheckinUrl(id, baseUrl);
    const [dataUrl, buffer] = await Promise.all([
      this.generateDataUrl(checkinUrl),
      this.generateBuffer(checkinUrl)
    ]);
    return {
      checkinUrl,
      dataUrl,
      buffer
    };
  }
};
