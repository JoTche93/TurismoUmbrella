import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['hotel', 'cabaña', 'hostal'],
    required: true
  },
  amenities: [{
    type: String
  }],
  rooms: [{
    type: {
      type: String,
      required: true
    },
    description: String,
    capacity: Number,
    price: Number
  }],
  policies: {
    checkIn: String,
    checkOut: String,
    cancellation: String
  },
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
    default: 'alojamiento'
  }
}, {
  timestamps: true
});

export const AccommodationModel = mongoose.model('Accommodation', accommodationSchema);