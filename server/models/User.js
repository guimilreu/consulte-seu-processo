import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'lawyer'],
    required: true,
  },
  cpf: {
    type: String,
    required: function() {
      return this.role === 'client';
    },
  },
  phone: {
    type: String,
    required: function() {
      return this.role === 'client';
    },
  },
  passwordSetupToken: {
    type: String,
    default: null,
  },
  passwordSetupExpires: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

userSchema.index({ role: 1 });

export default mongoose.model('User', userSchema);

