import { AccommodationModel } from '../models/Accommodation';
import type { Accommodation } from '../types';

export const accommodationService = {
  getAll: async () => {
    return await AccommodationModel.find();
  },

  getById: async (id: string) => {
    return await AccommodationModel.findById(id);
  },

  create: async (accommodation: Omit<Accommodation, 'id'>) => {
    const newAccommodation = new AccommodationModel(accommodation);
    return await newAccommodation.save();
  },

  update: async (id: string, accommodation: Partial<Accommodation>) => {
    return await AccommodationModel.findByIdAndUpdate(id, accommodation, { new: true });
  },

  delete: async (id: string) => {
    return await AccommodationModel.findByIdAndDelete(id);
  },

  addReview: async (id: string, review: any) => {
    const accommodation = await AccommodationModel.findById(id);
    if (!accommodation) throw new Error('Alojamiento no encontrado');
    
    accommodation.reviews.push(review);
    
    // Recalcular rating promedio
    const totalRating = accommodation.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    accommodation.rating = totalRating / accommodation.reviews.length;
    
    return await accommodation.save();
  }
};