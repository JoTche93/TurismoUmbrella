import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://emanuelleandrotorrestroncoso:123456789Et.@cluster5.um18j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster5';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB conectado exitosamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  console.error('Error de MongoDB:', err);
});