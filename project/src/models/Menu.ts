import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['carnes', 'pescados', 'vegetariano', 'postres'],
    required: true
  },
  includes: [{
    type: String
  }],
  origin: {
    type: String,
    required: true
  },
  dietaryOptions: [{
    type: String
  }],
  prepTime: {
    type: String,
    required: true
  },
  images: [{
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
    default: 'gastronomia'
  }
}, {
  timestamps: true
});

export const MenuModel = mongoose.model('Menu', menuSchema);