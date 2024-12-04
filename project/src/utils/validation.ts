import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Correo electrónico inválido')
  .min(5, 'El correo debe tener al menos 5 caracteres');

export const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
  .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
  .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial');

export const validateCredentials = (email: string, password: string) => {
  try {
    emailSchema.parse(email);
    passwordSchema.parse(password);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Error de validación' };
  }
};