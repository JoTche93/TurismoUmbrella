import { MenuModel } from '../models/Menu';
import type { Menu } from '../types';

export const menuService = {
  getAll: async () => {
    return await MenuModel.find();
  },

  getById: async (id: string) => {
    return await MenuModel.findById(id);
  },

  create: async (menu: Omit<Menu, 'id'>) => {
    const newMenu = new MenuModel(menu);
    return await newMenu.save();
  },

  update: async (id: string, menu: Partial<Menu>) => {
    return await MenuModel.findByIdAndUpdate(id, menu, { new: true });
  },

  delete: async (id: string) => {
    return await MenuModel.findByIdAndDelete(id);
  },

  addReview: async (id: string, review: any) => {
    const menu = await MenuModel.findById(id);
    if (!menu) throw new Error('Menú no encontrado');
    
    menu.reviews.push(review);
    
    // Recalcular rating promedio
    const totalRating = menu.reviews.reduce((sum, rev) => sum + rev.rating, 0);
    menu.rating = totalRating / menu.reviews.length;
    
    return await menu.save();
  }
};