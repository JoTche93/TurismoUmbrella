import mongoose from 'mongoose';

const excursionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['fácil', 'moderado', 'avanzado'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  included: [{
    type: String
  }],
  notIncluded: [{
    type: String
  }],
  itinerary: [{
    time: String,
    description: String
  }],
  requirements: [{
    type: String
  }],
  groupSizes: {
    min: Number,
    max: Number
  },
  startTimes: [{
    type: String
  }],
  reviews: [{
    userId: String,
    userName: String,
    rating: Number,
    comment: String,
    date: Date,
    isVerified: Boolean
  }],
  serviceCategory: {
    type: String,
    default: 'turismo_aventura'
  }
}, {
  timestamps: true
});

export const ExcursionModel = mongoose.model('Excursion', excursionSchema);