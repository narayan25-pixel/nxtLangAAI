const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slokaSchema = new Schema({
  chapterNumber:{
    type: String || Number,
    required: [true, 'Chapter Number is required'],
  },
  chapterName: {
    type: String,
    required: [true, 'Chapter Name is required'],
    trim: true,
    minlength: [2, 'Chapter Name must be at least 2 characters'],
    maxlength: [100, 'Chapter Name cannot exceed 100 characters']
  },
  slokaNumber: {
    type: String || Number,
    required: [true, 'Sloka Number is required'],
  },
  sloka: {
    type: String,
    required: [true, 'Sloka is required'],
    minlength: [6, 'Sloka must be at least 6 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  ctreatedBy: {
    type: String,
    trim: true,
    required: [true, 'Created By is required'],
  }
}, {
  timestamps: true
});

// Index for faster queries
slokaSchema.index({ email: 1 });
slokaSchema.index({ createdAt: -1 });

// Virtual for full name (if you add firstName/lastName later)
slokaSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
slokaSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.models.Sloka || mongoose.model('Sloka', slokaSchema);
