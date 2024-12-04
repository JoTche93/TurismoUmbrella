import { type User } from '../types';

export const sendEmail = async (to: string, subject: string, content: string) => {
  // En un entorno real, aquí se integraría con un servicio de correo como SendGrid o AWS SES
  console.log(`Enviando correo a ${to}`);
  console.log(`Asunto: ${subject}`);
  console.log(`Contenido: ${content}`);
  
  // Simulamos el envío
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

export const sendPaymentConfirmation = async (user: User, paymentDetails: {
  amount: number;
  description: string;
  serviceType: string;
}) => {
  const subject = 'Confirmación de Pago - Turismo Umbrela';
  const content = `
    Hola ${user.name},

    Tu pago ha sido procesado exitosamente:

    Servicio: ${paymentDetails.description}
    Monto: €${paymentDetails.amount}
    Tipo: ${paymentDetails.serviceType}

    Gracias por confiar en Turismo Umbrela.
  `;

  await sendEmail(user.email, subject, content);
};

export const sendWelcomeEmail = async (user: User) => {
  const subject = 'Bienvenido a Turismo Umbrela';
  const content = `
    ¡Hola ${user.name}!

    Gracias por unirte a Turismo Umbrela. Estamos emocionados de tenerte con nosotros.
    
    Explora nuestras excursiones, alojamientos y experiencias gastronómicas únicas.

    ¡Comienza tu aventura ahora!
  `;

  await sendEmail(user.email, subject, content);
};

export const sendLoginNotification = async (user: User) => {
  const subject = 'Nuevo inicio de sesión - Turismo Umbrela';
  const content = `
    Hola ${user.name},

    Se ha detectado un nuevo inicio de sesión en tu cuenta.
    
    Si no fuiste tú, por favor contacta con nuestro equipo de soporte inmediatamente.
  `;

  await sendEmail(user.email, subject, content);
};