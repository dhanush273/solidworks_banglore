import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    workEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      default: '',
      trim: true
    },
    jobRole: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Attended', 'Cancelled'],
      default: 'Confirmed'
    },
    emailSent: {
      type: Boolean,
      default: false
    },
    emailSentAt: {
      type: Date,
      default: null
    },
    attendedAt: {
      type: Date,
      default: null
    },
    qrCodeToken: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);
