import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dadosRoutes from './routes/dadosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

app.use('/api/dados', dadosRoutes);
app.use('/api/usuarios', usuariosRoutes);
export default app;
