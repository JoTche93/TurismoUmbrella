import { ExcursionModel } from '../models/Excursion';
import type { Excursion } from '../types';

export const excursionService = {
  getAll: async () => {
    return await ExcursionModel.find();
  },

  getById: async (id: string) => {
    return await ExcursionModel.findById(id);
  },

  create: async (excursion: Omit<Excursion, 'id'>) => {
    const newExcursion = new ExcursionModel(excursion);
    return await newExcursion.save();
  },

  update: async (id: string, excursion: Partial<Excursion>) => {
    return await ExcursionModel.findByIdAndUpdate(id, excursion, { new: true });
  },

  delete: async (id: string) => {
    return await ExcursionModel.findByIdAndDelete(id);
  },

  addReview: async (id: string, review: any) => {
    const excursion = await ExcursionModel.findById(id);
    if (!excursion) throw new Error('Excursión no encontrada');
    
    excursion.reviews.push(review);
    
    // Recalcular rating promedio
    const totalRating = excursion.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    excursion.rating = totalRating / excursion.reviews.length;
    
    return await excursion.save();
  }
};