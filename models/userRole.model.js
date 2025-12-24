const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: {
      values: ['admin', 'user', 'moderator', 'guest'],
      message: '{VALUE} is not a valid role'
    },
    default: 'user'
  },
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'update', 'manage_users', 'manage_roles']
  }],
  department: {
    type: String,
    trim: true
  },
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
userRoleSchema.index({ userId: 1 });
userRoleSchema.index({ userId: 1 }, { unique: true });

// Virtual for id
userRoleSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
userRoleSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('UserRole', userRoleSchema);
