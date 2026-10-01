import mongoose from 'mongoose';

const EventContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'main_event',
      unique: true
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.EventContent || mongoose.model('EventContent', EventContentSchema);
