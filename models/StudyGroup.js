import mongoose from 'mongoose';

const studyGroupSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    subject: {
      type: String,
      required: true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    isPrivate: {
      type: Boolean,
      default: false
    },
    meetingSchedule: {
      day: String,
      time: String,
      location: String
    },
    resources: [{
      title: String,
      fileUrl: String
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  });
  const StudyGroup = mongoose.model("Study Group", studyGroupSchema);

export default StudyGroup;
