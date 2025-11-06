import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['official', 'comment'],
    default: 'official',
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
  }],
  createdBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const processSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  processNumber: {
    type: String,
    required: true,
  },
  actionType: {
    type: String,
    required: true,
  },
  court: {
    type: String,
    required: true,
  },
  plaintiff: {
    type: String,
    required: true,
  },
  defendant: {
    type: String,
    required: true,
  },
  filingDate: {
    type: Date,
    required: true,
  },
  caseValue: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  priority: {
    type: String,
    enum: ['baixa', 'media', 'alta', 'urgente'],
    default: 'media',
  },
  timeline: [timelineSchema],
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

processSchema.index({ clientId: 1 });
processSchema.index({ processNumber: 1 });
processSchema.index({ status: 1 });

export default mongoose.model('Process', processSchema);

